import React, {useState} from 'react';
import { Form, InputNumber, Select, Button, Modal, Typography, Card,Input } from 'antd';
import { predictHeartDisease } from "../../utils/api";


const { Option } = Select;
const { Title, Text } = Typography;

const HeartDiseasePrediction = () => {

  const [predictionModalVisible, setPredictionModalVisible] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [formData, setFormData] = useState(null);

  const onFinish = async (values) => {
    try {
      setFormData(values);
      const prediction = await predictHeartDisease(values);
      console.log('Prediction:', prediction);
      setPredictionData(prediction);
      setPredictionModalVisible(true);
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  const handleModalOk = () => {
    setPredictionModalVisible(false);
  };

  return (
    <div className="heart-disease-prediction">
      <Typography>
        <Title level={3}>Heart Disease Prediction</Title>
        <Text>Heart disease refers to a variety of conditions that affect the heart's structure or function. It is essential to detect heart disease early to prevent complications and provide appropriate treatment.</Text>
      </Typography>
      <Card style={{ marginTop: '2rem' }}>
      <Form name="heart_disease_prediction" onFinish={onFinish}>

      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input className="small-input" />
        </Form.Item>

        <Form.Item label="Age" name="age" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
          <Select placeholder="Select gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>

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
      <Modal
        title="Cancer Prediction Result"
        visible={predictionModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
      >
        {predictionData && (
          <>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            {/* Display other prediction details */}
            <p><strong>Prediction:</strong> {predictionData.prediction === 1 ? 'The patient may have Heart Disease.' : 'The patient does not have Heart Disease.'}</p>
          </>
        )}
      </Modal>
      </Card>
    </div>
  );
};

export default HeartDiseasePrediction;
