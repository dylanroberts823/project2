import os
import array

from flask import Flask, redirect, render_template, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

#The messages array stores all the messages with their respective names, text and timestamp
##Json msg object will be {msg_text:text; msg_date:date; msg_user:user}
messages = []
#The chat array will contain all the chats, with their respective names and messages, and those messages' information
#Json Chat object will be {chat_id: chat_id; chat_messages : messages}
channels = [{"channel_id": "General"},
            {"channel_id": "Alt1"},
            ]

@app.route("/")
def index():
    return render_template("index.html", messages=messages, channels=channels)

@app.route("/create", methods=["GET", "POST"])
def book():
    """Create a chat"""
    #Make sure user is logged in

    # Get form information.
    name = request.form.get("name")

    #Make sure that a name isn't blank

    # Make sure the name doesn't already exist.

    #Create the chat

    #Open the chat
    return render_template("success.html")

@socketio.on("submit msg")
def msg(msg):
    messages.append(msg)
    emit("msg totals", messages, broadcast=True)

@socketio.on("load channel")
def load_channel():
    emit("msg totals", messages, broadcast=True)

@socketio.on("create channel")
def create_channel(new_channel):
    #Verify that the new channel doesn't clash with any pre-existing ones
    for channel in channels:
        if channel["channel_id"] == new_channel:
            return render_template('error.html', error="That channel already exists, please try again")
    #Since new channel doesn't conflict, save it to our list
    channel_obj = {"channel_id": new_channel}
    channels.append(channel_obj)
    #Update all the other channels
    emit("redirect channel", new_channel, broadcast=True)
