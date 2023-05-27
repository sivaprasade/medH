import React, { useState } from "react";
import { Modal, Input, Button, Checkbox, Row, Col } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import listOfSymptoms from "./listOfSymtoms";
import "./ChatInterface.css";
import { diseasePrediction } from "../../utils/api";

const ChatInterface = () => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const symptoms = listOfSymptoms

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser.'));
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, () => {
                reject(new Error('Unable to retrieve your location.'));
            });
        }
    });
};


  const handleOk = () => {
    if (inputValue.trim() !== "") {
      const userMessage = {
        sender: "user",
        message: inputValue,
        displayed: false,
      };
      setChatHistory([...chatHistory, userMessage]);
      setInputValue("");
      if (inputValue === "!hi") {
        const botMessage = {
          sender: "chatbot",
          message: "Hey, I'm medH! For help, type !help to see my functions.",
        };
        setChatHistory([...chatHistory, botMessage]);
      } else if (
        inputValue === "!predict-my-disease" ||
        inputValue === "!predict"
      ) {
        setShowSymptoms(true);
      } else if (inputValue === "!help") {
        const botMessage = {
          sender: "chatbot",
          message:
            "Here are my functions:\n!hi - to greet me\n!predict-my-disease or !predict - to predict your disease based on your symptoms\n!help - to see my functions",
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
        // Get user's current location
        try {
            const location = await getUserLocation();
            // Call the API and pass the selected symptoms and user's current location
            const requestBody = { symptoms: selectedSymptoms, location };
            const response = await diseasePrediction(requestBody);
    
            const botMessage = {
                sender: "chatbot",
                message: `Based on your symptoms, you may have ${response.disease_prediction}. Please consult a doctor for a proper diagnosis.`,
            };
            setChatHistory([...chatHistory, botMessage]);
            setShowSymptoms(false);
        } catch (error) {
            console.error('Error getting user location:', error);
            // Handle the error...
        }
    }
};

  const renderSymptomsSelection = () => {
    const columns = 5;
    const numRows = Math.ceil(symptoms.length / columns);
  
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
          value={selectedSymptoms}
          onChange={handleSymptomChange}
          style={{ width: "100%" }}
        >
          <Row gutter={[16, 16]}>
            {symptoms.map((symptom, index) => (
              <Col key={index} span={24 / columns}>
                <Checkbox value={symptom}>{symptom}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
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
                <div
                  className={`message sent ${
                    chat.displayed ? "displayed" : ""
                  }`}
                  key={index}
                >
                  {chat.message}
                </div>
              );
            } else {
              return (
                <div className="message received" key={index}>
                  {chat.message}
                  {chat.symptoms &&
                    chat.symptoms.map((symptom, index) => (
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
