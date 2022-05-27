import React from "react";

import AppContext from "../context";

function Info({ title, description, image }) {
  const { setCardOpened } = React.useContext(AppContext);

  return (
    <div className="empty__basket">
      <img width={100} height={100} src={image} alt="Empty Box" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button
        onClick={() => setCardOpened(false)}
        className="green__btn back__btn"
      >
        Back <img width={20} src="img/left.png" alt="Back" />
      </button>
    </div>
  );
}

export default Info;
