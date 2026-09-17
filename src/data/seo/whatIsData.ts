import { CalculatorConfig } from '../../types';

const whatIsExplanations: Record<string, string[]> = {
  'ap-chemistry': [
    'The AP Chemistry Score Calculator is a free online tool that estimates your AP score based on your performance in the Multiple-Choice (MCQ) and Free-Response (FRQ) sections.',
    'Simply enter the number of correct answers from the MCQ section and the marks obtained in the FRQ section; the tool will then calculate your combined score and estimate the corresponding final AP score on a scale of 1 to 5. Whether you are studying independently or preparing through school, this AP Chem Score Calculator provides valuable insights.',
  ],
  'ap-biology': [
    'The AP Biology score calculator is an online tool that helps you to calculate your estimated AP Biology score based on your performance in the multiple-choice (MCQ) and free-response (FRQ) sections.',
    'You can calculate your composite score out of 100 points by entering the correct MCQ answers for Section I and the FRQ points for Section II. The calculator scales both sections according to their 50% exam weightage and then displays your estimated AP score on a scale of 1 to 5.',
  ],
  'ap-physics': [
    'The AP Physics 1 score calculator is an educational tool that helps students calculate their estimated AP Physics 1 score based on their performance in the multiple-choice (MCQ) and free-response (FRQ).',
    'The format of the 2027 AP Physics 1 exam includes 42 multiple-choice questions and 4 free-response questions. Each section contributes 50% to the overall exam score.',
    'Our calculator converts the raw scores from the MCQ and FRQ sections into a composite 100-point score based on their 50% weight, and then provides an estimated AP score (on a scale of 1 to 5) based on that composite score.'
  ],
  'ap-calculus-ab': [
    'The AP Calculus AB score calculator is an educational tool that helps students estimate their AP score (on a scale of 1–5) based on their performance in the multiple-choice (MCQ) and free-response (FRQ) sections.',
    'The format of the 2027 AP Calculus AB exam will consist of 42 multiple-choice questions and 6 free-response questions. The total duration of the exam is 3 hours and 10 minutes, both the multiple-choice and free-response sections carrying a equal weightage of 50%.'
  ],
  'ap-calculus-bc': [
    'The AP Calculus BC Score Calculator helps students estimate their AP Calculus BC score based on their multiple-choice and free-response performance. It follows the current 2027 AP Calculus BC exam structure, including 42 multiple-choice questions, 54 free-response points, and the 50/50 weighting between Sections I and II.',
    'You can use the calculator with College Board practice exams, released free-response questions, classroom tests, or mock exams. Enter your raw scores to get a normalized composite estimate and an estimated AP score from 1 to 5.'
  ],
  'ap-statistics': [
    'The AP Statistics Score Calculator is a free online tool that estimates your AP Statistics score from your performance on the multiple-choice and free-response sections.',
    'For the May 2027 AP Statistics Exam, the exam format changes significantly. The test becomes fully digital in Bluebook and includes 42 multiple-choice questions and 4 free-response questions. Each section accounts for 50% of the total exam score.',
    'This calculator uses the 2027 exam structure to give you an estimated composite score and an approximate AP score from 1 to 5.',
  ],
  'ap-computer-science-a': [
    'The AP CSA Score Calculator helps you estimate your AP Computer Science A score. Enter your MCQ and FRQ scores to see your estimated Composite Score out of 100.',
    'For the 2027 AP CSA exam, the 42 MCQs account for 55% of the score, and the 4 FRQs account for 45%. The calculator uses the weightings of these two sections to calculate your estimated score on a 100-point scale.',
    'This calculator provides only an estimate, not an official College Board score. The actual score is determined by the College Board.'
  ],
  'ap-environmental-science': [
    'The AP Environmental Science Score Calculator is a free online tool that helps you estimate your APES score based on your performance in the multiple-choice and free-response sections of the exam.',
    'The calculator uses the current College Board exam structure: 80 multiple-choice questions worth 60% of the exam score and 3 free-response questions worth 40%.',
    'The College Board does not publish a permanent raw-score-to-AP-score conversion table, the result from this APES score calculator should be treated as an estimate rather than an official AP score.'
  ],
  'ap-human-geography': [
    'The AP Human Geography Score Calculator is a free online tool that estimates your AP Human Geography score based on your performance in the multiple-choice and free-response sections.',
    'For the May 2027 AP Human Geography exam, the test has two sections. Multiple-choice questions account for 50% of the exam score, while free-response questions account for the other 50%. The College Board states that the question types and point values will remain stable from year to year.',
  ],
  'ap-world-history': [
    'The AP World History Score Calculator is a simple tool to estimate your AP score. It takes your performance in the Multiple-Choice Questions (MCQs), Short-Answer Questions (SAQs), Document-Based Question (DBQ), and Long Essay Question (LEQ), then combines them using the section weights for the 2027 AP World History: Modern exam.',
    'The calculator gives you an estimated 100-point composite score and uses an estimated score-conversion model to predict an AP score from 1 to 5.',
    'Note: This calculator result is an estimate, not an official College Board score. The final AP score is determined by College Board after the exam.'
  ],
  'ap-us-history': [
    'The APUSH Score Calculator is a free tool that estimates your AP U.S. History score from your performance on the multiple-choice questions (MCQs), short-answer questions (SAQs), DBQ, and LEQ.',
    'For the May 2027 AP U.S. History exam, your score is based on four parts: multiple-choice questions worth 40%, short-answer questions worth 20%, the DBQ worth 25%, and the LEQ worth 15%.',
    'Since the College Board does not publish a fixed raw-score-to-AP-score conversion chart, this calculator uses estimated scoring ranges to give you an idea of your possible AP score. The result is an estimate and not an official AP score.'
  ],
  'ap-psychology': [
    'The AP Psychology Score Calculator incorporates the updated exam format featuring 75 multiple-choice questions (66.7% weighting) and 2 newly structured free-response questions: Article Analysis and Evidence-Based Question (33.3% weighting).',
    'Designed for high school students and teachers adapting to the redesigned exam, this calculator lets you enter discrete rubric points for both new FRQ types to evaluate your overall exam readiness.',
    'Your result indicates an estimated 1 to 5 grade and percentile tier. Actual grades are awarded exclusively by the College Board through annual statistical equating.'
  ],
  'ap-english-language': [
    'The AP Lang score calculator is a handy tool that helps you estimate your score (on a scale of 1 to 5) for the 2027 AP English Language and Composition exam. It calculates an estimated composite score out of 100 by combining results from 45 multiple-choice questions (45%) and three free-response essays (55%).',
    'Enter your correct MCQ answers and scores for the Synthesis, Rhetorical Analysis, and Argument essays. Each essay is worth up to 6 points. The result is an estimate, not an official College Board score.',
  ],
  'ap-english-literature': [
    'The AP Lit Score Calculator helps you estimate your AP English Literature and Composition score from 1 to 5. It uses your 55 MCQs (45%) and 3 free-response essays (55%) to estimate your overall performance.',
    'With the AP English Literature Score Calculator, enter your MCQ score and points for the Poetry Analysis, Prose Fiction Analysis, and Literary Argument essays. It combines your results into an estimated score to help you see where you stand. The result is only an estimate, not an official College Board score.',
    
  ],
  'ap-macroeconomics': [
    'The AP Macro Score Calculator helps you estimate your AP Macroeconomics score from 1 to 5. It uses the 2027 exam format, including 60 multiple-choice questions and 3 free-response questions.',
    'Enter your MCQ and FRQ scores, and the calculator combines them into an estimated Composite Score out of 100. The result is only an estimate and not an official College Board score.'

  ],
  'ap-microeconomics': [
    'The AP Micro Score Calculator is a simple tool that helps you estimate your AP Microeconomics score from 1 to 5. Just enter your correct answers from the multiple-choice section and the points you earned on the free-response questions to see your estimated Composite Score out of 100.',
    'For the 2027 AP Microeconomics exam, the multiple-choice section has 60 questions and counts for 66.65% of the exam score. The free-response section has 3 questions and counts for 33.35%. Our calculator combines both sections using these weights to give you an estimated AP score.',
    'The result is only an estimate, since the College Board does not publish one fixed raw-score cutoff for each AP score every year. Your actual AP score may be different.'
  ],
  'ap-us-government': [
    'The AP Government Score Calculator helps you estimate your AP U.S. Government and Politics score from 1 to 5. Enter how many MCQs you got right and the points you earned on the 4 FRQs, and the calculator gives you an estimated Composite Score out of 100.',
    'For the 2027 exam, multiple choice and free response are each worth 50%. Your result is an estimate, not an official College Board score.'
  ],
  'ap-computer-science-principles': [
    'The AP CS Principles Score Calculator is a simple tool that helps you estimate your score on the AP Computer Science Principles exam.  You can enter your multiple-choice performance and your Create Performance Task score to see your estimated Composite Score out of 100.  ',
    'For the 2027 exam, the end-of-course section has 70 MCQs and is worth 70%, while the Create Performance Task is worth 30%. The calculator combines both parts and gives you an estimated AP score from 1 to 5.',
    'Keep in mind that this is only an estimate. The College Board does not publish a fixed raw-score-to-AP-score conversion, so your actual AP score may be different.'  
  ],
  'ap-precalculus': [
    'The AP Precalculus Score Calculator helps you estimate your AP score from 1 to 5 based on your performance on the 2027 AP Precalculus exam. Enter the number of multiple-choice questions you got right and your points from the four free-response questions to get an estimated Composite Score out of 100.',
    'The 2027 exam has 42 multiple-choice questions worth 62.5% and four free-response questions worth 37.5%. Each free-response question is worth up to 6 points. Your result is an estimate, not an official College Board score.'
  ],
  'sat': [
    'The Digital SAT Score Calculator converts your Reading and Writing (Module 1 and 2) and Math (Module 1 and 2) correct answers into an estimated total score on the official 400–1600 scale.',
    'Built for high school students, college counselors, and test-prep tutors, this tool accounts for the multi-stage adaptive nature of the digital exam, providing a realistic assessment of college admissions competitiveness.',
    'The calculated score provides a projected composite and sectional breakdown (200–800 each). Because College Board uses item response theory (IRT) to score the adaptive Digital SAT, all practice calculations represent realistic estimations.'
  ],
  'act': [
    'The ACT Score Calculator converts your raw section points across English (75 questions), Math (60 questions), Reading (40 questions), and Science (40 questions) into individual 1–36 scaled scores and calculates your composite average.',
    'Crucial for college applicants evaluating admissions criteria across test-optional and test-required universities, this tool highlights the exact section improvements needed to reach target composite benchmarks.',
    'Results display estimated 1–36 section scores, composite average, and national percentile ranks. Official scores are determined solely by ACT, Inc. using form-specific equating tables.'
  ],
  'psat': [
'The PSAT Score Calculator helps you quickly calculate your PSAT/NMSQT score using your Reading and Writing and Math section scores. Enter your scores from 160 to 760 for each section, and the calculator gives you your Total Score from 320 to 1520.',
'It also calculates your National Merit Selection Index, which ranges from 48 to 228 and is used for National Merit Scholarship Program consideration. The calculator follows the official PSAT/NMSQT scoring scales, so you can easily check your results without doing the math yourself.'
  ],
  'ielts': [
    'The IELTS Band Score Calculator converts your raw points on Listening (0–40) and Reading (0–40) into academic band scores, combining them with Writing and Speaking to calculate your Overall Band Score on the 0 to 9 scale.',
    'Essential for international students, skilled immigrants, and professionals applying to universities or visa programs in the UK, Canada, Australia, and the US, this tool implements the official 0.25 and 0.75 band rounding rules.',
    'Your result indicates your overall band level, CEFR equivalency (e.g., C1, C2), and language competency profile. Official Test Report Forms (TRFs) are issued exclusively by IDP, British Council, or Cambridge English.'
  ],
  'pte': [
    'The PTE Academic Score Calculator estimates your overall score on the 10–90 Pearson scale based on your communicative skills in Speaking, Writing, Reading, and Listening.',
    'Created for students and migration candidates preparing for the Pearson Test of English, this tool helps you evaluate whether your section balance meets university or visa English requirements.',
    'Outputs show estimated overall scores, CEFR alignment, and visa qualification notes. Official scores are scored by Pearson’s automated scoring engine.'
  ],
  'gre': [
    'The GRE General Test Score Calculator converts your Verbal Reasoning and Quantitative Reasoning raw scores into estimated scaled scores on the 130–170 scale, along with an optional Analytical Writing score (0–6).',
    'Designed for graduate and professional school applicants, this tool models the shorter GRE format (27 Verbal questions and 27 Quantitative questions) to provide an estimated score based on your performance across both sections.',
    'Calculated scores represent estimated section and total scores based on section-level adaptive test structures. Official score reports are generated exclusively by Educational Testing Service (ETS).'
  ],
  'gmat': [
    'The GMAT Focus Edition Score Calculator estimates your total score on the revised 205–805 scale based on your section scores in Quantitative Reasoning, Verbal Reasoning, and Data Insights (60–90 each).',
    'Essential for MBA and Master’s in Management applicants, this tool incorporates the equal one-third weighting of the Data Insights section introduced in the Focus Edition.',
    'Results provide an estimated total score, percentile rank, and business school competitiveness profile. Official scores are verified exclusively by the Graduate Management Admission Council (GMAC).'
  ],
  'lsat': [
    'The LSAT Score Calculator converts your raw correct answers across Logical Reasoning and Reading Comprehension sections into a scaled score on the 120–180 scale and provides estimated national percentiles.',
    'Engineered for prospective law students targeting JD programs, this tool reflects the modern exam structure (no logic games) to show how individual correct answers impact your scaled score.',
    'Outputs display estimated scaled scores and law school admissions percentiles. Formal score scaling and percentiles are issued exclusively by the Law School Admission Council (LSAC).'
  ],
  'mcat': [
    'The MCAT Score Calculator converts section raw scores across Chemical & Physical Foundations, CARS, Biological & Biochemical Foundations, and Psychological & Social Foundations into 118–132 scaled scores and a total 472–528 score.',
    'Built for pre-medical students navigating the medical school admissions cycle, this calculator provides detailed section percentiles and competitive admission benchmarks.',
    'All results are estimated scores calibrated against AAMC score release curves. Official MCAT score reports are issued exclusively by the Association of American Medical Colleges.'
  ],
  'semester-grade': [
    'The Semester Grade Calculator calculates your final semester grade by combining quarter or term grades with your final exam weight. It also allows you to calculate the exact final exam score needed to achieve your target grade.',
    'Useful for middle school, high school, and college students, this tool eliminates academic anxiety by showing whether a desired letter grade is mathematically attainable.',
    'Outputs display your current standing, weighted semester percentage, and required final exam score. Results are exact mathematical calculations based on your school’s grading syllabus.'
  ],
  'cumulative-gpa': [
    'The Cumulative GPA Calculator determines your updated grade point average by combining your existing college or high school credits with your new semester course grades and credits.',
    'Designed for university students, scholarship recipients, and academic advisors, this tool shows the precise impact of recent semester grades on overall cumulative standing on a 4.0 scale.',
    'The calculated GPA is an exact mathematical projection based on credit-weighted averages. Official transcripts are verified directly by your educational institution’s registrar.'
  ],
  'marks-percentage': [
    'The Marks Percentage Calculator converts your raw marks obtained out of total maximum marks into an accurate percentage and academic division.',
    'Helpful for students, parents, and educators across diverse international curricula (CBSE, ICSE, GCSE, state boards, and collegiate exams), this tool supports multi-subject totals and instant division assignments.',
    'Calculations are mathematically exact based on standard percentage formulas (Marks Obtained ÷ Maximum Marks × 100). Institutional grading policies may apply custom rounding rules.'
  ],
  'grade-curve': [
    'The Grade Curve Calculator applies popular academic curving methodologies—including square root curves, flat point additions, linear scaling, and bell curve normalization—to raw class test scores.',
    'Created for professors, classroom teachers, and curious students, this tool lets you compare different curving methods to ensure fair and equitable grade distributions.',
    'Results display both the original raw percentage and the curved score with percentage increases. Curving policies are determined at the discretion of the course instructor or department.'
  ],
  '5e-point-buy': [
    'The 5e Point Buy Calculator is an interactive character creation tool for Dungeons & Dragons 5th Edition. It lets players allocate their 27 attribute points across Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma according to official rules.',
    'Perfect for tabletop RPG players, dungeon masters, and character builders, this tool prevents illegal stat allocations by enforcing the standard 8 to 15 point-cost progression table.',
    'Calculations are 100% compliant with the official D&D 5e System Reference Document (SRD). Point buy totals reflect official tabletop mechanics.'
  ],
  'mean-absolute-deviation': [
    'The Mean Absolute Deviation (MAD) Calculator computes the statistical spread of a dataset by finding the arithmetic mean and averaging the absolute distances between each data point and the mean.',
    'Designed for statistics students, data analysts, and researchers, this tool provides step-by-step deviations, mean calculations, and variability interpretations.',
    'All outputs are mathematically exact statistical figures that illustrate data dispersion without squaring differences.'
  ],
  'interquartile-range': [
    'The Interquartile Range (IQR) Calculator computes the middle 50% spread of a dataset by finding the first quartile (Q1), median (Q2), third quartile (Q3), and the interquartile range (IQR = Q3 - Q1), along with outlier fences.',
    'Ideal for AP Statistics students, researchers, and data scientists, this tool identifies mild and extreme outliers using standard 1.5 × IQR boundaries.',
    'Results are mathematically exact based on established statistical quartile conventions and boxplot analysis.'
  ],
  'iqr': [
    'The Interquartile Range (IQR) Calculator computes the middle 50% spread of a dataset by finding the first quartile (Q1), median (Q2), third quartile (Q3), and the interquartile range (IQR = Q3 - Q1), along with outlier fences.',
    'Ideal for AP Statistics students, researchers, and data scientists, this tool identifies mild and extreme outliers using standard 1.5 × IQR boundaries.',
    'Results are mathematically exact based on established statistical quartile conventions and boxplot analysis.'
  ]
};

