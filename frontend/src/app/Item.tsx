import React from 'react';

const items = [
  { logo: 'reddit-logo.png', name: 'Reddit', status: 'pass' },
  { logo: 'twitter-logo.png', name: 'Twitter', status: 'fail' },
  { logo: 'facebook-logo.png', name: 'Facebook', status: 'pass' },
];

const ItemRow: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      {items.map((item, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
          <img src={item.logo} alt={`${item.name} logo`} style={{ width: '50px', height: '50px' }} />
          <p>{item.name}</p>
          {item.status === 'pass' ? (
            <span style={{ color: 'green' }}>✔️</span>
          ) : (
            <span style={{ color: 'red' }}>❌</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemRow;