import { useState } from 'react';

export const Kettle = () => {
  const [powerOn, setPowerOn] = useState<boolean>(false);
  const [waterLevel, setWaterLevel] = useState(0);
  const [temperature, setTemperature] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    
    if (value >= 0 && value <= 1.0) {
      setWaterLevel(value);
    }
  };

  const startWaterBoiling = () => {
    setPowerOn(true);
    console.log('Power was on');
    const id = setInterval(() => {
      setTemperature(prev => prev + 10)
    }, 1000);

    setIntervalId(id);
  };

  const stopWaterBoiling = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
      setPowerOn(false);
      console.log('Power was off')
    }
  };

  const onReset = () => {
    setWaterLevel(0);
    setIntervalId(null);
    setPowerOn(false);
    setTemperature(0);
    console.log('The settings have been reset');
  }

  if (temperature >= 100) {
    console.log('The kettle was boiled');
    stopWaterBoiling();
  }

  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column' }}>
      <p>Condition: {powerOn ? 'On' : 'Off'}</p>
      <div>
        <label htmlFor="floatInput">Input the floar number from 0 to 1:</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="1"
          id="floatInput"
          value={waterLevel}
          onChange={handleInputChange}
          style={{ marginLeft: 10 }}
        />
        <p>The water's level: {waterLevel}</p>
      </div>
      {powerOn && <p>Temperature: {temperature}°C</p>}
      <button style={{ marginTop: 20, cursor: 'pointer'}} onClick={powerOn ? stopWaterBoiling : startWaterBoiling}>
        {powerOn ? 'Turn off' : 'Turn on'}
      </button>
      <button style={{ marginTop: 20, cursor: 'pointer'}} onClick={onReset}>
        Reset
      </button>
    </div>
  );
};
