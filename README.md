AI Voice Banking Assistant

A voice-enabled banking assistant that processes user queries, detects intent, and returns relevant responses using speech recognition and NLP models.

---

Features

* Voice Input Processing (Speech-to-Text using Whisper)
* Intent Classification using BERT
* Retrieval-Based Response System
* Customer and Agent Chat Interface
* Authentication (Login / Signup)
* Banking Dataset Integration (Banking77)
* Custom Knowledge Base Support

---

Tech Stack

Frontend

* React.js
* Tailwind CSS
* Axios

Backend

* FastAPI (Python)
* SQLite (bank.db)
* REST APIs

AI / NLP

* Whisper (Speech-to-Text)
* BERT (Intent Classification)
* Custom NLP Pipeline (assistant_pipeline.py)
* Intent Routing
* Retrieval System

Data

* Banking77 Dataset (banking77_train.csv, banking77_test.csv)
* Intent Labels (intent_labels.json)
* Custom Knowledge Base (banking_knowledge.txt)

---

Project Structure

```
ai-voice-banking-assistant/
│
├── backend/
│   ├── chat_api.py
│   ├── auth_api.py
│   ├── assistant_pipeline.py
│   ├── bert_classifier.py
│   ├── train_bert_model.py
│   ├── whisper_model.py
│   ├── retriever.py
│   ├── intent_router.py
│   ├── database.py
│   ├── db.py
│   ├── bank.db
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── tailwind.config.js
│
├── banking77_train.csv
├── banking77_test.csv
├── intent_labels.json
└── README.md
```

---

How it works

1. User provides a voice input
2. Audio is converted to text using Whisper
3. The text is passed to the BERT model for intent classification
4. Based on the predicted intent, the system routes the request
5. Relevant data is retrieved and returned as a response

---

How to Run the Project

1. Clone the repository

```
git clone https://github.com/shreshatreddy862-rgb/ai-voice-banking-assistant.git
```

---

2. Start Backend

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on:
http://localhost:8000

---

3. Start Frontend

```
cd frontend
npm install
npm start
```

Frontend will run on:
http://localhost:3000

---

Notes

* Model files and generated audio are not included in the repository
* You will need to configure or train models locally before running the system

---

Future Work

* Improve response generation using LLMs
* Add real-time voice streaming
* Enhance UI and user experience
* Deploy as a full-stack application

---

Author

Butukuri Shreshta

