import { CalculatorConfig, SeoArticle, SeoBlock } from '../../types';
import { getWhatIsExplanation } from './whatIsData';

/**
 * Formats grammatically correct heading for the 'What is' section
 * (e.g. 'What is AP Chemistry?' instead of 'What is the AP Chemistry?').
 */
function formatWhatIsHeading(name: string): string {
  if (/^the\s+/i.test(name)) {
    return `What is ${name}?`;
  }
  if (/^AP\b/i.test(name)) {
    return `What is ${name}?`;
  }
  if (/calculator/i.test(name)) {
    return `What is the ${name}?`;
  }
  if (/^(Digital\s+)?(SAT|ACT|GRE|GMAT|LSAT|MCAT|PSAT|PTE|IELTS)\b/i.test(name)) {
    return `What is the ${name}?`;
  }
  return `What is ${name}?`;
}

/**
 * Generates or retrieves the complete, centralized SEO article structure for a calculator.
 * All calculator SEO sections (What is, score ranges, formulas, exam structure, FAQs)
 * are managed from this single centralized definition.
 */
export function getCalculatorSeoArticle(config: CalculatorConfig): SeoArticle {
  if (config.seoArticle) {
    return config.seoArticle;
  }

  const blocks: SeoBlock[] = [];
  const tableOfContents: { id: string; label: string }[] = [];

  // 1. WHAT IS SECTION
  const whatIsParagraphs = getWhatIsExplanation(config);
  const whatIsId = 'what-is';
  const headingLabel = formatWhatIsHeading(config.shortName);
  tableOfContents.push({ id: whatIsId, label: headingLabel });
  blocks.push({
    type: 'h2',
    id: whatIsId,
    title: headingLabel
  });

  if (whatIsParagraphs && whatIsParagraphs.length > 0) {
    blocks.push({
      type: 'paragraphs',
      texts: whatIsParagraphs
    });
  } else if (config.overview) {
    blocks.push({
      type: 'paragraph',
      text: config.overview
    });
  }

  // 2. UNDERSTANDING ESTIMATED SCORE & SCALE TABLE
  if (config.id !== 'marks-percentage' && config.scoreScaleTable && config.scoreScaleTable.length > 0 && config.id !== 'psat') {
    const scaleId = 'score-scale';
    tableOfContents.push({ id: scaleId, label: 'Understanding Your Estimated Score' });
    blocks.push({
      type: 'h2',
      id: scaleId,
      title: 'Understanding Your Estimated Score'
    });
    blocks.push({
      type: 'paragraph',
      text: "These score ranges and cutoffs are calibrated based on historical score curves and psychometric equating standards. Because official testing organizations do not publish a single permanent raw-to-scaled conversion chart prior to testing, these projections provide the closest reliable benchmarks for your exam preparation."
    });
    blocks.push({
      type: 'table',
      id: 'score-scale-table',
      data: {
        headers: ['Score / Level', 'Qualification Meaning', 'Estimated Composite Cutoff'],
        rows: config.scoreScaleTable.map((row) => [
          row.score,
          row.label,
          row.typicalCutoff
        ])
      }
    });
  }

  // 3. HOW THE CALCULATOR WORKS & FORMULA EXPLANATION
  if (config.formulaExplanation) {
    const formulaId = 'how-it-works';
    tableOfContents.push({ id: formulaId, label: 'How the Calculator Works' });
    blocks.push({
      type: 'h2',
      id: formulaId,
      title: config.formulaExplanation.title || 'How the Calculator Works'
    });
    blocks.push({
      type: 'paragraph',
      text: `Our calculator calculates your composite score by combining your raw section points using the exact official weighting methodology established for the ${config.shortName}:`
    });

    if (config.formulaExplanation.steps && config.formulaExplanation.steps.length > 0) {
      blocks.push({
        type: 'orderedList',
        items: config.formulaExplanation.steps
      });
    }

    if (config.formulaExplanation.rawToScaledNotes) {
      blocks.push({
        type: 'callout',
        variant: 'info',
        title: 'Important Scoring Policy',
        text: config.formulaExplanation.rawToScaledNotes
      });
    }
  }

  // 4. EXAM STRUCTURE & SECTION SPECIFICATIONS
  if (config.id !== 'marks-percentage' && config.examSpecs?.sections && config.examSpecs.sections.length > 0) {
    const structureId = 'exam-structure';
    tableOfContents.push({ id: structureId, label: 'Exam Structure & Specifications' });
    blocks.push({
      type: 'h2',
      id: structureId,
      title: 'Exam Structure & Section Specifications'
    });
    blocks.push({
      type: 'paragraph',
      text: `To maximize your composite score, understanding the time allocation, question distribution, and section weighting of the ${config.title} is essential:`
    });
    blocks.push({
      type: 'table',
      id: 'exam-structure-table',
      data: {
        headers: ['Section Name', 'Number of Questions', 'Time Allotted', 'Weighting in Total Score'],
        rows: config.examSpecs.sections.map((sec) => [
          sec.name,
          sec.questions,
          sec.time,
          sec.weight
        ])
      }
    });

    if (config.examSpecs.structureNote) {
      blocks.push({
        type: 'paragraph',
        text: `*Note on Format: ${config.examSpecs.structureNote}`
      });
    }
  }

  // 5. SCORE INTERPRETATION (if present)
  if (config.id !== 'marks-percentage' && config.scoreInterpretation) {
    const interpId = 'score-targets';
    tableOfContents.push({ id: interpId, label: 'Target Scores & Study Advice' });
    blocks.push({
      type: 'h2',
      id: interpId,
      title: 'Score Targets & Strategic Recommendations'
    });

    if (config.scoreInterpretation.targetRanges?.length > 0) {
      blocks.push({
        type: 'table',
        id: 'target-ranges-table',
        data: {
          headers: ['Target Score', 'Raw Points Needed', 'Strategic Recommendation'],
          rows: config.scoreInterpretation.targetRanges.map((tr) => [
            tr.target,
            tr.scoreNeeded,
            tr.recommendation
          ])
        }
      });
    }

    if (config.scoreInterpretation.strategicAdvice) {
      blocks.push({
        type: 'callout',
        variant: 'note',
        title: 'Psychometric Insight',
        text: config.scoreInterpretation.strategicAdvice
      });
    }
  }

  // 6. FAQS ACCORDION
  if (config.faqs && config.faqs.length > 0) {
    const faqsId = 'faqs';
    tableOfContents.push({ id: faqsId, label: 'Frequently Asked Questions' });
    blocks.push({
      type: 'h2',
      id: faqsId,
      title: `Frequently Asked Questions: ${config.shortName}`
    });
    blocks.push({
      type: 'faqs',
      items: config.faqs,
      title: `Common Questions About ${config.shortName}`
    });
  }

  return {
    calculatorId: config.id,
    title: config.title,
    tableOfContents,
    blocks
  };
}
