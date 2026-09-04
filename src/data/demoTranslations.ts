/**
 * FAR[M]ATE Interactive Demo & Onboarding Voice Tour Translations
 * Authentic agricultural guidance across all 19 supported languages.
 */

import { LanguageCode } from '../types';

export interface DemoStepContent {
  title: string;
  badge: string;
  explanation: string;
  speechText: string;
}

export interface DemoTourStrings {
  step1Counterfeit: DemoStepContent;
  step2Recommendation: DemoStepContent;
  step3Pest: DemoStepContent;
  step4Soil: DemoStepContent;
  step5Crop: DemoStepContent;
  controls: {
    next: string;
    back: string;
    finish: string;
    skip: string;
    stepOf: (curr: number, total: number) => string;
    voicePlaying: string;
    voiceReplay: string;
    tourCompleted: string;
  };
}

export const DEMO_TOUR_TRANSLATIONS: Record<LanguageCode, DemoTourStrings> = {
  en: {
    step1Counterfeit: {
      title: 'Counterfeit Detection (VerifyX)',
      badge: 'Feature 1 of 5',
      explanation: 'Scan product barcodes, batch QR codes, or 3D security holograms to verify statutory CIBRC registration and detect fake or banned chemicals before purchasing.',
      speechText: 'Welcome to FAR[M]ATE. Here is Counterfeit Detection. Use this tab to scan pesticide barcodes and 3D holograms to verify authentic CIBRC registration and stop fake chemicals before spraying.',
    },
    step2Recommendation: {
      title: 'Recommendation & Dosage Calculator',
      badge: 'Feature 2 of 5',
      explanation: 'Calculate precise knapsack sprayer tank dosages (per 15-litre tank), safe application timing, PPE gear, and CIBRC-approved formulations for your crops.',
      speechText: 'Next is the Recommendation System. This calculates exact knapsack sprayer dosages per 15-litre tank for approved chemicals, along with protective PPE gear and weather spray cautions.',
    },
    step3Pest: {
      title: 'Pest Doctor (AI Plant Pathology)',
      badge: 'Feature 3 of 5',
      explanation: 'Photograph diseased leaves or describe symptoms to receive instant AI diagnosis, economic threshold analysis, and verified organic and bio-remedies.',
      speechText: 'Here is the Pest Doctor tab. Take a photo of affected leaves or describe symptoms to get instant disease identification, severity levels, and safe treatment options.',
    },
    step4Soil: {
      title: 'Farm Soil Type Configuration',
      badge: 'Step 4 of 5 • Farm Settings',
      explanation: 'Select or type your farm soil type (e.g. Black Cotton, Red Loam, Alluvial). The AI tailors basal fertilizer doses, moisture retention, and leaching safety to your soil.',
      speechText: 'Now we opened Farm Settings. Look at the Soil Type section. Select your farm soil such as Black Cotton or Red Loam, so the AI customizes fertilizer doses and watering intervals for your land.',
    },
    step5Crop: {
      title: 'Target Crops Selection',
      badge: 'Step 5 of 5 • Farm Settings',
      explanation: 'Tap presets like Tomato, Wheat, or Rice, or type any custom crop. The AI focuses all disease alerts, spray calendars, and dosage calculations specifically on your crops.',
      speechText: 'Finally, look at the Target Crops section. Tap your primary crops like Tomato, Wheat, or Rice, or type custom crops. The AI will focus all advisories and dosage math on your chosen crops.',
    },
    controls: {
      next: 'Next',
      back: 'Back',
      finish: 'Finish Tour',
      skip: 'Skip Tour',
      stepOf: (curr, total) => `Step ${curr} of ${total}`,
      voicePlaying: 'AI Voice Explaining...',
      voiceReplay: 'Replay Voice',
      tourCompleted: 'Tour completed! You are ready to explore FAR[M]ATE.',
    },
  },

  hi: {
    step1Counterfeit: {
      title: 'नकली दवा पहचान (Counterfeit Detection)',
      badge: 'सुविधा 1/5',
      explanation: 'कीटनाशक के बारकोड, बैच क्यूआर कोड या 3D सुरक्षा होलोग्राम को स्कैन करके असली सीआईबीआरसी पंजीकरण जांचें और नकली या प्रतिबंधित रसायनों से बचें।',
      speechText: 'फ़ार्मेट में आपका स्वागत है। यह है नकली दवा पहचान टैब। कीटनाशक के बारकोड और 3D होलोग्राम को स्कैन करके असली सीआईबीआरसी पंजीकरण की जांच करें और नकली रसायनों को तुरंत पहचानें।',
    },
    step2Recommendation: {
      title: 'दवा अनुशंसा एवं 15L टंकी खुराक (Recommendation)',
      badge: 'सुविधा 2/5',
      explanation: 'अपनी फसल के लिए सीआईबीआरसी स्वीकृत रसायनों की प्रति 15 लीटर नैपसैक टंकी सटीक खुराक, पीपीई सुरक्षा किट और मौसम अनुसार छिड़काव सलाह प्राप्त करें।',
      speechText: 'अगला टैब है दवा अनुशंसा प्रणाली। यह आपकी फसल के लिए 15 लीटर टंकी के अनुसार सही दवा की मात्रा, सुरक्षा किट और मौसम के अनुसार छिड़काव का सही समय बताता है।',
    },
    step3Pest: {
      title: 'कीट एवं रोग डॉक्टर (Pest Doctor)',
      badge: 'सुविधा 3/5',
      explanation: 'रोगग्रस्त पत्तियों की फोटो खींचें या लक्षण बताएं। एआई तुरंत रोग की पहचान, नुकसान स्तर (ETL) और जैविक एवं रासायनिक उपचार बताएगा।',
      speechText: 'यह है कीट एवं रोग डॉक्टर टैब। फसल की पत्तियों की फोटो खींचें या लक्षण बताएं। एआई तुरंत रोग की पहचान करके सटीक जैविक और सुरक्षित उपचार बताएगा।',
    },
    step4Soil: {
      title: 'खेत की मिट्टी का प्रकार (Soil Type)',
      badge: 'चरण 4/5 • खेत सेटिंग्स',
      explanation: 'अपनी मिट्टी जैसे काली कपास मिट्टी, लाल दोमट या जलोढ़ चुनें या टाइप करें, ताकि एआई खाद की सटीक मात्रा और सिंचाई का समय तय कर सके।',
      speechText: 'अब हमने सेटिंग्स खोली है। यहाँ मिट्टी का प्रकार देखें। अपनी मिट्टी जैसे काली या लाल दोमट चुनें, ताकि एआई खाद की सटीक खुराक और सिंचाई की सलाह आपकी मिट्टी के अनुसार दे सके।',
    },
    step5Crop: {
      title: 'प्रमुख फसलें (Target Crops)',
      badge: 'चरण 5/5 • खेत सेटिंग्स',
      explanation: 'टमाटर, गेहूं, धान जैसी फसलें चुनें या अन्य फसल टाइप करें। एआई सभी रोग चेतावनियाँ और छिड़काव सलाह केवल आपकी फसलों पर केंद्रित रखेगा।',
      speechText: 'अंत में ऊपर फसलें देखें। अपनी फसलें जैसे टमाटर, गेहूं या धान चुनें। एआई सभी रोग सलाह और दवा की मात्रा आपकी चुनी हुई फसलों के अनुसार तैयार करेगा।',
    },
    controls: {
      next: 'आगे बढ़ें',
      back: 'पीछे',
      finish: 'टूर समाप्त',
      skip: 'छोड़ें',
      stepOf: (curr, total) => `चरण ${curr}/${total}`,
      voicePlaying: 'एआई आवाज़ में विवरण...',
      voiceReplay: 'आवाज़ दोबारा सुनें',
      tourCompleted: 'डेमो पूरा हुआ! अब आप फ़ार्मेट का उपयोग कर सकते हैं।',
    },
  },

  te: {
    step1Counterfeit: {
      title: 'నకిలీ మందుల గుర్తింపు (Counterfeit Detection)',
      badge: 'ఫీచర్ 1/5',
      explanation: 'పురుగుమందుల బార్‌కోడ్, క్యూఆర్ కోడ్ లేదా 3D హోలోగ్రామ్‌ను స్కాన్ చేసి CIBRC అసలు రిజిస్ట్రేషన్ నిర్ధారించుకోండి మరియు నకిలీ రసాయనాలను నివారించండి.',
      speechText: 'ఫార్మేట్‌కు స్వాగతం. ఇది నకిలీ మందుల గుర్తింపు ట్యాబ్. పురుగుమందుల బార్‌కోడ్ మరియు 3D హోలోగ్రామ్‌ను స్కాన్ చేసి నకిలీ రసాయనాలను సులభంగా గుర్తించండి.',
    },
    step2Recommendation: {
      title: 'సిఫార్సు & ట్యాంక్ మోతాదు కాలిక్యులేటర్',
      badge: 'ఫీచర్ 2/5',
      explanation: '15 లీటర్ల న్యాప్‌సాక్ స్ప్రేయర్ ట్యాంక్‌కు ఖచ్చితమైన మోతాదు, భద్రతా రక్షణ కిట్ మరియు వాతావరణ ఆధారిత స్ప్రే సూచనలను పొందండి.',
      speechText: 'తరువాత సిఫార్సు విధానం. ఇది ప్రతి 15 లీటర్ల ట్యాంక్‌కు మందుల ఖచ్చితమైన మోతాదు మరియు రక్షణ కిట్ సూచనలను తెలియజేస్తుంది.',
    },
    step3Pest: {
      title: 'తెగుళ్ల డాక్టర్ (Pest Doctor)',
      badge: 'ఫీచర్ 3/5',
      explanation: 'తెగులు సోకిన ఆకుల ఫోటో తీయండి లేదా లక్షణాలు టైప్ చేయండి. AI వెంటనే వ్యాధిని గుర్తించి సహజ మరియు సిఫార్సు చేసిన చికిత్సలను అందిస్తుంది.',
      speechText: 'ఇది తెగుళ్ల డాక్టర్ ట్యాబ్. పంట ఆకుల ఫోటో తీయడం ద్వారా AI తెగులును గుర్తించి తగిన సేంద్రీయ మరియు రసాయన నివారణ చర్యలను సూచిస్తుంది.',
    },
    step4Soil: {
      title: 'పొలం నేల రకం ఎంపిక (Soil Type)',
      badge: 'దశ 4/5 • సెట్టింగ్‌లు',
      explanation: 'నల్లరేగడి, ఎర్ర నేల లేదా ఒండ్రు నేల ఎంచుకోండి. మీ నేల లక్షణాలకు అనుగుణంగా AI ఎరువుల మోతాదును లెక్కిస్తుంది.',
      speechText: 'ఇప్పుడు సెట్టింగ్‌లలో నేల రకం చూడండి. మీ పొలం నేల నల్లరేగడి లేదా ఎర్ర నేలగా ఎంచుకోండి, తద్వారా AI సరైన ఎరువుల మోతాదును లెక్కిస్తుంది.',
    },
    step5Crop: {
      title: 'పంటల ఎంపిక (Target Crops)',
      badge: 'దశ 5/5 • సెట్టింగ్‌లు',
      explanation: 'టమోటా, వరి, పత్తి వంటి మీ పంటలను ఎంచుకోండి. AI అన్ని సలహాలను మీ పంటలపై మాత్రమే కేంద్రీకరిస్తుంది.',
      speechText: 'చివరగా మీ పంటలను ఎంచుకోండి. టమోటా, వరి లేదా పత్తి వంటి పంటలను ఎంచుకుంటే, AI అన్ని తెగుళ్ల సలహాలను ఆ పంటల కోసమే అందిస్తుంది.',
    },
    controls: {
      next: 'తరువాత',
      back: 'వెనుకకు',
      finish: 'పూర్తయింది',
      skip: 'దాటవేయి',
      stepOf: (curr, total) => `దశ ${curr}/${total}`,
      voicePlaying: 'AI వాయిస్ వివరిస్తోంది...',
      voiceReplay: 'మళ్లీ వినండి',
      tourCompleted: 'డెమో పూర్తయింది! ఫార్మేట్‌ను ఉపయోగించడానికి సిద్ధం.',
    },
  },

  ta: {
    step1Counterfeit: {
      title: 'போலி பூச்சிக்கொல்லி கண்டறிதல் (Counterfeit Detection)',
      badge: 'அம்சம் 1/5',
      explanation: 'பூச்சிக்கொல்லி பார்கோடு, க்யூஆர் குறியீடு அல்லது 3D ஹோலோகிராமை ஸ்கேன் செய்து உண்மையான CIBRC பதிவை உறுதிசெய்து போலிகளைத் தவிர்க்கவும்.',
      speechText: 'பார்மேட்டிற்கு நல்வரவு. இது போலி மருந்து கண்டறியும் பகுதி. பூச்சிக்கொல்லி பார்கோடு மற்றும் 3D ஹோலோகிராமை ஸ்கேன் செய்து போலி மருந்துகளை உடனடியாகக் கண்டறியலாம்.',
    },
    step2Recommendation: {
      title: 'மருந்து பரிந்துரை & தெளிப்பான் அளவு',
      badge: 'அம்சம் 2/5',
      explanation: '15 லிட்டர் தெளிப்பான் தொட்டிக்கு சரியான மருந்தளவு, பாதுகாப்பு கவசம் மற்றும் வானிலை தெளிப்பு ஆலோசனைகளைப் பெறுங்கள்.',
      speechText: 'அடுத்தது மருந்து பரிந்துரை அமைப்பு. இது 15 லிட்டர் தெளிப்பான் தொட்டிக்குத் தேவையான சரியான மருந்தளவு மற்றும் பாதுகாப்பு வழிகாட்டுதல்களை வழங்கும்.',
    },
    step3Pest: {
      title: 'பயிர் நோய் மருத்துவர் (Pest Doctor)',
      badge: 'அம்சம் 3/5',
      explanation: 'பாதிக்கப்பட்ட இலைகளைப் படம் பிடிக்கவும் அல்லது அறிகுறிகளைத் தட்டச்சு செய்யவும். AI உடனடியாக நோயைக் கண்டறிந்து பாதுகாப்பான தீர்வுகளைக் கூறும்.',
      speechText: 'இது பயிர் நோய் மருத்துவர் பகுதி. பாதிக்கப்பட்ட இலைகளைப் படம் பிடித்தால், AI நோயைக் கண்டறிந்து இயற்கை மற்றும் பாதுகாப்பான மருந்துகளைப் பரிந்துரைக்கும்.',
    },
    step4Soil: {
      title: 'மண் வகை தேர்வு (Soil Type)',
      badge: 'படி 4/5 • அமைப்புகள்',
      explanation: 'கரிசல் மண் அல்லது செம்மண் என உங்கள் பண்ணை மண்ணைத் தேர்வுசெய்க. உங்கள் மண்ணிற்கு ஏற்ற உர அளவை AI துல்லியமாகக் கணக்கிடும்.',
      speechText: 'இப்போது அமைப்புகள் திறக்கப்பட்டுள்ளது. உங்கள் பண்ணை மண் கரிசல் அல்லது செம்மண் எனத் தேர்வுசெய்தால், AI உர அளவைத் துல்லியமாக வழங்கும்.',
    },
    step5Crop: {
      title: 'பயிர்கள் தேர்வு (Target Crops)',
      badge: 'படி 5/5 • அமைப்புகள்',
      explanation: 'தக்காளி, நெல், பருத்தி போன்ற உங்கள் பயிர்களைத் தேர்வுசெய்க. அனைத்து நோய் எச்சரிக்கைகளும் உங்கள் பயிர்களுக்கு மட்டுமே வழங்கப்படும்.',
      speechText: 'இறுதியாக பயிர்களைத் தேர்வுசெய்யவும். தக்காளி, நெல் அல்லது பருத்தி போன்ற பயிர்களைத் தேர்வுசெய்தால், AI உங்கள் பயிர்களுக்கு மட்டுமே ஆலோசனை வழங்கும்.',
    },
    controls: {
      next: 'அடுத்து',
      back: 'பின்னால்',
      finish: 'முடிந்தது',
      skip: 'தவிர்',
      stepOf: (curr, total) => `படி ${curr}/${total}`,
      voicePlaying: 'AI குரல் விளக்கம்...',
      voiceReplay: 'மீண்டும் கேள்',
      tourCompleted: 'வழிகாட்டல் முடிந்தது! பார்மேட்டைப் பயன்படுத்தலாம்.',
    },
  },

  kn: {
    step1Counterfeit: {
      title: 'ನಕಲಿ ಕೀಟನಾಶಕ ಪತ್ತೆ (Counterfeit Detection)',
      badge: 'ವೈಶಿಷ್ಟ್ಯ 1/5',
      explanation: 'ಕೀಟನಾಶಕಗಳ ಬಾರ್‌ಕೋಡ್ ಮತ್ತು 3D ಹೊಲೊಗ್ರಾಮ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಧಿಕೃತ CIBRC ನೋಂದಣಿಯನ್ನು ದೃಢೀಕರಿಸಿ ನಕಲಿ ರಾಸಾಯನಿಕಗಳನ್ನು ತಡೆಯಿರಿ.',
      speechText: 'ಫಾರ್ಮೇಟ್‌ಗೆ ಸ್ವಾಗತ. ಇದು ನಕಲಿ ಕೀಟನಾಶಕ ಪತ್ತೆ ಟ್ಯಾಬ್. ಕೀಟನಾಶಕದ ಬಾರ್‌ಕೋಡ್ ಮತ್ತು 3D ಹೊಲೊಗ್ರಾಮ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ನಕಲಿ ಔಷಧಗಳನ್ನು ಸುಲಭವಾಗಿ ಗುರುತಿಸಿ.',
    },
    step2Recommendation: {
      title: 'ಶಿಫಾರಸು ಮತ್ತು ಟ್ಯಾಂಕ್ ಪ್ರಮಾಣ ಲೆಕ್ಕಾಚಾರ',
      badge: 'ವೈಶಿಷ್ಟ್ಯ 2/5',
      explanation: '15 ಲೀಟರ್ ನ್ಯಾಪ್‌ಸ್ಯಾಕ್ ಸಿಂಪಡಕ ಟ್ಯಾಂಕ್‌ಗೆ ಸರಿಯಾದ ಕೀಟನಾಶಕ ಪ್ರಮಾಣ ಮತ್ತು ಸುರಕ್ಷತಾ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
      speechText: 'ಮುಂದಿನದು ಶಿಫಾರಸು ವ್ಯವಸ್ಥೆ. ಇದು 15 ಲೀಟರ್ ಟ್ಯಾಂಕ್‌ಗೆ ಸರಿಯಾದ ಪ್ರಮಾಣ ಮತ್ತು ರಕ್ಷಣಾ ಕಿಟ್ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.',
    },
    step3Pest: {
      title: 'ಕೀಟ ಮತ್ತು ರೋಗ ಡಾಕ್ಟರ್ (Pest Doctor)',
      badge: 'ವೈಶಿಷ್ಟ್ಯ 3/5',
      explanation: 'ಬಾಧಿತ ಎಲೆಗಳ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಲಕ್ಷಣಗಳನ್ನು ಬರೆಯಿರಿ. AI ತಕ್ಷಣವೇ ರೋಗ ಗುರುತಿಸಿ ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಪರಿಹಾರಗಳನ್ನು ನೀಡುತ್ತದೆ.',
      speechText: 'ಇದು ಕೀಟ ಡಾಕ್ಟರ್ ಟ್ಯಾಬ್. ಬೆಳೆಯ ಎಲೆಗಳ ಫೋಟೋ ತೆಗೆಯುವ ಮೂಲಕ ರೋಗವನ್ನು ಪತ್ತೆಹಚ್ಚಿ ಪರಿಹಾರಗಳನ್ನು ತಿಳಿಯಿರಿ.',
    },
    step4Soil: {
      title: 'ಮಣ್ಣಿನ ವಿಧದ ಆಯ್ಕೆ (Soil Type)',
      badge: 'ಹಂತ 4/5 • ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      explanation: 'ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು ಅಥವಾ ಕೆಂಪು ಮಣ್ಣನ್ನು ಆಯ್ಕೆಮಾಡಿ, ಇದರಿಂದ AI ಗೊಬ್ಬರದ ಪ್ರಮಾಣವನ್ನು ನಿಖರವಾಗಿ ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ.',
      speechText: 'ಈಗ ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಮಣ್ಣಿನ ವಿಧವನ್ನು ನೋಡಿ. ನಿಮ್ಮ ಹೊಲದ ಮಣ್ಣನ್ನು ಆಯ್ಕೆಮಾಡಿದರೆ AI ಗೊಬ್ಬರ ಮತ್ತು ನೀರಿನ ಸಲಹೆಗಳನ್ನು ನಿಖರವಾಗಿ ನೀಡುತ್ತದೆ.',
    },
    step5Crop: {
      title: 'ಗುರಿ ಬೆಳೆಗಳು (Target Crops)',
      badge: 'ಹಂತ 5/5 • ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      explanation: 'ಟೊಮ್ಯಾಟೊ, ಭತ್ತ ಅಥವಾ ಹತ್ತಿ ಮುಂತಾದ ಬೆಳೆಗಳನ್ನು ಆರಿಸಿ. AI ಎಲ್ಲಾ ಸಲಹೆಗಳನ್ನು ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಸೀಮಿತಗೊಳಿಸುತ್ತದೆ.',
      speechText: 'ಕೊನೆಯದಾಗಿ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಟೊಮ್ಯಾಟೊ, ಭತ್ತ ಅಥವಾ ಹತ್ತಿ ಮುಂತಾದವುಗಳನ್ನು ಆರಿಸಿದರೆ, AI ಎಲ್ಲ ಸಲಹೆಗಳನ್ನು ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಮಾತ್ರ ನೀಡುತ್ತದೆ.',
    },
    controls: {
      next: 'ಮುಂದೆ',
      back: 'ಹಿಂದೆ',
      finish: 'ಮುಕ್ತಾಯ',
      skip: 'ಬಿಟ್ಟುಬಿಡಿ',
      stepOf: (curr, total) => `ಹಂತ ${curr}/${total}`,
      voicePlaying: 'AI ಧ್ವನಿ ವಿವರಣೆ...',
      voiceReplay: 'ಮತ್ತೆ ಆಲಿಸಿ',
      tourCompleted: 'ಡೆಮೊ ಪೂರ್ಣಗೊಂಡಿದೆ! ಫಾರ್ಮೇಟ್ ಬಳಸಲು ಸಿದ್ಧ.',
    },
  },

  bn: {
    step1Counterfeit: {
      title: 'ভেজাল কীটনাশক শনাক্তকরণ (Counterfeit Detection)',
      badge: 'বৈশিষ্ট্য ১/৫',
      explanation: 'কীটনাশকের বারকোড, কিউআর কোড বা 3D হলোগ্রাম স্ক্যান করে আসল CIBRC অনুমোদন যাচাই করুন এবং নকল ওষুধ শনাক্ত করুন।',
      speechText: 'ফারমেট-এ স্বাগতম। এটি নকল কীটনাশক শনাক্তকরণ ট্যাব। বারকোড এবং 3D হলোগ্রাম স্ক্যান করে আসল রেজিস্ট্রেশন যাচাই করুন এবং নকল রাসায়নিক ব্যবহার বন্ধ করুন।',
    },
    step2Recommendation: {
      title: 'ওষুধের সঠিক মাত্রা ও ট্যাংক গণনা',
      badge: 'বৈশিষ্ট্য ২/৫',
      explanation: 'প্রতি ১৫ লিটার ন্যাপস্যাক স্প্রেয়ার ট্যাঙ্কের জন্য সঠিক ডোজ, সুরক্ষা কিট এবং স্প্রে করার উপযুক্ত সময় জানুন।',
      speechText: 'পরবর্তী ট্যাব হলো ওষুধ সুপারিশ ব্যবস্থা। এটি প্রতি ১৫ লিটার ট্যাঙ্কের জন্য সঠিক মাত্রা এবং সুরক্ষা নির্দেশিকা গণনা করে দেয়।',
    },
    step3Pest: {
      title: 'কীটপতঙ্গ ও রোগ ডাক্তার (Pest Doctor)',
      badge: 'বৈশিষ্ট্য ৩/৫',
      explanation: 'রোগাক্রান্ত পাতার ছবি তুলুন বা লক্ষণ লিখুন। এআই অবিলম্বে রোগ নির্ণয় করে সঠিক জৈব ও রাসায়নিক প্রতিষেধক জানাবে।',
      speechText: 'এটি পেস্ট ডক্টর ট্যাব। ফসলের পাতার ছবি তুলে সহজেই রোগ নির্ণয় এবং নিরাপদ সমাধান পান।',
    },
    step4Soil: {
      title: 'জমির মাটির ধরন (Soil Type)',
      badge: 'ধাপ ৪/৫ • সেটিংস',
      explanation: 'কালো কটন মাটি, লাল দোআঁশ বা পলি মাটি নির্বাচন করুন, যাতে এআই আপনার মাটির উপযোগী সার ও সেচ পরামর্শ দিতে পারে।',
      speechText: 'এখন সেটিংসে মাটির ধরন দেখুন। আপনার জমির মাটি নির্বাচন করুন যাতে এআই সঠিক সারের ডোজ গণনা করতে পারে।',
    },
    step5Crop: {
      title: 'প্রধান ফসল নির্বাচন (Target Crops)',
      badge: 'ধাপ ৫/৫ • সেটিংস',
      explanation: 'টমেটো, ধান বা গমের মতো ফসল নির্বাচন করুন। এআই সমস্ত রোগ পরামর্শ কেবল আপনার ফসলের ওপর কেন্দ্র করে দেবে।',
      speechText: 'সবশেষে আপনার প্রধান ফসল নির্বাচন করুন। টমেটো বা ধানের মতো ফসল নির্বাচন করলে সমস্ত পরামর্শ কেবল সেই ফসলের জন্যই আসবে।',
    },
    controls: {
      next: 'পরবর্তী',
      back: 'পূর্ববর্তী',
      finish: 'সম্পন্ন',
      skip: 'এড়িয়ে যান',
      stepOf: (curr, total) => `ধাপ ${curr}/${total}`,
      voicePlaying: 'এআই ভয়েস ব্যাখ্যা করছে...',
      voiceReplay: 'পুনরায় শুনুন',
      tourCompleted: 'ডেমো সফলভাবে সম্পন্ন হয়েছে!',
    },
  },

  or: {
    step1Counterfeit: {
      title: 'ନକଲି ଔଷଧ ଚିହ୍ନଟ (Counterfeit Detection)',
      badge: 'ବୈଶିଷ୍ଟ୍ୟ ୧/୫',
      explanation: 'କୀଟନାଶକର ବାରକୋଡ୍ କିମ୍ବା 3D ହୋଲୋଗ୍ରାମ୍ ସ୍କାନ୍ କରି ଅସଲି CIBRC ପଞ୍ଜୀକରଣ ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ନକଲି ଔଷଧରୁ ରକ୍ଷା ପାଆନ୍ତୁ।',
      speechText: 'ଫାର୍ମେଟକୁ ସ୍ୱାଗତ। ଏହା ହେଉଛି ନକଲି ଔଷଧ ଚିହ୍ନଟ ଟ୍ୟାବ୍। ବାରକୋଡ୍ ଏବଂ 3D ହୋଲୋଗ୍ରାମ୍ ସ୍କାନ୍ କରି ଅସଲି କୀଟନାଶକ ପରୀକ୍ଷା କରନ୍ତୁ।',
    },
    step2Recommendation: {
      title: 'ଔଷଧ ମାତ୍ରା ଓ ସୁପାରିଶ (Recommendation)',
      badge: 'ବୈଶିଷ୍ଟ୍ୟ ୨/୫',
      explanation: '୧୫ ଲିଟର ସ୍ପ୍ରେୟାର ଟାଙ୍କି ପାଇଁ ସଠିକ୍ ଔଷଧ ମାତ୍ରା, ସୁରକ୍ଷା କିଟ୍ ଏବଂ ପାଣିପାଗ ଅନୁଯାୟୀ ସ୍ପ୍ରେ ପରାମର୍ଶ ପାଆନ୍ତୁ।',
      speechText: 'ପରବର୍ତ୍ତୀ ଟ୍ୟାବ୍ ହେଉଛି ଔଷଧ ସୁପାରିଶ। ଏହା ପ୍ରତି ୧୫ ଲିଟର ଟାଙ୍କି ପାଇଁ ସଠିକ୍ ମାତ୍ରା ଏବଂ ସୁରକ୍ଷା ନିୟମ ଜଣାଇବ।',
    },
    step3Pest: {
      title: 'ପୋକ ଓ ରୋଗ ଡାକ୍ତର (Pest Doctor)',
      badge: 'ବୈଶିଷ୍ଟ୍ୟ ୩/୫',
      explanation: 'ରୋଗାକ୍ରାନ୍ତ ପତ୍ରର ଫଟୋ ଉଠାନ୍ତୁ ବା ଲକ୍ଷଣ ଲେଖନ୍ତୁ। ଏଆଇ ତୁରନ୍ତ ରୋଗ ଚିହ୍ନଟ କରି ଜୈବିକ ଏବଂ ଉପଯୁକ୍ତ ଔଷଧ ବତାଇବ।',
      speechText: 'ଏହା ପୋକ ଓ ରୋଗ ଡାକ୍ତର ଟ୍ୟାବ୍। ପତ୍ରର ଫଟୋ ନେଇ ରୋଗ ଚିହ୍ନଟ କରନ୍ତୁ ଏବଂ ସୁରକ୍ଷିତ ଉପଚାର ଜାଣନ୍ତୁ।',
    },
    step4Soil: {
      title: 'ମାଟିର ପ୍ରକାର (Soil Type)',
      badge: 'ପଦକ୍ଷେପ ୪/୫ • ସେଟିଙ୍ଗ୍',
      explanation: 'କଳା କପା ମାଟି ବା ଲାଲ୍ ଦୋରସା ମାଟି ଚୟନ କରନ୍ତୁ, ଯାହାଦ୍ୱାରା ଏଆଇ ସଠିକ୍ ଖତ ଓ ସାର ମାତ୍ରା କହିପାରିବ।',
      speechText: 'ଏବେ ସେଟିଙ୍ଗ୍ସରେ ମାଟି ପ୍ରକାର ଦେଖନ୍ତୁ। ଆପଣଙ୍କ ଜମିର ମାଟି ଚୟନ କରନ୍ତୁ ଯାହାଫଳରେ ଏଆଇ ସଠିକ୍ ସାର ମାତ୍ରା ହିସାବ କରିବ।',
    },
    step5Crop: {
      title: 'ମୁଖ୍ୟ ଫସଲ ଚୟନ (Target Crops)',
      badge: 'ପଦକ୍ଷେପ ୫/୫ • ସେଟିଙ୍ଗ୍',
      explanation: 'ଟମାଟୋ, ଧାନ ବା ଗହମ ଭଳି ଫସଲ ଚୟନ କରନ୍ତୁ। ଏଆଇ କେବଳ ଆପଣଙ୍କ ଫସଲ ପାଇଁ ସମସ୍ତ ପରାମର୍ଶ ଦେବ।',
      speechText: 'ଶେଷରେ ଆପଣଙ୍କ ମୁଖ୍ୟ ଫସଲ ବାଛନ୍ତୁ। ଟମାଟୋ ବା ଧାନ ବାଛିଲେ ଏଆଇ ସମସ୍ତ ଔଷଧ ସୂଚନା ସେହି ଫସଲ ଅନୁସାରେ ଦେବ।',
    },
    controls: {
      next: 'ଆଗକୁ',
      back: 'ପଛକୁ',
      finish: 'ସମାପ୍ତ',
      skip: 'ଏଡ଼ାଇ ଦିଅନ୍ତୁ',
      stepOf: (curr, total) => `ପଦକ୍ଷେପ ${curr}/${total}`,
      voicePlaying: 'ଏଆଇ ସ୍ୱରରେ ବୁଝାଉଛି...',
      voiceReplay: 'ପୁଣି ଶୁଣନ୍ତୁ',
      tourCompleted: 'ଡେମୋ ସମାପ୍ତ ହେଲା!',
    },
  },

  mr: {
    step1Counterfeit: {
      title: 'बनावट औषध ओळख (Counterfeit Detection)',
      badge: 'वैशिष्ट्य १/५',
      explanation: 'कीटकनाशकाचा बारकोड किंवा 3D होलोग्राम स्कॅन करून CIBRC नोंदणी तपासा आणि बनावट किंवा प्रतिबंधित रसायने रोखा.',
      speechText: 'फार्मेटमध्ये आपले स्वागत आहे. येथे बनावट औषध ओळख टॅब आहे. बारकोड आणि 3D होलोग्राम स्कॅन करून खरी नोंदणी तपासा.',
    },
    step2Recommendation: {
      title: 'औषध शिफारस व १५ लिटर पंप प्रमाण',
      badge: 'वैशिष्ट्य २/५',
      explanation: '१५ लिटर नॅपसॅक पंपासाठी अचूक प्रमाण, पीपीई सुरक्षा किट आणि हवामानानुसार फवारणीच्या सूचना मिळवा.',
      speechText: 'पुढील टॅब आहे औषध शिफारस प्रणाली. ही १५ लिटर पंपासाठी योग्य औषध प्रमाण आणि सुरक्षेच्या सूचना देते.',
    },
    step3Pest: {
      title: 'कीड व रोग डॉक्टर (Pest Doctor)',
      badge: 'वैशिष्ट्य ३/५',
      explanation: 'बाधित पानांचे छायाचित्र काढा किंवा लक्षणे सांगा. एआय त्वरित रोगाचे निदान करून सेंद्रिय व सुरक्षित उपाय सुचवेल.',
      speechText: 'हा कीड व रोग डॉक्टर टॅब आहे. पानांचा फोटो काढून रोगाची माहिती आणि योग्य फवारणी उपाय जाणून घ्या.',
    },
    step4Soil: {
      title: 'जमिनीचा प्रकार (Soil Type)',
      badge: 'पायरी ४/५ • शेत सेटिंग्ज',
      explanation: 'काळी कापूस जमीन किंवा तांबडी जमीन निवडा, जेणेकरून एआय अचूक खत मात्रा आणि पाण्याचे व्यवस्थापन सुचवेल.',
      speechText: 'आता सेटिंग्जमध्ये जमिनीचा प्रकार निवडा. काळी किंवा तांबडी जमीन निवडल्यास एआय अचूक खत मात्रा सांगेल.',
    },
    step5Crop: {
      title: 'मुख्य पिके (Target Crops)',
      badge: 'पायरी ५/५ • शेत सेटिंग्ज',
      explanation: 'टोमॅटो, गहू, कापूस यांसारखी पिके निवडा. एआय सर्व सल्ले केवळ आपल्या पिकांवर केंद्रित करेल.',
      speechText: 'शेवटी आपली मुख्य पिके निवडा. टोमॅटो किंवा कापूस निवडल्यास सर्व रोग सल्ले केवळ त्याच पिकांसाठी मिळतील.',
    },
    controls: {
      next: 'पुढे',
      back: 'मागे',
      finish: 'पूर्ण',
      skip: 'वगळा',
      stepOf: (curr, total) => `पायरी ${curr}/${total}`,
      voicePlaying: 'एआय आवाज स्पष्ट करत आहे...',
      voiceReplay: 'पुन्हा ऐका',
      tourCompleted: 'डेमो यशस्वीरित्या पूर्ण झाला!',
    },
  },

  gu: {
    step1Counterfeit: {
      title: 'નકલી દવા ઓળખ (Counterfeit Detection)',
      badge: 'સુવિધા ૧/૫',
      explanation: 'જંતુનાશક દવાનો બારકોડ કે 3D હોલોગ્રામ સ્કેન કરીને CIBRC પ્રમાણિકતા ચકાસો અને નકલી રસાયણોથી બચો.',
      speechText: 'ફાર્મેટમાં આપનું સ્વાગત છે. આ નકલી દવા ઓળખ ટેબ છે. બારકોડ સ્કેન કરીને અસલી CIBRC રજીસ્ટ્રેશન ચકાસો.',
    },
    step2Recommendation: {
      title: 'દવા ભલામણ અને પંપ માત્રા કેલ્ક્યુલેટર',
      badge: 'સુવિધા ૨/૫',
      explanation: '૧૫ લિટર પંપ માટે દવા ની સચોટ માત્રા, પીપીઈ કીટ અને હવામાન મુજબ છંટકાવ માર્ગદર્શન મેળવો.',
      speechText: 'આગળ દવા ભલામણ સિસ્ટમ છે. આ ૧૫ લિટર પંપ માટે સચોટ દવા માત્રા અને સુરક્ષા સલાહ આપે છે.',
    },
    step3Pest: {
      title: 'રોગ અને જીવાત ડૉક્ટર (Pest Doctor)',
      badge: 'સુવિધા ૩/૫',
      explanation: 'રોગિષ્ટ પાંદડાનો ફોટો લો અથવા લક્ષણો લખો. AI તરત જ રોગ ઓળખીને જૈવિક અને વૈજ્ઞાનિક ઉપચાર જણાવશે.',
      speechText: 'આ પેસ્ટ ડોક્ટર ટેબ છે. પાંદડાનો ફોટો લઈને રોગની ઓળખ કરો અને સુરક્ષિત ઉપચાર મેળવો.',
    },
    step4Soil: {
      title: 'જમીન નો પ્રકાર (Soil Type)',
      badge: 'પગલું ૪/૫ • સેટિંગ્સ',
      explanation: 'કાળી જમીન કે ગોરાડુ જમીન પસંદ કરો જેથી AI ખાતરની સાચી માત્રા અને પિયત ની સલાહ આપી શકે.',
      speechText: 'હવે સેટિંગ્સમાં જમીનનો પ્રકાર પસંદ કરો જેથી AI સાચી ખાતર માત્રા ગણી શકે.',
    },
    step5Crop: {
      title: 'મુખ્ય પાક પસંદગી (Target Crops)',
      badge: 'પગલું ૫/૫ • સેટિંગ્સ',
      explanation: 'ટામેટા, કપાસ કે ઘઉં જેવા તમારા પાક પસંદ કરો. AI તમામ સલાહ ફક્ત તમારા પાક માટે આપશે.',
      speechText: 'છેલ્લે તમારા પાક પસંદ કરો. ટામેટા કે કપાસ પસંદ કરવાથી તમામ સલાહ તમારા પાક માટે મળશે.',
    },
    controls: {
      next: 'આગળ',
      back: 'પાછળ',
      finish: 'પૂર્ણ',
      skip: 'છોડો',
      stepOf: (curr, total) => `પગલું ${curr}/${total}`,
      voicePlaying: 'AI અવાજ સમજાવી રહ્યો છે...',
      voiceReplay: 'ફરી સાંભળો',
      tourCompleted: 'ડેમો પૂર્ણ થયો!',
    },
  },

  pa: {
    step1Counterfeit: {
      title: 'ਨਕਲੀ ਦਵਾਈ ਪਛਾਣ (Counterfeit Detection)',
      badge: 'ਸਹੂਲਤ 1/5',
      explanation: 'ਕੀਟਨਾਸ਼ਕ ਦਾ ਬਾਰਕੋਡ ਜਾਂ 3D ਹੋਲੋਗ੍ਰਾਮ ਸਕੈਨ ਕਰਕੇ ਅਸਲੀ CIBRC ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਾਂਚੋ ਅਤੇ ਨਕਲੀ ਰਸਾਇਣਾਂ ਤੋਂ ਬਚੋ।',
      speechText: 'ਫਾਰਮੇਟ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ। ਇਹ ਨਕਲੀ ਦਵਾਈ ਪਛਾਣ ਟੈਬ ਹੈ। ਬਾਰਕੋਡ ਸਕੈਨ ਕਰਕੇ ਅਸਲੀ ਕੀਟਨਾਸ਼ਕ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।',
    },
    step2Recommendation: {
      title: 'ਸਿਫ਼ਾਰਸ਼ ਅਤੇ 15L ਟੈਂਕੀ ਖੁਰਾਕ',
      badge: 'ਸਹੂਲਤ 2/5',
      explanation: '15 ਲੀਟਰ ਨੈਪਸੈਕ ਸਪਰੇਅਰ ਟੈਂਕੀ ਲਈ ਸਹੀ ਖੁਰਾਕ, ਸੁਰੱਖਿਆ ਕਿੱਟ ਅਤੇ ਮੌਸਮ ਅਨੁਸਾਰ ਸਪਰੇਅ ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ।',
      speechText: 'ਅਗਲਾ ਟੈਬ ਦਵਾਈ ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਣਾਲੀ ਹੈ। ਇਹ 15 ਲੀਟਰ ਟੈਂਕੀ ਲਈ ਸਹੀ ਖੁਰਾਕ ਅਤੇ ਸੁਰੱਖਿਆ ਸਲਾਹ ਦਿੰਦੀ ਹੈ।',
    },
    step3Pest: {
      title: 'ਕੀੜੇ ਅਤੇ ਰੋਗ ਡਾਕਟਰ (Pest Doctor)',
      badge: 'ਸਹੂਲਤ 3/5',
      explanation: 'ਪੱਤਿਆਂ ਦੀ ਫ਼ੋਟੋ ਖਿੱਚੋ ਜਾਂ ਲੱਛਣ ਲਿਖੋ। AI ਤੁਰੰਤ ਰੋਗ ਦੀ ਪਛਾਣ ਕਰਕੇ ਜੈਵਿਕ ਅਤੇ ਰਸਾਇਣਕ ਇਲਾਜ ਦੱਸੇਗਾ।',
      speechText: 'ਇਹ ਪੈਸਟ ਡਾਕਟਰ ਟੈਬ ਹੈ। ਪੱਤਿਆਂ ਦੀ ਫੋਟੋ ਲੈ ਕੇ ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ ਅਤੇ ਸੁਰੱਖਿਅਤ ਇਲਾਜ ਜਾਣੋ।',
    },
    step4Soil: {
      title: 'ਖੇਤ ਦੀ ਮਿੱਟੀ ਦੀ ਕਿਸਮ (Soil Type)',
      badge: 'ਕਦਮ 4/5 • ਸੈਟਿੰਗਾਂ',
      explanation: 'ਚੀਕਣੀ ਜਾਂ ਦੋਮਟ ਮਿੱਟੀ ਚੁਣੋ ਤਾਂ ਜੋ AI ਖਾਦ ਦੀ ਸਹੀ ਮਾਤਰਾ ਅਤੇ ਸਿੰਚਾਈ ਦੀ ਸਲਾਹ ਦੇ ਸਕੇ।',
      speechText: 'ਹੁਣ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ ਤਾਂ ਜੋ AI ਸਹੀ ਖਾਦ ਖੁਰਾਕ ਦੱਸ ਸਕੇ।',
    },
    step5Crop: {
      title: 'ਮੁੱਖ ਫ਼ਸਲਾਂ (Target Crops)',
      badge: 'ਕਦਮ 5/5 • ਸੈਟਿੰਗਾਂ',
      explanation: 'ਕਣਕ, ਝੋਨਾ ਜਾਂ ਨਰਮਾ ਚੁਣੋ। AI ਸਾਰੀਆਂ ਚੇਤਾਵਨੀਆਂ ਸਿਰਫ਼ ਤੁਹਾਡੀਆਂ ਫ਼ਸਲਾਂ ਲਈ ਤਿਆਰ ਕਰੇਗਾ।',
      speechText: 'ਅਖੀਰ ਵਿੱਚ ਆਪਣੀਆਂ ਫ਼ਸਲਾਂ ਚੁਣੋ। ਕਣਕ ਜਾਂ ਝੋਨਾ ਚੁਣਨ ਨਾਲ ਸਾਰੀ ਸਲਾਹ ਤੁਹਾਡੀਆਂ ਫ਼ਸਲਾਂ ਅਨੁਸਾਰ ਮਿਲੇਗੀ।',
    },
    controls: {
      next: 'ਅੱਗੇ',
      back: 'ਪਿੱਛੇ',
      finish: 'ਮੁਕੰਮਲ',
      skip: 'ਛੱਡੋ',
      stepOf: (curr, total) => `ਕਦਮ ${curr}/${total}`,
      voicePlaying: 'AI ਆਵਾਜ਼ ਵਿੱਚ ਵੇਰਵਾ...',
      voiceReplay: 'ਦੁਬਾਰਾ ਸੁਣੋ',
      tourCompleted: 'ਡੈਮੋ ਮੁਕੰਮਲ ਹੋ ਗਿਆ ਹੈ!',
    },
  },

  ml: {
    step1Counterfeit: {
      title: 'വ്യാജ കീടനാശിനി കണ്ടെത്തൽ (Counterfeit Detection)',
      badge: 'ഫീച്ചർ 1/5',
      explanation: 'കീടനാശിനിയുടെ ബാർകോഡ് അല്ലെങ്കിൽ 3D ഹോളോഗ്രാം സ്കാൻ ചെയ്ത് CIBRC രജിസ്ട്രേഷൻ സ്ഥിരീകരിക്കുക.',
      speechText: 'ഫാർമേറ്റിലേക്ക് സ്വാഗതം. ബാർകോഡും 3D ഹോളോഗ്രാമും സ്കാൻ ചെയ്ത് വ്യാജ കീടനാശിനികൾ കണ്ടെത്താം.',
    },
    step2Recommendation: {
      title: 'മരുന്ന് ശുപാർശയും ടാങ്ക് അളവും',
      badge: 'ഫീച്ചർ 2/5',
      explanation: '15 ലിറ്റർ സ്പ്രേയർ ടാങ്കിന് ആവശ്യമായ കൃത്യമായ അളവും സുരക്ഷാ നിർദ്ദേശങ്ങളും നേടുക.',
      speechText: 'അടുത്തത് മരുന്ന് ശുപാർശയാണ്. 15 ലിറ്റർ ടാങ്കിന് വേണ്ട കൃത്യമായ അളവ് ഇത് കണക്കാക്കുന്നു.',
    },
    step3Pest: {
      title: 'വിള രോഗ ഡോക്ടർ (Pest Doctor)',
      badge: 'ഫീച്ചർ 3/5',
      explanation: 'രോഗം ബാധിച്ച ഇലകളുടെ ഫോട്ടോ എടുക്കുക. AI പെട്ടെന്ന് രോഗം കണ്ടെത്തി ജൈവ പരിഹാരങ്ങൾ നൽകും.',
      speechText: 'ഇത് പെസ്റ്റ് ഡോക്ടർ ടാബ് ആണ്. ഇലകളുടെ ഫോട്ടോ എടുത്ത് രോഗവും പരിഹാരവും മനസ്സിലാക്കാം.',
    },
    step4Soil: {
      title: 'മണ്ണിന്റെ തരം (Soil Type)',
      badge: 'ഘട്ടം 4/5 • സെറ്റിംഗ്സ്',
      explanation: 'നിങ്ങളുടെ മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക, വളത്തിന്റെ അളവ് കൃത്യമായി കണക്കാക്കാൻ ഇത് സഹായിക്കും.',
      speechText: 'ഇപ്പോൾ സെറ്റിംഗ്സിൽ മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കൂ. ശരിയായ വളത്തിന്റെ അളവ് കണക്കാക്കാൻ ഇത് സഹായിക്കും.',
    },
    step5Crop: {
      title: 'പ്രധാന വിളകൾ (Target Crops)',
      badge: 'ഘട്ടം 5/5 • സെറ്റിംഗ്സ്',
      explanation: 'നെല്ല്, തക്കാളി തുടങ്ങിയ വിളകൾ തിരഞ്ഞെടുക്കുക. എല്ലാ നിർദ്ദേശങ്ങളും ആ വിളകളിൽ കേന്ദ്രീകരിക്കും.',
      speechText: 'അവസാനമായി നിങ്ങളുടെ വിളകൾ തിരഞ്ഞെടുക്കുക. നെല്ല് അല്ലെങ്കിൽ പച്ചക്കറികൾ തിരഞ്ഞെടുക്കാം.',
    },
    controls: {
      next: 'അടുത്തത്',
      back: 'പിന്നോട്ട്',
      finish: 'പൂർത്തിയായി',
      skip: 'ഒഴിവാക്കുക',
      stepOf: (curr, total) => `ഘട്ടം ${curr}/${total}`,
      voicePlaying: 'AI ശബ്ദ വിവരണം...',
      voiceReplay: 'വീണ്ടും കേൾക്കുക',
      tourCompleted: 'ഡെമോ പൂർത്തിയായി!',
    },
  },

  ur: {
    step1Counterfeit: {
      title: 'جعلی ادویات کی شناخت (Counterfeit Detection)',
      badge: 'خصوصیت 1/5',
      explanation: 'کیڑے مار ادویات کا بارکوڈ یا 3D ہولوگرام اسکین کریں اور اصلی سی آئی بی آر سی رجسٹریشن کی تصدیق کریں۔',
      speechText: 'فارمیٹ میں خوش آمدید۔ یہ جعلی ادویات کی شناخت کا ٹیب ہے۔ بارکوڈ اسکین کرکے اصلی ادویات کی تصدیق کریں۔',
    },
    step2Recommendation: {
      title: 'ادویات کی سفارش اور ٹینک کی مقدار',
      badge: 'خصوصیت 2/5',
      explanation: '15 لیٹر نیپ سیک ٹینک کے لیے درست مقدار، حفاظتی کٹ اور اسپرے کے اوقات کی رہنمائی حاصل کریں۔',
      speechText: 'اگلا ٹیب سفارشاتی نظام ہے۔ یہ 15 لیٹر ٹینک کے لیے درست مقدار اور حفاظتی کٹ بتاتا ہے۔',
    },
    step3Pest: {
      title: 'کیڑوں اور بیماریوں کا ڈاکٹر (Pest Doctor)',
      badge: 'خصوصیت 3/5',
      explanation: 'پتوں کی تصویر لیں یا علامات بتائیں۔ AI فوری طور پر بیماری کی شناخت اور محفوظ علاج تجویز کرے گا۔',
      speechText: 'یہ پیسٹ ڈاکٹر ٹیب ہے۔ پتوں کی تصویر لے کر بیماری کی شناخت اور محفوظ حل جانیں۔',
    },
    step4Soil: {
      title: 'مٹی کی قسم (Soil Type)',
      badge: 'مرحلہ 4/5 • ترتیبات',
      explanation: 'اپنی مٹی کی قسم منتخب کریں تاکہ AI کھاد کی درست مقدار اور آبپاشی کا وقت تجویز کر سکے۔',
      speechText: 'اب سیٹنگز میں مٹی کی قسم منتخب کریں تاکہ AI کھاد کی صحیح مقدار بتا سکے۔',
    },
    step5Crop: {
      title: 'اہم فصلیں (Target Crops)',
      badge: 'مرحلہ 5/5 • ترتیبات',
      explanation: 'ٹماٹر، گندم یا چاول جیسی فصلیں منتخب کریں۔ تمام مشورے صرف آپ کی فصلوں کے لیے ہوں گے۔',
      speechText: 'آخر میں اپنی اہم فصلیں منتخب کریں تاکہ تمام مشورے صرف ان فصلوں کے لیے حاصل ہوں۔',
    },
    controls: {
      next: 'اگلا',
      back: 'پیچھے',
      finish: 'مکمل',
      skip: 'چھوڑیں',
      stepOf: (curr, total) => `مرحلہ ${curr}/${total}`,
      voicePlaying: 'AI آواز میں وضاحت...',
      voiceReplay: 'دوبارہ سنیں',
      tourCompleted: 'ڈیمو مکمل ہو گیا!',
    },
  },

  es: {
    step1Counterfeit: {
      title: 'Detección de Falsificaciones (VerifyX)',
      badge: 'Función 1 de 5',
      explanation: 'Escanee códigos de barras u hologramas 3D para verificar el registro oficial y detectar agroquímicos falsificados.',
      speechText: 'Bienvenido a FAR[M]ATE. Use esta pestaña para escanear códigos de barras y verificar productos agrícolas auténticos.',
    },
    step2Recommendation: {
      title: 'Recomendaciones y Dosificación',
      badge: 'Función 2 de 5',
      explanation: 'Calcule dosis exactas por tanque de 15 litros, equipo de protección y condiciones meteorológicas para fumigación.',
      speechText: 'El sistema de recomendaciones calcula la dosis exacta por tanque de 15 litros y equipo de seguridad necesario.',
    },
    step3Pest: {
      title: 'Doctor de Cultivos (Pest Doctor)',
      badge: 'Función 3 de 5',
      explanation: 'Fotografíe hojas enfermas para recibir diagnóstico instantáneo con IA y tratamientos biológicos y químicos seguros.',
      speechText: 'En Pest Doctor tome una foto de las hojas afectadas para identificar enfermedades y soluciones seguras.',
    },
    step4Soil: {
      title: 'Tipo de Suelo Agrícola',
      badge: 'Paso 4 de 5 • Ajustes',
      explanation: 'Seleccione el tipo de suelo de su campo para calibrar dosis de fertilizante e intervalos de riego precisos.',
      speechText: 'En Ajustes elija su tipo de suelo para que la IA calcule fertilización y riego a la medida de su tierra.',
    },
    step5Crop: {
      title: 'Cultivos Principales',
      badge: 'Paso 5 de 5 • Ajustes',
      explanation: 'Elija sus cultivos para enfocar todas las alertas de plagas y cálculos de dosificación en ellos.',
      speechText: 'Finalmente seleccione sus cultivos principales para que todas las recomendaciones se adapten a ellos.',
    },
    controls: {
      next: 'Siguiente',
      back: 'Atrás',
      finish: 'Finalizar',
      skip: 'Omitir',
      stepOf: (curr, total) => `Paso ${curr} de ${total}`,
      voicePlaying: 'Voz IA explicando...',
      voiceReplay: 'Repetir audio',
      tourCompleted: '¡Demostración completada con éxito!',
    },
  },

  fr: {
    step1Counterfeit: {
      title: 'Détection des Contrefaçons (VerifyX)',
      badge: 'Fonction 1 sur 5',
      explanation: 'Scannez les codes-barres ou hologrammes 3D pour vérifier l’homologation officielle et éviter les produits frelatés.',
      speechText: 'Bienvenue sur FAR[M]ATE. Utilisez cet onglet pour scanner les codes-barres et vérifier les intrants agricoles.',
    },
    step2Recommendation: {
      title: 'Recommandations & Dosage Pulvérisateur',
      badge: 'Fonction 2 sur 5',
      explanation: 'Calculez les dosages précis par cuve de 15 litres, équipements EPI et fenêtres météo pour la pulvérisation.',
      speechText: 'Le système de recommandations calcule le dosage exact par cuve de 15 litres et les équipements de protection.',
    },
    step3Pest: {
      title: 'Docteur des Plantes (Pest Doctor)',
      badge: 'Fonction 3 sur 5',
      explanation: 'Prenez en photo les feuilles malades pour obtenir un diagnostic instantané et des remèdes biologiques certifiés.',
      speechText: 'Avec Pest Doctor, photographiez les feuilles pour identifier immédiatement les maladies et traitements adaptés.',
    },
    step4Soil: {
      title: 'Type de Sol de l’Exploitation',
      badge: 'Étape 4 sur 5 • Réglages',
      explanation: 'Sélectionnez votre type de sol pour que l’IA ajuste les apports d’engrais et l’irrigation.',
      speechText: 'Dans les réglages, choisissez votre type de sol pour adapter la fertilisation et l’arrosage.',
    },
    step5Crop: {
      title: 'Cultures Principales',
      badge: 'Étape 5 sur 5 • Réglages',
      explanation: 'Indiquez vos cultures pour cibler toutes les alertes sanitaires et les calculs de pulvérisation.',
      speechText: 'Enfin, sélectionnez vos cultures principales pour que tous les conseils soient personnalisés.',
    },
    controls: {
      next: 'Suivant',
      back: 'Retour',
      finish: 'Terminer',
      skip: 'Passer',
      stepOf: (curr, total) => `Étape ${curr} sur ${total}`,
      voicePlaying: 'IA vocale en cours...',
      voiceReplay: 'Réécouter',
      tourCompleted: 'Visite guidée terminée avec succès !',
    },
  },

  pt: {
    step1Counterfeit: {
      title: 'Detecção de Falsificações (VerifyX)',
      badge: 'Recurso 1 de 5',
      explanation: 'Escaneie códigos de barras ou hologramas 3D para confirmar o registro oficial e evitar defensivos falsificados.',
      speechText: 'Bem-vindo ao FAR[M]ATE. Use esta aba para escanear produtos e verificar registros autênticos.',
    },
    step2Recommendation: {
      title: 'Recomendações e Dosagem de Pulverização',
      badge: 'Recurso 2 de 5',
      explanation: 'Calcule a dosagem exata por tanque costal de 15 litros, EPIs de proteção e horários seguros de pulverização.',
      speechText: 'O sistema de recomendações calcula a dosagem precisa por tanque de 15 litros e equipamentos de segurança.',
    },
    step3Pest: {
      title: 'Doutor de Lavouras (Pest Doctor)',
      badge: 'Recurso 3 de 5',
      explanation: 'Fotografe folhas doentes para diagnóstico instantâneo e soluções biológicas e químicas aprovadas.',
      speechText: 'Na aba Pest Doctor, fotografe as folhas para identificar pragas e tratamentos recomendados.',
    },
    step4Soil: {
      title: 'Tipo de Solo da Fazenda',
      badge: 'Passo 4 de 5 • Configurações',
      explanation: 'Selecione o tipo de solo para que a IA calibre a adubação e a irrigação com exatidão.',
      speechText: 'Nas configurações, defina o tipo de solo para personalizar fertilizantes e irrigação.',
    },
    step5Crop: {
      title: 'Culturas Principais',
      badge: 'Passo 5 de 5 • Configurações',
      explanation: 'Selecione suas culturas principais para focar todos os alertas e calendários em sua lavoura.',
      speechText: 'Por fim, selecione suas culturas para que todas as orientações sejam direcionadas a elas.',
    },
    controls: {
      next: 'Próximo',
      back: 'Voltar',
      finish: 'Concluir',
      skip: 'Pular',
      stepOf: (curr, total) => `Passo ${curr} de ${total}`,
      voicePlaying: 'Voz IA explicando...',
      voiceReplay: 'Repetir voz',
      tourCompleted: 'Tour concluído com sucesso!',
    },
  },

  sw: {
    step1Counterfeit: {
      title: 'Ugunduzi wa Kemikali Bandia (VerifyX)',
      badge: 'Kipengele 1 kati ya 5',
      explanation: 'Changanua msimbo pau au hologramu ya 3D ili kuthibitisha usajili halali na kuzuia pembejeo bandia.',
      speechText: 'Karibu FAR[M]ATE. Tumia sehemu hii kuchanganua msimbo pau na kugundua kemikali bandia kabla ya kutumia.',
    },
    step2Recommendation: {
      title: 'Mapendekezo na Vipimo vya Tangi la Lita 15',
      badge: 'Kipengele 2 kati ya 5',
      explanation: 'Pata vipimo sahihi kwa kila tangi la lita 15, mavazi ya kujikinga (PPE), na muda mzuri wa kupulizia.',
      speechText: 'Sehemu hii inakupa vipimo sahihi vya kemikali kwa tangi la lita 15 pamoja na vifaa vya usalama.',
    },
    step3Pest: {
      title: 'Daktari wa Mimea (Pest Doctor)',
      badge: 'Kipengele 3 kati ya 5',
      explanation: 'Piga picha majani yenye ugonjwa ili AI itambue tatizo mara moja na kutoa tiba salama.',
      speechText: 'Piga picha majani ya zao lako kupata utambuzi wa magonjwa na njia salama za kutibu.',
    },
    step4Soil: {
      title: 'Aina ya Udongo wa Shamba',
      badge: 'Hatua 4 kati ya 5 • Mipangilio',
      explanation: 'Chagua aina ya udongo wako ili AI ikupatie ushauri sahihi wa mbolea na umwagiliaji.',
      speechText: 'Katika mipangilio, chagua aina ya udongo wako ili kupata ushauri bora wa mbolea na maji.',
    },
    step5Crop: {
      title: 'Mazao Makuu ya Shamba',
      badge: 'Hatua 5 kati ya 5 • Mipangilio',
      explanation: 'Chagua mazao yako makuu kama Nyanya, Mpunga, au Ngano ili ushauri wote ulenge mazao hayo.',
      speechText: 'Mwisho chagua mazao yako ili maelekezo yote yahusu mazao unayolima shambani mwako.',
    },
    controls: {
      next: 'Mbele',
      back: 'Nyuma',
      finish: 'Kamilisha',
      skip: 'Ruka',
      stepOf: (curr, total) => `Hatua ${curr} ya ${total}`,
      voicePlaying: 'Sauti ya AI inaeleza...',
      voiceReplay: 'Sikiliza tena',
      tourCompleted: 'Mafunzo mafupi yamekamilika!',
    },
  },

  vi: {
    step1Counterfeit: {
      title: 'Nhận Diện Hàng Giả (VerifyX)',
      badge: 'Tính năng 1/5',
      explanation: 'Quét mã vạch hoặc tem chống giả 3D để xác thực đăng ký chính thức và ngăn chặn nông dược giả.',
      speechText: 'Chào mừng bạn đến với FAR[M]ATE. Hãy quét mã vạch và tem 3D để kiểm tra nông dược chính hãng.',
    },
    step2Recommendation: {
      title: 'Khuyến Nghị Liều Lượng Bình 15L',
      badge: 'Tính năng 2/5',
      explanation: 'Tính toán chính xác lượng thuốc cho mỗi bình 15 lít, đồ bảo hộ PPE và thời điểm phun an toàn.',
      speechText: 'Hệ thống khuyến nghị tính toán liều lượng chính xác cho bình 15 lít và hướng dẫn an toàn.',
    },
    step3Pest: {
      title: 'Bác Sĩ Cây Trồng (Pest Doctor)',
      badge: 'Tính năng 3/5',
      explanation: 'Chụp ảnh lá bị bệnh để AI chẩn đoán ngay lập tức và gợi ý biện pháp sinh học an toàn.',
      speechText: 'Chụp ảnh lá cây để nhận diện sâu bệnh và giải pháp điều trị an toàn ngay lập tức.',
    },
    step4Soil: {
      title: 'Loại Đất Canh Tác',
      badge: 'Bước 4/5 • Cài đặt',
      explanation: 'Chọn loại đất của trang trại để AI tối ưu hóa lượng phân bón và chu kỳ tưới tiêu phù hợp.',
      speechText: 'Trong cài đặt, hãy chọn loại đất để AI tính toán phân bón và tưới tiêu chính xác.',
    },
    step5Crop: {
      title: 'Cây Trồng Trọng Tâm',
      badge: 'Bước 5/5 • Cài đặt',
      explanation: 'Chọn cây trồng của bạn để tập trung mọi cảnh báo bệnh và lịch phun vào cây trồng đó.',
      speechText: 'Cuối cùng chọn các loại cây trồng của bạn để AI đưa ra lời khuyên dành riêng cho cây đó.',
    },
    controls: {
      next: 'Tiếp theo',
      back: 'Quay lại',
      finish: 'Hoàn tất',
      skip: 'Bỏ qua',
      stepOf: (curr, total) => `Bước ${curr}/${total}`,
      voicePlaying: 'Giọng nói AI đang giải thích...',
      voiceReplay: 'Nghe lại',
      tourCompleted: 'Đã hoàn thành hướng dẫn!',
    },
  },

  ar: {
    step1Counterfeit: {
      title: 'كشف المبيدات المغشوشة (VerifyX)',
      badge: 'الميزة 1 من 5',
      explanation: 'امسح الباركود أو الهولوگرام ثلاثي الأبعاد للتحقق من التسجيل الرسمي وتجنب المبيدات المغشوشة.',
      speechText: 'مرحبًا بك في فارميت. استخدم هذا التبويب لمسح الباركود والتحقق من سلامة المبيدات قبل الاستخدام.',
    },
    step2Recommendation: {
      title: 'التوصيات وجرعات الرش لخزان 15 لتر',
      badge: 'الميزة 2 من 5',
      explanation: 'احسب الجرعة الدقيقة لكل خزان رش سعة 15 لترًا، ومعدات الحماية ومواعيد الرش المناسبة.',
      speechText: 'يقوم نظام التوصيات بحساب الجرعة الدقيقة لكل خزان سعة 15 لترًا ومعدات الأمان المطلوبة.',
    },
    step3Pest: {
      title: 'طبيب النباتات والآفات (Pest Doctor)',
      badge: 'الميزة 3 من 5',
      explanation: 'التقط صورة للأوراق المصابة لتشخيص المرض فورًا بالذكاء الاصطناعي ومعرفة العلاج الآمن.',
      speechText: 'في تبويب طبيب النباتات، التقط صورة للأوراق للتعرف على الآفات وطرق علاجها الآمنة.',
    },
    step4Soil: {
      title: 'تحديد نوع التربة الزراعية',
      badge: 'الخطوة 4 من 5 • الإعدادات',
      explanation: 'اختر نوع تربة مزرعتك ليقوم الذكاء الاصطناعي بحساب كميات السماد وفترات الري بدقة.',
      speechText: 'في الإعدادات اختر نوع تربتك ليحدد الذكاء الاصطناعي كميات السماد والري المناسبة لأرضك.',
    },
    step5Crop: {
      title: 'المحاصيل المستهدفة',
      badge: 'الخطوة 5 من 5 • الإعدادات',
      explanation: 'حدد محاصيلك الرئيسية ليركز النظام جميع التنبيهات وجداول الرش على محاصيلك فقط.',
      speechText: 'أخيرًا حدد محاصيلك الرئيسية لتكون جميع التوصيات موجهة خصيصًا لما تزرعه.',
    },
    controls: {
      next: 'التالي',
      back: 'السابق',
      finish: 'إنهاء الجولة',
      skip: 'تخطي',
      stepOf: (curr, total) => `الخطوة ${curr} من ${total}`,
      voicePlaying: 'صوت الذكاء الاصطناعي يشرح...',
      voiceReplay: 'إعادة الاستماع',
      tourCompleted: 'اكتملت الجولة الإرشادية بنجاح!',
    },
  },

  id: {
    step1Counterfeit: {
      title: 'Deteksi Produk Palsu (VerifyX)',
      badge: 'Fitur 1 dari 5',
      explanation: 'Pindai kode batang atau hologram 3D untuk memverifikasi pendaftaran resmi dan mencegah obat palsu.',
      speechText: 'Selamat datang di FAR[M]ATE. Gunakan tab ini untuk memindai kode batang dan memeriksa keaslian pestisida.',
    },
    step2Recommendation: {
      title: 'Rekomendasi & Dosis Tangki 15L',
      badge: 'Fitur 2 dari 5',
      explanation: 'Hitung dosis tepat per tangki semprot 15 liter, perlengkapan APD keselamatan, dan jadwal semprot.',
      speechText: 'Sistem rekomendasi menghitung dosis akurat per tangki 15 liter dan panduan keselamatan semprot.',
    },
    step3Pest: {
      title: 'Dokter Tanaman & Hama (Pest Doctor)',
      badge: 'Fitur 3 dari 5',
      explanation: 'Foto daun tanaman yang terserang penyakit untuk diagnosis instan dan solusi hayati yang aman.',
      speechText: 'Pada tab Dokter Hama, ambil foto daun untuk mengidentifikasi penyakit dan solusi obat yang aman.',
    },
    step4Soil: {
      title: 'Jenis Tanah Pertanian',
      badge: 'Langkah 4 dari 5 • Pengaturan',
      explanation: 'Pilih jenis tanah kebun Anda agar AI dapat mengukur dosis pupuk dan jadwal penyiraman yang tepat.',
      speechText: 'Di pengaturan, pilih jenis tanah Anda agar AI menghitung dosis pupuk dan air yang pas.',
    },
    step5Crop: {
      title: 'Komoditas Tanaman Utama',
      badge: 'Langkah 5 dari 5 • Pengaturan',
      explanation: 'Pilih tanaman Anda seperti Tomat, Padi, atau Jagung agar semua saran terfokus pada tanaman tersebut.',
      speechText: 'Terakhir pilih tanaman utama Anda agar semua peringatan penyakit terarah khusus untuk Anda.',
    },
    controls: {
      next: 'Lanjut',
      back: 'Kembali',
      finish: 'Selesai',
      skip: 'Lewati',
      stepOf: (curr, total) => `Langkah ${curr} dari ${total}`,
      voicePlaying: 'Suara AI menjelaskan...',
      voiceReplay: 'Putar Ulang',
      tourCompleted: 'Tur demo berhasil diselesaikan!',
    },
  },
};
