import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [bpm, setBpm] = useState<number>(0);
  const [decayTime, setDecayTime] = useState<number>(0);
  const [preDelay, setPreDelay] = useState<number>(0);

  const calculateValues = () => {
    const quarterNote = 60000 / bpm;
    const halfNote = quarterNote * 2;
    const wholeNote = halfNote * 2;
    setDecayTime(wholeNote);

    const eighthNote = quarterNote / 2;
    const sixteenthNote = eighthNote / 2;
    const thirtySecondNote = sixteenthNote / 2;
    const sixtyFourthNote = thirtySecondNote / 2;
    setPreDelay(sixtyFourthNote);
  };

  return (
    <div className="App">
      <div className="max-w-md mx-auto flex flex-col items-center pt-10">
        <input
          type="number"
          className="input input-bordered w-full max-w-xs"
          placeholder="Enter BPM"
          value={bpm}
          onChange={(e) => setBpm(+e.target.value)}
        />
        <button
          className="btn btn-primary mt-4"
          onClick={calculateValues}
        >
          Calculate
        </button>
        <div className="mt-4">
          <p>Decay Time: {decayTime} ms (Whole Note)</p>
          <p>Pre-Delay: {preDelay} ms (64th Note)</p>
        </div>
      </div>
    </div>
  );
};

export default App;