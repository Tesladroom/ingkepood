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

    function onSortAZ() {
        products.sort((a,b) => a.name.localeCompare(b.name));
        setProducts(products.slice());
    }

    function onSortZA() {
        products.sort((a,b) => b.name.localeCompare(a.name));
        setProducts(products.slice());
    }

    function onSortPriceAsc() {
       
        products.sort((a,b) =>a.price- b.price);
        setProducts(products.slice());
    }

    function onSortPriceDesc() {
       
        products.sort((a, b)=>b.price-a.price);
        setProducts(products.slice());
    }





    return (
    // näitab toodet esilehel
    <div>
        <button onClick={() => onSortAZ()}>Sorteeri A-Z</button>
        <button onClick={() => onSortZA()}>Sorteeri Z-A</button>
        <button onClick={() => onSortPriceAsc()}>Sorteeri hind kasvavalt</button>
        <button onClick={() => onSortPriceDesc()}>Sorteeri hind kahanevalt</button>
        
        {products.map(element =>
            <div>
               <img className="product-img" src={element.imgSrc} alt="" /> 
               <div>{element.name}</div>
               <div>{element.price}</div>
               <button onClick={() => addToCart(element)}>Lisa {element.name} ostukorvi</button>
               </div> )}
               <ToastContainer />
    </div>)
    
    
    }
    export default Home;