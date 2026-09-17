import { CalculatorConfig, CalculatorResult } from '../../types';

export const mathCalculators: CalculatorConfig[] = [
  // 1. Mean Absolute Deviation Calculator
  {
    id: 'mean-absolute-deviation',
    title: 'Mean Absolute Deviation Calculator',
    shortName: 'MAD Calculator',
    category: 'math',
    categoryLabel: 'Math & Statistics',
    yearFormat: 'Descriptive Statistics',
    seoTitle: 'Mean Absolute Deviation Calculator | Step-by-Step MAD Solver',
    metaDescription: 'Calculate the Mean Absolute Deviation (MAD) of a dataset with step-by-step deviations, arithmetic mean, and variability interpretation.',
    overview: 'Calculate the Mean Absolute Deviation (MAD) of a dataset. MAD measures the average distance between each data point and the mean, providing an intuitive, outlier-resilient measure of statistical variability.',
    cardDescription: 'Calculate Mean Absolute Deviation (MAD), absolute deviations, and variance.',
    fields: [
      {
        id: 'val1',
        label: 'Data Value 1',
        sublabel: 'First sample number',
        min: -1000,
        max: 1000,
        defaultValue: 12
      },
      {
        id: 'val2',
        label: 'Data Value 2',
        sublabel: 'Second sample number',
        min: -1000,
        max: 1000,
        defaultValue: 18
      },
      {
        id: 'val3',
        label: 'Data Value 3',
        sublabel: 'Third sample number',
        min: -1000,
        max: 1000,
        defaultValue: 15
      },
      {
        id: 'val4',
        label: 'Data Value 4',
        sublabel: 'Fourth sample number',
        min: -1000,
        max: 1000,
        defaultValue: 22
      },
      {
        id: 'val5',
        label: 'Data Value 5',
        sublabel: 'Fifth sample number',
        min: -1000,
        max: 1000,
        defaultValue: 8
      }
    ],
    calculate: (inputs: Record<string, number>): CalculatorResult => {
      const v1 = inputs.val1 ?? 12;
      const v2 = inputs.val2 ?? 18;
      const v3 = inputs.val3 ?? 15;
      const v4 = inputs.val4 ?? 22;
      const v5 = inputs.val5 ?? 8;

      const values = [v1, v2, v3, v4, v5];
      const n = values.length;
      const sum = values.reduce((acc, v) => acc + v, 0);
      const mean = sum / n;

      const deviations = values.map(v => Math.abs(v - mean));
      const sumDeviations = deviations.reduce((acc, d) => acc + d, 0);
      const mad = Math.round((sumDeviations / n) * 100) / 100;

      // Sample variance and standard deviation for comparison
      const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1);
      const stdDev = Math.round(Math.sqrt(variance) * 100) / 100;

      return {
        mainScore: mad,
        mainScoreLabel: 'Mean Absolute Deviation (MAD)',
        maxScore: Math.max(...values),
        qualificationStatus: `Mean (x̄) = ${mean.toFixed(2)} | MAD = ${mad.toFixed(2)}`,
        qualificationBadgeColor: 'blue',
        percentileText: `Std Dev: ${stdDev.toFixed(2)}`,
        compositePoints: mad,
        maxCompositePoints: 100,
        isEstimated: false,
        subscores: [
          { label: 'Arithmetic Mean (x̄)', value: `${mean.toFixed(2)} (Sum: ${sum})` },
          { label: 'Absolute Deviations Σ|x - x̄|', value: `${deviations.map(d => d.toFixed(1)).join(', ')}` },
          { label: 'Sum of Absolute Deviations', value: `${sumDeviations.toFixed(2)}` },
          { label: 'Standard Deviation (s)', value: `${stdDev.toFixed(2)}` }
        ],
        summaryNote: `The Mean Absolute Deviation is ${mad.toFixed(2)}. On average, each data point deviates from the sample mean of ${mean.toFixed(2)} by ${mad.toFixed(2)} units.`
      };
    },
    examSpecs: {
      totalDuration: 'Statistical Analysis',
      totalQuestions: '5-Point Sample Dataset',
      scaleRange: '0 to +Infinity (Distance Metric)',
      qualifyingScore: 'Lower MAD indicates higher clustering / consistency',
      nationalAverage: 'Descriptive Dispersion Metric',
      structureNote: 'Unlike standard deviation, MAD does not square deviations, giving equal weight to all errors.',
      sections: [
        { name: 'Step 1: Central Tendency', questions: 'Arithmetic Mean Calculation', time: 'N/A', weight: 'Foundation' },
        { name: 'Step 2: Distance Dispersion', questions: 'Sum of Absolute Distances', time: 'N/A', weight: 'MAD Metric' }
      ]
    },
    scoreScaleTable: [
      { score: 'MAD ≈ 0', label: 'Zero Variability', collegeCredit: 'All data points are identical; no deviation from central mean.', typicalCutoff: 'Uniform data' },
      { score: 'Low MAD', label: 'High Clustering', collegeCredit: 'Data points are grouped closely around the mean; low spread.', typicalCutoff: 'Precise distribution' },
      { score: 'High MAD', label: 'High Dispersion', collegeCredit: 'Data points are widely scattered away from the average.', typicalCutoff: 'Wide spread' },
      { score: 'MAD vs Std Dev', label: 'Comparison Ratio', collegeCredit: 'For normal distributions, MAD ≈ 0.7979 × Standard Deviation.', typicalCutoff: 'Normal limit' }
    ],
    formulaExplanation: {
      title: 'Mean Absolute Deviation (MAD) Formula',
      steps: [
        'Find the arithmetic mean (average) of the dataset: x̄ = (Σ x) / n.',
        'Calculate the absolute distance between each data value and the mean: |x_i - x̄|.',
        'Add all absolute differences together: Σ |x_i - x̄|.',
        'Divide the sum of absolute deviations by the number of data points n: MAD = (Σ |x_i - x̄|) / n.'
      ],
      rawToScaledNotes: 'Because distances are always non-negative (absolute values), positive and negative differences never cancel each other out.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Low Dispersion', scoreNeeded: 'MAD < 10% of Mean', recommendation: 'Indicates high reliability and tight consistency in measurements.' },
        { target: 'Moderate Dispersion', scoreNeeded: 'MAD 10-25% of Mean', recommendation: 'Standard variability observed in natural biological and academic testing.' },
        { target: 'High Dispersion', scoreNeeded: 'MAD > 30% of Mean', recommendation: 'Signifies widespread scatter or potential presence of extreme outliers.' }
      ],
      strategicAdvice: 'Use MAD when your dataset contains extreme outliers that would artificially distort standard deviation.'
    },
    faqs: [
      { question: 'What does Mean Absolute Deviation tell you?', answer: 'MAD tells you the average distance between every individual data point in your dataset and the central average (mean). A smaller MAD indicates that the data is closely clustered around the mean.' },
      { question: 'Why use MAD instead of Standard Deviation?', answer: 'Standard deviation squares each difference, which heavily amplifies the impact of extreme outliers. MAD weights all deviations linearly, making it more resilient.' },
      { question: 'Can MAD ever be negative?', answer: 'No. Because MAD uses absolute values (|x - mean|), the distance can never be negative.' }
    ],
    relatedCalculatorIds: ['iqr']
  },

  // 2. Interquartile Range (IQR) Calculator
  {
    id: 'iqr',
    title: 'IQR Calculator',
    shortName: 'IQR Calculator',
    category: 'math',
    categoryLabel: 'Math & Statistics',
    yearFormat: 'Descriptive Statistics',
    seoTitle: 'IQR Calculator | Interquartile Range & Outlier Fence Solver',
    metaDescription: 'Calculate the Interquartile Range (IQR), Q1 (25th percentile), Q3 (75th percentile), and outlier fences (1.5 x IQR rule) for any five-number summary.',
    overview: 'Calculate the Interquartile Range (IQR) and statistical outlier boundaries. IQR measures the statistical spread of the middle 50% of a distribution, widely used in box plots and Tukey outlier identification.',
    cardDescription: 'Calculate Interquartile Range (IQR), Q1, Q3, and 1.5 x IQR outlier boundaries.',
    fields: [
      {
        id: 'q1',
        label: 'First Quartile (Q1 / 25th Percentile)',
        sublabel: 'Lower quartile boundary',
        min: -1000,
        max: 1000,
        defaultValue: 35
      },
      {
        id: 'median',
        label: 'Median (Q2 / 50th Percentile)',
        sublabel: 'Middle value of dataset',
        min: -1000,
        max: 1000,
        defaultValue: 48
      },
      {
        id: 'q3',
        label: 'Third Quartile (Q3 / 75th Percentile)',
        sublabel: 'Upper quartile boundary',
        min: -1000,
        max: 1000,
        defaultValue: 62
      },
      {
        id: 'minVal',
        label: 'Minimum Sample Value',
        sublabel: 'Smallest observed data point',
        min: -1000,
        max: 1000,
        defaultValue: 15
      },
      {
        id: 'maxVal',
        label: 'Maximum Sample Value',
        sublabel: 'Largest observed data point',
        min: -1000,
        max: 1000,
        defaultValue: 95
      }
    ],
    validate: (inputs: Record<string, number | ''>): Record<string, string> | null => {
      const q1 = inputs.q1;
      const median = inputs.median;
      const q3 = inputs.q3;
      const minVal = inputs.minVal;
      const maxVal = inputs.maxVal;

      const errs: Record<string, string> = {};

      if (typeof q1 === 'number' && typeof q3 === 'number' && q1 > q3) {
        errs.q1 = 'Q1 (25th percentile) cannot be greater than Q3 (75th percentile).';
      }
      if (typeof minVal === 'number' && typeof maxVal === 'number' && minVal > maxVal) {
        errs.minVal = 'Minimum value cannot be greater than maximum value.';
      }
      if (typeof minVal === 'number' && typeof q1 === 'number' && minVal > q1) {
        errs.minVal = 'Minimum value cannot be greater than Q1.';
      }
      if (typeof maxVal === 'number' && typeof q3 === 'number' && maxVal < q3) {
        errs.maxVal = 'Maximum value cannot be less than Q3.';
      }
      if (typeof median === 'number' && typeof q1 === 'number' && median < q1) {
        errs.median = 'Median cannot be less than Q1.';
      }
      if (typeof median === 'number' && typeof q3 === 'number' && median > q3) {
        errs.median = 'Median cannot be greater than Q3.';
      }

      return Object.keys(errs).length > 0 ? errs : null;
    },
    calculate: (inputs: Record<string, number>): CalculatorResult => {
      const q1 = inputs.q1 ?? 35;
      const median = inputs.median ?? 48;
      const q3 = inputs.q3 ?? 62;
      const minVal = inputs.minVal ?? 15;
      const maxVal = inputs.maxVal ?? 95;

      if (q1 > q3) {
        return {
          error: 'Q1 (25th percentile) cannot be greater than Q3 (75th percentile).',
          mainScore: '—',
          mainScoreLabel: 'Interquartile Range (IQR)',
          qualificationStatus: 'Invalid Summary',
          qualificationBadgeColor: 'rose',
          percentileText: 'Error',
          compositePoints: 0,
          maxCompositePoints: 100,
          isEstimated: false,
          subscores: [],
          summaryNote: 'First Quartile (Q1) must be less than or equal to Third Quartile (Q3).'
        };
      }

      if (minVal > maxVal) {
        return {
          error: 'Minimum value cannot be greater than maximum value.',
          mainScore: '—',
          mainScoreLabel: 'Interquartile Range (IQR)',
          qualificationStatus: 'Invalid Summary',
          qualificationBadgeColor: 'rose',
          percentileText: 'Error',
          compositePoints: 0,
          maxCompositePoints: 100,
          isEstimated: false,
          subscores: [],
          summaryNote: 'Minimum sample value must be less than or equal to maximum sample value.'
        };
      }

      const iqr = Math.max(0, Math.round((q3 - q1) * 100) / 100);
      const range = Math.max(0, Math.round((maxVal - minVal) * 100) / 100);

      // Tukey's Outlier Rule:
      // Lower Fence = Q1 - 1.5 * IQR
      // Upper Fence = Q3 + 1.5 * IQR
      const lowerFence = Math.round((q1 - 1.5 * iqr) * 100) / 100;
      const upperFence = Math.round((q3 + 1.5 * iqr) * 100) / 100;

      const hasLowerOutlier = minVal < lowerFence;
      const hasUpperOutlier = maxVal > upperFence;

      let outlierText = 'No Outliers Detected';
      let badgeColor: CalculatorResult['qualificationBadgeColor'] = 'emerald';

      if (hasLowerOutlier && hasUpperOutlier) {
        outlierText = 'Both Low & High Outliers Detected';
        badgeColor = 'rose';
      } else if (hasLowerOutlier) {
        outlierText = `Low Outlier Detected (< ${lowerFence})`;
        badgeColor = 'amber';
      } else if (hasUpperOutlier) {
        outlierText = `High Outlier Detected (> ${upperFence})`;
        badgeColor = 'amber';
      }

      return {
        mainScore: iqr,
        mainScoreLabel: 'Interquartile Range (IQR)',
        maxScore: range,
        qualificationStatus: outlierText,
        qualificationBadgeColor: badgeColor,
        percentileText: `Spread: Middle 50% = ${iqr}`,
        compositePoints: iqr,
        maxCompositePoints: range > 0 ? range : 100,
        isEstimated: false,
        subscores: [
          { label: 'First Quartile (Q1)', value: `${q1}` },
          { label: 'Median (Q2)', value: `${median}` },
          { label: 'Third Quartile (Q3)', value: `${q3}` },
          { label: 'Lower Outlier Fence (Q1 - 1.5×IQR)', value: `${lowerFence}` },
          { label: 'Upper Outlier Fence (Q3 + 1.5×IQR)', value: `${upperFence}` },
          { label: 'Total Sample Range (Max - Min)', value: `${range}` }
        ],
        summaryNote: `The Interquartile Range is ${iqr} (Q3 ${q3} - Q1 ${q1}). Using the 1.5×IQR rule, any value below ${lowerFence} or above ${upperFence} is considered a statistical outlier. ${outlierText}.`
      };
    },
    examSpecs: {
      totalDuration: 'Five-Number Summary Analysis',
      totalQuestions: 'Min, Q1, Median, Q3, Max',
      scaleRange: '0 to Range (Middle 50% Spread)',
      qualifyingScore: 'Non-Parametric Dispersion Standard',
      nationalAverage: 'Box Plot Dimension Standard',
      structureNote: 'Essential for constructing box-and-whisker plots in AP Statistics and data analysis.',
      sections: [
        { name: 'Quartile Measurement', questions: 'Q1 (25%), Q2 (50%), Q3 (75%)', time: 'N/A', weight: 'Center & Spread' },
        { name: 'Tukey Fences', questions: '1.5 × IQR Rule', time: 'N/A', weight: 'Outlier Identification' }
      ]
    },
    scoreScaleTable: [
      { score: 'Q1 (25th Percentile)', label: 'Lower Quartile', collegeCredit: 'Separates bottom 25% of observations from upper 75%.', typicalCutoff: '25% boundary' },
      { score: 'Q2 / Median', label: 'Second Quartile (50%)', collegeCredit: 'Middle value dividing the lower half of data from upper half.', typicalCutoff: '50% center' },
      { score: 'Q3 (75th Percentile)', label: 'Upper Quartile', collegeCredit: 'Separates bottom 75% of observations from top 25%.', typicalCutoff: '75% boundary' },
      { score: '1.5 × IQR', label: 'Mild Outlier Rule', collegeCredit: 'Values outside [Q1 - 1.5×IQR, Q3 + 1.5×IQR] are outliers.', typicalCutoff: 'Tukey fence' },
      { score: '3.0 × IQR', label: 'Extreme Outlier Rule', collegeCredit: 'Values beyond 3×IQR represent extreme anomalies.', typicalCutoff: 'Extreme fence' }
    ],
    formulaExplanation: {
      title: 'Interquartile Range & 1.5 × IQR Rule Formulas',
      steps: [
        'Calculate Interquartile Range: IQR = Q3 - Q1.',
        'Calculate Lower Outlier Boundary: Lower Fence = Q1 - (1.5 × IQR).',
        'Calculate Upper Outlier Boundary: Upper Fence = Q3 + (1.5 × IQR).',
        'Any data point x < Lower Fence or x > Upper Fence is mathematically classified as an outlier.'
      ],
      rawToScaledNotes: 'IQR is completely unaffected by extreme outliers because it only measures the middle 50% of ranked data.'
    },
    scoreInterpretation: {
      targetRanges: [
        { target: 'Symmetric Spread', scoreNeeded: 'Q2 - Q1 ≈ Q3 - Q2', recommendation: 'Indicates a roughly symmetric, bell-shaped distribution.' },
        { target: 'Right Skewed', scoreNeeded: 'Q3 - Q2 > Q2 - Q1', recommendation: 'The upper 25% is stretched further than the lower 25%.' },
        { target: 'Left Skewed', scoreNeeded: 'Q2 - Q1 > Q3 - Q2', recommendation: 'The lower 25% is stretched further towards smaller values.' }
      ],
      strategicAdvice: 'On AP Statistics exams, always report the median and IQR when a distribution is skewed, and mean/standard deviation when roughly symmetric.'
    },
    faqs: [
      { question: 'What is the 1.5 IQR rule for outliers?', answer: 'Tukey’s rule states that any observation falling more than 1.5 times the IQR below Q1 or above Q3 is considered a statistical outlier.' },
      { question: 'How is IQR used in box plots?', answer: 'The rectangular box in a box-and-whisker plot represents the IQR, spanning from Q1 to Q3. The vertical line inside is the median.' },
      { question: 'What percentage of data falls within the IQR?', answer: 'Exactly 50% of the observations in any dataset lie within the interquartile range (between Q1 and Q3).' }
    ],
    relatedCalculatorIds: ['mean-absolute-deviation']
  }
];
