import psycopg2

def get_connection():
    conn = psycopg2.connect(
        database="banking_ai",
        user="shreshtareddy",
        password="",
        host="localhost",
        port="5432"
    )
    return conn