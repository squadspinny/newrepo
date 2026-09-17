import { CalculatorConfig, SubScoreItem } from '../../types';
import { greSeoArticle } from '../seo/greSeo';

export const standardizedCalculators: CalculatorConfig[] = [
  {
    id: 'sat',
    title: 'SAT Score Calculator',
    shortName: 'Digital SAT',
    category: 'college',
    categoryLabel: 'College Admissions',
    yearFormat: 'Digital SAT Adaptive Format',
    seoTitle: 'Digital SAT Score Calculator 2027 | Raw to Scaled 400-1600 Score',
    metaDescription: 'Free Digital SAT score calculator. Enter your Reading & Writing and Math raw scores to calculate your composite SAT score (400-1600) and national percentile.',
    overview: 'The Digital SAT is an adaptive two-stage test comprising Reading & Writing (54 questions, 200-800) and Math (44 questions, 200-800) for a composite score range of 400 to 1600. Calculate your scaled score and college target admissions bracket.',
    fields: [
      {
        id: 'rw_raw',
        label: 'Reading and Writing: Correct Questions (Modules 1 & 2)',
        sublabel: '54 operational questions (2 modules of 27 questions each)',
        min: 0,
        max: 54,
        defaultValue: 46,
        unit: '/ 54'
      },
      {
        id: 'math_raw',
        label: 'Math: Correct Questions (Modules 1 & 2)',
        sublabel: '44 operational questions (2 modules of 22 questions each)',
        min: 0,
        max: 44,
        defaultValue: 38,
        unit: '/ 44'
      }
    ],
    calculate: (inputs) => {
      const rwRaw = Math.min(54, Math.max(0, inputs.rw_raw || 0));
      const mathRaw = Math.min(44, Math.max(0, inputs.math_raw || 0));

      // Digital SAT adaptive curve approximation
      // RW: 54 questions mapped to 200-800
      let rwScore = Math.round(200 + (rwRaw / 54) * 600);
      rwScore = Math.min(800, Math.max(200, Math.round(rwScore / 10) * 10));

      // Math: 44 questions mapped to 200-800
      let mathScore = Math.round(200 + (mathRaw / 44) * 600);
      mathScore = Math.min(800, Math.max(200, Math.round(mathScore / 10) * 10));

      const totalSat = rwScore + mathScore;

      let status = 'State University Baseline';
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
      let percentile = '50th Percentile';

      if (totalSat >= 1500) {
        status = 'Highly Competitive (Ivy League / Top 20)';
        badgeColor = 'emerald';
        percentile = '98th - 99th+ Percentile';
      } else if (totalSat >= 1400) {
        status = 'Competitive for Top 30-50 Colleges';
        badgeColor = 'blue';
        percentile = '93rd - 97th Percentile';
      } else if (totalSat >= 1200) {
        status = 'Above National Average (Good Standing)';
        badgeColor = 'amber';
        percentile = '75th - 92nd Percentile';
      } else if (totalSat >= 1050) {
        status = 'Average Range (College Eligible)';
        badgeColor = 'amber';
        percentile = '50th - 74th Percentile';
      } else {
        status = 'Below National Average';
        badgeColor = 'rose';
        percentile = 'Below 50th Percentile';
      }

      return {
        mainScore: totalSat,
        mainScoreLabel: 'Composite SAT Score',
        maxScore: 1600,
        qualificationStatus: status,
        qualificationBadgeColor: badgeColor,
        percentileText: percentile,
        compositePoints: totalSat,
        maxCompositePoints: 1600,
        isEstimated: true,
        summaryNote: `Your projected SAT score is ${totalSat} (Reading & Writing: ${rwScore}, Math: ${mathScore}). Shows ${percentile}.`,
        subscores: [
          { label: 'Reading & Writing Score', value: `${rwScore} / 800`, max: 800, percent: Math.round((rwScore / 800) * 100) },
          { label: 'Math Section Score', value: `${mathScore} / 800`, max: 800, percent: Math.round((mathScore / 800) * 100) },
          { label: 'Reading & Writing Raw Correct', value: `${rwRaw} / 54` },
          { label: 'Math Raw Correct', value: `${mathRaw} / 44` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '2 Hours 14 Minutes',
      totalQuestions: '98 Questions Total (54 RW, 44 Math)',
      scaleRange: '400 - 1600',
      qualifyingScore: '1050 (National Benchmark)',
      nationalAverage: '1050 (520 RW / 530 Math)',
      structureNote: 'Digital adaptive test on Bluebook app. Two modules for Reading/Writing (32 min each) and two modules for Math (35 min each). Built-in Desmos graphing calculator permitted on entire Math section.',
      sections: [
        { name: 'Reading and Writing (Module 1 & 2)', questions: '54 Questions', time: '64 Minutes', weight: '50% (200-800 pts)' },
        { name: 'Math (Module 1 & 2)', questions: '44 Questions', time: '70 Minutes', weight: '50% (200-800 pts)' }
      ]
    },
    scoreScaleTable: [
      { score: '1500 – 1600', label: 'Top 1-2%', collegeCredit: 'Ivy League / Stanford / MIT Tier', typicalCutoff: '98th – 99th+ Percentile' },
      { score: '1400 – 1490', label: 'Top 5-7%', collegeCredit: 'Top 30 Public & Private Universities', typicalCutoff: '93rd – 97th Percentile' },
      { score: '1200 – 1390', label: 'Top 25%', collegeCredit: 'Strong State Flagships & Selective Colleges', typicalCutoff: '75th – 92nd Percentile' },
      { score: '1050 – 1190', label: 'National Average', collegeCredit: 'Standard 4-Year University Admission', typicalCutoff: '50th – 74th Percentile' },
      { score: '400 – 1040', label: 'Below Average', collegeCredit: 'Test-Optional or Community College', typicalCutoff: 'Below 50th Percentile' }
    ],
    formulaExplanation: {
      title: 'Digital SAT Scoring & Item Response Theory (IRT)',
      steps: [
        'The Digital SAT uses multistage adaptive testing. Performance on Module 1 determines whether Module 2 is easier or more difficult.',
        'Module 2 questions have different psychometric weights depending on difficulty.',
        'Raw questions are converted via College Board Item Response Theory curves to the 200-800 scale for each section.',
        'Composite SAT = Reading & Writing (200-800) + Math (200-800).'
      ],
      rawToScaledNotes: 'There is zero penalty for wrong answers. Never leave any question blank.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Ivy Plus / Top 20 Universities', scoreNeeded: '1520 - 1600', recommendation: 'Requires near-perfect Math (780-800) and 740+ on RW.' },
        { target: 'Top 50 National Universities', scoreNeeded: '1400 - 1500', recommendation: 'Target 700+ in both Math and Reading/Writing.' },
        { target: 'Flagship State Universities', scoreNeeded: '1250 - 1380', recommendation: 'Target 630+ in both sections.' }
      ],
      strategicAdvice: 'Leverage the built-in Desmos graphing calculator for linear regressions, system of equations, and vertex computations.'
    },
    faqs: [
      { question: 'What is the highest possible SAT score?', answer: 'The maximum score is 1600 (800 in Reading and Writing, and 800 in Math).' },
      { question: 'Can I use a calculator on the entire Digital SAT Math section?', answer: 'Yes! Unlike the old paper SAT, a calculator (including the embedded Desmos graphing calculator) is permitted on all Math questions.' },
      { question: 'How is the Digital SAT adaptive?', answer: 'Each section has two stages. How well you perform in Module 1 determines the difficulty level of questions served in Module 2, which controls your upper score ceiling.' }
    ],
    relatedCalculatorIds: ['act', 'ap-calculus-ab', 'ap-english-language'],
    isPopular: true
  },
  {
    id: 'act',
    title: 'ACT Score Calculator',
    shortName: 'ACT',
    category: 'college',
    categoryLabel: 'College Admissions',
    yearFormat: '2027 ACT Format',
    seoTitle: 'ACT Score Calculator 2027 | Calculate 1-36 Composite & Percentile',
    metaDescription: 'Free ACT score calculator. Calculate your composite ACT score (1-36) from English, Math, Reading, and Science raw scores with national percentiles.',
    overview: 'The ACT consists of four mandatory multiple-choice sections: English (75 questions), Math (60 questions), Reading (40 questions), and Science (40 questions). Each scales from 1 to 36, and their average forms your Composite Score.',
    fields: [
      {
        id: 'english_raw',
        label: 'English: Questions Correct',
        sublabel: '75 questions (45 minutes, grammar, usage, rhetorical skills)',
        min: 0,
        max: 75,
        defaultValue: 65,
        unit: '/ 75'
      },
      {
        id: 'math_raw',
        label: 'Math: Questions Correct',
        sublabel: '60 questions (60 minutes, pre-algebra through trigonometry)',
        min: 0,
        max: 60,
        defaultValue: 50,
        unit: '/ 60'
      },
      {
        id: 'reading_raw',
        label: 'Reading: Questions Correct',
        sublabel: '40 questions (35 minutes, 4 passage categories)',
        min: 0,
        max: 40,
        defaultValue: 35,
        unit: '/ 40'
      },
      {
        id: 'science_raw',
        label: 'Science: Questions Correct',
        sublabel: '40 questions (35 minutes, scientific reasoning and interpretation)',
        min: 0,
        max: 40,
        defaultValue: 34,
        unit: '/ 40'
      }
    ],
    calculate: (inputs) => {
      const eng = Math.min(75, Math.max(0, inputs.english_raw || 0));
      const math = Math.min(60, Math.max(0, inputs.math_raw || 0));
      const read = Math.min(40, Math.max(0, inputs.reading_raw || 0));
      const sci = Math.min(40, Math.max(0, inputs.science_raw || 0));

      // Standard ACT conversion curve approximation
      const scaleEnglish = Math.min(36, Math.max(1, Math.round(1 + (eng / 75) * 35)));
      const scaleMath = Math.min(36, Math.max(1, Math.round(1 + (math / 60) * 35)));
      const scaleReading = Math.min(36, Math.max(1, Math.round(1 + (read / 40) * 35)));
      const scaleScience = Math.min(36, Math.max(1, Math.round(1 + (sci / 40) * 35)));

      const composite = Math.round((scaleEnglish + scaleMath + scaleReading + scaleScience) / 4);

      let status = 'State University Baseline';
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
      let percentile = '50th Percentile';

      if (composite >= 34) {
        status = 'Elite Tier (Ivy League / Top 20 Competitive)';
        badgeColor = 'emerald';
        percentile = '99th+ Percentile';
      } else if (composite >= 30) {
        status = 'Highly Competitive (Top 30-50 Universities)';
        badgeColor = 'blue';
        percentile = '93rd - 98th Percentile';
      } else if (composite >= 25) {
        status = 'Competitive for State Flagships';
        badgeColor = 'amber';
        percentile = '78th - 92nd Percentile';
      } else if (composite >= 20) {
        status = 'National Average';
        badgeColor = 'amber';
        percentile = '50th - 77th Percentile';
      } else {
        status = 'Below National Average';
        badgeColor = 'rose';
        percentile = 'Below 50th Percentile';
      }

      return {
        mainScore: composite,
        mainScoreLabel: 'Composite ACT Score',
        maxScore: 36,
        qualificationStatus: status,
        qualificationBadgeColor: badgeColor,
        percentileText: percentile,
        compositePoints: composite,
        maxCompositePoints: 36,
        isEstimated: true,
        summaryNote: `Your estimated ACT Composite is ${composite} / 36 with section subscores: English ${scaleEnglish}, Math ${scaleMath}, Reading ${scaleReading}, Science ${scaleScience}.`,
        subscores: [
          { label: 'English Scaled Score', value: `${scaleEnglish} / 36` },
          { label: 'Math Scaled Score', value: `${scaleMath} / 36` },
          { label: 'Reading Scaled Score', value: `${scaleReading} / 36` },
          { label: 'Science Scaled Score', value: `${scaleScience} / 36` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '2 Hours 55 Minutes (without optional writing)',
      totalQuestions: '215 Questions Total',
      scaleRange: '1 - 36',
      qualifyingScore: '21 (National Average)',
      nationalAverage: '19.8 - 20.2',
      structureNote: 'Four multiple-choice sections: English (45 min), Math (60 min), Reading (35 min), Science (35 min). Optional 40-minute Writing section.',
      sections: [
        { name: 'English', questions: '75 Questions', time: '45 Minutes', weight: '25% of Composite' },
        { name: 'Math', questions: '60 Questions', time: '60 Minutes', weight: '25% of Composite' },
        { name: 'Reading', questions: '40 Questions', time: '35 Minutes', weight: '25% of Composite' },
        { name: 'Science', questions: '40 Questions', time: '35 Minutes', weight: '25% of Composite' }
      ]
    },
    scoreScaleTable: [
      { score: '34 – 36', label: 'Top 1%', collegeCredit: 'Ivy League / Top 20 Competitive', typicalCutoff: '99th+ Percentile' },
      { score: '30 – 33', label: 'Top 7%', collegeCredit: 'Highly Selective National Colleges', typicalCutoff: '93rd – 98th Percentile' },
      { score: '25 – 29', label: 'Top 25%', collegeCredit: 'Selective State Flagships & Private Colleges', typicalCutoff: '78th – 92nd Percentile' },
      { score: '20 – 24', label: 'National Average', collegeCredit: 'Standard 4-Year University Admission', typicalCutoff: '50th – 77th Percentile' },
      { score: '1 – 19', label: 'Below Average', collegeCredit: 'Community Colleges or Test-Optional', typicalCutoff: 'Below 50th Percentile' }
    ],
    formulaExplanation: {
      title: 'ACT Composite Scoring Formula',
      steps: [
        'Count raw correct answers for each of the 4 sections (English, Math, Reading, Science).',
        'Convert each raw score to a scale score of 1 to 36 using official ACT test curves.',
        'Average the four scaled scores: (English + Math + Reading + Science) / 4.',
        'Round to the nearest whole number (e.g. 30.5 rounds up to 31; 30.25 rounds down to 30).'
      ],
      rawToScaledNotes: 'There is no guessing penalty on the ACT. Always fill in every bubble.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Ivy League & Top 20', scoreNeeded: '34 - 36', recommendation: 'Requires 70+ in English, 56+ in Math, 38+ in Reading and Science.' },
        { target: 'Top 50 Universities', scoreNeeded: '30 - 33', recommendation: 'Requires 62+ in English, 50+ in Math, 34+ in Reading and Science.' },
        { target: 'State Flagships', scoreNeeded: '25 - 29', recommendation: 'Solid preparation across all sections.' }
      ],
      strategicAdvice: 'Pacing is the single greatest challenge on the ACT, particularly in Science and Reading (less than 1 minute per question).'
    },
    faqs: [
      { question: 'What is a good ACT score?', answer: 'A score of 21 is approximately the national average. A score of 28 or higher places you in the top 12% of test takers, while 34+ is competitive for Ivy League admissions.' },
      { question: 'How is the ACT composite score rounded?', answer: 'The composite is the average of the 4 test scores rounded to the nearest integer. A 30.5 rounds to 31, while 30.25 rounds to 30.' }
    ],
    relatedCalculatorIds: ['sat', 'ap-english-language', 'ap-calculus-ab'],
    isPopular: true
  },
  {
    id: 'gre',
    title: 'GRE Score Calculator',
    shortName: 'GRE General Test',
    category: 'grad',
    categoryLabel: 'Graduate School',
    yearFormat: 'Shorter GRE Format',
    seoTitle: 'GRE Score Calculator: Calculate Your GRE Score',
    metaDescription: 'Free GRE Score Calculator to estimate your Verbal, Quant, and total GRE score from your practice test results. Try it now!',
    overview: 'Free GRE Score Calculator to estimate your GRE score from your practice test results. Enter your correct answers for Verbal and Quant, add your AWA score if you have one, and get an estimated GRE score on the 260–340 scale.',
    fields: [
      {
        id: 'verbal_sec1',
        label: 'Section 1',
        sublabel: '12 questions (18 minutes)',
        min: 0,
        max: 12,
        defaultValue: 8,
        unit: '/ 12',
        group: 'Verbal Reasoning (27 Questions Total)',
        groupTotalMax: 27,
        groupTotalLabel: 'Verbal Raw Total'
      },
      {
        id: 'verbal_sec2',
        label: 'Section 2',
        sublabel: '15 questions (23 minutes)',
        min: 0,
        max: 15,
        defaultValue: 10,
        unit: '/ 15',
        group: 'Verbal Reasoning (27 Questions Total)',
        groupTotalMax: 27,
        groupTotalLabel: 'Verbal Raw Total'
      },
      {
        id: 'quant_sec1',
        label: 'Section 1',
        sublabel: '12 questions (21 minutes)',
        min: 0,
        max: 12,
        defaultValue: 9,
        unit: '/ 12',
        group: 'Quantitative Reasoning (27 Questions Total)',
        groupTotalMax: 27,
        groupTotalLabel: 'Quant Raw Total'
      },
      {
        id: 'quant_sec2',
        label: 'Section 2',
        sublabel: '15 questions (26 minutes)',
        min: 0,
        max: 15,
        defaultValue: 11,
        unit: '/ 15',
        group: 'Quantitative Reasoning (27 Questions Total)',
        groupTotalMax: 27,
        groupTotalLabel: 'Quant Raw Total'
      },
      {
        id: 'awa_score',
        label: 'Analytical Writing (AWA)',
        sublabel: 'Optional: 1 "Analyze an Issue" essay (0.0 to 6.0 in 0.5 increments)',
        min: 0,
        max: 6,
        step: 0.5,
        defaultValue: 4.0,
        unit: '/ 6.0',
        group: 'Analytical Writing (Optional)',
        optional: true
      }
    ],
    calculate: (inputs) => {
      const v1 = inputs.verbal_sec1 !== undefined ? Math.min(12, Math.max(0, inputs.verbal_sec1)) : 8;
      const v2 = inputs.verbal_sec2 !== undefined ? Math.min(15, Math.max(0, inputs.verbal_sec2)) : 10;
      const q1 = inputs.quant_sec1 !== undefined ? Math.min(12, Math.max(0, inputs.quant_sec1)) : 9;
      const q2 = inputs.quant_sec2 !== undefined ? Math.min(15, Math.max(0, inputs.quant_sec2)) : 11;

      // Section-level adaptive estimation for Verbal (130-170)
      const rawV = v1 + v2;
      let verbalScaled = 130;
      if (rawV === 27) {
        verbalScaled = 170;
      } else if (rawV > 0) {
        const vRoutingBonus = v1 >= 8 ? 2 : v1 <= 4 ? -2 : 0;
        const vBaseCurve: Record<number, number> = {
          1: 131, 2: 133, 3: 135, 4: 137, 5: 139,
          6: 140, 7: 142, 8: 143, 9: 145, 10: 146,
          11: 147, 12: 149, 13: 150, 14: 151, 15: 153,
          16: 154, 17: 156, 18: 157, 19: 159, 20: 160,
          21: 162, 22: 163, 23: 165, 24: 166, 25: 168,
          26: 169
        };
        const base = vBaseCurve[rawV] ?? (130 + Math.round((rawV / 27) * 40));
        verbalScaled = Math.min(170, Math.max(130, base + vRoutingBonus));
      }

      // Section-level adaptive estimation for Quantitative (130-170)
      const rawQ = q1 + q2;
      let quantScaled = 130;
      if (rawQ === 27) {
        quantScaled = 170;
      } else if (rawQ > 0) {
        const qRoutingBonus = q1 >= 8 ? 2 : q1 <= 4 ? -2 : 0;
        const qBaseCurve: Record<number, number> = {
          1: 131, 2: 132, 3: 134, 4: 136, 5: 138,
          6: 139, 7: 141, 8: 143, 9: 144, 10: 146,
          11: 147, 12: 149, 13: 150, 14: 152, 15: 153,
          16: 155, 17: 157, 18: 158, 19: 160, 20: 161,
          21: 163, 22: 164, 23: 166, 24: 167, 25: 168,
          26: 169
        };
        const base = qBaseCurve[rawQ] ?? (130 + Math.round((rawQ / 27) * 40));
        quantScaled = Math.min(170, Math.max(130, base + qRoutingBonus));
      }

      const totalGre = verbalScaled + quantScaled;

      // Analytical Writing (optional, not included in 260-340 total)
      const awaInput = inputs.awa_score;
      const isAwaProvided = typeof awaInput === 'number' && !isNaN(awaInput) && awaInput >= 0;
      const awaVal = isAwaProvided ? Math.min(6, Math.max(0, awaInput)) : null;

      const subscores: SubScoreItem[] = [
        { label: 'Estimated Verbal Reasoning', value: `${verbalScaled} / 170` },
        { label: 'Estimated Quantitative Reasoning', value: `${quantScaled} / 170` }
      ];

      if (awaVal !== null) {
        subscores.push({
          label: 'Analytical Writing',
          value: `${awaVal.toFixed(1)} / 6`
        });
      }

      const summaryNote = awaVal !== null
        ? `Estimated GRE Score: ${totalGre} / 340 (Estimated Verbal Reasoning: ${verbalScaled} / 170, Estimated Quantitative Reasoning: ${quantScaled} / 170, Analytical Writing: ${awaVal.toFixed(1)} / 6).`
        : `Estimated GRE Score: ${totalGre} / 340 (Estimated Verbal Reasoning: ${verbalScaled} / 170, Estimated Quantitative Reasoning: ${quantScaled} / 170).`;

      return {
        mainScore: `${totalGre}`,
        mainScoreLabel: 'Estimated GRE Score',
        maxScore: 340,
        qualificationStatus: '',
        qualificationBadgeColor: 'blue',
        hideStatsGrid: true,
        isEstimated: true,
        summaryNote,
        subscores
      };
    },
    examSpecs: {
      totalDuration: '1 Hour 58 Minutes',
      totalQuestions: '54 Questions (27 Verbal, 27 Quant) + 1 Essay',
      scaleRange: '260 - 340 (plus 0-6.0 AWA)',
      nationalAverage: '304 (151 Verbal, 153 Quant)',
      structureNote: 'The shorter GRE features section-level adaptive testing across two Verbal and two Quantitative sections, plus one 30-minute Analytical Writing task. On-screen calculator available in Quant.',
      sections: [
        { name: 'Analytical Writing', questions: '1 Issue Task', time: '30 Minutes', weight: 'Scored Separately (0–6.0)' },
        { name: 'Verbal Reasoning – Section 1', questions: '12 Questions', time: '18 Minutes', weight: 'Part of 130–170 Scale' },
        { name: 'Verbal Reasoning – Section 2', questions: '15 Questions', time: '23 Minutes', weight: 'Part of 130–170 Scale' },
        { name: 'Quantitative Reasoning – Section 1', questions: '12 Questions', time: '21 Minutes', weight: 'Part of 130–170 Scale' },
        { name: 'Quantitative Reasoning – Section 2', questions: '15 Questions', time: '26 Minutes', weight: 'Part of 130–170 Scale' }
      ]
    },
    formulaExplanation: {
      title: 'Estimated GRE Scoring Methodology',
      steps: [
        'Verbal Reasoning consists of 27 questions across Section 1 (12 questions) and Section 2 (15 questions).',
        'Quantitative Reasoning consists of 27 questions across Section 1 (12 questions) and Section 2 (15 questions).',
        'The test adapts at the section level: Section 1 performance determines the difficulty of Section 2.',
        'Scaled scores for Verbal and Quantitative Reasoning range from 130 to 170 in 1-point increments.',
        'Estimated GRE Total is the sum of Estimated Verbal and Estimated Quant (260 to 340).',
        'Analytical Writing is scored independently from 0 to 6 and is not included in the 260–340 total.'
      ],
      rawToScaledNotes: 'The GRE is section-level adaptive and ETS does not publish a fixed raw-to-scaled conversion table. All calculated scores are estimates for self-study and practice.'
    },
    faqs: [
      {
        question: 'What is the maximum GRE score?',
        answer: 'The maximum Verbal score is 170, and the maximum Quantitative score is 170. So, the maximum combined GRE score is: 170 + 170 = 340'
      },
      {
        question: 'What is the minimum total GRE score?',
        answer: 'The minimum scaled score for both Verbal and Quantitative is 130. So, the minimum combined GRE score is: 130 + 130 = 260'
      },
      {
        question: "Does AWA count toward the GRE's 340 score?",
        answer: 'No. The AWA score is reported separately on a 0–6 scale. It is not added to the 340-point Verbal + Quantitative total.'
      },
      {
        question: 'How many questions are on the GRE?',
        answer: 'The GRE has 27 Verbal Reasoning questions and 27 Quantitative Reasoning questions. It also includes one Analytical Writing task.'
      }
    ],
    seoArticle: greSeoArticle,
    relatedCalculatorIds: ['gmat', 'lsat', 'mcat'],
    isPopular: true
  },
  {
    id: 'gmat',
    title: 'GMAT Score Calculator',
    shortName: 'GMAT Focus Edition',
    category: 'grad',
    categoryLabel: 'Graduate School',
    yearFormat: 'GMAT Focus Edition',
    seoTitle: 'GMAT Focus Edition Score Calculator 2027 | 205-805 Scaled Score',
    metaDescription: 'Calculate your GMAT Focus Edition score (205-805). Enter Quantitative Reasoning, Verbal Reasoning, and Data Insights sectional scores (60-90) for MBA percentiles.',
    overview: 'The GMAT Focus Edition consists of three equally weighted sections: Quantitative Reasoning (60-90), Verbal Reasoning (60-90), and Data Insights (60-90). Total scores range from 205 to 805 ending in 5. Calculate your estimated MBA percentile.',
    fields: [
      {
        id: 'quant_score',
        label: 'Quantitative Reasoning Scaled Score',
        sublabel: '21 questions in 45 minutes (scaled 60 to 90 in 1-point increments)',
        min: 60,
        max: 90,
        defaultValue: 83,
        unit: 'pts (60-90)'
      },
      {
        id: 'verbal_score',
        label: 'Verbal Reasoning Scaled Score',
        sublabel: '23 questions in 45 minutes (scaled 60 to 90 in 1-point increments)',
        min: 60,
        max: 90,
        defaultValue: 82,
        unit: 'pts (60-90)'
      },
      {
        id: 'di_score',
        label: 'Data Insights Scaled Score',
        sublabel: '20 questions in 45 minutes (scaled 60 to 90 in 1-point increments)',
        min: 60,
        max: 90,
        defaultValue: 80,
        unit: 'pts (60-90)'
      }
    ],
    calculate: (inputs) => {
      const q = Math.min(90, Math.max(60, inputs.quant_score || 60));
      const v = Math.min(90, Math.max(60, inputs.verbal_score || 60));
      const di = Math.min(90, Math.max(60, inputs.di_score || 60));

      // Formula for GMAT Focus Edition:
      // (Q + V + DI - 180) / 90 * 600 + 205 rounded to nearest multiple of 10 ending in 5
      const sum = q + v + di;
      const normalized = (sum - 180) / 90;
      let total = 205 + Math.round((normalized * 600) / 10) * 10;
      total = Math.min(805, Math.max(205, total));

      let status = 'Standard Business School';
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
      let percentile = '50th Percentile';

      if (total >= 695) {
        status = 'Elite Tier (M7 Business Schools - Stanford/Harvard/Wharton)';
        badgeColor = 'emerald';
        percentile = '98th - 99th+ Percentile';
      } else if (total >= 655) {
        status = 'Highly Competitive (Top 10 - 20 MBA Programs)';
        badgeColor = 'blue';
        percentile = '90th - 97th Percentile';
      } else if (total >= 605) {
        status = 'Competitive for Top 25 - 50 MBA Programs';
        badgeColor = 'amber';
        percentile = '75th - 89th Percentile';
      } else if (total >= 545) {
        status = 'Average Range (General MBA Admission)';
        badgeColor = 'amber';
        percentile = '50th - 74th Percentile';
      } else {
        status = 'Below Average';
        badgeColor = 'rose';
        percentile = 'Below 50th Percentile';
      }

      return {
        mainScore: total,
        mainScoreLabel: 'GMAT Focus Total Score',
        maxScore: 805,
        qualificationStatus: status,
        qualificationBadgeColor: badgeColor,
        percentileText: percentile,
        compositePoints: total,
        maxCompositePoints: 805,
        isEstimated: true,
        summaryNote: `Your projected GMAT Focus score is ${total} (Quant: ${q}, Verbal: ${v}, Data Insights: ${di}).`,
        subscores: [
          { label: 'Quantitative Reasoning', value: `${q} / 90` },
          { label: 'Verbal Reasoning', value: `${v} / 90` },
          { label: 'Data Insights', value: `${di} / 90` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '2 Hours 15 Minutes',
      totalQuestions: '64 Questions Total (21 Quant, 23 Verbal, 20 Data Insights)',
      scaleRange: '205 - 805 (ends in 5)',
      qualifyingScore: '545 (National Median)',
      nationalAverage: '546.0',
      structureNote: 'GMAT Focus Edition consists of 3 sections of 45 minutes each. All 3 sections are equally weighted into the Total Score. You may bookmark and edit up to 3 answers per section.',
      sections: [
        { name: 'Quantitative Reasoning', questions: '21 Questions', time: '45 Minutes', weight: '33.3% of Total' },
        { name: 'Verbal Reasoning', questions: '23 Questions', time: '45 Minutes', weight: '33.3% of Total' },
        { name: 'Data Insights', questions: '20 Questions', time: '45 Minutes', weight: '33.3% of Total' }
      ]
    },
    scoreScaleTable: [
      { score: '695 – 805', label: 'Top 2%', collegeCredit: 'M7 Business Schools (Stanford, HBS, Wharton)', typicalCutoff: '98th – 100th Percentile' },
      { score: '655 – 685', label: 'Top 10%', collegeCredit: 'Top 15 MBA Programs (Tuck, Haas, Yale)', typicalCutoff: '90th – 97th Percentile' },
      { score: '605 – 645', label: 'Top 25%', collegeCredit: 'Top 30 MBA Programs', typicalCutoff: '75th – 89th Percentile' },
      { score: '545 – 595', label: 'Median Range', collegeCredit: 'Standard Regional MBA Programs', typicalCutoff: '50th – 74th Percentile' },
      { score: '205 – 535', label: 'Below Median', collegeCredit: 'Target Score Improvement Recommended', typicalCutoff: 'Below 50th Percentile' }
    ],
    formulaExplanation: {
      title: 'GMAT Focus Edition Scoring Algorithm',
      steps: [
        'Each of the 3 sections is scored on a scale of 60 to 90 in 1-point increments.',
        'Data Insights contributes equally to your Total Score alongside Quant and Verbal.',
        'The Total Score ranges from 205 to 805 in 10-point intervals ending in 5.',
        'A 655 on GMAT Focus is equivalent to approximately 710 on the old 200-800 GMAT exam.'
      ],
      rawToScaledNotes: 'The GMAT Focus Edition question-adaptive algorithm penalizes unanswered questions heavily.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'M7 MBA Programs (Harvard, Stanford, Wharton)', scoreNeeded: '695 - 805', recommendation: 'Equivalent to 740-770+ on legacy GMAT.' },
        { target: 'Top 15 MBA Programs', scoreNeeded: '655 - 685', recommendation: 'Equivalent to 700-730 on legacy GMAT.' },
        { target: 'Top 30 MBA Programs', scoreNeeded: '615 - 645', recommendation: 'Solid foundation for scholarship consideration.' }
      ],
      strategicAdvice: 'Never leave questions blank: unanswered questions at the end of a section severely diminish your scaled score.'
    },
    faqs: [
      { question: 'Why do GMAT Focus scores end in 5?', answer: 'The Graduate Management Admission Council (GMAC) chose the 205-805 scale (ending in 5) specifically to distinguish Focus Edition scores from the legacy 200-800 scale.' },
      { question: 'Is Sentence Correction still tested on GMAT Focus?', answer: 'No. Sentence Correction and the Analytical Writing essay were completely eliminated. Verbal now focuses strictly on Reading Comprehension and Critical Reasoning.' }
    ],
    relatedCalculatorIds: ['gre', 'lsat', 'sat']
  },
  {
    id: 'lsat',
    title: 'LSAT Score Calculator',
    shortName: 'LSAT',
    category: 'grad',
    categoryLabel: 'Graduate School',
    yearFormat: '2027 LSAT Format (No Logic Games)',
    seoTitle: 'LSAT Score Calculator 2027 | Raw to Scaled Score (120-180)',
    metaDescription: 'Calculate your LSAT score for the 2027 exam without Logic Games. Enter raw scores across Logical Reasoning and Reading Comprehension to see your scaled score.',
    overview: 'The modern LSAT features two scored Logical Reasoning sections and one scored Reading Comprehension section (~75-76 total scored questions). Calculate your scaled score from 120 to 180 and Law School admissions tier.',
    fields: [
      {
        id: 'lr1_raw',
        label: 'Logical Reasoning Section 1: Raw Correct',
        sublabel: '25-26 questions (35 minutes)',
        min: 0,
        max: 26,
        defaultValue: 22,
        unit: '/ 26'
      },
      {
        id: 'lr2_raw',
        label: 'Logical Reasoning Section 2: Raw Correct',
        sublabel: '25-26 questions (35 minutes)',
        min: 0,
        max: 26,
        defaultValue: 21,
        unit: '/ 26'
      },
      {
        id: 'rc_raw',
        label: 'Reading Comprehension: Raw Correct',
        sublabel: '26-28 questions (35 minutes, 4 passage sets)',
        min: 0,
        max: 27,
        defaultValue: 22,
        unit: '/ 27'
      }
    ],
    calculate: (inputs) => {
      const lr1 = Math.min(26, Math.max(0, inputs.lr1_raw || 0));
      const lr2 = Math.min(26, Math.max(0, inputs.lr2_raw || 0));
      const rc = Math.min(27, Math.max(0, inputs.rc_raw || 0));
      const totalRaw = lr1 + lr2 + rc;
      const maxRaw = 79;

      // Real LSAT 120-180 curve approximation
      // ~73+ raw = 170+
      // ~65 raw = 164
      // ~58 raw = 160
      // ~45 raw = 152
      let lsatScore = 120;
      if (totalRaw >= 75) lsatScore = 178 + Math.min(2, totalRaw - 75);
      else if (totalRaw >= 72) lsatScore = 170 + Math.round((totalRaw - 72) * 2.3);
      else if (totalRaw >= 66) lsatScore = 165 + Math.round((totalRaw - 66) * 0.8);
      else if (totalRaw >= 58) lsatScore = 160 + Math.round((totalRaw - 58) * 0.6);
      else if (totalRaw >= 48) lsatScore = 153 + Math.round((totalRaw - 48) * 0.7);
      else if (totalRaw >= 35) lsatScore = 145 + Math.round((totalRaw - 35) * 0.6);
      else lsatScore = Math.min(145, Math.max(120, Math.round(120 + (totalRaw / 35) * 25)));

      lsatScore = Math.min(180, Math.max(120, lsatScore));

      let status = 'Standard Law School Admission';
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
      let percentile = '50th Percentile';

      if (lsatScore >= 170) {
        status = 'Top 2-3% (T14 Law Schools - Yale, Harvard, Stanford)';
        badgeColor = 'emerald';
        percentile = '97th - 99th+ Percentile';
      } else if (lsatScore >= 165) {
        status = 'Highly Competitive (Top 20-30 Law Schools)';
        badgeColor = 'blue';
        percentile = '90th - 96th Percentile';
      } else if (lsatScore >= 160) {
        status = 'Competitive for Tier 1 Law Schools (Top 50)';
        badgeColor = 'amber';
        percentile = '78th - 89th Percentile';
      } else if (lsatScore >= 152) {
        status = 'National Average Range';
        badgeColor = 'amber';
        percentile = '50th - 77th Percentile';
      } else {
        status = 'Below National Median';
        badgeColor = 'rose';
        percentile = 'Below 50th Percentile';
      }

      return {
        mainScore: lsatScore,
        mainScoreLabel: 'Estimated Scaled LSAT Score',
        maxScore: 180,
        qualificationStatus: status,
        qualificationBadgeColor: badgeColor,
        percentileText: percentile,
        compositePoints: lsatScore,
        maxCompositePoints: 180,
        isEstimated: true,
        summaryNote: `Your total raw score is ${totalRaw} / ${maxRaw} questions, yielding an estimated scaled score of ${lsatScore} / 180.`,
        subscores: [
          { label: 'Logical Reasoning 1 Correct', value: `${lr1} / 26` },
          { label: 'Logical Reasoning 2 Correct', value: `${lr2} / 26` },
          { label: 'Reading Comprehension Correct', value: `${rc} / 27` },
          { label: 'Total Raw Correct', value: `${totalRaw} / 79` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '2 Hours 20 Minutes (3 scored sections + 1 unscored experimental)',
      totalQuestions: '~75 - 79 Scored Questions',
      scaleRange: '120 - 180',
      qualifyingScore: '152 (National Median)',
      nationalAverage: '152 - 153',
      structureNote: 'Modern LSAT structure eliminates Analytical Reasoning (Logic Games). Contains 2 scored Logical Reasoning sections, 1 scored Reading Comprehension section, and 1 unscored experimental section.',
      sections: [
        { name: 'Logical Reasoning Section 1', questions: '25-26 Questions', time: '35 Minutes', weight: '33.3% of Score' },
        { name: 'Logical Reasoning Section 2', questions: '25-26 Questions', time: '35 Minutes', weight: '33.3% of Score' },
        { name: 'Reading Comprehension', questions: '26-28 Questions', time: '35 Minutes', weight: '33.3% of Score' }
      ]
    },
    scoreScaleTable: [
      { score: '170 – 180', label: 'Top 3%', collegeCredit: 'T14 Law Schools (Yale, Harvard, Columbia, NYU)', typicalCutoff: '97th – 99th+ Percentile' },
      { score: '165 – 169', label: 'Top 10%', collegeCredit: 'Top 20 – 30 Law Schools', typicalCutoff: '90th – 96th Percentile' },
      { score: '160 – 164', label: 'Top 20%', collegeCredit: 'Top 50 Law Schools & Strong Regional Programs', typicalCutoff: '78th – 89th Percentile' },
      { score: '152 – 159', label: 'National Median', collegeCredit: 'Accredited ABA Law Schools', typicalCutoff: '50th – 77th Percentile' },
      { score: '120 – 151', label: 'Below Median', collegeCredit: 'Substantial Retake Recommended', typicalCutoff: 'Below 50th Percentile' }
    ],
    formulaExplanation: {
      title: 'LSAT Raw-to-Scaled Score Conversion',
      steps: [
        'Each correct question on scored sections earns 1 raw point.',
        'Unscored experimental sections do not contribute to your raw score.',
        'Raw scores are mapped through the LSAC equating curve to the 120-180 scale.',
        'Every single raw point between 160 and 175 corresponds to significant percentile shifts.'
      ],
      rawToScaledNotes: 'There is no penalty for guessing on the LSAT.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'T14 Law Schools (Top 14)', scoreNeeded: '170 - 180', recommendation: 'Miss no more than 6-7 questions across the entire test.' },
        { target: 'Top 30 Law Schools', scoreNeeded: '165 - 169', recommendation: 'Target 22+ correct per section.' },
        { target: 'Top 50 Law Schools', scoreNeeded: '160 - 164', recommendation: 'Target 19+ correct per section.' }
      ],
      strategicAdvice: 'With Logic Games gone, Logical Reasoning now constitutes two-thirds of the entire LSAT score.'
    },
    faqs: [
      { question: 'Are Logic Games still on the LSAT?', answer: 'No! The Law School Admission Council (LSAC) permanently retired Analytical Reasoning (Logic Games). The exam now consists of two scored Logical Reasoning sections and one Reading Comprehension section.' },
      { question: 'What raw score is needed for a 170 on the LSAT?', answer: 'Typically, a raw score of approximately 72-73 out of 78-79 questions is required for a 170.' }
    ],
    relatedCalculatorIds: ['gre', 'gmat', 'sat']
  },
  {
    id: 'mcat',
    title: 'MCAT Score Calculator',
    shortName: 'MCAT',
    category: 'grad',
    categoryLabel: 'Graduate School',
    yearFormat: '2027 MCAT Format',
    seoTitle: 'MCAT Score Calculator 2027 | Calculate 472-528 Scaled Score',
    metaDescription: 'Free MCAT score calculator. Enter raw or sectional scores across Chemical/Physical, CARS, Biological/Biochemical, and Psychological/Social to calculate composite score (472-528).',
    overview: 'The MCAT features four scored sections: Chemical & Physical Foundations (118-132), CARS (118-132), Biological & Biochemical Foundations (118-132), and Psychological & Social Foundations (118-132) totaling a 472-528 composite score.',
    fields: [
      {
        id: 'cp_raw',
        label: 'Chemical and Physical Foundations: Questions Correct',
        sublabel: '59 questions in 95 minutes (scaled 118 to 132)',
        min: 0,
        max: 59,
        defaultValue: 48,
        unit: '/ 59'
      },
      {
        id: 'cars_raw',
        label: 'Critical Analysis and Reasoning Skills (CARS): Questions Correct',
        sublabel: '53 questions in 90 minutes (scaled 118 to 132)',
        min: 0,
        max: 53,
        defaultValue: 43,
        unit: '/ 53'
      },
      {
        id: 'bb_raw',
        label: 'Biological and Biochemical Foundations: Questions Correct',
        sublabel: '59 questions in 95 minutes (scaled 118 to 132)',
        min: 0,
        max: 59,
        defaultValue: 50,
        unit: '/ 59'
      },
      {
        id: 'ps_raw',
        label: 'Psychological, Social, and Biological Foundations: Questions Correct',
        sublabel: '59 questions in 95 minutes (scaled 118 to 132)',
        min: 0,
        max: 59,
        defaultValue: 51,
        unit: '/ 59'
      }
    ],
    calculate: (inputs) => {
      const cp = Math.min(59, Math.max(0, inputs.cp_raw || 0));
      const cars = Math.min(53, Math.max(0, inputs.cars_raw || 0));
      const bb = Math.min(59, Math.max(0, inputs.bb_raw || 0));
      const ps = Math.min(59, Math.max(0, inputs.ps_raw || 0));

      // Scaling curve: 118 to 132
      const cpScale = Math.min(132, Math.max(118, Math.round(118 + (cp / 59) * 14)));
      const carsScale = Math.min(132, Math.max(118, Math.round(118 + (cars / 53) * 14)));
      const bbScale = Math.min(132, Math.max(118, Math.round(118 + (bb / 59) * 14)));
      const psScale = Math.min(132, Math.max(118, Math.round(118 + (ps / 59) * 14)));

      const totalMcat = cpScale + carsScale + bbScale + psScale;

      let status = 'Medical School Baseline';
      let badgeColor: 'emerald' | 'blue' | 'amber' | 'rose' = 'rose';
      let percentile = '50th Percentile';

      if (totalMcat >= 518) {
        status = 'Top 4% (Highly Competitive for Top 20 Medical Schools)';
        badgeColor = 'emerald';
        percentile = '96th - 99th+ Percentile';
      } else if (totalMcat >= 512) {
        status = 'Competitive for MD Allopathic Medical Schools';
        badgeColor = 'blue';
        percentile = '85th - 95th Percentile';
      } else if (totalMcat >= 505) {
        status = 'Competitive for DO & Many State MD Programs';
        badgeColor = 'amber';
        percentile = '65th - 84th Percentile';
      } else if (totalMcat >= 500) {
        status = 'National Median (DO Program Range)';
        badgeColor = 'amber';
        percentile = '50th - 64th Percentile';
      } else {
        status = 'Below National Median';
        badgeColor = 'rose';
        percentile = 'Below 50th Percentile';
      }

      return {
        mainScore: totalMcat,
        mainScoreLabel: 'Total Scaled MCAT Score',
        maxScore: 528,
        qualificationStatus: status,
        qualificationBadgeColor: badgeColor,
        percentileText: percentile,
        compositePoints: totalMcat,
        maxCompositePoints: 528,
        isEstimated: true,
        summaryNote: `Your total projected MCAT score is ${totalMcat} / 528. Chem/Phys: ${cpScale}, CARS: ${carsScale}, Bio/Biochem: ${bbScale}, Psych/Soc: ${psScale}.`,
        subscores: [
          { label: 'Chemical & Physical Foundations', value: `${cpScale} / 132` },
          { label: 'Critical Analysis (CARS)', value: `${carsScale} / 132` },
          { label: 'Biological & Biochemical Foundations', value: `${bbScale} / 132` },
          { label: 'Psychological & Social Foundations', value: `${psScale} / 132` }
        ]
      };
    },
    examSpecs: {
      totalDuration: '7 Hours 30 Minutes (including optional breaks)',
      totalQuestions: '230 Questions Total (59 CP, 53 CARS, 59 BB, 59 PS)',
      scaleRange: '472 - 528',
      qualifyingScore: '501.5 (National Median)',
      nationalAverage: '501.5 (Matriculant Avg: ~511.7)',
      structureNote: 'Administered by the AAMC. Four 95-minute science sections and one 90-minute CARS section. Periodic table is provided in Chem/Phys section.',
      sections: [
        { name: 'Chemical and Physical Foundations', questions: '59 Questions', time: '95 Minutes', weight: '118 - 132 Scale' },
        { name: 'Critical Analysis and Reasoning Skills (CARS)', questions: '53 Questions', time: '90 Minutes', weight: '118 - 132 Scale' },
        { name: 'Biological and Biochemical Foundations', questions: '59 Questions', time: '95 Minutes', weight: '118 - 132 Scale' },
        { name: 'Psychological, Social, and Biological Foundations', questions: '59 Questions', time: '95 Minutes', weight: '118 - 132 Scale' }
      ]
    },
    scoreScaleTable: [
      { score: '518 – 528', label: 'Top 4%', collegeCredit: 'Top 20 MD Medical Schools (Johns Hopkins, Harvard, UCSF)', typicalCutoff: '96th – 100th Percentile' },
      { score: '512 – 517', label: 'Top 15%', collegeCredit: 'Competitive MD Allopathic Medical Schools', typicalCutoff: '85th – 95th Percentile' },
      { score: '505 – 511', label: 'Top 35%', collegeCredit: 'Competitive for DO & Many In-State MD Programs', typicalCutoff: '65th – 84th Percentile' },
      { score: '500 – 504', label: 'National Median', collegeCredit: 'Osteopathic (DO) Medical School Range', typicalCutoff: '50th – 64th Percentile' },
      { score: '472 – 499', label: 'Below Median', collegeCredit: 'Retake Strongly Recommended', typicalCutoff: 'Below 50th Percentile' }
    ],
    formulaExplanation: {
      title: 'MCAT 472-528 Scoring System',
      steps: [
        'Count raw correct answers across each of the 4 sections.',
        'AAMC converts each raw score to a scaled score between 118 and 132.',
        'The Total Score is the exact sum of the four section scores (4 * 118 = 472 minimum; 4 * 132 = 528 maximum; midpoint is 500).',
        'No guessing penalty exists on the MCAT.'
      ],
      rawToScaledNotes: 'CARS contains no outside knowledge questions; all answers must be justified strictly from the passage text.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Top 20 MD Programs', scoreNeeded: '518 - 528', recommendation: 'Requires 129+ across all four sections.' },
        { target: 'Allopathic (MD) Matriculant Average', scoreNeeded: '511 - 512', recommendation: 'Requires ~128 in each section.' },
        { target: 'Osteopathic (DO) Matriculant Average', scoreNeeded: '504 - 506', recommendation: 'Requires ~126 in each section.' }
      ],
      strategicAdvice: 'Daily timed CARS passage practice is essential, as CARS score variance has the highest correlation with overall admission success.'
    },
    faqs: [
      { question: 'What is a good MCAT score for medical school?', answer: 'The national median is around 501.5. However, the average for successful matriculants to MD schools is approximately 511-512, with top 20 programs averaging 518+.' },
      { question: 'Are calculators allowed on the MCAT?', answer: 'No. No calculators of any kind are permitted on any section of the MCAT. Scientific calculations on Chem/Phys must be done via mental math and scientific notation.' }
    ],
    relatedCalculatorIds: ['gre', 'ap-biology', 'ap-chemistry', 'ap-psychology'],
    isPopular: true
  }
];
