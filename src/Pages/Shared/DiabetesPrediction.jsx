import React,{useState} from 'react';
import { Form, InputNumber, Button, Card, Typography, Modal,Select,Input } from 'antd';
import { predictDiabetes } from "../../utils/api";

const { Title, Text } = Typography;
const { Option } = Select;

const DiabetesPrediction = () => {

  const [predictionModalVisible, setPredictionModalVisible] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [formData, setFormData] = useState(null);

  const onFinish = async (values) => {
    try {
      setFormData(values);
      const prediction = await predictDiabetes(values);
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
    <Card title="Diabetes Prediction" >
      <Title level={4}>About Diabetes</Title>
      <Text>
        Diabetes is a chronic disease that affects how your body processes blood sugar (glucose). 
        It is important to detect and manage diabetes early to prevent complications and maintain a healthy lifestyle.
      </Text>

      <Form name="diabetes_prediction" onFinish={onFinish} style={{ marginTop: 20 }}>

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

        {/* <Form.Item label="Age" name="age" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item> */}

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
            <p><strong>Prediction:</strong> {predictionData.prediction === 1 ? 'The patient may have Diabetes.' : 'The patient does not have Diabetes.'}</p>
          </>
        )}
      </Modal>
    </Card>
  );
};

export default DiabetesPrediction;
