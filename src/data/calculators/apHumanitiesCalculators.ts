import { CalculatorConfig } from '../../types';

export const apHumanitiesCalculators: CalculatorConfig[] = [
{
  id: 'ap-human-geography',
  title: 'AP Human Geography Score Calculator',
  shortName: 'AP Human Geography',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 AP Exam Structure',
  seoTitle: 'AP Human Geography Score Calculator 2027: Predict Your Score',
  metaDescription: 'Free AP Human Geography Score Calculator: enter your MCQ & FRQ points to predict your 1–5 score for the 2027 AP exam. No sign-up required.',
  overview: 'Estimate your AP Human Geography score from 1–5 by entering your 60 multiple-choice answers and scores for the 3 free-response questions. The calculator uses the 50% MCQ / 50% FRQ weighting for the 2027 exam.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I: Multiple-Choice Questions',
      sublabel: '60 questions (60 minutes)',
      min: 0,
      max: 60,
      defaultValue: 45,
      unit: '/ 60'
    },
    {
      id: 'frq1',
      label: 'Section II FRQ 1: No Stimulus Question',
      sublabel: '7 points maximum',
      min: 0,
      max: 7,
      defaultValue: 5,
      unit: '/ 7'
    },
    {
      id: 'frq2',
      label: 'Section II FRQ 2: One Stimulus Question',
      sublabel: '7 points maximum',
      min: 0,
      max: 7,
      defaultValue: 5,
      unit: '/ 7'
    },
    {
      id: 'frq3',
      label: 'Section II FRQ 3: Two Stimuli Question',
      sublabel: '7 points maximum',
      min: 0,
      max: 7,
      defaultValue: 5,
      unit: '/ 7'
    }
  ],

  calculate: (inputs) => {
    const mcq = Math.min(60, Math.max(0, Number(inputs.mcq) || 0));

    const frq1 = Math.min(7, Math.max(0, Number(inputs.frq1) || 0));
    const frq2 = Math.min(7, Math.max(0, Number(inputs.frq2) || 0));
    const frq3 = Math.min(7, Math.max(0, Number(inputs.frq3) || 0));

    const totalFrq = frq1 + frq2 + frq3;

    // Section I: 50 points out of 100
    const mcqWeighted =
      Math.round(((mcq / 60) * 50) * 10) / 10;

    // Section II: 50 points out of 100
    const frqWeighted =
      Math.round(((totalFrq / 21) * 50) * 10) / 10;

    // Final Composite Score: 0–100
    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
    let percentile = '~25th Percentile';

    // Estimated ranges:
    // 5 = 75–100
    // 4 = 60–74
    // 3 = 45–59
    // 2 = 30–44
    // 1 = 0–29

    if (composite >= 75) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Top ~16%';
    } else if (composite >= 60) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = '~60th-83rd Percentile';
    } else if (composite >= 45) {
      score = 3;
      status = 'Qualified (College Credit Eligible)';
      badgeColor = 'amber';
      percentile = '~40th-59th Percentile';
    } else if (composite >= 30) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = '~20th-39th Percentile';
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

      summaryNote:
        `Your estimated Composite Score is ${composite.toFixed(1)} / 100.`,

      subscores: [
        {
          label: 'MCQ Weighted Points (50%)',
          value: `${mcqWeighted.toFixed(1)} pts`,
          max: 50,
          percent: Math.round((mcqWeighted / 50) * 100)
        },
        {
          label: 'FRQ Weighted Points (50%)',
          value: `${frqWeighted.toFixed(1)} pts`,
          max: 50,
          percent: Math.round((frqWeighted / 50) * 100)
        },
        {
          label: 'Raw Multiple Choice Correct',
          value: `${mcq} / 60`
        },
        {
          label: 'Raw Free Response Total',
          value: `${totalFrq} / 21`
        }
      ]
    };
  },

  examSpecs: {
    totalDuration: '2 Hours 15 Minutes',
    totalQuestions: '60 MCQs + 3 FRQs',
    scaleRange: '1 - 5',
    qualifyingScore: '3 or higher',
    nationalAverage: '3.14',

    structureNote:
      'Section I: 60 MCQs (60 min, 50%). Section II: 3 FRQs (75 min, 50%).',

    sections: [
      {
        name: 'Section I: Multiple Choice',
        questions: '60 Questions',
        time: '60 Minutes',
        weight: '50% of Score'
      },
      {
        name: 'Section II: Free Response',
        questions: '3 FRQs (21 points)',
        time: '75 Minutes',
        weight: '50% of Score'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'Human Geography / Social Science Credit',
      typicalCutoff: '75 – 100 Composite'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'General Education Social Science Credit',
      typicalCutoff: '60 – 74 Composite'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'College Elective Credit',
      typicalCutoff: '45 – 59 Composite'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'No College Credit',
      typicalCutoff: '30 – 44 Composite'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'No Credit Granted',
      typicalCutoff: '0 – 29 Composite'
    }
  ],

  formulaExplanation: {
    title: 'How We Calculate Your AP Human Geography Score',

    steps: [
      'Enter how many of the 60 multiple-choice questions you got correct.',
      'We convert your MCQ score to 50 points because Section I is worth 50% of the exam.',
      'Enter the points you earned on each of the 3 FRQs. Each FRQ is worth up to 7 points, giving you 21 possible FRQ points.',
      'We convert your total FRQ points to 50 points because Section II is also worth 50% of the exam.',
      'We add the MCQ and FRQ weighted scores to get your Composite Score out of 100.',
      'Finally, we compare your Composite Score with our estimated ranges to give you an AP score from 1 to 5.'
    ],

    rawToScaledNotes:
      'The calculator uses a simple 50/50 split: multiple choice is worth 50 points and free response is worth 50 points. The raw maximum is 81 points, but the final Composite Score is shown on a 100-point scale.'
  },

  faqs: [
    {
      question: 'What is a good AP Human Geography score?',
      answer:
        'A 4 or 5 is generally considered a strong AP result, although whether you receive college credit or placement depends on the individual institution.'
    },
    {
      question: 'How many questions are on the AP Human Geography exam?',
      answer:
        'The exam contains 60 multiple-choice questions and 3 free-response questions. The MCQ section lasts 1 hour, while the FRQ section lasts 1 hour and 15 minutes.'
    },
    {
      question: 'How much is the AP Human Geography MCQ section worth?',
      answer:
        'The multiple-choice section accounts for 50% of the total AP Human Geography exam score.'
    },
    {
    question: 'How much is the AP Human Geography FRQ section worth?',
    answer: 'The free-response section accounts for the remaining 50% of the exam score and contains 3 questions.'
    },
    {
      question: 'Is the AP Human Geography exam digital?',
      answer: 'Yes. The exam is administered digitally through the Bluebook testing application.'
    }
  ],

  relatedCalculatorIds: [
    'ap-world-history',
    'ap-us-history',
    'ap-environmental-science'
  ]
},
  {
  id: 'ap-world-history',
  title: 'AP World History Score Calculator',
  shortName: 'AP World History',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 AP Exam Structure',
  seoTitle: 'AP World History Score Calculator 2027: Predict Your Score',
  metaDescription: 'Free AP World History Score Calculator 2027 to estimate your AP score from MCQ, SAQ, DBQ, and LEQ performance. Free and easy to use.',
  overview: 'Estimate your AP World History score from 1 to 5 using the 2027 exam format. The calculator uses the official 40% MCQ, 20% SAQ, 25% DBQ, and 15% LEQ weighting to estimate your final AP score.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I Part A: Multiple-Choice Questions',
      sublabel: '55 questions (55 minutes, 40% of exam)',
      min: 0,
      max: 55,
      defaultValue: 42,
      unit: '/ 55'
    },
    {
      id: 'saq_1',
      label: 'Section I Part B: Short-Answer Question 1',
      sublabel: '3 points maximum',
      min: 0,
      max: 3,
      defaultValue: 2,
      unit: '/ 3'
    },
    {
      id: 'saq_2',
      label: 'Section I Part B: Short-Answer Question 2',
      sublabel: '3 points maximum',
      min: 0,
      max: 3,
      defaultValue: 2,
      unit: '/ 3'
    },
    {
      id: 'saq_3',
      label: 'Section I Part B: Short-Answer Question 3',
      sublabel: '3 points maximum',
      min: 0,
      max: 3,
      defaultValue: 2,
      unit: '/ 3'
    },
    {
      id: 'dbq',
      label: 'Section II Part A: Document-Based Question (DBQ)',
      sublabel: '1 question (7 points maximum, 25% of exam)',
      min: 0,
      max: 7,
      defaultValue: 5,
      unit: '/ 7'
    },
    {
      id: 'leq',
      label: 'Section II Part B: Long Essay Question (LEQ)',
      sublabel: '1 question (6 points maximum, 15% of exam)',
      min: 0,
      max: 6,
      defaultValue: 4,
      unit: '/ 6'
    }
  ],

  calculate: (inputs) => {
    const mcq = Math.min(55, Math.max(0, Number(inputs.mcq) || 0));

    const saq1 = Math.min(3, Math.max(0, Number(inputs.saq_1) || 0));
    const saq2 = Math.min(3, Math.max(0, Number(inputs.saq_2) || 0));
    const saq3 = Math.min(3, Math.max(0, Number(inputs.saq_3) || 0));

    const totalSaq = saq1 + saq2 + saq3;

    const dbq = Math.min(7, Math.max(0, Number(inputs.dbq) || 0));
    const leq = Math.min(6, Math.max(0, Number(inputs.leq) || 0));

    // Official weighting:
    // MCQ = 40%, SAQ = 20%, DBQ = 25%, LEQ = 15%

    const mcqWeighted =
      Math.round(((mcq / 55) * 40) * 10) / 10;

    const saqWeighted =
      Math.round(((totalSaq / 9) * 20) * 10) / 10;

    const dbqWeighted =
      Math.round(((dbq / 7) * 25) * 10) / 10;

    const leqWeighted =
      Math.round(((leq / 6) * 15) * 10) / 10;

    const composite =
      Math.round(
        (mcqWeighted + saqWeighted + dbqWeighted + leqWeighted) * 10
      ) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
    let percentile = '~20th-39th Percentile';

    if (composite >= 75) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Top ~15%';
    } else if (composite >= 60) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = '~60th-84th Percentile';
    } else if (composite >= 45) {
      score = 3;
      status = 'Qualified';
      badgeColor = 'amber';
      percentile = '~40th-59th Percentile';
    } else if (composite >= 30) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = '~20th-39th Percentile';
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

      summaryNote:
        `Your estimated Composite Score is ${composite.toFixed(1)} / 100. ` +
        `MCQ contributed ${mcqWeighted.toFixed(1)} pts, SAQs ${saqWeighted.toFixed(1)} pts, ` +
        `DBQ ${dbqWeighted.toFixed(1)} pts, and LEQ ${leqWeighted.toFixed(1)} pts.`,

      subscores: [
        {
          label: 'MCQ Contribution (40%)',
          value: `${mcqWeighted.toFixed(1)} pts`,
          max: 40,
          percent: Math.round((mcqWeighted / 40) * 100)
        },
        {
          label: 'SAQ Contribution (20%)',
          value: `${saqWeighted.toFixed(1)} pts`,
          max: 20,
          percent: Math.round((saqWeighted / 20) * 100)
        },
        {
          label: 'DBQ Contribution (25%)',
          value: `${dbqWeighted.toFixed(1)} pts`,
          max: 25,
          percent: Math.round((dbqWeighted / 25) * 100)
        },
        {
          label: 'LEQ Contribution (15%)',
          value: `${leqWeighted.toFixed(1)} pts`,
          max: 15,
          percent: Math.round((leqWeighted / 15) * 100)
        }
      ]
    };
  },

  examSpecs: {
    totalDuration: '3 Hours 15 Minutes',
    totalQuestions: '55 MCQs, 3 SAQs, 1 DBQ, 1 LEQ',
    scaleRange: '1 - 5',
    qualifyingScore: '3 or higher',
    nationalAverage: '3.16',

    structureNote:
      'Section I: 55 MCQs (55 min, 40%) and 3 SAQs (40 min, 20%). Section II: 1 DBQ (60 min, 25%) and 1 LEQ (40 min, 15%).',

    sections: [
      {
        name: 'Section I Part A (MCQ)',
        questions: '55 Questions',
        time: '55 Minutes',
        weight: '40% of Score'
      },
      {
        name: 'Section I Part B (SAQ)',
        questions: '3 Questions',
        time: '40 Minutes',
        weight: '20% of Score'
      },
      {
        name: 'Section II Part A (DBQ)',
        questions: '1 Question (7 pts)',
        time: '60 Minutes',
        weight: '25% of Score'
      },
      {
        name: 'Section II Part B (LEQ)',
        questions: '1 Question (6 pts)',
        time: '40 Minutes',
        weight: '15% of Score'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'World History / Global Studies Credit',
      typicalCutoff: '75 – 100 Composite'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'Humanities & History Elective Credit',
      typicalCutoff: '60 – 74 Composite'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'General Education History Credit',
      typicalCutoff: '45 – 59 Composite'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'No College Credit',
      typicalCutoff: '30 – 44 Composite'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'No Credit Granted',
      typicalCutoff: '0 – 29 Composite'
    }
  ],

  formulaExplanation: {
    title: 'AP World History Scoring Formula',

    steps: [
      'Enter how many of the 55 multiple-choice questions you got right. This section makes up 40% of your final score.',
      'Add your 3 SAQ scores: Each SAQ is worth up to 3 points, so you can earn up to 9 points. Together, the SAQs count for 20% of your score.',
      'Enter your DBQ score: The DBQ is scored out of 7 points and makes up 25% of the final score.',
      'Enter your LEQ score: The LEQ is scored out of 6 points and makes up the remaining 15%.',
      'Enter your DBQ score out of 7 and your LEQ score out of 6. These are converted to 25 and 15 points based on their exam weights.',
      'We convert each section according to its official weighting and add them together. Your final estimated Composite Score is shown out of 100.',
      'We compare your Composite Score with our estimated ranges to show whether you are likely to receive an AP score of 1, 2, 3, 4, or 5.'
    ],

    rawToScaledNotes:
      'The calculator uses the official 40% MCQ, 20% SAQ, 25% DBQ, and 15% LEQ weighting. The raw scores are converted to their weighted values and combined into a 100-point Composite Score.'
  },

  faqs: [
    {
      question: 'What is a good AP World History score?',
      answer:
        'A score of 3, 4, or 5 is generally considered a passing AP score, although individual colleges and universities decide whether and how AP credit is awarded. Some schools may require a 4 or 5 for credit or placement..'
    },
    {
      question: 'Is AP World History fully digital in 2027?',
      answer:
        'Yes. The College Board states that AP World History: Modern is a fully digital exam completed in the Bluebook testing app.'
    },
    {
      question: 'How many questions are on the AP World History exam?',
      answer:
        'The exam has 55 multiple-choice questions, 3 short-answer questions, 1 DBQ, and 1 LEQ.'
    },
    {
      question: 'How much is the AP World History MCQ section worth?',
      answer:
        'The multiple-choice section accounts for 40% of the total exam score and contains 55 questions.'
    },
    {
      question: 'How much are SAQs worth on AP World History?',
      answer: 'The three required SAQs together account for 20% of the exam score. Students have 40 minutes to complete them.'
    },
    {
      question: 'How much is the AP World History DBQ worth?',
      answer: 'The DBQ accounts for 25% of the total exam score. The recommended time is 60 minutes, including a 15-minute reading period.'
    },
    {
      question: 'How much is the AP World History LEQ worth?',
      answer: 'The LEQ accounts for 15% of the exam score, with 40 minutes recommended for completion.'
    },
    {
      question: 'Is there a penalty for wrong answers on AP World History MCQs?',
      answer: 'No. Incorrect answers do not receive a penalty, so students should answer every multiple-choice question.'
    }
  ],

  relatedCalculatorIds: [
    'ap-us-history',
    'ap-human-geography',
    'ap-english-language'
  ]
},
  {
  id: 'ap-us-history',
  title: 'APUSH Score Calculator',
  shortName: 'AP U.S. History',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 AP Exam Structure',
  seoTitle: 'APUSH Score Calculator 2027: Predict Your Score',
  metaDescription: 'Free APUSH Score Calculator to estimate your AP U.S. History score for the 2027 exam. Enter your MCQ, SAQ, DBQ, and LEQ scores for an estimate.',
  overview: 'Estimate your APUSH score from 1 to 5 using the 2027 exam format. Enter your MCQ, SAQ, DBQ, and LEQ scores to get an estimated Composite Score out of 100.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I Part A: Multiple-Choice Questions',
      sublabel: '55 questions (55 minutes, 40% of exam score)',
      min: 0,
      max: 55,
      defaultValue: 43,
      unit: '/ 55'
    },
    {
      id: 'saq_1',
      label: 'Part B: Short-Answer Question 1',
      sublabel: '3 points maximum',
      min: 0,
      max: 3,
      defaultValue: 2,
      unit: '/ 3'
    },
    {
      id: 'saq_2',
      label: 'Part B: Short-Answer Question 2',
      sublabel: '3 points maximum',
      min: 0,
      max: 3,
      defaultValue: 2,
      unit: '/ 3'
    },
    {
      id: 'saq_3',
      label: 'Part B: Short-Answer Question 3',
      sublabel: '3 points maximum',
      min: 0,
      max: 3,
      defaultValue: 2,
      unit: '/ 3'
    },
    {
      id: 'dbq',
      label: 'Section II Part A: Document-Based Question (DBQ)',
      sublabel: '1 essay (7 points maximum, 25% of exam)',
      min: 0,
      max: 7,
      defaultValue: 5,
      unit: '/ 7'
    },
    {
      id: 'leq',
      label: 'Section II Part B: Long Essay Question (LEQ)',
      sublabel: '1 essay (6 points maximum, 15% of exam)',
      min: 0,
      max: 6,
      defaultValue: 4,
      unit: '/ 6'
    }
  ],

  calculate: (inputs) => {
    const mcq = Math.min(55, Math.max(0, Number(inputs.mcq) || 0));

    const saq1 = Math.min(3, Math.max(0, Number(inputs.saq_1) || 0));
    const saq2 = Math.min(3, Math.max(0, Number(inputs.saq_2) || 0));
    const saq3 = Math.min(3, Math.max(0, Number(inputs.saq_3) || 0));

    const totalSaq = saq1 + saq2 + saq3;

    const dbq = Math.min(7, Math.max(0, Number(inputs.dbq) || 0));
    const leq = Math.min(6, Math.max(0, Number(inputs.leq) || 0));

    const mcqWeighted =
      Math.round(((mcq / 55) * 40) * 10) / 10;

    const saqWeighted =
      Math.round(((totalSaq / 9) * 20) * 10) / 10;

    const dbqWeighted =
      Math.round(((dbq / 7) * 25) * 10) / 10;

    const leqWeighted =
      Math.round(((leq / 6) * 15) * 10) / 10;

    const composite =
      Math.round(
        (mcqWeighted + saqWeighted + dbqWeighted + leqWeighted) * 10
      ) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
    let percentile = '~20th-34th Percentile';

    if (composite >= 78) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Top ~15%';
    } else if (composite >= 65) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = '~60th-84th Percentile';
    } else if (composite >= 48) {
      score = 3;
      status = 'Qualified (College Credit Eligible)';
      badgeColor = 'amber';
      percentile = '~40th-59th Percentile';
    } else if (composite >= 35) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = '~20th-39th Percentile';
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

      summaryNote:
        `Your estimated Composite Score is ${composite.toFixed(1)} / 100. ` +
        `MCQ contributed ${mcqWeighted.toFixed(1)} pts, SAQs ${saqWeighted.toFixed(1)} pts, ` +
        `DBQ ${dbqWeighted.toFixed(1)} pts, and LEQ ${leqWeighted.toFixed(1)} pts.`,

      subscores: [
        {
          label: 'MCQ Contribution (40%)',
          value: `${mcqWeighted.toFixed(1)} pts`,
          max: 40,
          percent: Math.round((mcqWeighted / 40) * 100)
        },
        {
          label: 'SAQ Contribution (20%)',
          value: `${saqWeighted.toFixed(1)} pts`,
          max: 20,
          percent: Math.round((saqWeighted / 20) * 100)
        },
        {
          label: 'DBQ Contribution (25%)',
          value: `${dbqWeighted.toFixed(1)} pts`,
          max: 25,
          percent: Math.round((dbqWeighted / 25) * 100)
        },
        {
          label: 'LEQ Contribution (15%)',
          value: `${leqWeighted.toFixed(1)} pts`,
          max: 15,
          percent: Math.round((leqWeighted / 15) * 100)
        }
      ]
    };
  },

  examSpecs: {
    totalDuration: '3 Hours 15 Minutes',
    totalQuestions: '55 MCQs, 3 SAQs, 1 DBQ, 1 LEQ',
    scaleRange: '1 - 5',
    qualifyingScore: '3 or higher',
    nationalAverage: '3.36',

    structureNote:
      'Section I: 55 MCQs (55 min, 40%) and 3 SAQs (40 min, 20%). Section II: 1 DBQ (60 min, 25%) and 1 LEQ (40 min, 15%).',

    sections: [
      {
        name: 'Section I Part A (MCQ)',
        questions: '55 Questions',
        time: '55 Minutes',
        weight: '40% of Score'
      },
      {
        name: 'Section I Part B (SAQ)',
        questions: '3 Questions',
        time: '40 Minutes',
        weight: '20% of Score'
      },
      {
        name: 'Section II Part A (DBQ)',
        questions: '1 Question (7 pts)',
        time: '60 Minutes',
        weight: '25% of Score'
      },
      {
        name: 'Section II Part B (LEQ)',
        questions: '1 Question (6 pts)',
        time: '40 Minutes',
        weight: '15% of Score'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'Full US History Sequence (US History I & II)',
      typicalCutoff: '78 – 100 Composite'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'Single Semester US History Credit',
      typicalCutoff: '65 – 77 Composite'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'General Social Science / History Elective',
      typicalCutoff: '48 – 64 Composite'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'No College Credit',
      typicalCutoff: '35 – 47 Composite'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'No Credit Granted',
      typicalCutoff: '0 – 34 Composite'
    }
  ],

  formulaExplanation: {
  title: 'AP U.S. History Scoring Formula',

  steps: [
    'Enter how many of the 55 multiple-choice questions you got correct.',
    'Enter your score for SAQ 1, SAQ 2, and SAQ 3. Each question is worth up to 3 points, so you can earn up to 9 SAQ points.',
    'Your MCQ score is converted to 40 points because the multiple-choice section makes up 40% of the exam.',
    'Add your three SAQ scores together and convert the total to 20 points because the SAQ section is worth 20%.',
    'Enter your DBQ score out of 7 and your LEQ score out of 6. These scores are converted to 25 and 15 points based on their weight in the exam.',
    'Add the four weighted scores together to get your estimated Composite Score out of 100.',
    'Your Composite Score is then matched with our estimated score ranges to give you an estimated AP score from 1 to 5.'
  ],

  rawToScaledNotes:
    'The exam has different point totals for each section, so we convert each one based on its actual weight: 40% for MCQs, 20% for SAQs, 25% for the DBQ, and 15% for the LEQ. These weighted scores add up to a 100-point Composite Score.'
},

  faqs: [
    {
    question: 'What is a good APUSH score?',
    answer:
      'A 4 or 5 is generally considered a strong APUSH score, although the credit or placement you receive depends on the college or university.'
  },

  {
    question: 'Is the APUSH exam digital in 2027?',
    answer:
      'Yes. The 2027 AP U.S. History exam is administered digitally using the Bluebook testing app.'
  },
  {
    question: 'How many questions are on the APUSH exam?',
    answer:
      'The 2027 AP U.S. History exam includes 55 multiple-choice questions, 3 short-answer questions, 1 DBQ, and 1 LEQ.'
  },

  {
    question: 'How much is the APUSH MCQ section worth?',
    answer:
      'The multiple-choice section contains 55 questions and accounts for 40% of the total APUSH score.'
  },

  {
    question: 'How much are SAQs worth on APUSH?',
    answer:
      'The three required short-answer questions together account for 20% of the APUSH score. Each SAQ is worth up to 3 points, for 9 possible raw points.'
  },

  {
    question: 'How much is the APUSH DBQ worth?',
    answer:
      'The DBQ accounts for 25% of the total APUSH score and is scored using a 7-point rubric.'
  },

  {
    question: 'How much is the APUSH LEQ worth?',
    answer:
      'The LEQ accounts for 15% of the total APUSH score and is scored using a 6-point rubric.'
  },

  {
    question: 'Is there a penalty for wrong answers on APUSH MCQs?',
    answer:
      'No. Incorrect multiple-choice answers do not result in a penalty, so it is best to answer every question.'
  }
  ],

  relatedCalculatorIds: [
    'ap-world-history',
    'ap-human-geography',
    'ap-english-language'
  ],

  isPopular: true
},
  {
  id: 'ap-psychology',
  title: 'AP Psychology Score Calculator',
  shortName: 'AP Psychology',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 AP Exam Structure',
  seoTitle: 'AP Psychology Score Calculator 2027: Predict Your Score',
  metaDescription: 'AP Psychology Score Calculator: enter your results to estimate your 1–5 AP score for the 2027 exam. Free, fast, and easy to use.',
  overview: 'Estimate your AP Psychology score from 1–5 using the 2027 exam format, including 75 MCQs, AAQ & EBQ free responses, and 66.7% / 33.3% weighting.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I: Multiple-Choice Questions',
      sublabel: '75 questions (90 minutes, 66.7% of exam score)',
      min: 0,
      max: 75,
      defaultValue: 58,
      unit: '/ 75'
    },
    {
      id: 'frq1',
      label: 'Section II FRQ 1: Article Analysis Question (AAQ)',
      sublabel: '7 points maximum',
      min: 0,
      max: 7,
      defaultValue: 5,
      unit: '/ 7'
    },
    {
      id: 'frq2',
      label: 'Section II FRQ 2: Evidence-Based Question (EBQ)',
      sublabel: '7 points maximum',
      min: 0,
      max: 7,
      defaultValue: 5,
      unit: '/ 7'
    }
  ],

  calculate: (inputs) => {
    const mcq = Math.min(75, Math.max(0, Number(inputs.mcq) || 0));
    const frq1 = Math.min(7, Math.max(0, Number(inputs.frq1) || 0));
    const frq2 = Math.min(7, Math.max(0, Number(inputs.frq2) || 0));

    const totalFrq = frq1 + frq2;

    // Section I: 75 MCQs = 66.67 points
    const mcqWeighted =
      (mcq / 75) * 66.67;

    // Section II: 14 FRQ points = 33.33 points
    const frqWeighted =
      (totalFrq / 14) * 33.33;

    // Composite Score = 0–100
    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
    let percentile = '~25th Percentile';

    // Estimated AP score ranges:
    // 5 = 75–100
    // 4 = 60–74
    // 3 = 45–59
    // 2 = 30–44
    // 1 = 0–29

    if (composite >= 75) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Top ~18% (82nd+ Percentile)';
    } else if (composite >= 60) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = '~60th-81st Percentile';
    } else if (composite >= 45) {
      score = 3;
      status = 'Qualified (College Credit Eligible)';
      badgeColor = 'amber';
      percentile = '~38th-59th Percentile';
    } else if (composite >= 30) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = '~18th-37th Percentile';
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

      summaryNote: `Your composite score is ${composite.toFixed(1)} / 100.`,

      subscores: [
        {
          label: 'MCQ Weighted Points (66.7%)',
          value: `${mcqWeighted.toFixed(1)} pts`,
          max: 66.7,
          percent: Math.round((mcqWeighted / 66.67) * 100)
        },
        {
          label: 'FRQ Weighted Points (33.3%)',
          value: `${frqWeighted.toFixed(1)} pts`,
          max: 33.3,
          percent: Math.round((frqWeighted / 33.33) * 100)
        },
        {
          label: 'Raw Multiple Choice Correct',
          value: `${mcq} / 75`
        },
        {
          label: 'Raw Free Response Total',
          value: `${totalFrq} / 14`
        }
      ]
    };
  },

  examSpecs: {
    totalDuration: '2 Hours 40 Minutes',
    totalQuestions: '75 MCQs + 2 FRQs',
    scaleRange: '1 - 5',
    qualifyingScore: '3 or higher',
    nationalAverage: '3.12',

    structureNote:
      'Revised College Board design: 75 MCQs (90 min, 66.7%) and 2 redesigned FRQs: Article Analysis Question (AAQ) and Evidence-Based Question (EBQ) in 70 min (33.3%).',

    sections: [
      {
        name: 'Section I: Multiple Choice',
        questions: '75 Questions',
        time: '90 Minutes',
        weight: '66.7% of Score'
      },
      {
        name: 'Section II: Free Response',
        questions: '2 FRQs (14 raw pts)',
        time: '70 Minutes',
        weight: '33.3% of Score'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'Introductory Psychology College Credit',
      typicalCutoff: '75 – 100 Composite'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'Psychology General Education Credit',
      typicalCutoff: '60 – 74 Composite'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'Social Science Elective Credit',
      typicalCutoff: '45 – 59 Composite'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'No College Credit',
      typicalCutoff: '30 – 44 Composite'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'No Credit Granted',
      typicalCutoff: '0 – 29 Composite'
    }
  ],

  formulaExplanation: {
    title: 'AP Psychology Scoring Formula (Revised Model)',

    steps: [
      'Enter how many of the 75 multiple-choice questions you got correct.',
      'We convert your MCQ score to 66.7 points because multiple choice makes up 66.7% of the exam.',
      'Enter your points for the AAQ and EBQ. Together, they are worth 14 points.',
      'We convert your total FRQ points to 33.3 points because free response makes up 33.3% of the exam.',
      'We add your MCQ and FRQ weighted scores to get your Composite Score out of 100.',
      'Finally, we compare your Composite Score with our estimated ranges to give you an AP score from 1 to 5.'
    ],

    rawToScaledNotes:
      'The calculator uses the revised 2027 format: 75 multiple-choice questions and 14 total free-response points. Multiple choice is worth 66.7% and free response is worth 33.3% of the Composite Score.'
  },

  faqs: [
    {
      question: 'What is a good AP Psychology score?',
      answer: 'A 4 or 5 is generally considered a strong AP Psychology score, while a 3 is classified by College Board as “Qualified.” However, whether a particular score earns college credit depends on the institution.'

    },
    {
      question: 'How many questions are on the 2027 AP Psychology Exam?',
      answer:
        'The May 2027 AP Psychology Exam has 75 multiple-choice questions and 2 free-response questions.'
    },
    {
      question: 'How long is the AP Psychology Exam?',
      answer:
        'The multiple-choice section lasts 90 minutes, followed by a 70-minute free-response section, for a total testing time of 160 minutes.'
    },
    {
      question: 'How much is the AP Psychology multiple-choice section worth?',
      answer:
        'The multiple-choice section accounts for 66.7% of the total exam score.'
    },
    {
      question: 'How much is the AP Psychology free-response section worth?',
      answer: 'The free-response section accounts for 33.3% of the total exam score. It contains two questions worth up to 7 points each.'
    },
    {
      question: 'What are the two AP Psychology FRQs?',
      answer: 'The two free-response questions are the Article Analysis Question (AAQ) and the Evidence-Based Question (EBQ).'
    },
    {
      question: 'Is the AP Psychology Exam fully digital?',
      answer: 'Yes. The current College Board exam page states that AP Psychology is a fully digital exam, with both multiple-choice and free-response questions completed in Bluebook.'
    }
  ],

  relatedCalculatorIds: [
    'ap-biology',
    'ap-statistics',
    'mcat',
    'ap-human-geography'
  ],

  isPopular: true
},
  {
    id: 'ap-english-language',
    title: 'AP Lang Score Calculator',
    shortName: 'AP English Language',
    category: 'ap',
    categoryLabel: 'AP Exams',
    yearFormat: '2027 AP Exam Structure',
    seoTitle: 'AP Lang Score Calculator 2027: Predict Your Score',
    metaDescription: 'Free AP Lang Score Calculator 2027 to estimate your AP English Language score. Enter your MCQ and FRQ scores to get an estimated 1–5 score.',
    overview: 'Estimate your AP English Language score from 1–5 using the 2027 exam format: 45 MCQs (45%) and 3 FRQs (55%). Enter your scores to get an estimated Composite Score out of 100.',
    fields: [
      {
        id: 'mcq',
        label: 'Section I: Multiple Choice Questions (Reading & Writing)',
        sublabel: '45 questions (60 minutes, 45% of exam score)',
        min: 0,
        max: 45,
        defaultValue: 34,
        unit: '/ 45'
      },
      {
        id: 'frq_synthesis',
        label: 'Section II Question 1: Synthesis Essay',
        sublabel: '6 points analytic rubric',
        min: 0,
        max: 6,
        defaultValue: 4,
        unit: '/ 6'
      },
      {
        id: 'frq_rhetorical',
        label: 'Section II Question 2: Rhetorical Analysis Essay',
        sublabel: '6 points analytic rubric',
        min: 0,
        max: 6,
        defaultValue: 4,
        unit: '/ 6'
      },
      {
        id: 'frq_argument',
        label: 'Section II Question 3: Argument Essay',
        sublabel: '6 points analytic rubric',
        min: 0,
        max: 6,
        defaultValue: 4,
        unit: '/ 6'
      }
    ],
    calculate: (inputs) => {
      const mcq = Math.min(45, Math.max(0, inputs.mcq || 0));
      const frq1 = Math.min(6, Math.max(0, inputs.frq_synthesis || 0));
      const frq2 = Math.min(6, Math.max(0, inputs.frq_rhetorical || 0));
      const frq3 = Math.min(6, Math.max(0, inputs.frq_argument || 0));
      const totalFrq = frq1 + frq2 + frq3;

      // Section 1: 45 MCQs = 45 points (45%)
      const mcqWeighted = mcq;
      // Section 2: 18 raw points * (55 / 18 = 3.0556) = 55 points (55%)
      const frqWeighted = Math.round((totalFrq / 18) * 55 * 10) / 10;
      const composite = Math.round((mcqWeighted + frqWeighted) * 10) / 10;

      let score = 1;
      let status = 'No Recommendation';
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
      let percentile = '~25th Percentile';

      if (composite >= 72) {
        score = 5;
        status = 'Extremely Well Qualified';
        badgeColor = 'emerald';
        percentile = 'Top ~10% (90th+ Percentile)';
      } else if (composite >= 59) {
        score = 4;
        status = 'Well Qualified';
        badgeColor = 'blue';
        percentile = '~65th-89th Percentile';
      } else if (composite >= 46) {
        score = 3;
        status = 'Qualified (College Credit Eligible)';
        badgeColor = 'amber';
        percentile = '~42nd-64th Percentile';
      } else if (composite >= 33) {
        score = 2;
        status = 'Possibly Qualified';
        badgeColor = 'rose';
        percentile = '~20th-41st Percentile';
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
        summaryNote: `Your composite score is ${composite.toFixed(1)} / 100. Section I contributed ${mcqWeighted} pts and Section II essays contributed ${frqWeighted} pts.`,
        subscores: [
          { label: 'MCQ Contribution (45%)', value: `${mcqWeighted} pts`, max: 45, percent: Math.round((mcqWeighted / 45) * 100) },
          { label: 'Essays Contribution (55%)', value: `${frqWeighted} pts`, max: 55, percent: Math.round((frqWeighted / 55) * 100) },
          { label: 'Raw Essay Total', value: `${totalFrq} / 18` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '3 Hours 15 Minutes',
      totalQuestions: '45 MCQs + 3 Essays',
      scaleRange: '1 - 5',
      qualifyingScore: '3 or higher',
      nationalAverage: '3.19',
      structureNote: 'Section 1: 45 MCQs in 60 min (45%). Section 2: 3 essays in 2h 15m (55%). Essays are scored on a 6-point analytic scale (1 pt Thesis, 4 pts Evidence/Commentary, 1 pt Sophistication).',
      sections: [
        { name: 'Section I: Multiple Choice', questions: '45 Questions', time: '60 Minutes', weight: '45% of Score' },
        { name: 'Section II: Free Response (3 Essays)', questions: 'Synthesis, Rhetorical, Argument', time: '2h 15m', weight: '55% of Score' }
      ]
    },
    scoreScaleTable: [
      { score: '5', label: 'Extremely Well Qualified', collegeCredit: 'College Composition I & II Exemption', typicalCutoff: '72 – 100 Composite' },
      { score: '4', label: 'Well Qualified', collegeCredit: 'Introductory College Writing Credit', typicalCutoff: '59 – 71 Composite' },
      { score: '3', label: 'Qualified', collegeCredit: 'General English Humanities Credit', typicalCutoff: '46 – 58 Composite' },
      { score: '2', label: 'Possibly Qualified', collegeCredit: 'No College Credit', typicalCutoff: '33 – 45 Composite' },
      { score: '1', label: 'No Recommendation', collegeCredit: 'No Credit Granted', typicalCutoff: '0 – 32 Composite' }
    ],
    formulaExplanation: {
      title: 'AP English Language Scoring Formula',
      steps: [
        'Enter how many of the 45 multiple-choice questions you got correct.',
        'Your MCQ score is counted directly out of 45 because the MCQ section is worth 45% of the exam.',
        'Enter the points you earned on each of the 3 free-response questions. Each FRQ is worth up to 6 points, for a total of 18 points.',
        'Your total FRQ points are converted to a maximum of 55 points because the FRQ section is worth 55% of the exam.',
        'We add your MCQ and FRQ scores together to get your estimated Composite Score out of 100.',
        'Finally, your Composite Score is matched with our estimated score ranges to give you a possible AP Lang score from 1 to 5.'
      ],
      rawToScaledNotes: 'Each essay uses a 0-6 analytic rubric: Row A Thesis (0-1), Row B Evidence & Commentary (0-4), Row C Sophistication (0-1).'
    },
    faqs: [
  {
    question: 'What is a good AP Lang score?',
    answer:
      'A score of 4 or 5 is generally considered a strong AP Lang score. In 2025, 74.3% of students scored 3 or higher, while 41.4% earned a 4 or 5. However, the score needed for college credit or placement depends on the college.'
  },
  {
    question: 'How many questions are on the AP English Language exam?',
    answer:
      'The 2027 AP English Language exam has 45 multiple-choice questions and 3 free-response questions. The multiple-choice section is worth 45% and the free-response section is worth 55% of the exam.'
  },
  {
    question: 'How much is the AP Lang multiple-choice section worth?',
    answer:
      'The multiple-choice section is worth 45% of the total AP English Language exam score and contains 45 questions.'
  },
  {
    question: 'How much is the AP Lang free-response section worth?',
    answer:
      'The free-response section is worth 55% of the total exam score. It includes 3 essays and gives you 2 hours and 15 minutes to complete the section.'
  },
  {
    question: 'How long is the AP English Language exam?',
    answer:
      'The AP English Language exam takes 3 hours and 15 minutes in total. You get 1 hour for the multiple-choice section and 2 hours and 15 minutes for the free-response section.'
  },
  {
    question: 'Is there a penalty for wrong answers on AP Lang multiple choice?',
    answer:
      'No. There is no penalty for incorrect multiple-choice answers, so it is better to answer every question rather than leave questions blank.'
  },
  {
    question: 'Is AP English Language digital in 2027?',
    answer:
      'Yes. The 2027 AP English Language and Composition exam is administered digitally using the Bluebook testing app.'
  },
  {
    question: 'Can you get college credit with a 3 on AP Lang?',
    answer:
      'Yes, some colleges award credit or placement for a 3 on AP Lang, but others require a 4 or 5. Check the AP credit policy of the college you plan to attend.'
  }
],
    relatedCalculatorIds: ['ap-english-literature', 'ap-us-history', 'sat', 'act'],
    isPopular: true
  },
  {
    id: 'ap-english-literature',
    title: 'AP Lit Score Calculator',
    shortName: 'AP English Literature',
    category: 'ap',
    categoryLabel: 'AP Exams',
    yearFormat: '2027 AP Exam Structure',
    seoTitle: 'AP Lit Score Calculator 2027: Predict Your Score',
    metaDescription: 'Free AP Lit Score Calculator 2027 to estimate your AP English Literature score. Enter your MCQ and FRQ scores to get an estimated 1–5 score.',
    overview: 'Estimate your AP English Literature score from 1–5 using the 2027 exam format: 55 MCQs (45%) and 3 FRQs (55%). Enter your scores to get an estimated Composite Score out of 100.',
    fields: [
      {
        id: 'mcq',
        label: 'Section I: Multiple Choice Questions (Poetry & Prose Passages)',
        sublabel: '55 questions (60 minutes, 45% of exam score)',
        min: 0,
        max: 55,
        defaultValue: 40,
        unit: '/ 55'
      },
      {
        id: 'frq_poetry',
        label: 'Section II Question 1: Poetry Analysis Essay',
        sublabel: '6 points analytic rubric (Thesis, Evidence/Commentary, Sophistication)',
        min: 0,
        max: 6,
        defaultValue: 4,
        unit: '/ 6'
      },
      {
        id: 'frq_prose',
        label: 'Section II Question 2: Prose Fiction Analysis Essay',
        sublabel: '6 points analytic rubric (analyzing literary devices in fiction)',
        min: 0,
        max: 6,
        defaultValue: 4,
        unit: '/ 6'
      },
      {
        id: 'frq_literary_argument',
        label: 'Section II Question 3: Literary Argument Essay',
        sublabel: '6 points analytic rubric (analyzing a chosen work of literary merit)',
        min: 0,
        max: 6,
        defaultValue: 4,
        unit: '/ 6'
      }
    ],
    calculate: (inputs) => {
      const mcq = Math.min(55, Math.max(0, inputs.mcq || 0));
      const frq1 = Math.min(6, Math.max(0, inputs.frq_poetry || 0));
      const frq2 = Math.min(6, Math.max(0, inputs.frq_prose || 0));
      const frq3 = Math.min(6, Math.max(0, inputs.frq_literary_argument || 0));
      const totalFrq = frq1 + frq2 + frq3;

      // Section 1: 55 MCQs = 45% of 100
      const mcqWeighted = (mcq / 55) * 45;
      // Section 2: 18 raw points = 55% of 100
      const frqWeighted = (totalFrq / 18) * 55;
      const composite = Math.round((mcqWeighted + frqWeighted) * 10) / 10;

      let score = 1;
      let status = 'No Recommendation';
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
      let percentile = '~25th Percentile';

      if (composite >= 71) {
        score = 5;
        status = 'Extremely Well Qualified';
        badgeColor = 'emerald';
        percentile = 'Top ~15% (85th+ Percentile)';
      } else if (composite >= 58) {
        score = 4;
        status = 'Well Qualified';
        badgeColor = 'blue';
        percentile = '~62nd-84th Percentile';
      } else if (composite >= 45) {
        score = 3;
        status = 'Qualified (College Credit Eligible)';
        badgeColor = 'amber';
        percentile = '~40th-61st Percentile';
      } else if (composite >= 32) {
        score = 2;
        status = 'Possibly Qualified';
        badgeColor = 'rose';
        percentile = '~20th-39th Percentile';
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
        summaryNote: `Your composite score is ${composite.toFixed(1)} / 100. Scoring 71+ earns an AP 5.`,
        subscores: [
          { label: 'MCQ Weighted (45%)', value: `${mcqWeighted.toFixed(1)} pts`, max: 45, percent: Math.round((mcqWeighted / 45) * 100) },
          { label: 'Essays Weighted (55%)', value: `${frqWeighted.toFixed(1)} pts`, max: 55, percent: Math.round((frqWeighted / 55) * 100) },
          { label: 'Total Raw Essay Points', value: `${totalFrq} / 18` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '3 Hours',
      totalQuestions: '55 MCQs + 3 Essays',
      scaleRange: '1 - 5',
      qualifyingScore: '3 or higher',
      nationalAverage: '3.24',
      structureNote: 'Section 1: 55 MCQs in 60 min (45%). Section 2: 3 essays in 2 hours (55%): Poetry Analysis, Prose Fiction Analysis, Literary Argument.',
      sections: [
        { name: 'Section I: Multiple Choice', questions: '55 Questions', time: '60 Minutes', weight: '45% of Score' },
        { name: 'Section II: Free Response (3 Essays)', questions: 'Poetry, Prose, Literary Argument', time: '120 Minutes', weight: '55% of Score' }
      ]
    },
    scoreScaleTable: [
      { score: '5', label: 'Extremely Well Qualified', collegeCredit: 'Introductory English Literature Credit', typicalCutoff: '71 – 100 Composite' },
      { score: '4', label: 'Well Qualified', collegeCredit: 'College English Literature / Humanities Credit', typicalCutoff: '58 – 70 Composite' },
      { score: '3', label: 'Qualified', collegeCredit: 'General Humanities Elective Credit', typicalCutoff: '45 – 57 Composite' },
      { score: '2', label: 'Possibly Qualified', collegeCredit: 'No College Credit', typicalCutoff: '32 – 44 Composite' },
      { score: '1', label: 'No Recommendation', collegeCredit: 'No Credit Granted', typicalCutoff: '0 – 31 Composite' }
    ],
    formulaExplanation: {
      title: 'AP English Literature Scoring Methodology',
      steps: [
        'Enter how many of the 55 multiple-choice questions you got correct.',
        'Your MCQ score is converted to 45 points because the multiple-choice section is worth 45% of the exam.',
        'Enter the points you earned on each of the 3 free-response questions. Each FRQ is worth up to 6 points, for a total of 18 raw points.',
        'Your total FRQ points are converted to 55 points because the free-response section is worth 55% of the exam.',
        'We add your MCQ and FRQ weighted scores to get your estimated Composite Score out of 100.',
        'Finally, your Composite Score is compared with our estimated score ranges to give you a possible AP English Literature score from 1 to 5.'
      ],
      rawToScaledNotes: 'MCQs count for 45% and FRQs count for 55%. Your final score is shown out of 100.'
    },
    faqs: [
  {
    question: 'What is a good AP English Literature score?',
    answer:
      'A 4 or 5 is generally a strong score on AP Lit. The score needed for college credit depends on the college.'
  },
  {
    question: 'How many questions are on the AP English Literature exam?',
    answer:
      'There are 55 multiple-choice questions and 3 free-response questions on the AP Lit exam.'
  },
  {
    question: 'How many points is each AP Lit FRQ worth?',
    answer:
      'Each FRQ is worth up to 6 points, so you can earn a maximum of 18 raw points across all three essays.'
  },
  {
    question: 'How long is the AP English Literature exam?',
    answer:
      'The exam is 3 hours long. You get 1 hour for multiple choice and 2 hours for the three free-response questions.'
  },
  {
    question: 'Is there a penalty for wrong answers on AP Lit multiple choice?',
    answer:
      'No. Wrong answers do not cost you points, so try to answer every multiple-choice question.'
  }
],
    relatedCalculatorIds: ['ap-english-language', 'ap-world-history', 'ap-us-history']
  }
];
