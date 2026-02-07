import React, { useState, useEffect } from 'react';
import '../../styles/profile.css';
import { useParams } from 'react-router-dom';
import API from '../api'; // ✅ central API client

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get(
          `/api/food-partner/${id}`
        );

        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);

      } catch (err) {
        console.error('Profile fetch error:', err.response?.data);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-meta">
          <img
            className="profile-avatar"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500"
            alt=""
          />

          <div className="profile-info">
            <h1 className="profile-pill profile-business">
              {profile?.name}
            </h1>
            <p className="profile-pill profile-address">
              {profile?.address}
            </p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-label">
              total meals
            </span>
            <span className="profile-stat-value">
              {profile?.totalMeals}
            </span>
          </div>

          <div className="profile-stat">
            <span className="profile-stat-label">
              customer served
            </span>
            <span className="profile-stat-value">
              {profile?.customersServed}
            </span>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

      <section className="profile-grid">
        {videos.map((v) => (
          <div key={v._id} className="profile-grid-item">
            <video
              className="profile-grid-video"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
              src={v.video}
              muted
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Profile;
