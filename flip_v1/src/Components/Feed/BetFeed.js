import React, { useState, useEffect, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import '../../App.css';
import { getPublicBets } from '../../Services/Bet/BetService';
import { useNavigate } from "react-router-dom";
import { getUser } from "../../Services/Auth/AuthService";
import Navigation from '../Navigation/Navigation';

const BetFeed = () => {
  const [bets, setBets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState(null);
  const currentIndexRef = useRef(currentIndex);
  const navigate = useNavigate();
  const currentUser = getUser();

  const childRefs = useMemo(() => Array(bets.length).fill(0).map(() => React.createRef()), [bets]);

  useEffect(() => {
    const fetchBets = async () => {
      const publicBets = await getPublicBets();
      setBets(publicBets);
      setCurrentIndex(publicBets.length - 1);
    };

    fetchBets();
  }, []);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < bets.length - 1;
  const canSwipe = currentIndex >= 0;

  const handleRightSwipe = async (bet) => {
    console.log('Swiped right on:', bet.get("title"));
    if (bet.get("author").id !== currentUser.id) {
      navigate('/accept-bet', { state: { bet } });
    }
  };

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    if (direction === 'right') {
      handleRightSwipe(bets[index]);
    }
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < bets.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className='bet-feed-container'>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {bets.map((bet, index) => (
          <div key={bet.id}>
            <h3 className='cardTitle'>{bet.get("title")}</h3>
            <TinderCard
              ref={childRefs[index]}
              className='swipe'
              key={bet.id}
              onSwipe={(dir) => swiped(dir, bet.get("title"), index)}
              onCardLeftScreen={() => outOfFrame(bet.get("title"), index)}
            >
              <div
                style={{ backgroundImage: `url(${bet.get("image").url()})` }}
                className='card'
              >
              </div>
            </TinderCard>
          </div>
        ))}
      </div>
      <div className='bottom-section'>
        <div className='buttons'>
          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
          <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default BetFeed;
