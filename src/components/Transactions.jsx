import React from 'react'
import styled from 'styled-components'

function Transactions() {
    return (
        <div>
            <Container>
                <h1>Transactions</h1>
                No transactions detected yet..
            </Container>
        </div>
    )
}

export default Transactions

const Container = styled.div `
    background: #1e1e49;
    padding: 40px;
    margin-top: 10px;
    text-align: center;
    color: white;

    @media(max-width: 960px){
        padding: 10px;
    }

    h1{
        font-weight: bold;
    }
`