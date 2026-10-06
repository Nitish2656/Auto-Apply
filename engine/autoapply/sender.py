import mimetypes
import os
import smtplib
from email.message import EmailMessage
from pathlib import Path


def send_email(p: dict, to: str, subject: str, body: str):
    msg = EmailMessage()
    msg["From"] = f"{p['name']} <{os.environ['SMTP_USER']}>"
    msg["To"] = to
    msg["Subject"] = subject
    msg["Reply-To"] = p["email"]
    msg.set_content(body)
    resume = Path(p["resume_path"])
    ctype = mimetypes.guess_type(resume.name)[0] or "application/pdf"
    main, sub = ctype.split("/")
    msg.add_attachment(resume.read_bytes(), maintype=main, subtype=sub,
                       filename=f"{p['name'].replace(' ', '_')}_Resume{resume.suffix}")
    with smtplib.SMTP(os.environ.get("SMTP_HOST", "smtp.gmail.com"),
                      int(os.environ.get("SMTP_PORT", 587))) as s:
        s.starttls()
        s.login(os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"])
        s.send_message(msg)
