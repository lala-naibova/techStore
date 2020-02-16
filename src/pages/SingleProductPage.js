import React from 'react'
import {Link} from 'react-router-dom'
import Hero from '../components/Hero'
import pic from '../images/singleProductBcg.jpeg'
import {ProductConsumer} from '../context'

export default function SingleProductPage() {
    return (
        <>
            <Hero img={pic} title='single product'/>
            <ProductConsumer>
                {value=>{
                    const {singleProduct, addToCart, loading}=value;
                    if(loading){
                           return <h1>product loading...</h1>
                    }
                    console.log(singleProduct);
                    const{company, image, title, price, description, id} = singleProduct;
                    return <section className='py-5'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-10 mx-auto col-sm-8 col-md-6 my-3'>
                                    <img src={image}  
                                    //<img src={`../${image}`} 
                                    //via contentfull we ll use src={image}
                                    alt='img' className='img-fluid'/>
                                    </div>
                                    <div className='col-10 mx-auto col-sm-8 col-md-6 my-3'>
                                        <h5 className='text-title mb-4'>model : {title}</h5>
                                        <h5 className='text-capitalize text-muted mb-4'>company : {company}</h5>
                                        <h5 className='text-main text-capitalize'>price : ${price}</h5>
                                        <p className='text-capitalize text-title'>some info about product:</p>
                                        <p>{description}</p>
                                        <button type='button' className='main-link' style={{margin:'0.75rem'}} onClick={()=>addToCart(id)}>add to cart</button>
                                        <Link to='/products' className='main-link' style={{margin:'0.75rem'}} >back to products</Link>

                                    </div>
                                </div>

                            </div>
                    </section>
                }}
            </ProductConsumer>
        </>
    )
}
