import React from 'react';
import TinderCard from 'react-tinder-card';

const SwipeCard = ({ event, onSwipeRight }) => {
  const onSwipe = (direction) => {
    if (direction === 'right') {
      onSwipeRight(event);
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
  };

  return (
    <TinderCard
      onSwipe={onSwipe}
      onCardLeftScreen={() => onCardLeftScreen(event.id)}
      preventSwipe={['up', 'down']}
    >
      <div
        style={{
          backgroundImage: `url(${event.get("image") ? event.get("image").url() : 'https://via.placeholder.com/300x400'})`,
          width: '300px',
          height: '300px',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: 'white',
          padding: '20px',
          boxSizing: 'border-box'
        }}
      >
        <h3>{event.get("title")}</h3>
        <p>{event.get("description")}</p>
      </div>
    </TinderCard>
  );
};

export default SwipeCard;
