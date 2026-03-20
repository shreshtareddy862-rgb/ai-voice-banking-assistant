import sqlite3

# connect to database (it will be created automatically)
conn = sqlite3.connect("bank.db")

cursor = conn.cursor()

# create customers table
cursor.execute("""
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    account_number TEXT UNIQUE,
    phone TEXT,
    balance REAL
)
""")

# create agents table
cursor.execute("""
CREATE TABLE IF NOT EXISTS agents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    employee_id TEXT UNIQUE,
    password TEXT
)
""")

conn.commit()

print("Database and tables created successfully")
cursor.execute("""
INSERT INTO agents (name, employee_id, password)
VALUES (?, ?, ?)
""", ("Agent One", "EMP001", "password123"))

conn.commit()

print("Agent created successfully")