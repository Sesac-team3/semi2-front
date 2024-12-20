import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import axios from "../axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate(); // navigate 함수 선언

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('/signup', {
        username,
        password
      });

      if (response.status === 200) {
        alert('회원가입이 완료되었습니다!');
        console.log('회원가입 시도:', { username, email, password });
        navigate('/');
      }
    } catch (error) {
      // 오류 처리
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const socialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    alert(`${provider} 로그인 진행중...`);
  };

  return (
      <div className="signup-container">
        <div className="signup-header">
          <h1>회원가입</h1>
          <p>새로운 계정을 만들어보세요</p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
                type="text" id="username" name="username" placeholder=" "
                value={formData.username}
                onChange={handleChange}
                required
            />
            <label htmlFor="username">아이디</label>
          </div>
          <div className="form-group">
            <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
            />
            <label htmlFor="email">이메일</label>
          </div>
          <div className="form-group">
            <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
                required
            />
            <label htmlFor="password">비밀번호</label>
          </div>
          <div className="form-group">
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            <label htmlFor="confirmPassword">비밀번호 확인</label>
          </div>
          <button type="submit" className="signup-btn">가입하기</button>
        </form>
        <div className="social-login">
          <p>또는</p>
          <div className="social-buttons">
            <button className="social-btn btn-google"
                    onClick={() => socialLogin('Google')}>Google로 시작하기</button>
            <button className="social-btn btn-kakao"
                    onClick={() => socialLogin('Kakao')}>카카오로 시작하기</button>
            <button className="social-btn btn-naver"
                    onClick={() => socialLogin('Naver')}>네이버로 시작하기</button>
          </div>
        </div>
        <div className="login-link">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </div>
      </div>
  );
};

export default Signup;
