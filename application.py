import os
import array

from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit
from flask_session import Session

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

#The messages array stores all the messages with their respective names, text and timestamp
# python list object will be {msg_text:text; msg_date:date; msg_user:user}
messages = []
#The chat array will contain all the chats, with their respective names and messages, and those messages' information
#python list object will be {chat_id: chat_id; chat_messages : messages}
channels = [{"channel_id": "General"},
            {"channel_id": "Random"},
            ]
#Default route
@app.route("/")
def index():
    return render_template("index.html", messages=messages, channels=channels)

#When a message is sent, it is received here
@socketio.on("submit msg")
def msg(msg):
    #Set a counter
    count = 1

    #Get message's channel
    channel = msg["channel"]

    #Count how many messages are in the channel
    for message in messages:
        if (message["channel"] == msg["channel"]):
            count += 1
            print(count)

    #Ensure maximum 100 messages are stored per channel
    if (count) == 101:
        #Create a boolean to track if the
        deleted = False

        #Create a counter to find the right index
        index = 0

        #Find and delete the first message in the channel
        while deleted == False:
            if (messages[index]["channel"] == channel):
                del messages[index]
                deleted = True
                print(deleted)
            index +=1

    #Append message latest master channel list
    messages.append(msg)
    emit("msg totals", messages, broadcast=True)

#When we change channels, the messages are sent here
@socketio.on("load channel")
def load_channel():
    emit("msg totals", messages, broadcast=True)

#When we create a channel, the data is stored here
@socketio.on("create channel")
def create_channel(new_channel):
    #Save the channel to our list
    channel_obj = {"channel_id": new_channel}
    channels.append(channel_obj)
    #Update all the other channels
    emit("redirect channel", broadcast=True)
