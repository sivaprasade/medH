import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { sendMessage, getMessages, addPrescription } from "../../utils/api";
import { message, Input, List, Card, Button, Modal, Form, Alert } from "antd";
import { SendOutlined, PlusOutlined } from "@ant-design/icons";
import "../../components/Shared/ChatRoom.css"

const ChatRoomDoctor = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { roomId } = useParams();
  const location = useLocation();
  const username = location.state ? location.state.username : "Patient";
  const user_id = location.state.user_id;
  const doctorName = localStorage.getItem("doctor_name");
  const doctorId = localStorage.getItem("doctor_id");

  console.log(location.state); 

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

  const handleAddPrescription = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { symptoms, prescription,disease_name } = values;
        addPrescription({
          user_id,
          doctor_id: doctorId,
          username,
          doctor_name: doctorName,
          symptoms,
          prescription,
          disease_name,
          status: true
        })
          .then((response) => {
            setIsModalVisible(false);
            message.success("Prescription added successfully");
            form.resetFields();
          })
          .catch((error) => {
            message.error("Failed to add prescription");
          });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="chat-room-container">
      <Card title={"ChatRoom"} bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
          <h2>{`Chat with ${username}`}</h2>
          <Button type="primary" onClick={handleAddPrescription}>Add Prescription</Button>
        </div>
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
        <Modal title="Add Prescription" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} layout="vertical" name="form_in_modal">
            
            <Form.List name="symptoms">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Form.Item
                      {...field}
                      label="Symptom"
                      rules={[{ required: true, message: 'Missing symptom' }]}
                    >
                      <Input />
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add symptom
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item
              name="disease_name"
              label="Disease Name"
              rules={[{ required: true, message: 'Please input the Disease Name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="prescription"
              label="Prescription"
              rules={[{ required: true, message: 'Please input the prescription!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default ChatRoomDoctor;
