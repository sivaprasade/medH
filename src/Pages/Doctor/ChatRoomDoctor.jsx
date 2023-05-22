import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { sendMessage, getMessages } from "../../utils/api";
import { message, Input, List, Card } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "../../components/Shared/ChatRoom.css"

const ChatRoomDoctor = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const isDoctor = localStorage.getItem("user_type") === "doctor";
  const location = useLocation();
  const username = location.state ? location.state.username : "Patient";

  useEffect(() => {
    console.log(`Loading messages for room: ${roomId}`);
    getMessages(roomId)
      .then((response) => {
        setMessages(response.messages);
        console.log(response);
      })
      .catch((error) => {
        message.error("Failed to load messages");
      });
  }, [roomId]);

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    const senderId = localStorage.getItem("doctor_id");
  
    const newMessage = {
      sender_id: senderId,
      content: messageInput,
      timestamp: new Date().toISOString()
    };
  
    sendMessage(roomId, messageInput, senderId)
      .then((response) => {
        console.log(response);
        setMessages(response.data.messages);
        setMessageInput("");
      })
      .catch((error) => {
        message.error("Failed to send message");
      });
  };

  return (
    <div className="chat-room-container">
      <Card title={`Chat with ${username}`} bordered={false}>
        {messages && messages.length > 0 ? (
          <List
            className="message-list"
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => (
              <List.Item className={item.sender_id === localStorage.getItem("doctor_id") ? "message-row sent" : "message-row received"}>
                <List.Item.Meta
                  title={item.sender_id === localStorage.getItem("doctor_id") ? "You" : item.sender_name}
                  description={item.content}
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
      </Card>
    </div>
  );
};

export default ChatRoomDoctor;
