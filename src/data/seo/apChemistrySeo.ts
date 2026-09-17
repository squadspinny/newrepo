import { SeoArticle } from '../../types';

export const apChemistrySeoArticle: SeoArticle = {
  calculatorId: 'ap-chemistry',
  title: 'AP Chemistry Score Calculator',
  tableOfContents: [
    { id: 'what-is', label: 'What is the AP Chemistry Score Calculator?' },
    { id: 'how-to-use', label: 'How to Use the AP Chemistry Score Calculator' },
    { id: 'exam-structure', label: 'Exam Structure & Section Specifications' },
    { id: 'how-it-works', label: 'How Does the AP Chemistry Score Calculator Work?' },
    { id: 'score-ranges', label: 'Estimated AP Chemistry Score Ranges' },
    { id: 'score-distribution', label: 'AP Chemistry Score Distribution' },
    { id: 'grading-scale', label: 'AP Chem Grading Scale 1 to 5' },
    { id: 'faqs', label: 'Frequently Asked Questions' }
  ],
  blocks: [
    // 1. What is the AP Chemistry Score Calculator?
    {
      type: 'h2',
      id: 'what-is',
      title: 'What is the AP Chemistry Score Calculator?'
    },
    {
      type: 'paragraphs',
      texts: [
        'The AP Chemistry Score Calculator is a free online tool that estimates your AP score based on your performance in the Multiple-Choice (MCQ) and Free-Response (FRQ) sections.',
        'Enter the number of correct MCQs and your FRQ points to calculate your combined score and see your estimated AP score on a scale of 1 to 5. Whether you’re studying independently or preparing through school, the AP Chem Score Calculator can help you understand your current performance.'
      ]
    },

    // 2. How to Use the AP Chemistry Score Calculator
    {
      type: 'h2',
      id: 'how-to-use',
      title: 'How to Use the AP Chemistry Score Calculator'
    },
    {
      type: 'paragraph',
      text: "It's quite simple to use the AP Chem Score Calc. Follow this steps:"
    },
    {
      type: 'orderedList',
      items: [
        'Enter your correct MCQs – AP Chemistry exam consists of 60 multiple-choice questions. Enter the number of questions you answered correctly.',
        "Enter your FRQ points: The 'Free Response' section has 7 questions (3 long + 4 short).Enter your total FRQ points.",
        'View your result: The calculator combines your MCQ and FRQ scores based on their 50% weightings and shows your estimated AP score from 1 to 5 along with percentile.'
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
      text: "Before using the calculator, it's helpful to know how the AP Chemistry Exam is divided, how much  time you get for each section, and how each section contributes to your Score."
    },
    {
      type: 'table',
      id: 'exam-structure-table',
      data: {
        headers: ['Section Name', 'Number of Questions', 'Time Allotted', 'Weighting in Total Score'],
        rows: [
          ['Section I: Multiple Choice', '60 Questions', '90 Minutes', '50% of Total'],
          ['Section II: Free Response', '3 Long (10 pts) + 4 Short (4 pts)', '105 Minutes', '50% of Total']
        ]
      }
    },

    // 4. How Does the AP Chemistry Score Calculator Work?
    {
      type: 'h2',
      id: 'how-it-works',
      title: 'How Does the AP Chemistry Score Calculator Work?'
    },
    {
      type: 'paragraph',
      text: 'The chemistry exam has two main sections:'
    },
    {
      type: 'bulletList',
      items: [
        'Section I: Multiple-Choice Questions (MCQ)',
        'Section II: Free-Response Questions (FRQ)'
      ]
    },
    {
      type: 'paragraph',
      text: 'Both sections are worth 50% of the exam. The calculator converts your performance in each section into a score out of 50 and combines them to get a composite score out of 100.'
    },
    {
      type: 'h3',
      title: 'Section I: Multiple-Choice Questions'
    },
    {
      type: 'paragraphs',
      texts: [
        'The AP Chemistry multiple-choice section has 60 questions, with 90 minutes to complete them. This section is worth 50% of the exam. A scientific or graphing calculator is permitted and recommended.',
        'Your correct answers are converted to a maximum of 50 points using:'
      ]
    },
    {
      type: 'formula',
      title: 'MCQ Scoring Formula',
      formula: 'Estimated MCQ Score = (Correct Answers ÷ 60) × 50'
    },
    {
      type: 'h3',
      title: 'Section II: Free-Response Questions'
    },
    {
      type: 'paragraphs',
      texts: [
        'The Free-Response section has 7 questions and 105 minutes (1 hour 45 minutes) to complete them.',
        'In includes:'
      ]
    },
    {
      type: 'bulletList',
      items: [
        '3 long free-response questions — 10 points each',
        '4 short free-response questions — 4 points each',
        'Total: 46 raw points'
      ]
    },
    {
      type: 'paragraph',
      text: 'The AP Chem Score Calculator converts your FRQ points into a maximum of 50 points using the formula below:'
    },
    {
      type: 'formula',
      title: 'FRQ Scoring Formula',
      formula: 'Estimated FRQ Score = (FRQ Raw Points ÷ 46) × 50'
    },
    {
      type: 'h3',
      title: 'AP Chemistry Composite Score'
    },
    {
      type: 'paragraph',
      text: 'The calculator adds the scores from both sections to get your composite score out of 100.'
    },
    {
      type: 'formula',
      title: 'Composite Score Formula',
      formula: 'Composite Score = MCQ Score + FRQ Score'
    },
    {
      type: 'paragraph',
      text: 'Your composite score is then matched with the score ranges used by the calculator to give you an estimated AP score from 1 to 5.'
    },

    // 5. Estimated AP Chemistry Score Ranges
    {
      type: 'h2',
      id: 'score-ranges',
      title: 'Estimated AP Chemistry Score Ranges'
    },
    {
      type: 'paragraph',
      text: "The score ranges below are used to convert your composite score into an estimated AP score from 1 to 5."
    },
    {
      type: 'table',
      id: 'composite-cutoffs-table',
      data: {
        headers: ['AP Score', 'Estimated Cutoff'],
        rows: [
          ['5', '71 – 100'],
          ['4', '57 – 70'],
          ['3', '42 – 56'],
          ['2', '27 – 41'],
          ['1', '0 – 26']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'These score ranges are estimates used by this calculator and may differ from the official score boundaries set by the College Board.'
    },

    // 6. AP Chemistry Score Distribution
    {
      type: 'h2',
      id: 'score-distribution',
      title: 'AP Chemistry Score Distribution'
    },
    {
      type: 'paragraph',
      text: 'The AP Chemistry score distribution for 2026 was:'
    },
    {
      type: 'table',
      id: 'score-distribution-table',
      data: {
        headers: ['AP Score', '% of Students'],
        rows: [
          ['5', '15%'],
          ['4', '31%'],
          ['3', '30%'],
          ['2', '18%'],
          ['1', '6%']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'In 2026, 76% of students scored 3 or higher.'
    },

    // 7. AP Chem Grading Scale 1 to 5
    {
      type: 'h2',
      id: 'grading-scale',
      title: 'AP Chem Grading Scale 1 to 5'
    },
    {
      type: 'paragraph',
      text: 'The AP Chem grading scale ranges from 1 to 5. Here’s what each score means:'
    },
    {
      type: 'table',
      id: 'grading-scale-table',
      data: {
        headers: ['AP Score', 'Meaning'],
        rows: [
          ['5', 'Extremely well qualified'],
          ['4', 'Very well qualified'],
          ['3', 'Qualified'],
          ['2', 'Possibly qualified'],
          ['1', 'No recommendation']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'Many colleges and universities grant credit and placement based on AP Chemistry scores; however, credit policies vary from college to college.'
    },

    // 8. Frequently Asked Questions
    {
      type: 'h2',
      id: 'faqs',
      title: 'Frequently Asked Questions'
    },
    {
      type: 'faqs',
      items: [
        {
          question: 'Is 4 a Good AP Chem Score?',
          answer: 'Yes, a score of 4 is considered “Very well qualified” on the AP grading scale. Many colleges accept a 4 for credit or placement, although requirements vary by colleges. If the AP Chem Score Calculator gives you a 4, that means you’re performing at a strong level.'
        },
        {
          question: 'How is AP Chem Score Calculated?',
          answer: 'Your AP Chem score is calculated by combining your MCQ and FRQ performance, with each section contributing 50% to the composite score. The calculator then compares your composite score with the score ranges used for the 1–5 scale to give you an AP score. These ranges are estimates and may vary from year to year.'
        },
        {
          question: 'How Many Students Get a 5 on AP Chem?',
          answer: 'According to the 2026 AP Chemistry score distribution, 15% of students scored a 5.'
        },
        {
          question: 'How Many Questions Are on AP Chemistry?',
          answer: 'The MCQ section of the AP Chemistry exam has 60 questions, while the FRQ section has 7 questions (3 long-answer and 4 short-answer). The AP Chem Score Calculator uses your performance across both sections to calculate your composite score.'
        }
      ]
    }
  ]
};
