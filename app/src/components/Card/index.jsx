import React from "react";
import ContentLoader from "react-content-loader";
import cardStyles from "./Card.module.scss";

import AppContext from "../../context";

function Card({
  id,
  title,
  imageUrl,
  price,
  onPlus,
  onClickFavorite,
  favorited = false,
  // added = false,
  loading = false,
}) {
  const { isAddedItems } = React.useContext(AppContext);
  const [isFavorite, setIsFavorive] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, parentId: id, title, imageUrl, price });
  };

  const onFavorite = () => {
    onClickFavorite({ id, parentId: id, title, price, imageUrl });
    setIsFavorive(!isFavorite);
  };

  return (
    <div className={cardStyles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={245}
          height={235}
          viewBox="0 0 245 235"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="107" rx="6" ry="6" width="160" height="15" />
          <rect x="1" y="134" rx="5" ry="5" width="80" height="15" />
          <rect x="0" y="159" rx="5" ry="5" width="80" height="26" />
          <rect x="131" y="154" rx="8" ry="8" width="32" height="32" />
          <rect x="2" y="10" rx="10" ry="10" width="160" height="90" />
        </ContentLoader>
      ) : (
        <>
          <div className={cardStyles.favorite} onClick={onClickFavorite}>
            <img
              onClick={onFavorite}
              width={15}
              src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"}
              alt="like"
            />
          </div>
          <img
            className={cardStyles.img}
            width="100%"
            heigth={112}
            src={imageUrl}
            alt="sneakers"
          />
          <h5>{title} </h5>
          <div className={cardStyles.card__button}>
            <div className={cardStyles.card__button__item}>
              <span>Price:</span>
              <b>{price} $</b>
            </div>
            <button onClick={onClickPlus} className={cardStyles.btn__plus}>
              <img
                width={20}
                heigth={20}
                src={isAddedItems(id) ? "img/checked.png" : "img/plus.svg"}
                alt="plus"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
