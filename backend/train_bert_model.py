import pandas as pd
import torch

from datasets import Dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import Trainer, TrainingArguments

# load Banking77 dataset
data = pd.read_csv("banking77_train.csv")

texts = data["text"].tolist()
labels = data["label"].tolist()

dataset = Dataset.from_dict({
    "text": texts,
    "label": labels
})

# load tokenizer
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")

def tokenize(example):
    return tokenizer(example["text"], padding="max_length", truncation=True)

dataset = dataset.map(tokenize, batched=True)

dataset = dataset.train_test_split(test_size=0.1)

# load model
model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased",
    num_labels=77
)

training_args = TrainingArguments(
    output_dir="./bert_model",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
    logging_steps=50,
    save_strategy="no",
    report_to="none"
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
)

trainer.train()

trainer.save_model("distilbert_model")

print("BERT model trained successfully")