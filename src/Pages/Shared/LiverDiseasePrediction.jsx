import React from 'react';
import { Form, InputNumber, Button, message, Typography, Card } from 'antd';
//import { predictLiverDisease } from "../../utils/api"

const { Title, Paragraph } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const LiverDiseasePrediction = () => {
  const onFinish = async (values) => {
    try {
      const prediction = await predictLiverDisease(values);
      console.log('Prediction:', prediction);
      if (prediction.prediction === 1) {
        message.success('The patient has liver disease.');
      } else {
        message.info('The patient does not have liver disease.');
      }
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography>
        <Title level={2}>Liver Disease Prediction</Title>
        <Paragraph>
          Please input patient data into the following fields to predict the possibility of liver disease.
        </Paragraph>
      </Typography>
      <Card style={{ marginTop: '2rem' }}>
        <Form {...formItemLayout} name="liver_disease_prediction" onFinish={onFinish}>
          <Form.Item label="Total Bilirubin" name="Total_Bilirubin" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Direct Bilirubin" name="Direct_Bilirubin" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Alkaline Phosphotase" name="Alkaline_Phosphotase" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Alamine Aminotransferase" name="Alamine_Aminotransferase" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Total Proteins" name="Total_Protiens" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Albumin" name="Albumin" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Albumin and Globulin Ratio" name="Albumin_and_Globulin_Ratio" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LiverDiseasePrediction;
