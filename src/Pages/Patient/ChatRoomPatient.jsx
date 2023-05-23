import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { sendMessage, getMessages, getPrescriptions, downloadPrescription } from "../../utils/api";
import { message, Input, List, Card, Button, Modal } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "../../components/Shared/ChatRoom.css"

const ChatRoomPatient = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isPrescriptionModalVisible, setIsPrescriptionModalVisible] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const { roomId } = useParams();
  const isPatient = localStorage.getItem("user_type") === "patient";
  const location = useLocation();
  const doctorName = location.state ? location.state.doctorName : "Doctor";
  const doctor_id = location.state.doctor_id
  


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
    const senderId = localStorage.getItem("patient_id") 
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
    getPrescriptions(doctor_id)
      .then((response) => {
        setPrescriptions(response);
        if (response && response.length > 0) {
          setSelectedPrescriptionId(response[0]._id);
        }
        setIsPrescriptionModalVisible(true);
      })
      .catch((error) => {
        message.error("Failed to load prescriptions");
      });
  };

  const handleDownloadPrescription = () => {
    if (selectedPrescriptionId) {
      downloadPrescription(selectedPrescriptionId);
    }
  };


  return (
    <div className="chat-room-container">
          <Modal
        title="Prescription Details"
        visible={isPrescriptionModalVisible}
        onOk={() => setIsPrescriptionModalVisible(false)}
        onCancel={() => setIsPrescriptionModalVisible(false)}
        footer={[
          <Button key="download" type="primary" onClick={handleDownloadPrescription}>
            Download
          </Button>,
        ]}
      >
        {prescriptions.map((prescription) => (
          <div key={prescription._id} onClick={() => setSelectedPrescriptionId(prescription._id)}>
            <p><strong>Patient Name:</strong> {prescription.username}</p>
            <p><strong>Doctor Name:</strong> {prescription.doctor_name}</p>
            <p><strong>Symptoms:</strong> {prescription.symptoms.join(', ')}</p>
            <p><strong>Disease Name:</strong> {prescription.disease_name}</p>
            <p><strong>Prescription:</strong> {prescription.prescription}</p>
          </div>
        ))}
      </Modal>
      <Card title={"ChatRoom"} bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
          <h2>{`Chat with ${doctorName}`}</h2>
          <Button type="primary" onClick={handleAddPrescription}>View Prescription</Button>
        </div>
        {messages && messages.length > 0 ? (
          <List
            className="message-list"
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => (
              <List.Item className={item.sender_id === localStorage.getItem("patient_id") ? "message-row sent" : "message-row received"}>
                <List.Item.Meta
                  title={item.sender_id === localStorage.getItem("patient_id") ? "You" : item.sender_name}
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

export default ChatRoomPatient;
