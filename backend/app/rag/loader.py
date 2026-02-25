import os
from pypdf import PdfReader
from pathlib import Path

# Get the backend directory (3 levels up from this file)
BACKEND_DIR = Path(__file__).parent.parent.parent
DATA_FOLDER = BACKEND_DIR / "data"


def load_documents():

    documents=[]

    for file in os.listdir(DATA_FOLDER):

        path=os.path.join(DATA_FOLDER,file)

        # Markdown files
        if file.endswith(".md"):

            with open(path,"r",encoding="utf-8") as f:

                text=f.read()

                documents.append({
                    "filename":file,
                    "content":text
                })


        # PDF files
        elif file.endswith(".pdf"):

            reader=PdfReader(path)

            text=""

            for page in reader.pages:

                text+=page.extract_text()


            documents.append({
                "filename":file,
                "content":text
            })


    return documents