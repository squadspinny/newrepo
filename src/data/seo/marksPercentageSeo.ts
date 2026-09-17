import { SeoArticle } from '../../types';

export const marksPercentageSeoArticle: SeoArticle = {
  calculatorId: 'marks-percentage',
  title: 'Marks Percentage Calculator',
  tableOfContents: [
    { id: 'what-is', label: 'What is the Marks Percentage Calculator?' },
    { id: 'how-to-calculate', label: 'How to Calculate Percentage of Marks' },
    { id: '10th-12th-calculators', label: '10th & 12th Percentage Calculators' },
    { id: 'why-use', label: 'Why use the Marks Percentage Calculator' },
    { id: 'faqs', label: 'Frequently Asked Questions' }
  ],
  blocks: [
    // 1. Introduction / What is
    {
      type: 'h2',
      id: 'what-is',
      title: 'What is the Marks Percentage Calculator?'
    },
    {
      type: 'paragraphs',
      texts: [
        'The Marks Percentage Calculator converts your marks into a percentage based on the total marks.',
        'As soon as the results are announced, one of the first questions students have is, “What will my percentage be?” Instead of calculating it manually with a pen and paper, you can simply enter your marks and get your percentage quickly and accurately. It’s a free and easy-to-use tool that saves time and helps avoid calculation mistakes.',
        "Let’s understand how to calculate percentage and how this tool can make the process easier."
      ]
    },

    // 2. How to Calculate Percentage of Marks
    {
      type: 'h2',
      id: 'how-to-calculate',
      title: 'How to Calculate Percentage of Marks'
    },
    {
      type: 'paragraph',
      text: 'There is a simple formula for calculating percentages. Once you learn it, you can use it whenever you need to calculate percentage.'
    },
    {
      type: 'formula',
      title: 'Percentage Formula',
      formula: 'Percentage = (Obtained Marks ÷ Total Marks) × 100'
    },
    {
      type: 'paragraph',
      text: 'You can use this formula to calculate your percentage for any class, exam, or subject. You only need two things: your obtained marks and the total marks.'
    },
    {
      type: 'paragraph',
      text: 'Example:'
    },
    {
      type: 'paragraph',
      text: 'Suppose the total marks are 500 and you score 425.'
    },
    {
      type: 'formula',
      formula: 'Percentage = (425 ÷ 500) × 100 = 85%'
    },
    {
      type: 'paragraph',
      text: "That’s all you need to know about how to calculate percentage. For a quick and easy calculation, you can use our Marks to Percentage Calculator instead of doing it manually. It helps you get your percentage in seconds."
    },

    // 4. 10th & 12th Percentage Calculators
    {
      type: 'h2',
      id: '10th-12th-calculators',
      title: '10th & 12th Percentage Calculators'
    },
    {
      type: 'h3',
      id: '10th-calculator',
      title: '10th Percentage Calculator'
    },
    {
      type: 'paragraph',
      text: 'One of the most common questions after the Class 10 results are announced is, “What percentage did you get?” The 10th Percentage Calculator makes it easy to find your percentage. Just enter the marks from your marksheet and get your percentage in seconds.'
    },
    {
      type: 'h3',
      id: '12th-calculator',
      title: '12th Percentage Calculator'
    },
    {
      type: 'paragraph',
      text: 'The 12th Percentage Calculator is useful for students who want to quickly check their percentage for college admissions or competitive exams. Some students may need to calculate their percentage using the best 4 or best 5 subjects, depending on their board, stream, or admission requirements. So, enter only the subjects that are included in the percentage calculation you need.'
    },

    // 5. Why use the Marks Percentage Calculator
    {
      type: 'h2',
      id: 'why-use',
      title: 'Why use the Marks Percentage Calculator'
    },
    {
      type: 'bulletList',
      items: [
        'Get your percentage instantly without doing manual calculations.',
        'The chances of making calculation mistakes are reduced.',
        'Use it easily on both your mobile phone and laptop.',
        'It’s completely free to use, with no charges.',
        'Useful for calculating percentages for Class 10, Class 12, and other exams.'
      ]
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
          question: 'What is the percentage of 300 marks out of 600?',
          answer: 'The percentage of 300 marks out of 600 is 50%. You can calculate it using the formula (300 ÷ 600) × 100 = 50%. So, if the total marks are 600 and you score 300 marks, your percentage is 50%.'
        },
        {
          question: 'How to calculate percentage of marks of class 10th?',
          answer: 'To calculate your Class 10th percentage, add the marks you obtained in all subjects and then add the maximum marks for those subjects. After that, use the formula (Obtained Marks ÷ Total Marks) × 100 to get your percentage. You can use the same formula to calculate your percentage for any exam.'
        }
      ]
    }
  ]
};
