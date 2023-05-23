import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';


const LifeStyleHome = () => {
    const navigate = useNavigate();

    const handleLiver =()=>{
        navigate("/life-style-liver")
    }

    const handleHeart=()=>{
        navigate("/life-style-heart")
    }

    const handleDiabetes=()=>{
        navigate("/life-style-diabetes")
    }

    const handleCancer=()=>{
        navigate("/cancer")
    }

  return (
    <div className="lifestyle-home">
      <Card title="Lifestyle Diseases" style={{  margin: '20px auto' }}>
        <p>Lifestyle diseases are ailments that are primarily based on the day to day habits of people. Habits that detract people from activity and push them towards a sedentary routine can cause a number of health issues that can lead to chronic non-communicable diseases that can have near life-threatening consequences.</p>

        <p>Here are some common lifestyle diseases:</p>
        <ul>
          <li>Heart disease</li>
          <li>Stroke</li>
          <li>Obesity</li>
          <li>Type 2 diabetes</li>
          <li>Certain types of cancer</li>
        </ul>

        <p>Prevention is better than cure. A healthy and active lifestyle, balanced diet, regular exercise and regular medical checkups can help prevent these diseases.</p>

        <h3>Prevention tips for specific diseases:</h3>
        
        <h4>Cancer</h4>
        <p>The risk of developing many types of cancer can be reduced by practicing healthy behaviors. These include not smoking, eating a diet rich in fruits and vegetables, maintaining a healthy weight, and being physically active. Regular screenings and self-examinations can help detect certain types of cancer early.</p>
        
        <h4>Diabetes</h4>
        <p>A balanced diet, regular physical activity, maintaining a normal body weight, and avoiding tobacco use can prevent or delay the onset of type 2 diabetes. Regular screening for type 2 diabetes, particularly in people at risk, can lead to early detection and treatment.</p>
        
        <h4>Heart Disease</h4>
        <p>A healthy diet, regular exercise, avoiding tobacco, and limiting alcohol intake can significantly reduce the risk of heart diseases. Regular check-ups to monitor blood pressure, cholesterol, and glucose levels can also help in early detection and management.</p>
        
        <h4>Kidney Disease</h4>
        <p>Healthy eating habits, regular exercise, and avoiding excessive use of over-the-counter medications and certain prescription drugs can help prevent kidney disease. Regular check-ups are also crucial, especially for those with risk factors like high blood pressure or diabetes.</p>
        
        <h4>Liver Diseases</h4>
        <p>Consuming a healthy diet, limiting alcohol, avoiding risky behaviors like drug use or unprotected sex, and getting vaccinated against hepatitis can prevent liver diseases. Regular screenings and early treatment of viral infections can also help prevent liver diseases.</p>

        <Button type="primary" onClick={handleLiver} style={{ margin: '10px' }}>Liver Disease Prediction</Button>
        <Button type="primary" onClick={handleHeart} style={{ margin: '10px' }}>Heart Disease Prediction</Button>
        <Button type="primary" onClick={handleDiabetes} style={{ margin: '10px' }}>Diabetes Prediction</Button>
        <Button type="primary" onClick={handleCancer} style={{ margin: '10px' }}>Cancer Prediction</Button>
      </Card>
    </div>
  );
};

export default LifeStyleHome;
