import './LoginPage.css'
import React, { useState } from 'react'
import UserApi from '../../Api/user'
import Section from '../../Layouts/Section/Section'
import Container from '../../Layouts/Container/Container'

const LoginPage = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const loginFunc = async () => {
        const data = await UserApi.loginUser(email, password)
        console.log(data);
        if (data) {
            window.location.reload()
        }
    }

    return (
        <Section>
            <Container>
                <div className="container login-container-main">
                    <div className="form login-form">
                        <div className="form-skele">
                            <input type="email" placeholder='e-mail' onChange={(e) => setemail(e.target.value)}/>
                            <input type="password" placeholder='password' onChange={(e) => setpassword(e.target.value)}/>
                        </div>
                        <div className="form-button">
                            <button className='button button-form' onClick={loginFunc}>Sign In</button>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default LoginPage