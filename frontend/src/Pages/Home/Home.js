import './Home.css'
import React from 'react'
import Section from '../../Layouts/Section/Section'
import Container from '../../Layouts/Container/Container'

const Home = () => {
    return (
        <Section>
            <Container>
                <div className="Home-container-main">
                    <h1>Hello World</h1>
                </div>
            </Container>
        </Section>
    )
}

export default Home