import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./components/pages/Home.jsx";
import Favorites from "./components/pages/Favorites";

import AppContext from "./context";
import Orders from "./components/pages/Orders";
import Slider from "./components/Slider";

function App() {
  const [items, setItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cardItems, setCardItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cardOpened, setCardOpened] = React.useState(false);
  const [isPageLoading, setIsPageLoading] = React.useState(true);

  // React.useEffect(() => {
  //   fetch("https://628112b11020d852058523c6.mockapi.io/items")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((json) => {
  //       setItems(json);
  //     });
  // }, []);

  // console.log(JSON.stringify(cardItems));

  React.useEffect(() => {
    async function fetchData() {
      setIsPageLoading(true);
      const itemsResponse = await axios.get(
        "https://628112b11020d852058523c6.mockapi.io/items"
      );
      const cardResponse = await axios.get(
        "https://628112b11020d852058523c6.mockapi.io/card"
      );
      const favoritesResponse = await axios.get(
        "https://628112b11020d852058523c6.mockapi.io/favorite"
      );
      setIsPageLoading(false);
      setItems(itemsResponse.data);
      setCardItems(cardResponse.data);
      setFavorites(favoritesResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cardItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCardItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://628112b11020d852058523c6.mockapi.io/card/${findItem.id}`
        );
      } else {
        setCardItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://628112b11020d852058523c6.mockapi.io/card",
          obj
        );
        setCardItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
        // setCardItems([...cardItems, obj]);
      }
    } catch (error) {
      alert("Error");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://628112b11020d852058523c6.mockapi.io/card/${id}`);
    setCardItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onChangeSearchInput = (event) => {
    // console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const onAddtoFavorite = async (obj) => {
    if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
      axios.delete(
        `https://628112b11020d852058523c6.mockapi.io/favorite/${obj.id}`
      );
      setFavorites((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      const { data } = await axios.post(
        "https://628112b11020d852058523c6.mockapi.io/favorite",
        obj
      );
      setFavorites((prev) => [...prev, data]);
    }
  };

  const isAddedItems = (id) => {
    return cardItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cardItems,
        favorites,
        setCardItems,
        isAddedItems,
        onAddtoFavorite,
        onAddToCart,
        setCardOpened,
      }}
    >
      <div className="wrapper">
        {cardOpened ? (
          <Drawer
            items={cardItems}
            onRemove={onRemoveItem}
            onClose={() => setCardOpened(false)}
          />
        ) : null}
        <Header onClickCard={() => setCardOpened(true)} />
        <Slider />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cardItems={cardItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddtoFavorite={onAddtoFavorite}
                isPageLoading={isPageLoading}
              />
            }
          />
          <Route path="/favorites" exact element={<Favorites />} />
          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
