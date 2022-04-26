import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function ViewProducts() {
 
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
        return (
       
        <div>
       
            
            {products.map(element =>
                <div>
                   <img src={element.imgSrc} alt="" /> 
                   <div>{element.name}</div>
                   <div>{element.price} €</div>
                   <div>{element.description}</div>
                   <div>{element.category}</div>
                   <div>{element.isActive}</div>
                   <div>{element.stock}</div>
                   <Link to={"/admin/muuda/" + element.id}>
                       <Button>MUUDA</Button>
                   </Link>
                   </div> )}
        </div>)
        }
    export default ViewProducts;