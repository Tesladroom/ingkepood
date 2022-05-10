import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function ViewProducts() {
 
        const [products, setProducts] = useState([]);
        const url = "https://chikar-20c2b-default-rtdb.europe-west1.firebasedatabase.app/products.json"
        const searchRef = useRef();
        const [originalProducts, setOriginalProducts] = useState([]);





        useEffect(() => {
            fetch(url).then(respone => respone.json())
            .then(responseBody => {
                const productsFromDB = [];
                for (const key in responseBody) {
                    productsFromDB.push(responseBody[key]);
                }
                setProducts(productsFromDB);
                console.log(productsFromDB);
                setOriginalProducts(productsFromDB);
            })
        },[]);


        function deleteItem (product) {
            const rowNumber = originalProducts.indexOf(product);
            originalProducts.splice(rowNumber,1);
            setProducts(originalProducts.slice());
             // localStorage.setItem("tooted", JSON.stringify(tooted));
             fetch(url,
             {
               method: "PUT",
               body: JSON.stringify(originalProducts),
               headers: {
                 "content-type": "application/json"
               }} )}

             

                function searchProducts() {
                console.log(searchRef.current.value);

                const searchedProduct = searchRef.current.value.toLowerCase();
                const productsFound = originalProducts.filter(element => 
                  element.name.toLowerCase().indexOf(searchedProduct) >= 0 || 
                    element.id.toString().indexOf(searchedProduct) >= 0 );
                setProducts(productsFound);
              }
  return (
  <div>
    <input ref={searchRef} onChange={() => searchProducts()} type="text" />
    {products.map(element =>

                <div>
                   <img src={element.imgSrc} alt="" /> 
                   <div>ID:{element.id}</div>
                   <div>Nimi:{element.name}</div>
                   <div>Hind:{element.price} €</div>
                   <div>Info:{element.description}</div>
                   <div>Kategooria:{element.category}</div>
                   <div>{element.isActive}</div>
                   <div>{element.stock}</div>
                   <Button onClick={() => deleteItem(element)}>Kustuta</Button>
                   <Link to={"/admin/muuda/" + element.id}>
                       <Button>MUUDA</Button>
                   </Link>
                   </div> )}
        </div>)
        }
    export default ViewProducts;