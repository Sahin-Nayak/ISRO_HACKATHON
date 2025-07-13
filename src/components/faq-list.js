const faqList = [
  {
    question: 'What is India’s current average AQI (July 2025)?',
    answer: '72 (Moderate), with PM2.5 at 21 µg/m³ and PM10 at 53 µg/m³.',
  },
  {
    question: 'How does India rank globally for air pollution?',
    answer:
      '5th most polluted country (2024), with average PM2.5 at 50.56 µg/m³ – 10.1 times above WHO guidelines.',
  },
  {
    question: 'What are India’s primary pollution sources?',
    answer:
      'Industry (50%), vehicles (27%), crop burning (17%), and domestic cooking (7%).',
  },
  {
    question:
      'What was India’s worst AQI in the last 24 hours (as of July 7, 2025)?',
    answer: '76 (Moderate) recorded on July 6, 2025.',
  },
  {
    question: 'Which agency monitors India’s air quality?',
    answer:
      'The Central Pollution Control Board (CPCB), operating 308 stations across 115 cities.',
  },
  {
    question: 'Why does Delhi’s AQI worsen in winter?',
    answer:
      "Crop burning (32% of PM2.5), temperature inversion, and low wind speed cause 'severe' (AQI 300+) episodes.",
  },
  {
    question: 'Current AQI in Delhi?',
    answer: '82 (Moderate) as of July 7, 2025.',
  },
  {
    question: 'Which defunct power plant significantly polluted Delhi?',
    answer:
      'Badarpur Thermal Power Station (closed 2018), responsible for 80–90% of particulate matter.',
  },
  {
    question: 'What traffic policy aims to reduce Delhi’s pollution?',
    answer: 'Odd/even rule restricting vehicles based on license plates.',
  },
  {
    question: 'Which major southern city has the highest AQI?',
    answer:
      'Hyderabad (159 – Unhealthy), followed by Chennai (93) and Bengaluru (72).',
  },
  {
    question: 'How does Chennai’s coastal location affect AQI?',
    answer:
      "Sea breezes disperse pollutants, contributing to 'Moderate' averages (AQI 93).",
  },
  {
    question: 'Current AQI in Mumbai?',
    answer: '128 (Unhealthy for Sensitive Groups).',
  },
  {
    question: 'What industrial policy reduced Ahmedabad’s pollution?',
    answer: 'Stricter enforcement and low-sulfur diesel cut PM10 levels.',
  },
  {
    question: 'Kolkata’s AQI trend?',
    answer:
      '81 (Moderate), influenced by vehicular emissions and construction dust.',
  },
  {
    question: 'Why is Hyderabad’s AQI higher than Chennai’s?',
    answer:
      'Industrial clusters and heavy traffic increase PM2.5 (38 µg/m³ vs. Chennai’s 21 µg/m³).',
  },
  {
    question: "Which city had 'Good' AQI recently?",
    answer: 'Gandhinagar (Gujarat) with AQI 59 (PM2.5: 13.3 µg/m³).',
  },
  {
    question: 'How many deaths yearly in India are linked to air pollution?',
    answer: 'Over 2 million, including 100,000 infants.',
  },
  {
    question: 'What health risks does PM2.5 pose?',
    answer:
      'Lung cancer, COPD, heart disease – even in non-smokers and younger populations.',
  },
  {
    question: 'How does crop burning harm health?',
    answer:
      'Releases PM2.5 and toxins, worsening respiratory diseases in northern states.',
  },
  {
    question: 'What is India’s National Clean Air Program (NCAP)?',
    answer:
      'Aims for 20–30% PM reduction by 2024 in 122 cities via industrial controls and monitoring.',
  },
  {
    question: 'Which cities show improving AQI?',
    answer: 'Ahmedabad and Solapur due to cleaner fuels and emission controls.',
  },
  {
    question: 'What role do LNG fuels play?',
    answer:
      'Replacing biomass in cooking and auto-rickshaws to cut SO2 levels.',
  },
  {
    question: 'How many AQI monitoring stations exist in India?',
    answer: '308 stations across 25 states and 4 union territories.',
  },
  {
    question: 'What parameters do CPCB stations track?',
    answer: 'PM2.5, PM10, SO2, NOx, CO, O3, and weather data.',
  },
  {
    question: 'Name a highly polluted monitoring station.',
    answer:
      "GIDC, Nandesari (Gujarat) with frequent 'Poor' AQI due to industrial emissions.",
  },
  {
    question: 'Which season has India’s worst AQI?',
    answer:
      'Winter (October–February) due to crop burning and temperature inversion.',
  },
  {
    question: 'How does India’s PM2.5 compare to Chad?',
    answer: 'Chad: 176 AQI; India: 138 AQI.',
  },
  {
    question: "AQI classification for 'Hazardous'?",
    answer: 'AQI 301+ – health alerts for all populations.',
  },
  {
    question: 'Best AQI in last 24 hours?',
    answer: '62 at 7:10 AM on July 7, 2025.',
  },
  {
    question: 'Major pollutant in rural India?',
    answer: 'Biomass burning (wood, dung) for cooking/heating.',
  },
  {
    question: 'Effect of rainfall on AQI?',
    answer: 'Lowers PM2.5 – e.g., Mumbai’s AQI drops during monsoons.',
  },
  {
    question: 'Why do auto-rickshaws worsen pollution?',
    answer: 'Adulterated fuels release higher toxins.',
  },
  {
    question: 'City with highest industrial PM2.5?',
    answer: 'Ankleshwar (Gujarat) due to chemical manufacturing.',
  },
  {
    question: 'Impact of construction dust?',
    answer: 'Contributes 15–20% of urban PM10.',
  },
  {
    question: 'WHO-safe PM2.5 annual mean?',
    answer: '5 µg/m³ – India averages 50.56 µg/m³.',
  },
  {
    question: 'Top 3 states for winter pollution?',
    answer: 'Punjab, Haryana, Uttar Pradesh (due to crop burning).',
  },
  {
    question: 'AQI in Gandhinagar today?',
    answer: '59 (Moderate) – PM2.5 at 13.3 µg/m³.',
  },
  {
    question: 'How does traffic congestion affect AQI?',
    answer: 'Idling engines spike NO2 near intersections.',
  },
  {
    question: 'Role of GAIA monitors?',
    answer: 'Public-deployed real-time stations (e.g., via aqicn.org).',
  },
  {
    question: 'Health advice for AQI 150+?',
    answer: 'Sensitive groups should avoid exertion; all should wear masks.',
  },
  {
    question: 'PM2.5 vs. PM10?',
    answer: 'PM2.5 penetrates lungs deeper; PM10 is coarser (dust/pollen).',
  },
  {
    question: 'Effect of odd/even rule?',
    answer: 'Reduced Delhi’s peak-hour congestion by 13%.',
  },
  {
    question: 'Future AQI projection for Delhi?',
    answer: '‘Severe’ (300+) in winter 2025 without interventions.',
  },
];

export default faqList;
