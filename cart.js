// const paybtn=document.querySelector('.btn_buy');
// paybtn.addEventListener('click',()=>{
//     fetch('/stripe-checkout',{
//         method:'post',
//         headers:new Headers({'Content-Type':'application/json'}),
//         body:JSON.stringify({
//             items:JSON.parse(localStorage.getItem('cartitem')),
//         }),
    
//     })
//     .then((res)=>res.json())
//     .then((url)=>{
//         location.href=url;
//     })
//     .catch((err)=>console.log(err));
// });
const paybtn = document.querySelector('.btn_buy');
paybtn.addEventListener('click', () => {
    fetch('/stripe-checkout', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cartitem')),
        }),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
        }
        return res.json();
    })
    .then((url) => {
        location.href = url;
        clearcart();
    })
    .catch((err) => console.error(err));
});
