import React, { useEffect, useState } from 'react';
import '../../styles/reels.css';
import ReelFeed from '../../components/ReelFeed';
import API from '../api'; // ✅ central API client

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await API.get('/api/food');

        console.log(response.data);
        setVideos(response.data.foodItems);

      } catch (err) {
        console.error('Fetch error:', err.response?.data);
      }
    };

    fetchVideos();
  }, []);

  const likeVideo = async (item) => {
    try {
      const response = await API.post(
        '/api/food/like',
        { foodId: item._id }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                likeCount: v.likeCount + (response.data.like ? 1 : -1)
              }
            : v
        )
      );

    } catch (err) {
      console.error('Like error:', err.response?.data);
    }
  };

  const saveVideo = async (item) => {
    try {
      const response = await API.post(
        '/api/food/save',
        { foodId: item._id }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                savesCount: v.savesCount + (response.data.save ? 1 : -1)
              }
            : v
        )
      );

    } catch (err) {
      console.error('Save error:', err.response?.data);
    }
  };

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  );
};

export default Home;
