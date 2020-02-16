import React from 'react'
import Hero from '../components/Hero'
import {Link} from 'react-router-dom'
import Services from '../components/Home/Services'
import Featured from '../components/Home/Featured'

export default function HomePage() {
    return (
        <>
            <Hero title='awesome gadgets' max='true'>
                <Link to='products/' className='main-link' style={{margin:'2rem'}}>our products</Link>
            </Hero>
            <Services/>
            <Featured/>
        </>
    )
}
