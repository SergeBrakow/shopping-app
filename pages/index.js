import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const products = [
    {
      id: "ps5-1",
      name: "Playstation 5",
      price: 499,
    },
    {
      id: "ps5-2",
      name: "PS5 Controller",
      price: 69,
    },
    { id: "ps5-3", name: "60 TV Fernsehen", price: 899 },
  ];
  const [lists, setLists] = useState([]);

  function addToList(item) {
    if (lists.some((list) => list.id === item.id)) {
      changeAmount(item, 1);
    } else {
      setLists([{ ...item, amount: 1 }, ...lists]);
    }
  }

  function changeAmount(item, num) {
    let number = parseInt(num);
    if (item.amount + number === 0) {
      deleteProduct(item);
    } else {
      setLists(
        lists.map((listItem) => {
          if (listItem.id === item.id) {
            let newAmount = listItem.amount + number;
            return { ...listItem, amount: newAmount };
          } else {
            return listItem;
          }
        })
      );
    }
  }

  function deleteProduct(item) {
    setLists(lists.filter((product) => product.id !== item.id));
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>Shopping</h1>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}€</p>
            <button key={product.id} onClick={() => addToList(product)}>
              add to card
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2>Warenkorb</h2>
        {lists.map((element) => (
          <div key={element.id}>
            <p>{element.name}</p>
            {element.price}
            <button onClick={() => changeAmount(element, -1)}>-</button>
            <span>{element.amount}</span>
            <button onClick={() => changeAmount(element, 1)}>+</button>
            <button onClick={() => deleteProduct(element)}>x</button>
          </div>
        ))}
        <p>
          Summe:
          {lists.length > 0 &&
            lists.reduce(
              (previous, current) => previous + +current.amount * current.price,
              0
            )}
          €
        </p>
      </div>
    </div>
  );
}
