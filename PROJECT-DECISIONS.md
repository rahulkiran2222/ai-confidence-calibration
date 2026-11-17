# Project decisions to confirm

- Working title: Can AI Know When It Is Wrong?
- Question: Does FLAN-T5-base's self-reported confidence match observed correctness?
- Model: one model, `google/flan-t5-base`.
- Dataset: MMLU, three subjects: high-school biology, high-school computer science, high-school statistics.
- Sample: up to 100 questions per subject; deterministic 70/30 development/locked-test split.
- Confidence method: direct self-reported percentage in a separate prompt after the answer.
- Calibration measure: course terminology, average gap across confidence buckets.
- Pre-experiment prediction is drafted in the notebook and must be confirmed/edited by the student before execution.
