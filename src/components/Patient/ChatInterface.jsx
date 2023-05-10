import React, { useState } from "react";
import { Modal, Input, Button, Checkbox } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import "./ChatInterface.css";

const ChatInterface = () => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const symptoms = ["Symptom 1", "Symptom 2", "Symptom 3"];

  const handleOk = () => {
    if (inputValue.trim() !== "") {
      const userMessage = { sender: "user", message: inputValue, displayed: false };
      setChatHistory([...chatHistory, userMessage]);
      setInputValue("");
      if (inputValue === "!hi") {
        const botMessage = {
          sender: "chatbot",
          message: "Hey, I'm medH! For help, type !help to see my functions.",
        };
        setChatHistory([...chatHistory, botMessage]);
      } else if (inputValue === "!predict-my-disease" || inputValue === "!predict") {
        setShowSymptoms(true);
      } else if (inputValue === "!help") {
        const botMessage = {
          sender: "chatbot",
          message: "Here are my functions:\n!hi - to greet me\n!predict-my-disease or !predict - to predict your disease based on your symptoms\n!help - to see my functions",
        };
        setChatHistory([...chatHistory, botMessage]);
      } else {
        const botMessage = {
          sender: "chatbot",
          message: "Try !help to find my functions.",
        };
        setChatHistory([...chatHistory, botMessage]);
      }
    }
  };

  const handleCancel = () => {
    setInputValue("");
    setVisible(false);
  };

  const handleSymptomChange = (checkedValues) => {
    setSelectedSymptoms(checkedValues);
  };

  const handleSubmitSymptoms = async () => {
    if (selectedSymptoms.length >= 3) {
      // Call the API and pass the selected symptoms
      // const response = await callApi(selectedSymptoms);

      // Mock API response
      const response = { disease: "Sample Disease" };

      const botMessage = {
        sender: "chatbot",
        message: `Based on your symptoms, you may have ${response.disease}. Please consult a doctor for a proper diagnosis.`,
      };
      setChatHistory([...chatHistory, botMessage]);
      setShowSymptoms(false);
    }
  };

  const renderSymptomsSelection = () => {
    return (
      <Modal
        title="Select Your Symptoms"
        visible={showSymptoms}
        onOk={handleSubmitSymptoms}
        onCancel={() => setShowSymptoms(false)}
        footer={[
          <Button key="back" onClick={() => setShowSymptoms(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitSymptoms}>
            Submit
          </Button>,
        ]}
      >
        <Checkbox.Group
          options={symptoms}
          value={selectedSymptoms}
          onChange={handleSymptomChange}
        />
      </Modal>
    );
  };


  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<WechatOutlined />}
        size="large"
        className="chat-button"
        onClick={() => setVisible(true)}
      />
      <Modal
        title="Chat with medH Bot"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Send
          </Button>,
        ]}
      >
        <div className="chat-container">
          {chatHistory.map((chat, index) => {
            if (chat.sender === "user") {
              return (
                <div className={`message sent ${chat.displayed ? 'displayed' : ''}`} key={index}>
                  {chat.message}
                </div>
              );
            } else {
              return (
                <div className="message received" key={index}>
                  {chat.message}
                  {chat.symptoms && chat.symptoms.map((symptom, index) => (
                    <div key={index}>{symptom}</div>
                  ))}
                </div>
              );
            }
          })}
          <Input
            placeholder="Type your message here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="chat-input"
            onPressEnter={handleOk}
          />
        </div>
      </Modal>
      {renderSymptomsSelection()}
    </>
  );
};

export default ChatInterface;
