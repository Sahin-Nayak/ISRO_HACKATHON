import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStethoscope } from 'react-icons/fa';

const HealthAdvicePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const healthData = {
  "🫁 Respiratory Diseases": {
    "Chronic Obstructive Pulmonary Disease (COPD)": {
      dos: [
        "Quit smoking and avoid air pollutants – quitting slows progression and improves outcomes",
        "Use prescribed inhalers/oxygen and participate in pulmonary rehabilitation",
        "Get vaccinated annually (influenza, pneumococcal, COVID‑19) to lower exacerbation risk",
        "Maintain regular exercise and healthy nutrition to support lung function",
        "Monitor symptoms and schedule regular doctor visits—early detection prevents hospitalizations"
      ],
      donts: [
        "Don't smoke or be exposed to irritants (dust, fumes, secondhand smoke)",
        "Don't skip medications, oxygen therapy, or appointments",
        "Don't ignore increasing breathlessness, cough, or sputum—seek immediate care",
        "Don't over-exert yourself without medical guidance—it may worsen symptoms"
      ]
    },
    "Asthma": {
      dos: [
        "Follow a personalized Asthma Action Plan and take controller medication daily",
        "Identify and avoid triggers—dust mites, smoke, pollen, mold, pet dander, pollution",
        "Use rescue inhalers correctly and track their usage; overuse signals poor control",
        "Keep inhalers clean, use spacers, and review inhaler technique regularly",
        "Stay active when air quality is good; keep regular medical check‑ups"
      ],
      donts: [
        "Don't rely solely on rescue inhalers—indicates uncontrolled asthma",
        "Don't skip controller meds or self-adjust without consulting your physician",
        "Don't expose yourself to smoke or chemical irritants—major asthma triggers",
        "Don't ignore worsening symptoms or delay emergency care"
      ]
    },
    "Lung Cancer": {
      dos: [
        "Avoid smoking and secondhand smoke—responsible for approx. 80–90% of cases",
        "Test homes for radon and reduce exposure if high—radon is a major risk factor",
        "Adhere to screening guidelines (low-dose CT) for high‑risk individuals",
        "Maintain physical activity, balanced diet, and connect with support resources"
      ],
      donts: [
        "Don't smoke, vape, or be exposed to carcinogens",
        "Don't ignore persistent symptoms such as cough, chest pain, or weight loss"
      ]
    },
    "Bronchitis (Acute & Chronic)": {
      dos: [
        "Use rest, hydration, and steam/humidifiers to relieve symptoms",
        "Take OTC pain relievers (e.g., NSAIDs), and quit smoking or reduce exposure",
        "Get annual influenza and pneumococcal vaccines if high-risk"
      ],
      donts: [
        "Don't take antibiotics for presumed viral acute bronchitis",
        "Don't ignore persistent fever, chest pain, bloody sputum, or symptoms lasting >3 weeks"
      ]
    },
    "Pneumonia": {
      dos: [
        "Seek medical care immediately if you experience fever, chest pain, shortness of breath",
        "Complete prescribed antibiotics (for bacterial cases), rest, hydrate, and manage fever",
        "Stay current with pneumococcal and influenza vaccinations",
        "Practice hand hygiene and avoid contact with sick individuals"
      ],
      donts: [
        "Don't self-diagnose or self-medicate—proper diagnosis (x‑ray, tests) guides treatment",
        "Don't delay seeking care for severe or worsening symptoms—hospitalization might be needed"
      ]
    },
    "Pulmonary Fibrosis": {
      dos: [
        "Follow prescribed antifibrotic medications and oxygen therapy",
        "Engage in pulmonary rehabilitation and gentle exercise as recommended",
        "Undergo regular lung imaging and function testing to monitor disease",
        "Avoid smoking and occupational pollutants linked to fibrosis progression",
        "Maintain good nutrition and emotional health—support groups may help"
      ],
      donts: [
        "Don't smoke or remain exposed to lung irritants—these accelerate scarring and decline",
        "Don't skip medications, therapy sessions, or follow-up visits—consistency helps slow progression",
        "Don't ignore new or worsening cough and breathlessness—report it promptly"
      ]
    },
    "Allergic Rhinitis": {
      dos: [
        "Identify and reduce exposure to triggers (pollen, dust mites, pets); use HEPA filters",
        "Use prescribed nasal corticosteroids, antihistamines, and saline rinses",
        "Consider immunotherapy if symptoms persist or seasonal",
        "Keep windows closed during high-pollen times; use air conditioning and masks"
      ],
      donts: [
        "Don't overuse decongestant sprays—they may worsen congestion (rebound)",
        "Don't skip medication during flare-ups—consistent use is needed for control",
        "Don't ignore persistent symptoms such as sinus pressure, eye itching—they may impact asthma or lead to infection"
      ]
    }
  },
  "❤ Cardiovascular Diseases": {
    "Ischemic Heart Disease (Coronary Artery Disease)": {
      dos: [
        "Keep a heart-healthy lifestyle: eat fruits, vegetables, whole grains, lean proteins; avoid saturated and trans fats",
        "Stay physically active: at least 150 minutes of moderate activity weekly helps reduce disease risk",
        "Quit smoking and avoid exposure to secondhand smoke—tobacco is a major risk factor",
        "Manage conditions like high blood pressure, high cholesterol, and diabetes in partnership with your healthcare provider",
        "Engage in cardiac rehab after events like a heart attack to improve recovery and prevent recurrence"
      ],
      donts: [
        "Don't eat a high-sodium or high-saturated-fat diet—these contribute to arterial plaque buildup",
        "Don't skip blood pressure or cholesterol monitoring—these should be checked regularly and tracked",
        "Don't ignore symptoms such as chest pain, shortness of breath, or arm pain—these may signal angina or a heart attack",
        "Don't continue unhealthy behaviors like smoking, excessive alcohol, or inactivity—these undermine heart health"
      ]
    },
    "Hypertension (High Blood Pressure)": {
      dos: [
        "Monitor your blood pressure regularly, including home readings—helps manage and adjust treatment",
        "Adopt a lifestyle approach: maintain a healthy weight, exercise regularly (≥150 min/week), and limit alcohol",
        "Follow a DASH or Mediterranean diet: rich in fruits, vegetables, low-fat dairy; limit sodium (<1500–2300 mg/day)",
        "Quit smoking and aim for restful sleep—lack of sleep and smoking increase blood pressure",
        "Raise potassium intake through fruits and vegetables to balance sodium effects"
      ],
      donts: [
        "Don't ignore elevated blood pressure—even 'silent' hypertension damages organs and increases stroke risk",
        "Don't overlook dietary pitfalls—excess sodium, saturated fats, junk food worsen hypertension",
        "Don't skip medications/lifestyle plans prescribed by your doctor—control is key",
        "Don't neglect sleep or stress management—poor sleep and high stress can elevate blood pressure"
      ]
    },
    "Atherosclerosis": {
      dos: [
        "Eat a heart-healthy diet: focus on fruits, vegetables, whole grains, lean proteins; avoid saturated fats and trans fats",
        "Exercise regularly: aim for ≥150 minutes of moderate activity weekly to maintain healthy weight and vascular health",
        "Quit smoking and avoid secondhand smoke to prevent artery damage",
        "Manage blood pressure, cholesterol, and diabetes: regular testing and adherence to medications like statins are effective",
        "Maintain a healthy weight and manage stress: helps reduce blood pressure and inflammation"
      ],
      donts: [
        "Don't consume high-fat, high-sodium foods—these elevate cholesterol and blood pressure, promoting plaque formation",
        "Don't smoke or vape—any exposure damages blood vessels and accelerates atherosclerosis",
        "Don't skip routine health screenings or medications—untreated risk factors significantly increase cardiovascular events",
        "Don't overlook stress or poor sleep—both are linked to worsening heart health over time"
      ]
    },
    "Stroke (Cerebrovascular Accident)": {
      dos: [
        "Maintain healthy blood pressure (<120/80 mmHg)—it's the strongest modifiable risk factor for stroke",
        "Stay active, eat a healthy diet (Mediterranean/DASH), and keep weight in check—key to lowering risk",
        "Quit smoking and limit alcohol—smoking dramatically raises stroke risk; alcohol should be moderate (≤1 drink/day women, 2 men)",
        "Control cholesterol and diabetes through medications and lifestyle adjustments",
        "Recognize stroke signs early: use FAST (Face drooping, Arm weakness, Speech difficulty, Time to call 911)—quick response improves survival"
      ],
      donts: [
        "Don't ignore high blood pressure ('silent killer')—regular monitoring and treatment are essential",
        "Don't miss routine check-ups for blood pressure, cholesterol, and blood sugar—unawareness leads to increased stroke risk",
        "Don't smoke or drink excessively—both multiply stroke risk significantly",
        "Don't delay in recognizing symptoms—fast treatment (within hours) can prevent irreversible damage"
      ]
    }
  },
  "🧠 Neurological Disorders": {
    "Cognitive Decline & Alzheimer's Disease": {
      dos: [
        "Stay mentally and physically active — regular exercise (30 min/day), cognitive stimulation (reading, puzzles) can reduce dementia risk by ~45 %",
        "Manage vascular risk factors like high blood pressure, diabetes, obesity, and smoking — these directly affect brain health",
        "Protect hearing and treat hearing loss — helps reduce dementia risk",
        "Ensure quality sleep (7–8 hrs) — helps clear brain toxins like amyloid beta",
        "Stop smoking and limit alcohol — both are modifiable risks for dementia"
      ],
      donts: [
        "Don't ignore high blood pressure or diabetes — untreated, these increase brain damage risk",
        "Don't be sedentary or socially isolated — lack of stimulation worsens cognitive resilience",
        "Don't neglect hearing issues or sleep problems — both accelerate cognitive decline"
      ]
    },
    "Parkinson's Disease": {
      dos: [
        "Exercise regularly, including gait, strength, flexibility training — slows progression and improves mobility",
        "Eat balanced, high-fiber diet with adequate fluids; time protein intake around levodopa dosing",
        "Use rehabilitation therapies (speech, occupational, physical) to maintain independence",
        "Engage in cognitive-behavioral therapy when dealing with anxiety, depression, or pain"
      ],
      donts: [
        "Don't skip exercise or rehab sessions — consistency significantly influences quality of life",
        "Don't ignore nutritional timing — protein affects medication absorption, impacting effectiveness",
        "Don't overlook mental health issues — untreated depression or anxiety worsen outcomes",
        "Don't delay initiating multidisciplinary care — holistic support maximizes functioning"
      ]
    },
    "Neurodevelopmental Disorders in Children (e.g., ADHD)": {
      dos: [
        "Use parent-led behavior therapy first (<6 years), with medication and school-based supports for older children",
        "Provide clear structure and help with planning, minimizing distractions at home/school",
        "Ensure healthy lifestyle: consistent sleep, nutritious diet, regular physical activity",
        "Collaborate with teachers for classroom accommodations (e.g., breaks, reward systems)"
      ],
      donts: [
        "Don't tell children to 'just try harder' — ADHD is neurological, not laziness",
        "Don't overcommit them to activities — may lead to stress and burnout",
        "Don't let them skip sleep — poor sleep worsens symptoms",
        "Don't self-diagnose or medicate — assessments should be by professionals"
      ]
    }
  },
  "👶 Pregnancy & Child Health Issues": {
    "Low Birth Weight, Preterm Birth & Stillbirth": {
      dos: [
        "Ensure balanced nutrition and prenatal supplements: iron, folic acid, iodine, vitamin D, DHA for healthy fetal growth",
        "Manage maternal health conditions: control BP, diabetes, infections; regular antenatal care (≥8 visits)",
        "Promote sufficient rest and avoid high-stress environments — reduces preterm labor risk",
        "Eliminate harmful exposures: no smoking, alcohol, drugs; reduce pollutant exposure",
        "Administer corticosteroids when preterm birth risk is present (24–34 weeks) to enhance fetal lung maturity"
      ],
      donts: [
        "Don't smoke or consume alcohol/caffeine excessively — linked to LBW, preterm birth, stillbirth",
        "Don't skip prenatal appointments or ignore hypertension/diabetes — increases adverse outcomes",
        "Don't expose yourself to unpasteurized foods, raw meat, hot tubs — reduce infection and overheating risk",
        "Don't neglect mental health or environmental toxins — stress and pollutants harm fetal development"
      ]
    }
  },
  "🧬 Cancer (Other Types)": {
    "Bladder Cancer": {
      dos: [
        "Quit smoking — responsible for ~50% of cases",
        "Reduce workplace chemical exposure (dyes, rubber, leather, petroleum) — follow safety protocols",
        "Drink ample fluids (especially water) to lower carcinogen concentration in the bladder",
        "Limit arsenic exposure and maintain epilepsy, kidney health; eat fruits/vegetables"
      ],
      donts: [
        "Don't smoke — highest risk factor",
        "Don't ignore hematuria (blood in urine) — seek immediate evaluation",
        "Don't overlook chemical exposures or untreated laundry pollutants — increases long-term risk"
      ]
    }
  },
  "👁 Other Health Effects": {
    "Eye Irritation (Allergic Conjunctivitis)": {
      dos: [
        "Minimize allergen exposure — keep windows shut, use AC, wash bedding, shower after outdoor exposure",
        "Use OTC antihistamine eye drops and lubricants, apply cold compresses for relief",
        "Consult allergist for persistent symptoms — consider mast cell stabilizers or immunotherapy"
      ],
      donts: [
        "Don't rub or scratch your eyes — this worsens inflammation",
        "Don't ignore ongoing symptoms — may lead to corneal damage, vision problems"
      ]
    },
    "Skin Allergies & Eczema (Atopic Dermatitis)": {
      dos: [
        "Identify and avoid triggers — common ones include allergens (dust mites, pollen, pet dander), harsh soaps, fragrances, wool",
        "Use gentle skin care — bathe with lukewarm water (≤10 min) using mild, fragrance-free cleansers",
        "Maintain indoor humidity with cool-mist humidifiers, especially in dry conditions",
        "Wear soft, breathable fabrics like cotton; avoid wool, synthetics",
        "Protect skin from sun and overheating — use mineral sunscreen (SPF ≥30), stay cool"
      ],
      donts: [
        "Don't use harsh, scented products — avoid perfumes, fragrances, dyes, harsh soaps",
        "Don't bathe in hot water or for too long — hot, prolonged baths strip natural oils",
        "Don't scratch or rub the skin — licking or rubbing worsens irritation and risks infection",
        "Don't wear rough, synthetic fabrics unwashed — these can trigger flares until residues are removed"
      ]
    },
    "Sinusitis": {
      dos: [
        "Stay hydrated—drink ample water and warm fluids to thin mucus and ease drainage",
        "Use warm compresses or steam inhalation to relieve sinus pressure and open nasal passages",
        "Use cool-mist humidifiers and keep them clean to moisturize airways without spreading bacteria",
        "Perform nasal saline irrigation (neti pot/squeeze bottle) with sterile or boiled water to clear congestion",
        "Rest, but stay active if symptoms allow, avoiding strenuous exercise that could strain chest"
      ],
      donts: [
        "Don't take antibiotics for viral sinusitis unless a bacterial infection is confirmed",
        "Don't overuse nasal decongestant sprays—may lead to rebound congestion",
        "Don't fly or swim during acute symptoms—pressure and chlorine can exacerbate discomfort",
        "Don't ignore persistent/severe symptoms (e.g., fever, facial swelling, vision changes)—seek medical evaluation"
      ]
    },
    "Headaches & Fatigue": {
      dos: [
        "Track headache patterns and triggers (e.g., stress, sleep, foods) in a diary—aids diagnosis and management",
        "Use abortive medications early and preventively as directed—don't wait for pain to worsen",
        "Practice relaxation, exercise, and stress reduction techniques (e.g., biofeedback, CBT, yoga)",
        "Ensure regular sleep, hydration, and healthy posture to reduce tension and fatigue",
        "Seek medical evaluation for severe or changing headache patterns, especially 'worst-ever' headaches"
      ],
      donts: [
        "Don't overuse pain medications—overuse (≥15 days/month) can trigger rebound headaches",
        "Don't ignore red-flag symptoms, such as vision changes, sudden 'worst headache ever,' neurological signs—these require urgent care",
        "Don't smoke, drink alcohol excessively, sleep irregularly, or experience ongoing stress—these factors can exacerbate headaches and fatigue",
        "Don't rely solely on medications—combine them with lifestyle modifications and relaxation"
      ]
    }
  }
};

  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSelectedCategory(null);
      setSelectedDisease(null);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedDisease(null);
  };

  const selectDisease = (disease) => {
    setSelectedDisease(disease);
  };

  return (
    <>
      <FloatingButton onClick={togglePanel} isOpen={isOpen}>
        <FaStethoscope size={24} />
      </FloatingButton>

      {isOpen && (
        <PanelContainer>
          <ToggleButton onClick={togglePanel}>
            Health Advice <CloseButton>×</CloseButton>
          </ToggleButton>
          
          <ContentWrapper>
            <CategoriesList>
              {Object.keys(healthData).map((category) => (
                <CategoryItem 
                  key={category}
                  onClick={() => toggleCategory(category)}
                  active={selectedCategory === category}
                >
                  {category}
                  {selectedCategory === category && (
                    <DiseasesList>
                      {Object.keys(healthData[category]).map((disease) => (
                        <DiseaseItem
                          key={disease}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectDisease({ category, disease });
                          }}
                          active={selectedDisease?.disease === disease}
                        >
                          {disease}
                        </DiseaseItem>
                      ))}
                    </DiseasesList>
                  )}
                </CategoryItem>
              ))}
            </CategoriesList>

            {selectedDisease && (
              <AdviceContainer>
                <DiseaseTitle>{selectedDisease.disease}</DiseaseTitle>
                
                <SectionTitle>✅ Do</SectionTitle>
                <AdviceList>
                  {healthData[selectedDisease.category][selectedDisease.disease].dos.map((item, index) => (
                    <AdviceItem key={`do-${index}`}>{item}</AdviceItem>
                  ))}
                </AdviceList>

                <SectionTitle>🚫 Don't</SectionTitle>
                <AdviceList>
                  {healthData[selectedDisease.category][selectedDisease.disease].donts.map((item, index) => (
                    <AdviceItem key={`dont-${index}`}>{item}</AdviceItem>
                  ))}
                </AdviceList>
              </AdviceContainer>
            )}
          </ContentWrapper>
        </PanelContainer>
      )}
    </>
  );
};

