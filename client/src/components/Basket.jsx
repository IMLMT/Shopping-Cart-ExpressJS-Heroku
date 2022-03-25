import React from 'react'
import coupons1 from '../coupons.json';

export default function Basket(props) {
    const { cartItems, onAdd, onRemove, coupon } = props
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0)
    const taxPrice = cartItems.filter((record) => record.isTaxable === true).reduce((a, c) => a + c.price * c.qty * 0.0825, 0)
    const couponsFiltered=[]
    cartItems.forEach((record) => {coupons1.forEach(cou=>{if(record.sku===cou.appliedSku) couponsFiltered.push(Object.assign( {}, cou, record ))})})
    const couponPrice = couponsFiltered.reduce((a,c)=> a+c.discountPrice* c.qty,0)

    console.log(coupon)
    console.log(cartItems)
    console.log(couponsFiltered)
    console.log(couponPrice)

    const totalPrice = itemsPrice + taxPrice - couponPrice
    return (<aside className='block col-1'>
        <h2>Cart Items</h2>
        <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div>
        {cartItems.map((item) => (
            <div key={item.id} className='row'>
                <div className='col-2'>{item.name}</div>
                <div className='col-2'>
                    <button onClick={() => onAdd(item)} className='add'>+</button>
                    <button onClick={() => onRemove(item)} className='remove'>-</button>
                </div>
                <div className='col-2 test-right'>
                    {item.qty} x ${item.price.toFixed(2)}
                </div>
            </div>
        ))}
        {cartItems.length !== 0 && (
            <>
                <hr></hr>
                <div className='row'>
                    <div className='col-2'>Items Price:</div>
                    <div className='col-1'>${itemsPrice.toFixed(2)}</div>
                </div>
                <div className='row'>
                    <div className='col-2'>Coupon discounts:</div>
                    <div className='col-1'>${couponPrice.toFixed(2)}        (-)</div>
                </div>
                <div className='row'>
                    <div className='col-2'>Tax Price (8.25%):</div>
                    <div className='col-1'>${taxPrice.toFixed(2)}       (+)</div>
                </div>
                <div className='row'>
                    <div className='col-2'><strong>Total Price:</strong></div>
                    <div className='col-1'><strong>${totalPrice.toFixed(2)}</strong></div>
                </div>
            </>
        )}
    </aside>
    )
}