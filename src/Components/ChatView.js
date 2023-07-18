"use client"
import React, { useState, useRef, useEffect, useContext } from "react";
import ChatMessage from "./ChatMessage";
import { ChatContext } from "./Contex/ChatContext";
import Thinking from "./Thinking";

import { MdSend } from "react-icons/md";
import Filter from "bad-words";
import axios from "axios";
import modelsManager from "./Utils/ModelManagers";

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const options = ["ChatGPT", "OpenJourney", "SearchGPT", "DALL·E"];
  const [selected, setSelected] = useState(options[0]);
  const [messages, addMessage] = useContext(ChatContext);
  const [aiData, setAiData] = useState();
  const [channelid, setChannelId] = useState('');
  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */

  // genChannelid.push({id:Math.floor(Math.random() * 100000)});
  


  const postdata = async (data) => {
    if (data.ai === true  ) {
      setAiData({
        id: data.id,
        text: data.text,
        createdAt: data.createdAt,
        ai: data.ai,
        value: formValue, 
      });
      
    }else{
      return true
    }
  };


useEffect(()=>{
  const genChannelId=()=>{
    const channelId=Math.floor((Math.random() * 100000))
    setChannelId(channelId)
  }
  genChannelId()
},[])

  const postaidata = async (data) => {
    
    try {
      let responce = await axios.post(`http://localhost:4000/users`, {
        id: data.id,
        text: data.text,
        createdAt: data.createdAt,
        ai: data.ai,
        value: data.value,
        title: data.value,
        channel_id:channelid,
      });
      let res = await responce;
      console.log("res", res);
  
      return res;
    } catch {
      console.log("not found");
    }
  };

  // shorting like date API

  const Saveimage = async () => {
    let createdDate = new Date().toLocaleString();
    let email = localStorage.getItem("userData");

    let userEmail = btoa(String(email).toLowerCase());
    try {
      if (!(aiData.text && userEmail)) {
        alert("data not found from server");
      }
      const ImageSaveapi = await axios.post(
        "http://localhost:4000/saveImages",
        {
          link_to_image: aiData.text,
          creator: userEmail,
          keywords: aiData.value,
          date: createdDate,
          likes: 0,
        }
      );
      console.log("ImageSaveapi", ImageSaveapi);
    } catch (error) {
      
      console.log(error.message);
    }
  };

  useEffect(() => {
    var selectedbtn = "";
    messages.forEach((items, index) => {
      if (items.selected === "OpenJourney" && index >= 1) {
        selectedbtn = items.selected;
      }
    });
    if (selectedbtn === "OpenJourney") {
      Saveimage();
    }

    postaidata(aiData);
  }, [aiData]);

  const updateMessage = async (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      selected: `${selected}`,
    };

    addMessage(newMsg);

    postdata(newMsg);
  };

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e) => {
    e.preventDefault();

    const filter = new Filter();
    const cleanPrompt = filter.isProfane(formValue)
      ? filter.clean(formValue)
      : formValue;

    const newMsg = cleanPrompt;
    const aiModel = selected;

    setThinking(true);
    setFormValue("");
    updateMessage(newMsg, false, aiModel);

    // handler request and response here
    await modelsManager(aiModel, cleanPrompt, updateMessage, setThinking);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // 👇 Get input value
      sendMessage(e);
    }
  };

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="chatview">
      <main className="chatview__chatarea">
        {messages.map((message, index) => (
          
            <ChatMessage
              className="message-text"
              key={index}
              message={{ ...message }}
            />
         
        ))}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
      </main>
      <form className="form" onSubmit={sendMessage}>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="dropdown"
        >
          {options.map((item, key) => (
            <option key={key}>{options[key]}</option>
          ))}
        </select>

        <div className="flex items-stretch justify-between w-full">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message"
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFormValue(e.target.value)}
          />

          <button
            type="submit"
            className="chatview__btn-send"
            disabled={!formValue}
          >
            <MdSend size={30} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatView;
