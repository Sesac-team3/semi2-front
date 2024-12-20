import React, { useState } from 'react';
import './Login.css';
import axios from '../axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();  // 폼 제출을 방지
    if (username && password) {
      console.log('로그인 시도:', { username, password });
    }

    try {
      const response = await axios.post('/login', {
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

  const socialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    alert(`${provider} 로그인 진행중...`);
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
              <p>또는</p>
              <div className="social-buttons">
                <button className="social-btn btn-google"
                        onClick={() => socialLogin('Google')}>Google로 시작하기
                </button>
                <button className="social-btn btn-kakao"
                        onClick={() => socialLogin('Kakao')}>카카오로 시작하기
                </button>
                <button className="social-btn btn-naver"
                        onClick={() => socialLogin('Naver')}>네이버로 시작하기
                </button>
              </div>
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

export default Login;
