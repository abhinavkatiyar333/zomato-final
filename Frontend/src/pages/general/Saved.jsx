import React, { useEffect, useState } from 'react';
import '../../styles/reels.css';
import ReelFeed from '../../components/ReelFeed';
import API from "../../api"
 // ✅ central API client

const Saved = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await API.get('/api/food/save');

        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));

        setVideos(savedFoods);

      } catch (err) {
        console.error('Saved fetch error:', err.response?.data);
      }
    };

    fetchSaved();
  }, []);

  const removeSaved = async (item) => {
    try {
      await API.post(
        '/api/food/save',
        { foodId: item._id }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                savesCount: Math.max(
                  0,
                  (v.savesCount ?? 1) - 1
                ),
              }
            : v
        )
      );

    } catch (err) {
      console.error('Remove save error:', err.response?.data);
    }
  };

  return (
    <ReelFeed
      items={videos}
      onSave={removeSaved}
      emptyMessage="No saved videos yet."
    />
  );
};

export default Saved;
