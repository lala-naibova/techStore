import React from 'react'
import productBcg from '../images/productsBcg.jpeg'
import Hero from '../components/Hero'
import Products from '../components/Products/Products'

export default function ProductsPage() {
    return (
        <>
            <Hero img={productBcg}/>
            <Products/>
        </>
    )
}
