import { Question } from './types';

export const physiologyQuestions: Question[] = [
  // Section 1: Cell & Tissues
  {
    id: 1,
    question: "What is the smallest structural and functional unit of a living organism?",
    options: ["Tissue", "Organ", "Cell", "System"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which type of cell does not have a defined nucleus and membrane-bound organelles?",
    options: ["Eukaryotic", "Prokaryotic", "Human cell", "Fungal cell"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Which organelle is responsible for ATP production in eukaryotic cells?",
    options: ["Golgi Apparatus", "Endoplasmic Reticulum", "Mitochondria", "Nucleus"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "What is a group of similar cells working together called?",
    options: ["Organ", "System", "Tissue", "Organism"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Which tissue type covers body surfaces and lines internal organs?",
    options: ["Connective tissue", "Muscle tissue", "Nervous tissue", "Epithelial tissue"],
    correctAnswer: 3
  },
  {
    id: 6,
    question: "Bone and blood are examples of which primary tissue type?",
    options: ["Epithelial tissue", "Connective tissue", "Muscle tissue", "Nervous tissue"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Which tissue is specialized for transmitting electrical nerve impulses?",
    options: ["Muscle tissue", "Epithelial tissue", "Nervous tissue", "Connective tissue"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "The cell membrane is primarily composed of a:",
    options: ["Protein monolayer", "Carbohydrate shield", "Phospholipid bilayer", "Cholesterol wall"],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "In the phospholipid bilayer, the phosphate group is:",
    options: ["Hydrophobic (water-fearing)", "Hydrophilic (water-loving)", "Lipophilic", "Non-polar"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "Which transport mechanism requires energy in the form of ATP?",
    options: ["Passive transport", "Simple diffusion", "Facilitated diffusion", "Active transport"],
    correctAnswer: 3
  },
  // Section 2: Transport & Pumps
  {
    id: 11,
    question: "Passive transport moves substances from:",
    options: ["Low to high concentration", "High to low concentration", "Against gravity", "Against electrochemical gradient"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "The movement of O2 and CO2 across the cell membrane is an example of:",
    options: ["Active transport", "Simple diffusion", "Facilitated diffusion", "Osmosis"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Facilitated diffusion differs from simple diffusion because it requires:",
    options: ["ATP energy", "A concentration gradient", "A protein channel or carrier", "Movement against the gradient"],
    correctAnswer: 2
  },
  {
    id: 14,
    question: "Active transport moves substances from:",
    options: ["High to low concentration", "Low to high concentration", "Isotonic to Hypertonic", "Inside to outside only"],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "The Sodium-Potassium ATPase pump is an example of:",
    options: ["Primary Active transport", "Secondary Active transport", "Facilitated diffusion", "Simple diffusion"],
    correctAnswer: 0
  },
  {
    id: 16,
    question: "The function of the Sodium-Potassium pump is to move:",
    options: ["2 Na out, 3 K in", "3 Na out, 2 K in", "3 Na in, 2 K out", "2 Na in, 3 K out"],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "Primary active transport moves substances using energy derived from:",
    options: ["A secondary gradient", "ATP hydrolysis", "Glucose breakdown", "Friction"],
    correctAnswer: 1
  },
  {
    id: 18,
    question: "Energy for secondary active transport comes from:",
    options: ["Direct ATP hydrolysis", "The gradient created by primary active transport", "Sunlight", "Mitochondrial heat"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "Which pump is located in the cell membrane and helps maintain RMP?",
    options: ["Calcium pump", "Glucose transporter", "Sodium-Potassium ATPase pump", "Proton pump"],
    correctAnswer: 2
  },
  {
    id: 20,
    question: "Where does the Sodium-Potassium ATPase pump break down ATP?",
    options: ["Outside the cell", "Inside the nucleus", "In the cell membrane", "In the Golgi"],
    correctAnswer: 2
  },
  // Section 3: Homeostasis
  {
    id: 21,
    question: "The process of maintaining a stable internal environment is called:",
    options: ["Hemostasis", "Homeostasis", "Metabolism", "Anabolism"],
    correctAnswer: 1
  },
  {
    id: 22,
    question: "The normal range for blood pH in humans is:",
    options: ["6.8 - 7.0", "7.0 - 7.2", "7.35 - 7.45", "7.5 - 8.0"],
    correctAnswer: 2
  },
  {
    id: 23,
    question: "A blood pH below 7.35 is called:",
    options: ["Alkalosis", "Neutrality", "Acidosis", "Homeostasis"],
    correctAnswer: 2
  },
  {
    id: 24,
    question: "A condition where blood pH rises above 7.45 is:",
    options: ["Acidosis", "Alkalosis", "Hypotension", "Hypoglycemia"],
    correctAnswer: 1
  },
  {
    id: 25,
    question: "The internal environment balance includes which of the following?",
    options: ["Water and electrolytes", "Blood pressure", "Temperature", "All of the above"],
    correctAnswer: 3
  },
  {
    id: 26,
    question: "Hyperglycemia refers to:",
    options: ["Low blood sugar", "High blood pressure", "High blood sugar", "Low blood pressure"],
    correctAnswer: 2
  },
  {
    id: 27,
    question: "The normal range for human body temperature is:",
    options: ["35.0 - 36.0°C", "36.5 - 37.5°C", "38.0 - 39.0°C", "34.5 - 35.5°C"],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "Hypothermia is a condition where body temperature:",
    options: ["Increases", "Stays stable", "Decreases", "Fluctuates wildly"],
    correctAnswer: 2
  },
  {
    id: 29,
    question: "Hemostasis (different from Homeostasis) refers to:",
    options: ["Internal balance", "Prevention of blood loss", "Tissue growth", "Nerve transmission"],
    correctAnswer: 1
  },
  {
    id: 30,
    question: "Homeostasis is the collective effort of:",
    options: ["Only the brain", "Only the heart", "All body systems working together", "Only the kidneys"],
    correctAnswer: 2
  },
  // Section 4: Water Balance & Osmosis
  {
    id: 31,
    question: "Total body water (TBW) makes up approximately what percentage of body weight?",
    options: ["40%", "50%", "60%", "70%"],
    correctAnswer: 2
  },
  {
    id: 32,
    question: "The percentage of water is generally higher in:",
    options: ["Females", "Males", "The elderly", "The extremely obese"],
    correctAnswer: 1
  },
  {
    id: 33,
    question: "What fraction of body water is located inside the cells (Intracellular)?",
    options: ["1/3", "2/3", "1/2", "1/4"],
    correctAnswer: 1
  },
  {
    id: 34,
    question: "Extracellular water (1/3 of TBW) is found in which two main compartments?",
    options: ["Interstitial and Intracellular", "Intravascular and Interstitial", "Intranuclear and Interstitial", "Cytoplasmic and Plasma"],
    correctAnswer: 1
  },
  {
    id: 35,
    question: "Most of the Extracellular fluid (2/3 of it) is located:",
    options: ["In the blood vessels", "Between the cells (Interstitial)", "Inside the brain", "In the stomach"],
    correctAnswer: 1
  },
  {
    id: 36,
    question: "Osmosis is the movement of water from:",
    options: ["Higher solute to lower solute", "Lower solute to higher solute", "High pressure to low pressure", "Inside to outside only"],
    correctAnswer: 1
  },
  {
    id: 37,
    question: "A hypotonic solution causes a cell to:",
    options: ["Shrink", "Stay the same", "Swell", "Explode instantly"],
    correctAnswer: 2
  },
  {
    id: 38,
    question: "A hypertonic solution causes a cell to:",
    options: ["Swell", "Shrink", "Stay the same", "Divide"],
    correctAnswer: 1
  },
  {
    id: 39,
    question: "Dehydration is defined as a:",
    options: ["Excess of body fluid", "Deficiency in total body water", "Low blood sugar", "High blood pressure"],
    correctAnswer: 1
  },
  {
    id: 40,
    question: "Edema is an excess of fluid particularly in the:",
    options: ["Intracellular space", "Extracellular/Interstitial spaces", "Blood vessels only", "Nucleus"],
    correctAnswer: 1
  },
  // Section 5: Rest Membrane Potential
  {
    id: 41,
    question: "The electrical potential difference across the cell membrane at rest is called:",
    options: ["Action Potential", "Threshold Potential", "Resting Membrane Potential (RMP)", "Synaptic Potential"],
    correctAnswer: 2
  },
  {
    id: 42,
    question: "In RMP, the inside of the cell is ____ relative to the outside.",
    options: ["Positive", "Neutral", "Negative", "Double positive"],
    correctAnswer: 2
  },
  {
    id: 43,
    question: "Which ion's efflux (leakage) is a major contributor to the negativity inside the cell?",
    options: ["Sodium (Na)", "Calcium (Ca)", "Potassium (K)", "Chloride (Cl)"],
    correctAnswer: 2
  },
  {
    id: 44,
    question: "How does the Sodium-Potassium pump contribute to a negative RMP?",
    options: ["Pumps out more positive charges than it brings in", "Pumps in more positive charges", "Pumps out negative charges", "Pumps in oxygen"],
    correctAnswer: 0
  },
  {
    id: 45,
    question: "Which of these cannot leave the cell and helps keep the interior negative?",
    options: ["Glucose", "Water", "Large proteins and phosphate groups", "Sodium ions"],
    correctAnswer: 2
  },
  {
    id: 46,
    question: "Typical RMP values are estimated around:",
    options: ["0 mV", "+30 mV", "-70 mV or -90 mV", "+70 mV"],
    correctAnswer: 2
  },
  {
    id: 47,
    question: "Excitable tissues are those that can generate an Action Potential. They include:",
    options: ["Skin and bone", "Liver and kidney", "Nerves and muscles", "Blood and lymph"],
    correctAnswer: 2
  },
  {
    id: 48,
    question: "Influx refers to movement of substances:",
    options: ["Inside the cell to outside", "Outside the cell to inside", "Between neighboring cells", "Across the nucleus"],
    correctAnswer: 1
  },
  {
    id: 49,
    question: "Efflux refers to movement of substances:",
    options: ["Outside to inside", "Inside to outside", "Into the mitochondria", "Up the gradient"],
    correctAnswer: 1
  },
  {
    id: 50,
    question: "The principle 'water follows sodium' is an example of:",
    options: ["Active transport", "Simple diffusion", "Osmosis", "Facilitated diffusion"],
    correctAnswer: 2
  },
  // Section 6: Nervous System
  {
    id: 51,
    question: "The central nervous system (CNS) includes which of the following?",
    options: ["Spinal nerves", "Brain and spinal cord", "Cranial nerves", "Peripheral sensors"],
    correctAnswer: 1
  },
  {
    id: 52,
    question: "The peripheral nervous system (PNS) consists of:",
    options: ["The brain", "The spinal cord", "Nerves branching from the brain and spinal cord", "The cerebral cortex"],
    correctAnswer: 2
  },
  {
    id: 53,
    question: "The functional classification of the nervous system includes:",
    options: ["CNS and PNS", "Sensory and Motor systems", "White and Grey matter", "Linear and Circular"],
    correctAnswer: 1
  },
  {
    id: 54,
    question: "Which system controls voluntary actions under conscious control?",
    options: ["Autonomic Nervous System", "Somatic Nervous System", "Enteric Nervous System", "Sympathetic Nervous System"],
    correctAnswer: 1
  },
  {
    id: 55,
    question: "The Autonomic Nervous System (ANS) controls:",
    options: ["Walking", "Involuntary actions", "Singing", "Writing"],
    correctAnswer: 1
  },
  {
    id: 56,
    question: "The 'Fight or Flight' system is the:",
    options: ["Parasympathetic system", "Enteric system", "Sympathetic system", "Somatic system"],
    correctAnswer: 2
  },
  {
    id: 57,
    question: "The 'Rest and Digest' system is the:",
    options: ["Sympathetic system", "Parasympathetic system", "Motor system", "Sensory system"],
    correctAnswer: 1
  },
  {
    id: 58,
    question: "The Sympathetic Nervous System originates from which segment of the spinal cord?",
    options: ["Cervical", "Thoracolumbar (T1 to L2)", "Craniosacral", "Lumbar only"],
    correctAnswer: 1
  },
  {
    id: 59,
    question: "The Parasympathetic Nervous System consists of which cranial nerves (the '1973' rule)?",
    options: ["1, 9, 7, 3", "3, 7, 9, 10", "2, 4, 6, 8", "5, 11, 12, 1"],
    correctAnswer: 1
  },
  {
    id: 60,
    question: "The Enteric Nervous System controls the functions of the:",
    options: ["Brain", "Lungs", "Gastrointestinal tract", "Heart"],
    correctAnswer: 2
  },
  // Section 7: System Comparisons
  {
    id: 61,
    question: "Which system causes the pupil to dilate (Mydriasis)?",
    options: ["Parasympathetic", "Sympathetic", "Somatic", "Enteric"],
    correctAnswer: 1
  },
  {
    id: 62,
    question: "Miosis (pupil constriction) is caused by the:",
    options: ["Sympathetic system", "Parasympathetic system", "Motor cortex", "Sensory neurons"],
    correctAnswer: 1
  },
  {
    id: 63,
    question: "Bronchodilation (dilating bronchioles) occurs during:",
    options: ["Sleep", "Stress/Fight or Flight", "Digestion", "Reading"],
    correctAnswer: 1
  },
  {
    id: 64,
    question: "The Sympathetic system effect on the heart is:",
    options: ["Bradycardia", "Tachycardia (Increased rate)", "No effect", "Decreased contraction force"],
    correctAnswer: 1
  },
  {
    id: 65,
    question: "The Parasympathetic system effect on digestion is:",
    options: ["Decrease secretions", "Decrease motility", "Increase secretions and motility", "Stop blood flow"],
    correctAnswer: 2
  },
  {
    id: 66,
    question: "Specific nerve impulses for saliva are increased by the:",
    options: ["Sympathetic system", "Parasympathetic system", "Somatic system", "Enteric system only"],
    correctAnswer: 1
  },
  {
    id: 67,
    question: "Epithelial tissue covering a body surface is a part of:",
    options: ["Organismal level", "Tissue level of organization", "Molecular level", "Atomic level"],
    correctAnswer: 1
  },
  {
    id: 68,
    question: "Which system is activated during physical stress?",
    options: ["Parasympathetic Nervous System", "Sympathetic Nervous System", "Enteric Nervous System", "Peripheral Nervous System only"],
    correctAnswer: 1
  },
  {
    id: 69,
    question: "What happens to HR in parasympathetic activation?",
    options: ["Increases", "Decreases", "Stays the same", "Becomes irregular"],
    correctAnswer: 1
  },
  {
    id: 70,
    question: "The classification of nerves as Sensory or Motor is a:",
    options: ["Anatomical classification", "Functional classification", "Chemical classification", "Electrical classification"],
    correctAnswer: 1
  }
];
