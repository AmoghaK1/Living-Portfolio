from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
"all-MiniLM-L6-v2"
)

def chunk_text(text,chunk_size=300,overlap=50):

    words=text.split()

    chunks=[]

    for i in range(0,len(words),chunk_size-overlap):

        chunk=" ".join(
            words[i:i+chunk_size]
        )

        chunks.append(chunk)

    return chunks


def embed_texts(texts):

    embeddings=model.encode(texts)

    return embeddings