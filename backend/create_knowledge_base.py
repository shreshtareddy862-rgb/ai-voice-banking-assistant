import pandas as pd

# load dataset
data = pd.read_csv("banking77_train.csv")

# take only text column
docs = data["text"].tolist()

# remove duplicates
docs = list(set(docs))

# save as knowledge base
with open("banking_knowledge.txt", "w") as f:
    for doc in docs:
        f.write(doc + "\n")

print("Knowledge base created with", len(docs), "documents")