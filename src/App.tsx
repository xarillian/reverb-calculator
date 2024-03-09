import React, { useState } from 'react';

const millisecondsToSeconds = (ms: number) => (ms / 1000).toFixed(2);

const calculateNoteLengths = (bpm: number) => {
  const quarterNote = 60000 / bpm;
  return {
    wholeNote: quarterNote * 4,
    sixtyFourthNote: quarterNote / 16,
  };
}

const ResultDisplay: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <p className="text-zinc-200">
    {label}:&nbsp;
    <span
      className="font-semibold text-zinc-200 hover:underline cursor-help"
      title={`${millisecondsToSeconds(value)}s`}
    >
      {value.toFixed(2)} ms
    </span>
  </p>
);


const App: React.FC = () => {
  const [bpm, setBpm] = useState<number>(120);
  const [decayTime, setDecayTime] = useState<number>(calculateNoteLengths(120).wholeNote);
  const [preDelay, setPreDelay] = useState<number>(calculateNoteLengths(120).sixtyFourthNote);

  const calculateValues = () => {
    const { wholeNote, sixtyFourthNote } = calculateNoteLengths(bpm);
    setDecayTime(wholeNote);
    setPreDelay(sixtyFourthNote);
  };

  const bpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Math.max(0, +e.target.value));
    calculateValues()
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-900 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl text-zinc-200 font-bold mb-6 text-center">Reverb Calculator</h1>
        <div className='flex justify-center'>
          <div className="flex flex-col items-start gap-2 mb-8">
            <label htmlFor="bpm_input" className="text-zinc-200 text-xs self-start">
              BPM
            </label>
            <input
              type="number"
              id="bpm_input"
              className="form-input text-center text-zinc-950 w-32 p-2 border rounded"
              value={bpm || ''}
              onChange={(e) => bpmChange(e)}
            />  
          </div>
        </div>
        <div className="space-y-4">
          <ResultDisplay label="Decay Time" value={decayTime} />
          <ResultDisplay label="Pre-Delay" value={preDelay} />
        </div>
      </div>
    </div>
  );
};

export default App;