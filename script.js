//cart open close
let carticon=document.querySelector("#cart_icon");
let cart=document.querySelector(".cart");
let closecart=document.querySelector("#close-cart");
//open cart
carticon.onclick=()=>{
    cart.classList.add("active");

};
// closecart
closecart.onclick=()=>{
    cart.classList.remove("active");
};
// making add to cart
// cart working js
if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",ready);

}
else{
    ready();
}

// making function
function ready(){
    // remove item from cart
    var removecartbutton=document.getElementsByClassName("cart-remove");
    for(var i=0;i<removecartbutton.length;i++){
        var button=removecartbutton[i];
        button.addEventListener('click',removecartitem);
    }
    // quantity change
    var quantityinput=document.getElementsByClassName("cart-quantity");
    for(var i=0;i<quantityinput.length;i++){
        var input=quantityinput[i];
        input.addEventListener("change",quantitychanged);
    }
    // add to cart
    var addcart=document.getElementsByClassName("add-cart");
    for(var i=0;i<addcart.length;i++){
        var button=addcart[i];
        button.addEventListener("click",addcartclicked);
    }
    loadcartitem();


}
// remove cart item
function removecartitem(event){
    var buttonclicked= event.target;
    buttonclicked.parentElement.remove();
    updatetotal();
    savecartitems();

}
// quantity change
function quantitychanged(event){
    var input=event.target;
    if(isNaN(input.value)||input.value<=0){
        input.value=1;
    }
   
    updatetotal();
    savecartitems();
    updatecarticon();
}
// add cart function
function addcartclicked(event){
    var button=event.target;
    var shopproduct= button.parentElement;
    var title=shopproduct.getElementsByClassName('product-title')[0].innerText;
    var price=shopproduct.getElementsByClassName('price')[0].innerText;
    var productimg=shopproduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productimg);
    updatetotal();
    savecartitems();
    updatecarticon();


}
function     addProductToCart(title,price,productimg){
    var cartshopbox=document.createElement("div");
    cartshopbox.classList.add('cart-box');
    var cartitem=document.getElementsByClassName('cart_content')[0];
    var cartitemsnames=cartitem.getElementsByClassName('cart-product-title');
    for(var i=0;i<cartitemsnames.length;i++){
        if(cartitemsnames[i].innerText==title){
            alert("You have already added  this item to cart");
            return;
        }
    }
    var cartboxcontent=  `  <img src="${productimg}" class="cart-img" />
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input
        type="number"
        name=""
        id=""
        value="1"
        class="cart-quantity"
      />
      
       </div>
       <!-- Remove Item -->
       <i class="fa fa-trash cart-remove" aria-hidden="true" ></i>`;
    cartshopbox.innerHTML=cartboxcontent;
    cartitem.append(cartshopbox);
    cartshopbox.getElementsByClassName('cart-remove')[0]
    .addEventListener('click',removecartitem);
    cartshopbox.getElementsByClassName('cart-quantity')[0]
    .addEventListener('change',quantitychanged);
    savecartitems();
    updatecarticon();


}
// update total
function updatetotal(){
    var cartcontent=document.getElementsByClassName('cart_content')[0];
    var cartboxes= cartcontent.getElementsByClassName("cart-box");
    var total=0;
    for(var i=0;i<cartboxes.length;i++){
        var cartbox= cartboxes[i];
        var priceelement=cartbox.getElementsByClassName('cart-price')[0];
        var quantityelement=cartbox.getElementsByClassName('cart-quantity')[0];
        var price= parseFloat(priceelement.innerText.replace('Rs',''))
        var quantity=parseFloat(quantityelement.value);
       
        total+=price*quantity;
       
 }
//  if price contain some paisa
total=Math.round(total*100)/100;
 document.getElementsByClassName('total_price')[0].innerText='Rs'+" "+total;

//  save total to localstorage
localStorage.setItem("carttotal",total);
}
// keep item in cart when page refesh with localstorage

function savecartitems(){
    var cartcontent= document.getElementsByClassName('cart_content')[0];
    var cartboxes=cartcontent.getElementsByClassName('cart-box');
   
    var cartitem=[];
    for(var i=0;i<cartboxes.length;i++){
        cartbox=cartboxes[i];
        var titleelement=cartbox.getElementsByClassName('cart-product-title')[0];
        var priceelement=cartbox.getElementsByClassName('cart-price')[0];
        var quantityelement=cartbox.getElementsByClassName('cart-quantity')[0];
        var productimg=cartbox.getElementsByClassName('cart-img')[0].src;
        var item={
            title:titleelement.innerText,
            price:priceelement.innerText,
            quantity:quantityelement.value,
            productimg:productimg,

        };
        cartitem.push(item);

    }
    localStorage.setItem('cartitem',JSON.stringify(cartitem));

}
// loads in cart
function loadcartitem(){
    var cartitem=localStorage.getItem('cartitem');
    if(cartitem){
        cartitem=JSON.parse(cartitem);
        for(var i=0;i<cartitem.length;i++){
            var item=cartitem[i];
            addProductToCart(item.title,item.price,item.productimg);

            var cartboxes=document.getElementsByClassName("cart-box");
            var cartbox=cartboxes[cartboxes.length-1];
            var quantityelement=cartbox.getElementsByClassName("cart-quantity")[0];;
            quantityelement.value=item.quantity;
        }
    }
    var carttotal=localStorage.getItem('carttotal');
    if(carttotal){
        document.getElementsByClassName("total_price")[0].innerText="Rs"+carttotal;
    }
    updatecarticon();
}

// quantity in cart icon
function updatecarticon(){
    var cartboxes=document.getElementsByClassName('cart-box');
    var quantity=0;
    for(var i=0;i<cartboxes.length;i++){
        var cartbox=cartboxes[i];
        var quantityelement=cartbox.getElementsByClassName('cart-quantity')[0];
        quantity+=parseInt(quantityelement.value);
    }
    var carticon=document.querySelector('#cart_icon');
    carticon.setAttribute("data-quantity",quantity);
}
// clear cart item
function clearcart(){
    var cartcontent=document.getElementsByClassName('cart_content')[0];
    cartcontent.innerHTML='';
    updatetotal();
    localStorage.removeItem("cartitem");
}
