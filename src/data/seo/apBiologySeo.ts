import { SeoArticle } from '../../types';

export const apBiologySeoArticle: SeoArticle = {
  calculatorId: 'ap-biology',
  title: 'AP Biology Score Calculator',
  tableOfContents: [
    { id: 'what-is', label: 'What is the AP Biology Score Calculator?' },
    { id: 'how-to-use', label: 'How to Use the AP Biology Score Calculator' },
    { id: 'exam-structure', label: 'Exam Structure & Section Specifications' },
    { id: 'how-it-works', label: 'How Does the AP Biology Score Calculator Work?' },
    { id: 'score-ranges', label: 'Estimated AP Biology Score Ranges' },
    { id: 'score-distribution', label: 'AP Biology Score Distribution' },
    { id: 'grading-scale', label: 'AP Bio Grading Scale 1 to 5' },
    { id: 'faqs', label: 'Frequently Asked Questions' }
  ],
  blocks: [
    // 1. What is the AP Biology Score Calculator?
    {
      type: 'h2',
      id: 'what-is',
      title: 'What is the AP Biology Score Calculator?'
    },
    {
      type: 'paragraphs',
      texts: [
        'The AP Biology Score Calculator is a free online tool that combines your results from the multiple-choice (MCQ) and free-response (FRQ) sections to estimate your AP score from 1 to 5.',
        "Enter how many MCQs you got right and how many points you earned in the FRQ section. The AP Bio Score Calculator then combines both sections to create a composite score and matches it with the score ranges used by the calculator. Whether you're preparing for school or studying for AP Bio on your own, it gives you a quick idea of where your score stands."
      ]
    },

    // 2. How to Use the AP Biology Score Calculator
    {
      type: 'h2',
      id: 'how-to-use',
      title: 'How to Use the AP Biology Score Calculator'
    },
    {
      type: 'paragraph',
      text: "Using the AP Bio Score Calculator is simple. Just follow these steps:"
    },
    {
      type: 'orderedList',
      items: [
        'Enter your correct MCQs – The AP Biology exam has 60 multiple-choice questions. Enter the number you answered correctly.',
        "Enter your FRQ points – The Free-Response section has 6 questions (2 long and 4 short). Enter your total FRQ points.",
        'View your result – The calculator combines your MCQ and FRQ scores based on their weightings and shows your estimated AP score from 1 to 5, along with your approximate percentile.'
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
      text: "Knowing how the AP Biology Exam is divided, how much time you get for each section, and how each section contributes to your score can help you understand how your overall score is calculated."
    },
    {
      type: 'table',
      id: 'exam-structure-table',
      data: {
        headers: ['Section Name', 'Number of Questions', 'Time Allotted', 'Weighting in Total Score'],
        rows: [
          ['Section I: Multiple Choice', '60 Questions', '90 Minutes', '50% of Total'],
          ['Section II: Free Response', '2 Long (9 pts) + 4 Short (4 pts)', '90 Minutes', '50% of Total']
        ]
      }
    },

    // 4. How Does the AP Biology Score Calculator Work?
    {
      type: 'h2',
      id: 'how-it-works',
      title: 'How Does the AP Biology Score Calculator Work?'
    },
    {
      type: 'paragraph',
      text: 'The AP Biology Exam has two equally weighted sections:'
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
      text: 'Each section contributes 50% to your final AP score. The AP Bio Score Calculator converts your performance in both sections into weighted scores, adds them together to create a composite score, and then matches that score with an estimated AP score range from 1 to 5.'
    },
    {
      type: 'h3',
      title: 'Section I: Multiple-Choice Questions'
    },
    {
      type: 'paragraphs',
      texts: [
        'The MCQ section has 60 questions, and you have 90 minutes to complete it. It accounts for 50% of your final AP score, and a four-function, scientific, or graphing calculator is permitted.',
        'The calculator converts your correct answers into a score out of 50:'
      ]
    },
    {
      type: 'formula',
      title: 'MCQ Scoring Formula',
      formula: 'MCQ Score = (Correct Answers ÷ 60) × 50'
    },
    {
      type: 'h3',
      title: 'Section II: Free-Response Questions'
    },
    {
      type: 'paragraphs',
      texts: [
        'The FRQ section has 6 questions and 90 minutes to complete. It includes 2 long free-response questions worth 10 points each and 4 short questions worth 4 points each, for a total of 36 raw points. This section also accounts for 50% of your final AP score.',
      ]
    },
    {
      type: 'paragraph',
      text: 'The AP Bio Score Calculator converts your FRQ points into a maximum of 50 points using the formula below:'
    },
    {
      type: 'formula',
      title: 'FRQ Scoring Formula',
      formula: 'FRQ Score = (FRQ Raw Points ÷ 34) × 50'
    },
    {
      type: 'h3',
      title: 'AP Biology Composite Score'
    },
    {
      type: 'paragraph',
      text: 'The calculator adds the scores from both sections to give you a composite score out of 100.'
    },
    {
      type: 'formula',
      title: 'Composite Score Formula',
      formula: 'Composite Score = MCQ Score + FRQ Score'
    },
    {
      type: 'paragraph',
      text: 'Your composite score is then matched with the calculator’s score ranges to give you an estimated AP score from 1 to 5.'
    },

    // 5. Estimated AP Biology Score Ranges
    {
      type: 'h2',
      id: 'score-ranges',
      title: 'Estimated AP Biology Score Ranges'
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
          ['5', '74 – 100'],
          ['4', '59 – 73'],
          ['3', '45 – 58'],
          ['2', '32 – 44'],
          ['1', '0 – 31']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'These score ranges are estimates used by this calculator and may differ from the official score boundaries set by the College Board.'
    },

    // 6. AP Biology Score Distribution
    {
      type: 'h2',
      id: 'score-distribution',
      title: 'AP Biology Score Distribution'
    },
    {
      type: 'paragraph',
      text: 'The AP Biology score distribution for 2026 was:'
    },
    {
      type: 'table',
      id: 'score-distribution-table',
      data: {
        headers: ['AP Score', '% of Students'],
        rows: [
          ['5', '15%'],
          ['4', '25%'],
          ['3', '31%'],
          ['2', '21%'],
          ['1', '8%']
        ]
      }
    },
    {
      type: 'paragraph',
      text: 'In 2026, 71% of students scored 3 or higher.'
    },

    // 7. AP Bio Grading Scale 1 to 5
    {
      type: 'h2',
      id: 'grading-scale',
      title: 'AP Bio Grading Scale 1 to 5'
    },
    {
      type: 'paragraph',
      text: 'The AP Bio grading scale ranges from 1 to 5. Here’s what each score means:'
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
      text: 'Many colleges and universities grant credit and placement based on AP Biology scores; however, credit policies vary from college to college.'
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
          question: 'Is a 4 a Good AP Bio Score?',
          answer: 'Yes. A score of 4 is considered “Very Well Qualified” on the AP scale, and many colleges accept a 4 for credit or placement. However, requirements vary by college.'
        },
        {
          question: 'Is AP Biology Easy or Hard?',
          answer: 'AP Biology covers a lot of content across eight units and requires more than memorization. You’ll also need to understand data, apply biological concepts, and interpret experiments. With consistent preparation, the exam becomes more manageable.'
        },
        {
          question: 'How Many MCQs Are in AP Biology?',
          answer: 'Section I of the AP Biology Exam has 60 multiple-choice questions, with 90 minutes to complete them. This section accounts for 50% of your final AP score, and the AP Bio Score Calculator uses your correct answers to calculate your MCQ contribution.'
        },
        {
          question: 'How Many FRQs are in AP Biology?',
          answer: 'The AP Biology Exam has 6 free-response questions: 2 long questions worth 10 points each and 4 short questions worth 4 points each. Together, they make up 36 raw points and account for 50% of your final AP score.'
        }
      ]
    }
  ]
};
