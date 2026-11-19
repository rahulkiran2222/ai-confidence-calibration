# Can AI Know When It Is Wrong?
### Measuring Predictive-Confidence Calibration in FLAN-T5-base

<p align="center">
  <img src="https://img.shields.io/badge/Research-Probability%20for%20AI-8B5CF6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Model-FLAN--T5--base-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Benchmark-MMLU-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" />
</p>

## Overview

Can a language model recognize when it is likely to be wrong?

Large language models can produce confident answers even when those answers are incorrect. This project investigates whether a model's predictive confidence corresponds to its actual performance across different knowledge domains.

Using **FLAN-T5-base** and three subject subsets from the **Massive Multitask Language Understanding (MMLU)** benchmark, we evaluate predictive-confidence calibration through conditional sequence likelihoods, probability distributions, reliability analysis, and Expected Calibration Error (ECE).

Rather than asking the model to report a confidence percentage, we derive confidence from its relative likelihood of the four available answer choices.

**Central research question:**

Does FLAN-T5-base's predictive confidence align with its empirical accuracy, and does calibration differ across biology, computer science, and statistics?

---

## Research Design

| Component | Description |
|---|---|
| Model | `google/flan-t5-base` |
| Dataset | `cais/mmlu` |
| Task | Multiple-choice question answering |
| Domains | High-school Biology, Computer Science, Statistics |
| Total sample | 300 questions |
| Development set | 210 questions |
| Held-out set | 90 questions |
| Random seed | `20261118` |
| Calibration metric | Expected Calibration Error (ECE) |
| Calibration bins | 5 fixed confidence intervals |

### Research prediction

Before executing the corrected experiment, the following prediction was registered:

> I expect FLAN-T5-base's predictive confidence to be imperfectly calibrated, with calibration differing across the three subjects.

## Methodology

### 1. Dataset preparation

We selected three MMLU subject subsets:

- `high_school_biology`
- `high_school_computer_science`
- `high_school_statistics`

Up to 100 questions were sampled from each subject.

Each subject was divided into:

- 70 development questions
- 30 held-out questions

This produced 210 development and 90 held-out observations.

### 2. Predictive-confidence estimation

The initial approach asked the model to generate a confidence percentage. This was abandoned because many responses were malformed or did not contain valid percentages.

The corrected approach scores all four possible answer choices (A–D) using conditional sequence log-likelihood.

The scores are transformed into a probability distribution using softmax:

\[
P(A_i\mid x)=
\frac{\exp(s_i)}{\sum_{j=1}^{4}\exp(s_j)}
\]

Where:

- \(x\) represents the question and its answer choices.
- \(s_i\) represents the conditional sequence score for option \(i\).
- The predicted answer is the option with the highest probability.
- Predictive confidence is the probability assigned to that highest-scoring option.

These are model-derived relative predictive probabilities, not verbal self-reported confidence and not inherently calibrated probabilities.

### 3. Calibration evaluation

We compare average predictive confidence with observed accuracy across five fixed bins.

Expected Calibration Error is calculated as:

\[
ECE=\sum_{b=1}^{B}
\frac{n_b}{N}
\left|\operatorname{acc}(b)-\operatorname{conf}(b)\right|
\]

A lower ECE indicates closer agreement between predictive confidence and empirical accuracy under the selected binning scheme.

---

## Experimental Results

### Overall performance

| Metric | Development | Held-out |
|---|---:|---:|
| Questions | 210 | 90 |
| Accuracy | 27.62% | 33.33% |
| ECE | 28.80 pp | 21.17 pp |

### Subject-level comparison

Development-set results:

| Subject | Questions | Accuracy | ECE |
|---|---:|---:|---:|
| Biology | 70 | 34.29% | 25.81 pp |
| Computer Science | 70 | 30.00% | 24.54 pp |
| Statistics | 70 | 18.57% | 36.06 pp |

Statistics exhibited the lowest accuracy and highest ECE among the three evaluated subjects.

### Key observation

All populated confidence bins showed overconfidence: average predictive confidence exceeded observed accuracy.

On the held-out set, the highest confidence bin (80–100%) contained 12 questions:

- Mean predictive confidence: 87.89%
- Observed accuracy: 41.67%
- Absolute calibration gap: 46.23 percentage points

This illustrates that high predictive confidence did not necessarily correspond to high empirical accuracy.

---

## Interpretation

The experiment provides evidence of imperfect predictive-confidence calibration in FLAN-T5-base across the selected MMLU domains.

Three observations stand out:

1. **Confidence–accuracy mismatch:** Predictive confidence consistently exceeded empirical accuracy across populated calibration bins.
2. **Domain variation:** Calibration differed across biology, computer science, and statistics.
3. **High-confidence errors:** The model sometimes assigned high relative probability to an answer that was incorrect.

These observations reinforce the distinction between generating a prediction and estimating the reliability of that prediction.

A model that produces an answer with high confidence is not necessarily a model that knows it is correct.

---

## Limitations and Research Integrity

This project has several important limitations:

- **Sample size:** The experiment uses 300 questions across only three subject domains.
- **Benchmark contamination:** MMLU is publicly available and may have appeared in model pretraining data.
- **Model dependence:** Findings are specific to FLAN-T5-base, the selected prompt, tokenizer, scoring method, and answer-choice format.
- **Calibration methodology:** Softmax-normalized option likelihoods are not guaranteed to represent calibrated probabilities.
- **Binning sensitivity:** ECE depends on the selected confidence intervals and can be unstable with small samples.
- **Prior test exposure:** Results from the earlier version's test evaluation had already been viewed. The corrected analysis is therefore exploratory, not a pristine blind replication.

The held-out split was separated from development within the corrected run, but should not be described as completely untouched across the project's iterations.

These results should not be generalized to all language models.

---

## Technical Stack

- Python
- PyTorch
- Hugging Face Transformers
- Hugging Face Datasets
- FLAN-T5-base
- NumPy
- Pandas
- Matplotlib
- Scikit-learn
- Kaggle Notebooks

## Reproducibility

The corrected experiment uses a fixed random seed:

```python
SEED = 20261118
MODEL_NAME = "google/flan-t5-base"
```

Install the required dependencies:

```bash
pip install datasets transformers sentencepiece accelerate pandas matplotlib scikit-learn tqdm
```

The experiment was executed using Kaggle with CPU inference. A GPU is helpful but not required.

The original notebook implements dataset preparation, candidate scoring, prediction generation, calibration analysis, and result export.

**Note:** The currently retained `project_results_corrected.json` is a reconstruction from the recorded notebook execution output. It preserves the reported aggregate metrics and calibration-bin summaries, but is not a substitute for the original row-level prediction CSV files.

---

## Conclusion

This experiment demonstrates why predictive confidence should be evaluated rather than automatically trusted.

FLAN-T5-base produced probability distributions over multiple-choice answers, but those distributions did not consistently align with empirical accuracy.

The broader implication is important for reliable AI:

**A trustworthy AI system should not only produce predictions. Its uncertainty should also be meaningful, measurable, and appropriately interpreted.**

---

## Project Information

**Course:** Stanford Probability for AI  
**Project:** Can AI Know When It Is Wrong?  
**Model:** Google FLAN-T5-base  
**Benchmark:** MMLU  
**Research focus:** Predictive-confidence calibration, uncertainty estimation, and model reliability.

*This project is an empirical course research exercise and does not establish general safety claims about language models.*
