import { CalculatorConfig } from '../types';
import { apCalculators } from './calculators/apCalculators';
import { apHumanitiesCalculators } from './calculators/apHumanitiesCalculators';
import { standardizedCalculators } from './calculators/standardizedCalculators';
import { newApCalculators } from './calculators/newApCalculators';
import { standardizedNewCalculators } from './calculators/standardizedNewCalculators';
import { academicCalculators } from './calculators/academicCalculators';
import { mathCalculators } from './calculators/mathCalculators';

export const allCalculators: CalculatorConfig[] = [
  ...apCalculators,
  ...apHumanitiesCalculators,
  ...standardizedCalculators,
  ...newApCalculators,
  ...standardizedNewCalculators,
  ...academicCalculators,
  ...mathCalculators
];

export { getCalculatorSeoArticle } from './seo/seoContent';

export {
  getCalculatorSlug,
  getCalculatorPath,
  getCalculatorBySlug
} from '../utils/slugs';

export function getRelatedCalculators(calc: CalculatorConfig): CalculatorConfig[] {
  const byId = calc.relatedCalculatorIds
    .map((id) => allCalculators.find((c) => c.id === id))
    .filter((c): c is CalculatorConfig => Boolean(c));

  if (byId.length >= 3) return byId.slice(0, 4);

  // Fallback to same category
  const sameCategory = allCalculators
    .filter((c) => c.id !== calc.id && c.category === calc.category && !byId.some((b) => b.id === c.id))
    .slice(0, 4 - byId.length);

  return [...byId, ...sameCategory];
}

export function getPopularCalculators(): CalculatorConfig[] {
  return allCalculators.filter((c) => c.isPopular);
}

const cardDescriptionsMap: Record<string, string> = {
  'ap-chemistry': 'Estimate your AP Chemistry score from Section I MCQs and Section II FRQ composite.',
  'ap-biology': 'Calculate your composite score based on 60 MCQs and 6 Free Response questions.',
  'ap-physics': 'Algebra-based composite estimation for the 2027 AP Physics 1 exam.',
  'ap-calculus-ab': 'Calculate estimated AP grade across Calculator and No-Calculator sections.',
  'ap-calculus-bc': 'Complete BC Calculus score calculator including automated AB subscore breakdown.',
  'ap-statistics': 'MCQ and 6 FRQs with investigative task scoring breakdown and scaling curves.',
  'ap-computer-science-a': 'Calculate scaled Java score across 40 Section I MCQs and 4 Free Response coding questions.',
  'ap-environmental-science': 'Estimate your AP Environmental Science score based on 80 MCQs and 3 Free Response questions.',
  'ap-human-geography': 'Calculate your scaled AP score from 60 multiple-choice questions and 3 analytical free response prompts.',
  'ap-world-history': 'Estimate scaled World History grade across Section I MCQs, Short Answers, DBQ, and LEQ.',
  'ap-us-history': 'Calculate your AP US History composite grade across MCQs, Short Answers, DBQ, and Long Essay.',
  'ap-psychology': 'Predict your AP Psychology score using the updated 75-MCQ and 2-FRQ scoring rubric.',
  'ap-english-language': 'Estimate your AP Lang score based on 45 reading MCQs and 3 timed analytical essays.',
  'ap-english-literature': 'Convert your 55 prose/poetry MCQs and 3 Free Response essays into a 1-5 AP score.',
  'sat': 'Estimate your Digital SAT 400-1600 composite score from Reading/Writing and Math raw points.',
  'act': 'Calculate your 1-36 ACT composite score across English, Math, Reading, and Science sections.',
  'gre': 'Convert your Verbal and Quantitative raw correct answers into scaled 130-170 scores.',
  'gmat': 'Calculate your GMAT Focus Edition 205-805 scaled score across Quantitative, Verbal, and Data.',
  'lsat': 'Predict your 120-180 LSAT scaled score and national percentile from practice section points.',
  'mcat': 'Calculate your total 472-528 MCAT score and section percentiles from raw section totals.',
  'semester-grade': 'Calculate your final semester grade and find the exact score needed on your final exam.',
  'ap-macroeconomics': 'Estimate your 1–5 AP Macroeconomics score from 60 MCQs and 3 Free-Response questions.',
  'ap-microeconomics': 'Calculate your AP Microeconomics score based on 60 MCQs and 3 Free-Response questions.',
  'ap-government': 'Estimate your AP US Gov score across 55 MCQs and 4 Free-Response questions.',
  'ap-us-government': 'Estimate your AP US Gov score across 55 MCQs and 4 Free-Response questions.',
  'ap-computer-science-principles': 'Calculate your AP CSP score from the 70-question digital exam and Create Task.',
  'cumulative-gpa': 'Calculate your cumulative GPA by combining past college or high school credits and terms.',
  'marks-percentage': 'Convert marks obtained out of total maximum marks into percentage and academic division.',
  'grade-curve': 'Apply popular grading curves including square root, linear scaling, and bell curve.',
  'ielts': 'Convert raw Listening and Reading points into IELTS 0–9 bands with overall rounding.',
  'pte': 'Calculate your PTE Academic 10–90 overall score across all 4 communicative skills.',
  'psat': 'Convert digital PSAT points to 320–1520 total and National Merit Selection Index.',
  '5e-point-buy': 'Allocate your 27 ability points for D&D 5th Edition characters using official rules.',
  'ap-precalculus': 'Estimate your AP Precalculus score across calculator, no-calc, and 4 FRQ tasks.',
  'mean-absolute-deviation': 'Compute the statistical spread of a dataset by averaging absolute distances from mean.',
  'interquartile-range': 'Calculate Q1, median, Q3, and IQR with mild and extreme outlier detection.',
  'iqr': 'Calculate Q1, median, Q3, and IQR with mild and extreme outlier detection.'
};

export function getCardDescription(calc: CalculatorConfig): string {
  if (calc.cardDescription) return calc.cardDescription;
  if (cardDescriptionsMap[calc.id]) return cardDescriptionsMap[calc.id];
  return calc.overview;
}

export function searchCalculators(query: string): CalculatorConfig[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return allCalculators;

  const terms = clean.split(/\s+/).filter(Boolean);

  return allCalculators.filter((c) => {
    const cardDesc = getCardDescription(c).toLowerCase();
    const keywords = (c.keywords || []).join(' ').toLowerCase();
    const searchableText = `${c.title} ${c.shortName} ${c.id} ${c.categoryLabel} ${c.overview} ${cardDesc} ${c.yearFormat} ${keywords}`.toLowerCase();

    return terms.every((term) => searchableText.includes(term));
  });
}
