import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../context";

function Header(props) {
  const { cardItems } = React.useContext(AppContext);
  const totalPrice = cardItems.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <header>
      <Link to="/">
        <div className="header__left">
          <img width={55} heigth={55} src="img/logo.png" alt="logo" />
          <div>
            <h3>React film cameras</h3>
            <p>capture the moment</p>
          </div>
        </div>
      </Link>
      <ul className="header__right">
        <li onClick={props.onClickCard}>
          <img width={20} height={20} src="img/basket.svg" alt="Basket" />
          <span>{totalPrice} $</span>
        </li>
        <li>
          <Link to="/favorites">
            <img
              width={20}
              height={20}
              src="img/heart-unliked.svg"
              alt="Favotite"
            />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={20} heigth={20} src="img/user.svg" alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  );
}
export default Header;
