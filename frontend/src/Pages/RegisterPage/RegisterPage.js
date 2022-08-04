import './RegisterPage.css'
import React, { useState } from 'react'
import Section from '../../Layouts/Section/Section'
import Container from '../../Layouts/Container/Container'
import UserApi from '../../Api/user'

const RegisterPage = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const registerFunc = async () => {
        const data = await UserApi.registerUser(name, email, password)
        console.log(data);
        
    }
    return (
        <Section>
            <Container>
                <div className="container register-container-main">
                    <div className="form register-form">
                        <div className="form-skele">
                            <input type="text" placeholder='username' onChange={(e) => setname(e.target.value)}/>
                            <input type="email" placeholder='e-mail' onChange={(e) => setemail(e.target.value)}/>
                            <input type="password" placeholder='password' onChange={(e) => setpassword(e.target.value)}/>
                        </div>
                        <div className="form-button">
                            <button className='button button-form' onClick={registerFunc}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default RegisterPage