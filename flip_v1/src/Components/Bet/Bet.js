import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Parse from 'parse';
import { useNavigate } from 'react-router-dom';
import BetForm from './BetForm';
import { createStakeholderInfo } from '../../Services/StakeholderInfo/StakeholderInfoService';

const Bet = () => {
  const navigate = useNavigate();
  const [newBet, setNewBet] = useState({
    title: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    author: '',
    comments: [],
    image: null,
    imageUrl: '',
    public: false,
    wagerRatio: 1.0, // default wager ratio
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewBet({
      ...newBet,
      image: file,
      imageUrl: URL.createObjectURL(file),
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewBet({
      ...newBet,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');

    const currentUser = Parse.User.current();
    const bet = new Parse.Object('Bet');

    bet.set('title', newBet.title);
    bet.set('description', newBet.description);
    bet.set('location', newBet.location);
    bet.set('start', new Date(newBet.startTime));
    bet.set('end', new Date(newBet.endTime));
    bet.set('author', currentUser);
    bet.set('comments', newBet.comments);
    bet.set('public', newBet.public);
    bet.set('wagerRatio', parseFloat(newBet.wagerRatio));

    try {
      console.log('Creating StakeholderInfo...');
      const stakeholderInfo = await createStakeholderInfo(currentUser, 5.0);
      bet.set('Stakeholders', stakeholderInfo);

      if (newBet.image) {
        const parseFile = new Parse.File(newBet.image.name, newBet.image);
        await parseFile.save();
        bet.set('image', parseFile);
      }

      console.log('Saving Bet...');
      await bet.save();
      console.log('Bet created successfully!');
      alert('Bet created successfully!');
      navigate('/bet-feed');
    } catch (error) {
      console.error('Error while creating bet: ', error);
    }
  };

  return (
    <div>
      <BetForm
        bet={newBet}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        handleImageChange={handleImageChange}
      />
      <Navigation />
    </div>
  );
};

export default Bet;
