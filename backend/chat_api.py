from fastapi import APIRouter
from db import get_connection
from bert_classifier import detect_intent

router = APIRouter()

# SEND MESSAGE
@router.post("/send-message")
def send_message(email: str, sender: str, message: str):

    conn = get_connection()
    cursor = conn.cursor()

    # create chat if not exists
    cursor.execute(
        "INSERT INTO chats (email) VALUES (%s) ON CONFLICT (email) DO NOTHING",
        (email,)
    )

    # detect intent for customer messages
    intent = None
    if sender == "customer":
        intent = detect_intent(message)

    # insert message
    cursor.execute(
        "INSERT INTO messages (email, sender, message) VALUES (%s,%s,%s)",
        (email, sender, message)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"status": "message sent"}


# GET CHAT
@router.get("/get-chat")
def get_chat(email: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT sender, message FROM messages WHERE email=%s ORDER BY id",
        (email,)
    )

    messages = cursor.fetchall()

    cursor.close()
    conn.close()

    result = []

    for msg in messages:
        result.append({
            "sender": msg[0],
            "message": msg[1]
        })

    return result


# END CHAT
@router.post("/end-chat")
def end_chat(email: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE chats SET status='closed' WHERE email=%s",
        (email,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"status": "chat closed"}


# GET CUSTOMERS
@router.get("/get-customers")
def get_customers():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT DISTINCT email FROM messages"
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    result = []

    for r in rows:
        result.append({"email": r[0]})

    return result