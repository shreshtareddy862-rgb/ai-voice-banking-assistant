from intent_router import load_docs
from retriever import retrieve

def get_context(query, intent):

    docs = load_docs(intent)

    results = retrieve(query, docs)

    return results