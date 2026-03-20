from sentence_transformers import SentenceTransformer
import numpy as np
import faiss

model = SentenceTransformer("all-MiniLM-L6-v2")

def retrieve(query, docs, k=3):

    if len(docs) == 0:
        return []

    doc_embeddings = model.encode(docs)

    dimension = doc_embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(np.array(doc_embeddings))

    query_embedding = model.encode([query])

    D, I = index.search(query_embedding, k)

    results = [docs[i] for i in I[0]]

    return results