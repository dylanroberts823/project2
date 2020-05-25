import os

from flask import Flask, redirect, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

username = "";

@app.route("/", methods=["GET", "POST"])
def index():
#Check if they have a username
    if username == "":
        #Since they don't have a username, have them sign up
        return redirect("/sign_up")
    else:
        #Since they've chosen a username, forward to main page with Username
        return redirect("/chatroom")

@app.route("/sign_up", methods=["GET", "POST"])
def sign_up():
    if request.method == "GET":
        return render_template("sign_up.html")

    elif request.method == "POST":
        return redirect("/chatroom")

@app.route("/chatroom")
def chatroom():
    return render_template("chatroom.html", username=username)
