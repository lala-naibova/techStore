import React from 'react'
import Cart from '../components/Cart'
import Hero from '../components/Hero'
import CartBcg from '../images/storeBcg.jpeg'
export default function CartPage() {
    return (
        <>
        <Hero img={CartBcg}/>
            <Cart/>
        </>
    )
}
