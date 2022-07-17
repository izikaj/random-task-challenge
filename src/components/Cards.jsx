import Card from './Card';

export function Cards({items}) {
  return (
    <div className="cards">
      {items.map((item, key) => <Card key={key} {...item} />) }
    </div>
  )
}

export default Cards;
