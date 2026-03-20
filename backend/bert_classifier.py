import torch
import json
import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = AutoModelForSequenceClassification.from_pretrained(
    os.path.join(BASE_DIR, "bert_model")
)

tokenizer = AutoTokenizer.from_pretrained(
    "distilbert-base-uncased"
)

with open(os.path.join(BASE_DIR, "intent_labels.json")) as f:
    labels = json.load(f)

def detect_intent(text):

    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)

    outputs = model(**inputs)

    predicted_class = torch.argmax(outputs.logits, dim=1).item()

    return labels[predicted_class]