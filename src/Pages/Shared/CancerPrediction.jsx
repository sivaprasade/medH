import React from 'react';
import { Form, InputNumber, Button, Card, message } from 'antd';
import { predictCancer } from "../../utils/api";
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const CancerPrediction = () => {
  const onFinish = async (values) => {
    try {
      const prediction = await predictCancer(values);
      console.log('Prediction:', prediction);
      
      if (prediction.prediction === 1) {
        message.success('The patient has cancer.');
      } else {
        message.info('The patient does not have cancer.');
      }
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <Card title="Cancer Prediction" >
      <Title level={4}>Cancer Prediction</Title>
      <Paragraph>
        Cancer is a complex disease that can affect various parts of the body. Early detection and treatment are crucial for successful outcomes. Use the form below to enter the required information for cancer prediction.
      </Paragraph>
      <Form name="cancer_prediction" onFinish={onFinish} style={{ marginTop: 20 }}>
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
    </Card>
  );
};

export default CancerPrediction;
