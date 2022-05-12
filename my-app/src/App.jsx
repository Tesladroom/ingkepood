
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
import Shops from './pages/Map';
import CarouselGalery from './pages/admin/CarouselPic';
import NotFound from './pages/NotFound';
import SignUp from './pages/admin/SignUp';
import SignIn from './pages/admin/SignIn';


function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" exact element={ <Home /> } />
        <Route path="/poed" exact element={ <Shops /> } />
        <Route path="/ostukorv" exact element={ <Cart /> } />
        <Route path="/toode/:productId" exact element={ <SingleProduct />} />
        <Route path="/admin" exact element={ <AdminHome />} />
        <Route path="/admin/lisa" exact element={ <AddProduct />} />
        <Route path="/admin/muuda/:id" exact element={ <EditProducts />} />
        <Route path="/admin/logi-sisse" exact element={ <SignIn />} />
        <Route path="/admin/tooted" exact element={ <ViewProducts />} />
        <Route path="/admin/kategooriad" exact element={ <Categories />} />
        <Route path="/admin/karusellgalerii" exact element={ <CarouselGalery />} />
        <Route path="/admin/lisa-kasutaja" exact element={ <SignUp />} />
        <Route path="*" exact element={ <NotFound />} />
      </Routes>

    

    </div>
  );
}

export default App;
