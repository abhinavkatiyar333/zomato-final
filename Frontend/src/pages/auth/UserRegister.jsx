import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth-shared.css';
import API from '../api'; // ✅ central API client

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await API.post(
        '/api/auth/user/register',
        {
          fullName: firstName + ' ' + lastName,
          email,
          password
        }
      );

      console.log(response.data);
      navigate('/');

    } catch (error) {
      console.error('Register error:', error.response?.data);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Join to explore and enjoy delicious meals.
          </p>
        </header>

        <nav className="auth-alt-action">
          <strong>Switch:</strong>
          <Link to="/user/register"> User</Link> •
          <Link to="/food-partner/register"> Food partner</Link>
        </nav>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="two-col">
            <div className="field-group">
              <label>First Name</label>
              <input name="firstName" />
            </div>

            <div className="field-group">
              <label>Last Name</label>
              <input name="lastName" />
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

          <button className="auth-submit" type="submit">
            Sign Up
          </button>
        </form>

        <div className="auth-alt-action">
          Already have an account?
          <Link to="/user/login"> Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
