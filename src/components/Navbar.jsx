import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'


function Navbar(){
    // set State for web3Api
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null
    })
    // set State for account
    const [account, setAccount] = useState(null)

    // create the loadProvider
    useEffect(() => {

        const loadProvider = async() => {

            const provider = await detectEthereumProvider()

            if(provider){
                setWeb3Api({
                    web3: new Web3(provider),
                    provider
                })
            }
            else{
                console.error("Please, install Metamask")
            }
        }

        loadProvider()
    }, []) 

    // get account
    useEffect(() => {

        const getAccount = async() => {
            const accounts = await web3Api.web3.eth.getAccounts()
            setAccount(accounts[0])
        }

        web3Api.web3 && getAccount()
    }, [web3Api])

    return(
        <div>
            <Container>
                <Logo>Blockfunder</Logo>
                <div>
                    {account ? account : 
                        <Button>
                            <button onClick={() => {
                                web3Api.provider.request({method: "eth_requestAccounts"})
                            }}>Connect wallet</button>
                        </Button>
                    }
                </div>
            </Container>
            <hr />
        </div>        

    )
}

export default Navbar

const Container = styled.div `
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 60px 10px 0px 10px;
    color: white;

    div{
        position: absolute;
        bottom: 0;
        right: 0;
    }
`
const Logo = styled.div `
    position: absolute;
    left: 0;
    font-size: 35px;
    margin-top: 10px;
    font-family: times new roman;
    font-weight: bold;

    @media(max-width: 960px){
        font-size: 23px;
    }
`

const Button = styled.div `

    button{
        background: blue;
        width: 140px;
        height: 50px;
        color: white;
        font-weight: bold;
        border-radius: 7px;
        cursor: pointer;

        &:hover{
            background: skyblue;
        }
    }
`