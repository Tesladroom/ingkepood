import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function Home() {
    const [products, setProducts] = useState([]);
    const url = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app/products.json"

    useEffect(() => {
        fetch(url).then(respone => respone.json())
        .then(responseBody => {
            const productsFromDB = [];
            for (const key in responseBody) {
                productsFromDB.push(responseBody[key]);
            }
            setProducts(productsFromDB);
            console.log(productsFromDB);
        })
    },[]);

    function addToCart(clickedProduct) {
        let cartProducts = sessionStorage.getItem("products");
        if (cartProducts !== null) {
            cartProducts = JSON.parse(cartProducts);
        } else {
            cartProducts = [];
        }
        const index = cartProducts.findIndex(element => element.product.id === clickedProduct.id);
        if (index >= 0) {
            cartProducts[index].quantity++;
        } else {
        cartProducts.push({product: clickedProduct, quantity: 1});
        }
        sessionStorage.setItem("products", JSON.stringify(cartProducts));
        toast.success("Toode lisatud ostukorvi!", {
            position: "bottom-right",
            theme: "dark"
        });
    }




    return (
    // näitab toodet esilehel
    <div>
        {products.map(element =>
            <div>
               <img src={element.imgSrc} alt="" /> 
               <div>{element.name}</div>
               <div>{element.price}</div>
               <button onClick={() => addToCart(element)}>Lisa {element.name} ostukorvi</button>
               </div> )}
               <ToastContainer />
    </div>)
    
    
    }
    export default Home;