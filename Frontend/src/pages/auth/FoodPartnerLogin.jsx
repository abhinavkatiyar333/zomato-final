import React from 'react';
import '../../styles/auth-shared.css';
import { useNavigate } from 'react-router-dom';
import API from "../../api"
 // ✅ use central API client

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await API.post(
        '/api/auth/food-partner/login',
        { email, password }
      );

      console.log(response.data);
      navigate('/create-food');

    } catch (err) {
      console.error('Login error:', err.response?.data);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner login</h1>
          <p className="auth-subtitle">
            Access your dashboard and manage orders.
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
          New partner? <a href="/food-partner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