export function getWhatIsExplanation(calc: CalculatorConfig): string[] {
  if (calc.whatIsSection?.paragraphs && calc.whatIsSection.paragraphs.length > 0) {
    return calc.whatIsSection.paragraphs;
  }
  if (whatIsExplanations[calc.id]) {
    return whatIsExplanations[calc.id];
  }
  if (calc.id === 'iqr' && whatIsExplanations['interquartile-range']) {
    return whatIsExplanations['interquartile-range'];
  }
  if (calc.id === 'ap-us-government' && whatIsExplanations['ap-government']) {
    return whatIsExplanations['ap-government'];
  }
  if (calc.id === 'ap-government' && whatIsExplanations['ap-us-government']) {
    return whatIsExplanations['ap-us-government'];
  }

  // Dynamic high-quality fallback adhering strictly to user guidelines
  const isEstimated = !['semester-grade', 'cumulative-gpa', 'marks-percentage', '5e-point-buy', 'mean-absolute-deviation', 'interquartile-range', 'iqr'].includes(calc.id);

  return [
    `The ${calc.title} is an academic calculation and estimation tool designed to evaluate your performance and provide an immediate assessment of your score based on official curriculum rubrics. It models the specific structure of the test, weighting section points and applying psychometric distribution curves.`,
    `This calculator is useful for students studying for their exams, educators designing benchmark practice tests, and academic counselors tracking student progress. By inputting your sectional practice scores into the verified fields, you can pinpoint specific academic strengths and identify areas where targeted review will yield the greatest score improvement.`,
    `Your result provides a comprehensive summary of your performance, including score projections, component contributions, and percentile insights. ${isEstimated ? 'Please note that while our scoring model utilizes published weights and historical data, official score curves are determined exclusively by the testing authorities through annual equating.' : 'All calculations represent mathematically exact formulas based on standard educational grading policies.'}`
  ];
}
