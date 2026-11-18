# Updated Stanford Probability for AI project notebook

Open `experiment/Can_AI_Know_When_It_Is_Wrong_UPDATED.ipynb` in Kaggle or Colab.

## Key correction
The original notebook asked FLAN-T5 to state a confidence percentage. The saved CSVs showed malformed/missing confidence responses, so the original calibration statistics should not be used as final findings. This notebook instead computes scores for each of A/B/C/D and normalizes them with softmax to obtain predictive confidence.

## Run steps
1. Upload/open the notebook in Kaggle.
2. Enable Internet in notebook settings. GPU is optional.
3. Run cells from top to bottom.
4. Edit the pre-registered prediction before running inference, if needed to reflect your actual prior belief.
5. Download the generated CSVs, JSON, and reliability plots from the Kaggle output panel.

## Research-integrity note
The earlier run's test outputs were already viewed. The revised run is an exploratory correction; do not describe it as a pristine blind replication. The notebook also states that the sample is small and the MMLU benchmark may overlap with pretraining data.
