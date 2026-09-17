import { SeoArticle } from '../../types';

export const greSeoArticle: SeoArticle = {
  calculatorId: 'gre',
  title: 'GRE Score Calculator',
  tableOfContents: [
    { id: 'what-is', label: 'What is a GRE Score Calculator?' },
    { id: 'how-to-use', label: 'How to Use a GRE Score Calculator?' },
    { id: 'exam-structure', label: 'Exam Structure & Section Specifications' },
    { id: 'how-it-works', label: 'How Does the GRE Score Calculator Work?' },
    { id: 'scoring-scale', label: 'Official GRE General Test Scoring Scale' },
    { id: 'faqs', label: 'Frequently Asked Questions (FAQ)' }
  ],
  blocks: [
    // 1. What is a GRE Score Calculator?
    {
      type: 'h2',
      id: 'what-is',
      title: 'What is a GRE Score Calculator?'
    },
    {
      type: 'paragraphs',
      texts: [
        'A GRE Score Calculator is an online tool that gives you an estimated GRE score based on your practice test results.',
        'All you need to do is enter the number of questions you answered correctly in the Verbal and Quantitative sections. The calculator then gives you an estimated scaled score based on your performance.',
        'The GRE total score is made up of your Verbal and Quantitative scores:'
      ]
    },
    {
      type: 'formula',
      title: 'GRE Total Score',
      formula: 'Verbal Score + Quantitative Score = GRE Total Score'
    },
    {
      type: 'paragraphs',
      texts: [
        'The AWA score is not added to this total. Your Analytical Writing score is reported separately.',
        'A GRE Score Calculator is useful when you are taking practice tests because it lets you quickly see what your current score could look like.'
      ]
    },

    // 2. How to Use a GRE Score Calculator?
    {
      type: 'h2',
      id: 'how-to-use',
      title: 'How to Use a GRE Score Calculator?'
    },
    {
      type: 'paragraph',
      text: 'Using a GRE Score Calculator is simple:'
    },
    {
      type: 'h3',
      title: 'Step 1: Enter your Verbal Section 1 score'
    },
    {
      type: 'paragraph',
      text: 'The first Verbal Reasoning section has 12 questions. Enter the number of questions you answered correctly.'
    },
    {
      type: 'h3',
      title: 'Step 2: Enter your Verbal Section 2 score'
    },
    {
      type: 'paragraph',
      text: 'The second Verbal Reasoning section has 15 questions. Enter the number of correct answers.'
    },
    {
      type: 'h3',
      title: 'Step 3: Enter your Quant Section 1 score'
    },
    {
      type: 'paragraph',
      text: 'The first Quantitative Reasoning section has 12 questions. Enter the number of questions you answered correctly.'
    },
    {
      type: 'h3',
      title: 'Step 4: Enter your Quant Section 2 score'
    },
    {
      type: 'paragraph',
      text: 'The second Quantitative Reasoning section has 15 questions. Enter your correct answers.'
    },
    {
      type: 'h3',
      title: 'Step 5: Add your AWA score'
    },
    {
      type: 'paragraph',
      text: 'If you have a practice score for Analytical Writing, you can enter it separately. The AWA score ranges from 0 to 6.'
    },
    {
      type: 'paragraph',
      text: 'Once you enter your scores, the calculator will automatically show your estimated GRE score.'
    },

    // 3. Exam Structure & Section Specifications
    {
      type: 'h2',
      id: 'exam-structure',
      title: 'Exam Structure & Section Specifications'
    },
    {
      type: 'paragraph',
      text: 'The current GRE General Test consists of Verbal Reasoning, Quantitative Reasoning, and Analytical Writing. Both Verbal and Quantitative Reasoning are section-level adaptive.'
    },
    {
      type: 'table',
      id: 'exam-structure-table',
      data: {
        headers: ['Section', 'Part 1', 'Part 2', 'Total', 'Total Time'],
        rows: [
          ['Verbal Reasoning', '12 Questions – 18 min', '15 Questions – 23 min', '27 Questions', '41 min'],
          ['Quantitative Reasoning', '12 Questions – 21 min', '15 Questions – 26 min', '27 Questions', '47 min'],
          ['Analytical Writing', '1 Analyze an Issue Task – 30 min', '—', '1 Task', '30 min']
        ]
      }
    },

    // 4. How Does the GRE Score Calculator Work?
    {
      type: 'h2',
      id: 'how-it-works',
      title: 'How Does the GRE Score Calculator Work?'
    },
    {
      type: 'paragraphs',
      texts: [
        'The GRE General Test uses section-level adaptive testing for Verbal Reasoning and Quantitative Reasoning. In simple terms, your performance in the first section helps determine the difficulty of the second section.',
        'The calculator uses your correct answers from Section 1 and Section 2 to estimate your scaled GRE score.'
      ]
    },
    {
      type: 'h3',
      title: 'Estimated Verbal Reasoning Score'
    },
    {
      type: 'paragraphs',
      texts: [
        'You answer 12 questions in Verbal Section 1 and 15 questions in Section 2.',
        'The calculator looks at your correct answers in both sections and uses an adaptive scoring model to estimate your Verbal Reasoning score on the 130–170 scale.'
      ]
    },
    {
      type: 'h3',
      title: 'Estimated Quantitative Reasoning Score'
    },
    {
      type: 'paragraphs',
      texts: [
        'Quantitative Reasoning also has 12 questions in Section 1 and 15 questions in Section 2.',
        'The calculator uses your correct answers from both sections to estimate your Quantitative Reasoning score on the 130–170 scale.'
      ]
    },
    {
      type: 'h3',
      title: 'Estimated Total GRE Score'
    },
    {
      type: 'paragraph',
      text: 'Your total GRE score is based only on your Verbal and Quantitative scores. Adding these two scores gives you a total between 260 and 340.'
    },
    {
      type: 'formula',
      title: 'Estimated GRE Total Formula',
      formula: 'Estimated GRE Score = Estimated Verbal Score + Estimated Quant Score'
    },
    {
      type: 'paragraph',
      text: 'Note: Analytical Writing (AWA) is scored separately on a 0–6 scale. It is not added to the 260–340 Verbal + Quantitative total.'
    },

    // 5. Official GRE General Test Scoring Scale
    {
      type: 'h2',
      id: 'scoring-scale',
      title: 'Official GRE General Test Scoring Scale'
    },
    {
      type: 'paragraph',
      text: 'According to the official ETS scoring scale:'
    },
    {
      type: 'table',
      id: 'scoring-scale-table',
      data: {
        headers: ['GRE Section', 'Official Score Range'],
        rows: [
          ['Verbal Reasoning', '130–170'],
          ['Quantitative Reasoning', '130–170'],
          ['Analytical Writing', '0–6']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'Verbal and Quantitative scores are reported in 1-point increments, while Analytical Writing scores are reported in 0.5-point increments.'
    },

    // 6. Frequently Asked Questions (FAQ)
    {
      type: 'h2',
      id: 'faqs',
      title: 'Frequently Asked Questions (FAQ)'
    },
    {
      type: 'faqs',
      items: [
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
      ]
    }
  ]
};
