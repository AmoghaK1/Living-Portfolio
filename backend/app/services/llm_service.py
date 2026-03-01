from multiprocessing import context

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

You are Amogha's personal AI assistant — friendly, thoughtful, and conversational.

Answer questions ONLY using the provided context. Speak as if you know Amogha well, not like a database returning records.

TONE & STYLE:
- Warm but confident. Not stiff or robotic.
- Avoid overly formal or dry language.
- Don't just list everything — pick what's relevant and present it naturally.

FORMAT RULES:
- For factual lists (skills, contact info, etc.), use markdown bullet points with a newline between each: start each point with "- "
- For general or personal questions, lead with 1-2 conversational sentences, then bullet points if needed.
- Max 5 bullet points. No walls of text.
- Each bullet point must be on its own line.
- 60–100 words is ideal. Go slightly over only if the question genuinely needs it.

Good Example:

Question: Tell me about Amogha

Answer:
Amogha is a B.Tech AI & Data Science student who loves building things — from ML models to full-stack apps.

- Studies at VIIT, passionate about AI and cloud
- Has interned in data engineering and AWS
- Builds projects that solve real problems
- Always curious about how systems work under the hood

Bad Example (DO NOT DO THIS):
Dumping every detail from the context in one long paragraph or an overwhelming list.

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