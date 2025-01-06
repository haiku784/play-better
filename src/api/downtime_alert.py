import smtplib
from email.mime.text import MIMEText
from fastapi import BackgroundTasks

# Configuration for email alerts
SMTP_SERVER = 'smtp.example.com'
SMTP_PORT = 587
SENDER_EMAIL = 'alert@example.com'
RECIPIENT_EMAIL = 'admin@example.com'

async def send_downtime_alert():
    msg = MIMEText("The service is experiencing downtime.")
    msg['Subject'] = 'Downtime Alert'
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECIPIENT_EMAIL

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SENDER_EMAIL, 'password')  # Use environment variable for security
        server.send_message(msg)
