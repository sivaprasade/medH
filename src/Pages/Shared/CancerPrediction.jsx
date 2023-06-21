import React, { useState } from 'react';
import { Form, InputNumber, Input, Button, Card, Modal, Select } from 'antd';
import { predictCancer } from "../../utils/api";
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const CancerPrediction = () => {
  const [predictionModalVisible, setPredictionModalVisible] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [formData, setFormData] = useState(null);

  const onFinish = async (values) => {
    try {
      setFormData(values);
      const prediction = await predictCancer(values);
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
    <Card title="Cancer Prediction" >
      <Title level={4}>Cancer Prediction</Title>
      <Paragraph>
        Cancer is a complex disease that can affect various parts of the body. Early detection and treatment are crucial for successful outcomes. Use the form below to enter the required information for cancer prediction.
      </Paragraph>
      <Form name="cancer_prediction" onFinish={onFinish} style={{ marginTop: 20 }}>
        
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

        <Form.Item label="Mean of the Concave Points" name="concave_points_mean" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.0001} />
        </Form.Item>

        <Form.Item label="Mean of the Area" name="area_mean" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Mean of the Radius" name="radius_mean" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.01} />
        </Form.Item>

        <Form.Item label="Mean of the Perimeters" name="perimeter_mean" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.1} />
        </Form.Item>

        <Form.Item label="Mean of the Concavity" name="concavity_mean" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.0001} />
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
            <p><strong>Prediction:</strong> {predictionData.prediction === 1 ? 'The patient may have cancer.' : 'The patient does not have cancer.'}</p>
          </>
        )}
      </Modal>

    </Card>
  );
};

export default CancerPrediction;
