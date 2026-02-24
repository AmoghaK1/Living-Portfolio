import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
print("API Key loaded:", API_KEY is not None)

def ask_llm(question):

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    system_prompt = """
You are Amogha's AI portfolio assistant.

Answer questions about Amogha as an AI/ML engineer.

Projects:
- Ride sharing optimization system using Dijkstra
- AI stylist app using computer vision
- Document QA system using embeddings

Skills:
Python
Machine Learning
Computer Vision
FastAPI
React
MongoDB
"""

    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role":"system","content":system_prompt},
            {"role":"user","content":question}
        ]
    }

    response = requests.post(url,headers=headers,json=data)
    print("STATUS:", response.status_code)
    print("RESPONSE:", response.text)

    return response.json()["choices"][0]["message"]["content"]