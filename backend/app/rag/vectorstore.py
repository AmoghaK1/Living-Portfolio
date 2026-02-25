import faiss
import numpy as np
import pickle
from pathlib import Path

# Get the backend directory (3 levels up from this file)
BACKEND_DIR = Path(__file__).parent.parent.parent
VECTORSTORE_DIR = BACKEND_DIR / "vectorstore"
INDEX_FILE = VECTORSTORE_DIR / "faiss.index"
CHUNKS_FILE = VECTORSTORE_DIR / "chunks.pkl"


def save_index(index,chunks):
    
    # Create vectorstore directory if it doesn't exist
    VECTORSTORE_DIR.mkdir(exist_ok=True)

    faiss.write_index(
        index,
        str(INDEX_FILE)
    )

    with open(CHUNKS_FILE,"wb") as f:

        pickle.dump(chunks,f)



def load_index():

    index=faiss.read_index(
        str(INDEX_FILE)
    )

    with open(CHUNKS_FILE,"rb") as f:

        chunks=pickle.load(f)

    return index,chunks