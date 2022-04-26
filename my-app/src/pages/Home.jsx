import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "react-bootstrap";


function Home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const url = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app/products.json"

    useEffect(() => {
        setIsLoading(true);
        fetch(url).then(respone => respone.json())
        .then(responseBody => {
            const productsFromDB = [];
            for (const key in responseBody) {
                productsFromDB.push(responseBody[key]);
            }
            setProducts(productsFromDB);
            setIsLoading(false);
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
        
        <Button onClick={() => onSortAZ()}>Sorteeri A-Z</Button>
        <Button onClick={() => onSortZA()}>Sorteeri Z-A</Button>
        <Button onClick={() => onSortPriceAsc()}>Sorteeri hind kasvavalt</Button>
        <Button onClick={() => onSortPriceDesc()}>Sorteeri hind kahanevalt</Button><br />
        { isLoading && <div className="spinner-wrapper">
        <div className="lds-hourglass"><div></div><div></div></div>
    </div>}
        {products.map(element =>
            <div class="grid">
               <img className="product-img" src={element.imgSrc} alt="" /> 
               <div>{element.name}</div>
               <div>{Number(element.price).toFixed(2)}</div>
               <Button onClick={() => addToCart(element)}>Lisa {element.name} ostukorvi</Button>
               </div> )}
               
               <ToastContainer />
    </div>)
    
    
    }
    export default Home;