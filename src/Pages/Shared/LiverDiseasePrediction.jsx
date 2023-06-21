import React, {useState} from 'react';
import { Form, InputNumber, Button, Modal, Typography, Card,Select,Input } from 'antd';
import { predictLiverDisease } from "../../utils/api"

const { Title, Paragraph } = Typography;

// const formItemLayout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 14 },
// };

const LiverDiseasePrediction = () => {
  const [predictionModalVisible, setPredictionModalVisible] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [formData, setFormData] = useState(null);
  const onFinish = async (values) => {
    try {
      setFormData(values);
      const prediction = await predictLiverDisease(values);
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
    <div style={{ padding: '2rem' }}>
      <Typography>
        <Title level={2}>Liver Disease Prediction</Title>
        <Paragraph>
          Please input patient data into the following fields to predict the possibility of liver disease.
        </Paragraph>
      </Typography>
      <Card style={{ marginTop: '2rem' }}>
        <Form  name="liver_disease_prediction" onFinish={onFinish} style={{ marginTop: 20 }}>

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
            <p><strong>Prediction:</strong> {predictionData.prediction === 1 ? 'The patient may have Liver Disease.' : 'The patient does not have Liver Disease.'}</p>
          </>
        )}
      </Modal>
      </Card>
    </div>
  );
};

export default LiverDiseasePrediction;
