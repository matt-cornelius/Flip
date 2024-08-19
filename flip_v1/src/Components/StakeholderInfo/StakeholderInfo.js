// StakeholderInfo.js
import React, { useState } from 'react';
import Parse from 'parse';

const StakeholderInfo = () => {
  const [stakeholderInfo, setStakeholderInfo] = useState({
    firstBetter: Parse.User.current(),
    firstWager: 5.0,
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setStakeholderInfo({
      ...stakeholderInfo,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const StakeholderInfo = Parse.Object.extend('StakeholderInfo');
    const stakeholderInfoObj = new StakeholderInfo();

    stakeholderInfoObj.set('firstBetter', stakeholderInfo.firstBetter);
    stakeholderInfoObj.set('firstWager', parseFloat(stakeholderInfo.firstWager));

    try {
      await stakeholderInfoObj.save();
      alert('StakeholderInfo created successfully!');
    } catch (error) {
      console.error('Error while creating StakeholderInfo: ', error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} autoComplete="off">
      <div>
        <label>First Wager</label>
        <input
          type="number"
          name="firstWager"
          value={stakeholderInfo.firstWager}
          onChange={onChangeHandler}
          required
        />
      </div>
      <br />
      <button type="submit">Create Stakeholder Info</button>
    </form>
  );
};

export default StakeholderInfo;
