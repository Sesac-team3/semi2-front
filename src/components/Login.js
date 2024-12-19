import React, { useState } from 'react';
import './Login.css';
import axiosInstance from '../axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();  // 폼 제출을 방지
    if (username && password) {
      console.log('로그인 시도:', { username, password });
    }

    try {
      const response = await axiosInstance.post('http://localhost:8080/api/login', {
        username,
        password
      });
      const accessToken = response.headers['authorization'];
      if(accessToken) {
          localStorage.setItem('accessToken', accessToken);
      }
      if (response.status === 200) {
        alert('로그인 성공!');
        window.location.href = "/";
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);

  };

  return (
      <div className="login-page">
        <div className="vortex"></div>
        <div className="spiral"></div>
        <div className="login-container">
          <h2>로그인</h2>
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <input
                  type="text"
                  placeholder="아이디"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
            <div className="input-group">
              <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            <button type="button" className="btn btn-login"
                    onClick={handleLogin}>
              로그인
            </button>

            <div className="social-login">
              <button
                  type="button"
                  className="btn btn-social btn-google"
                  onClick={() => handleSocialLogin('Google')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                      fill="currentColor"
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                  />
                </svg>
                Google로 로그인
              </button>
              <button
                  type="button"
                  className="btn btn-social btn-kakao"
                  onClick={() => handleSocialLogin('카카오')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                      fill="currentColor"
                      d="M12,3C7.03,3 3,6.16 3,10C3,12.35 4.35,14.43 6.47,15.73V19.5L10.24,17.13C10.81,17.25 11.4,17.31 12,17.31C16.97,17.31 21,14.15 21,10.31C21,6.46 16.97,3 12,3Z"
                  />
                </svg>
                카카오로 로그인
              </button>
              <button
                  type="button"
                  className="btn btn-social btn-naver"
                  onClick={() => handleSocialLogin('네이버')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                      fill="currentColor"
                      d="M16.33,5.67L16.33,18.33L12.77,18.33L8.13,10.93L8.13,18.33L4.57,18.33L4.57,5.67L8.13,5.67L12.77,13.07L12.77,5.67Z"
                  />
                </svg>
                네이버로 로그인
              </button>
            </div>
          </form>
          <div className="register-link">
            <a href="#"
               onClick={() => window.location.href = "/signup"}>회원가입</a> {/* URL을 정확히 대소문자 구분하여 지정 */}
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
