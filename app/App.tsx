// An example to replace with your own project. It has data, a probabilistic
// story with one parameter, a score for each guess of that parameter, and the
// best guess.
import {useMemo, useState} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import flips from './flips.json';

/** Log10 likelihood of the flips if each is heads with chance p. */
function score(p: number, heads: number, tails: number): number {
  return heads * Math.log10(p) + tails * Math.log10(1 - p);
}

export default function App() {
  const heads = flips.filter(f => f === 'H').length;
  const tails = flips.length - heads;
  const [p, setP] = useState(0.5);

  const curve = useMemo(
    () =>
      Array.from({length: 19}, (_, i) => {
        const guess = (i + 1) / 20;
        return {guess: guess.toFixed(2), score: score(guess, heads, tails)};
      }),
    [heads, tails],
  );

  return (
    <main style={{fontFamily: 'system-ui, sans-serif', fontSize: 18, maxWidth: 760, margin: '24px auto', padding: 16}}>
      <h1 style={{fontSize: 28}}>Is this coin fair?</h1>
      <p>
        This example uses {flips.length} made-up coin flips, and {heads} of them are heads. The model's story is
        that each flip is heads with chance p, independent of the other flips. Which p makes these flips most
        likely?
      </p>

      <label htmlFor="p" style={{display: 'block', marginTop: 16}}>
        Your guess for p: <strong>{p.toFixed(2)}</strong>, score {score(p, heads, tails).toFixed(2)}
      </label>
      <input
        id="p"
        type="range"
        min={0.05}
        max={0.95}
        step={0.05}
        value={p}
        onChange={e => setP(Number(e.target.value))}
        style={{width: '100%'}}
      />

      <div role="img" aria-label="Score for each guess of p" style={{width: '100%', height: 320, marginTop: 24}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={curve} margin={{top: 8, right: 16, bottom: 32, left: 16}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="guess" label={{value: 'guess for p', position: 'insideBottom', offset: -24}} />
            <YAxis label={{value: 'score (log10)', angle: -90, position: 'insideLeft'}} />
            <Tooltip />
            <Line dataKey="score" stroke="#1a73e8" strokeWidth={3} dot={{r: 4}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p>
        The highest point is the best guess. It is near p = {(heads / flips.length).toFixed(2)}, the fraction of
        flips that were heads.
      </p>
      <p style={{fontSize: 16}}>Data: 50 made-up coin flips, for this example only.</p>
    </main>
  );
}
