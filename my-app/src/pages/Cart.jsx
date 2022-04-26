import { useEffect, useState } from "react";
import cartStyles from "./css/Cart.module.css";
import { Button } from "react-bootstrap";

function Cart() {
  const [cartProducts, setCartProducts] = useState(getCartFromSS());
 

  function getCartFromSS() {
    const products = sessionStorage.getItem("products");
    if (products) {
      return JSON.parse(products);
    } else {
      return [];
    }
  }

  function decreaseQuantity(clickedProduct) {
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts[index].quantity--;
    if (cartProducts[index].quantity === 0) {
      removeFromCart(clickedProduct);
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
  }

  function increaseQuantity(clickedProduct) {
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts[index].quantity++;
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
    // 1. uuendama HTMLi
    // 2. uuendama sessionStorage-t
  }

  function removeFromCart(clickedProduct) {
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts.splice(index,1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
  }

  function totalPrice() {
    let totalSum = 0;
    cartProducts.forEach(element => totalSum = totalSum + element.product.price * element.quantity);
    return totalSum;
  }

  function pay() {
    const data = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": totalPrice(),
      "order_reference": Math.random() * 999999,
      "nonce": "92ddcfab96e34a5f" + new Date() + Math.random() * 999999,
      "timestamp": new Date(),
      "customer_url": "www.neti.ee"
    }


    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff",{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    }).then(response => response.json())
    .then(body => window.location.href = body.payment_link);

  }


  

  return (
    <div>
    {cartProducts.length > 0 && 
    <div>
      <div>Kokku on {cartProducts.length} toodet ostukorvis</div>
    </div>}
    <div>
    {cartProducts.length === 0 && <div>Ostukorv on tühi</div>}
   
      </div>
    { cartProducts.map(element => 
      <div className={cartStyles.cartProduct}>
        <img className={cartStyles.cartProductImg } src={element.product.imgSrc} alt="" />
        <div className={cartStyles.cartProductName}>Toode:{element.product.name}</div>
        <div className={cartStyles.cartProductPrice}>Hind:{element.product.price}€</div>
        <div className={cartStyles.cartProductQuantityControls}>
          <img className={cartStyles.cartProductButton} onClick={() => decreaseQuantity(element)} src="/cart/minus.png" alt="" />
          <div className={cartStyles.cartProductQuantity}>Kogus:{element.quantity}</div>
          <img className={cartStyles.cartProductButton} onClick={() => increaseQuantity(element)} src="/cart/plus.png" alt="" />
        </div>
        <div>{(element.product.price * element.quantity).toFixed(2)} € </div>
        <img className={cartStyles.cartProductButton} onClick={() => removeFromCart(element)} src="/cart/delete.png" alt="" />
      </div>) 
    }
     
    <br />  <br />
    
   
    {cartProducts.length > 0 && <div>
      <div>KOKKU: {totalPrice()} €</div> 
      <Button onClick ={() => pay()}>Maksa</Button>
      </div>}    
      
       
     







  </div>)
}

// camelCase  --- esimene täht on väike, iga järgnev sõna algab suurega 
//                (atribuudid, muutujad ja funktsioonid)
// PascalCase --- iga sõna on suure tähega (klassid   <Home/> --- <ToastContainer/> -- <Link>)
// kebab-case --- iga sõna lahutab sidekriips  (css)
// snake_case --- iga sõna lahutab alumine kriips (failid_asdas.pdf)

export default Cart;