import React from 'react';
import { Form, InputNumber, Button, Card, Typography, message } from 'antd';
import { predictDiabetes } from "../../utils/api";

const { Title, Text } = Typography;

const DiabetesPrediction = () => {
  const onFinish = async (values) => {
    try {
      const prediction = await predictDiabetes(values);
      console.log('Prediction:', prediction);

      if (prediction.prediction === 1) {
        message.success('The patient has diabetes.');
      } else {
        message.info('The patient does not have diabetes.');
      }
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <Card title="Diabetes Prediction" >
      <Title level={4}>About Diabetes</Title>
      <Text>
        Diabetes is a chronic disease that affects how your body processes blood sugar (glucose). 
        It is important to detect and manage diabetes early to prevent complications and maintain a healthy lifestyle.
      </Text>

      <Form name="diabetes_prediction" onFinish={onFinish} style={{ marginTop: 20 }}>
        <Form.Item label="No. of Pregnancies" name="pregnancies" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Glucose Level" name="glucose" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Current Blood Pressure" name="blood_pressure" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Enter the Body Mass Index" name="bmi" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.1} />
        </Form.Item>

        <Form.Item label="Diabetes Pedigree Function" name="diabetes_pedigree_function" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.001} />
        </Form.Item>

        <Form.Item label="Age" name="age" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DiabetesPrediction;
