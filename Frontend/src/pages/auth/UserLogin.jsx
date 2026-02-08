import React from 'react';
import '../../styles/auth-shared.css';
import { useNavigate } from 'react-router-dom';
import API from "../../api"
 // ✅ central API client

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await API.post(
        '/api/auth/user/login',
        { email, password }
      );

      console.log(response.data);
      navigate('/');

    } catch (error) {
      console.error('Login error:', error.response?.data);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to continue your food journey.
          </p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label>Email</label>
            <input name="email" type="email" />
          </div>

          <div className="field-group">
            <label>Password</label>
            <input name="password" type="password" />
          </div>

          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>

        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
