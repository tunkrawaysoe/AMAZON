import { cart,removeFromCart,saveToLocalStorage,calculateCartQuantity,updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../ulti/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions } from "../../data/deliveryOptions.js"
const today =dayjs();

const quantity=calculateCartQuantity();
document.querySelector('.js-return-to-home-link').innerHTML=`${quantity} items `;


export function renderCheckoutPage(){
let checkOutHtml;
cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>{
        if(productId===product.id){
            matchingProduct=product;

        };

    });
    const deliveyOptionId=cartItem.deliveryOptionsId;
    let deliveryOption;

    deliveryOptions.forEach((option)=>{
      if(option.id===deliveyOptionId){
        deliveryOption=option;
      }
      

    });
   
    const today=dayjs();
    const deliveryDate= today.add(deliveryOption.deliveryDays,'days');
    const dateString= deliveryDate.format('dddd, MMMM D');


    
   
    checkOutHtml+=`
    <div class="cart-item-container cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
        ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
            Update 
          </span>
          <input class="quantity-input">
          <span class="save-quantity-link">Save</span>
          <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        
        
        ${deliveryOptionsHtml(matchingProduct,cartItem)}
      </div>
    </div>
  </div>`

});

function deliveryOptionsHtml(matchingProduct,cartItem){
  let deliveryHtml='';
  deliveryOptions.forEach((deliveryOption)=>{
    const today=dayjs();
    const deliveryDate= today.add(deliveryOption.deliveryDays,'days');
    const dateString= deliveryDate.format('dddd, MMMM D');
    const priceString=deliveryOption.id===0
    ? 'FREE'
    : `$${formatCurrency(deliveryOption.priceCents)}-`;


     const isChecked=deliveryOption.id===cartItem.deliveryOptionsId;
    deliveryHtml+=` <div class="delivery-option js-delivery-option" data-product-id='${matchingProduct.id}' data-delivery-option-id='${deliveryOption.id}'>
          <input type="radio"
            class="delivery-option-input"
            ${isChecked ? 'checked' : '' }
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
             ${priceString}Shipping
            </div>
          </div>
        </div>`


  });
  return deliveryHtml;

}

document.querySelector('.js-order-summary').innerHTML = checkOutHtml;
document.querySelectorAll('.js-delete-quantity').forEach((deleteElement)=>{
  deleteElement.addEventListener('click',()=>{
   const productId= deleteElement.dataset.productId
   console.log(productId);
   removeFromCart(productId);
   const quantity=calculateCartQuantity();
   document.querySelector('.js-return-to-home-link').innerHTML=`${quantity} items `;

   saveToLocalStorage();

   



   const container=document.querySelector(`.cart-item-container-${productId}`);
   container.remove();

  })
})

document.querySelectorAll('.js-update-quantity').forEach((updateLink)=>{
   updateLink.addEventListener('click',()=>{
    
    const productId =updateLink.dataset.productId;
    updateLink.classList.add("what")
    


   })
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=element.dataset;
    updateDeliveryOption(productId,deliveryOptionId)
    saveToLocalStorage();
    renderCheckoutPage();
    
  })
})
   
}
renderCheckoutPage();