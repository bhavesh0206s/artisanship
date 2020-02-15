import React, { createContext, useEffect, useState } from 'react';
import fire, { fireDb } from '../firebase';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [productInfo, setProductInfo] = useState([]);
  const [input, setInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [productNameForCart, setProductNameForCart] = useState([]);
  const [priceOfItem, setPriceOfItem] = useState([]);
  const [imageUrlCheckout, setImageUrlCheckout] = useState([])
  const [buyNowData, setBuyNowData] = useState([]);
  const [isOrderClicked, setOrderClicked] = useState(false);
 
  const updateProductList = () => {
    let productRef = fireDb.collection('public-product-info');
    productRef.onSnapshot(snap => {
      const productData = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProductInfo(productData);
      },error => console.log("Error getting document:", error));
  }

  const searchInput = (e)=>{
    let inputValue =  e.target.value.toLowerCase();
    setInput(inputValue)
    let searchedProduct = productInfo.filter((info) => {
      let trimProductName = info.product_name.toLowerCase().split('').join('');
      for(let j = 0; j<trimProductName.length; j++){
        if(inputValue === trimProductName.slice(j, inputValue.length+j)){
          return true
        }
      }
    })
    setSearchResult(searchedProduct)
  }

  const deleteItem = (e) =>{
    let target = e.target.value
    let productNameForCartNew = productNameForCart.filter((item)=> item !== productNameForCart[target])
    let priceOfItemNew = priceOfItem.filter((item)=> item !== priceOfItem[target])
    setPriceOfItem(priceOfItemNew)
    setProductNameForCart(productNameForCartNew)
  }

  const buyNowClicked = (productName,pricePerItem,imageUrl,productDetails) => {
    let userid =  fire.auth().currentUser.uid;
    let fieldData = {
      productName: productName,
      pricePerItem: pricePerItem,
      imageUrl: imageUrl,
      productDetails: productDetails
    }
    
    let buyProductRef = fireDb.collection('user').doc(`${userid}`);
    buyProductRef.collection('buy-now').doc('product-data').set(fieldData)
    .catch((e)=> console.log(e))    
  }

  const getBuyNowData = async (userid) => {
    let productRef = fireDb.collection('user').doc(`${userid}`).collection('buy-now').doc('product-data');
    productRef.get().then(snap => {
      const productData = snap.data()
      setBuyNowData([productData])
      },error => console.log("Error getting document:", error));
  }

  useEffect(()=>{
    updateProductList();
  },[]);

  return (
    <ProductContext.Provider 
      value={{
        getBuyNowData,
        isOrderClicked, 
        setOrderClicked, 
        buyNowClicked, 
        buyNowData, 
        input, 
        searchInput, 
        deleteItem,
        productInfo, 
        searchResult,
        productNameForCart, 
        setProductNameForCart,
        priceOfItem, 
        setPriceOfItem,
        imageUrlCheckout,
        setImageUrlCheckout
      }}>
      {props.children}
    </ProductContext.Provider>
  );
}
 
export default ProductContextProvider;