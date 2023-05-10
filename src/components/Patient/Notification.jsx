import React, { useState, useEffect } from "react";
import { List, Avatar, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { listNotificationsByUser } from "../../utils/api";

const Notification = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("patient_id");

  // Initialize state with an empty array
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when component mounts
    const fetchNotifications = async () => {
      const response = await listNotificationsByUser(userId);
      setNotifications(response);
    };
    fetchNotifications();
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={notifications}
      style={{ width: "400px" }} // 1. increase the width of list element
      renderItem={(item) => (
        <List.Item
          style={{
            backgroundColor: item.read ? "#f0f0f0" : "white", // 2. change color of the notification after read it
            width: "100%",
            padding: "16px",
          }}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<BellOutlined />} />}
            title={`Your appointment with ${item.doctorname} has been ${item.status}`}
            description={item.time}
          />
          <Button type="primary" onClick={() => navigate("/patient-appointments")}>
            View
          </Button>
        </List.Item>
      )}
    />
  );
};

export default Notification;
