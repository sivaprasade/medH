import React, { useState } from "react";
import { Modal, Form, Input, DatePicker } from "antd";

const AppointmentForm = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onSubmit(values);
    });
  };

  return (
    <Modal
      title="Book Appointment"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Book"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="appointment_time"
          label="Appointment Time"
          rules={[
            {
              required: true,
              message: "Please select an appointment time",
            },
          ]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name="notes"
          label="Notes"
          rules={[
            {
              required: true,
              message: "Please enter any notes",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AppointmentForm;
