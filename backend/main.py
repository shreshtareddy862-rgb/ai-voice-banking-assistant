from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from bert_classifier import detect_intent
from assistant_pipeline import get_context
from llm_response import generate_response

from auth_api import router as auth_router
from chat_api import router as chat_router


app = FastAPI()


# -----------------------
# CORS
# -----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------
# INCLUDE ROUTERS
# -----------------------
app.include_router(auth_router)
app.include_router(chat_router)


# -----------------------
# TEST ROUTE
# -----------------------
@app.get("/")
def home():
    return {"message": "AI Voice Banking Assistant API running"}


# -----------------------
# AI QUESTION API
# -----------------------
@app.post("/ask-ai")
def ask_ai(question: str):

    try:

        intent = detect_intent(question)

        context = get_context(question, intent)

        response = generate_response(question, context)

        return {
            "intent": intent,
            "answer": response
        }

    except Exception as e:

        print("AI ERROR:", e)

        return {
            "intent": "unknown",
            "answer": "AI assistant temporarily unavailable."
        }