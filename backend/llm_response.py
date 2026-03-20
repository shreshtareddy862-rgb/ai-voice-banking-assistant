import requests

def generate_response(query, context):

    context_text = "\n".join(context) if context else "General banking knowledge."

    prompt = f"""
You are a professional banking assistant.

Answer the user's question using the banking information below.

Rules:
- Maximum 3 sentences
- Be clear and direct
- Provide practical steps
- No unnecessary explanations

User question:
{query}

Banking information:
{context_text}

Provide the best helpful answer.
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False,
                "temperature": 0.3
            }
        )

        return response.json()["response"]

    except Exception:
        return "Sorry, the AI assistant is currently unavailable."