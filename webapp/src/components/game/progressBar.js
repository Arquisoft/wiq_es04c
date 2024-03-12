import React, { useEffect, useState } from 'react';

const ProgressBar = ({ totalTime }) => {
  const [remainingTime, setRemainingTime] = useState(totalTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div data-testid="remaining-time">{remainingTime}</div>
      <div style={{ width: `${(remainingTime / totalTime) * 100}%`, height: '10px', background: 'green' }}></div>
    </div>
  );
};

export default ProgressBar;