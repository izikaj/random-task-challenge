import { useState, useEffect } from 'preact/hooks';
import DATA from '../data';
import { save, load } from '../utils/persist';
import timeAgo from '../utils/timer';

import Cards from './Cards';
import CardsPlaceholder from './Placeholder';

const sample = (items = []) => items[Math.floor(Math.random() * items.length)];

const getRandomItem = (kind) => {
  if (!DATA[kind]) throw 'unknown kind';

  const { title, items, prefix } = DATA[kind] || {};
  return { title, url: `${prefix}${sample(items)}` }
}

const getRandomSet = () => {
  return Object.keys(DATA).map((kind) => getRandomItem(kind))
}

const saveState = (data) => save(data);
const loadState = () => {
  const data = load();
  if (Object.keys(data).length === 0) return {};

  if (data.startedAt) { data.startedAt = new Date(data.startedAt); }
  if (data.finishedAt) data.finishedAt = new Date(data.finishedAt);
  return data;
}
const loadTimer = (data) => {
  if (!data.startedAt) return '00:00';
  if (!data.finishedAt) return timeAgo(data.startedAt);

  return timeAgo(data.startedAt, data.finishedAt);
}

const initialState = loadState();
const initialTimer = loadTimer(initialState);

export function PlayBox() {
  const [state, setState] = useState(initialState);
  const [timer, setTimer] = useState(initialTimer);

  const startTask = () => {
    setState({
      items: getRandomSet(),
      startedAt: new Date(),
      started: true,
    });
    setTimer('00:00');
  }

  const stopTask = () => {
    setState({
      ...state,
      finishedAt: new Date(),
      started: false,
    });
  }

  // save state on each state update
  useEffect(() => saveState(state), [state]);

  // start update timer if started & stop if not
  useEffect(() => {
    if (!state.started) return;

    const timer = setInterval(() => setTimer(timeAgo(state.startedAt)), 200);
    return () => clearInterval(timer);
  }, [state.startedAt, state.started]);

  return (
    <div className={`box ${state.started ? 'started' : ''}`}>
      {state.items ? <Cards items={state.items} /> : <CardsPlaceholder />}
      <span className="row">
        {
          state.started ?
            <button children="Finish Task" className="btn finish" onClick={stopTask} type="button" /> :
            <button children="Start Task" className="btn start" onClick={startTask} type="button" />
        }
        <h3 children={`Time spend: ${timer}`} />
      </span>
    </div>
  )
}

export default PlayBox;
