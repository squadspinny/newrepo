import { CalculatorConfig } from '../../types';
import { apChemistrySeoArticle } from '../seo/apChemistrySeo';
import { apBiologySeoArticle } from '../seo/apBiologySeo';
import { apCsaSeoArticle } from '../seo/apCsaSeo';
import { apesSeoArticle } from '../seo/apesSeo';

export const apCalculators: CalculatorConfig[] = [
  {
    id: 'ap-chemistry',
    title: 'AP Chemistry Score Calculator',
    shortName: 'AP Chemistry',
    category: 'ap',
    categoryLabel: 'AP Exams',
    yearFormat: '2027 AP Exam Structure',
    seoTitle: 'AP Chemistry Score Calculator 2027: Predict Your AP Score',
    metaDescription: 'Free AP Chemistry Score Calculator: enter your MCQ & FRQ points to predict your 1–5 score. No sign-up. Try it now!',
    overview: 'The AP Chemistry exam has 60 MCQs and 7 FRQs, with each section carrying 50% of the total score. Enter your scores to estimate your AP score from 1 to 5 using our 2027 scoring ranges.',
    fields: [
      {
        id: 'mcq',
        label: 'Section I: Multiple-Choice Questions (MCQ)',
        sublabel: '60 individual questions (1 point each)',
        min: 0,
        max: 60,
        defaultValue: 45,
        unit: '/ 60'
      },
      {
        id: 'frq_long_1',
        label: 'Long FRQ 1',
        sublabel: '',
        min: 0,
        max: 10,
        defaultValue: 7,
        group: 'Section II: Long Free-Response Questions',
        groupTotalMax: 30,
        groupTotalLabel: 'Long FRQ Total'
      },
      {
        id: 'frq_long_2',
        label: 'Long FRQ 2',
        sublabel: '',
        min: 0,
        max: 10,
        defaultValue: 7,
        group: 'Section II: Long Free-Response Questions',
        groupTotalMax: 30,
        groupTotalLabel: 'Long FRQ Total'
      },
      {
        id: 'frq_long_3',
        label: 'Long FRQ 3',
        sublabel: '',
        min: 0,
        max: 10,
        defaultValue: 7,
        group: 'Section II: Long Free-Response Questions',
        groupTotalMax: 30,
        groupTotalLabel: 'Long FRQ Total'
      },
      {
        id: 'frq_short_1',
        label: 'Short FRQ 1',
        sublabel: '0–4 points',
        min: 0,
        max: 4,
        defaultValue: 3,
        group: 'Section II: Short Free-Response Questions',
        groupTotalMax: 16,
        groupTotalLabel: 'Short FRQ Total'
      },
      {
        id: 'frq_short_2',
        label: 'Short FRQ 2',
        sublabel: '0–4 points',
        min: 0,
        max: 4,
        defaultValue: 3,
        group: 'Section II: Short Free-Response Questions',
        groupTotalMax: 16,
        groupTotalLabel: 'Short FRQ Total'
      },
      {
        id: 'frq_short_3',
        label: 'Short FRQ 3',
        sublabel: '0–4 points',
        min: 0,
        max: 4,
        defaultValue: 3,
        group: 'Section II: Short Free-Response Questions',
        groupTotalMax: 16,
        groupTotalLabel: 'Short FRQ Total'
      },
      {
        id: 'frq_short_4',
        label: 'Short FRQ 4',
        sublabel: '0–4 points',
        min: 0,
        max: 4,
        defaultValue: 2,
        group: 'Section II: Short Free-Response Questions',
        groupTotalMax: 16,
        groupTotalLabel: 'Short FRQ Total'
      }
    ],
    calculate: (inputs) => {
      const mcq = Math.min(60, Math.max(0, inputs.mcq || 0));
      const frqLong = inputs.frq_long_1 !== undefined
        ? Math.min(30, Math.max(0, (inputs.frq_long_1 || 0) + (inputs.frq_long_2 || 0) + (inputs.frq_long_3 || 0)))
        : Math.min(30, Math.max(0, inputs.frq_long || 0));
      const frqShort = inputs.frq_short_1 !== undefined
        ? Math.min(16, Math.max(0, (inputs.frq_short_1 || 0) + (inputs.frq_short_2 || 0) + (inputs.frq_short_3 || 0) + (inputs.frq_short_4 || 0)))
        : Math.min(16, Math.max(0, inputs.frq_short || 0));
      const totalFrqRaw = frqLong + frqShort;

      // Section 1: 50% = (mcq / 60) * 50
      const mcqWeighted = (mcq / 60) * 50;
      // Section 2: 50% = (totalFrqRaw / 46) * 50
      const frqWeighted = (totalFrqRaw / 46) * 50;
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
      } else if (composite >= 57) {
        score = 4;
        status = 'Well Qualified';
        badgeColor = 'blue';
        percentile = '~65th-84th Percentile';
      } else if (composite >= 42) {
        score = 3;
        status = 'Qualified (College Credit Eligible)';
        badgeColor = 'amber';
        percentile = '~45th-64th Percentile';
      } else if (composite >= 27) {
        score = 2;
        status = 'Possibly Qualified';
        badgeColor = 'rose';
        percentile = '~20th-44th Percentile';
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
        summaryNote: `Your estimated composite score is ${composite.toFixed(1)} / 100. The score ranges used by this calculator are estimates and are not official College Board cutoffs.`,
        subscores: [
          { label: 'MCQ Weighted Contribution', value: `${mcqWeighted.toFixed(1)} pts`, max: 50, percent: Math.round((mcqWeighted / 50) * 100) },
          { label: 'FRQ Weighted Contribution', value: `${frqWeighted.toFixed(1)} pts`, max: 50, percent: Math.round((frqWeighted / 50) * 100) },
          { label: 'Raw Section I Correct', value: `${mcq} / 60` },
          { label: 'Raw Section II Points', value: `${totalFrqRaw} / 46` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '3 Hours 15 Minutes',
      totalQuestions: '60 MCQs + 7 FRQs',
      scaleRange: '1 - 5',
      qualifyingScore: '3 or higher',
      nationalAverage: '3.36',
      structureNote: '50% Multiple Choice (90 min) & 50% Free Response (105 min). Scientific/graphing calculator permitted on both sections.',
      sections: [
        { name: 'Section I: Multiple Choice', questions: '60 Questions', time: '90 Minutes', weight: '50% of Total' },
        { name: 'Section II: Free Response', questions: '3 Long (10 pts) + 4 Short (4 pts)', time: '105 Minutes', weight: '50% of Total' }
      ]
    },
    scoreScaleTable: [
      { score: '5', label: 'Extremely well qualified', collegeCredit: 'Full Credit / Advanced Placement', typicalCutoff: '71 – 100' },
      { score: '4', label: 'Very well qualified', collegeCredit: 'Course Credit at Most Universities', typicalCutoff: '57 – 70' },
      { score: '3', label: 'Qualified', collegeCredit: 'Credit at State & Public Colleges', typicalCutoff: '42 – 56' },
      { score: '2', label: 'Possibly qualified', collegeCredit: 'Rarely Eligible for Credit', typicalCutoff: '27 – 41' },
      { score: '1', label: 'No recommendation', collegeCredit: 'No Credit Granted', typicalCutoff: '0 – 26' }
    ],
    formulaExplanation: {
      title: 'AP Chemistry Scoring Formula',
      steps: [
        'Calculate the MCQ contribution: Convert your Section I score out of 60 into a weighted score out of 50.',
        'Add your FRQ points: Combine the points earned on all 7 free-response questions — 3 long FRQs (up to 30 points) and 4 short FRQs (up to 16 points) — for a maximum of 46 raw FRQ points.',
        'Calculate the FRQ contribution: Convert your Section II score out of 46 into a weighted score out of 50.',
        'Calculate the composite score: Add the weighted MCQ and FRQ scores to get an estimated composite score out of 100.',
        "Estimate your AP score: Compare your composite score with the calculator's estimated AP Chemistry score ranges to predict an AP score from 1 to 5."
      ],
      rawToScaledNotes: 'There is no penalty for incorrect answers on multiple-choice questions, so answer every question.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Top Tier / Ivy League / STEM Majors', scoreNeeded: '5 (71+ Composite)', recommendation: 'Aim for 48+ MCQs and 34+ FRQ points.' },
        { target: 'Competitive University Credit', scoreNeeded: '4 (57–70 Composite)', recommendation: 'Aim for 40+ MCQs and 26+ FRQ points.' },
        { target: 'General College Credit', scoreNeeded: '3 (42–56 Composite)', recommendation: 'Aim for 32+ MCQs and 18+ FRQ points.' }
      ],
      strategicAdvice: 'Focus on the major AP Chemistry topics, practice both multiple-choice and free-response questions, and review areas where you lose the most points.'
    },
    faqs: [
      {
        question: 'Is 4 a Good AP Chem Score?',
        answer: 'Yes, a score of 4 on the grading scale falls into the "Well Qualified" category, and most colleges accept it; if the AP Chem score calculator estimates a 4 for you, you are very close to being a top-level performer.'
      },
      {
        question: 'How is AP Chem Score Calculated?',
        answer: 'Your AP Chem score is calculated by combining your MCQ and FRQ performance, with each section contributing 50% to the composite score. Your final composite score is then compared with estimated AP Chem score cutoffs to predict an AP score from 1 to 5. These cutoffs are estimates and may vary from year to year.'
      },
      {
        question: 'How Many Students Get a 5 on AP Chem?',
        answer: 'According to the 2026 AP Chemistry score distribution, only 15% of students scored a 5.'
      },
      {
        question: 'How Many Questions Are on AP Chemistry?',
        answer: 'The MCQ section of the AP Chemistry exam consists of a total of 60 questions, while the FRQ section contains 7 questions (3 long-answer and 4 short-answer). The AP Chem score calculator uses this exact combination to determine the final composite score.'
      }
    ],
    seoArticle: apChemistrySeoArticle,
    relatedCalculatorIds: ['ap-biology', 'ap-physics', 'ap-calculus-bc', 'ap-statistics'],
    isPopular: true
  },
  {
    id: 'ap-biology',
    title: 'AP Biology Score Calculator',
    shortName: 'AP Biology',
    category: 'ap',
    categoryLabel: 'AP Exams',
    yearFormat: '2027 AP Exam Structure',
    seoTitle: 'AP Biology Score Calculator 2027: Calculate Your Score',
    metaDescription: 'Free AP Biology Score Calculator: enter your MCQ & FRQ points to estimate your 1–5 AP Score. No sign-up. Try it now!',
    overview: 'Calculate your AP Biology score using the 2027 exam structure. Enter your MCQ and FRQ scores to get an AP score from 1 to 5.',
    fields: [
      {
        id: 'mcq',
        label: 'Section I: Multiple-Choice Questions (MCQ)',
        sublabel: '',
        min: 0,
        max: 60,
        defaultValue: 46,
        unit: '/ 60'
      },
      {
        id: 'frq_1',
        label: 'Long FRQ 1',
        sublabel: '0–9 points',
        min: 0,
        max: 9,
        defaultValue: 7,
        group: 'Section II: Long Free-Response Questions',
        groupTotalMax: 18,
        groupTotalLabel: 'Long FRQ Total'
      },
      {
        id: 'frq_2',
        label: 'Long FRQ 2',
        sublabel: '0–9 points',
        min: 0,
        max: 9,
        defaultValue: 7,
        group: 'Section II: Long Free-Response Questions',
        groupTotalMax: 18,
        groupTotalLabel: 'Long FRQ Total'
      },
      {
        id: 'frq_3',
        label: 'Short FRQ 3',
        sublabel: '0–4 points',
        min: 0,
        max: 4,
        defaultValue: 3,
        group: 'Section II: Short Free-Response Questions',
        groupTotalMax: 16,
        groupTotalLabel: 'Short FRQ Total'
      },
      {
        id: 'frq_4',
        label: 'Short FRQ 4',
        sublabel: '0–4 points',
        min: 0,
        max: 4,
        defaultValue: 3,
        group: 'Section II: Short Free-Response Questions',
        groupTotalMax: 16,
        groupTotalLabel: 'Short FRQ Total'
      },
      {
        id: 'frq_5',
        label: 'Short FRQ 5',
        sublabel: '0–4 points',
        min: 0,
        max: 4,
        defaultValue: 3,
        group: 'Section II: Short Free-Response Questions',
        groupTotalMax: 16,
        groupTotalLabel: 'Short FRQ Total'
      },
      {
        id: 'frq_6',
        label: 'Short FRQ 6',
        sublabel: '0–4 points',
        min: 0,
        max: 4,
        defaultValue: 2,
        group: 'Section II: Short Free-Response Questions',
        groupTotalMax: 16,
        groupTotalLabel: 'Short FRQ Total'
      }
    ],
    calculate: (inputs) => {
      const mcq = Math.min(60, Math.max(0, inputs.mcq || 0));
      const frqLong = inputs.frq_1 !== undefined
        ? Math.min(18, Math.max(0, (inputs.frq_1 || 0) + (inputs.frq_2 || 0)))
        : Math.min(18, Math.max(0, inputs.frq_long || 0));
      const frqShort = inputs.frq_3 !== undefined
        ? Math.min(16, Math.max(0, (inputs.frq_3 || 0) + (inputs.frq_4 || 0) + (inputs.frq_5 || 0) + (inputs.frq_6 || 0)))
        : Math.min(16, Math.max(0, inputs.frq_short || 0));
      const totalFrqRaw = frqLong + frqShort;

      const mcqWeighted = (mcq / 60) * 50;
      const frqWeighted = (totalFrqRaw / 34) * 50;
      const composite = Math.round((mcqWeighted + frqWeighted) * 10) / 10;

      let score = 1;
      let status = 'No Recommendation';
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
      let percentile = '~25th Percentile';

      if (composite >= 74) {
        score = 5;
        status = 'Extremely Well Qualified';
        badgeColor = 'emerald';
        percentile = 'Top ~14% (86th+ Percentile)';
      } else if (composite >= 59) {
        score = 4;
        status = 'Well Qualified';
        badgeColor = 'blue';
        percentile = '~65th-85th Percentile';
      } else if (composite >= 45) {
        score = 3;
        status = 'Qualified (College Credit Eligible)';
        badgeColor = 'amber';
        percentile = '~40th-64th Percentile';
      } else if (composite >= 32) {
        score = 2;
        status = 'Possibly Qualified';
        badgeColor = 'rose';
        percentile = '~18th-39th Percentile';
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
        summaryNote: `Your composite score is ${composite.toFixed(1)} / 100. Section 1 contributed ${mcqWeighted.toFixed(1)} pts and Section 2 contributed ${frqWeighted.toFixed(1)} pts.`,
        subscores: [
          { label: 'MCQ Weighted Contribution', value: `${mcqWeighted.toFixed(1)} pts`, max: 50, percent: Math.round((mcqWeighted / 50) * 100) },
          { label: 'FRQ Weighted Contribution', value: `${frqWeighted.toFixed(1)} pts`, max: 50, percent: Math.round((frqWeighted / 50) * 100) },
          { label: 'Raw Section I Correct', value: `${mcq} / 60` },
          { label: 'Raw Section II Points', value: `${totalFrqRaw} / 34` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '3 Hours',
      totalQuestions: '60 MCQs + 6 FRQs',
      scaleRange: '1 - 5',
      qualifyingScore: '3 or higher',
      nationalAverage: '3.24',
      structureNote: 'Section I (90 min) 60 MCQs (50%). Section II (90 min) 2 long and 4 short FRQs (50%). A 4-function, scientific, or graphing calculator is allowed on both sections.',
      sections: [
        { name: 'Section I: Multiple Choice', questions: '60 Questions', time: '90 Minutes', weight: '50% of Score' },
        { name: 'Section II: Free Response', questions: '2 Long + 4 Short FRQs', time: '90 Minutes', weight: '50% of Score' }
      ]
    },
    scoreScaleTable: [
      { score: '5', label: 'Extremely Well Qualified', collegeCredit: 'Full Introductory Biology Sequence Credit', typicalCutoff: '74 – 100 Composite' },
      { score: '4', label: 'Well Qualified', collegeCredit: 'Single Semester Biology Credit', typicalCutoff: '59 – 73 Composite' },
      { score: '3', label: 'Qualified', collegeCredit: 'General Science Elective Credit', typicalCutoff: '45 – 58 Composite' },
      { score: '2', label: 'Possibly Qualified', collegeCredit: 'No College Credit', typicalCutoff: '30 – 44 Composite' },
      { score: '1', label: 'No Recommendation', collegeCredit: 'No College Credit', typicalCutoff: '0 – 29 Composite' }
    ],
    formulaExplanation: {
      title: 'AP Biology Scoring Calculation',
      steps: [
        'Calculate the Section I score: (MCQs Correct / 60) × 50.',
        'Calculate the Section II score: (Total FRQ Raw Points / 34) × 50.',
        'Add both section scores to get your estimated Composite Score out of 100.',
        'Compare your Composite Score with the estimated AP Biology score ranges to get an estimated AP score from 1 to 5.'
      ],
      rawToScaledNotes: 'There is no penalty for incorrect answers on the multiple-choice section, so try to answer every question'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Pre-Med / Biology Major Placement', scoreNeeded: '5 (74+ Composite)', recommendation: 'Score 48+ on MCQs and 26+ on FRQs.' },
        { target: 'Standard University Credit', scoreNeeded: '4 (59+ Composite)', recommendation: 'Score 40+ on MCQs and 21+ on FRQs.' },
        { target: 'Passing Mark', scoreNeeded: '3 (45+ Composite)', recommendation: 'Score 32+ on MCQs and 16+ on FRQs.' }
      ],
      strategicAdvice: 'Practice experimental design questions (FRQ 1 & 2) which carry significant point weight and require null hypothesis formulations.'
    },
    faqs: [
      {
        question: 'Is 4 a Good AP Bio Score?',
        answer: 'Yes, a score of 4 is considered “Very well qualified” on the AP grading scale. Many colleges accept a 4 for credit or placement, although requirements vary by colleges. If the AP Bio Score Calculator gives you a 4, that means you’re performing at a strong level.'
      },
      {
        question: 'How is AP Bio Score Calculated?',
        answer: 'Your AP Bio score is calculated by combining your MCQ and FRQ performance, with each section contributing 50% to the composite score. The calculator then compares your composite score with the score ranges used for the 1–5 scale to give you an AP score. These ranges are estimates and may vary from year to year.'
      },
      {
        question: 'How Many Students Get a 5 on AP Bio?',
        answer: 'According to the 2026 AP Biology score distribution, 15% of students scored a 5.'
      },
      {
        question: 'How Many Questions Are on AP Biology?',
        answer: 'The MCQ section of the AP Biology exam has 60 questions, while the FRQ section has 6 questions (2 long-answer and 4 short-answer). The AP Bio Score Calculator uses your performance across both sections to calculate your composite score.'
      }
    ],
    seoArticle: apBiologySeoArticle,
    relatedCalculatorIds: ['ap-chemistry', 'ap-environmental-science', 'ap-psychology', 'mcat'],
    isPopular: true
  },
  {
  id: 'ap-physics',
  title: 'AP Physics 1 Score Calculator',
  shortName: 'AP Physics 1',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 AP Exam Structure',

  seoTitle: 'AP Physics 1 Score Calculator 2027: Predict Your Score',

  metaDescription:
    'Free AP Physics 1 Score Calculator – Estimate your 1–5 AP score from raw points using estimated scoring ranges. Updated for the 2027 AP Physics 1 exam.',

  overview:
    'AP Physics 1 has 42 multiple-choice questions worth 50% and 4 free-response questions worth the other 50%. Enter your scores to get an estimate of your AP score.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I: Multiple-Choice Questions (MCQ)',
      sublabel: '42 multiple-choice questions',
      min: 0,
      max: 42,
      defaultValue: 29,
      unit: '/ 42'
    },
    {
      id: 'frq_1',
      label: 'FRQ 1: Mathematical Routines',
      sublabel: '10 points maximum',
      min: 0,
      max: 10,
      defaultValue: 7,
      unit: '/ 10'
    },
    {
      id: 'frq_2',
      label: 'FRQ 2: Translation Between Representations',
      sublabel: '12 points maximum',
      min: 0,
      max: 12,
      defaultValue: 8,
      unit: '/ 12'
    },
    {
      id: 'frq_3',
      label: 'FRQ 3: Experimental Design and Analysis',
      sublabel: '10 points maximum',
      min: 0,
      max: 10,
      defaultValue: 6,
      unit: '/ 10'
    },
    {
      id: 'frq_4',
      label: 'FRQ 4: Qualitative/Quantitative Translation',
      sublabel: '8 points maximum',
      min: 0,
      max: 8,
      defaultValue: 5,
      unit: '/ 8'
    }
  ],

  calculate: (inputs) => {
    const mcq = Math.min(42, Math.max(0, inputs.mcq || 0));

    const frq1 = Math.min(10, Math.max(0, inputs.frq_1 || 0));
    const frq2 = Math.min(12, Math.max(0, inputs.frq_2 || 0));
    const frq3 = Math.min(10, Math.max(0, inputs.frq_3 || 0));
    const frq4 = Math.min(8, Math.max(0, inputs.frq_4 || 0));

    const frq = frq1 + frq2 + frq3 + frq4;

    // Section I = 50%
    const mcqWeighted = (mcq / 42) * 50;

    // Section II = 50%
    const frqWeighted = (frq / 40) * 50;

    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
    let percentile = '~25th Percentile';

    if (composite >= 72) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Top ~9% (91st+ Percentile)';
    } else if (composite >= 57) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = '~68th-90th Percentile';
    } else if (composite >= 43) {
      score = 3;
      status = 'Qualified (College Credit Eligible)';
      badgeColor = 'amber';
      percentile = '~44th-67th Percentile';
    } else if (composite >= 29) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = '~22nd-43rd Percentile';
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
        `Your composite score is ${composite.toFixed(1)} / 100. Both Section I and Section II contribute equally at 50% each.`,

      subscores: [
        {
          label: 'MCQ Contribution',
          value: `${mcqWeighted.toFixed(1)} pts`,
          max: 50,
          percent: Math.round((mcqWeighted / 50) * 100)
        },
        {
          label: 'FRQ Contribution',
          value: `${frqWeighted.toFixed(1)} pts`,
          max: 50,
          percent: Math.round((frqWeighted / 50) * 100)
        },
        {
          label: 'Raw Multiple Choice Correct',
          value: `${mcq} / 42`
        },
        {
          label: 'Raw Free Response Total',
          value: `${frq} / 40`
        }
      ]
    };
  },

  examSpecs: {
    totalDuration: '3 Hours',
    totalQuestions: '42 MCQs + 4 FRQs',
    scaleRange: '1 - 5',
    qualifyingScore: '3 or higher',

    // Latest published mean score available
    nationalAverage: '3.12',

    structureNote:
      '42 MCQs in 85 minutes (50%) + 4 FRQs in 95 minutes (50%). The 2027 exam is administered as a hybrid digital exam.',

    sections: [
      {
        name: 'Section I: Multiple Choice',
        questions: '42 Questions',
        time: '85 Minutes',
        weight: '50% of Total'
      },
      {
        name: 'Section II: Free Response',
        questions: '4 Questions (40 pts)',
        time: '95 Minutes',
        weight: '50% of Total'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'Full Physics Credit & Placement',
      typicalCutoff: '72 – 100 Composite'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'Introductory Physics Credit',
      typicalCutoff: '57 – 71.9 Composite'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'College Credit May Be Available',
      typicalCutoff: '43 – 56.9 Composite'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'Usually No College Credit',
      typicalCutoff: '29 – 42.9 Composite'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'No College Credit',
      typicalCutoff: '0 – 28.9 Composite'
    }
  ],

  formulaExplanation: {
    title: 'AP Physics 1 Scoring Breakdown',

    steps: [
      'First, your multiple-choice score is converted into its 50% share of the exam using (MCQs / 42) × 50.',
      'Next, the scores from all four FRQs are added together to find your total free-response score out of 40 points.',
      'Your total FRQ score is then converted into its 50% share using (Total FRQ Points / 40) × 50.',
      'The weighted MCQ and FRQ scores are added together to give your estimated composite score out of 100.',
      'Finally, your composite score is compared with the estimated AP score ranges to give you an estimated score from 1 to 5.'
    ],

    rawToScaledNotes:
      'This calculator gives an estimated AP score based on your entered scores. Your actual AP score is calculated and officially reported by the College Board.'
  },

  scoreInterpretation: {
    targetRanges: [
      {
        target: 'Engineering / Physics Majors',
        scoreNeeded: '5 (72+ Composite)',
        recommendation: 'Aim for strong performance in both MCQs and FRQs.'
      },
      {
        target: 'STEM General Credit',
        scoreNeeded: '4 (57+ Composite)',
        recommendation: 'Build a solid score across both sections.'
      },
      {
        target: 'Passing Mark',
        scoreNeeded: '3 (43+ Composite)',
        recommendation: 'Focus on improving both MCQs and FRQ points.'
      }
    ],

    strategicAdvice:
      'Practice each problem step by step, and show your reasoning clearly in the FRQs.'
  },

  faqs: [
     {
      question: 'What score do you need to pass AP Physics 1?',
      answer:
        'There is no universal AP score that guarantees college credit. Many colleges may award credit or placement for a score of 3 or higher, while some institutions require a 4 or 5. Always check the AP credit policy of the college or university you are considering.'
    },
    {
      question: 'How many multiple-choice questions are on the 2027 AP Physics 1 exam?',
      answer:
        'The 2027 AP Physics 1 exam has 42 multiple-choice questions. Section I is 85 minutes and accounts for 50% of the exam score.'
    },
    {
      question: 'How many free-response questions are on AP Physics 1?',
      answer:
        'There are 4 free-response questions. They are worth 40 points in total and make up 50% of the exam score.'
    },
    {
      question: 'Is a calculator allowed on AP Physics 1?',
      answer:
        'Yes. Four-function, scientific, and graphing calculators are allowed on AP Physics 1. A calculator is also available through Bluebook.'
    }
  ],

  relatedCalculatorIds: [
    'ap-calculus-ab',
    'ap-calculus-bc',
    'ap-chemistry',
    'sat'
  ],

  isPopular: true
},
  { 
    id: 'ap-calculus-ab', 
    title: 'AP Calculus AB Score Calculator', 
    shortName: 'AP Calculus AB', 
    category: 'ap', 
    categoryLabel: 'AP Exams', 
    yearFormat: '2027 AP Exam Structure', 
    seoTitle: 'AP Calculus AB Score Calculator 2027: Calculate Your AP Score', 
    metaDescription: 'Free AP Calculus AB Score Calculator: enter your MCQ & FRQ points to predict your 1–5 score instantly. No sign-up. Try it now!', 
    overview: 'The AP Calculus AB exam has 42 multiple-choice questions and 6 free-response questions, with each section worth 50% of the exam score. Enter your scores in our calculator to get an estimate of your AP score from 1 to 5.', 

    fields: [ 
      { 
        id: 'mcq_a', 
        label: 'Section I Part A: Multiple Choice (No Calculator)', 
        sublabel: '29 questions (62 minutes)', 
        min: 0, 
        max: 29, 
        defaultValue: 22, 
        unit: '/ 29' 
      }, 
      { 
        id: 'mcq_b', 
        label: 'Section I Part B: Multiple Choice (Calculator Required)', 
        sublabel: '13 questions (38 minutes)', 
        min: 0, 
        max: 13, 
        defaultValue: 10, 
        unit: '/ 13' 
      }, 
      { 
        id: 'frq_1', 
        label: 'Section II Part A: Free Response 1 (Calculator Required)', 
        sublabel: '9 points maximum', 
        min: 0, 
        max: 9, 
        defaultValue: 7, 
        unit: '/ 9' 
      }, 
      { 
        id: 'frq_2', 
        label: 'Section II Part A: Free Response 2 (Calculator Required)', 
        sublabel: '9 points maximum', 
        min: 0, 
        max: 9, 
        defaultValue: 7, 
        unit: '/ 9' 
      }, 
      { 
        id: 'frq_3', 
        label: 'Section II Part B: Free Response 3 (No Calculator)', 
        sublabel: '9 points maximum', 
        min: 0, 
        max: 9, 
        defaultValue: 6, 
        unit: '/ 9' 
      }, 
      { 
        id: 'frq_4', 
        label: 'Section II Part B: Free Response 4 (No Calculator)', 
        sublabel: '9 points maximum', 
        min: 0, 
        max: 9, 
        defaultValue: 6, 
        unit: '/ 9' 
      }, 
      { 
        id: 'frq_5', 
        label: 'Section II Part B: Free Response 5 (No Calculator)', 
        sublabel: '9 points maximum', 
        min: 0, 
        max: 9, 
        defaultValue: 6, 
        unit: '/ 9' 
      }, 
      { 
        id: 'frq_6', 
        label: 'Section II Part B: Free Response 6 (No Calculator)', 
        sublabel: '9 points maximum', 
        min: 0, 
        max: 9, 
        defaultValue: 6, 
        unit: '/ 9' 
      } 
    ], 

    calculate: (inputs) => { 
      // Section I - Multiple Choice
      const mcqA = Math.min(29, Math.max(0, inputs.mcq_a || 0)); 
      const mcqB = Math.min(13, Math.max(0, inputs.mcq_b || 0)); 
      const totalMcq = mcqA + mcqB; 

      // Section II - Free Response
      const frq1 = Math.min(9, Math.max(0, inputs.frq_1 || 0)); 
      const frq2 = Math.min(9, Math.max(0, inputs.frq_2 || 0)); 
      const frq3 = Math.min(9, Math.max(0, inputs.frq_3 || 0)); 
      const frq4 = Math.min(9, Math.max(0, inputs.frq_4 || 0)); 
      const frq5 = Math.min(9, Math.max(0, inputs.frq_5 || 0)); 
      const frq6 = Math.min(9, Math.max(0, inputs.frq_6 || 0)); 

      const totalFrq = frq1 + frq2 + frq3 + frq4 + frq5 + frq6; 

      // Section I: 42 MCQs = 50% of composite score
      const mcqWeighted = Math.round((totalMcq / 42) * 50 * 10) / 10; 

      // Section II: 54 FRQ points = 50% of composite score
      const frqWeighted = Math.round((totalFrq / 54) * 50 * 10) / 10; 

      // Total composite score out of 100
      const composite = Math.round((mcqWeighted + frqWeighted) * 10) / 10; 

      let score = 1; 
      let status = 'No Recommendation'; 
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose'; 
      let percentile = '~25th Percentile'; 

      if (composite >= 63) { 
        score = 5; 
        status = 'Extremely Well Qualified'; 
        badgeColor = 'emerald'; 
        percentile = 'Top ~20% (80th+ Percentile)'; 
      } else if (composite >= 50) { 
        score = 4; 
        status = 'Well Qualified'; 
        badgeColor = 'blue'; 
        percentile = '~60th-79th Percentile'; 
      } else if (composite >= 38) { 
        score = 3; 
        status = 'Qualified (College Credit Eligible)'; 
        badgeColor = 'amber'; 
        percentile = '~40th-59th Percentile'; 
      } else if (composite >= 27) { 
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
        summaryNote: `Your composite score is ${composite.toFixed(1)} / 100. A composite of 63 or higher is estimated to qualify for a 5.`, 
        subscores: [ 
          { 
            label: 'MCQ Weighted Points', 
            value: `${mcqWeighted.toFixed(1)} pts`, 
            max: 50, 
            percent: Math.round((mcqWeighted / 50) * 100) 
          }, 
          { 
            label: 'FRQ Weighted Points', 
            value: `${frqWeighted.toFixed(1)} pts`, 
            max: 50, 
            percent: Math.round((frqWeighted / 50) * 100) 
          }, 
          { 
            label: 'Total Raw MCQs Correct', 
            value: `${totalMcq} / 42` 
          }, 
          { 
            label: 'Total Raw FRQ Points', 
            value: `${totalFrq} / 54` 
          } 
        ] 
      }; 
    }, 

    examSpecs: { 
      totalDuration: '3 Hours 10 Minutes', 
      totalQuestions: '42 MCQs + 6 FRQs', 
      scaleRange: '1 - 5', 
      qualifyingScore: '3 or higher', 
      nationalAverage: '3.21', 
      structureNote: 'Section I has 42 MCQs: 29 in Part A and 13 in Part B. Section II has 6 FRQs: 2 in Part A and 4 in Part B. Each section is worth 50% of the exam score, giving a maximum composite score of 100.', 
      sections: [ 
        { 
          name: 'Section I Part A (No Calc)', 
          questions: '29 Questions', 
          time: '62 Minutes', 
          weight: '34.5% of Score' 
        }, 
        { 
          name: 'Section I Part B (Calc Required)', 
          questions: '13 Questions', 
          time: '38 Minutes', 
          weight: '15.5% of Score' 
        }, 
        { 
          name: 'Section II Part A (Calc Required)', 
          questions: '2 Questions (18 pts)', 
          time: '30 Minutes', 
          weight: '16.7% of Score' 
        }, 
        { 
          name: 'Section II Part B (No Calc)', 
          questions: '4 Questions (36 pts)', 
          time: '60 Minutes', 
          weight: '33.3% of Score' 
        } 
      ] 
    }, 

    scoreScaleTable: [ 
      { 
        score: '5', 
        label: 'Extremely Well Qualified', 
        collegeCredit: 'Calculus I (Single Variable) College Credit', 
        typicalCutoff: '63 – 100 Composite' 
      }, 
      { 
        score: '4', 
        label: 'Well Qualified', 
        collegeCredit: 'College Calculus I Credit at Most Universities', 
        typicalCutoff: '50 – 62.9 Composite' 
      }, 
      { 
        score: '3', 
        label: 'Qualified', 
        collegeCredit: 'Credit at In-State & Public Universities', 
        typicalCutoff: '38 – 49.9 Composite' 
      }, 
      { 
        score: '2', 
        label: 'Possibly Qualified', 
        collegeCredit: 'Prerequisite Fulfillment Only (Rare)', 
        typicalCutoff: '27 – 37.9 Composite' 
      }, 
      { 
        score: '1', 
        label: 'No Recommendation', 
        collegeCredit: 'No Credit Granted', 
        typicalCutoff: '0 – 26.9 Composite' 
      } 
    ], 

    formulaExplanation: { 
      title: 'AP Calculus AB Scoring Formula', 
      steps: [ 
        'Add your correct answers from Section I Part A and Part B to get your total MCQ score out of 42.', 
        'Convert your total MCQ score to a 50-point weighted score using: (MCQ score ÷ 42) × 50.', 
        'Add your scores from all 6 Free Response Questions to get your total FRQ score out of 54.', 
        'Convert your total FRQ score to a 50-point weighted score using: (FRQ score ÷ 54) × 50.', 
        'Add the weighted MCQ score and weighted FRQ score together to get your estimated Composite Score out of 100.', 
        'Compare your Composite Score with the estimated AP Calculus AB score ranges to see your possible AP score from 1 to 5.' 
      ], 
      rawToScaledNotes: 'The calculator gives each section equal weight: MCQs are worth 50% and FRQs are worth 50%. The 6 FRQs are scored out of 9 points each, for a maximum of 54 FRQ points.' 
    }, 

    faqs: [ 
      { 
        question: 'What score do you need to pass AP Calculus AB?', 
        answer: 'AP exam scores are awarded on a scale of 1 to 5. Generally, a score of 3 or higher is considered a qualifying performance. However, the score required for college credit or placement may vary depending on the institution.' 
      }, 
      { 
        question: 'How many questions are on the 2027 AP Calculus AB exam?', 
        answer: 'The 2027 exam will consist of a total of 48 questions: 42 multiple-choice questions and 6 free-response questions. The total duration of the exam is 3 hours and 10 minutes.' 
      }, 
      { 
        question: 'Is AP Calculus AB digital in 2027?', 
        answer: 'Yes. The AP Calculus AB exam is a hybrid digital exam. The questions are available in Bluebook, while answers to the FRQs are handwritten in paper exam booklets.' 
      } 
    ], 

    relatedCalculatorIds: ['ap-calculus-bc', 'ap-physics', 'ap-statistics', 'sat'], 
    isPopular: true 
},
  {
  id: 'ap-calculus-bc',
  title: 'AP Calculus BC Score Calculator',
  shortName: 'AP Calculus BC',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 AP Exam Structure',
  seoTitle: 'AP Calculus BC Score Calculator 2027: Predict Your Score',
  metaDescription: 'Free AP Calculus BC Score Calculator! Enter your MCQ & FRQ points to calculate your predicted 1–5 score in seconds. Updated for 2027.',
  overview: 'Estimate your 2027 AP Calculus BC score (1–5) by entering your multiple-choice and free-response scores. The calculator uses the 50/50 section weighting, with 42 multiple-choice questions and 6 free-response questions worth 54 points in total.',

  fields: [
    {
      id: 'mcq_a',
      label: 'Section I Part A: Multiple Choice (No Calculator)',
      sublabel: '29 questions (62 minutes)',
      min: 0,
      max: 29,
      defaultValue: 23,
      unit: '/ 29'
    },
    {
      id: 'mcq_b',
      label: 'Section I Part B: Multiple Choice (Calculator Required)',
      sublabel: '13 questions (38 minutes)',
      min: 0,
      max: 13,
      defaultValue: 10,
      unit: '/ 13'
    },
    {
      id: 'frq_1',
      label: 'Section II Part A: Free Response 1 (Calculator Required)',
      sublabel: '9 points maximum',
      min: 0,
      max: 9,
      defaultValue: 7,
      unit: '/ 9'
    },
    {
      id: 'frq_2',
      label: 'Section II Part A: Free Response 2 (Calculator Required)',
      sublabel: '9 points maximum',
      min: 0,
      max: 9,
      defaultValue: 7,
      unit: '/ 9'
    },
    {
      id: 'frq_3',
      label: 'Section II Part B: Free Response 3 (No Calculator)',
      sublabel: '9 points maximum',
      min: 0,
      max: 9,
      defaultValue: 6,
      unit: '/ 9'
    },
    {
      id: 'frq_4',
      label: 'Section II Part B: Free Response 4 (No Calculator)',
      sublabel: '9 points maximum',
      min: 0,
      max: 9,
      defaultValue: 6,
      unit: '/ 9'
    },
    {
      id: 'frq_5',
      label: 'Section II Part B: Free Response 5 (No Calculator)',
      sublabel: '9 points maximum',
      min: 0,
      max: 9,
      defaultValue: 6,
      unit: '/ 9'
    },
    {
      id: 'frq_6',
      label: 'Section II Part B: Free Response 6 (No Calculator)',
      sublabel: '9 points maximum',
      min: 0,
      max: 9,
      defaultValue: 6,
      unit: '/ 9'
    }
  ],

  calculate: (inputs) => {
    // Section I: 42 MCQs
    const mcqA = Math.min(29, Math.max(0, Number(inputs.mcq_a) || 0));
    const mcqB = Math.min(13, Math.max(0, Number(inputs.mcq_b) || 0));
    const totalMcq = mcqA + mcqB;

    // Section II: 6 FRQs, 9 points each = 54 points
    const frq1 = Math.min(9, Math.max(0, Number(inputs.frq_1) || 0));
    const frq2 = Math.min(9, Math.max(0, Number(inputs.frq_2) || 0));
    const frq3 = Math.min(9, Math.max(0, Number(inputs.frq_3) || 0));
    const frq4 = Math.min(9, Math.max(0, Number(inputs.frq_4) || 0));
    const frq5 = Math.min(9, Math.max(0, Number(inputs.frq_5) || 0));
    const frq6 = Math.min(9, Math.max(0, Number(inputs.frq_6) || 0));

    const totalFrq = frq1 + frq2 + frq3 + frq4 + frq5 + frq6;

    // Convert each section to 50 weighted points
    const mcqWeighted =
      Math.round(((totalMcq / 42) * 50) * 10) / 10;

    const frqWeighted =
      Math.round(((totalFrq / 54) * 50) * 10) / 10;

    // Composite score out of 100
    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    // Estimated AP score ranges
    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';

    if (composite >= 60) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
    } else if (composite >= 49) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
    } else if (composite >= 38) {
      score = 3;
      status = 'Qualified';
      badgeColor = 'amber';
    } else if (composite >= 28) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
    }

    // Approximate AB subscore estimate
    const abSubscore = Math.min(
      5,
      Math.max(1, Math.round(score * 1.05))
    );

    return {
      mainScore: score,
      mainScoreLabel: 'Estimated AP BC Score',
      maxScore: 5,

      qualificationStatus: status,
      qualificationBadgeColor: badgeColor,

      compositePoints: composite,
      maxCompositePoints: 100,

      isEstimated: true,

      summaryNote:
        `Your estimated BC score is ${score} (Composite: ${composite.toFixed(1)}/100) with an estimated AB Subscore of ${abSubscore}.`,

      subscores: [
        {
          label: 'Estimated AB Subscore',
          value: `${abSubscore} / 5`
        },
        {
          label: 'MCQ Weighted Points',
          value: `${mcqWeighted.toFixed(1)} pts`,
          max: 50,
          percent: Math.round((mcqWeighted / 50) * 100)
        },
        {
          label: 'FRQ Weighted Points',
          value: `${frqWeighted.toFixed(1)} pts`,
          max: 50,
          percent: Math.round((frqWeighted / 50) * 100)
        },
        {
          label: 'Total Raw Points',
          value: `${totalMcq + totalFrq} / 96`
        }
      ]
    };
  },

  examSpecs: {
    totalDuration: '3 Hours 10 Minutes',
    totalQuestions: '42 MCQs + 6 FRQs',
    scaleRange: '1 - 5',
    qualifyingScore: '3 or higher',
    nationalAverage: '3.82',
    structureNote:
      'Section I has 42 multiple-choice questions and Section II has 6 free-response questions. Each section contributes 50% of the final AP score. The exam also reports an AB subscore.',

    sections: [
      {
        name: 'Section I Part A (No Calculator)',
        questions: '29 Questions',
        time: '62 Minutes',
        weight: '34.5% of Score'
      },
      {
        name: 'Section I Part B (Calculator Required)',
        questions: '13 Questions',
        time: '38 Minutes',
        weight: '15.5% of Score'
      },
      {
        name: 'Section II Part A (Calculator Required)',
        questions: '2 Questions (18 pts)',
        time: '30 Minutes',
        weight: '16.7% of Score'
      },
      {
        name: 'Section II Part B (No Calculator)',
        questions: '4 Questions (36 pts)',
        time: '60 Minutes',
        weight: '33.3% of Score'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'May qualify for Calculus I & II credit',
      typicalCutoff: '60.0 – 100.0 Composite'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'May qualify for college calculus credit',
      typicalCutoff: '49.0 – 59.9 Composite'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'May qualify for college credit',
      typicalCutoff: '38.0 – 48.9 Composite'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'May qualify through AB Subscore at some colleges',
      typicalCutoff: '28.0 – 37.9 Composite'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'Usually no college credit',
      typicalCutoff: '0.0 – 27.9 Composite'
    }
  ],

  formulaExplanation: {
    title: 'AP Calculus BC Scoring Algorithm',

    steps: [
  'Enter your correct answers for Part A and Part B. We add them together to get your total MCQ score out of 42.',
  'The MCQ score is then converted to a score out of 50, since multiple choice counts for half of the exam.',
  'Enter the points you earned on each of the 6 FRQs. Each FRQ is worth up to 9 points, so the maximum is 54 points.',
  'Your total FRQ points are converted to a score out of 50 because the FRQ section is worth the other half of the exam.',
  'We add the MCQ and FRQ scores together to get your final estimated Composite Score out of 100.',
  'Finally, we use the estimated score ranges to give you a possible AP Calculus BC score from 1 to 5.'
],

rawToScaledNotes:
  'The calculation is straightforward: MCQs account for 50 points and FRQs account for 50 points. Together, they make a 100-point Composite Score.'
  },

  faqs: [
    {
      question: 'What is the difference between AP Calculus AB and AP Calculus BC?',
      answer:
        'AP Calculus BC includes the AP Calculus AB material and additional topics that extend into a second semester of single-variable calculus. The College Board describes AP Calculus BC as equivalent to a first-semester college calculus course plus the subsequent single-variable calculus course.'
    },
    {
      question: 'What score do you need on AP Calculus BC to get college credit?',
      answer:
        'There is no single AP score requirement that applies to every college. Some colleges may award credit or placement for a 3, while others may require a 4 or 5. Check the AP credit policy of the college or university you are interested in.'
    },
    {
      question: 'What is considered a good AP Calculus BC score?',
      answer: 'A 4 or 5 is generally considered a strong AP Calculus BC result. In the 2026 administration, 68% of students earned a 4 or 5, while 82% earned a 3 or higher.'
    },
    {
      question: 'How many FRQs are on the AP Calculus BC exam?',
      answer: 'The free-response section has 6 questions in total. The first 2 questions are in Part A, which gives you 30 minutes and requires a graphing calculator. The remaining 4 questions are in Part B, where you get 60 minutes and cannot use a calculator.'
    },
    {
      question: 'What is the AP Calculus BC AB Subscore?',
      answer: 'Students who take AP Calculus BC receive a separate Calculus AB subscore from 1 to 5 in addition to their regular BC score. The College Board says the AB subscore reflects performance on the portion of the exam devoted to AB topics, which is approximately 60% of the exam.'
    }
  ],

  relatedCalculatorIds: [
    'ap-calculus-ab',
    'ap-physics',
    'ap-statistics',
    'ap-computer-science-a'
  ],

  isPopular: true
},
  {
  id: 'ap-statistics',
  title: 'AP Statistics Score Calculator',
  shortName: 'AP Statistics',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 AP Exam Structure',
  seoTitle: 'AP Statistics Score Calculator 2027: Predict Your Score',
  metaDescription: 'Free AP Statistics Score Calculator: enter your MCQ & FRQ points to predict your 1–5 score instantly. No sign-up. Try it now!',
  overview: 'Estimate your 2027 AP Statistics score (1–5) by entering your multiple-choice and free-response scores. The calculator uses the 50/50 section weighting, with 42 multiple-choice questions and 4 free-response questions.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I: Multiple-Choice Questions',
      sublabel: '42 questions (90 minutes)',
      min: 0,
      max: 42,
      defaultValue: 29,
      unit: '/ 42'
    },
    {
      id: 'frq_1',
      label: 'Section II: Free Response 1',
      sublabel: '10 points maximum',
      min: 0,
      max: 10,
      defaultValue: 7,
      unit: '/ 10'
    },
    {
      id: 'frq_2',
      label: 'Section II: Free Response 2',
      sublabel: '10 points maximum',
      min: 0,
      max: 10,
      defaultValue: 7,
      unit: '/ 10'
    },
    {
      id: 'frq_3',
      label: 'Section II: Free Response 3',
      sublabel: '10 points maximum',
      min: 0,
      max: 10,
      defaultValue: 7,
      unit: '/ 10'
    },
    {
      id: 'frq_4',
      label: 'Section II: Free Response 4',
      sublabel: '10 points maximum',
      min: 0,
      max: 10,
      defaultValue: 7,
      unit: '/ 10'
    }
  ],

  calculate: (inputs) => {
    // Section I: 42 MCQs
    const mcq = Math.min(42, Math.max(0, Number(inputs.mcq) || 0));

    // Section II: 4 FRQs, 10 points each = 40 points
    const frq1 = Math.min(10, Math.max(0, Number(inputs.frq_1) || 0));
    const frq2 = Math.min(10, Math.max(0, Number(inputs.frq_2) || 0));
    const frq3 = Math.min(10, Math.max(0, Number(inputs.frq_3) || 0));
    const frq4 = Math.min(10, Math.max(0, Number(inputs.frq_4) || 0));

    const totalFrq = frq1 + frq2 + frq3 + frq4;

    // Both sections are worth 50% of the exam
    const mcqWeighted =
      Math.round(((mcq / 42) * 50) * 10) / 10;

    const frqWeighted =
      Math.round(((totalFrq / 40) * 50) * 10) / 10;

    // Composite score out of 100
    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    // Estimated AP score ranges
    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';

    if (composite >= 68) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
    } else if (composite >= 53) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
    } else if (composite >= 40) {
      score = 3;
      status = 'Qualified';
      badgeColor = 'amber';
    } else if (composite >= 28) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
    }

    return {
      mainScore: score,
      mainScoreLabel: 'Estimated AP Score',
      maxScore: 5,

      qualificationStatus: status,
      qualificationBadgeColor: badgeColor,

      compositePoints: composite,
      maxCompositePoints: 100,

      isEstimated: true,

      summaryNote:
        `Your estimated AP Statistics score is ${score} (Composite: ${composite.toFixed(1)}/100).`,

      subscores: [
        {
          label: 'MCQ Weighted Points',
          value: `${mcqWeighted.toFixed(1)} pts`,
          max: 50,
          percent: Math.round((mcqWeighted / 50) * 100)
        },
        {
          label: 'FRQ Weighted Points',
          value: `${frqWeighted.toFixed(1)} pts`,
          max: 50,
          percent: Math.round((frqWeighted / 50) * 100)
        },
        {
          label: 'Total Raw Points',
          value: `${mcq + totalFrq} / 82`
        }
      ]
    };
  },

  examSpecs: {
    totalDuration: '3 Hours',
    totalQuestions: '42 MCQs + 4 FRQs',
    scaleRange: '1 - 5',
    qualifyingScore: '3 or higher',
    nationalAverage: '2.92',
    structureNote:
      'Section I has 42 multiple-choice questions and Section II has 4 free-response questions. Each section is worth 50% of the exam score. The 2027 AP Statistics Exam is fully digital in Bluebook.',

    sections: [
      {
        name: 'Section I: Multiple Choice',
        questions: '42 Questions',
        time: '90 Minutes',
        weight: '50% of Total'
      },
      {
        name: 'Section II: Free Response',
        questions: '4 Questions (40 pts)',
        time: '90 Minutes',
        weight: '50% of Total'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'May qualify for introductory statistics credit',
      typicalCutoff: '68.0 – 100.0 Composite'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'May qualify for college statistics credit',
      typicalCutoff: '53.0 – 67.9 Composite'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'May qualify for college credit',
      typicalCutoff: '40.0 – 52.9 Composite'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'Usually does not qualify for college credit',
      typicalCutoff: '28.0 – 39.9 Composite'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'Usually does not qualify for college credit',
      typicalCutoff: '0.0 – 27.9 Composite'
    }
  ],

  formulaExplanation: {
    title: 'AP Statistics Scoring Formula',

    steps: [
      'Enter how many multiple-choice questions you answered correctly, from 0 to 42.',
      'Your MCQ score is converted to a maximum of 50 points since Section I makes up 50% of the exam.',
      'Enter the points you earned on each of the 4 free-response questions. Each FRQ is worth up to 10 points, giving you 40 possible FRQ points.',
      'Your total FRQ points are converted to a maximum of 50 points because Section II is also worth 50% of the exam.',
      'The MCQ and FRQ weighted scores are combined to calculate your Composite Score out of 100.',
      'Your Composite Score is then matched with our estimated score ranges to give you an estimated AP Statistics score from 1 to 5.'
    ],

    rawToScaledNotes:
      'The calculator follows a 50/50 weighting: multiple choice is worth 50 points and free response is worth 50 points. The maximum raw score is 82 points.'
  },

  faqs: [
    {
      question: 'What score do you need to pass Ap Statistics?',
      answer:
        'There is no universal AP "passing score" that guarantees college credit. A score of 3 or higher is commonly considered a qualifying AP score, but each college or university decides which AP scores it accepts for credit or placement.'
    },
    {
      question: 'What changed in the 2027 AP Statistics exam?',
      answer:
        'The 2027 exam uses the revised AP Statistics framework and is fully digital. The exam has 42 multiple-choice questions followed by four free-response questions. The free-response section has four 10-point questions, for 40 raw points total.'
    },
    {
      question: 'Is the AP Statistics Exam fully digital in 2027?',
      answer: 'Yes. Beginning in May 2027, the AP Statistics Exam transitions to fully digital testing through Bluebook, including the free-response section.'
    },
    {
      question: 'Can I use a calculator on AP Statistics?',
answer: 'Yes. College Board permits calculators for AP Statistics. On the fully digital exam, students can also use the built-in Desmos graphing calculator in Bluebook.'
    }
  ],

  relatedCalculatorIds: [
    'ap-calculus-ab',
    'ap-psychology',
    'sat',
    'act'
  ]
},
  {
    id: 'ap-environmental-science',
    title: 'APES Score Calculator',
    shortName: 'AP Environmental Science',
    category: 'ap',
    categoryLabel: 'AP Exams',
    yearFormat: '2027 AP Exam Structure',
    seoTitle: 'APES Score Calculator 2027: Predict Your Score',
    metaDescription: 'Free APES Score Calculator to estimate your AP Environmental Science score from 1–5. Enter MCQ and FRQ points to get your estimate. Try now!',
    overview: 'Estimate your APES score from 1 to 5 based on the 2027 exam format, with 80 MCQs and 3 FRQs. MCQs count for 60% and FRQs count for 40% of your score.',
    fields: [
      {
        id: 'mcq',
        label: 'Section I: Multiple Choice Questions (MCQ)',
        sublabel: '80 questions (90 minutes, 60% of exam)',
        min: 0,
        max: 80,
        defaultValue: 56,
        unit: '/ 80'
      },
      {
        id: 'frq1',
        label: 'FRQ 1: Design an Investigation',
        sublabel: '10 points (scientific method and data analysis)',
        min: 0,
        max: 10,
        defaultValue: 7,
        unit: '/ 10'
      },
      {
        id: 'frq2',
        label: 'FRQ 2: Analyze an Environmental Problem and Propose a Solution',
        sublabel: '10 points (authentic scenario and mitigation)',
        min: 0,
        max: 10,
        defaultValue: 7,
        unit: '/ 10'
      },
      {
        id: 'frq3',
        label: 'FRQ 3: Analyze Problem & Propose Solution with Calculations',
        sublabel: '10 points (math/dimensional analysis required)',
        min: 0,
        max: 10,
        defaultValue: 6,
        unit: '/ 10'
      }
    ],
    calculate: (inputs) => {
      const mcq = Math.min(80, Math.max(0, inputs.mcq || 0));
      const frq1 = Math.min(10, Math.max(0, inputs.frq1 || 0));
      const frq2 = Math.min(10, Math.max(0, inputs.frq2 || 0));
      const frq3 = Math.min(10, Math.max(0, inputs.frq3 || 0));
      const totalFrq = frq1 + frq2 + frq3;

      const mcqWeighted = (mcq / 80) * 60;
      const frqWeighted = (totalFrq / 30) * 40;
      const composite = Math.round((mcqWeighted + frqWeighted) * 10) / 10;

      let score = 1;
      let status = 'No Recommendation';
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
      let percentile = '~25th Percentile';

      if (composite >= 71) {
        score = 5;
        status = 'Extremely Well Qualified';
        badgeColor = 'emerald';
        percentile = 'Top ~9% (91st+ Percentile)';
      } else if (composite >= 58) {
        score = 4;
        status = 'Well Qualified';
        badgeColor = 'blue';
        percentile = '~65th-90th Percentile';
      } else if (composite >= 46) {
        score = 3;
        status = 'Qualified (College Credit Eligible)';
        badgeColor = 'amber';
        percentile = '~47th-64th Percentile';
      } else if (composite >= 33) {
        score = 2;
        status = 'Possibly Qualified';
        badgeColor = 'rose';
        percentile = '~23rd-46th Percentile';
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
        summaryNote: `Your composite score is ${composite.toFixed(1)} / 100. Section I contributed ${mcqWeighted.toFixed(1)} pts and Section II contributed ${frqWeighted.toFixed(1)} pts.`,
        subscores: [
          { label: 'MCQ Weighted Contribution', value: `${mcqWeighted.toFixed(1)} pts`, max: 60, percent: Math.round((mcqWeighted / 60) * 100) },
          { label: 'FRQ Weighted Contribution', value: `${frqWeighted.toFixed(1)} pts`, max: 40, percent: Math.round((frqWeighted / 40) * 100) },
          { label: 'Raw Multiple Choice Correct', value: `${mcq} / 80` },
          { label: 'Raw Free Response Total', value: `${totalFrq} / 30` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '2 Hours 40 Minutes',
      totalQuestions: '80 MCQs + 3 FRQs',
      scaleRange: '1 - 5',
      qualifyingScore: '3 or higher',
      nationalAverage: '3.06',
      structureNote: 'Section 1: 80 MCQs (90 min, 60%). Section 2: 3 FRQs (70 min, 40%). Graphing/scientific calculator permitted on both sections.',
      sections: [
        { name: 'Section I: Multiple Choice', questions: '80 Questions', time: '90 Minutes', weight: '60% of Total' },
        { name: 'Section II: Free Response', questions: '3 Questions (30 pts)', time: '70 Minutes', weight: '40% of Total' }
      ]
    },
    scoreScaleTable: [
      { score: '5', label: 'Extremely Well Qualified', collegeCredit: 'Introductory Environmental Science Credit', typicalCutoff: '71 – 100 Composite' },
      { score: '4', label: 'Well Qualified', collegeCredit: 'College Elective or Lab Science Credit', typicalCutoff: '58 – 70 Composite' },
      { score: '3', label: 'Qualified', collegeCredit: 'General Science Education Credit', typicalCutoff: '46 – 57 Composite' },
      { score: '2', label: 'Possibly Qualified', collegeCredit: 'No College Credit', typicalCutoff: '33 – 45 Composite' },
      { score: '1', label: 'No Recommendation', collegeCredit: 'No Credit Granted', typicalCutoff: '0 – 32 Composite' }
    ],
    formulaExplanation: {
      title: 'AP Environmental Science Scoring Model',
      steps: [
        'Enter how many of the 80 multiple-choice questions you got correct. Your MCQ contribution is calculated as: (MCQs Correct / 80) × 60 points.',
        'Enter your score for FRQ 1 out of 10 points.',
        'Enter your score for FRQ 2 out of 10 points.',
        'Enter your score for FRQ 3 out of 10 points. Your total FRQ contribution is calculated as: ((FRQ 1 + FRQ 2 + FRQ 3) / 30) × 40 points.',
        'Add your MCQ and FRQ contributions together: Composite Score = MCQ Contribution + FRQ Contribution.',
        'Your final estimated Composite Score is shown on a 0–100 scale.',
        'We compare your Composite Score with our estimated score ranges to give you a possible AP score from 1 to 5.'
      ],
      rawToScaledNotes: 'This calculator provides an estimate only; the final AP score is determined by the College Board.'
    },
    faqs: [
  {
    question: 'How many questions are on the AP Environmental Science exam?',
    answer:
      'The AP Environmental Science exam has 80 multiple-choice questions and 3 free-response questions. The multiple-choice section is 90 minutes and worth 60% of the exam, while the free-response section is 70 minutes and worth 40%.'
  },
  {
    question: 'How much is the AP Environmental Science multiple-choice section worth?',
    answer:
      'The multiple-choice section is worth 60% of the total AP Environmental Science exam score and contains 80 questions.'
  },
  {
    question: 'How much is the AP Environmental Science FRQ section worth?',
    answer:
      'The free-response section is worth 40% of the total exam score and contains 3 questions. Students have 70 minutes to complete it.'
  },
  {
    question: 'What calculator is allowed on AP Environmental Science?',
    answer:
      'For the 2027 AP Environmental Science exam, handheld calculators with storage capabilities, such as graphing calculators, are not allowed. Check the current College Board calculator policy before the exam.'
  },
  {
    question: 'What composite score is needed for an APES 5?',
    answer:
      'For this calculator, a Composite Score of 71 or higher is used as an estimated AP Environmental Science score of 5. This is an estimate, not an official College Board cutoff.'
  },
  {
    question: 'What is a good score on AP Environmental Science?',
    answer:
      'A 4 or 5 is generally considered a strong AP Environmental Science score. Whether your score earns college credit or placement depends on the policies of the college or university you plan to attend.'
  },
  {
    question: 'What score do you need to pass AP Environmental Science?',
    answer:
      'There is no universal college-credit passing score. Many colleges consider a 3 or higher for credit or placement, while some require a 4 or 5. Always check the AP credit policy of the specific college.'
  }
],
    seoArticle: apesSeoArticle,
    relatedCalculatorIds: ['ap-biology', 'ap-human-geography', 'ap-chemistry']
  },
  {
  id: 'ap-computer-science-a',
  title: 'AP CSA Score Calculator',
  shortName: 'AP Computer Science A',
  category: 'ap',
  categoryLabel: 'AP Exams',
  yearFormat: '2027 AP Exam Structure',

  seoTitle: 'AP CSA Score Calculator 2027: Predict Your AP Score',
  metaDescription: 'Free AP CSA Score Calculator to estimate your AP Computer Science A score. Enter your MCQ and FRQ scores to get your estimated AP score.',
  
  overview:
    'AP Computer Science A focuses on Java programming and includes 42 MCQs worth 55% and 4 FRQs worth 45% of the exam score. Use this AP CSA Score Calculator to estimate your score out of 100.',

  fields: [
    {
      id: 'mcq',
      label: 'Section I: Multiple-Choice Questions',
      sublabel: '42 questions (90 minutes, 55% of exam score)',
      min: 0,
      max: 42,
      defaultValue: 30,
      unit: '/ 42'
    },
    {
      id: 'frq1',
      label: 'FRQ 1: Methods and Control Structures',
      sublabel: '7 points maximum',
      min: 0,
      max: 7,
      defaultValue: 5,
      unit: '/ 7'
    },
    {
      id: 'frq2',
      label: 'FRQ 2: Class Design',
      sublabel: '7 points maximum',
      min: 0,
      max: 7,
      defaultValue: 5,
      unit: '/ 7'
    },
    {
      id: 'frq3',
      label: 'FRQ 3: Data Analysis with ArrayList',
      sublabel: '5 points maximum',
      min: 0,
      max: 5,
      defaultValue: 4,
      unit: '/ 5'
    },
    {
      id: 'frq4',
      label: 'FRQ 4: 2D Array',
      sublabel: '6 points maximum',
      min: 0,
      max: 6,
      defaultValue: 4,
      unit: '/ 6'
    }
  ],

  calculate: (inputs) => {
    const mcq = Math.min(42, Math.max(0, Number(inputs.mcq) || 0));

    const frq1 = Math.min(7, Math.max(0, Number(inputs.frq1) || 0));
    const frq2 = Math.min(7, Math.max(0, Number(inputs.frq2) || 0));
    const frq3 = Math.min(5, Math.max(0, Number(inputs.frq3) || 0));
    const frq4 = Math.min(6, Math.max(0, Number(inputs.frq4) || 0));

    const totalFrq = frq1 + frq2 + frq3 + frq4;

    // MCQ = 55% of exam
    const mcqWeighted =
      Math.round(((mcq / 42) * 55) * 10) / 10;

    // FRQ = 45% of exam
    const frqWeighted =
      Math.round(((totalFrq / 25) * 45) * 10) / 10;

    // Final Composite Score out of 100
    const composite =
      Math.round((mcqWeighted + frqWeighted) * 10) / 10;

    let score = 1;
    let status = 'No Recommendation';
    let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
    let percentile = '~20th-39th Percentile';

    if (composite >= 80) {
      score = 5;
      status = 'Extremely Well Qualified';
      badgeColor = 'emerald';
      percentile = 'Top ~25%';
    } else if (composite >= 65) {
      score = 4;
      status = 'Well Qualified';
      badgeColor = 'blue';
      percentile = '~45th-69th Percentile';
    } else if (composite >= 50) {
      score = 3;
      status = 'Qualified';
      badgeColor = 'amber';
      percentile = '~25th-44th Percentile';
    } else if (composite >= 35) {
      score = 2;
      status = 'Possibly Qualified';
      badgeColor = 'rose';
      percentile = '~15th-24th Percentile';
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
        `MCQ contributed ${mcqWeighted.toFixed(1)} pts and FRQs contributed ${frqWeighted.toFixed(1)} pts.`,

      subscores: [
        {
          label: 'MCQ Contribution (55%)',
          value: `${mcqWeighted.toFixed(1)} pts`,
          max: 55,
          percent: Math.round((mcqWeighted / 55) * 100)
        },
        {
          label: 'FRQ Contribution (45%)',
          value: `${frqWeighted.toFixed(1)} pts`,
          max: 45,
          percent: Math.round((frqWeighted / 45) * 100)
        },
        {
          label: 'Total Raw FRQ Points',
          value: `${totalFrq} / 25`,
          max: 25,
          percent: Math.round((totalFrq / 25) * 100)
        }
      ]
    };
  },

  examSpecs: {
    totalDuration: '3 Hours',
    totalQuestions: '42 MCQs + 4 FRQs',
    scaleRange: '1 - 5',
    qualifyingScore: '3 or higher',
    nationalAverage: '3.18',

    structureNote:
      'Section I: 42 MCQs in 90 minutes (55%). Section II: 4 FRQs in 90 minutes (45%). The 2027 exam is fully digital in Bluebook.',

    sections: [
      {
        name: 'Section I: Multiple Choice',
        questions: '42 Questions',
        time: '90 Minutes',
        weight: '55% of Score'
      },
      {
        name: 'Section II: Free Response',
        questions: '4 Questions (25 raw points)',
        time: '90 Minutes',
        weight: '45% of Score'
      }
    ]
  },

  scoreScaleTable: [
    {
      score: '5',
      label: 'Extremely Well Qualified',
      collegeCredit: 'Introductory Computer Science Credit',
      typicalCutoff: '80 – 100 Composite'
    },
    {
      score: '4',
      label: 'Well Qualified',
      collegeCredit: 'College Computer Science Credit',
      typicalCutoff: '65 – 79 Composite'
    },
    {
      score: '3',
      label: 'Qualified',
      collegeCredit: 'May Qualify for College Credit',
      typicalCutoff: '50 – 64 Composite'
    },
    {
      score: '2',
      label: 'Possibly Qualified',
      collegeCredit: 'No College Credit',
      typicalCutoff: '35 – 49 Composite'
    },
    {
      score: '1',
      label: 'No Recommendation',
      collegeCredit: 'No Credit Granted',
      typicalCutoff: '0 – 34 Composite'
    }
  ],

  formulaExplanation: {
    title: 'AP Computer Science A Scoring Formula',

    steps: [
      'Enter how many of the 42 multiple-choice questions you got correct.',
      'Your MCQ score is converted to 55 points because Section I is worth 55% of the exam.',
      'Enter your scores for the 4 FRQs. Together, the four questions are worth 25 raw points.',
      'Your total FRQ score is converted to 45 points because Section II is worth 45% of the exam.',
      'We add the MCQ and FRQ weighted scores to get your estimated Composite Score out of 100.',
      'Finally, your Composite Score is matched with our estimated ranges to give you a possible AP score from 1 to 5.'
    ],

    rawToScaledNotes:
      'The calculator uses the official 55% MCQ and 45% FRQ weighting. The 42 MCQs and 25 raw FRQ points are converted to their weighted values and combined into a 100-point Composite Score.'
  },

  faqs: [
    {
      question: 'What is a good AP CSA score?',
      answer: 'A score of 4 or 5 is generally considered a strong AP CSA result, but college credit policies vary by institution.'
    },
    {
      question: 'How many questions are on the AP Computer Science A exam?',
      answer:
        'The 2027 AP Computer Science A exam has 42 multiple-choice questions and 4 free-response questions.'
    },
    {
      question: 'How many points are the AP CSA FRQs worth?',
      answer:
        'The four FRQs are worth 25 raw points in total: 7 points for Question 1, 7 points for Question 2, 5 points for Question 3, and 6 points for Question 4.'
    },
    {
      question: 'Is the AP Computer Science A exam digital in 2027?',
      answer:
        'Yes. The 2027 AP Computer Science A exam is fully digital and is completed in the Bluebook testing app.'
    },
    {
      question: 'What programming language is used in AP CSA?',
      answer: 'AP Computer Science A focuses on Java programming.'
    }
  ],
  seoArticle: apCsaSeoArticle,

  relatedCalculatorIds: [
    'ap-calculus-ab',
    'ap-calculus-bc',
    'ap-statistics'
  ]
}
];
