import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setbottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() =>{
fetch('bottles.json')
.then(res =>res.json())
.then(data => setbottles(data))
  }, [])

useEffect(() =>{
  console.log('called the useEffect', bottles.length);
  if (bottles.length> 0) {
    const storedCart = getStoredCart();
    console.log(storedCart, bottles); 
    const saveCart = [];
    for (const id of storedCart) {
      console.log(id);
      const bottle = bottles.find(bottle => bottle.id);
      if (bottle) {
        saveCart.push(bottle)
      }
    } 
    console.log('save cart', saveCart);
    setCart(saveCart);
  }
}, [bottles])


const handleAddToCart = bottle =>{
  const newCart = [...cart, bottle]
  setCart(newCart);
  addToLS(bottle.id);
}

const handleRemoveFromCart = id =>{
  const remainingCart = cart.filter(bottle => bottle.id !== id);
  setCart(remainingCart)
  removeFromLS(id);
}

  return (
    <div>
      <h2>Bottles Here: {bottles.length}</h2>
      <Cart cart ={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
     <div className="bottle-container">
     {
        bottles.map(bottle => <Bottle key={bottle.id}
          handleAddToCart ={handleAddToCart}
           bottle={bottle}></Bottle>)
      }
     </div>
    </div>
  );
};

export default Bottles;