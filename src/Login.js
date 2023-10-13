import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button, Card } from "antd";
import "./login.css";
import backgroundImage from "../src/back.jpg";
const Login = () => {
  const navigate = useNavigate();
  const [mathExpression, setMathExpression] = useState(generateMathExpression());
  const [userAnswer, setUserAnswer] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  function generateMathExpression() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operator = Math.random() < 0.5 ? "+" : "-";
    const result = operator === "+" ? num1 + num2 : num1 - num2;
    return { num1, num2, operator, result };
  }
  const handleLogin = (values) => {
    const { username, password } = values;
    if (!captchaValid) {
      toast.error("Please solve the CAPTCHA correctly");
      return;
    }
    fetch("https://my-json-server.typicode.com/GavinRuff007/IPM-server/user/" + username)
      .then((res) => res.json())
      .then((resp) => {
        if (Object.keys(resp).length === 0) {
          toast.error("Please enter a valid username or password");
        } else {
          if (resp.password === password) {
            toast.success("Success");
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("userrole", resp.role);
            navigate("/");
          } else {
            toast.error("Please enter valid credentials");
          }
        }
      })
      .catch((err) => {
        toast.error("Login failed due to: " + err.message);
      });
  };
  const checkCaptcha = () => {
    const correctAnswer = eval(`${mathExpression.num1} ${mathExpression.operator} ${mathExpression.num2}`);
    if (parseInt(userAnswer) === correctAnswer) {
      setCaptchaValid(true);
    } else {
      setCaptchaValid(false);
    }
  };
  const refreshCaptcha = () => {
    setMathExpression(generateMathExpression());
    setUserAnswer("");
    setCaptchaValid(false);
  };
  return (
    <div className="login-container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="row">
          <div className="offset-lg-4 col-lg-4" style={{ marginTop: "100px" }}>
            <Card title={<span style={{ color: "white", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>User Login</span>} className="glass-card" style={{ width: "100%", height: "500px", color: "white", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
              <Form layout="vertical" onFinish={handleLogin}>
                <Form.Item label={<span style={{ color: "white" }}>Username</span>} name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label={<span style={{ color: "white" }}>Password</span>} name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item label={<span style={{ color: "white" }}>{`Solve: ${mathExpression.num1} ${mathExpression.operator} ${mathExpression.num2}`}</span>} name="userCaptcha">
                  <Input value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onBlur={checkCaptcha} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>{" "}
                  <Button
                    type="link"
                    className="btn-success"
                    onClick={() => navigate("/register")}
                    style={{ color: "#52c41a", borderColor: "#52c41a" }}
                  >
                    Register
                  </Button>{" "}
                  <Button type="link" onClick={refreshCaptcha}>
                    Refresh CAPTCHA
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;