import { CalculatorConfig, CalculatorResult } from '../../types';

export const standardizedNewCalculators: CalculatorConfig[] = [
  // 1. IELTS Score Calculator
  {
    id: 'ielts',
    title: 'IELTS Score Calculator',
    shortName: 'IELTS Band Calculator',
    category: 'standardized',
    categoryLabel: 'Standardized Tests',
    yearFormat: '2027 Band Scale',
    seoTitle: 'IELTS Score Calculator (2027) | Calculate Overall Band Score',
    metaDescription: 'Calculate your official IELTS Overall Band Score (0-9) from Listening, Reading, Writing, and Speaking component band scores using official rounding rules.',
    overview: 'Calculate your official IELTS Overall Band Score. IELTS (International English Language Testing System) measures English language proficiency on a 9-band scale across four communicative skills: Listening, Reading, Writing, and Speaking.',
    cardDescription: 'Calculate your official IELTS overall band score with British Council / IDP rounding rules.',
    fields: [
      {
        id: 'listening',
        label: 'Listening Band Score',
        sublabel: 'Band score from 0.0 to 9.0 (half-bands permitted)',
        min: 0,
        max: 9,
        defaultValue: 7.5
      },
      {
        id: 'reading',
        label: 'Reading Band Score',
        sublabel: 'Band score from 0.0 to 9.0 (half-bands permitted)',
        min: 0,
        max: 9,
        defaultValue: 7.0
      },
      {
        id: 'writing',
        label: 'Writing Band Score',
        sublabel: 'Band score from 0.0 to 9.0 (half-bands permitted)',
        min: 0,
        max: 9,
        defaultValue: 6.5
      },
      {
        id: 'speaking',
        label: 'Speaking Band Score',
        sublabel: 'Band score from 0.0 to 9.0 (half-bands permitted)',
        min: 0,
        max: 9,
        defaultValue: 7.0
      }
    ],
    calculate: (inputs: Record<string, number>): CalculatorResult => {
      const listening = Math.max(0, Math.min(9, inputs.listening ?? 7.5));
      const reading = Math.max(0, Math.min(9, inputs.reading ?? 7.0));
      const writing = Math.max(0, Math.min(9, inputs.writing ?? 6.5));
      const speaking = Math.max(0, Math.min(9, inputs.speaking ?? 7.0));

      const rawAverage = (listening + reading + writing + speaking) / 4;

      // Official IELTS Rounding Rules:
      // If the average ends in .25 -> round up to next half band (.5)
      // If the average ends in .75 -> round up to next whole band
      // If < .25 -> round down to whole band
      // If >= .25 and < .75 -> round to .5
      // Mathematically: round(rawAverage * 2) / 2
      // e.g. 6.125 -> 6.0; 6.25 -> 6.5; 6.625 -> 6.5; 6.75 -> 7.0
      const fraction = rawAverage - Math.floor(rawAverage);
      let roundedBand = Math.floor(rawAverage);

      if (fraction < 0.25) {
        roundedBand = Math.floor(rawAverage);
      } else if (fraction < 0.75) {
        roundedBand = Math.floor(rawAverage) + 0.5;
      } else {
        roundedBand = Math.floor(rawAverage) + 1.0;
      }

      roundedBand = Math.min(9, Math.max(0, roundedBand));

      let status = 'Modest / Limited User';
      let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';
      let cefr = 'B1 (Intermediate)';

      if (roundedBand >= 8.5) {
        status = 'Expert User';
        badgeColor = 'emerald';
        cefr = 'C2 (Mastery)';
      } else if (roundedBand >= 7.5) {
        status = 'Very Good User';
        badgeColor = 'emerald';
        cefr = 'C1 (Advanced)';
      } else if (roundedBand >= 6.5) {
        status = 'Good User (University Standard)';
        badgeColor = 'blue';
        cefr = 'B2 (Vantage)';
      } else if (roundedBand >= 5.5) {
        status = 'Competent User';
        badgeColor = 'amber';
        cefr = 'B2/B1 Threshold';
      }

      return {
        mainScore: roundedBand,
        mainScoreLabel: 'Overall Band Score',
        maxScore: 9,
        qualificationStatus: status,
        qualificationBadgeColor: badgeColor,
        percentileText: `CEFR Level: ${cefr}`,
        compositePoints: Math.round(rawAverage * 100) / 100,
        maxCompositePoints: 9,
        isEstimated: false,
        subscores: [
          { label: 'Raw Component Average', value: `${rawAverage.toFixed(2)}` },
          { label: 'CEFR Equivalent Level', value: cefr },
          { label: 'Official Rounded Band', value: `Band ${roundedBand.toFixed(1)}` }
        ],
        summaryNote: `Your 4 skills average ${rawAverage.toFixed(2)}, which officially rounds to Band ${roundedBand.toFixed(1)} (${status}). A Band 6.5 - 7.0 satisfies admission requirements at most global top-100 universities.`
      };
    },
    examSpecs: {
      totalDuration: '2 Hours 45 Minutes',
      totalQuestions: '4 Subtests (Listening, Reading, Writing, Speaking)',
      scaleRange: '0.0 - 9.0 Band Scale',
      qualifyingScore: '6.5+ for most Master’s/Undergrad Admissions',
      nationalAverage: '6.2 Average Global Band Score',
      structureNote: 'Administered by British Council, IDP: IELTS Australia, and Cambridge English.',
      sections: [
        { name: 'Listening', questions: '40 Questions (4 Recorded Sections)', time: '30 Minutes (+10 min transfer)', weight: '25%' },
        { name: 'Reading', questions: '40 Questions (3 Academic Passages)', time: '60 Minutes', weight: '25%' },
        { name: 'Writing', questions: 'Task 1 (Report/Letter) & Task 2 (Essay)', time: '60 Minutes', weight: '25%' },
        { name: 'Speaking', questions: '3-Part Face-to-Face or Video Interview', time: '11 - 14 Minutes', weight: '25%' }
      ]
    },
    scoreScaleTable: [
      { score: '9.0', label: 'Expert User', collegeCredit: 'Full operational command of English; complete fluency and precision', typicalCutoff: 'Average 8.75 - 9.00' },
      { score: '8.0 - 8.5', label: 'Very Good User', collegeCredit: 'Handles complex detailed argumentation; occasional unsystematic inaccuracies', typicalCutoff: 'Average 7.75 - 8.625' },
      { score: '7.0 - 7.5', label: 'Good User', collegeCredit: 'Meets competitive admissions requirements (Oxford, Cambridge, Harvard, Ivy League)', typicalCutoff: 'Average 6.75 - 7.625' },
      { score: '6.0 - 6.5', label: 'Competent User', collegeCredit: 'Standard undergraduate and postgraduate university admission threshold', typicalCutoff: 'Average 5.75 - 6.625' },
      { score: '5.0 - 5.5', label: 'Modest User', collegeCredit: 'Foundation program or conditional pathway entry', typicalCutoff: 'Average 4.75 - 5.625' }
    ],
    formulaExplanation: {
      title: 'Official British Council / IDP IELTS Rounding Algorithm',
      steps: [
        'Calculate the unrounded arithmetic mean: (Listening + Reading + Writing + Speaking) / 4.',
        'If the fractional part is less than 0.25, round down to the previous whole band (e.g. 6.125 becomes 6.0).',
        'If the fractional part is between 0.25 and 0.74, round to the half band (e.g. 6.25 becomes 6.5; 6.625 becomes 6.5).',
        'If the fractional part is 0.75 or greater, round up to the next whole band (e.g. 6.75 becomes 7.0).'
      ],
      rawToScaledNotes: 'The rounding algorithm favors students at .25 and .75 boundaries, always rounding upwards to the next interval.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Band 8.0 - 9.0', scoreNeeded: 'Average 7.75+', recommendation: 'Near-native fluency with advanced lexical resource and precise cohesive devices in Writing Task 2.' },
        { target: 'Band 7.0 - 7.5', scoreNeeded: 'Average 6.75+', recommendation: 'Secure 30+/40 on Reading and Listening and practice structured paragraphing in Writing.' },
        { target: 'Band 6.5', scoreNeeded: 'Average 6.25+', recommendation: 'Qualifies for almost all direct degree admissions in the UK, Canada, Australia, and USA.' }
      ],
      strategicAdvice: 'Writing Task 2 carries double the weight of Writing Task 1. Allocate 40 minutes to Task 2 and 20 minutes to Task 1.'
    },
    faqs: [
      { question: 'How is the IELTS Overall Band Score rounded?', answer: 'The arithmetic average of the four subscores is calculated. If the result ends in .25, it rounds up to .5; if it ends in .75, it rounds up to the next whole band.' },
      { question: 'What is the validity period of an IELTS score?', answer: 'IELTS Test Report Forms (TRFs) are valid for 2 years from the test date.' },
      { question: 'Is IELTS Academic different from General Training?', answer: 'Listening and Speaking are identical. Reading and Writing tasks in Academic focus on university study, while General Training uses everyday workplace and social texts.' }
    ],
    relatedCalculatorIds: ['pte', 'toefl', 'sat', 'act'],

    // ─── Custom SEO article: exact 6-section hierarchy ───────────────────────
    seoArticle: {
      calculatorId: 'ielts',
      title: 'IELTS Score Calculator',
      tableOfContents: [
        { id: 'what-is-ielts-score-calculator', label: 'What is IELTS Score Calculator?' },
        { id: 'ielts-exam-structure', label: 'IELTS Exam Structure & Section Specifications' },
        { id: 'how-does-ielts-calculator-work', label: 'How Does the IELTS Score Calculator Work?' },
        { id: 'ielts-band-score-chart', label: 'IELTS Band Score Chart' },
        { id: 'ielts-listening-reading-conversion', label: 'IELTS Listening & Reading Score Conversion' },
        { id: 'faqs', label: 'Frequently Asked Questions' }
      ],
      blocks: [
        // ── Section 1: What is IELTS Score Calculator? ──────────────────────
        {
          type: 'h2',
          id: 'what-is-ielts-score-calculator',
          title: 'What is IELTS Score Calculator?'
        },
        {
          type: 'paragraphs',
          texts: [
            'The IELTS Score Calculator is a free online tool that computes your official IELTS Overall Band Score from the four component band scores — Listening, Reading, Writing, and Speaking — using the exact rounding algorithm published by the British Council, IDP: IELTS Australia, and Cambridge English.',
            'IELTS (International English Language Testing System) is the world\'s most popular English language proficiency test, accepted by more than 11,000 organisations in 140+ countries, including universities, employers, immigration authorities, and professional bodies. Scores are reported on a 9-band scale (0 – 9), where each band corresponds to a defined level of English language competence ranging from Non-User (Band 0) to Expert User (Band 9).',
            'Use this calculator during your preparation to instantly simulate how changes in individual section scores affect your overall band, identify which skill needs the most improvement, and verify the rounding outcome before your test date.'
          ]
        },

        // ── Section 2: IELTS Exam Structure & Section Specifications ─────────
        {
          type: 'h2',
          id: 'ielts-exam-structure',
          title: 'IELTS Exam Structure & Section Specifications'
        },
        {
          type: 'paragraph',
          text: 'To maximise your composite band score, understanding the time allocation, question distribution, and section weighting of the IELTS Score Calculator is essential:'
        },
        {
          type: 'table',
          id: 'exam-structure-table',
          data: {
            headers: ['Section Name', 'Number of Questions', 'Time Allotted', 'Weighting in Total Score'],
            rows: [
              ['Listening', '40 Questions (4 Recorded Sections)', '30 Minutes (+10 min transfer)', '25%'],
              ['Reading', '40 Questions (3 Academic Passages)', '60 Minutes', '25%'],
              ['Writing', 'Task 1 (Report/Letter) & Task 2 (Essay)', '60 Minutes', '25%'],
              ['Speaking', '3-Part Face-to-Face or Video Interview', '11 - 14 Minutes', '25%']
            ]
          }
        },
        {
          type: 'paragraph',
          text: '*Note on Format: Administered by British Council, IDP: IELTS Australia, and Cambridge English.'
        },

        // ── Section 3: How Does the IELTS Score Calculator Work? ─────────────
        {
          type: 'h2',
          id: 'how-does-ielts-calculator-work',
          title: 'How Does the IELTS Score Calculator Work?'
        },
        {
          type: 'paragraph',
          text: 'Our calculator computes your overall band score by combining your four section band scores using the exact official weighting methodology established for the IELTS Band Calculator:'
        },
        {
          type: 'orderedList',
          items: [
            'Calculate the unrounded arithmetic mean: (Listening + Reading + Writing + Speaking) / 4.',
            'If the fractional part is less than 0.25, round down to the previous whole band (e.g. 6.125 becomes 6.0).',
            'If the fractional part is between 0.25 and 0.74, round to the half band (e.g. 6.25 becomes 6.5; 6.625 becomes 6.5).',
            'If the fractional part is 0.75 or greater, round up to the next whole band (e.g. 6.75 becomes 7.0).'
          ]
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Important Scoring Policy',
          text: 'The rounding algorithm favors students at .25 and .75 boundaries, always rounding upwards to the next interval.'
        },

        // ── Section 4: IELTS Band Score Chart ────────────────────────────────
        {
          type: 'h2',
          id: 'ielts-band-score-chart',
          title: 'IELTS Band Score Chart'
        },
        {
          type: 'paragraph',
          text: 'These band score ranges are calibrated based on the official IELTS descriptor framework published by Cambridge English. Each band corresponds to a CEFR level and a defined set of university and immigration admission thresholds:'
        },
        {
          type: 'table',
          id: 'band-score-chart-table',
          data: {
            headers: ['Band Score', 'User Level', 'Estimated Component Average Needed'],
            rows: [
              ['9.0', 'Expert User', 'Average 8.75 – 9.00'],
              ['8.0 – 8.5', 'Very Good User', 'Average 7.75 – 8.625'],
              ['7.0 – 7.5', 'Good User', 'Average 6.75 – 7.625'],
              ['6.0 – 6.5', 'Competent User', 'Average 5.75 – 6.625'],
              ['5.0 – 5.5', 'Modest User', 'Average 4.75 – 5.625']
            ]
          }
        },

        // ── Section 5: IELTS Listening & Reading Score Conversion ─────────────
        {
          type: 'h2',
          id: 'ielts-listening-reading-conversion',
          title: 'IELTS Listening & Reading Score Conversion'
        },
        {
          type: 'paragraph',
          text: 'Listening and Reading are each marked out of 40 raw points. The raw correct-answer count is converted to a band score using the official conversion tables published by Cambridge English. Use the table below to look up your band score from your raw practice score:'
        },
        {
          type: 'table',
          id: 'listening-reading-conversion-table',
          data: {
            headers: ['Raw Score (out of 40)', 'Listening Band', 'Academic Reading Band', 'General Training Reading Band'],
            rows: [
              ['39 – 40', '9.0', '9.0', '9.0'],
              ['37 – 38', '8.5', '8.5', '8.5'],
              ['35 – 36', '8.0', '8.0', '8.0'],
              ['32 – 34', '7.5', '7.5', '7.5'],
              ['30 – 31', '7.0', '7.0', '7.0'],
              ['26 – 29', '6.5', '6.5', '6.5'],
              ['23 – 25', '6.0', '6.0', '6.0'],
              ['18 – 22', '5.5', '5.5', '5.5'],
              ['16 – 17', '5.0', '5.0', '5.0'],
              ['13 – 15', '4.5', '4.5', '4.5'],
              ['10 – 12', '4.0', '4.0', '4.0'],
              ['8 – 9', '3.5', '3.5', '3.5'],
              ['6 – 7', '3.0', '3.0', '3.0'],
              ['4 – 5', '2.5', '2.5', '2.5']
            ]
          }
        },
        {
          type: 'callout',
          variant: 'note',
          title: 'Note',
          text: 'Exact conversion bands may vary slightly by test date due to statistical equating. The table above reflects the standard published conversion ranges. Writing and Speaking band scores are assessed holistically by certified examiners and do not follow a raw-to-band conversion table.'
        },

        // ── Section 6: Frequently Asked Questions ────────────────────────────
        {
          type: 'h2',
          id: 'faqs',
          title: 'Frequently Asked Questions'
        },
        {
          type: 'faqs',
          items: [
            { question: 'How is the IELTS Overall Band Score rounded?', answer: 'The arithmetic average of the four subscores is calculated. If the result ends in .25, it rounds up to .5; if it ends in .75, it rounds up to the next whole band.' },
            { question: 'What is the validity period of an IELTS score?', answer: 'IELTS Test Report Forms (TRFs) are valid for 2 years from the test date.' },
            { question: 'Is IELTS Academic different from General Training?', answer: 'Listening and Speaking are identical. Reading and Writing tasks in Academic focus on university study, while General Training uses everyday workplace and social texts.' }
          ]
        }
      ]
    }
  },

  // 2. PTE Academic Score Calculator
  {
    id: 'pte',
    title: 'PTE Score Calculator',
    shortName: 'PTE Score Calculator',
    category: 'standardized',
    categoryLabel: 'Standardized Tests',
    yearFormat: '2027 Concordance Scale',
    seoTitle: 'PTE Academic Score Calculator (2027) | Pearson Score Converter',
    metaDescription: 'Calculate your PTE Academic Overall Score (10-90) from Speaking & Writing, Reading, and Listening communicative skills with IELTS concordance.',
    overview: 'Calculate your PTE Academic overall score. PTE Academic (Pearson Test of English) measures academic English proficiency on a scale of 10 to 90 using Pearson’s AI automated scoring engine.',
    cardDescription: 'Calculate your PTE Academic overall score (10-90) and view IELTS score equivalents.',
    fields: [
      {
        id: 'speaking',
        label: 'Speaking Skill Score',
        sublabel: 'Raw/communicative score (10 - 90)',
        min: 10,
        max: 90,
        defaultValue: 68
      },
      {
        id: 'writing',
        label: 'Writing Skill Score',
        sublabel: 'Raw/communicative score (10 - 90)',
        min: 10,
        max: 90,
        defaultValue: 65
      },
      {
        id: 'reading',
        label: 'Reading Skill Score',
        sublabel: 'Raw/communicative score (10 - 90)',
        min: 10,
        max: 90,
        defaultValue: 64
      },
      {
        id: 'listening',
        label: 'Listening Skill Score',
        sublabel: 'Raw/communicative score (10 - 90)',
        min: 10,
        max: 90,
        defaultValue: 67
      }
    ],
    calculate: (inputs: Record<string, number>): CalculatorResult => {
      const speaking = Math.max(10, Math.min(90, inputs.speaking ?? 68));
      const writing = Math.max(10, Math.min(90, inputs.writing ?? 65));
      const reading = Math.max(10, Math.min(90, inputs.reading ?? 64));
      const listening = Math.max(10, Math.min(90, inputs.listening ?? 67));

      // PTE overall score is an integrated algorithm reflecting all four communicative skills
      // Standard approximation is the weighted harmonic/arithmetic average of communicative skill scores
      const overall = Math.round((speaking + writing + reading + listening) / 4);

      let status = 'Limited Communicative Competence';
      let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';
      let ieltsEquiv = 'Band 5.0 - 5.5';

      if (overall >= 79) {
        status = 'Superior English (Australia / NZ PR Max Points)';
        badgeColor = 'emerald';
        ieltsEquiv = 'Band 8.0 - 9.0';
      } else if (overall >= 65) {
        status = 'Proficient English (Direct University Admission)';
        badgeColor = 'emerald';
        ieltsEquiv = 'Band 7.0 - 7.5';
      } else if (overall >= 58) {
        status = 'Competent English (Undergraduate Standard)';
        badgeColor = 'blue';
        ieltsEquiv = 'Band 6.5';
      } else if (overall >= 50) {
        status = 'Vocational English';
        badgeColor = 'amber';
        ieltsEquiv = 'Band 6.0';
      }

      return {
        mainScore: overall,
        mainScoreLabel: 'Overall PTE Academic Score',
        maxScore: 90,
        qualificationStatus: status,
        qualificationBadgeColor: badgeColor,
        percentileText: `IELTS Equivalent: ${ieltsEquiv}`,
        compositePoints: overall,
        maxCompositePoints: 90,
        isEstimated: false,
        subscores: [
          { label: 'Speaking & Writing Skills', value: `${Math.round((speaking + writing) / 2)} / 90` },
          { label: 'Reading & Listening Skills', value: `${Math.round((reading + listening) / 2)} / 90` },
          { label: 'IELTS Band Concordance', value: ieltsEquiv }
        ],
        summaryNote: `Your overall PTE score of ${overall}/90 corresponds to an IELTS ${ieltsEquiv}. A score of 65+ meets direct university entry requirements and confers 10 immigration points in Australia.`
      };
    },
    examSpecs: {
      totalDuration: '2 Hours (Single Computer Session)',
      totalQuestions: '20 Question Types across 3 Parts',
      scaleRange: '10 - 90 Points Scale (Global Scale of English)',
      qualifyingScore: '58+ (IELTS 6.5 equivalent) / 65+ (IELTS 7.0 equivalent)',
      nationalAverage: '61 Average PTE Score',
      structureNote: 'Integrated multi-skill scoring: integrated tasks contribute to both speaking/reading or listening/writing.',
      sections: [
        { name: 'Part 1: Speaking & Writing', questions: 'Personal intro, Read aloud, Repeat sentence, Describe image, Retell lecture, Answer short question, Summarize written text, Write essay', time: '54 - 67 Minutes', weight: 'Integrated' },
        { name: 'Part 2: Reading', questions: 'Reading & writing fill in the blanks, Multiple choice, Re-order paragraphs, Reading fill in the blanks', time: '29 - 30 Minutes', weight: 'Integrated' },
        { name: 'Part 3: Listening', questions: 'Summarize spoken text, Multiple choice, Fill in the blanks, Highlight correct summary, Select missing word, Highlight incorrect words, Write from dictation', time: '30 - 43 Minutes', weight: 'Integrated' }
      ]
    },
    scoreScaleTable: [
      { score: '84 - 90', label: 'Expert Fluency', collegeCredit: 'Equivalent to IELTS 9.0 / CEFR C2. Fulfills all Ivy League and Oxbridge standards.', typicalCutoff: '84 - 90 points' },
      { score: '76 - 83', label: 'Superior English', collegeCredit: 'Equivalent to IELTS 8.0. Maximum 20 English points for Australian Skilled Migration.', typicalCutoff: '76 - 83 points' },
      { score: '66 - 75', label: 'Proficient English', collegeCredit: 'Equivalent to IELTS 7.0 - 7.5. Standard requirement for Medicine, Law, and MBA degrees.', typicalCutoff: '66 - 75 points' },
      { score: '56 - 65', label: 'Competent English', collegeCredit: 'Equivalent to IELTS 6.5. Accepted by 99% of global universities for undergraduate entry.', typicalCutoff: '56 - 65 points' },
      { score: '46 - 55', label: 'Vocational English', collegeCredit: 'Equivalent to IELTS 5.5 - 6.0. Pathway and foundation level.', typicalCutoff: '46 - 55 points' }
    ],
    formulaExplanation: {
      title: 'PTE Academic Global Scale of English (GSE) Algorithm',
      steps: [
        'PTE uses integrated scoring: tasks like "Read Aloud" give points to both Speaking and Reading.',
        '"Write from Dictation" and "Summarize Spoken Text" contribute heavily to both Listening and Writing.',
        'Communicative skills (Listening, Reading, Speaking, Writing) are calibrated on the 10-90 GSE scale.',
        'The overall score is a holistic composite calibrated by Pearson’s machine learning scoring algorithm.'
      ],
      rawToScaledNotes: 'Fluency and pronunciation in Speaking are graded by machine speech recognizers; maintaining a consistent pace without self-correction is critical.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'PTE 79+ (IELTS 8.0)', scoreNeeded: '79 in all 4 communicative skills', recommendation: 'Flawless performance in Write from Dictation, Repeat Sentence, and Read Aloud.' },
        { target: 'PTE 65+ (IELTS 7.0)', scoreNeeded: '65 in all 4 communicative skills', recommendation: 'Consistent oral fluency and accurate spelling on written summaries.' },
        { target: 'PTE 58+ (IELTS 6.5)', scoreNeeded: '58 in all 4 communicative skills', recommendation: 'Strong reading comprehension and basic essay template structure.' }
      ],
      strategicAdvice: 'Write from Dictation is the single highest-yielding task on the entire PTE exam, contributing up to 30+ points across Listening and Writing.'
    },
    faqs: [
      { question: 'What is the concordance between PTE and IELTS?', answer: 'PTE 58 ≈ IELTS 6.5; PTE 65 ≈ IELTS 7.0; PTE 79 ≈ IELTS 8.0; PTE 84+ ≈ IELTS 8.5-9.0.' },
      { question: 'How quickly are PTE results released?', answer: 'PTE Academic results are typically available within 48 hours (often within 24 hours) because the test is scored automatically by AI.' },
      { question: 'Is PTE accepted for Australian and UK Visas?', answer: 'Yes, PTE Academic is accepted for 100% of Australian and New Zealand visa applications and for all UK student and work visas (PTE Academic UKVI).' }
    ],
    relatedCalculatorIds: ['ielts', 'toefl', 'sat', 'act']
  },

  // 3. PSAT / NMSQT Score Calculator
  {
  id: 'psat',
  title: 'PSAT Score Calculator',
  shortName: 'PSAT / NMSQT Calculator',
  category: 'standardized',
  categoryLabel: 'Standardized Tests',
  yearFormat: '2027 Digital PSAT',

  seoTitle: 'PSAT Score Calculator 2027: Calculate Your PSAT Score',
  metaDescription:
    'Free PSAT Score Calculator 2027 to calculate your PSAT/NMSQT score and National Merit Selection Index. Free and easy to use.',

  overview:
    'Calculate your PSAT/NMSQT score using your Reading and Writing and Math scores. Enter your section scores to get your total score out of 1520 and National Merit Selection Index out of 228.',

  cardDescription:
    'Calculate your PSAT/NMSQT score (320-1520) and National Merit Selection Index (48-228).',

  fields: [
    {
      id: 'rwScore',
      label: 'Reading and Writing Scaled Score',
      sublabel: 'Official section score from 160 to 760',
      min: 160,
      max: 760,
      defaultValue: 680
    },
    {
      id: 'mathScore',
      label: 'Math Scaled Score',
      sublabel: 'Official section score from 160 to 760',
      min: 160,
      max: 760,
      defaultValue: 700
    }
  ],

  calculate: (inputs: Record<string, number>): CalculatorResult => {
    const rw = Math.max(
      160,
      Math.min(760, Number(inputs.rwScore ?? 680))
    );

    const math = Math.max(
      160,
      Math.min(760, Number(inputs.mathScore ?? 700))
    );

    // PSAT/NMSQT Total Score
    // Reading and Writing + Math
    const total = rw + math;

    // National Merit Selection Index
    // (2 × Reading and Writing + Math) ÷ 10
    const selectionIndex = Math.round(
      ((2 * rw) + math) / 10
    );

    // 11th-grade College Board readiness benchmarks
    const benchmarkMet = rw >= 460 && math >= 510;

    const status = benchmarkMet
      ? 'College Readiness Benchmark Met'
      : 'Below College Readiness Benchmark';

    const badgeColor: CalculatorResult['qualificationBadgeColor'] =
      benchmarkMet ? 'emerald' : 'blue';

    return {
      mainScore: total,
      mainScoreLabel: 'PSAT/NMSQT Total Score',
      maxScore: 1520,

      qualificationStatus: status,
      qualificationBadgeColor: badgeColor,

      // Percentile is not calculated from a custom formula.
      percentileText: 'See College Board percentile',

      compositePoints: selectionIndex,
      maxCompositePoints: 228,

      // The calculator performs exact arithmetic on
      // the scaled scores entered by the user.
      isEstimated: false,

      subscores: [
        {
          label: 'Reading & Writing Section',
          value: `${rw} / 760`
        },
        {
          label: 'Math Section',
          value: `${math} / 760`
        },
        {
          label: 'National Merit Selection Index',
          value: `${selectionIndex} / 228`
        },
        {
          label: 'College Readiness Benchmark',
          value: benchmarkMet
            ? '11th Grade Benchmark Met'
            : '11th Grade Benchmark Not Met'
        }
      ],

      summaryNote:
        `Your PSAT/NMSQT Total Score is ${total}/1520. ` +
        `Your National Merit Selection Index is ${selectionIndex}/228. ` +
        `The Selection Index is calculated by doubling your Reading and Writing score, ` +
        `adding your Math score, and dividing the result by 10.`
    };
  },

  examSpecs: {
    totalDuration: '2 Hours 14 Minutes',

    totalQuestions:
      '98 Questions (54 Reading & Writing + 44 Math)',

    scaleRange:
      '320 - 1520 Total (160 - 760 per section)',

    qualifyingScore:
      'National Merit qualification varies by year and state and is determined by NMSC.',

    nationalAverage:
      '-',

    structureNote:
      'The digital PSAT/NMSQT has two sections, Reading and Writing and Math. Each section contains two adaptive modules. The PSAT/NMSQT is used for National Merit Scholarship Program consideration when taken under the program eligibility requirements.',

    sections: [
      {
        name: 'Reading and Writing',
        questions: '54 Questions (2 Modules of 27)',
        time: '64 Minutes (32 Minutes per Module)',
        weight: '160 - 760 Section Score'
      },
      {
        name: 'Math',
        questions: '44 Questions (2 Modules of 22)',
        time: '70 Minutes (35 Minutes per Module)',
        weight: '160 - 760 Section Score'
      }
    ]
  },

  formulaExplanation: {
    title: 'National Merit Selection Index Formula',

    steps: [
      'Add your Reading and Writing score to your Math score to get your PSAT/NMSQT Total Score',
      'Multiply your Reading and Writing score by 2.',
      'Add your Math score to the doubled Reading and Writing score.',
      'Divide the result by 10 to get your National Merit Selection Index.'
        ],

    rawToScaledNotes:
      'This calculator uses the official Reading and Writing and Math scaled scores reported by College Board. It does not convert raw correct answers into scaled scores because the digital PSAT/NMSQT uses adaptive testing and College Board does not publish one universal raw-to-scaled conversion formula.'
  },

  faqs: [
    {
      question: 'What is the PSAT/NMSQT score range?',
      answer:
        'The PSAT/NMSQT Total Score ranges from 320 to 1520. Reading and Writing and Math are each scored from 160 to 760.'
    },

    {
      question: 'How is the National Merit Selection Index calculated?',
      answer:
        'The Selection Index is calculated by doubling the Reading and Writing score, adding the Math score, and dividing the result by 10. The Selection Index ranges from 48 to 228.'
    },

    {
      question: 'What are the PSAT/NMSQT college readiness benchmarks?',
      answer:
        'For 11th grade, the College Board benchmarks are 460 for Reading and Writing and 510 for Math. For 10th grade, the benchmarks are 430 for Reading and Writing and 480 for Math.'
    },

    {
      question: 'What is the difference between the PSAT/NMSQT and PSAT 10?',
      answer:
        'The PSAT/NMSQT and PSAT 10 use the same 320-1520 Total Score scale and 160-760 section score ranges. The PSAT/NMSQT is the assessment associated with the National Merit Scholarship Program when taken under the program eligibility requirements.'
    }
  ],

  relatedCalculatorIds: [
    'sat',
    'act',
    'gpa',
    'cumulative-gpa'
  ]
},

  // 4. 5e Point Buy Calculator
  {
    id: '5e-point-buy',
    title: '5e Point Buy Calculator',
    shortName: '5e Point Buy',
    category: 'academic',
    categoryLabel: 'Academic Tools',
    yearFormat: '5th Edition Rules',
    seoTitle: '5e Point Buy Calculator (2027) | D&D Ability Score Optimizer',
    metaDescription: 'Optimize your D&D 5e character ability scores with this 27-point buy calculator. Computes remaining points, modifiers, and racial bonuses.',
    overview: 'Calculate and customize your character ability scores using the official Dungeons & Dragons 5th Edition 27-point buy system. Set Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma within rules-as-written constraints.',
    cardDescription: 'Calculate and optimize your D&D 5e character ability scores using 27 point-buy.',
    fields: [
      {
        id: 'str',
        label: 'Strength (STR)',
        sublabel: 'Base score between 8 and 15',
        min: 8,
        max: 15,
        defaultValue: 15
      },
      {
        id: 'dex',
        label: 'Dexterity (DEX)',
        sublabel: 'Base score between 8 and 15',
        min: 8,
        max: 15,
        defaultValue: 14
      },
      {
        id: 'con',
        label: 'Constitution (CON)',
        sublabel: 'Base score between 8 and 15',
        min: 8,
        max: 15,
        defaultValue: 13
      },
      {
        id: 'int',
        label: 'Intelligence (INT)',
        sublabel: 'Base score between 8 and 15',
        min: 8,
        max: 15,
        defaultValue: 10
      },
      {
        id: 'wis',
        label: 'Wisdom (WIS)',
        sublabel: 'Base score between 8 and 15',
        min: 8,
        max: 15,
        defaultValue: 12
      },
      {
        id: 'cha',
        label: 'Charisma (CHA)',
        sublabel: 'Base score between 8 and 15',
        min: 8,
        max: 15,
        defaultValue: 8
      }
    ],
    calculate: (inputs: Record<string, number>): CalculatorResult => {
      const costs: Record<number, number> = {
        8: 0,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 5,
        14: 7,
        15: 9
      };

      const getVal = (val: number | undefined) => Math.max(8, Math.min(15, Math.round(val ?? 8)));

      const str = getVal(inputs.str ?? 15);
      const dex = getVal(inputs.dex ?? 14);
      const con = getVal(inputs.con ?? 13);
      const int = getVal(inputs.int ?? 10);
      const wis = getVal(inputs.wis ?? 12);
      const cha = getVal(inputs.cha ?? 8);

      const totalCost = (costs[str] || 0) + (costs[dex] || 0) + (costs[con] || 0) + (costs[int] || 0) + (costs[wis] || 0) + (costs[cha] || 0);
      const remainingPoints = 27 - totalCost;

      const getMod = (score: number) => {
        const mod = Math.floor((score - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
      };

      let status = 'Valid 27-Point Character Build';
      let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'emerald';

      if (remainingPoints < 0) {
        status = `Over Budget by ${Math.abs(remainingPoints)} Points`;
        badgeColor = 'rose';
      } else if (remainingPoints > 0) {
        status = `${remainingPoints} Points Unspent`;
        badgeColor = 'amber';
      }

      return {
        mainScore: totalCost,
        mainScoreLabel: 'Total Points Spent',
        maxScore: 27,
        qualificationStatus: status,
        qualificationBadgeColor: badgeColor,
        percentileText: remainingPoints === 0 ? 'Optimal Build' : `${remainingPoints} Pts Left`,
        compositePoints: remainingPoints,
        maxCompositePoints: 27,
        isEstimated: false,
        subscores: [
          { label: 'STR Modifier', value: `${str} (${getMod(str)}) [Cost: ${costs[str]}]` },
          { label: 'DEX Modifier', value: `${dex} (${getMod(dex)}) [Cost: ${costs[dex]}]` },
          { label: 'CON Modifier', value: `${con} (${getMod(con)}) [Cost: ${costs[con]}]` },
          { label: 'INT Modifier', value: `${int} (${getMod(int)}) [Cost: ${costs[int]}]` },
          { label: 'WIS Modifier', value: `${wis} (${getMod(wis)}) [Cost: ${costs[wis]}]` },
          { label: 'CHA Modifier', value: `${cha} (${getMod(cha)}) [Cost: ${costs[cha]}]` },
          { label: 'Points Remaining', value: `${remainingPoints} / 27 pts` }
        ],
        summaryNote: `You have spent ${totalCost} of 27 point-buy points (${remainingPoints >= 0 ? `${remainingPoints} remaining` : `${Math.abs(remainingPoints)} points over limit`}). Ability modifiers are calculated as floor((Score - 10) / 2).`
      };
    },
    examSpecs: {
      totalDuration: 'Standard Character Creation Rules',
      totalQuestions: '6 Ability Attributes (STR, DEX, CON, INT, WIS, CHA)',
      scaleRange: '8 - 15 Base Ability Score (27 Total Budget)',
      qualifyingScore: 'Exact 27/27 Points Spent',
      nationalAverage: 'Standard Array Equivalent: 15, 14, 13, 12, 10, 8',
      structureNote: 'Before applying species/racial bonuses (+2 / +1) or feats.',
      sections: [
        { name: 'Physical Attributes', questions: 'Strength, Dexterity, Constitution', time: 'N/A', weight: 'Point Budget' },
        { name: 'Mental Attributes', questions: 'Intelligence, Wisdom, Charisma', time: 'N/A', weight: 'Point Budget' }
      ]
    },
    scoreScaleTable: [
      { score: '15 Base', label: 'Cost: 9 Points', collegeCredit: '+2 Modifier (+3 or +4 with species bonus)', typicalCutoff: 'Max Base Score' },
      { score: '14 Base', label: 'Cost: 7 Points', collegeCredit: '+2 Modifier', typicalCutoff: 'High Score' },
      { score: '13 Base', label: 'Cost: 5 Points', collegeCredit: '+1 Modifier (primes for odd-score half-feats)', typicalCutoff: 'Good Score' },
      { score: '12 Base', label: 'Cost: 4 Points', collegeCredit: '+1 Modifier', typicalCutoff: 'Solid Secondary' },
      { score: '10 Base', label: 'Cost: 2 Points', collegeCredit: '+0 Modifier (average human baseline)', typicalCutoff: 'Neutral' },
      { score: '8 Base', label: 'Cost: 0 Points', collegeCredit: '-1 Modifier (standard dump stat)', typicalCutoff: 'Minimum Allowed' }
    ],
    formulaExplanation: {
      title: 'D&D 5e Point Buy Mechanics',
      steps: [
        'Every character begins with an 8 in all six ability scores at zero point cost.',
        'Scores from 8 through 13 cost 1 point per increase (e.g. 9 costs 1, 10 costs 2, up to 13 costing 5).',
        'Scores of 14 and 15 cost 2 points per increase (14 costs 7 points, 15 costs 9 points).',
        'Spend exactly 27 points across the 6 scores without exceeding 15 or dropping below 8 before species traits.'
      ],
      rawToScaledNotes: 'Ability modifier formula: Modifier = Math.floor((Ability Score - 10) / 2).'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Min-Max Specialist', scoreNeeded: '15, 15, 15, 8, 8, 8', recommendation: 'Consumes exactly 9 + 9 + 9 = 27 points. Maximizes three primary stats at the cost of three dump stats.' },
        { target: 'Standard Array', scoreNeeded: '15, 14, 13, 12, 10, 8', recommendation: 'Consumes exactly 9 + 7 + 5 + 4 + 2 + 0 = 27 points. Balanced and versatile.' },
        { target: 'Well-Rounded', scoreNeeded: '14, 14, 12, 12, 11, 10', recommendation: 'Consumes 7 + 7 + 4 + 4 + 3 + 2 = 27 points. Avoids any negative modifiers.' }
      ],
      strategicAdvice: 'Combine a base 15 with your +2 racial/background bonus to achieve an optimal starting primary attribute of 17.'
    },
    faqs: [
      { question: 'Can I purchase a 16 with point buy in 5e?', answer: 'No. The standard 5e point buy rules restrict base attribute purchases between 8 and 15. You reach 16 or 17 by applying your species / background bonus (+2 or +1).' },
      { question: 'What is the point cost table?', answer: '8: 0 pts, 9: 1 pt, 10: 2 pts, 11: 3 pts, 12: 4 pts, 13: 5 pts, 14: 7 pts, 15: 9 pts.' },
      { question: 'Can I drop an ability score below 8 for extra points?', answer: 'Official 5e rules-as-written do not allow buying below 8, though some Dungeon Masters allow custom homebrew house rules.' }
    ],
    relatedCalculatorIds: ['gpa', 'cumulative-gpa', 'marks-percentage', 'semester-grade']
  }
];
