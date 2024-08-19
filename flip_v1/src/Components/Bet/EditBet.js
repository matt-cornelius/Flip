// EditBet.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBetById, changeBetContents } from '../../Services/Bet/BetService';
import BetForm from './BetForm';

const EditBet = () => {
  const { betId } = useParams();
  const navigate = useNavigate();
  const [bet, setBet] = useState(null);

  useEffect(() => {
    getBetById(betId).then((bet) => {
      setBet({
        title: bet.get("title"),
        description: bet.get("description"),
        location: bet.get("location"),
        startTime: bet.get("start").toISOString().slice(0, 16),
        endTime: bet.get("end").toISOString().slice(0, 16),
        public: bet.get("public"),
        imageUrl: bet.get("image") ? bet.get("image").url() : null,
      });
    });
  }, [betId]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const startTime = new Date(bet.startTime);
    const endTime = new Date(bet.endTime);

    await changeBetContents(betId, bet.title, bet.description, bet.location, startTime, endTime, bet.public);
    navigate("/bet-feed");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Handle the image file as needed, such as uploading it and getting a URL
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBet((prevBet) => ({
      ...prevBet,
      [name]: value,
    }));
  };

  return bet ? (
    <BetForm
      bet={bet}
      onChange={handleChange}
      onSubmit={handleEditSubmit}
      handleImageChange={handleImageChange}
    />
  ) : (
    <p>Loading...</p>
  );
};

export default EditBet;
