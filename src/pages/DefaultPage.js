import React from 'react'
import Hero from '../components/Hero'
import defaulBcg from '../images/defaultBcg.jpeg'
import {Link} from 'react-router-dom'

export default function DefaultPage() {
    return (
        <>
            <Hero img={defaulBcg} max='true' title='404 '>
                <h2 className='text-uppercase'>Page not fount</h2>
                <Link className='main-link' to='/' style={{margin:'2rem'}}>back home</Link>
            </Hero>
        </>
    )
}
