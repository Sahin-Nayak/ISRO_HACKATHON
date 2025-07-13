import React, { useEffect, useRef, useState } from 'react';
import './AQIBot.css';
import faqList from './faq-list.js'

function AQIBot() {
  const [messages, setMessages] = useState([]);
  const [aqiData, setAqiData] = useState([]);
  const [step, setStep] = useState('initial');
  const [selectedState, setSelectedState] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    fetch('/aqi-data.json')
      .then((res) => res.json())
      .then(setAqiData);

    setMessages([
      {
        sender: 'bot',
        text: '👋 Welcome! Please choose an option to get AQI data or learn more.',
      },
    ]);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleBot = () => {
    setIsOpen(!isOpen);
  };


  const handleOptionClick = (type) => {
    if (type === 'state') {
      const uniqueStates = [
        ...new Set(aqiData.map((d) => d.State).filter(Boolean)),
      ];
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'user', text: 'State' },
          { sender: 'bot', text: '🌏 Select a state:', options: uniqueStates },
        ]);
        setStep('selectingState');
      }, 50);
    } else if (type === 'station') {
      const stations = [
        ...new Set(aqiData.map((d) => d.Station).filter(Boolean)),
      ];
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'user', text: 'Station' },
          { sender: 'bot', text: '🏠 Select a station:', options: stations },
        ]);
        setStep('selectingStation');
      }, 50);
    } else if (type === 'faq') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'user', text: 'FAQ' },
          {
            sender: 'bot',
            text: '❓ Pick a question:',
            options: faqList.map((f) => f.question),
          },
        ]);
        setStep('selectingFAQ');
      }, 50);
    }
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    const stations = [
      ...new Set(
        aqiData.filter((d) => d.State === state).map((d) => d.Station)
      ),
    ];
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: state },
        { sender: 'bot', text: `🏠 Stations in ${state}:`, options: stations },
      ]);
      setStep('selectingStation');
    }, 50);
  };

  const handleStationSelect = (station) => {
    const match = aqiData.find(
      (d) =>
        d.Station === station && (!selectedState || d.State === selectedState)
    );
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: station },
        { sender: 'bot', text: match ? formatAQI(match) : '❌ No data found.' },
      ]);
      setStep('initial');
      setSelectedState(null);
    }, 50);
  };

  const handleFAQSelect = (question) => {
    if (question === '🔙 Back') {
      setStep('initial');
      return;
    }

    const found = faqList.find((f) => f.question === question);
    const answer = found?.answer || '❌ Not available.';

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: question },
        { sender: 'bot', text: answer },
        {
          sender: 'bot',
          text: '❓ Want to ask another question?',
          options: [...faqList.map((f) => f.question), '🔙 Back'],
        },
      ]);
      setStep('selectingFAQ');
    }, 50);
  };

  const formatAQI = (entry) => {
    return `
📍 ${entry.Station}
📌 ${entry.State}, Pincode: ${entry.Pincode}
🗓️ Date: ${entry['From Date']}

🌫 PM2.5: ${entry['PM2.5']} µg/m³
🌫 PM10: ${entry['PM10']} µg/m³
🦢 NO2: ${entry['NO2']} µg/m³
☁️ Ozone: ${entry['Ozone']} µg/m³
🌡 Temp: ${entry['T_MERRA']} K
💨 Wind: ${entry['WS']} m/s
    `.trim();
  };

  const renderOptions = (options, handler) => (
    <div className="options">
      {options.map((opt, i) => (
        <button key={i} onClick={() => handler(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle" onClick={toggleBot}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="aqi-chat-wrapper">
          <div className="chatbot-container">
            <div className="chatbot-header">
              <h3>AQI Chatbot</h3>
              <div>
                <button className="theme-toggle" onClick={toggleTheme}>
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <button className="close-btn" onClick={toggleBot}>
                  ×
                </button>
              </div>
            </div>

            <div className="chatbox">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.sender}`}>
                  <div>{msg.text}</div>
                  {msg.options &&
                    renderOptions(
                      msg.options,
                      step === 'selectingState'
                        ? handleStateSelect
                        : step === 'selectingStation'
                        ? handleStationSelect
                        : step === 'selectingFAQ'
                        ? handleFAQSelect
                        : () => {}
                    )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {step === 'initial' && (
              <div className="options">
                <button onClick={() => handleOptionClick('state')}>
                  State
                </button>
                <button onClick={() => handleOptionClick('station')}>
                  Station
                </button>
                <button onClick={() => handleOptionClick('faq')}>FAQ</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AQIBot;
