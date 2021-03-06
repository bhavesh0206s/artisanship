import React from 'react';
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'
import Navbar from './components/navbar/Navabar';
import Home from './components/home/Home';
import About from './components/about/About';
import Notfound from './Notfound'
import ProductList from './components/product/ProductList';
import Signup from './components/signup/Signup';
import Signin from './components/signIn/Signin';
import SellHere from './components/sell-here/SellHere';
import PrivateRoute from './components/PrivateRoute';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import YourProductList from './components/yourProduct/YourProductList';
import SellHereContextProvider from './context/SellHereContext';
import YourProductContextProvider from './context/YourProductContext';
import ProductContextProvider from './context/ProductContext';
import './App.css'
import Checkout from './components/checkout/Checkout';
import Free from './components/free/Free';

const App = (props)=>{
  const {currentUser, getUid} = useContext(AuthContext);

  return(
    <Router>
        <Navbar/>
        <SellHereContextProvider>
          <ProductContextProvider>
          <YourProductContextProvider>
           {currentUser ? (
            <div id="home-shop-cart">
                <ShoppingCart/>
            </div>
            ): null}
              <Switch>
                  <Route path={!(currentUser) ? '/' : `/${getUid()}`} exact component = {Home}/>
                  <Route path="/signin" component={Signin}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/products" component={ProductList}/>
                  <Route path="/about" component={About}/>
                  <PrivateRoute path={`/sell/${getUid()}`} component={SellHere}/>
                  <PrivateRoute path={`/your-product/${getUid()}`} component={YourProductList}/>
                  <PrivateRoute path={`/checkout/${getUid()}`} component={Checkout}/>
                  <PrivateRoute path={`/free/${getUid()}`} component={Free}/>
                  <Route component={Notfound} />
              </Switch>
            </YourProductContextProvider>
          </ProductContextProvider>
        </SellHereContextProvider>
    </Router>
  )
}

export default App;

