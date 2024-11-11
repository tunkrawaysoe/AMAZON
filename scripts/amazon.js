const products = [

    
   
    {
      id: "d339adf3-e004-4c20-a120-40e8874c66cb",
      image: "images/products/double-elongated-twist-french-wire-earrings.webp",
      name: "Double Oval Twist French Wire Earrings - Gold",
      rating: {
        stars: 4.5,
        count: 117
      },
      priceCents: 2400,
      keywords: [
        "accessories",
        "womens"
      ]
    },
    {
      id: "d37a651a-d501-483b-aae6-a9659b0757a0",
      image: "images/products/round-airtight-food-storage-containers.jpg",
      name: "Round Airtight Food Storage Containers - 5 Piece",
      rating: {
        stars: 4,
        count: 126
      },
      priceCents: 2899,
      keywords: [
        "boxes",
        "food containers",
        "kitchen"
      ]
    },
    {
      id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
      image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
      name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
      rating: {
        stars: 4.5,
        count: 1211
      },
      priceCents: 2250,
      keywords: [
        "coffeemakers",
        "kitchen",
        "appliances"
      ]
    },
    {
      id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
      image: "images/products/blackout-curtains-black.jpg",
      name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
      rating: {
        stars: 4.5,
        count: 363
      },
      priceCents: 3099,
      keywords: [
        "bedroom",
        "home"
      ]
    },
  
    
  ];
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
              src="images/ratings/rating-${productItem.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${productItem.rating.count}
            </div>
          </div>




         

          <div class="product-price">
            $${productItem.priceCents / 100}
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
 
  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    
    button.addEventListener('click',()=>{
      
     const productId = button.dataset.productId;
     console.log(productId)
     let selectVale=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
     console.log(selectVale);  
     const productName=button.dataset.productName;
        
            let matchingItem;
                cart.forEach((item)=>{
                if(productName===item.productName){
                    
                    matchingItem=item;

                  }
                });
                
                
                if(matchingItem){
                  matchingItem.quantity+=1;
                }else{
                cart.push({
                    productName:productName,
                    quantity:selectVale
                  });

      }
      console.log(cart)
 
    })

  })

 