import { SeoArticle } from '../../types';

export const apCsaSeoArticle: SeoArticle = {
  calculatorId: 'ap-computer-science-a',
  title: 'AP CSA Score Calculator',
  tableOfContents: [
    { id: 'what-is', label: 'What is the AP CSA Score Calculator?' },
    { id: 'how-to-use', label: 'How to Use the AP CSA Score Calculator' },
    { id: 'exam-structure', label: 'Exam Structure & Section Specifications' },
    { id: 'how-it-works', label: 'How Does the AP CSA Score Calculator Work?' },
    { id: 'score-ranges', label: 'Estimated AP CSA Score Ranges' },
    { id: 'score-distributions', label: 'AP CSA Score Distributions' },
    { id: 'faqs', label: 'Frequently Asked Questions' }
  ],
  blocks: [
    // 1. What is the AP CSA Score Calculator?
    {
      type: 'h2',
      id: 'what-is',
      title: 'What is AP CSA Score Calculator?'
    },
    {
      type: 'paragraphs',
      texts: [
        'The AP CSA Score Calculator is a free tool that helps you estimate your AP Computer Science A score. Simply enter your MCQ and FRQ scores to see your composite score out of 100.',
        'For the 2027 AP CSA exam, the 42 multiple-choice questions make up 55% of the score, while the 4 free-response questions make up the remaining 45%. The calculator combines both sections based on these weightings to calculate your score on a 100-point scale.',
        'Keep in mind that the result is only an estimate and is not an official College Board score. Your final AP score is determined by the College Board.'
      ]
    },

    // 2. How to Use the AP CSA Score Calculator
    {
      type: 'h2',
      id: 'how-to-use',
      title: 'How to Use the AP CSA Score Calculator'
    },
    {
      type: 'paragraph',
      text: "It's quite simple to use AP CSA Score Calculator. Just follow these steps:"
    },
    {
      type: 'orderedList',
      items: [
        'Enter your correct MCQs – The AP CSA exam has 42 multiple-choice questions. Enter the number of questions you answered correctly.',
        'Enter your FRQ points – The Free-Response section has 4 questions worth 25 raw points in total. Enter your score for each question.',
        'Check your result – The calculator combines your MCQ and FRQ scores using the 55% / 45% weighting and shows your estimated AP score from 1 to 5 and composite score out of 100.'
      ]
    },

    // 3. Exam Structure & Section Specifications
    {
      type: 'h2',
      id: 'exam-structure',
      title: 'Exam Structure & Section Specifications'
    },
    {
      type: 'paragraph',
      text: 'To understand your AP Computer Science A score, it helps to know how the exam is divided, how much time you get, and how each section is weighted.'
    },
    {
      type: 'table',
      id: 'exam-structure-table',
      data: {
        headers: ['Section Name', 'Number of Questions', 'Time Allotted', 'Weighting in Total Score'],
        rows: [
          ['Section I: Multiple Choice', '42 Questions', '90 Minutes', '55% of Total'],
          ['Section II: Free Response', '4 Questions (25 raw points)', '90 Minutes', '45% of Total']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'Note: The 2027 AP CSA exam is fully digital in Bluebook.'
    },

    // 4. How Does the AP CSA Score Calculator Work?
    {
      type: 'h2',
      id: 'how-it-works',
      title: 'How Does the AP CSA Score Calculator Work?'
    },
    {
      type: 'paragraph',
      text: 'The AP Computer Science A exam has two main sections:'
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
        'The AP CSA multiple-choice section has 42 questions, and you get 90 minutes to complete it. This section makes up 55% of your total exam score.',
        'Your correct answers are converted to a score out of 55 using this formula:'
      ]
    },
    {
      type: 'formula',
      title: 'MCQ Scoring Formula',
      formula: 'Estimated MCQ Score = (Correct Answers ÷ 42) × 55'
    },
    {
      type: 'h3',
      title: 'Section II: Free-Response Questions'
    },
    {
      type: 'paragraphs',
      texts: [
        'The free-response section has 4 questions, with 90 minutes (1 hour 30 minutes) to complete them.',
      ]
    },
    {
      type: 'bulletList',
      items: [
        'Question 1: Methods and Control Structures - 7 points',
        'Question 2: Class Design - 7 points',
        'Question 3: Data Analysis with ArrayList - 5 points',
        'Question 4: 2D Array - 6 points',
        'Total: 25 raw points'
      ]
    },
    {
      type: 'paragraph',
      text: 'The calculator converts your FRQ points into a score out of 45 using:'
    },
    {
      type: 'formula',
      title: 'FRQ Scoring Formula',
      formula: 'Estimated FRQ Score = (FRQ Raw Points ÷ 25) × 45'
    },
    {
      type: 'h3',
      title: 'AP CSA Composite Score'
    },
    {
      type: 'paragraph',
      text: 'The calculator adds your weighted MCQ and FRQ scores to get your composite score out of 100.'
    },
    {
      type: 'formula',
      title: 'Composite Score Formula',
      formula: 'Composite Score = MCQ Score + FRQ Score'
    },
    {
      type: 'paragraph',
      text: 'Your composite score is then compared with the score ranges used by the calculator to give you an estimated AP score from 1 to 5.'
    },

    // 5. Estimated AP CSA Score Ranges
    {
      type: 'h2',
      id: 'score-ranges',
      title: 'Estimated AP CSA Score Ranges'
    },
    {
      type: 'paragraph',
      text: 'The score ranges below are used to convert your composite score into an estimated AP score from 1 to 5.'
    },
    {
      type: 'table',
      id: 'composite-cutoffs-table',
      data: {
        headers: ['AP Score', 'Estimated Cutoff', 'Qualification Meaning'],
        rows: [
          ['5', '80–100', 'Extremely well qualified'],
          ['4', '65–79', 'Well qualified'],
          ['3', '50–64', 'Qualified'],
          ['2', '35–49', 'Possibly qualified'],
          ['1', '0–34', 'No qualification']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'These score ranges are estimates used by this calculator and may differ from the official score boundaries set by the College Board.'
    },

    // 6. AP CSA Score Distributions
    {
      type: 'h2',
      id: 'score-distributions',
      title: 'AP CSA Score Distributions'
    },
    {
      type: 'paragraph',
      text: 'The AP Computer Science A score distribution for 2026 was:'
    },
    {
      type: 'table',
      id: 'score-distribution-table',
      data: {
        headers: ['AP Score', '% of Students'],
        rows: [
          ['5', '25%'],
          ['4', '26%'],
          ['3', '15%'],
          ['2', '11%'],
          ['1', '23%']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'In 2026, 66% of students scored 3 or higher.'
    },

    // 7. Frequently Asked Questions
    {
      type: 'h2',
      id: 'faqs',
      title: 'Frequently Asked Questions'
    },
    {
      type: 'faqs',
      items: [
        {
          question: 'What is a good AP CSA score?',
          answer: 'A score of 4 or 5 is generally considered a strong AP CSA result, but college credit policies vary by institution.'
        },
        {
          question: 'How many questions are on the AP Computer Science A exam?',
          answer: 'The 2027 AP Computer Science A exam has 42 multiple-choice questions and 4 free-response questions.'
        },
        {
          question: 'How many points are the AP CSA FRQs worth?',
          answer: 'The four FRQs are worth 25 raw points in total: 7 points for Question 1, 7 points for Question 2, 5 points for Question 3, and 6 points for Question 4.'
        },
        {
          question: 'Is the AP Computer Science A exam digital in 2027?',
          answer: 'Yes. The 2027 AP Computer Science A exam is fully digital and is completed in the Bluebook testing app.'
        },
        {
          question: 'What programming language is used in AP CSA?',
          answer: 'AP Computer Science A focuses on Java programming.'
        }
      ]
    }
  ]
};
