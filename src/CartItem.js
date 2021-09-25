import React,{useState} from 'react';
import "./CartItems.css";

const CartItem = (props) => {
  const { price, title, qty,discription } = props.product;
  const[showDetails,setShowDetails]=useState(false);
  const {
    product,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onDeleteProduct
  } = props;
  return (
    <div className="cart-item">
      <div className="left-block">
        <img style={styles.image} src={product.img}  onClick={()=>{setShowDetails(!showDetails)}} />

        <div className="title-row">
        <div style={ { fontSize: 25 } }> {title}</div>
        <div style={ { color: '#777' } }>Rs {price}</div>
        <button onClick={()=>{setShowDetails(!showDetails)}}  className="show-button">Show More</button>
        </div>
      </div>


      <div className="right-block">
      {showDetails ? (
        <>
        <div  style={ { color: '#777' } }>Product : {title}</div>
        <div style={ { color: '#777' } }>Size:
        <input type="radio" value="small" name="gender" /> S
        <input type="radio" value="medium" name="gender" /> M
        <input type="radio" value="extra-large" name="gender" /> XL
      </div>
        <div style={ { color: '#777' } }>Discription: {discription} </div>
        <div style={ { color: '#777' } }>Qty: {qty} </div>
        <div className="cart-item-actions">
          {/* Buttons */}
          <img
            alt="increase"
            className="action-icons"
            src="https://image.flaticon.com/icons/svg/992/992651.svg"
            onClick={() => onIncreaseQuantity(product)}
          />
          <img
            alt="decrease"
            className="action-icons"
            src="https://image.flaticon.com/icons/svg/1665/1665612.svg"
            onClick={() => onDecreaseQuantity(product)}
          />
          <img
            alt="delete"
            className="action-icons"
            src="https://image.flaticon.com/icons/svg/1214/1214428.svg"
            onClick={() => onDeleteProduct(product.id)}
          />
        </div>
     </>
      ):""}
      </div>
    </div>
  );
}

const styles = {
  image: {
    height:'60%',
    width: "60%",
    borderRadius: 4,
    background: '#ccc'
  }
}

export default CartItem;