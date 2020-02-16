import React, { Component } from 'react'
import {ProductConsumer} from '../../context'
import Product from '../Product'
import Title from '../Title'
import {Link} from 'react-router-dom'

export default class Featured extends Component {
    
    render() {
        return (
            <section className='py-5'>
                <div className='container'>
                {/** title*/}
                <Title title='featured products' center/>
                </div>
                {/** title*/}
                <div className='row'>
            <ProductConsumer>
                {value=>{
                    const {featuredProducts} = value
                    return featuredProducts.map(product=>(
                        <Product key={product.id} product={product}/>
                    ))
                }}
            </ProductConsumer>
            </div>
            <div className='row mt-5'>
            <div className='col text-center'>
                <Link to='/products' className='main-link'>our products</Link>
            </div>
            </div>
            
            </section>
        )
    }
}
