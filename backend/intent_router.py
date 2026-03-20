import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_docs(intent):

    path = os.path.join(BASE_DIR, "knowledge_base", f"{intent}.txt")

    if not os.path.exists(path):
        return []

    with open(path) as f:
        docs = f.readlines()

    return [d.strip() for d in docs if d.strip()]