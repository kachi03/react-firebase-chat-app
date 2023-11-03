//Chat component for the chat page shown to
//user who is authenticated

import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query( //load messages for this room by order of creation
      messagesRef,
      where("room", "==", room), orderBy("createdAt"));
      const unsubscribe =
          onSnapshot(queryMessages, (snapshot) => {
            let messages = []; //store the documents from Firebase as an array
            snapshot.forEach((doc) => { //create a snapshot of each document
              messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
          });

      return () => unsubscribe();
  }, []);

  
  //submitting a new message
  const handleSubmit = async (event) => { 
    event.preventDefault(); //prevent the page from reloading

    if (newMessage === "") return; //if the message is empty, don't send
    await addDoc(messagesRef, { //if it's not empty then wait for the user to send
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage(""); //after message is sent, reset message field to empty
  };

  return (
    <div className="chat-app">

     
      <div className="header"> 
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>


      <div className="messages"> 
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}</span> {message.text}
            
          </div>
        ))}
      </div>

      
      <form onSubmit={handleSubmit} className="new-message-form"> 
        //wait for the submit button to be executed
        <input 
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button"> 
          Send
        </button>
      </form>
    </div>
  );
};
