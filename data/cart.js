export const cart = [];

export function addToCart(productId,selectValue){
    let matchingItem;
    cart.forEach((item)=>{
    if(productId===item.productId){
        
        matchingItem=item;
  
      }
    });
  
    if(matchingItem){
      matchingItem.quantity+=selectValue||1;
    }else{
    cart.push({
        productId:productId,
        quantity:selectValue
      });
  
  }
  
   }
