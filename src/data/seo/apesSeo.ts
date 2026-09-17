import { SeoArticle } from '../../types';

export const apesSeoArticle: SeoArticle = {
  calculatorId: 'ap-environmental-science',
  title: 'APES Score Calculator',
  tableOfContents: [
    { id: 'what-is', label: 'What is the APES Score Calculator?' },
    { id: 'exam-structure', label: 'Exam Structure & Section Specifications' },
    { id: 'how-it-works', label: 'How Does the APES Score Calculator Work?' },
    { id: 'score-ranges', label: 'Estimated APES Score Ranges' },
    { id: 'score-distributions', label: 'APES Score Distributions' },
    { id: 'faqs', label: 'Frequently Asked Questions' }
  ],
  blocks: [
    // 1. What is the APES Score Calculator?
    {
      type: 'h2',
      id: 'what-is',
      title: 'What is the APES Score Calculator?'
    },
    {
      type: 'paragraphs',
      texts: [
        'The APES Score Calculator is a free online tool that helps you estimate your AP Environmental Science score based on your performance in the multiple-choice and free-response sections of the exam.',
        'The calculator uses the current College Board exam structure: 80 multiple-choice questions worth 60% of the exam score and 3 free-response questions worth 40%.',
        'The College Board does not publish a permanent raw score to AP score conversion table, the result from this APES score calculator should be treated as an estimate rather than an official AP score.'
      ]
    },

    // 2. Exam Structure & Section Specifications
    {
      type: 'h2',
      id: 'exam-structure',
      title: 'Exam Structure & Section Specifications'
    },
    {
      type: 'paragraph',
      text: 'To understand your AP Environmental Science score, it helps to know how the exam is divided, how much time you get for each section, and how much each section counts toward your final score.'
    },
    {
      type: 'table',
      id: 'exam-structure-table',
      data: {
        headers: ['Section', 'Number of Questions', 'Time Allotted', 'Weighting'],
        rows: [
          ['Section I: Multiple Choice', '80 Questions', '90 Minutes', '60% of Total'],
          ['Section II: Free Response', '3 Questions (30 pts)', '70 Minutes', '40% of Total']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'Note: Scientific or graphing calculators are permitted on both Section I and Section II of the APES exam.'
    },

    // 3. How Does the APES Score Calculator Work?
    {
      type: 'h2',
      id: 'how-it-works',
      title: 'How Does the APES Score Calculator Work?'
    },
    {
      type: 'paragraph',
      text: 'The APES exam consists of two main sections that contribute to your composite score:'
    },
    {
      type: 'bulletList',
      items: [
        'Section I: Multiple-Choice Questions (MCQ)',
        'Section II: Free-Response Questions (FRQ)'
      ]
    },
    {
      type: 'h3',
      title: 'Section I: Multiple-Choice Questions'
    },
    {
      type: 'paragraphs',
      texts: [
        'The multiple-choice section consists of 80 questions to be completed in 90 minutes. This section makes up 60% of your total exam score.',
        'Your raw correct answers are converted to a weighted score out of 60 using the following formula:'
      ]
    },
    {
      type: 'formula',
      title: '',
      formula: 'Estimated MCQ Score = (Correct Answers ÷ 80) × 60'
    },
    {
      type: 'h3',
      title: 'Section II: Free-Response Questions'
    },
    {
      type: 'paragraphs',
      texts: [
        'The free-response section contains 3 questions to be completed in 70 minutes. Each question is scored out of 10 points (30 total raw points) and accounts for 40% of your overall score:'
      ]
    },
    {
      type: 'bulletList',
      items: [
        'Question 1: Design an Investigation',
        'Question 2: Analyze an Environmental Problem and Propose a Solution',
        'Question 3: Analyze Problem & Propose Solution with Calculations'
      ]
    },
    {
      type: 'paragraph',
      text: 'Your raw FRQ points are converted into a weighted score out of 40 using:'
    },
    {
      type: 'formula',
      title: '',
      formula: 'Estimated FRQ Score = (Total FRQ Points ÷ 30) × 40'
    },
    {
      type: 'h3',
      title: 'APES Composite Score'
    },
    {
      type: 'paragraph',
      text: 'Now the calculator adds your weighted MCQ and FRQ scores together to determine your composite score out of 100:'
    },
    {
      type: 'formula',
      title: '',
      formula: 'Composite Score = MCQ Score + FRQ Score'
    },
    {
      type: 'paragraph',
      text: 'Now, your composite score is compared with the estimated score ranges used by this calculator to give you a predicted AP score from 1 to 5.'
    },

    // 4. Estimated APES Score Ranges
    {
      type: 'h2',
      id: 'score-ranges',
      title: 'Estimated APES Score Ranges'
    },
    {
      type: 'paragraph',
      text: 'The composite score ranges below are used to estimate your final AP Environmental Science score from 1 to 5:'
    },
    {
      type: 'table',
      id: 'score-ranges-table',
      data: {
        headers: ['AP Score', 'Estimated Composite Cutoff', 'Qualification Meaning'],
        rows: [
          ['5', '71 – 100', 'Extremely Well Qualified'],
          ['4', '58 – 70', 'Well Qualified'],
          ['3', '46 – 57', 'Qualified (College Credit Eligible)'],
          ['2', '33 – 45', 'Possibly Qualified'],
          ['1', '0 – 32', 'No Recommendation']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'These score ranges are estimates used by this calculator. They are not official College Board cutoffs.  '
    },

    // 5. APES Score Distributions
    {
      type: 'h2',
      id: 'score-distributions',
      title: 'APES Score Distributions'
    },
    {
      type: 'paragraph',
      text: 'The official APES score distribution shows the percentage of students earning each score level:'
    },
    {
      type: 'table',
      id: 'score-distribution-table',
      data: {
        headers: ['AP Score', '% of Students'],
        rows: [
          ['5', '13%'],
          ['4', '29%'],
          ['3', '27%'],
          ['2', '15%'],
          ['1', '16%']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'In 2026, 69% of students earned a score of 3 or higher on the APES.'
    },

    // 6. Frequently Asked Questions
    {
      type: 'h2',
      id: 'faqs',
      title: 'Frequently Asked Questions'
    },
    {
      type: 'faqs',
      items: [
        {
          question: 'Is APES an easy exam?',
          answer:
            'APES can be easier than some other AP science exams, but it still need preparation. How easy or difficult is depends on how well you understand the topics and how much you practice multiple-choice and free-response questions.'
        },
        {
          question: 'How many questions are on the APES exam?',
          answer:
            'The AP Environmental Science exam has 80 multiple-choice questions and 3 free-response questions.'
        },
        {
          question: 'How much is the APES multiple-choice section worth?',
          answer:
            'The multiple-choice section is worth 60% of the total AP Environmental Science exam score and contains 80 questions.'
        },
        {
          question: 'How much is the APES FRQ section worth?',
          answer:
            'The free-response section is worth 40% of the total exam score and contains 3 questions. Students have 70 minutes to complete it.'
        },        
        {
          question: 'How is the APES exam scored?',
          answer:
            'The APES exam has two sections: 80 multiple-choice questions worth 60% of your score and 3 free-response questions worth 40%. Your performance in both sections is combined to determine your final AP score from 1 to 5.'
        }
      ]
    }
  ]
};
