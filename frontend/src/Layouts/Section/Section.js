import './Section.css'
import React from 'react'

const Section = ({children}) => {
    return (
        <section className='section-main'>{children}</section>
    )
}

export default Section