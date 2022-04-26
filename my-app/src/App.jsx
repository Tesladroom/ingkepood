
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import AddProduct from './pages/admin/AddProduct';
import AdminHome from './pages/admin/AdminHome';
import EditProducts from './pages/admin/EditProducts';
import ViewProducts from './pages/admin/ViewProducts';
import Cart from './pages/Cart';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Categories from './pages/admin/Categories';


function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="" exact element={ <Home /> } />
        <Route path="ostukorv" exact element={ <Cart /> } />
        <Route path="toode/:id" exact element={ <SingleProduct />} />
        <Route path="admin" exact element={ <AdminHome />} />
        <Route path="admin/lisa" exact element={ <AddProduct />} />
        <Route path="admin/muuda/:id" exact element={ <EditProducts />} />
        <Route path="admin/tooted" exact element={ <ViewProducts />} />
        <Route path="admin/kategooriad" exact element={ <Categories />} />
      </Routes>

    

    </div>
  );
}

export default App;
