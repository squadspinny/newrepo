import { CalculatorConfig, CalculatorResult } from '../../types';
import { marksPercentageSeoArticle } from '../seo/marksPercentageSeo';

export const academicCalculators: CalculatorConfig[] = [
  // 1. Semester Grade Calculator
  {
    id: 'semester-grade',
    title: 'Semester Grade Calculator',
    shortName: 'Semester Grade',
    category: 'academic',
    categoryLabel: 'Academic Tools',
    yearFormat: 'High School & College Standards',
    seoTitle: 'Semester Grade Calculator | Calculate Final Weighted Semester Grade',
    metaDescription: 'Calculate your overall semester grade from Quarter 1, Quarter 2, and Final Exam scores with custom weights. Find what you need to pass or earn an A.',
    overview: 'Calculate your overall weighted semester grade. Input your Quarter 1, Quarter 2, and Final Exam grades along with your school’s grading weights to instantly calculate your composite semester average and final letter grade.',
    cardDescription: 'Calculate your final semester grade from Quarter 1, Quarter 2, and Final Exam weights.',
    fields: [
      {
        id: 'q1Grade',
        label: 'Quarter 1 / Term 1 Grade (%)',
        sublabel: 'Percentage score in Q1 (0 - 100%)',
        min: 0,
        max: 100,
        defaultValue: 88
      },
      {
        id: 'q1Weight',
        label: 'Quarter 1 Weight (%)',
        sublabel: 'Typically 40% or 45%',
        min: 0,
        max: 100,
        defaultValue: 40
      },
      {
        id: 'q2Grade',
        label: 'Quarter 2 / Term 2 Grade (%)',
        sublabel: 'Percentage score in Q2 (0 - 100%)',
        min: 0,
        max: 100,
        defaultValue: 92
      },
      {
        id: 'q2Weight',
        label: 'Quarter 2 Weight (%)',
        sublabel: 'Typically 40% or 45%',
        min: 0,
        max: 100,
        defaultValue: 40
      },
      {
        id: 'examGrade',
        label: 'Final Semester Exam Grade (%)',
        sublabel: 'Percentage score on the final exam (0 - 100%)',
        min: 0,
        max: 100,
        defaultValue: 85
      },
      {
        id: 'examWeight',
        label: 'Final Exam Weight (%)',
        sublabel: 'Typically 10% - 20%',
        min: 0,
        max: 100,
        defaultValue: 20
      }
    ],
    calculate: (inputs: Record<string, number>): CalculatorResult => {
      const q1 = Math.max(0, Math.min(100, inputs.q1Grade ?? 88));
      const w1 = Math.max(0, Math.min(100, inputs.q1Weight ?? 40));
      const q2 = Math.max(0, Math.min(100, inputs.q2Grade ?? 92));
      const w2 = Math.max(0, Math.min(100, inputs.q2Weight ?? 40));
      const exam = Math.max(0, Math.min(100, inputs.examGrade ?? 85));
      const wexam = Math.max(0, Math.min(100, inputs.examWeight ?? 20));

      const totalWeight = w1 + w2 + wexam;
      const normalizedWeight = totalWeight > 0 ? totalWeight : 100;

      // Weighted average
      const weightedSum = (q1 * w1) + (q2 * w2) + (exam * wexam);
      const finalPercent = Math.round((weightedSum / normalizedWeight) * 10) / 10;

      let letter = 'F';
      let status = 'Failing Grade';
      let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';

      if (finalPercent >= 93) {
        letter = 'A';
        status = 'Excellent / Honors Standing';
        badgeColor = 'emerald';
      } else if (finalPercent >= 90) {
        letter = 'A-';
        status = 'Superior Achievement';
        badgeColor = 'emerald';
      } else if (finalPercent >= 87) {
        letter = 'B+';
        status = 'Very Good Standing';
        badgeColor = 'blue';
      } else if (finalPercent >= 83) {
        letter = 'B';
        status = 'Above Average';
        badgeColor = 'blue';
      } else if (finalPercent >= 80) {
        letter = 'B-';
        status = 'Good Standing';
        badgeColor = 'blue';
      } else if (finalPercent >= 77) {
        letter = 'C+';
        status = 'Satisfactory Standing';
        badgeColor = 'amber';
      } else if (finalPercent >= 73) {
        letter = 'C';
        status = 'Average Competence';
        badgeColor = 'amber';
      } else if (finalPercent >= 70) {
        letter = 'C-';
        status = 'Minimum Passing Standing';
        badgeColor = 'amber';
      } else if (finalPercent >= 60) {
        letter = 'D';
        status = 'Below Average (Credits may not transfer)';
        badgeColor = 'rose';
      }

      // What score needed on exam for 90% (A) assuming Q1 and Q2 are locked
      // target = (q1*w1 + q2*w2 + need*wexam) / (w1+w2+wexam)
      let examNeededForA = 0;
      if (wexam > 0) {
        examNeededForA = Math.round(((90 * totalWeight - (q1 * w1 + q2 * w2)) / wexam) * 10) / 10;
      }

      return {
        mainScore: finalPercent,
        mainScoreLabel: 'Final Semester Grade (%)',
        maxScore: 100,
        qualificationStatus: `${letter} (${status})`,
        qualificationBadgeColor: badgeColor,
        percentileText: `Letter Grade: ${letter}`,
        compositePoints: finalPercent,
        maxCompositePoints: 100,
        isEstimated: false,
        subscores: [
          { label: 'Quarter 1 Contribution', value: `${((q1 * w1) / normalizedWeight).toFixed(1)}% (of ${w1}%)` },
          { label: 'Quarter 2 Contribution', value: `${((q2 * w2) / normalizedWeight).toFixed(1)}% (of ${w2}%)` },
          { label: 'Final Exam Contribution', value: `${((exam * wexam) / normalizedWeight).toFixed(1)}% (of ${wexam}%)` },
          { label: 'Exam Needed for 90% (A)', value: wexam === 0 ? 'No final exam' : examNeededForA > 100 ? 'Mathematically not possible' : examNeededForA <= 0 ? 'Already secured (>90%)' : `${examNeededForA}%` }
        ],
        summaryNote: `Your overall semester average is ${finalPercent}% (${letter}). Q1 contributed ${((q1 * w1) / normalizedWeight).toFixed(1)}%, Q2 contributed ${((q2 * w2) / normalizedWeight).toFixed(1)}%, and the Final Exam contributed ${((exam * wexam) / normalizedWeight).toFixed(1)}%.`
      };
    },
    examSpecs: {
      totalDuration: 'Full Academic Semester / Term',
      totalQuestions: '3 Term Milestones (Q1, Q2, Final Exam)',
      scaleRange: '0 - 100% (Letter Grade A to F)',
      qualifyingScore: '70%+ (Passing Grade C- or better)',
      nationalAverage: '83% (B average)',
      structureNote: 'Adjust percentages to match your syllabus (e.g. 40/40/20, 45/45/10, or 50/50).',
      sections: [
        { name: 'Quarter 1 / Term 1', questions: 'Homework, Quizzes, Tests', time: 'First Half of Term', weight: 'Default 40%' },
        { name: 'Quarter 2 / Term 2', questions: 'Homework, Quizzes, Tests', time: 'Second Half of Term', weight: 'Default 40%' },
        { name: 'Final Semester Exam', questions: 'Comprehensive Exam', time: 'Semester Conclusion', weight: 'Default 20%' }
      ]
    },
    scoreScaleTable: [
      { score: '93% - 100%', label: 'Letter Grade A (4.0 GPA)', collegeCredit: 'Highest Honors; exemplary mastery of course content', typicalCutoff: '93%+' },
      { score: '90% - 92%', label: 'Letter Grade A- (3.7 GPA)', collegeCredit: 'High Honors; superior analytical skill', typicalCutoff: '90% - 92%' },
      { score: '87% - 89%', label: 'Letter Grade B+ (3.3 GPA)', collegeCredit: 'Dean’s list threshold; strong conceptual understanding', typicalCutoff: '87% - 89%' },
      { score: '83% - 86%', label: 'Letter Grade B (3.0 GPA)', collegeCredit: 'Solid college-preparatory achievement', typicalCutoff: '83% - 86%' },
      { score: '70% - 79%', label: 'Letter Grade C (2.0 GPA)', collegeCredit: 'Satisfactory completion; minimum prerequisites requirement', typicalCutoff: '70% - 79%' },
      { score: '0% - 59%', label: 'Letter Grade F (0.0 GPA)', collegeCredit: 'Course failure; credit must be remediated or retaken', typicalCutoff: '<60%' }
    ],
    formulaExplanation: {
      title: 'Weighted Semester Grade Formula',
      steps: [
        'Multiply your Quarter 1 percentage grade by the Quarter 1 weight fraction (e.g. 88 * 0.40 = 35.2%).',
        'Multiply your Quarter 2 percentage grade by the Quarter 2 weight fraction (e.g. 92 * 0.40 = 36.8%).',
        'Multiply your Final Exam percentage grade by the Final Exam weight fraction (e.g. 85 * 0.20 = 17.0%).',
        'Sum all weighted components: Final Grade = (Q1 * W1 + Q2 * W2 + Exam * WExam) / Total Weight.'
      ],
      rawToScaledNotes: 'If your school uses a 50/50 model without a final exam, set the Final Exam weight to 0% and each quarter to 50%.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Grade A (93%+)', scoreNeeded: '93.0% Overall', recommendation: 'Maintain 90%+ across both quarters to alleviate high-stakes pressure on final exam week.' },
        { target: 'Grade B (83%+)', scoreNeeded: '83.0% Overall', recommendation: 'Target consistent homework submission and test test correction opportunities.' },
        { target: 'Passing Grade (70%+)', scoreNeeded: '70.0% Overall', recommendation: 'Consult your syllabus regarding replacement grade policies or extra credit.' }
      ],
      strategicAdvice: 'Prioritize reviewing topics from Quarter 1 that reappear on cumulative finals, as they are typically the most forgotten.'
    },
    faqs: [
      { question: 'What formula calculates what I need on my final exam?', answer: 'Exam Score Needed = (Desired Final Grade - (Q1 * Q1 Weight + Q2 * Q2 Weight)) / Final Exam Weight.' },
      { question: 'What if my final exam is worth 15%?', answer: 'Simply change the Final Exam Weight field to 15, and set Q1 and Q2 to 42.5% each (or whatever distribution is written in your syllabus).' },
      { question: 'Is a 89.5% rounded up to an A-?', answer: 'Most high schools and universities round averages with 0.5% or higher to the next integer, turning an 89.5% into a 90% (A-).' }
    ],
    relatedCalculatorIds: ['cumulative-gpa', 'marks-percentage', 'grade-curve', 'gpa']
  },

  // 2. Cumulative GPA Calculator
  {
    id: 'cumulative-gpa',
    title: 'Cumulative GPA Calculator',
    shortName: 'Cumulative GPA',
    category: 'academic',
    categoryLabel: 'Academic Tools',
    yearFormat: '4.00 Grade Point Scale',
    seoTitle: 'Cumulative GPA Calculator | High School & College GPA Planner',
    metaDescription: 'Calculate your updated cumulative GPA by combining your prior GPA and completed credit hours with your current semester grades.',
    overview: 'Calculate your updated Cumulative Grade Point Average. By combining your existing cumulative GPA and credit units with your current semester GPA and course credits, this tool calculates your new cumulative GPA and honors classification.',
    cardDescription: 'Calculate your updated cumulative GPA combining prior credits and new semester grades.',
    fields: [
      {
        id: 'priorGpa',
        label: 'Current / Prior Cumulative GPA',
        sublabel: 'Cumulative GPA prior to this semester (0.00 - 4.00)',
        min: 0,
        max: 4,
        defaultValue: 3.52
      },
      {
        id: 'priorCredits',
        label: 'Prior Credit Hours Completed',
        sublabel: 'Total graded credits or units earned to date',
        min: 0,
        max: 200,
        defaultValue: 45
      },
      {
        id: 'semesterGpa',
        label: 'Current Semester / Term GPA',
        sublabel: 'Estimated GPA for the current semester (0.00 - 4.00)',
        min: 0,
        max: 4,
        defaultValue: 3.80
      },
      {
        id: 'semesterCredits',
        label: 'Current Semester Credit Hours',
        sublabel: 'Credit hours taken in current term (e.g. 12 - 18)',
        min: 1,
        max: 30,
        defaultValue: 15
      }
    ],
    calculate: (inputs: Record<string, number>): CalculatorResult => {
      const priorGpa = Math.max(0, Math.min(4, inputs.priorGpa ?? 3.52));
      const priorCredits = Math.max(0, Math.min(200, inputs.priorCredits ?? 45));
      const semesterGpa = Math.max(0, Math.min(4, inputs.semesterGpa ?? 3.80));
      const semesterCredits = Math.max(1, Math.min(30, inputs.semesterCredits ?? 15));

      const priorQualityPoints = priorGpa * priorCredits;
      const semesterQualityPoints = semesterGpa * semesterCredits;

      const totalCredits = priorCredits + semesterCredits;
      const totalQualityPoints = priorQualityPoints + semesterQualityPoints;

      const updatedGpa = Math.round((totalQualityPoints / totalCredits) * 100) / 100;
      const gpaChange = Math.round((updatedGpa - priorGpa) * 100) / 100;

      let honors = 'Good Academic Standing';
      let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'blue';

      if (updatedGpa >= 3.90) {
        honors = 'Summa Cum Laude (Highest Honors)';
        badgeColor = 'emerald';
      } else if (updatedGpa >= 3.75) {
        honors = 'Magna Cum Laude (High Honors)';
        badgeColor = 'emerald';
      } else if (updatedGpa >= 3.50) {
        honors = 'Cum Laude / Dean’s List Honor';
        badgeColor = 'blue';
      } else if (updatedGpa >= 3.00) {
        honors = 'Good Academic Standing (B Average)';
        badgeColor = 'blue';
      } else if (updatedGpa >= 2.00) {
        honors = 'Satisfactory Progress';
        badgeColor = 'amber';
      } else {
        honors = 'Academic Warning / Probation Risk';
        badgeColor = 'rose';
      }

      return {
        mainScore: updatedGpa,
        mainScoreLabel: 'New Cumulative GPA',
        maxScore: 4,
        qualificationStatus: honors,
        qualificationBadgeColor: badgeColor,
        percentileText: gpaChange >= 0 ? `+${gpaChange.toFixed(2)} Change` : `${gpaChange.toFixed(2)} Change`,
        compositePoints: totalCredits,
        maxCompositePoints: totalCredits,
        isEstimated: false,
        subscores: [
          { label: 'Prior Quality Points', value: `${priorQualityPoints.toFixed(1)} pts (${priorCredits} credits)` },
          { label: 'Semester Quality Points', value: `${semesterQualityPoints.toFixed(1)} pts (${semesterCredits} credits)` },
          { label: 'Total Completed Credits', value: `${totalCredits} credits` },
          { label: 'Net GPA Delta', value: gpaChange >= 0 ? `+${gpaChange.toFixed(2)}` : `${gpaChange.toFixed(2)}` }
        ],
        summaryNote: `Your cumulative GPA changes from ${priorGpa.toFixed(2)} to ${updatedGpa.toFixed(2)} (${gpaChange >= 0 ? `+${gpaChange.toFixed(2)}` : `${gpaChange.toFixed(2)}`}) across a total of ${totalCredits} completed credit hours. Current standing: ${honors}.`
      };
    },
    examSpecs: {
      totalDuration: 'Multi-Year Academic Career',
      totalQuestions: 'Prior Credits + Current Semester Enrollment',
      scaleRange: '0.00 - 4.00 Grade Point Scale',
      qualifyingScore: '3.00+ for Graduate Admissions, 3.50+ for Latin Honors',
      nationalAverage: '3.15 College GPA Average',
      structureNote: 'Quality points = Course Grade Points (A=4, B=3, C=2, D=1) multiplied by Course Credit Hours.',
      sections: [
        { name: 'Prior Academic Record', questions: 'Transcript Grade Point History', time: 'Prior Semesters', weight: 'Credits Proportional' },
        { name: 'Current Semester Enrollment', questions: 'Active Classes in Progress', time: 'Current Term', weight: 'Credits Proportional' }
      ]
    },
    scoreScaleTable: [
      { score: '3.90 - 4.00', label: 'Summa Cum Laude', collegeCredit: 'Highest collegiate distinction; top 1-5% of graduating class', typicalCutoff: '3.90+' },
      { score: '3.75 - 3.89', label: 'Magna Cum Laude', collegeCredit: 'High honors; competitive for top medical, law, and PhD programs', typicalCutoff: '3.75 - 3.89' },
      { score: '3.50 - 3.74', label: 'Cum Laude / Dean’s List', collegeCredit: 'Honors threshold at majority of universities; strong graduate candidacy', typicalCutoff: '3.50 - 3.74' },
      { score: '3.00 - 3.49', label: 'Good Standing (B Average)', collegeCredit: 'Standard collegiate baseline; meets graduate school minimum thresholds', typicalCutoff: '3.00 - 3.49' },
      { score: '2.00 - 2.99', label: 'Satisfactory Standing', collegeCredit: 'Minimum requirement to graduate with a Bachelor’s degree', typicalCutoff: '2.00 - 2.99' },
      { score: '0.00 - 1.99', label: 'Academic Probation', collegeCredit: 'Below graduation standard; subject to academic review and dismissal', typicalCutoff: '<2.00' }
    ],
    formulaExplanation: {
      title: 'Cumulative GPA Calculation Formula',
      steps: [
        'Calculate Prior Quality Points: Prior Cumulative GPA × Prior Credit Hours.',
        'Calculate Semester Quality Points: Semester GPA × Semester Credit Hours.',
        'Sum all quality points: Total Quality Points = Prior Quality Points + Semester Quality Points.',
        'Divide Total Quality Points by the total credit hours: Cumulative GPA = Total Quality Points / (Prior Credits + Semester Credits).'
      ],
      rawToScaledNotes: 'Pass/Fail or Satisfactory/Unsatisfactory credits do not earn quality points and are excluded from the GPA calculation.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Latin Honors (3.50+)', scoreNeeded: '3.50+ Cumulative GPA', recommendation: 'Each additional semester has less mathematical pull on your GPA as your completed credit total grows.' },
        { target: 'Graduate School Competitive', scoreNeeded: '3.60+ Cumulative GPA', recommendation: 'Focus on earning A grades in upper-division major-specific courses.' },
        { target: 'Academic Good Standing', scoreNeeded: '2.00+ Cumulative GPA', recommendation: 'Repeat courses where D or F grades were received if your university offers grade forgiveness/replacement.' }
      ],
      strategicAdvice: 'The earlier in your college career you earn strong grades, the higher your GPA ceiling remains because credit hours compound.'
    },
    faqs: [
      { question: 'How is cumulative GPA different from semester GPA?', answer: 'Semester GPA measures performance in a single term, whereas cumulative GPA is the weighted average of all graded credits taken throughout your entire academic program.' },
      { question: 'Do AP credits affect college cumulative GPA?', answer: 'At most universities, AP credits transfer as course credit (units toward graduation) without carrying grade points, meaning they do not affect your collegiate GPA.' },
      { question: 'What is the highest honors rank in college?', answer: 'Summa Cum Laude ("with highest praise") is the top Latin honor, typically awarded to graduates with a 3.90+ GPA.' }
    ],
    relatedCalculatorIds: ['semester-grade', 'marks-percentage', 'grade-curve', 'gpa']
  },

  // 3. Marks Percentage Calculator
  {
    id: 'marks-percentage',
    title: 'Marks Percentage Calculator',
    shortName: 'Marks Percentage',
    category: 'academic',
    categoryLabel: 'Academic Tools',
    yearFormat: 'CBSE, ICSE & University Standard',
    seoTitle: 'Marks Percentage Calculator: Calculate Your Percentage',
    metaDescription: 'Calculate your percentage in seconds with our free Marks Percentage Calculator. Enter your marks, get an accurate result. Try now!',
    overview: 'Enter your obtained marks and total marks for all subjects to calculate your percentage and academic division, such as Distinction, First, or Second Division.',
    cardDescription: 'Calculate marks percentage and academic division from total marks.',
    seoArticle: marksPercentageSeoArticle,
    fields: [
      {
        id: 'marksObtained',
        label: 'Total Marks Obtained',
        sublabel: 'Sum of marks earned across all subjects',
        min: 0,
        max: 100000,
        defaultValue: 442
      },
      {
        id: 'totalMarks',
        label: 'Total Maximum Marks Possible',
        sublabel: 'Maximum marks possible across all subjects',
        min: 1,
        max: 100000,
        defaultValue: 500
      }
    ],
    validate: (inputs: Record<string, number | ''>): Record<string, string> | null => {
      const marksObtained = inputs.marksObtained;
      const totalMarks = inputs.totalMarks;

      const errs: Record<string, string> = {};

      if (marksObtained === '' && typeof totalMarks === 'number' && totalMarks > 0) {
        errs.marksObtained = 'Please enter marks obtained.';
        return errs;
      }

      if (typeof marksObtained === 'number' && marksObtained < 0) {
        errs.marksObtained = 'Marks obtained cannot be negative.';
      }

      if (typeof totalMarks === 'number' && totalMarks <= 0) {
        errs.totalMarks = 'Total maximum marks must be greater than 0.';
      }

      if (
        typeof marksObtained === 'number' &&
        typeof totalMarks === 'number' &&
        totalMarks > 0 &&
        marksObtained > totalMarks
      ) {
        errs.marksObtained = 'Marks obtained cannot be greater than maximum marks possible.';
      }

      return Object.keys(errs).length > 0 ? errs : null;
    },
    calculate: (inputs: Record<string, number>): CalculatorResult => {
      const marksObtained = inputs.marksObtained ?? 442;
      const totalMarks = inputs.totalMarks ?? 500;

      if (marksObtained < 0) {
        return {
          error: 'Marks obtained cannot be negative.',
          mainScore: '—',
          mainScoreLabel: 'Marks Percentage (%)',
          qualificationStatus: 'Invalid Score',
          qualificationBadgeColor: 'rose',
          hideStatsGrid: true,
          isEstimated: false,
          subscores: [],
          summaryNote: 'Marks obtained cannot be negative.'
        };
      }

      if (totalMarks <= 0) {
        return {
          error: 'Total maximum marks must be greater than 0.',
          mainScore: '—',
          mainScoreLabel: 'Marks Percentage (%)',
          qualificationStatus: 'Invalid Score',
          qualificationBadgeColor: 'rose',
          hideStatsGrid: true,
          isEstimated: false,
          subscores: [],
          summaryNote: 'Total maximum marks must be greater than 0.'
        };
      }

      if (marksObtained > totalMarks) {
        return {
          error: 'Marks obtained cannot be greater than maximum marks possible.',
          mainScore: '—',
          mainScoreLabel: 'Marks Percentage (%)',
          qualificationStatus: 'Invalid Score',
          qualificationBadgeColor: 'rose',
          hideStatsGrid: true,
          isEstimated: false,
          subscores: [],
          summaryNote: 'Marks obtained cannot be greater than maximum marks possible.'
        };
      }

      const percentage = Math.round((marksObtained / totalMarks) * 10000) / 100;

      let division = 'Third Division / Pass Class';
      let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';

      if (percentage >= 75) {
        division = 'First Class with Distinction (Distinction)';
        badgeColor = 'emerald';
      } else if (percentage >= 60) {
        division = 'First Division (First Class)';
        badgeColor = 'blue';
      } else if (percentage >= 50) {
        division = 'Second Division (Second Class)';
        badgeColor = 'amber';
      } else if (percentage >= 35) {
        division = 'Third Division (Pass)';
        badgeColor = 'amber';
      } else {
        division = 'Fail / Remediate';
        badgeColor = 'rose';
      }

      return {
        mainScore: percentage,
        mainScoreLabel: 'Marks Percentage (%)',
        qualificationStatus: division,
        qualificationBadgeColor: badgeColor,
        hideStatsGrid: true,
        isEstimated: false,
        subscores: [
          { label: 'Academic Standing / Division', value: division },
          { label: 'Total Marks Summary', value: `${marksObtained} / ${totalMarks} marks` }
        ],
        summaryNote: `Your score of ${marksObtained}/${totalMarks} converts to ${percentage.toFixed(2)}% (${division}).`
      };
    },
    formulaExplanation: {
      title: 'Marks to Percentage Formula',
      steps: [
        'Percentage (%) = (Marks Obtained / Maximum Marks) × 100.'
      ],
      rawToScaledNotes: 'In standard Indian education boards (CBSE/ICSE), a score of 75% or higher earns the official "Distinction" remark.'
    },
    faqs: [
      { question: 'What is the percentage of 300 marks out of 600?', answer: '(300 ÷ 600) × 100 = 50%. Meaning if the total marks are 600 and you get 300, then the percentage becomes 50%.' },
      { question: 'How to calculate percentage of marks of class 10th?', answer: 'To calculate your Class 10th percentage, first add up your marks for all subjects in your marksheet, then add up your total (maximum) marks for all subjects. Then, apply the formula: (Obtained Marks ÷ Total Marks) × 100. This can be used to calculate your percentage for any exam.' },
      { question: 'What is the cutoff for First Division?', answer: 'In most educational boards and Indian universities, a percentage of 60% or above qualifies as First Division (First Class).' },
      { question: 'What is Distinction in marks?', answer: 'Securing 75% or higher in aggregate or in an individual subject is officially termed "Distinction".' }
    ],
    relatedCalculatorIds: ['semester-grade', 'cumulative-gpa', 'grade-curve', 'gpa']
  },

  // 4. Grade Curve Calculator
  {
    id: 'grade-curve',
    title: 'Grade Curve Calculator',
    shortName: 'Grade Curve',
    category: 'academic',
    categoryLabel: 'Academic Tools',
    yearFormat: 'Standard Statistical Curves',
    seoTitle: 'Grade Curve Calculator | Test Curve Methods (Square Root, Linear, Flat)',
    metaDescription: 'Calculate curved test grades using multiple standard curve models: Square Root curve, Flat scale boost, Linear point spread, and High-Score bump.',
    overview: 'Calculate curved exam and test scores. Compare the most widely used grading curve methods in education, including the popular Square Root Curve, Flat-Point Addition, and Linear Scale normalization.',
    cardDescription: 'Calculate curved test scores using Square Root, Flat Point, and Linear Curve formulas.',
    fields: [
      {
        id: 'rawScore',
        label: 'Your Raw Score Earned',
        sublabel: 'Uncurved test points earned',
        min: 0,
        max: 200,
        defaultValue: 64
      },
      {
        id: 'totalPoints',
        label: 'Total Possible Exam Points',
        sublabel: 'Max uncurved points on the test (e.g. 100)',
        min: 10,
        max: 200,
        defaultValue: 100
      },
      {
        id: 'highestScore',
        label: 'Highest Score in Class',
        sublabel: 'Highest raw score earned by any student',
        min: 1,
        max: 200,
        defaultValue: 88
      }
    ],
    calculate: (inputs: Record<string, number>): CalculatorResult => {
      const raw = Math.max(0, inputs.rawScore ?? 64);
      const total = Math.max(1, inputs.totalPoints ?? 100);
      const highest = Math.max(1, Math.min(total, inputs.highestScore ?? 88));

      // 1. Raw Percentage
      const rawPct = (raw / total) * 100;

      // 2. Square Root Curve Formula: Curved% = 10 * sqrt(Raw%)
      const sqrtCurved = Math.min(100, Math.round(10 * Math.sqrt(Math.max(0, rawPct)) * 10) / 10);

      // 3. Highest Score to 100% (Flat difference): add (total - highest) points
      const flatBonus = total - highest;
      const flatCurved = Math.min(100, Math.round((rawPct + flatBonus) * 10) / 10);

      // 4. Linear Proportional Scaling: Curved = (Raw / Highest) * 100
      const linearCurved = Math.min(100, Math.round((raw / highest) * 1000) / 10);

      // We feature the Square Root curve as primary standard
      const mainCurved = sqrtCurved;
      const boost = Math.round((mainCurved - rawPct) * 10) / 10;

      let letter = 'F';
      let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'rose';

      if (mainCurved >= 90) {
        letter = 'A';
        badgeColor = 'emerald';
      } else if (mainCurved >= 80) {
        letter = 'B';
        badgeColor = 'blue';
      } else if (mainCurved >= 70) {
        letter = 'C';
        badgeColor = 'amber';
      } else if (mainCurved >= 60) {
        letter = 'D';
        badgeColor = 'rose';
      }

      return {
        mainScore: mainCurved,
        mainScoreLabel: 'Square Root Curved Grade (%)',
        maxScore: 100,
        qualificationStatus: `Letter Grade ${letter} (+${boost}% boost)`,
        qualificationBadgeColor: badgeColor,
        percentileText: `Raw: ${Math.round(rawPct)}% → Curved: ${Math.round(mainCurved)}%`,
        compositePoints: mainCurved,
        maxCompositePoints: 100,
        isEstimated: false,
        subscores: [
          { label: 'Raw Uncurved Percentage', value: `${rawPct.toFixed(1)}% (${raw}/${total} pts)` },
          { label: 'Method 1: Square Root Curve (10 × √Raw)', value: `${sqrtCurved}% (+${(sqrtCurved - rawPct).toFixed(1)}%)` },
          { label: `Method 2: Top Score to 100% (Flat +${flatBonus})`, value: `${flatCurved}% (+${(flatCurved - rawPct).toFixed(1)}%)` },
          { label: 'Method 3: Proportional Curve (Raw / Top)', value: `${linearCurved}% (+${(linearCurved - rawPct).toFixed(1)}%)` }
        ],
        summaryNote: `With a raw score of ${raw}/${total} (${rawPct.toFixed(1)}%), the popular Square Root Curve boosts your grade to ${sqrtCurved}% (+${boost}%). If the professor scales the class high of ${highest} to 100%, your grade becomes ${flatCurved}%.`
      };
    },
    examSpecs: {
      totalDuration: 'Class Exam / Midterm Adjustment',
      totalQuestions: 'Raw Points Earned vs Class High',
      scaleRange: '0 - 100% Curved Scale',
      qualifyingScore: '70% Passing Grade Threshold',
      nationalAverage: 'Typical Curve Center: 75% - 80% (B-)',
      structureNote: 'Displays multiple curve models so students and instructors can evaluate grade distributions.',
      sections: [
        { name: 'Square Root Curve', questions: 'Curved = 10 × sqrt(Raw)', time: 'Standard Academia', weight: 'Helps lower scores most' },
        { name: 'Linear Proportional', questions: 'Curved = (Raw / Class High) × 100', time: 'Standard Academia', weight: 'Equal percentage boost' }
      ]
    },
    scoreScaleTable: [
      { score: 'Square Root (10√X)', label: 'Most Common Professor Curve', collegeCredit: 'A raw 64% becomes 80% (B); a raw 49% becomes 70% (C). Significantly aids lower scores.', typicalCutoff: 'Sub-linear scale' },
      { score: 'Top Score to 100', label: 'Flat Addition', collegeCredit: 'Adds identical difference (100 - Highest) to all students equally.', typicalCutoff: 'Additive shift' },
      { score: 'Linear Scaling', label: 'Proportional Normalization', collegeCredit: 'Sets class highest score to 100% and scales all students proportionally.', typicalCutoff: 'Multiplicative scale' },
      { score: 'Bell Curve (Normal Dist)', label: 'Standard Deviation Curve', collegeCredit: 'Centers median at C or B- and assigns top 10% an A, next 20% a B, etc.', typicalCutoff: 'Z-score calibration' }
    ],
    formulaExplanation: {
      title: 'Popular Grading Curve Formulas Explained',
      steps: [
        'Square Root Curve: Curved % = 10 × √(Raw %). For example, if raw score is 64%, 10 × √64 = 10 × 8 = 80%. A raw 81% becomes 90%.',
        'Top-Score Flat Curve: Find the difference between 100% and the class highest score (100 - High). Add this flat number of points to every student.',
        'Proportional Scaling: Curved Score = (Student Raw Score / Class High Score) × 100.',
        'Target Mean Shift: Shift the entire class distribution until the class average reaches the department-mandated mean (e.g. 78%).'
      ],
      rawToScaledNotes: 'The Square Root curve is favored by instructors because it provides a larger boost to struggling students without inflating already-high scores past 100%.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Grade A (90%+)', scoreNeeded: '81%+ Raw on Sqrt Curve', recommendation: 'Under the Square Root curve, a raw score of 81% translates directly into an A (90.0%).' },
        { target: 'Grade B (80%+)', scoreNeeded: '64%+ Raw on Sqrt Curve', recommendation: 'A raw score of 64% translates directly into a solid B (80.0%).' },
        { target: 'Passing Grade C (70%+)', scoreNeeded: '49%+ Raw on Sqrt Curve', recommendation: 'A raw failing score of 49% is curved up to a passing grade of 70%.' }
      ],
      strategicAdvice: 'Ask your professor if they curve individual exams or if they curve the final composite grades at the end of the term.'
    },
    faqs: [
      { question: 'What is the square root curve in grading?', answer: 'The square root curve takes the square root of your raw percentage and multiplies it by 10 (Curved = 10 * sqrt(Raw)). It boosts lower grades more than higher grades while never exceeding 100%.' },
      { question: 'Can a curve lower your grade?', answer: 'In traditional "strict bell-curve" systems where only a fixed percentage can earn each letter grade, a student with a high raw score could theoretically receive a lower grade if the entire class scored higher. However, modern professors almost exclusively use non-punitive curves.' },
      { question: 'Why do teachers curve exams?', answer: 'Curves adjust for unusually difficult or ambiguous exam questions, ensuring test grades reflect student ability relative to the actual difficulty of the test.' }
    ],
    relatedCalculatorIds: ['semester-grade', 'cumulative-gpa', 'marks-percentage', 'gpa']
  }
];
