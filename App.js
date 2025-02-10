import React, { useState, useEffect } from 'react';
import'./App.css';
const ChatApp = () => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );
  const [messageSender, setMessageSender] = useState('Shiva');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const createChatMessageElement = (message) => (
    <div className={`message ${message.sender === 'Shiva' ? 'blue-bg' : 'gray-bg'}`}>
      <div className="message-sender">{message.sender}</div>
      <div className="message-text">{message.text}</div>
      <div className="message-timestamp">{message.timestamp}</div>
    </div>
  );

  const handlePersonSelector = (name) => {
    setMessageSender(name);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const newMessage = {
      sender: messageSender,
      text: inputText,
      timestamp,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.clear();
  };

  return (
    <div>
      <div className="person-selector">
        <button
          className={`button person-selector-button ${messageSender === 'Shiva' ? 'active-person' : ''}`}
          onClick={() => handlePersonSelector('Shiva')}
        >
          Shiva
        </button>
        <button
          className={`button person-selector-button ${messageSender === 'Arjun' ? 'active-person' : ''}`}
          onClick={() => handlePersonSelector('Arjun')}
        >
          Arjun
        </button>
      </div>

      <div className="chat-container">
        <h2 className="chat-header">{`${messageSender} Typing...`}</h2>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'Shiva' ? 'blue-bg' : 'gray-bg'}`}>
              <div className="message-sender">{message.sender}</div>
              <div className="message-text">{message.text}</div>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          ))}
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            value={inputText}
            onChange={handleInputChange}
            required
            placeholder={`Type here, ${messageSender}...`}
          />
          <button type="submit" className="button send-button">Send</button>
        </form>

        <button className="button clear-chat-button" onClick={handleClearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
