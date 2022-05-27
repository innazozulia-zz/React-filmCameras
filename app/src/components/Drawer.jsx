import React from "react";
import axios from "axios";

import Info from "./Info";
import AppContext from "../context";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onRemove, onClose, items = [] }) {
  const { cardItems, setCardItems } = React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoadingInfo, setIsLoadingInfo] = React.useState(false);

  const totalPrice = cardItems.reduce((sum, obj) => obj.price + sum, 0);

  const onClickOrder = async () => {
    setIsLoadingInfo(true);
    const { data } = await axios.post(
      "https://628112b11020d852058523c6.mockapi.io/orders",
      {
        items: cardItems,
      }
    );
    setOrderId(data.id);
    setIsOrderComplete(true);
    setCardItems([]);

    for (let i = 0; i < cardItems.length; i++) {
      const item = cardItems[i];
      await axios.delete(
        "https://628112b11020d852058523c6.mockapi.io/card/" + item.id
      );
      // await axios.delete(
      //   "https://628112b11020d852058523c6.mockapi.io/card" + item.id
      // );
      await delay(1000);
    }
    setIsLoadingInfo(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Shopping Cart
          <img
            onClick={onClose}
            className="remove"
            width={20}
            src="img/remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div className="basket__items">
            <div className="cart__items">
              {items.map((obj) => (
                <div className="cart__item" key={obj.id}>
                  <img
                    width={80}
                    height={80}
                    src={obj.imageUrl}
                    alt="Sneakers"
                  />
                  <div className="cart__item-text">
                    <p>{obj.title}</p>
                    <b>{obj.price}$</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="remove"
                    width={20}
                    src="img/remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="tax__block">
              <ul>
                <li className="tax__item">
                  <span>Summary :</span>
                  <div></div>
                  <b>{totalPrice} $</b>
                </li>
                <li className="tax__item">
                  <span>Tax 5% :</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} $ </b>
                  {/* <b>Math round({(totalPrice / 100) * 5})</b> */}
                </li>
              </ul>
              <button
                disabled={isLoadingInfo}
                onClick={onClickOrder}
                className="green__btn"
              >
                Checkout
                <img width={20} src="img/right.png" alt="Arrow" />
              </button>
              <button onClick={onClose} className="green__btn back__btn">
                Back <img width={20} src="img/left.png" alt="Back" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order is processed" : "Basket is empty"}
            description={
              isOrderComplete
                ? `Your order #${orderId} is completed, wait for a call from the manager`
                : "Please, add some item"
            }
            image={isOrderComplete ? "img/order.png" : "img/box.png"}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
