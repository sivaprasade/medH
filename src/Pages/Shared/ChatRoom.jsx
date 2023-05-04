import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { sendMessage, getMessages } from "../../utils/api";
import { message, Input, List } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    getMessages(roomId)
      .then((messages) => {
        setMessages(messages);
      })
      .catch((error) => {
        message.error("Failed to load messages");
      });
  }, [roomId]);

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    const userId = localStorage.getItem("patient_id") || localStorage.getItem("doctor_id");

    sendMessage(roomId, userId, messageInput)
      .then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { user_id: userId, message: messageInput },
        ]);
        setMessageInput("");
      })
      .catch((error) => {
        message.error("Failed to send message");
      });
  };

  return (
    <div className="chat-room-container">
      {messages.length > 0 ? (
        <List
          className="message-list"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message) => (
            <List.Item className={message.user_id === localStorage.getItem("patient_id") ? "message-row sent" : "message-row received"}>
              <List.Item.Meta
                title={message.user_id === localStorage.getItem("patient_id") ? "You" : "Doctor"}
                description={message.message}
              />
            </List.Item>
          )}
        />
      ) : (
        <div className="no-messages-container">
          <p>No messages yet</p>
        </div>
      )}
      <div className="chat-input-container">
        <Input
          placeholder="Type a message..."
          value={messageInput}
          onChange={handleInputChange}
          suffix={
            <SendOutlined
              onClick={handleSendMessage}
              style={{ fontSize: "24px", color: "#08c" }}
            />
          }
        />
      </div>
    </div>
  );
};

export default ChatRoom;
