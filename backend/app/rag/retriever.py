from .vectorstore import load_index
from .embeddings import model
import numpy as np


index,chunks=load_index()


def search(query,k=4):

    query_vector=model.encode(
        [query]
    )

    distances,indices=index.search(
        np.array(query_vector),
        k
    )

    results=[]

    for i in indices[0]:

        results.append(
            chunks[i]
        )

    return results