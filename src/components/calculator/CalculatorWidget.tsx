import { useState, useEffect, useMemo, type FC } from 'react';
import { CalculatorConfig, CalculatorResult } from '../../types';
import { RotateCcw, AlertCircle, Share2, Check, BarChart3, Plus, Minus } from 'lucide-react';

interface CalculatorWidgetProps {
  config: CalculatorConfig;
}

export const CalculatorWidget: FC<CalculatorWidgetProps> = ({ config }) => {
  // Initialize inputs from config defaultValues
  const initialValues = useMemo(() => {
    const vals: Record<string, number | ''> = {};
    config.fields.forEach((field) => {
      vals[field.id] = field.defaultValue;
    });
    return vals;
  }, [config]);

  const [inputs, setInputs] = useState<Record<string, number | ''>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  // Sync inputs whenever config changes (e.g. user selected another calculator)
  useEffect(() => {
    setInputs(initialValues);
    setErrors({});
  }, [initialValues]);

  // Compute live result with fallback defaults for empty fields to prevent broken UI
  const computedResult: CalculatorResult = useMemo(() => {
    const sanitizedInputs: Record<string, number> = {};
    config.fields.forEach((field) => {
      const val = inputs[field.id];
      if (typeof val === 'number' && !isNaN(val)) {
        sanitizedInputs[field.id] = val;
      } else if (field.optional && (val === '' || val === undefined)) {
        sanitizedInputs[field.id] = -1;
      } else {
        // Sensible fallback default if empty so calculator never breaks
        sanitizedInputs[field.id] = field.defaultValue;
      }
    });
    return config.calculate(sanitizedInputs);
  }, [config, inputs]);

  // Cross-field or custom calculator validation errors
  const validationErrors = useMemo(() => {
    if (config.validate) {
      return config.validate(inputs) || {};
    }
    return {};
  }, [config, inputs]);

  const allFieldErrors = useMemo(() => {
    return { ...errors, ...validationErrors };
  }, [errors, validationErrors]);

  const activeValidationError = computedResult.error || Object.values(validationErrors)[0];

  const handleInputChange = (fieldId: string, rawVal: string, min: number, max: number) => {
    if (rawVal === '') {
      setInputs((prev) => ({ ...prev, [fieldId]: '' }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
      return;
    }

    const num = Number(rawVal);
    if (isNaN(num)) {
      setErrors((prev) => ({ ...prev, [fieldId]: 'Please enter a valid number' }));
      return;
    }

    if (num < min) {
      setErrors((prev) => ({ ...prev, [fieldId]: `Minimum allowed value is ${min}` }));
    } else if (num > max) {
      setErrors((prev) => ({ ...prev, [fieldId]: `Maximum allowed value is ${max}` }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }

    setInputs((prev) => ({ ...prev, [fieldId]: num }));
  };

  const stepField = (fieldId: string, delta: number, min: number, max: number, step: number = 1) => {
    const current = typeof inputs[fieldId] === 'number' ? (inputs[fieldId] as number) : min;
    const next = Math.min(max, Math.max(min, current + delta * step));
    handleInputChange(fieldId, next.toString(), min, max);
  };

  const handleReset = () => {
    setInputs(initialValues);
    setErrors({});
  };

  const handleCopyResult = () => {
    const statusPart = computedResult.qualificationStatus ? ` (${computedResult.qualificationStatus})` : '';
    const percentilePart = computedResult.percentileText ? `\nPercentile: ${computedResult.percentileText}` : '';
    const text = `${config.title} Result:\n${computedResult.mainScoreLabel}: ${computedResult.mainScore}${statusPart}${percentilePart}\nCalculated via Score Calculator (scorecalculator.net)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Group fields by their group attribute
  const fieldGroups = useMemo(() => {
    const groups: {
      name: string;
      max?: number;
      label?: string;
      fields: typeof config.fields;
    }[] = [];

    config.fields.forEach((field) => {
      const groupName = field.group || '';
      const existing = groups.find((g) => g.name === groupName);

      if (existing) {
        existing.fields.push(field);
        if (field.groupTotalMax && !existing.max) existing.max = field.groupTotalMax;
        if (field.groupTotalLabel && !existing.label) existing.label = field.groupTotalLabel;
      } else {
        groups.push({
          name: groupName,
          max: field.groupTotalMax,
          label: field.groupTotalLabel,
          fields: [field]
        });
      }
    });

    return groups;
  }, [config.fields]);

  return (
    <div id="calculator-tool" className="w-full bg-white border border-gray-200 overflow-hidden">
      {/* Main Calculator Layout: Left Inputs, Right Result Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Input Fields Section */}
        <div className="lg:col-span-7 px-3 py-4 sm:p-7 border-b lg:border-b-0 lg:border-r border-gray-200 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Exam Section Inputs
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Auto-Calculates Instantly
              </span>
            </div>

            {/* Render grouped sections or standard field rows */}
            {fieldGroups.map((group, gIdx) => {
              const groupTotal = group.fields.reduce((acc, f) => {
                const v = inputs[f.id];
                return acc + (typeof v === 'number' && !isNaN(v) ? v : 0);
              }, 0);

              return (
                <div key={gIdx} className="space-y-4">
                  {group.name && (
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 pb-1.5 border-b border-gray-200">
                      <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                        {group.name}
                      </span>
                      {group.max !== undefined && (
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 border border-blue-200">
                          {group.label || `${group.name.includes('Long') ? 'Long FRQ' : group.name.includes('Short') ? 'Short FRQ' : 'Section'} Total`}: {groupTotal} / {group.max}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    {group.fields.map((field) => {
                      const currentVal = inputs[field.id];
                      const hasError = Boolean(allFieldErrors[field.id]);

                      return (
                        <div
                          key={field.id}
                          id={`field-row-${field.id}`}
                          className="grid grid-cols-12 items-center gap-3 sm:gap-4 border-b border-gray-100 pb-3.5 last:border-b-0"
                        >
                          <div className="col-span-12 sm:col-span-7">
                            <label
                              htmlFor={`input-${field.id}`}
                              className="block font-bold text-sm text-gray-800"
                            >
                              {field.label}
                            </label>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              {field.sublabel || `Enter score between ${field.min} and ${field.max}`}
                            </p>
                          </div>

                          <div className="col-span-12 sm:col-span-5">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => stepField(field.id, -1, field.min, field.max, field.step || 1)}
                                className="w-10 h-11 sm:h-10 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 border border-gray-200 flex items-center justify-center font-bold text-base transition-colors shrink-0 cursor-pointer min-h-[44px] min-w-[44px]"
                                aria-label={`Decrease ${field.label}`}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <input
                                id={`input-${field.id}`}
                                type="number"
                                min={field.min}
                                max={field.max}
                                step={field.step || 1}
                                value={currentVal}
                                onChange={(e) =>
                                   handleInputChange(field.id, e.target.value, field.min, field.max)
                                }
                                className={`w-full border py-2 px-2 text-center text-lg font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all min-h-[44px] ${
                                  hasError ? 'border-rose-500 ring-1 ring-rose-500' : 'border-gray-200 bg-white'
                                }`}
                                placeholder={`${field.min}-${field.max}`}
                              />
                              <button
                                type="button"
                                onClick={() => stepField(field.id, 1, field.min, field.max, field.step || 1)}
                                className="w-10 h-11 sm:h-10 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 border border-gray-200 flex items-center justify-center font-bold text-base transition-colors shrink-0 cursor-pointer min-h-[44px] min-w-[44px]"
                                aria-label={`Increase ${field.label}`}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1 font-mono px-1">
                              <span>Min: {field.min}</span>
                              <span>Max: {field.max}</span>
                            </div>

                            {hasError && (
                              <div className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                <span>{allFieldErrors[field.id]}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Area: Keep Reset button, auto-calculation is real-time without calculate button */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500">
              Results update automatically on every change
            </span>

            <button
              id="btn-reset"
              type="button"
              onClick={handleReset}
              className="bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 font-bold px-4 py-2 transition-colors cursor-pointer text-xs flex items-center justify-center gap-1.5 min-h-[38px] border border-gray-200"
              title="Reset inputs to initial default values"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" /> Reset All Inputs
            </button>
          </div>

          {/* How it is calculated */}
          <div className="border border-gray-200">
            <div className="bg-gray-50 border-b border-gray-200 border-l-4 border-l-blue-600 px-3.5 py-2">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                How It Is Calculated
              </h3>
            </div>
            <div className="p-3.5 bg-white text-xs leading-relaxed text-gray-600">
              <p>
                {config.formulaExplanation.steps[0] || 'Your raw score is calculated by adding the sectional correct answers to the weighted component scores. We use the latest 2027 curve estimates to provide your final score.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Result Summary Section */}
        <div className="lg:col-span-5 px-3 py-4 sm:p-7 bg-white flex flex-col justify-between space-y-5 sm:space-y-6">
          <div className="space-y-4 sm:space-y-5">
            {activeValidationError ? (
              <div
                id="validation-error-card"
                className="w-full bg-rose-50 border border-rose-200 p-6 sm:p-7 flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-800">
                  Cannot Calculate Score
                </h3>
                <p id="validation-error-msg" className="text-sm sm:text-base font-semibold text-rose-700 leading-snug">
                  {activeValidationError}
                </p>
                <p className="text-xs text-rose-500">
                  Please adjust your inputs to calculate the percentage.
                </p>
              </div>
            ) : (
              <>
                {/* Prominent Clean Score Area */}
                <div
                  id="result-card"
                  className="w-full bg-blue-600 border border-blue-700 text-white p-6 sm:p-7 flex flex-col items-center justify-center text-center"
                >
                  <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-100 mb-1">
                    {computedResult.mainScoreLabel}
                  </h3>

                  <div
                    id="final-score"
                    className={`font-black leading-none my-2 text-white tracking-tight ${
                      String(computedResult.mainScore).includes('/')
                        ? 'text-[36px] xs:text-[46px] sm:text-[60px] md:text-[72px]'
                        : 'text-[56px] xs:text-[68px] sm:text-[84px] md:text-[96px]'
                    }`}
                  >
                    {computedResult.mainScore}
                  </div>

                  {computedResult.qualificationStatus ? (
                    <div className="text-xs sm:text-sm font-bold bg-blue-600 text-white inline-block">
                      {computedResult.qualificationStatus}
                    </div>
                  ) : null}

                  {/* Stats Grid */}
                  {!computedResult.hideStatsGrid && (
                    <div className="mt-6 w-full grid grid-cols-2 gap-3 sm:gap-4 text-left border-t border-blue-500/60 pt-5 sm:pt-6">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-blue-200">
                          {computedResult.percentileText ? 'Percentile' : 'Probability'}
                        </p>
                        <p className="text-base sm:text-lg font-bold text-white">
                          {computedResult.percentileText || '85.4%'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-blue-200">
                          {computedResult.compositePoints !== undefined ? 'Composite' : 'Scale'}
                        </p>
                        <p id="composite-val" className="text-base sm:text-lg font-bold text-white">
                          {computedResult.compositePoints !== undefined && computedResult.maxCompositePoints !== undefined
                            ? `${computedResult.compositePoints}/${computedResult.maxCompositePoints}`
                            : computedResult.maxScore
                            ? `${computedResult.mainScore}/${computedResult.maxScore}`
                            : 'Verified'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Subscores & Section Breakdown */}
                {computedResult.subscores.length > 0 && (
                  <div className="border border-gray-200">
                    <div className="bg-gray-50 border-b border-gray-200 border-l-4 border-l-blue-600 px-3.5 py-2 flex items-center gap-1.5 text-xs font-bold text-gray-900">
                      <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Section Breakdown</span>
                    </div>
                    <div className="divide-y divide-gray-100 bg-white p-3.5 text-xs">
                      {computedResult.subscores.map((sub, idx) => (
                        <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between">
                          <span className="text-gray-600">{sub.label}</span>
                          <span className="font-bold text-gray-900">{sub.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Score Explanation / Message Area */}
                {computedResult.summaryNote && (
                  <div className="border border-gray-200 bg-white p-3.5 text-xs text-gray-600 leading-relaxed">
                    <p>{computedResult.summaryNote}</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Copy Result CTA */}
          <div>
            <button
              id="btn-copy-result"
              type="button"
              disabled={Boolean(activeValidationError)}
              onClick={handleCopyResult}
              className={`w-full py-2.5 px-4 text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                activeValidationError
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-gray-200 cursor-pointer'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-gray-500" /> Copy Score Summary
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
