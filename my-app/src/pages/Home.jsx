import { useEffect, useState } from "react";

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




    return (<div>Home</div>)
    
    
    }
    export default Home;