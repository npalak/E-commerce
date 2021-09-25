import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import { firestore } from 'firebase';
import * as firebase from 'firebase';
import "./CartItems.css";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
    this.db=firebase.firestore();
  }

  componentDidMount() {
    this.db
      .collection('products')
      .onSnapshot((snapshot)=>{
        console.log("queryshot");
    
        snapshot.docs.map((doc)=>{
          console.log(doc.data());
        })
        const products=snapshot.docs.map((doc)=>{
          const data=doc.data();
          data['id']=doc.id;
          return data;
        })
        this.setState({
          products,
          loading:false 
        })
            })

  };
  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);
    const docRef=this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty:products[index].qty+1
    })
    .then(()=>{
      console.log('updated successfully');
    })
    .catch((error)=>{
      console.log('Error',error);
    });
  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }
    const docRef=this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty:products[index].qty-1
    })
    .then(()=>{
      console.log('updated successfully');
    })
    .catch((error)=>{
      console.log('Error',error);
    });
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;
    const docRef=this.db.collection('products').doc(id);
    docRef
    .delete()
    .then(()=>{
      console.log('deleted successfully');
    })
    .catch((error)=>{
      console.log('Error',error);
    });
  }

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    count=products.length;
    console.log("products details :",products.length);
    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
      return '';
    })

    return cartTotal;
  }
  addProduct=()=>{
    this.db
    .collection('products')
    .add({
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHVNHGvtApRyinluTLOmmH9mPJ9eMLahREQ&usqp=CAU',
      qty:'1',
      price:'1000',
      title:'mobile',
      discription:'Samsung Galaxy S21 (128GB ROM, 8GB RAM, SM-G991BZVDINU, Phantom Violet)',
    })
    .then((docRef)=>{
      console.log("product has been added",docRef);
    })
    .catch((error)=>{
      console.log("Error:",error);
    })
  }
  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
      
       
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h5>this is loading.......</h5>}
        {/* <div style={{ padding: 10, fontSize: 20 }}>TOTAL: {this.getCartTotal()} </div> */}
        <div className="product-text">If you want to add more product from here,you need to click on this button.</div>
        <button onClick={this.addProduct}  className="add-product">Add product</button>
      </div>
    );
  }
}

export default App;