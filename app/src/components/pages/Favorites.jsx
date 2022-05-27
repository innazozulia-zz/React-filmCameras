import React from "react";
import Card from "../Card/index";

import AppContext from "../../context";

function Favorites() {
  const { favorites, onAddtoFavorite } = React.useContext(AppContext);
  return (
    <div className="content">
      <div className="content__title">
        <h1>My Favorites</h1>
      </div>
      <div className="sneakers">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onClickFavorite={onAddtoFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;

// title={item.title}
// price={item.price}
// imageUrl={item.imageUrl}
