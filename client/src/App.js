import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [userId, setUserId] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    // Connect to Socket.io server
    socketRef.current = io('http://localhost:8080');

    socketRef.current.on('connect', () => {
      setUserId(socketRef.current.id);  // Set the user ID to the socket ID
      console.log('Connected to server');
    });

    // Handle incoming text changes
    socketRef.current.on('text change', (newText) => {
      setCode(newText);
    });

    // Handle incoming language changes
    socketRef.current.on('language change', (newLanguage) => {
      setLanguage(newLanguage);
    });

    // Handle incoming compile results
    socketRef.current.on('compile result', (result) => {
      setOutput(result.output);
    });

    // Handle incoming chat messages
    socketRef.current.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up Socket.io connection on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleChange = (event) => {
    const newText = event.target.value;
    setCode(newText);
    // Send new text to Socket.io server
    socketRef.current.emit('text change', newText);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    // Send new language to Socket.io server
    socketRef.current.emit('language change', newLanguage);
  };

  const handleCompile = () => {
    // Send code and language to the server for compilation
    socketRef.current.emit('compile', { code, language });
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // Send chat message to Socket.io server
      const message = { userId, text: chatInput };
      socketRef.current.emit('chat message', message);
      setChatInput('');
    }
  };

  return (
    <div className="App">
      <select value={language} onChange={handleLanguageChange}>
        <option value="cpp">C++</option>
        <option value="c">C</option>
      </select>
      <textarea
        value={code}
        onChange={handleChange}
        rows="10"
        cols="80"
      />
      <button onClick={handleCompile}>Compile & Run</button>
      <pre>{output}</pre>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.userId === userId ? 'own-message' : ''}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
