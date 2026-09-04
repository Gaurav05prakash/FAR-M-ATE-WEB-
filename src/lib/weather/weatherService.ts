import { useState, useEffect, useCallback } from 'react';
import { LiveWeatherData } from '../../types';

// WMO Weather Interpretation Codes (WW)
export function interpretWeatherCode(code: number): { condition: string; iconType: 'sun' | 'cloud-sun' | 'cloud' | 'rain' | 'storm' | 'fog' } {
  switch (code) {
    case 0:
      return { condition: 'Clear Sky', iconType: 'sun' };
    case 1:
      return { condition: 'Mainly Clear', iconType: 'cloud-sun' };
    case 2:
      return { condition: 'Partly Cloudy', iconType: 'cloud-sun' };
    case 3:
      return { condition: 'Overcast', iconType: 'cloud' };
    case 45:
    case 48:
      return { condition: 'Fog & Mist', iconType: 'fog' };
    case 51:
    case 53:
    case 55:
      return { condition: 'Light Drizzle', iconType: 'rain' };
    case 61:
    case 63:
    case 65:
      return { condition: 'Rain', iconType: 'rain' };
    case 80:
    case 81:
    case 82:
      return { condition: 'Rain Showers', iconType: 'rain' };
    case 95:
    case 96:
    case 99:
      return { condition: 'Thunderstorm', iconType: 'storm' };
    default:
      return { condition: 'Partly Cloudy', iconType: 'cloud-sun' };
  }
}

export function calculateSprayAdvisory(windSpeed: number, weatherCode: number): { badge: string; notice: string; isSafe: boolean } {
  const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weatherCode);

  if (isRain) {
    return {
      badge: 'Rain Alert - No Spray',
      notice: 'Active rain or precipitation detected. Postpone knapsack spraying to prevent chemical wash-off.',
      isSafe: false,
    };
  }

  if (windSpeed > 20) {
    return {
      badge: 'High Drift Warning',
      notice: `High wind (${windSpeed} km/h). Knapsack spraying unsafe due to high droplet drift risk.`,
      isSafe: false,
    };
  }

  if (windSpeed >= 15) {
    return {
      badge: 'Spray Caution',
      notice: `Moderate wind (${windSpeed} km/h). Use coarse anti-drift nozzles and low boom height.`,
      isSafe: true,
    };
  }

  if (windSpeed >= 5) {
    return {
      badge: 'Ideal Spray Window',
      notice: `Optimal wind (${windSpeed} km/h). Ideal conditions for uniform knapsack droplet deposition.`,
      isSafe: true,
    };
  }

  return {
    badge: 'Spray Caution (Inversion)',
    notice: `Very low wind (${windSpeed} km/h). Caution against atmospheric inversion trapping chemical vapor.`,
    isSafe: true,
  };
}

const DEFAULT_WEATHER: LiveWeatherData = {
  location: 'Krishnagiri, Tamil Nadu',
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 58,
  windSpeed: 12,
  weatherCode: 2,
  sprayCautionBadge: 'Ideal Spray Window',
  sprayCautionNotice: 'Optimal wind (12 km/h). Ideal conditions for uniform knapsack droplet deposition.',
  isLive: false,
  latitude: 12.52,
  longitude: 78.21,
  updatedAt: new Date().toISOString(),
};

const STORAGE_KEY = 'farmate_live_weather_cache_v2';

export async function reverseGeocodeCoords(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(`/api/location/reverse?lat=${lat}&lon=${lon}`);
    if (res.ok) {
      const data = await res.json();
      if (data.location) return data.location;
    }
  } catch (err) {
    console.warn('Server reverse geocoding error, trying fallback:', err);
  }

  // Fallback 1: Open-Meteo geocoding if possible or coordinate label
  return null;
}

export async function detectIPLocation(): Promise<{ location: string; latitude: number; longitude: number } | null> {
  try {
    const res = await fetch('/api/location/ip');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.latitude && data.longitude) {
        return {
          location: data.location,
          latitude: data.latitude,
          longitude: data.longitude,
        };
      }
    }
  } catch (err) {
    console.warn('IP location detection error:', err);
  }
  return null;
}

