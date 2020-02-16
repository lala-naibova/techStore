import React from 'react'
import Title from '../Title'
import CartList from './CartList'
import CartColumns from './CartColumns'
import CartTotals from './CartTotals'

export default function Cart() {
    return (
        <section className='py-5'>
            <div className='container'>
                <Title title='your cart items' center></Title>
            </div>
            
                <CartColumns/>
                <CartList/>
                <CartTotals/>
            
        </section>
    )
}
