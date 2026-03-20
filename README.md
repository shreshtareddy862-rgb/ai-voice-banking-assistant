# AI Voice Banking Assistant

This project is a voice-enabled banking assistant that processes user queries, detects intent, and returns relevant responses using a combination of speech recognition and NLP models.

The system takes voice input, converts it to text, classifies the intent using a trained BERT model, and retrieves appropriate responses through a custom pipeline.

---

## Features

* Voice input handling using speech-to-text
* Intent classification using a fine-tuned BERT model
* Retrieval-based response system
* Separate interfaces for customer and agent interactions
* Basic authentication system
* Integration with a banking-related dataset (Banking77)

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios for API communication

### Backend

* FastAPI (Python)
* SQLite database (`bank.db`)
* REST API architecture

### AI / NLP

* Whisper for speech-to-text
* BERT for intent classification
* Custom pipeline for processing queries (`assistant_pipeline.py`)
* Intent routing and retrieval modules

### Data

* Banking77 dataset for training and testing
* Intent labels stored in JSON format
* Custom knowledge base for responses

---

## Project Structure

ai-voice-banking-assistant/

backend/
Contains API routes, database logic, and AI pipeline components

frontend/
React application for user interaction

banking77_train.csv / banking77_test.csv
Dataset used for intent classification

intent_labels.json
Mapping of intents

---

## How it works

1. User provides a voice input
2. Audio is converted to text using Whisper
3. The text is passed to the BERT model for intent classification
4. Based on the predicted intent, the system routes the request
5. Relevant data is retrieved and returned as a response

---

## Setup

### Backend

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend

cd frontend
npm install
npm start

---

## Notes

Model files and generated audio are not included in the repository.
You will need to configure or train models locally before running the system.

---

## Future Work

* Improve response generation using LLMs
* Add real-time voice streaming
* Enhance UI and user experience
* Deploy as a full-stack application
