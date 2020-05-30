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
channels = [{"channel_id": "General", "channel_messages":[]},
            {"channel_id": "Alt1", "channel_messages":[]},
            {"channel_id": "Alt2", "channel_messages":[]}]

@app.route("/")
def index():
    return render_template("index.html", messages=messages, channels=channels)

@app.route("/default")
def default():
    return render_template("index.html", messages="default")

@app.route("/alt1")
def atl1():
    return render_template("index.html", messages="alt1")

@app.route("/alt2")
def alt2():
    return render_template("index.html", messages="alt2")


#Access a route for every chat
@app.route("/chats/<string:chat_id>")
def chats(chat_id):
    #for message in messages:
    #    print(message['user'])

    #Get all the flight's messages
    return render_template("chats.html", chats = chats)

@app.route("/create", methods=["POST"])
def book():
    """Create a chat"""

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
