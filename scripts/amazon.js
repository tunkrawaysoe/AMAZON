import {cart,addToCart,saveToLocalStorage,calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './ulti/money.js'; 
const quantity=calculateCartQuantity();
document.querySelector('.js-cart-quantity').innerHTML=quantity;
let productHtml='';

  products.forEach((productItem)=> {

    productHtml += ` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${productItem.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${productItem.name}
          </div>
          
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${productItem.getImageUrl()}">
            <div class="product-rating-count link-primary">
              ${productItem.rating.count}
            </div>
          </div>

         <div class="product-price">
          ${productItem.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class ="js-quantity-selector-${productItem.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${productItem.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart 
          " data-product-id="${productItem.id}" data-product-name="${productItem.name}">
            Add to Cart
          </button>
        </div>`
       


  });



 document.querySelector('.js-products-grid').innerHTML=productHtml;
 

 /*function upDateCart(className){
  let quantity=0;
  cart.forEach((item)=>{
    quantity+=item.quantity;
  });


  document.querySelector('.js-cart-quantity').innerHTML=quantity;
  
 }
*/
  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    
    button.addEventListener('click',()=>{
      
     const productId = button.dataset.productId;
 
     let selectVale=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
     const productName=button.dataset.productName;
     
  
     addToCart(productId,selectVale);
     const quantity=calculateCartQuantity();
     document.querySelector('.js-cart-quantity').innerHTML=quantity; 
     saveToLocalStorage();

    })

  })

 