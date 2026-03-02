from fastembed import TextEmbedding
import numpy as np

model = TextEmbedding("BAAI/bge-small-en-v1.5")


def chunk_text(text, chunk_size=300, overlap=50):

    words = text.split()

    chunks = []

    for i in range(0, len(words), chunk_size - overlap):

        chunk = " ".join(
            words[i:i + chunk_size]
        )

        chunks.append(chunk)

    return chunks


def embed_texts(texts):

    embeddings = np.array(list(model.embed(texts)))

    return embeddings