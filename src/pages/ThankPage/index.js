import React from 'react'
import './Thank.css'
import Footer from '../../components/Footer'

const ThankPage = () => {
    return (
        <div className="thank-you">
            <p className="thank-you-title">Thank You For <span className="green">Donating!</span></p>
            <Footer />
        </div>
    )
}

export default ThankPage
