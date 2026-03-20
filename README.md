# 🏦 AI Voice Banking Assistant (VIBANK)

AI-powered banking assistant that processes user voice queries, converts them into text, detects intent, and generates intelligent responses using a custom NLP pipeline.

---

## 🚀 Core Features

* 🎤 Voice input using speech-to-text (Whisper)
* 🧠 Intent detection using fine-tuned BERT model
* 🔍 Knowledge base retrieval system
* 💬 Real-time chat interface (customer & agent)
* 🔐 Authentication system (login/signup)
* 🗂 Banking dataset integration (Banking77)

---

## 🛠 Tech Stack (ACTUAL)

### 🔹 Frontend

* React.js
* Tailwind CSS
* Axios (API communication)

### 🔹 Backend

* FastAPI (Python)
* SQLite (local database: `bank.db`)
* REST APIs

### 🔹 AI / ML

* Whisper (speech-to-text)
* BERT (intent classification)
* Custom NLP pipeline (`assistant_pipeline.py`)
* Retrieval-based response system

### 🔹 Data

* Banking77 dataset (`banking77_train.csv`, `banking77_test.csv`)
* Intent labels (`intent_labels.json`)
* Custom knowledge base (`banking_knowledge.txt`)

---

## 📁 Project Structure

ai-voice-banking-assistant/
│
├── backend/
│   ├── main.py
│   ├── chat_api.py
│   ├── auth_api.py
│   ├── assistant_pipeline.py
│   ├── bert_classifier.py
│   ├── train_bert_model.py
│   ├── whisper_model.py
│   ├── retriever.py
│   ├── intent_router.py
│   ├── database.py / db.py
│   ├── bank.db
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── tailwind.config.js
│
├── banking77_train.csv
├──

