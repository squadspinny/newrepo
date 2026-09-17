import { CalculatorConfig, CalculatorResult } from '../../types';

export const newApCalculators: CalculatorConfig[] = [
  // 1. AP Macroeconomics
  {
  id: 'ap-macroeconomics',
  title: 'AP Macro Score Calculator',
  shortName: 'AP Macroeconomics',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 Exam Structure',
  seoTitle: 'AP Macro Score Calculator 2027: Predict Your Score',
  metaDescription: 'Free AP Macro Score Calculator 2027 to estimate your AP Macroeconomics score from MCQ and FRQ performance. Free and easy to use.',
  overview: 'Estimate your AP Macro score from 1–5 using the 2027 exam format, with 60 MCQs and 3 FRQs. Enter your scores to get your estimated Composite Score out of 100.',
  cardDescription: 'Estimate your AP Macroeconomics score from 60 MCQs and 3 Free-Response questions.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I: Multiple Choice Correct',
      sublabel: 'Raw correct answers (0 - 60)',
      min: 0,
      max: 60,
      defaultValue: 46
    },
    {
      id: 'frq1',
      label: 'Section II: Long FRQ (Question 1)',
      sublabel: 'Points earned out of 10',
      min: 0,
      max: 10,
      defaultValue: 7
    },
    {
      id: 'frq2',
      label: 'Section II: Short FRQ (Question 2)',
      sublabel: 'Points earned out of 5',
      min: 0,
      max: 5,
      defaultValue: 4
    },
    {
      id: 'frq3',
      label: 'Section II: Short FRQ (Question 3)',
      sublabel: 'Points earned out of 5',
      min: 0,
      max: 5,
      defaultValue: 4
    }
  ],

  calculate: (inputs: Record<string, number>): CalculatorResult => {
    const mcq = Math.max(0, Math.min(60, inputs.mcq ?? 46));

    const frq1 = Math.max(0, Math.min(10, inputs.frq1 ?? 7));
    const frq2 = Math.max(0, Math.min(5, inputs.frq2 ?? 4));
    const frq3 = Math.max(0, Math.min(5, inputs.frq3 ?? 4));

    const frqTotal = frq1 + frq2 + frq3; // max 20 raw points

    // 2027 weighting:
    // MCQ = 66.65%
    // FRQ = 33.35%

    const mcqWeighted =
      (mcq / 60) * 66.65;

    const frqWeighted =
      (frqTotal / 20) * 33.35;

    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';
    let percentile = 'Bottom 35%';

    if (composite >= 70) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Top 16.5%';
    } else if (composite >= 54) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = 'Top 40.2%';
    } else if (composite >= 40) {
      score = 3;
      status = 'Qualified (College Credit)';
      badgeColor = 'amber';
      percentile = 'Top 64.8%';
    } else if (composite >= 28) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = 'Bottom 35.2%';
    }

    return {
      mainScore: score,
      mainScoreLabel: 'Estimated AP Score',
      maxScore: 5,
      qualificationStatus: status,
      qualificationBadgeColor: badgeColor,
      percentileText: percentile,
      compositePoints: composite,
      maxCompositePoints: 100,
      isEstimated: true,

      subscores: [
        {
          label: 'Section I: Multiple Choice (66.65%)',
          value: `${mcq} / 60 pts`
        },
        {
          label: 'Section II: Free Response (33.35%)',
          value: `${frqTotal} / 20 raw pts`
        },
        {
          label: 'Weighted Composite Total',
          value: `${composite} / 100 pts`
        }
      ],

      summaryNote: `Your estimated Composite Score is ${composite}/100, which corresponds to a projected AP Score of ${score}.`
    };
  },

  examSpecs: {
    totalDuration: '2 Hours 10 Minutes',
    totalQuestions: '60 MCQs + 3 FRQs',
    scaleRange: '1 - 5 AP Score',
    qualifyingScore: '3 or higher (40+ composite)',
    nationalAverage: '3.20 Average Score',
    structureNote: 'A four-function, scientific, or graphing calculator is permitted on the AP Macroeconomics exam according to the applicable College Board calculator policy.',

    sections: [
      {
        name: 'Section I: Multiple Choice',
        questions: '60 Questions',
        time: '70 Minutes',
        weight: '66.65%'
      },
      {
        name: 'Section II: Free Response',
        questions: '3 Prompts (1 Long, 2 Short)',
        time: '60 Minutes',
        weight: '33.35%'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'Credit policies vary by college',
      typicalCutoff: '70 - 100 points'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'Credit policies vary by college',
      typicalCutoff: '54 - 69 points'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'Credit policies vary by college',
      typicalCutoff: '40 - 53 points'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'Usually not eligible for college credit',
      typicalCutoff: '28 - 39 points'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'Usually not eligible for college credit',
      typicalCutoff: '0 - 27 points'
    }
  ],

  formulaExplanation: {
    title: 'AP Macroeconomics Weighting Formula',

    steps: [
      'Enter the number of multiple-choice questions you got correct.',
      'Your MCQ score is converted to 66.65 points because Section I makes up 66.65% of the exam.',
      'Enter the points you earned on the 3 free-response questions. Together, they have 20 raw points.',
      'Your total FRQ score is converted to 33.35 points because free response makes up 33.35% of the exam.',
      'We add your MCQ and FRQ scores to get your estimated Composite Score out of 100.',
      'Finally, we compare your Composite Score with our estimated ranges to give you a possible AP Macro score from 1 to 5.'
    ],

    rawToScaledNotes:
      'MCQs account for 66.65% of the exam and FRQs account for 33.35%. The calculator converts both sections into a 100-point Composite Score.'
  },

  faqs: [
    {
      question: 'What is the passing score for AP Macroeconomics?',
      answer:
        'An AP score of 3 is generally considered a qualifying score, but colleges set their own policies for credit and placement.'
    },
    {
      question: 'Are calculators allowed on AP Macroeconomics?',
      answer:
        'Calculators are permitted on the AP Macroeconomics exam. Check the current College Board calculator policy before test day for the exact calculator rules.'
    },
    {
      question: 'How many questions are on the AP Macroeconomics exam?',
      answer:
        'The 2027 AP Macroeconomics exam has 60 multiple-choice questions and 3 free-response questions.'
    },
    {
      question: 'How many points is the AP Macro FRQ section worth?',
      answer:
        'The calculator uses 20 raw FRQ points in total: 10 points for the long FRQ and 5 points each for the two short FRQs.'
    }
  ],

  relatedCalculatorIds: [
    'ap-microeconomics',
    'ap-us-government',
    'ap-statistics',
    'ap-calculus-ab'
  ]
},

  // 2. AP Microeconomics
  {
  id: 'ap-microeconomics',
  title: 'AP Micro Score Calculator',
  shortName: 'AP Microeconomics',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 Exam Structure',

  seoTitle: 'AP Micro Score Calculator 2027: Predict Your Score',

  metaDescription:
    'AP Micro Score Calculator 2027: calculate your estimated 1–5 AP Microeconomics score from MCQ and FRQ results. Free and easy to use.',

  overview:
    'Estimate your AP Micro score from 1–5 using the 2027 exam format, with 60 MCQs and 3 FRQs. Enter your scores to get your estimated Composite Score out of 100.',

  cardDescription:
    'Calculate your AP Microeconomics score from 60 MCQs and 3 analytical Free-Response prompts.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I: Multiple Choice Correct',
      sublabel: 'Raw correct answers (0 - 60)',
      min: 0,
      max: 60,
      defaultValue: 47
    },
    {
      id: 'frq1',
      label: 'Section II: Long FRQ (Question 1)',
      sublabel: 'Points earned out of 10',
      min: 0,
      max: 10,
      defaultValue: 7
    },
    {
      id: 'frq2',
      label: 'Section II: Short FRQ (Question 2)',
      sublabel: 'Points earned out of 5',
      min: 0,
      max: 5,
      defaultValue: 4
    },
    {
      id: 'frq3',
      label: 'Section II: Short FRQ (Question 3)',
      sublabel: 'Points earned out of 5',
      min: 0,
      max: 5,
      defaultValue: 4
    }
  ],

  calculate: (inputs: Record<string, number>): CalculatorResult => {
    const mcq = Math.max(0, Math.min(60, inputs.mcq ?? 47));

    const frq1 = Math.max(0, Math.min(10, inputs.frq1 ?? 7));
    const frq2 = Math.max(0, Math.min(5, inputs.frq2 ?? 4));
    const frq3 = Math.max(0, Math.min(5, inputs.frq3 ?? 4));

    const frqTotal = frq1 + frq2 + frq3; // max 20 raw points

    // 2027 exam weighting
    const mcqWeighted = (mcq / 60) * 66.65;
    const frqWeighted = (frqTotal / 20) * 33.35;

    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';
    let percentile = 'Bottom 32%';

    if (composite >= 72) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Top 18.2%';
    } else if (composite >= 57) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = 'Top 42.4%';
    } else if (composite >= 42) {
      score = 3;
      status = 'Qualified (College Credit)';
      badgeColor = 'amber';
      percentile = 'Top 67.1%';
    } else if (composite >= 30) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = 'Bottom 32.9%';
    }

    return {
      mainScore: score,
      mainScoreLabel: 'Estimated AP Score',
      maxScore: 5,
      qualificationStatus: status,
      qualificationBadgeColor: badgeColor,
      percentileText: percentile,

      compositePoints: composite,
      maxCompositePoints: 100,
      isEstimated: true,

      subscores: [
        {
          label: 'Section I: Multiple Choice (66.65%)',
          value: `${mcq} / 60 pts`
        },
        {
          label: 'Section II: Free Response (33.35%)',
          value: `${frqTotal} / 20 raw pts`
        },
        {
          label: 'Weighted Composite Total',
          value: `${composite} / 100 pts`
        }
      ],

      summaryNote:
        `Your estimated Composite Score is ${composite}/100, which maps to an estimated AP Score of ${score}.`
    };
  },

  examSpecs: {
    totalDuration: '2 Hours 10 Minutes',

    totalQuestions: '60 MCQs + 3 FRQs',

    scaleRange: '1 - 5 AP Score',

    qualifyingScore: '3 or higher (42+ composite)',

    nationalAverage: '3.24',

    structureNote:
      'Calculators are allowed on both multiple-choice and free-response sections.',

    sections: [
      {
        name: 'Section I: Multiple Choice',
        questions: '60 Questions',
        time: '70 Minutes',
        weight: '66.65%'
      },
      {
        name: 'Section II: Free Response',
        questions: '3 Prompts (1 Long, 2 Short)',
        time: '60 Minutes',
        weight: '33.35%'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'Credit policies vary by college',
      typicalCutoff: '72 - 100 points'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'Credit policies vary by college',
      typicalCutoff: '57 - 71.9 points'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'Credit policies vary by college',
      typicalCutoff: '42 - 56.9 points'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'Usually not eligible for college credit',
      typicalCutoff: '30 - 41.9 points'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'Usually not eligible for college credit',
      typicalCutoff: '0 - 29.9 points'
    }
  ],

  formulaExplanation: {
    title: 'AP Microeconomics Scoring Formula',

    steps: [
      'Enter how many of the 60 multiple-choice questions you got correct.',
      'Your MCQ score is converted to 66.65 points because multiple choice makes up 66.65% of the exam.',
      'Add your points from the 3 free-response questions. The calculator uses 20 total raw FRQ points.',
      'Your FRQ score is converted to 33.35 points because free response makes up 33.35% of the exam.',
      'We add the weighted MCQ and FRQ scores to get your estimated Composite Score out of 100.',
      'Finally, we compare your Composite Score with our estimated ranges to give you a possible AP Micro score from 1 to 5.'
    ],

    rawToScaledNotes:
      'MCQs account for 66.65% of the exam and FRQs account for 33.35%. The calculator converts both sections into a 100-point Composite Score.'
  },

  faqs: [   
    {
      question: 'How many questions are on the AP Microeconomics exam?',
      answer:
        'The 2027 AP Microeconomics exam has 60 multiple-choice questions and 3 free-response questions.'
    },
    {
      question: 'How many points are the AP Micro FRQs worth?',
      answer:
        'The calculator uses 20 raw FRQ points in total: 10 points for the long FRQ and 5 points each for the two short FRQs.'
    },
    {
      question: 'Can I use a calculator on AP Micro?',
      answer:
        'Yes, calculators are allowed on the AP Microeconomics exam. Check the current College Board calculator policy before test day for the exact calculator rules.'
    },
    {
      question: 'What Composite Score is estimated as a 5?',
      answer:
        'For this calculator, a Composite Score of 72 or higher is estimated as an AP score of 5. This is an estimate, not an official College Board cutoff.'
    }
  ],

  relatedCalculatorIds: [
    'ap-macroeconomics',
    'ap-statistics',
    'ap-calculus-ab',
    'ap-us-history'
  ]
},

  // 3. AP Government (AP US Government and Politics)
  {
  id: 'ap-us-government',
  title: 'AP Government Score Calculator',
  shortName: 'AP Government',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 Exam Structure',

  seoTitle: 'AP Government Score Calculator 2027: Predict Your Score',

  metaDescription:
    'Free AP Government Score Calculator 2027 to estimate your 1–5 AP U.S. Government and Politics score from MCQ and FRQ results.',

  overview:
    'Estimate your AP Government score from 1–5 using the 2027 exam format. Enter your 55 MCQ and 4 FRQ scores to calculate your estimated Composite Score out of 100.',

  cardDescription:
    'Calculate your AP US Government score from 55 MCQs and 4 analytical FRQs.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I: Multiple Choice Correct',
      sublabel: 'Raw correct answers (0 - 55)',
      min: 0,
      max: 55,
      defaultValue: 42
    },
    {
      id: 'frq1',
      label: 'FRQ 1: Concept Application',
      sublabel: 'Points earned out of 3',
      min: 0,
      max: 3,
      defaultValue: 2
    },
    {
      id: 'frq2',
      label: 'FRQ 2: Quantitative Analysis',
      sublabel: 'Points earned out of 4',
      min: 0,
      max: 4,
      defaultValue: 2
    },
    {
      id: 'frq3',
      label: 'FRQ 3: SCOTUS Comparison',
      sublabel: 'Points earned out of 4',
      min: 0,
      max: 4,
      defaultValue: 3
    },
    {
      id: 'frq4',
      label: 'FRQ 4: Argument Essay',
      sublabel: 'Points earned out of 6',
      min: 0,
      max: 6,
      defaultValue: 5
    }
  ],

  calculate: (inputs: Record<string, number>): CalculatorResult => {
    const mcq = Math.max(0, Math.min(55, inputs.mcq ?? 42));

    const frq1 = Math.max(0, Math.min(3, inputs.frq1 ?? 2));
    const frq2 = Math.max(0, Math.min(4, inputs.frq2 ?? 2));
    const frq3 = Math.max(0, Math.min(4, inputs.frq3 ?? 3));
    const frq4 = Math.max(0, Math.min(6, inputs.frq4 ?? 5));

    const frqTotal = frq1 + frq2 + frq3 + frq4; // max 17

    // 2027 exam weighting: 50% MCQ + 50% FRQ
    const mcqWeighted =
      (mcq / 55) * 50;

    const frqWeighted =
      (frqTotal / 17) * 50;

    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';
    let percentile = 'Estimated 1 range';

    if (composite >= 71) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Estimated 5 range';
    } else if (composite >= 57) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = 'Estimated 4 range';
    } else if (composite >= 45) {
      score = 3;
      status = 'Qualified';
      badgeColor = 'amber';
      percentile = 'Estimated 3 range';
    } else if (composite >= 30) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = 'Estimated 2 range';
    }

    return {
      mainScore: score,
      mainScoreLabel: 'Estimated AP Score',
      maxScore: 5,
      qualificationStatus: status,
      qualificationBadgeColor: badgeColor,
      percentileText: percentile,

      compositePoints: composite,
      maxCompositePoints: 100,
      isEstimated: true,

      subscores: [
        {
          label: 'Section I: Multiple Choice (50%)',
          value: `${Math.round(mcqWeighted * 10) / 10} / 50 pts`
        },
        {
          label: 'Section II: Free Response (50%)',
          value: `${Math.round(frqWeighted * 10) / 10} / 50 pts`
        },
        {
          label: 'Weighted Composite Total',
          value: `${composite} / 100 pts`
        }
      ],

      summaryNote:
        `Your estimated Composite Score is ${composite}/100, which maps to an estimated AP Score of ${score}.`
    };
  },

  examSpecs: {
    totalDuration: '3 Hours',

    totalQuestions: '55 MCQs + 4 FRQs',

    scaleRange: '1 - 5 AP Score',

    qualifyingScore: '3 or higher',

    nationalAverage: '3.34',

    structureNote:
      'The exam is fully digital in Bluebook. The 4 FRQs are Concept Application, Quantitative Analysis, SCOTUS Comparison, and Argument Essay.',

    sections: [
      {
        name: 'Section I: Multiple Choice',
        questions: '55 Questions',
        time: '80 Minutes',
        weight: '50%'
      },
      {
        name: 'Section II: Free Response',
        questions: '4 Questions',
        time: '100 Minutes',
        weight: '50%'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '71 - 100 points'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '57 - 70 points'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '45 - 56 points'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '30 - 44 points'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '0 - 29 points'
    }
  ],

  formulaExplanation: {
    title: 'AP Government Scoring Formula',

    steps: [
      'Enter how many of the 55 multiple-choice questions you got correct.',
      'Your MCQ score is converted to 50 points because Section I is worth 50% of the exam.',
      'Enter your points for each of the 4 FRQs. The four questions have 3, 4, 4, and 6 points available, for a total of 17 raw FRQ points.',
      'Your total FRQ score is converted to 50 points because Section II is also worth 50% of the exam.',
      'We add the MCQ and FRQ weighted scores to get your estimated Composite Score out of 100.',
      'Finally, we compare your Composite Score with our estimated ranges to give you a possible AP Government score from 1 to 5.'
    ],

    rawToScaledNotes:
      'MCQs and FRQs each make up 50% of the exam. The calculator converts both sections to a 100-point Composite Score.'
  },

  faqs: [
    {
      question: 'What is a good AP Government score?',
      answer:
        'A 4 or 5 is generally considered a strong AP Government score. Whether you receive college credit or placement depends on the policies of the college or university you attend.'
    },
    {
      question: 'How many questions are on the AP Government exam?',
      answer:
        'The 2027 AP U.S. Government and Politics exam has 55 multiple-choice questions and 4 free-response questions. The multiple-choice section is worth 50% and the free-response section is worth 50% of the exam.'
    },
    {
      question: 'How many points are the AP Government FRQs worth?',
      answer:
        'The four FRQs have 17 raw points in total: 3 points for Concept Application, 4 points for Quantitative Analysis, 4 points for SCOTUS Comparison, and 6 points for the Argument Essay.'
    },
    {
      question: 'Is the AP Government exam digital in 2027?',
      answer:
        'Yes. The 2027 AP U.S. Government and Politics exam is fully digital and is completed in the Bluebook testing app.'
    },
    {
      question: 'How long is the AP Government exam?',
      answer:
        'The AP Government exam takes 3 hours in total. You get 80 minutes for the 55 multiple-choice questions and 100 minutes for the 4 free-response questions.'
    }
  ],

  relatedCalculatorIds: [
    'ap-us-history',
    'ap-macroeconomics',
    'ap-psychology',
    'ap-english-language'
  ]
},

  // 4. AP Computer Science Principles
  {
  id: 'ap-computer-science-principles',
  title: 'AP CS Principles Score Calculator',
  shortName: 'AP CSP',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 Exam Structure',

  seoTitle: 'AP CS Principles Score Calculator 2027: Predict Your Score',

  metaDescription:
    'Free AP CS Principles Score Calculator to estimate your AP Computer Science Principles score from your MCQ and Create task performance.',

  overview:
    'Estimate your AP CS Principles score from 1–5 using the 2027 exam format. Enter your 70 MCQ score and Create task performance to get an estimated Composite Score out of 100.',

  cardDescription:
    'Estimate your AP CSP grade from 70 MCQs and the Create Performance Task.',

  fields: [
    {
      id: 'mcq',
      label: 'End-of-Course MCQ Correct',
      sublabel: 'Raw correct answers out of 70 (70% weight)',
      min: 0,
      max: 70,
      defaultValue: 56
    },
    {
      id: 'task',
      label: 'Create Performance Task Score',
      sublabel: 'Points earned out of 6 (30% weight)',
      min: 0,
      max: 6,
      defaultValue: 4
    }
  ],

  calculate: (inputs: Record<string, number>): CalculatorResult => {
    const mcq = Math.max(0, Math.min(70, inputs.mcq ?? 56));
    const task = Math.max(0, Math.min(6, inputs.task ?? 4));

    // MCQ = 70%, Create Performance Task = 30%
    const mcqWeighted = mcq;

    const taskWeighted = (task / 6) * 30;

    const composite =
      Math.round((mcqWeighted + taskWeighted) * 10) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';
    let percentile = 'Bottom 36%';

    // Estimated ranges kept as requested
    if (composite >= 82) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Top 12.5%';
    } else if (composite >= 69) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = 'Top 34.8%';
    } else if (composite >= 55) {
      score = 3;
      status = 'Qualified';
      badgeColor = 'amber';
      percentile = 'Top 63.4%';
    } else if (composite >= 40) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = 'Bottom 36.6%';
    }

    return {
      mainScore: score,
      mainScoreLabel: 'Estimated AP Score',
      maxScore: 5,
      qualificationStatus: status,
      qualificationBadgeColor: badgeColor,
      percentileText: percentile,

      compositePoints: composite,
      maxCompositePoints: 100,
      isEstimated: true,

      subscores: [
        {
          label: 'End-of-Course Multiple Choice (70%)',
          value: `${mcq} / 70 pts`
        },
        {
          label: 'Create Performance Task (30%)',
          value: `${task} / 6 pts (${Math.round(taskWeighted * 10) / 10}/30 weighted)`
        },
        {
          label: 'Total Composite Score',
          value: `${composite} / 100 pts`
        }
      ],

      summaryNote:
        `Your estimated Composite Score is ${composite}/100, which maps to an estimated AP Score of ${score}.`
    };
  },

  examSpecs: {
    totalDuration: '3 Hours',

    totalQuestions: '70 MCQs + 4 Written Prompts)',

    scaleRange: '1 - 5 AP Score',

    qualifyingScore: '3 or higher (55+ composite)',

    nationalAverage: '2.87 Average Score',

    structureNote:
      'The 2027 AP CSP exam is fully digital. It includes 70 multiple-choice questions and a Create Performance Task with 2 written-response questions containing 4 distinct prompts.',

    sections: [
      {
        name: 'Section I: End-of-Course Multiple Choice',
        questions: '70 Questions (57 Single, 5 Reading, 8 Multi-Select)',
        time: '120 Minutes',
        weight: '70%'
      },
      {
        name: 'Section II: Create Performance Task',
        questions: 'Program Code, Video + PPR + 4 Written Prompts',
        time: '9 Hours In-Class + 60-Minute Written Response',
        weight: '30%'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '82 - 100 points (~82%)'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '69 - 81 points (~69%)'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '55 - 68 points (~55%)'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '40 - 54 points (~40%)'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'Credit and placement policies vary by college',
      typicalCutoff: '0 - 39 points (<40%)'
    }
  ],

  formulaExplanation: {
    title: 'AP Computer Science Principles Scoring Formula',

    steps: [
      'Enter how many of the 70 multiple-choice questions you got correct.',
      'Enter your Create Performance Task score out of 6 points.',
      'The MCQ score contributes up to 70 points because Section I is worth 70% of the exam.',
      'The Create Performance Task score is converted to a maximum of 30 points because it is worth 30% of the exam.',
      'We add both together to get your estimated Composite Score out of 100.',
      'Finally, we compare your Composite Score with our estimated ranges to give you a possible AP CSP score from 1 to 5.'
    ],

    rawToScaledNotes:
      'The calculator uses a 70/30 weighting: multiple choice is worth 70 points and the Create Performance Task is worth 30 points.'
  },

  faqs: [
    {
      question: 'How many questions are on the AP CSP exam?',
      answer:
        'The 2027 AP Computer Science Principles exam has 70 multiple-choice questions. The exam also includes 2 written-response questions with 4 distinct prompts related to the Create Performance Task.'
    },
    {
      question: 'How many multiple-choice questions are on AP CSP?',
      answer:
        'There are 70 multiple-choice questions. This includes 57 single-select questions, 5 single-select questions with a reading passage, and 8 multiple-select questions where you select 2 answers.'
    },
    {
      question: 'What is the Create Performance Task?',
      answer:
        'The Create Performance Task is a program you develop during the school year. You submit your program code, a video showing your program running, and a Personalized Project Reference through the AP Digital Portfolio.'
    },
    {
      question: 'How long is the AP CSP exam?',
      answer:
        'The end-of-course exam takes 3 hours. You get 120 minutes for the 70 multiple-choice questions and 60 minutes for the written-response section.'
    },
    {
      question: 'When is the AP CSP Create Performance Task due in 2027?',
      answer:
        'The Create Performance Task must be submitted through the AP Digital Portfolio by April 30, 2027, at 11:59 p.m. ET.'
    },
    {
      question: 'Is AP Computer Science Principles fully digital in 2027?',
      answer:
        'Yes. The 2027 end-of-course AP CSP exam is fully digital and is taken in the Bluebook testing app.'
    },
    {
      question: 'What is the difference between AP CSP and AP CSA?',
      answer:
        'AP CSP covers a broad range of computer science topics, including programming, data, the internet, and the impact of computing. AP CSA focuses more deeply on programming and uses Java.'
    }
  ],

  relatedCalculatorIds: [
    'ap-computer-science-a',
    'ap-statistics',
    'ap-calculus-ab',
    'ap-environmental-science'
  ]
},

  // 5. AP Precalculus
  {
  id: 'ap-precalculus',
  title: 'AP Precalculus Score Calculator',
  shortName: 'AP Precalculus',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 Exam Structure',

  seoTitle: 'AP Precalculus Score Calculator 2027: Predict Your Score',

  metaDescription:
    'Free AP Precalculus Score Calculator to estimate your AP score from your multiple-choice and free-response performance.',

  overview:
    'Estimate your AP Precalculus score from 1–5 using the 2027 exam format. Enter your 42 MCQ and 4 FRQ scores to get an estimated Composite Score out of 100.',

  cardDescription:
    'Estimate your AP Precalculus score from 42 MCQs and 4 Free-Response questions.',

  fields: [
    {
      id: 'mcqPartA',
      label: 'Section I Part A: No-Calculator MCQs',
      sublabel: 'Raw correct answers out of 29 (43.75% weight)',
      min: 0,
      max: 29,
      defaultValue: 21
    },
    {
      id: 'mcqPartB',
      label: 'Section I Part B: Graphing Calculator MCQs',
      sublabel: 'Raw correct answers out of 13 (18.75% weight)',
      min: 0,
      max: 13,
      defaultValue: 9
    },
    {
      id: 'frqPartA',
      label: 'Section II Part A: Calculator FRQs (Q1 & Q2)',
      sublabel: 'Points earned out of 12 combined (18.75% weight)',
      min: 0,
      max: 12,
      defaultValue: 8
    },
    {
      id: 'frqPartB',
      label: 'Section II Part B: No-Calculator FRQs (Q3 & Q4)',
      sublabel: 'Points earned out of 12 combined (18.75% weight)',
      min: 0,
      max: 12,
      defaultValue: 8
    }
  ],

  calculate: (inputs: Record<string, number>): CalculatorResult => {
    const mcqPartA = Math.max(
      0,
      Math.min(29, inputs.mcqPartA ?? 21)
    );

    const mcqPartB = Math.max(
      0,
      Math.min(13, inputs.mcqPartB ?? 9)
    );

    const frqPartA = Math.max(
      0,
      Math.min(12, inputs.frqPartA ?? 8)
    );

    const frqPartB = Math.max(
      0,
      Math.min(12, inputs.frqPartB ?? 8)
    );

    const totalMCQ = mcqPartA + mcqPartB;
    const totalFRQ = frqPartA + frqPartB;

    // Section I = 62.5 points out of 100
    const mcqWeighted =
      (totalMCQ / 42) * 62.5;

    // Section II = 37.5 points out of 100
    const frqWeighted =
      (totalFRQ / 24) * 37.5;

    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';
    let percentile = 'Estimated range';

    if (composite >= 73) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Estimated AP Score 5 range';
    } else if (composite >= 58) {
      score = 4;
      status = 'Very Well Qualified';
      badgeColor = 'blue';
      percentile = 'Estimated AP Score 4 range';
    } else if (composite >= 44) {
      score = 3;
      status = 'Qualified';
      badgeColor = 'amber';
      percentile = 'Estimated AP Score 3 range';
    } else if (composite >= 30) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = 'Estimated AP Score 2 range';
    }

    return {
      mainScore: score,
      mainScoreLabel: 'Estimated AP Score',
      maxScore: 5,

      qualificationStatus: status,
      qualificationBadgeColor: badgeColor,
      percentileText: percentile,

      compositePoints: composite,
      maxCompositePoints: 100,

      isEstimated: true,

      subscores: [
        {
          label: 'Section I: Multiple Choice (62.5%)',
          value: `${totalMCQ} / 42 raw pts (${Math.round(mcqWeighted * 10) / 10}/62.5 weighted)`
        },
        {
          label: 'Section II: Free Response (37.5%)',
          value: `${totalFRQ} / 24 raw pts (${Math.round(frqWeighted * 10) / 10}/37.5 weighted)`
        },
        {
          label: 'Total Composite Score',
          value: `${composite} / 100 pts`
        }
      ],

      summaryNote:
        `Your estimated Composite Score is ${composite}/100, which falls in the estimated AP Score ${score} range.`
    };
  },

  examSpecs: {
    totalDuration: '2 Hours 55 Minutes',

    totalQuestions: '42 MCQs + 4 FRQs',

    scaleRange: '1 - 5 AP Score',

    qualifyingScore: '3 or higher',

    nationalAverage: '3.55',

    structureNote:
      'A graphing calculator is required for Section I Part B and Section II Part A. Calculators are not permitted in Section I Part A or Section II Part B.',

    sections: [
      {
        name: 'Section I Part A: No-Calculator MCQs',
        questions: '29 Questions',
        time: '65 Minutes',
        weight: '43.75%'
      },
      {
        name: 'Section I Part B: Graphing Calculator MCQs',
        questions: '13 Questions',
        time: '40 Minutes',
        weight: '18.75%'
      },
      {
        name: 'Section II Part A: Calculator FRQs',
        questions: '2 Questions (Q1 & Q2)',
        time: '35 Minutes',
        weight: '18.75%'
      },
      {
        name: 'Section II Part B: No-Calculator FRQs',
        questions: '2 Questions (Q3 & Q4)',
        time: '35 Minutes',
        weight: '18.75%'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      typicalCutoff: '73 - 100 points'
    },
    {
      score: '4',
      label: 'Very Well Qualified',
      typicalCutoff: '58 - 72 points'
    },
    {
      score: '3',
      label: 'Qualified',
      typicalCutoff: '44 - 57 points'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      typicalCutoff: '30 - 43 points'
    },
    {
      score: '1',
      label: 'No Recommendation',
      typicalCutoff: '0 - 29 points'
    }
  ],

  formulaExplanation: {
    title: 'AP Precalculus Composite Scoring Formula',

    steps: [
      'Add your correct answers from Section I Part A and Part B for a total out of 42 MCQs.',
      'Add your points from all four Section II Free-Response questions for a total out of 24 points.',
      'Convert your MCQ score to 62.5%: (MCQ ÷ 42) × 62.5.',
      'Convert your FRQ score to 37.5%: (FRQ ÷ 24) × 37.5.',
      'Add both results: MCQ contribution + FRQ contribution = Composite Score out of 100.',
      'Compare your Composite Score with the estimated AP score ranges from 1 to 5.'
    ],

    rawToScaledNotes:
      'The score shown by this calculator is an estimate. Actual AP score conversions can vary from year to year.'
  },

  faqs: [
    {
      question: 'What is the format of the 2027 AP Precalculus exam?',
      answer:
        'The 2027 AP Precalculus exam has 42 multiple-choice questions and 4 free-response questions. Multiple choice is worth 62.5% and free response is worth 37.5% of the exam score.'
    },
    {
      question: 'How many MCQs are on AP Precalculus?',
      answer:
        'There are 42 multiple-choice questions. Part A has 29 questions without a calculator, and Part B has 13 questions where a graphing calculator is required.'
    },
    {
      question: 'How many points are the AP Precalculus FRQs worth?',
      answer:
        'There are 4 free-response questions, with each question worth up to 6 points, for a maximum of 24 raw FRQ points.'
    },
    {
      question: 'Is the AP Precalculus score calculator official?',
      answer:
        'No. This calculator provides an estimate based on the 2027 exam structure and estimated score ranges. Your official AP score is determined by the College Board.'
    }
  ],

  relatedCalculatorIds: [
    'ap-calculus-ab',
    'ap-calculus-bc',
    'ap-statistics',
    'ap-physics'
  ]
}
];
