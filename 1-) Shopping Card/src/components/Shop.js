import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { Loader } from "./Loader";
import { GoodList } from "./GoodList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import {toast} from "react-toastify";

function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false)

  const addToBasket = (item) => {
    const itemIndex = order.findIndex(
      (orderItem) => orderItem.id === item.id
    );

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });

      setOrder(newOrder);
    }

    toast.success('Goods added to basket successfully!')
  };
  const handleBasketShow = () => {
    setBasketShow(!isBasketShow)
  }
  const removeFromBasket = (itemID) => {
    const newOrder = order.filter(item => item.id !== itemID)
    setOrder(newOrder)
    toast.error('Goods deleted from basket successfully!')
  }
  const incrementQuantity = (itemID) => {
    const newOrder = order.map(el => {
      if (el.id === itemID) {
        const newQuantity = el.quantity + 1
        return {
          ...el,
          quantity: newQuantity
        }
      } else{
        return el
      }
    })

    setOrder(newOrder)
  }
  const decrementQuantity = (itemID) => {
    const newOrder = order.map(el => {
      if (el.id === itemID) {
        const newQuantity = el.quantity - 1
        return {
          ...el,
          quantity: newQuantity >= 0 ? newQuantity : 0
        }
      } else{
        return el
      }
    })

    setOrder(newOrder)
  }

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? <Loader /> : <GoodList goods={goods} addToBasket={addToBasket} />}
      {isBasketShow && <BasketList
        order={order}
        handleBasketShow={handleBasketShow}
        removeFromBasket={removeFromBasket}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />}
    </div>
  );
}

export { Shop };
