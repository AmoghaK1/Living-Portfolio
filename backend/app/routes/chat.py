from fastapi import APIRouter
from pydantic import BaseModel
from ..services.llm_service import ask_llm

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str


@router.post("/message")
def chat(request: ChatRequest):
    response = ask_llm(request.message)
    return {"response": response}