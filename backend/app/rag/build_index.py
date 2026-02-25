from loader import load_documents
from embeddings import chunk_text,embed_texts
from vectorstore import save_index

import faiss
import numpy as np


docs=load_documents()

all_chunks=[]

for doc in docs:

    chunks=chunk_text(
        doc["content"]
    )

    all_chunks.extend(chunks)


embeddings=embed_texts(all_chunks)

dimension=len(embeddings[0])

index=faiss.IndexFlatL2(
dimension
)

index.add(
np.array(embeddings)
)

save_index(index,all_chunks)


print("Index Built Successfully")
