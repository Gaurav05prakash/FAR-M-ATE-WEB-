import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Bug,
  Sparkles,
  Globe,
  Sun,
  MapPin,
  Settings,
  PhoneCall,
  ChevronDown,
  Layers,
  CheckCircle2,
  Sprout,
  LogOut,
  RefreshCw,
  CloudRain,
  CloudSun,
} from 'lucide-react';
import { LanguageCode, FeatureMode, User, LiveWeatherData } from '../../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../lib/i18n/languages';
import { HOME_PAGE_TRANSLATIONS } from '../../data/homePageTranslations';
import { TOP_BAR_TRANSLATIONS } from '../../data/agriculturalTranslations';

interface HeaderProps {
  currentMode: string;
  onSelectMode: (mode: FeatureMode | 'dashboard' | 'myfarm' | 'registry' | 'settings') => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onOpenVoice: () => void;
  user: User;
  onOpenAuth: () => void;
  onOpenPoisonModal?: () => void;
  onLogout?: () => void;
  onStartDemo?: () => void;
  weather?: LiveWeatherData;
  onRefreshLocation?: () => void;
  weatherLoading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  language,
  onSelectLanguage,
  user,
  onOpenAuth,
  onOpenPoisonModal,
  onLogout,
  onStartDemo,
  weather,
  onRefreshLocation,
  weatherLoading,
}) => {
  const homeT = HOME_PAGE_TRANSLATIONS[language] || HOME_PAGE_TRANSLATIONS.en;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // State to toggle full poison helpline number display on click
  const [showPoisonNumber, setShowPoisonNumber] = useState(false);
  const poisonBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPoisonNumber) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (poisonBtnRef.current && !poisonBtnRef.current.contains(event.target as Node)) {
        setShowPoisonNumber(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPoisonNumber]);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-2xs">
      <div className="w-full px-3 sm:px-5 lg:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Identity */}
        <div
          onClick={() => onSelectMode('dashboard')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#0b6633] text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-xs group-hover:bg-[#084e27] transition shrink-0">
            F
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-[#084e27] font-sans">
                FAR[M]ATE
              </span>
              <span className="inline-flex bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border border-emerald-200">
                2.1
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-neutral-500 font-medium whitespace-nowrap">
              {TOP_BAR_TRANSLATIONS[language]?.platformSubtitle || 'National Agro-Intelligence Platform'}
            </p>
          </div>
        </div>

        {/* Center: Core Feature Nav - Visible on 2xl screens */}
        <nav className="hidden 2xl:flex items-center gap-1 bg-neutral-100/80 p-1 rounded-2xl border border-neutral-200/70 shrink-0">
          <button
            onClick={() => onSelectMode('counterfeit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'counterfeit'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>{homeT.tabCounterfeit || 'Counterfeit'}</span>
          </button>

          <button
            onClick={() => onSelectMode('pest')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'pest'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-amber-600" />
            <span>{homeT.tabPest || 'Pest Doctor'}</span>
          </button>

          <button
            onClick={() => onSelectMode('recommendation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'recommendation'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{homeT.tabRecommendation || 'Dosage'}</span>
          </button>

          <button
            onClick={() => onSelectMode('registry')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'registry'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>{TOP_BAR_TRANSLATIONS[language]?.registry || 'Registry'}</span>
          </button>

          <button
            onClick={() => onSelectMode('myfarm')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'myfarm'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>{homeT.tabMyFarm || 'My Farm'}</span>
          </button>
        </nav>

        {/* Right: Controls & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Compact Language Selector */}
          <div className="flex items-center bg-white border border-neutral-200 hover:border-neutral-300 rounded-full px-2 sm:px-2.5 py-1.5 shadow-2xs shrink-0 transition">
            <Globe className="w-3.5 h-3.5 text-neutral-500 mr-1 sm:mr-1.5 shrink-0" />
            <div className="relative inline-flex items-center">
              <select
                aria-label="Select interface language"
                value={language}
                onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs text-neutral-800 font-bold focus:outline-none cursor-pointer pr-0.5"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white text-neutral-900 font-medium">
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rescaled Weather Button: Shows ONLY icon & temperature to save space */}
          <button
            id="btn-header-weather"
            type="button"
            onClick={onRefreshLocation}
            title={
              weather
                ? `Live Weather: ${weather.location} (${weather.condition}, ${weather.temperature}°C, Humidity ${weather.humidity}%, Wind ${weather.windSpeed} km/h). Click to refresh GPS location.`
                : 'Click to detect GPS location and live weather'
            }
            className="flex items-center gap-1 sm:gap-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-emerald-300 px-2 sm:px-2.5 py-1.5 rounded-full text-xs text-neutral-700 shadow-2xs shrink-0 cursor-pointer transition select-none group"
          >
            {weatherLoading ? (
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin shrink-0" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0 group-hover:rotate-12 transition-transform" />
            )}
            <span className="font-bold text-neutral-900 text-xs">
              {weather ? `${weather.temperature}°C` : '24°C'}
            </span>
          </button>

          {/* Interactive Audio Demo Tour Button */}
          {onStartDemo && (
            <button
              id="btn-header-tour"
              onClick={onStartDemo}
              className="flex items-center gap-1.5 bg-[#0b6633] hover:bg-[#084e27] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition cursor-pointer shrink-0"
              title={TOP_BAR_TRANSLATIONS[language]?.demoTourTooltip || 'Start Interactive Audio Demo Tour'}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline text-xs">{TOP_BAR_TRANSLATIONS[language]?.demoTourBtn || 'Demo Tour'}</span>
            </button>
          )}

          {/* User Profile Badge - ALWAYS VISIBLE */}
          <button
            id="btn-header-profile"
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 bg-emerald-50/90 border border-emerald-300/80 hover:bg-emerald-100 hover:border-emerald-400 px-2 sm:px-2.5 py-1.5 rounded-full text-xs text-neutral-800 shadow-2xs transition cursor-pointer shrink-0"
            title="View Account Profile & Farm Details"
          >
            <div className="w-5 h-5 rounded-full bg-[#134e35] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="font-bold text-neutral-800 max-w-[65px] sm:max-w-[90px] truncate text-xs">
              {user.name}
            </span>
          </button>

          {/* Logout button */}
          {onLogout && (
            <button
              id="btn-header-logout"
              onClick={onLogout}
              className="flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 hover:border-neutral-300 text-neutral-700 px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs transition cursor-pointer shrink-0"
              title="Logout from FAR[M]ATE"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline text-[11px]">Logout</span>
            </button>
          )}

          {/* Emergency Poison Helpline: Compact icon/SOS by default, reveals full number when clicked */}
          <div ref={poisonBtnRef} className="relative shrink-0">
            {!showPoisonNumber ? (
              <button
                id="btn-header-poison-helpline"
                type="button"
                onClick={() => setShowPoisonNumber(true)}
                className="flex items-center gap-1.5 bg-[#e11d48] hover:bg-[#be123c] active:bg-[#9f1239] text-white px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer shrink-0 select-none"
                title="Emergency Poison Control Helpline - Click to show full 24x7 toll-free number"
              >
                <PhoneCall className="w-3.5 h-3.5 fill-white shrink-0" />
                <span className="text-xs font-bold">SOS</span>
              </button>
            ) : (
              <div className="flex items-center bg-[#be123c] text-white rounded-full shadow-md pl-2.5 pr-1 py-1 transition-all animate-in fade-in zoom-in-95 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenPoisonModal) {
                      onOpenPoisonModal();
                    } else {
                      window.open('tel:1800116117');
                    }
                  }}
                  className="flex items-center gap-1.5 text-white hover:text-rose-100 cursor-pointer select-none"
                  title="24x7 Poison Control Toll Free: 1800-116-117 (Click to call / open emergency protocol)"
                >
                  <PhoneCall className="w-3.5 h-3.5 fill-white shrink-0 animate-pulse" />
                  <span className="text-xs font-black tracking-wide whitespace-nowrap">
                    1800-116-117
                  </span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPoisonNumber(false);
                  }}
                  className="ml-1 text-white/80 hover:text-white hover:bg-black/20 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition cursor-pointer"
                  title="Collapse number"
                  aria-label="Collapse helpline number"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
