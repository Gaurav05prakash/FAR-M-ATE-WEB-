import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  CheckCircle2,
  Globe,
  Settings,
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../lib/i18n/languages';
import { DEMO_TOUR_TRANSLATIONS, DemoStepContent } from '../../data/demoTranslations';
import { speechTTS } from '../../lib/voice/speech';

export interface InteractiveDemoTourProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onOpenSettingsModal: () => void;
  userId?: string;
}

interface TargetCoords {
  x: number;
  y: number;
  width: number;
  height: number;
  arrowDir: 'left' | 'right' | 'top' | 'bottom';
  cardX: number;
  cardY: number;
}

const WELCOME_GREETINGS: Record<
  LanguageCode,
  { welcome: string; prompt: string; start: string; voiceSample: string }
> = {
  en: {
    welcome: 'Welcome to FarMate',
    prompt: 'Choose your preferred language for the voice demo and app guidance before we begin:',
    start: 'Start Voice Demo Tour',
    voiceSample: 'Welcome to FarMate. We are ready to begin the voice tour.',
  },
  hi: {
    welcome: 'FarMate में आपका स्वागत है',
    prompt: 'डेमो शुरू करने से पहले आवाज़ और ऐप के लिए अपनी पसंदीदा भाषा चुनें:',
    start: 'वॉयस डेमो टूर शुरू करें',
    voiceSample: 'FarMate में आपका स्वागत है। हम वॉयस टूर शुरू करने के लिए तैयार हैं।',
  },
  te: {
    welcome: 'FarMate కు స్వాగతం',
    prompt: 'డెమో ప్రారంభించే ముందు వాయిస్ మరియు యాప్ కోసం మీ ప్రాధాన్య భాషను ఎంచుకోండి:',
    start: 'వాయిస్ డెమో టూర్ ప్రారంభించండి',
    voiceSample: 'FarMate కు స్వాగతం. మేము వాయిస్ టూర్‌ను ప్రారంభించడానికి సిద్ధంగా ఉన్నాము.',
  },
  ta: {
    welcome: 'FarMate-க்கு உங்களை வரவேற்கிறோம்',
    prompt: 'டெமோ தொடங்குவதற்கு முன் குரல் மற்றும் பயன்பாட்டிற்கு உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்:',
    start: 'குரல் டெமோ சுற்றுப்பயணத்தைத் தொடங்குங்கள்',
    voiceSample: 'FarMate-க்கு உங்களை வரவேற்கிறோம். சுற்றுப்பயணத்தைத் தொடங்க நாங்கள் தயாராக உள்ளோம்.',
  },
  kn: {
    welcome: 'FarMate ಗೆ ಸುಸ್ವಾಗತ',
    prompt: 'ಡೆಮೊ ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಧ್ವನಿ ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್‌ಗಾಗಿ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆರಿಸಿ:',
    start: 'ಧ್ವನಿ ಡೆಮೊ ಪ್ರವಾಸವನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    voiceSample: 'FarMate ಗೆ ಸುಸ್ವಾಗತ. ಪ್ರವಾಸವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನಾವು ಸಿದ್ಧರಿದ್ದೇವೆ.',
  },
  mr: {
    welcome: 'FarMate मध्ये आपले स्वागत आहे',
    prompt: 'डेमो सुरू करण्यापूर्वी व्हॉइस आणि ॲपसाठी तुमची पसंतीची भाषा निवडा:',
    start: 'व्हॉइस डेमो टूर सुरू करा',
    voiceSample: 'FarMate मध्ये आपले स्वागत आहे. आम्ही टूर सुरू करण्यास तयार आहोत.',
  },
  pa: {
    welcome: 'FarMate ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ',
    prompt: 'ਡੈਮੋ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਆਵਾਜ਼ ਅਤੇ ਐਪ ਲਈ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ:',
    start: 'ਵੌਇਸ ਡੈਮੋ ਟੂਰ ਸ਼ੁਰੂ ਕਰੋ',
    voiceSample: 'FarMate ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ। ਅਸੀਂ ਟੂਰ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਤਿਆਰ ਹਾਂ।',
  },
  gu: {
    welcome: 'FarMate માં આપનું સ્વાગત છે',
    prompt: 'ડેમો શરૂ કરતા પહેલા અવાજ અને એપ્લિકેશન માટે તમારી પસંદગીની ભાષા પસંદ કરો:',
    start: 'વોઈસ ડેમો ટૂર શરૂ કરો',
    voiceSample: 'FarMate માં આપનું સ્વાગત છે. અમે પ્રવાસ શરૂ કરવા માટે તૈયાર છીએ.',
  },
  bn: {
    welcome: 'FarMate-এ আপনাকে স্বাগতম',
    prompt: 'ডেমো শুরু করার আগে ভয়েস এবং অ্যাপের জন্য আপনার পছন্দের ভাষা নির্বাচন করুন:',
    start: 'ভয়েস ডেমো ট্যুর শুরু করুন',
    voiceSample: 'FarMate-এ আপনাকে স্বাগতম। আমরা ট্যুর শুরু করার জন্য প্রস্তুত।',
  },
  ml: {
    welcome: 'FarMate-ലേക്ക് സ്വാഗതം',
    prompt: 'ഡെമോ ആരംഭിക്കുന്നതിന് മുമ്പ് വോയ്‌സിനും ആപ്പിനുമായി നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക:',
    start: 'വോയ്‌സ് ഡെമോ ടൂർ ആരംഭിക്കുക',
    voiceSample: 'FarMate-ലേക്ക് സ്വാഗതം. ടൂർ ആരംഭിക്കാൻ ഞങ്ങൾ തയ്യാറാണ്.',
  },
  or: {
    welcome: 'FarMate କୁ ସ୍ଵାଗତ',
    prompt: 'ଡେମୋ ଆରମ୍ଭ କରିବା ପୂର୍ବରୁ ଭଏସ୍ ଏବଂ ଆପ୍ ପାଇଁ ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ:',
    start: 'ଭଏସ୍ ଡେମୋ ଟୁର୍ ଆରମ୍ଭ କରନ୍ତୁ',
    voiceSample: 'FarMate କୁ ସ୍ଵାଗତ।',
  },
  ur: {
    welcome: 'FarMate میں خوش آمدید',
    prompt: 'ڈیمو شروع کرنے سے پہلے آواز اور ایپ کے لیے اپنی ترجیحی زبان کا انتخاب کریں:',
    start: 'وائس ڈیمو ٹور شروع کریں',
    voiceSample: 'FarMate میں خوش آمدید۔',
  },
  es: {
    welcome: 'Bienvenido a FarMate',
    prompt: 'Elija su idioma preferido para la voz y la aplicación antes de comenzar:',
    start: 'Iniciar recorrido de demostración',
    voiceSample: 'Bienvenido a FarMate.',
  },
  fr: {
    welcome: 'Bienvenue sur FarMate',
    prompt: 'Choisissez votre langue préférée avant de commencer la visite guidée:',
    start: 'Démarrer la visite guidée',
    voiceSample: 'Bienvenue sur FarMate.',
  },
  pt: {
    welcome: 'Bem-vindo ao FarMate',
    prompt: 'Escolha seu idioma preferido antes de iniciar a demonstração:',
    start: 'Iniciar demonstração por voz',
    voiceSample: 'Bem-vindo ao FarMate.',
  },
  sw: {
    welcome: 'Karibu FarMate',
    prompt: 'Chagua lugha unayopendelea kabla ya kuanza ziara:',
    start: 'Anza Ziara ya Onyesho',
    voiceSample: 'Karibu FarMate.',
  },
  vi: {
    welcome: 'Chào mừng bạn đến với FarMate',
    prompt: 'Chọn ngôn ngữ ưu tiên của bạn trước khi bắt đầu chuyến tham quan:',
    start: 'Bắt đầu chuyến tham quan',
    voiceSample: 'Chào mừng bạn đến với FarMate.',
  },
  ar: {
    welcome: 'مرحبًا بك في FarMate',
    prompt: 'اختر لغتك المفضلة للدليل الصوتي والتطبيق قبل البدء:',
    start: 'بدء الجولة الإرشادية',
    voiceSample: 'مرحبًا بك في FarMate.',
  },
  id: {
    welcome: 'Selamat Datang di FarMate',
    prompt: 'Pilih bahasa pilihan Anda untuk panduan suara sebelum memulai tur:',
    start: 'Mulai Tur Demo Suara',
    voiceSample: 'Selamat datang di FarMate.',
  },
};