// Styled Components
const FloatingButton = styled.div`
  position: fixed;
  bottom: 75px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: ${props => props.isOpen ? '#3a5a8a' : '#4a6fa5'};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3a5a8a;
    transform: scale(1.1);
  }
`;

const PanelContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  background-color: #22272C;
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  animation: slide-up 0.3s ease;

  @keyframes slide-up {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ToggleButton = styled.div`
  background-color: #4a6fa5;
  color: white;
  padding: 12px 15px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.span`
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  color: white;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 400px;
  overflow: hidden;
  background-color: #22272C;
`;

const CategoriesList = styled.ul`
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  border-right: 1px solid #3a3a3a;
  background-color: #22272C;
`;

const CategoryItem = styled.li`
  padding: 12px 15px;
  cursor: pointer;
  background-color: ${props => props.active ? '#2E343A' : '#22272C'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#4a6fa5' : 'white'};
  border-bottom: 1px solid #3a3a3a;
  transition: all 0.2s;

  &:hover {
    background-color: #2E343A;
  }
`;

const DiseasesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 8px;
  border-left: 3px solid #4a6fa5;
  background-color: #22272C;
`;

const DiseaseItem = styled.li`
  padding: 8px 15px 8px 12px;
  cursor: pointer;
  background-color: ${props => props.active ? '#2E343A' : '#22272C'};
  color: ${props => props.active ? '#4a6fa5' : 'white'};
  font-size: 14px;
  border-bottom: 1px solid #3a3a3a;

  &:hover {
    background-color: #2E343A;
  }
`;

const AdviceContainer = styled.div`
  flex: 2;
  padding: 15px;
  overflow-y: auto;
  background-color: #22272C;
  color: white;
`;

const DiseaseTitle = styled.h3`
  margin: 0 0 15px;
  color: white;
  font-size: 18px;
  padding-bottom: 8px;
  border-bottom: 2px solid #4a6fa5;
`;

const SectionTitle = styled.h4`
  margin: 20px 0 10px;
  color: white;
  font-size: 16px;
`;

const AdviceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: white;
`;

const AdviceItem = styled.li`
  padding: 8px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #E0E0E0;
  border-bottom: 1px solid #3a3a3a;

  &:last-child {
    border-bottom: none;
  }
`;

export default HealthAdvicePanel;