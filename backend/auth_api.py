from fastapi import APIRouter, HTTPException
from db import get_connection

router = APIRouter()

# -----------------------
# CUSTOMER SIGNUP
# -----------------------
@router.post("/customer-signup")
def customer_signup(name: str, email: str, password: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO customers (name, email, password) VALUES (%s,%s,%s)",
        (name, email, password)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"status": "customer created"}


# -----------------------
# CUSTOMER LOGIN
# -----------------------
@router.post("/customer-login")
def customer_login(email: str, password: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM customers WHERE email=%s AND password=%s",
        (email, password)
    )

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        return {"status": "success"}
    else:
        return {"status": "invalid"}


# -----------------------
# AGENT SIGNUP
# -----------------------
@router.post("/agent-signup")
def agent_signup(name: str, email: str, password: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO agents (name,email,password) VALUES (%s,%s,%s)",
        (name,email,password)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {"status":"agent created"}


# -----------------------
# AGENT LOGIN
# -----------------------
@router.post("/agent-login")
def agent_login(email: str, password: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM agents WHERE email=%s AND password=%s",
        (email, password)
    )

    agent = cursor.fetchone()

    cursor.close()
    conn.close()

    if agent:
        return {"status": "success"}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")