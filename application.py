import os
import array

from flask import Flask, redirect, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

messages = []

@app.route("/")
def index():
    return render_template("index.html", messages=messages)

@socketio.on("submit msg")
def msg(msg):
    messages.append(msg)
    emit("msg totals", messages, broadcast=True)
