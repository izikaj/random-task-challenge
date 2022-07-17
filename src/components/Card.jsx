export function Card({ title, url }) {
  const isDummy = !url;
  return (
    <>
      <div className={`card${isDummy ? ' placeholder' : ''}`}>
        <div className={`card-image${isDummy ? ' placeholder' : ''}`}>
          {url && <img src={url} alt={title} width="100" height="100" />}
        </div>
        <h3>{title}</h3>
      </div>
    </>
  )
}

export default Card;
