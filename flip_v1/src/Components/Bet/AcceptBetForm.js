import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Parse from 'parse'; // Import Parse

const AcceptBetForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const betData = location.state?.bet;

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (betData) {
      setTitle(betData.title);
    } else {
      navigate('/bet-feed');
    }
  }, [betData, navigate]);

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');

    const query = new Parse.Query('Bet');
    const existingBet = await query.get(betData.id);

    existingBet.set('title', title);

    try {
      await existingBet.save();
      alert('Bet title updated successfully!');
      navigate('/bet-feed'); // Redirect to the bet feed
    } catch (error) {
      console.error('Error while updating bet: ', error);
    }
  };

  const handleBack = () => {
    navigate('/bet-feed'); // Adjust this path if needed
  };

  return (
    <div>
      <h1>Accept Bet</h1>
      <form onSubmit={onSubmitHandler} autoComplete="off">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChangeHandler}
            required
          />
        </div>
        <br />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleBack}>Back</button> {/* Add the Back Button */}
      </form>
    </div>
  );
};

export default AcceptBetForm;
