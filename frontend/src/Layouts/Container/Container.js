import './Container.css'
import React from 'react'

const Container = ({children}) => {
    return (
        <div className='container-main'>{children}</div>
    )
}

export default Container