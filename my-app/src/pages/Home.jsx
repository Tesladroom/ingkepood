import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SortButtons from "../components/SortButtons";
import CarouselGallery from "../components/CarouselGallery";
import { cartSumService} from "../store/cartSumService";




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
        let totalSum = 0;
        cartProducts.forEach(element => totalSum = totalSum + element.product.price * element.quantity);
        cartSumService.sendCartSUm(totalSum);
    }
        return (
    // näitab toodet esilehel
    <div>
        <CarouselGallery />
        <div className="keskel1">
        <SortButtons homeProducts={products} onSetProducts={setProducts}  />
        </div>
        { isLoading && <div className="spinner-wrapper">
        <div className="lds-hourglass"><div></div><div></div></div>
    </div>}
    

    
        {products.map(element =>
            <div className="keskel">
                <Link to={"/toode/" + element.name.replaceAll(" ", "-").toLowerCase()}>
               <img className="product-img" src={element.imgSrc} alt="" /> 
               <div>{element.name}</div>
               <div>{Number(element.price).toFixed(2)}</div>
               </Link>
               <Button onClick={() => addToCart(element)}>Lisa {element.name} ostukorvi</Button>
               </div> )}
               
               <ToastContainer />
    </div>)
    
    
    }
    export default Home;