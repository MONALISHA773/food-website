import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';

// load variables
dotenv.config();

// server start

const app=express();
app.use(express.static('public'));
app.use(express.json());


// home route
app.get("/", (req,res) => {
    res.sendFile("index.html",{root:"public"});

})
// success
app.get('/success', (req,res) => {
    res.sendFile("success.html",{root:"public"});

})
// cancel
app.get('/cancel', (req,res) => {
    res.sendFile("cancel.html",{root:"public"});

})

// stripe
let stripegateway=Stripe(process.env.stripe_api);
let DOMAIN=process.env.DOMAIN;
app.post('/stripe-checkout',async(req,res)=>{
    const currency='inr';
    const lineitems=req.body.items.map((item)=>{
        const unitamount=parseInt(item.price.replace(/[^0-9.-]+/g,"")*100);
        console.log("item-price:",item.price);
        console.log("unitamount:",unitamount);
        return{
            price_data:{
                currency:currency,
                product_data:{
                    name:item.title,
                    images:[item.productimg],
                },
                unit_amount:unitamount,
            },
            quantity:item.quantity,

        };
    });
    console.log("lineitems:",lineitems);

    


    // create checkout session
    const session=await stripegateway.checkout.sessions.create({
        payment_method_types:['card'],
        mode:'payment',
        success_url:`${DOMAIN}/success`,
        cancel_url:`${DOMAIN}/cancel`,
        line_items:lineitems,

        // asking addresss in stripe checkout page
        billing_address_collection:"required",
    });
    res.json(session.url);
});

app.listen(3000, '0.0.0.0', () => {
    console.log('listening on port 3000');
});
