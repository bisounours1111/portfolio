from flask import Flask, render_template, request, redirect, url_for

import smtplib, ssl, json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

def envoyer_email(destinataire, username):
    email_host = "smtp.gmail.com"
    email_port = 587  # Port de connexion SMTP pour TLS
    email_host_user = ""
    email_host_password = ""

    sujet = "Confirmation de la réception de votre message"

    corps = f"Bonjour {username},\nJ'ai bien reçu votre message et je vous en remercie.\n\nJe vous recontacterais dans les plus brefs délais.\n\nCordialement,\nYanis DAÏ"

    with open("data.json", "r") as file:
        data = json.load(file)
        email_host_user = data["mail"]
        email_host_password = data["password"]

    message = MIMEMultipart()
    message["From"] = email_host_user
    message["To"] = destinataire
    message["Subject"] = sujet
    message.attach(MIMEText(corps, "plain"))

    context = ssl.create_default_context()
    with smtplib.SMTP(email_host, email_port) as server:
        server.starttls(context=context)
        server.login(email_host_user, email_host_password)
        server.sendmail(email_host_user, destinataire, message.as_string())

def envoyer_email_admin(username, email, message):
    email_host = "smtp.gmail.com"
    email_port = 587
    email_host_user = ""
    email_host_password = ""

    email_admin = "yan.dai@outlook.fr"

    sujet = "Nouveau message de contact"

    corps = f"Bonjour moi,\nTu as reçu un nouveau message de {username} ({email}).\n\nVoici le message:\n\n{message}\n\nCordialement,\nToi même"

    with open("data.json", "r") as file:
        data = json.load(file)
        email_host_user = data["mail"]
        email_host_password = data["password"]

    message = MIMEMultipart()
    message["From"] = email_host_user
    message["To"] = email_admin
    message["Subject"] = sujet
    message.attach(MIMEText(corps, "plain"))

    context = ssl.create_default_context()
    with smtplib.SMTP(email_host, email_port) as server:
        server.starttls(context=context)
        server.login(email_host_user, email_host_password)
        server.sendmail(email_host_user, email_admin, message.as_string())

    print("E-mail admin envoyé à", email)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        envoyer_email_admin(name, email, message)
        envoyer_email(email, name)

        return redirect(url_for('index'))
    
    return render_template('index.html')

@app.route('/stage', methods=['GET', 'POST'])
def stage():
    return render_template('stage.html')

if __name__ == '__main__':
    app.run(debug=True, port=8081, host='0.0.0.0')