export interface ResultMetric {
  id: string
  label: string
  sublabel: string
  // null = not yet measured. Never replace with an invented number —
  // leave null until real evaluation results exist.
  value: string | null
}

// TODO: fill in once model evaluation is complete. Do not invent numbers.
export const resultMetrics: ResultMetric[] = [
  {
    id: 'rf-f1-score',
    label: 'Random Forest F1-Score',
    sublabel: 'CIC IoMT 2024',
    value: null,
  },
  {
    id: 'cross-dataset-accuracy',
    label: 'Cross-Dataset Accuracy',
    sublabel: 'CICIDS 2017',
    value: null,
  },
  {
    id: 'ranking-accuracy-vs-cvss',
    label: 'Alert Ranking Accuracy vs CVSS',
    sublabel: 'CAS vs baseline severity',
    value: null,
  },
  {
    id: 'if-roc-auc',
    label: 'Isolation Forest ROC-AUC',
    sublabel: 'Anomaly detection',
    value: null,
  },
]
