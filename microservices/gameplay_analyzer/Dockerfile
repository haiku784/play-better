# Dockerfile for Gameplay Analysis Service
FROM python:3.9

WORKDIR /app

COPY gameplay_analyzer_service.py .
COPY requirements.txt .

RUN pip install -r requirements.txt

CMD ['python', 'gameplay_analyzer_service.py']