from datasets import load_dataset
import pandas as pd
import json

dataset = load_dataset("banking77")

train_data = dataset["train"]
test_data = dataset["test"]

train_df = pd.DataFrame(train_data)
test_df = pd.DataFrame(test_data)

train_df.to_csv("banking77_train.csv", index=False)
test_df.to_csv("banking77_test.csv", index=False)

# save intent names
intent_names = dataset["train"].features["label"].names

with open("intent_labels.json", "w") as f:
    json.dump(intent_names, f)

print("Banking77 dataset downloaded successfully")