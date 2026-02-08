import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth-shared.css';
import API from "../../api"
 // ✅ central API client

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => { 
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      const response = await API.post(
        '/api/auth/food-partner/register',
        {
          name: businessName,
          contactName,
          phone,
          email,
          password,
          address
        }
      );

      console.log(response.data);
      navigate('/create-food');

    } catch (error) {
      console.error('Register error:', error.response?.data);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner sign up</h1>
          <p className="auth-subtitle">
            Grow your business with our platform.
          </p>
        </header>

        <nav className="auth-alt-action">
          <strong>Switch:</strong> 
          <Link to="/user/register"> User</Link> • 
          <Link to="/food-partner/register"> Food partner</Link>
        </nav>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label>Business Name</label>
            <input name="businessName" />
          </div>

          <div className="two-col">
            <div className="field-group">
              <label>Contact Name</label>
              <input name="contactName" />
            </div>

            <div className="field-group">
              <label>Phone</label>
              <input name="phone" />
            </div>
          </div>

          <div className="field-group">
            <label>Email</label>
            <input name="email" type="email" />
          </div>

          <div className="field-group">
            <label>Password</label>
            <input name="password" type="password" />
          </div>

          <div className="field-group">
            <label>Address</label>
            <input name="address" />
          </div>

          <button className="auth-submit" type="submit">
            Create Partner Account
          </button>
        </form>

        <div className="auth-alt-action">
          Already a partner? 
          <Link to="/food-partner/login"> Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
