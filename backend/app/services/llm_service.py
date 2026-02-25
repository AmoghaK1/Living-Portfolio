import requests
import os
from dotenv import load_dotenv
from app.rag.retriever import search

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")


def ask_llm(question):

    context_chunks=search(question)

    context="\n\n".join(
        context_chunks
    )

    url="https://api.groq.com/openai/v1/chat/completions"

    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type":"application/json"
    }

    system_prompt=f"""

You are Amogha's AI assistant.

Answer questions using the context below.

Context:

{context}

"""

    data={
        "model":"llama-3.1-8b-instant",
        "messages":[
            {
                "role":"system",
                "content":system_prompt
            },
            {
                "role":"user",
                "content":question
            }
        ]
    }

    response=requests.post(
        url,
        headers=headers,
        json=data
    )

    result=response.json()

    return result["choices"][0]["message"]["content"]