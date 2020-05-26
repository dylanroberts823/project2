import os

from flask import Flask, redirect, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sign_up")
def sign_up():
    return render_template("sign_up.html")

@app.route("/chatroom")
def chatroom():
    return render_template("chatroom.html", username=username)