export async function detectCurrentGPSLocation(): Promise<{ location: string; latitude: number; longitude: number } | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      detectIPLocation().then(resolve);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const locationName = await reverseGeocodeCoords(lat, lon);
        resolve({
          location: locationName || `Field Area (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`,
          latitude: lat,
          longitude: lon,
        });
      },
      async (err) => {
        console.warn('Direct GPS lookup fallback to IP:', err.message);
        const ipLoc = await detectIPLocation();
        resolve(ipLoc);
      },
      {
        timeout: 8000,
        maximumAge: 0,
        enableHighAccuracy: true,
      }
    );
  });
}

export async function fetchLiveWeatherByCoords(lat: number, lon: number, customLocationName?: string): Promise<LiveWeatherData> {
  try {
    // 1. Fetch current weather from Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Open-Meteo request failed');
    const data = await res.json();
    const current = data.current;

    const temp = Math.round(current.temperature_2m);
    const humidity = Math.round(current.relative_humidity_2m);
    const windSpeed = Math.round(current.wind_speed_10m);
    const weatherCode = current.weather_code;

    const { condition } = interpretWeatherCode(weatherCode);
    const sprayAdv = calculateSprayAdvisory(windSpeed, weatherCode);

    // 2. Reverse geocode location name if not provided
    let locationName = customLocationName;
    if (!locationName || locationName === 'Local Farm Area') {
      const serverLocation = await reverseGeocodeCoords(lat, lon);
      if (serverLocation) {
        locationName = serverLocation;
      }
    }

    const weatherData: LiveWeatherData = {
      location: locationName || `Field Area (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`,
      temperature: temp,
      condition,
      humidity,
      windSpeed,
      weatherCode,
      sprayCautionBadge: sprayAdv.badge,
      sprayCautionNotice: sprayAdv.notice,
      isLive: true,
      latitude: lat,
      longitude: lon,
      updatedAt: new Date().toISOString(),
    };

    // Cache locally
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weatherData));
    } catch (e) {}

    return weatherData;
  } catch (err) {
    console.warn('Live weather fetch fallback:', err);
    return DEFAULT_WEATHER;
  }
}

export function useLiveWeather(
  initialLocation?: string,
  onLocationChange?: (newLocation: string, weather: LiveWeatherData) => void
) {
  const [weather, setWeather] = useState<LiveWeatherData>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed;
      }
    } catch (e) {}
    return {
      ...DEFAULT_WEATHER,
      location: initialLocation || DEFAULT_WEATHER.location,
    };
  });

  const [loading, setLoading] = useState(false);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');

  const detectLocationAndWeather = useCallback(async (promptUser: boolean = false) => {
    setLoading(true);

    const handleSuccess = async (lat: number, lon: number, customName?: string) => {
      const data = await fetchLiveWeatherByCoords(lat, lon, customName);
      setWeather(data);
      setLoading(false);
      if (onLocationChange && data.location) {
        onLocationChange(data.location, data);
      }
    };

    if (!navigator.geolocation) {
      console.warn('Geolocation not supported by this browser, trying IP fallback');
      const ipLoc = await detectIPLocation();
      if (ipLoc) {
        await handleSuccess(ipLoc.latitude, ipLoc.longitude, ipLoc.location);
      } else {
        await handleSuccess(12.52, 78.21, initialLocation || 'Krishnagiri, Tamil Nadu');
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setPermissionState('granted');
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        await handleSuccess(lat, lon);
      },
      async (err) => {
        console.warn('Geolocation access denied or timed out, trying IP fallback:', err.message);
        setPermissionState('denied');
        const ipLoc = await detectIPLocation();
        if (ipLoc) {
          await handleSuccess(ipLoc.latitude, ipLoc.longitude, ipLoc.location);
        } else {
          await handleSuccess(12.52, 78.21, initialLocation || 'Krishnagiri, Tamil Nadu');
        }
      },
      {
        timeout: promptUser ? 8000 : 5000,
        maximumAge: promptUser ? 0 : 300000,
        enableHighAccuracy: true,
      }
    );
  }, [initialLocation, onLocationChange]);

  useEffect(() => {
    // Auto-detect on mount
    detectLocationAndWeather();
  }, [detectLocationAndWeather]);

  return {
    weather,
    loading,
    permissionState,
    refreshLocation: () => detectLocationAndWeather(true),
  };
}
