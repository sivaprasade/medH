import React from 'react';
import { Form, InputNumber, Select, Button, message, Typography, Card } from 'antd';
import { predictHeartDisease } from "../../utils/api";

const { Option } = Select;
const { Title, Text } = Typography;

const HeartDiseasePrediction = () => {
  const onFinish = async (values) => {
    try {
      const prediction = await predictHeartDisease(values);
      console.log('Prediction:', prediction);
      
      if (prediction.prediction === 1) {
        message.success('The patient has heart disease.');
      } else {
        message.info('The patient does not have heart disease.');
      }
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <div className="heart-disease-prediction">
      <Typography>
        <Title level={3}>Heart Disease Prediction</Title>
        <Text>Heart disease refers to a variety of conditions that affect the heart's structure or function. It is essential to detect heart disease early to prevent complications and provide appropriate treatment.</Text>
      </Typography>
      <Card style={{ marginTop: '2rem' }}>
      <Form name="heart_disease_prediction" onFinish={onFinish}>
        <Form.Item label="Chest Pain Type" name="cp" rules={[{ required: true }]}>
          <Select placeholder="Select chest pain type">
            <Option value={0}>Typical Angina</Option>
            <Option value={1}>Atypical Angina</Option>
            <Option value={2}>Non-Anginal Pain</Option>
            <Option value={3}>Asymptomatic</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Resting Blood Pressure" name="trestbps" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Serum Cholestoral" name="chol" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Fasting Blood Sugar" name="fbs" rules={[{ required: true }]}>
          <Select placeholder="Select fasting blood sugar">
            <Option value={0}>Fasting Blood Sugar &lt; 120mg/dl</Option>
            <Option value={1}>Fasting Blood Sugar &gt; 120mg/dl</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Resting Electro-cardiographic Result" name="restecg" rules={[{ required: true }]}>
          <Select placeholder="Select resting electro-cardiographic result">
            <Option value={0}>Normal</Option>
            <Option value={1}>Having ST-T wave abnormality</Option>
            <Option value={2}>Showing probable or definite left ventricular hypertrophy</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Maximum Heart Rate Achieved" name="thalach" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Exercise Induced Angina" name="exang" rules={[{ required: true }]}>
          <Select placeholder="Select exercise induced angina">
            <Option value={0}>No</Option>
            <Option value={1}>Yes</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Card>
      
      
    </div>
  );
};

export default HeartDiseasePrediction;
