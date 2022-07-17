import DATA from '../data';
import Card from './Card';

const titles = Object.keys(DATA).map(k => DATA[k].title);

export function Placeholder() {
  return (
    <div className="cards placeholder">
      { titles.map((title) => <Card title={title}/>) }
    </div>
  )
}

export default Placeholder;
