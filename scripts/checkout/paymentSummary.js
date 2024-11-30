import { cart } from "../../data/cart.js";
import { getDeliveyOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../ulti/money.js";
import { products,getProduct } from "../../data/products.js";
import { renderCheckoutPage } from "./orderSummary.js";
export function renderPaymentSummary() {
    let productPriceCents=0;
    let shippingPrices=0;
    
    cart.forEach((cartItem)=>{
       
       const product=getProduct(cartItem.productId);
       productPriceCents+=product.priceCents * cartItem.  quantity;
       const deliveryOption = getDeliveyOption(cartItem.deliveryOptionsId)
       shippingPrices+=deliveryOption.priceCents
  
       
 })
 const totalprice=productPriceCents+shippingPrices;
 const taxCents= totalprice * 0.1;
 const totalCent= totalprice+taxCents;

 let Html=`
        <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (3):</div>
                    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">
                    $${formatCurrency(shippingPrices)}
                    </div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalprice)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalCent)}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>
                </div>`

                document.querySelector('.js-payment-summary').innerHTML= Html;
                

                
}