# 60-second video script — fill in results after experiment

Have you ever seen an AI say it is 90% sure, and wondered whether that number means anything? I tested this with FLAN-T5-base on multiple-choice questions from biology, computer science and statistics.

For each question, the model chose an answer and reported its own confidence. I grouped answers by confidence and compared the average confidence with the fraction that were actually correct. The difference is called the average gap.

On the development set, [insert measured result]. On the locked test set, [insert measured result]. The results suggest [careful interpretation]. This experiment is limited to one model, one prompt and a small sample of a public benchmark, so it does not tell us how all AI systems behave.

The main lesson is that a confidence percentage should be checked against outcomes, not taken at face value.
