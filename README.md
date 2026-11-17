# Can AI Know When It Is Wrong?

**Stanford Probability for AI — Final Project**

## Research question
When a language model reports a confidence percentage for a multiple-choice answer, does that percentage match its observed accuracy?

## Chosen approach
One model (`google/flan-t5-base`), three MMLU subjects (high-school biology, high-school computer science, high-school statistics), direct self-reported confidence, and a locked test set.

## Run the experiment
1. Open `experiment/Can_AI_Know_When_It_Is_Wrong.ipynb` in Google Colab.
2. Use Runtime → Change runtime type → GPU (if available).
3. Review and confirm/edit the prediction cell before running.
4. Run cells from top to bottom. Do not run the locked-test section until development analysis is complete.
5. Download `project_results.json`, both reliability PNGs, and the CSV files.

The notebook downloads MMLU from Hugging Face and FLAN-T5 from Hugging Face. First run requires internet.

## Important
No experimental results are included yet. The notebook must be run to generate real measurements. Do not submit invented or illustrative results.
