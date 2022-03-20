import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import {loadContract} from '../utils/load-contract';

function Header(){
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null
      })
    
      const [amountToBeRaised, setAmountToBeRaised] = useState(null)
      const [amountRaised, setAmountRaised] = useState(null)
      const [account, setAccount] = useState(null)
      const [donationAmount, setDonationAmount] = useState(null)

      const setAccountListener = provider => {
        provider.on("accountsChanged", account => window.location.reload())
    
        provider.on("chainChanged", account => window.location.reload())
      }
      
    
    //   load provider
      useEffect(() => {
    
        const loadProvider = async () => {
          const provider = await detectEthereumProvider()
          const contract = await loadContract("Fundraiser", provider)

          if(provider){
              setAccountListener(provider)
            setWeb3Api({
              web3: new Web3(provider),
              provider,
              contract
            })

          }else{
            console.error("Please, install Metamask!")
          }
        }
    
        loadProvider()
      }, [])
    
    //   get accounts
      useEffect(() => {
        const getAccount = async () => {
          const accounts = await web3Api.web3.eth.getAccounts()
          setAccount(accounts[0])
        }
    
        web3Api.web3 && getAccount()
      }, [web3Api.web3])
      

    // load amountRaised
    useEffect(() => {

        const loadAmountRaised = async() => {
            const {contract, web3} = web3Api
            const amountRaised = await web3.eth.getBalance(contract.address)

            setAmountRaised(web3.utils.fromWei(amountRaised, "ether"))
        }

        web3Api.contract && loadAmountRaised()
        
    }, [web3Api])

    // load Amount to be raised
    useEffect(() => {

        const loadAmountToBeRaised = async() => {
            const {contract} = web3Api
            const amountToBeRaised = 50

            setAmountToBeRaised(amountToBeRaised)
        }

        web3Api.contract && loadAmountToBeRaised()

    }, [web3Api])

    // function to donate funds
    const donate = async() => {
        const {contract, web3} =web3Api
        await contract.donate({
            from: account,
            value: web3.utils.toWei(donationAmount, "ether")
        })

        window.location.reload()
    }

    const donationInput = (event) => {
        donate()
        event.preventDefault()
    }

    // function to end campaign
    const endCampaign= async() => {
        const {contract} = web3Api
        await contract.endCampaign({
            from: account
        })
    }

    // function to withdraw funds
    const withdraw = async() => {
        const {contract} = web3Api
        await contract.withdraw({
            from: account
        })

        window.location.reload()
    }

    return(
        <Container>
            <HeaderImg>
                <img src="/images/sick.jpg" width="100%" />
            </HeaderImg>

            <PaymentSection>
                <h1>Funding for Sarah's Surgery</h1>
                <hr />
                <h2><span>{amountRaised} ETH</span> raised of {amountToBeRaised} ETH</h2>
                <p>Organized By: Nnam Darlington</p>
                <p>Email: Darlingtonnnam@gmail.com</p>
                <p>Category: Health</p>
                <h3>Description:</h3>
                <p>Little Sarah has a failed kidney and is in need of a new kidney in order to get back to good health. The new kidney cost approximately 50ETH, and we need that much money before we can proceed with the surgery.</p>

                <div>
                    <p className="cxn-check">Address: {account ? account : "Please, connect to a web3 provider"}</p>
                    <form onSubmit={donationInput}>
                        <input type="text" className="donate-input" placeholder="Enter donation amount" onChange={event => {setDonationAmount(event.target.value)}} /> 
                        <input type="submit" className="donate-btn" value="Donate" disabled={!account} />
                    </form>

                    <ButtonGroup>
                        <button disabled={!account} className="end-campaign" onClick={endCampaign}>End Campaign</button>
                        <button disabled={!account} onClick={withdraw}>Withdraw</button>
                    </ButtonGroup>
                </div>
            </PaymentSection>
        </Container>        

    )
}

export default Header

const Container = styled.div `
    display: grid;
    grid-template-columns: 2fr 1.5fr;
    grid-gap: 3rem;
    font-family: times new roman;
    background: #1e1e49;
    padding: 40px;

    @media(max-width: 960px){
        padding: 10px;
        display: block;
    }
`

const HeaderImg = styled.div `

    & img{
        border-radius: 15px;
        height: 540px;

        @media(max-width: 960px){
            height: 300px;
        }
    }
`

const PaymentSection = styled.div `
    background: white;
    height: 530px;
    width: 100%;
    padding: 10px;
    border-radius: 15px;

    @media(max-width: 960px){
        height: 600px;
        margin-top: 20px;
        width: 96%;
    }
    
    h1{
        text-align: center;
    }

    h2{
        font-size: 25px;
    }
    span{
        color: blue;
        font-weight: bold;
    }
`

const ButtonGroup = styled.div `

    button{
        background: yellow;
        width: 48%;
        height: 50px;
        margin-top: 10px;
        margin-right: 10px;
        border-radius: 7px;
        font-weight: bold;
        font-size: 15px;
        cursor: pointer;

        @media(max-width: 960px){
            display: block;
            width: 100%;
        }
    }
`