const POPULAR_LANGUAGES: LanguageCode[] = [
  'en',
  'hi',
  'te',
  'ta',
  'kn',
  'mr',
  'pa',
  'gu',
  'bn',
  'ml',
];

export const InteractiveDemoTour: React.FC<InteractiveDemoTourProps> = ({
  isOpen,
  onClose,
  language,
  onSelectLanguage,
  onOpenSettingsModal,
  userId,
}) => {
  // Step 0 represents the Pre-Demo Language Setup & Welcome screen
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [targetCoords, setTargetCoords] = useState<TargetCoords | null>(null);
  const [targetFound, setTargetFound] = useState<boolean>(false);
  const [isTourFinished, setIsTourFinished] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const retryTimeoutRef = useRef<any>(null);
  const speechTimerRef = useRef<any>(null);

  // Retrieve translation content for current language or fallback to English
  const tStrings = DEMO_TOUR_TRANSLATIONS[language] || DEMO_TOUR_TRANSLATIONS.en;

  // Reset to step 0 (Language Setup) whenever the tour is newly opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsTourFinished(false);
    } else {
      if (speechTimerRef.current) {
        clearTimeout(speechTimerRef.current);
        speechTimerRef.current = null;
      }
      speechTTS.stop();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  const getStepData = (step: number): DemoStepContent => {
    switch (step) {
      case 1:
        return tStrings.step1Counterfeit;
      case 2:
        return tStrings.step2Recommendation;
      case 3:
        return tStrings.step3Pest;
      case 4:
        return tStrings.step4Soil;
      case 5:
        return tStrings.step5Crop;
      default:
        return tStrings.step1Counterfeit;
    }
  };

  const currentStepData = getStepData(currentStep);

  // Target element selector mapping
  const getSelectorForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return ['#sidebar-nav-counterfeit', '#dash-tab-counterfeit', '#header-nav-counterfeit'];
      case 2:
        return ['#sidebar-nav-recommendation', '#dash-tab-recommendation', '#header-nav-recommendation'];
      case 3:
        return ['#sidebar-nav-pest', '#dash-tab-pest', '#header-nav-pest'];
      case 4:
        return ['#tour-soil-type'];
      case 5:
        return ['#tour-target-crops'];
      default:
        return ['#sidebar-nav-counterfeit'];
    }
  };

  // Calculate coordinates and arrow direction relative to target
  const updatePosition = useCallback(() => {
    if (!isOpen || currentStep === 0) {
      setTargetCoords(null);
      setTargetFound(false);
      return;
    }

    const selectors = getSelectorForStep(currentStep);
    let targetEl: HTMLElement | null = null;

    for (const sel of selectors) {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el && el.offsetParent !== null) {
        // Element is in DOM and visible
        targetEl = el;
        break;
      }
    }

    if (!targetEl) {
      // If on step 4 or 5 and settings modal isn't open or element not yet rendered, open settings
      if (currentStep >= 4) {
        onOpenSettingsModal();
      }
      setTargetFound(false);
      return;
    }

    setTargetFound(true);

    // Scroll into view if needed (especially for steps 4 & 5 inside modal)
    if (currentStep >= 4) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const rect = targetEl.getBoundingClientRect();
    const cardWidth = 350;
    const cardHeight = 260;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let arrowDir: 'left' | 'right' | 'top' | 'bottom' = 'left';
    let cardX = 0;
    let cardY = 0;

    // Check if target is on the left side of the screen (e.g. sidebar)
    if (rect.left < 280 && rect.right + cardWidth + 40 < windowWidth) {
      arrowDir = 'left'; // arrow points left at target
      cardX = rect.right + 24;
      cardY = Math.max(16, Math.min(windowHeight - cardHeight - 16, rect.top + rect.height / 2 - cardHeight / 2));
    }
    // Check if target is near top (e.g. horizontal navigation tab or crops top)
    else if (rect.top < 220 && rect.bottom + cardHeight + 40 < windowHeight) {
      arrowDir = 'top'; // arrow points up at target
      cardX = Math.max(16, Math.min(windowWidth - cardWidth - 16, rect.left + rect.width / 2 - cardWidth / 2));
      cardY = rect.bottom + 20;
    }
    // Check if room to the right of modal / element
    else if (rect.right + cardWidth + 30 < windowWidth) {
      arrowDir = 'left';
      cardX = rect.right + 20;
      cardY = Math.max(16, Math.min(windowHeight - cardHeight - 16, rect.top + rect.height / 2 - cardHeight / 2));
    }
    // Check if room to the left
    else if (rect.left - cardWidth - 30 > 0) {
      arrowDir = 'right';
      cardX = rect.left - cardWidth - 20;
      cardY = Math.max(16, Math.min(windowHeight - cardHeight - 16, rect.top + rect.height / 2 - cardHeight / 2));
    }
    // Otherwise place card below target
    else if (rect.bottom + cardHeight + 20 < windowHeight) {
      arrowDir = 'top';
      cardX = Math.max(16, Math.min(windowWidth - cardWidth - 16, rect.left + rect.width / 2 - cardWidth / 2));
      cardY = rect.bottom + 20;
    }
    // Otherwise place card above target
    else {
      arrowDir = 'bottom';
      cardX = Math.max(16, Math.min(windowWidth - cardWidth - 16, rect.left + rect.width / 2 - cardWidth / 2));
      cardY = Math.max(16, rect.top - cardHeight - 20);
    }

    setTargetCoords({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      arrowDir,
      cardX,
      cardY,
    });
  }, [currentStep, isOpen, onOpenSettingsModal]);

  // Handle Speech Audio synthesis for the active step
  const speakCurrentStep = useCallback(
    (lang: LanguageCode) => {
      if (isMuted) return;

      // Stop any existing speech playback immediately
      speechTTS.stop();

      let textToSpeak = '';
      if (currentStep === 0) {
        textToSpeak =
          WELCOME_GREETINGS[lang]?.voiceSample ||
          WELCOME_GREETINGS.en.voiceSample;
      } else {
        textToSpeak = getStepData(currentStep).speechText;
      }

      setIsSpeaking(true);

      speechTTS
        .speak(textToSpeak, lang, () => {
          setIsSpeaking(false);
        })
        .catch(() => {
          setIsSpeaking(false);
        });
    },
    [currentStep, isMuted, tStrings]
  );

  // Position recalculation on step change, resize, scroll
  useEffect(() => {
    if (!isOpen) return;

    // Trigger settings modal opening when stepping into step 4
    if (currentStep === 4) {
      onOpenSettingsModal();
    }

    // Attempt immediately and with short retries to allow DOM animations
    updatePosition();
    const timer1 = setTimeout(updatePosition, 150);
    const timer2 = setTimeout(updatePosition, 400);
    const timer3 = setTimeout(updatePosition, 800);

    const handleResizeOrScroll = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('resize', handleResizeOrScroll, { passive: true });
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true, capture: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll, { capture: true });
    };
  }, [currentStep, isOpen, updatePosition, onOpenSettingsModal]);

  // Play speech whenever step or language changes
  useEffect(() => {
    if (!isOpen) {
      if (speechTimerRef.current) {
        clearTimeout(speechTimerRef.current);
        speechTimerRef.current = null;
      }
      speechTTS.stop();
      setIsSpeaking(false);
      return;
    }

    // Immediately stop any prior speech before arming next step voice
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    speechTTS.stop();
    setIsSpeaking(false);

    // Small delay before speaking so visual components snap cleanly
    speechTimerRef.current = setTimeout(() => {
      speakCurrentStep(language);
    }, 280);

    return () => {
      if (speechTimerRef.current) {
        clearTimeout(speechTimerRef.current);
        speechTimerRef.current = null;
      }
      speechTTS.stop();
      setIsSpeaking(false);
    };
  }, [currentStep, language, isOpen, speakCurrentStep]);

  // User selects language on Step 0
  const handleSelectLanguageInWelcome = (newLang: LanguageCode) => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    speechTTS.stop();
    setIsSpeaking(false);
    onSelectLanguage(newLang);

    // Play immediate greeting sample for the selected language
    speechTimerRef.current = setTimeout(() => {
      if (!isMuted) {
        const sample =
          WELCOME_GREETINGS[newLang]?.voiceSample || WELCOME_GREETINGS.en.voiceSample;
        setIsSpeaking(true);
        speechTTS
          .speak(sample, newLang, () => setIsSpeaking(false))
          .catch(() => setIsSpeaking(false));
      }
    }, 150);
  };

  // Start the 5-step tour from Step 0
  const handleStartTourFromWelcome = () => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    speechTTS.stop();
    setIsSpeaking(false);
    setCurrentStep(1);
  };

  // Open profile & settings modal directly from Step 0
  const handleOpenSettingsFromWelcome = () => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    speechTTS.stop();
    setIsSpeaking(false);
    onOpenSettingsModal();
  };

  // Handle tour completion
  const handleFinishTour = () => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    speechTTS.stop();
    setIsSpeaking(false);
    setIsTourFinished(true);
    if (userId) {
      try {
        localStorage.setItem(`farmate_demo_seen_${userId}`, 'true');
      } catch (e) {
        // Safe fallback
      }
    }
    try {
      localStorage.setItem('farmate_demo_seen_global', 'true');
    } catch (e) {
      // Safe fallback
    }

    setTimeout(() => {
      onClose();
      setIsTourFinished(false);
      setCurrentStep(0);
    }, 800);
  };

  const handleNext = () => {
    // Stop previously playing audio immediately when pressing Next
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    speechTTS.stop();
    setIsSpeaking(false);

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinishTour();
    }
  };

  const handleBack = () => {
    // Stop previously playing audio immediately when pressing Back
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    speechTTS.stop();
    setIsSpeaking(false);

    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    speechTTS.stop();
    setIsSpeaking(false);
    if (userId) {
      try {
        localStorage.setItem(`farmate_demo_seen_${userId}`, 'true');
      } catch (e) {}
    }
    try {
      localStorage.setItem('farmate_demo_seen_global', 'true');
    } catch (e) {}
    onClose();
    setCurrentStep(0);
  };

  const toggleMute = () => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    if (isSpeaking) {
      speechTTS.stop();
      setIsSpeaking(false);
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
      speakCurrentStep(language);
    } else {
      setIsMuted(true);
      speechTTS.stop();
      setIsSpeaking(false);
    }
  };

  const handleReplayVoice = () => {
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    speechTTS.stop();
    setIsSpeaking(false);
    setIsMuted(false);
    speakCurrentStep(language);
  };

  if (!isOpen) return null;

  return (
    <div
      id="interactive-demo-overlay"
      className="fixed inset-0 z-[9999] pointer-events-none transition-all duration-300"
      role="dialog"
      aria-label="Interactive App Demo Tour"
    >
      {/* Dimmed backdrop with cutout focus */}
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-auto" />

      {/* Target Element Spotlight Ring - Clean solid border matching app */}
      {targetCoords && currentStep > 0 && (
        <div
          className="absolute rounded-2xl border-2 border-[#0b6633] bg-[#0b6633]/10 ring-4 ring-[#0b6633]/20 shadow-md transition-all duration-300 pointer-events-none"
          style={{
            left: targetCoords.x - 4,
            top: targetCoords.y - 4,
            width: targetCoords.width + 8,
            height: targetCoords.height + 8,
          }}
        />
      )}

      {/* Animated Directional Arrow - Solid app green */}
      {targetCoords && currentStep > 0 && (
        <div
          className="absolute z-10 pointer-events-none transition-all duration-300"
          style={{
            ...(targetCoords.arrowDir === 'left' && {
              left: targetCoords.x + targetCoords.width + 4,
              top: targetCoords.y + targetCoords.height / 2 - 14,
            }),
            ...(targetCoords.arrowDir === 'right' && {
              left: targetCoords.x - 34,
              top: targetCoords.y + targetCoords.height / 2 - 14,
            }),
            ...(targetCoords.arrowDir === 'top' && {
              left: targetCoords.x + targetCoords.width / 2 - 14,
              top: targetCoords.y + targetCoords.height + 4,
            }),
            ...(targetCoords.arrowDir === 'bottom' && {
              left: targetCoords.x + targetCoords.width / 2 - 14,
              top: targetCoords.y - 34,
            }),
          }}
        >
          {targetCoords.arrowDir === 'left' && (
            <div className="flex items-center -space-x-1 animate-bounce">
              <svg className="w-7 h-7 text-[#0b6633] drop-shadow-sm -rotate-90" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
          )}
          {targetCoords.arrowDir === 'right' && (
            <div className="flex items-center -space-x-1 animate-bounce">
              <svg className="w-7 h-7 text-[#0b6633] drop-shadow-sm rotate-90" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
          )}
          {targetCoords.arrowDir === 'top' && (
            <div className="flex items-center justify-center animate-bounce">
              <svg className="w-7 h-7 text-[#0b6633] drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
          )}
          {targetCoords.arrowDir === 'bottom' && (
            <div className="flex items-center justify-center animate-bounce">
              <svg className="w-7 h-7 text-[#0b6633] drop-shadow-sm rotate-180" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Transparent Interface: Sleek Floating Glass Card matching the app's solid theme */}
      <div
        ref={cardRef}
        id="interactive-demo-card"
        className="absolute pointer-events-auto transition-all duration-300 ease-out z-20"
        style={{
          left: targetCoords && currentStep > 0 ? targetCoords.cardX : '50%',
          top: targetCoords && currentStep > 0 ? targetCoords.cardY : '50%',
          transform: !targetCoords || currentStep === 0 ? 'translate(-50%, -50%)' : 'none',
        }}
      >
        {currentStep === 0 ? (
          /* Step 0: Pre-Tour Language Setup Screen */
          <div className="w-[340px] sm:w-[470px] max-w-[95vw] bg-white/95 backdrop-blur-md text-neutral-900 border border-neutral-200/90 shadow-2xl rounded-2xl p-4 sm:p-5 overflow-hidden relative animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0b6633] flex items-center justify-center font-bold shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    {WELCOME_GREETINGS[language]?.welcome || 'Welcome to FarMate'}
                  </h3>
                  <p className="text-[11px] text-[#0b6633] font-semibold">
                    Language Setup • Step 0 of 5
                  </p>
                </div>
              </div>

              <button
                onClick={handleSkip}
                title={tStrings.controls.skip}
                className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="py-3 space-y-3">
              <div>
                <p className="text-xs font-semibold text-neutral-700 leading-relaxed">
                  {WELCOME_GREETINGS[language]?.prompt ||
                    'Choose your preferred language for the voice demo and app guidance before we begin:'}
                </p>
              </div>

              {/* Grid of popular languages */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
                {POPULAR_LANGUAGES.map((code) => {
                  const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === code);
                  if (!langInfo) return null;
                  const isSelected = language === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleSelectLanguageInWelcome(code)}
                      className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-left border transition cursor-pointer ${
                        isSelected
                          ? 'border-[#0b6633] bg-emerald-50 text-[#084e27] ring-1 ring-[#0b6633]/30 font-bold shadow-2xs'
                          : 'border-neutral-200/80 bg-neutral-50/70 hover:bg-neutral-100/90 text-neutral-700 font-medium'
                      }`}
                    >
                      <div className="truncate mr-1">
                        <span className="block text-xs leading-tight font-bold">{langInfo.nativeName}</span>
                        <span className="block text-[10px] text-neutral-500">{langInfo.name}</span>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0b6633] shrink-0" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-neutral-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Additional language dropdown */}
              <div className="flex items-center justify-between gap-2 pt-1 bg-neutral-50 p-2 rounded-xl border border-neutral-200/70">
                <label className="text-[11px] text-neutral-600 font-semibold whitespace-nowrap">
                  All 19 Languages:
                </label>
                <select
                  aria-label="All languages"
                  value={language}
                  onChange={(e) => handleSelectLanguageInWelcome(e.target.value as LanguageCode)}
                  className="flex-1 bg-white hover:bg-neutral-50 text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded-lg border border-neutral-200 focus:outline-none focus:border-[#0b6633] cursor-pointer transition"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.nativeName} ({l.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Voice status & preview test pill */}
              <div className="flex items-center justify-between bg-emerald-50/60 border border-emerald-200/80 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border transition cursor-pointer ${
                      isSpeaking
                        ? 'bg-emerald-100 text-[#084e27] border-emerald-300'
                        : isMuted
                        ? 'bg-neutral-100 text-neutral-500 border-neutral-200'
                        : 'bg-emerald-50 text-[#0b6633] border-emerald-200'
                    }`}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3 h-3 text-rose-600" />
                        <span>Muted</span>
                      </>
                    ) : isSpeaking ? (
                      <>
                        <div className="flex items-end gap-0.5 h-2.5 w-3">
                          <span className="w-0.5 bg-[#0b6633] animate-[bounce_0.6s_infinite_100ms] h-full rounded-full" />
                          <span className="w-0.5 bg-[#0b6633] animate-[bounce_0.6s_infinite_200ms] h-3/4 rounded-full" />
                          <span className="w-0.5 bg-[#0b6633] animate-[bounce_0.6s_infinite_300ms] h-1/2 rounded-full" />
                          <span className="w-0.5 bg-[#0b6633] animate-[bounce_0.6s_infinite_150ms] h-full rounded-full" />
                        </div>
                        <span>Playing Voice Sample</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-[#0b6633]" />
                        <span>Voice Ready</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11px] text-neutral-600 font-medium">
                    {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleReplayVoice}
                  className="text-[11px] font-bold text-[#0b6633] hover:text-[#084e27] flex items-center gap-1 cursor-pointer transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Test Audio</span>
                </button>
              </div>
            </div>

            {/* Footer Controls */}
            <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleOpenSettingsFromWelcome}
                className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold border border-neutral-200 transition cursor-pointer flex items-center justify-center gap-1.5"
                title="Configure profile and language in Settings"
              >
                <Settings className="w-3.5 h-3.5 text-[#0b6633]" />
                <span>Go to Settings & Profile</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition cursor-pointer"
                >
                  {tStrings.controls.skip}
                </button>
                <button
                  type="button"
                  onClick={handleStartTourFromWelcome}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#0b6633] hover:bg-[#084e27] text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{WELCOME_GREETINGS[language]?.start || 'Start Voice Demo Tour'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Steps 1 to 5: Feature Spotlight Card */
          <div className="w-[330px] sm:w-[370px] bg-white/95 backdrop-blur-md text-neutral-900 border border-neutral-200/90 shadow-xl rounded-2xl p-4 overflow-hidden relative">
            {/* Top Bar: Progress Badge, Equalizer, Language Selector, Close */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-neutral-100">
              {/* Step Counter & Indicator Dots */}
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-[#084e27] border border-emerald-200">
                  {tStrings.controls.stepOf(currentStep, 5)}
                </span>
                <div className="flex items-center gap-1 ml-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        s === currentStep
                          ? 'w-4 bg-[#0b6633]'
                          : s < currentStep
                          ? 'w-1.5 bg-[#0b6633]/60'
                          : 'w-1.5 bg-neutral-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Language Selector Dropdown right in the tour */}
              <div className="flex items-center gap-1.5">
                <div className="relative flex items-center">
                  <Globe className="w-3 h-3 text-neutral-500 absolute left-2 pointer-events-none" />
                  <select
                    aria-label="Demo Audio Language"
                    value={language}
                    onChange={(e) => {
                      const newLang = e.target.value as LanguageCode;
                      onSelectLanguage(newLang);
                    }}
                    className="bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-[11px] font-semibold pl-6 pr-2 py-1 rounded-lg border border-neutral-200 focus:outline-none focus:border-[#0b6633] cursor-pointer appearance-none transition"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code} className="bg-white text-neutral-900">
                        {l.nativeName} ({l.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Close / Skip button */}
                <button
                  onClick={handleSkip}
                  title={tStrings.controls.skip}
                  className="w-6 h-6 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Card Content */}
            <div className="py-3 space-y-2">
              {/* Title & Badge */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0b6633] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#0b6633]" />
                    {currentStepData.badge}
                  </span>
                  {/* Voice Status Pill */}
                  <button
                    onClick={toggleMute}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition cursor-pointer ${
                      isSpeaking
                        ? 'bg-emerald-50 text-[#084e27] border-emerald-300'
                        : isMuted
                        ? 'bg-neutral-100 text-neutral-500 border-neutral-200'
                        : 'bg-emerald-50/50 text-[#0b6633] border-emerald-200'
                    }`}
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3 h-3 text-rose-600" />
                        <span>Muted</span>
                      </>
                    ) : isSpeaking ? (
                      <>
                        {/* Equalizer 4-bar Waveform */}
                        <div className="flex items-end gap-0.5 h-2.5 w-3">
                          <span className="w-0.5 bg-[#0b6633] animate-[bounce_0.6s_infinite_100ms] h-full rounded-full" />
                          <span className="w-0.5 bg-[#0b6633] animate-[bounce_0.6s_infinite_200ms] h-3/4 rounded-full" />
                          <span className="w-0.5 bg-[#0b6633] animate-[bounce_0.6s_infinite_300ms] h-1/2 rounded-full" />
                          <span className="w-0.5 bg-[#0b6633] animate-[bounce_0.6s_infinite_150ms] h-full rounded-full" />
                        </div>
                        <span>Speaking</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-[#0b6633]" />
                        <span>Voice Ready</span>
                      </>
                    )}
                  </button>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-neutral-900 mt-1 leading-snug">
                  {currentStepData.title}
                </h4>
              </div>

              {/* Explanation Text */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                {currentStepData.explanation}
              </p>
            </div>

            {/* Bottom Bar Controls */}
            <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2">
              {/* Replay Audio Button */}
              <button
                onClick={handleReplayVoice}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold border border-neutral-200 transition cursor-pointer"
                title={tStrings.controls.voiceReplay}
              >
                <RotateCcw className="w-3 h-3 text-[#0b6633]" />
                <span className="text-[11px]">{tStrings.controls.voiceReplay}</span>
              </button>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBack}
                  className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold border border-neutral-200 transition cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{currentStep === 1 ? 'Language' : tStrings.controls.back}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0b6633] hover:bg-[#084e27] text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1"
                >
                  <span>{currentStep === 5 ? tStrings.controls.finish : tStrings.controls.next}</span>
                  {currentStep === 5 ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Tour Finished Success Toast */}
            {isTourFinished && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-300 text-[#0b6633] flex items-center justify-center mb-2 animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-neutral-900 mb-1">
                  {tStrings.controls.tourCompleted}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

