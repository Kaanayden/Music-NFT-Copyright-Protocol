import React, { useState } from "react";
import "./WalletConnection.css"
import metamask from "./images/metamask.png";
import walletconnect from "./images/walletconnect.png";
import coinbasewallet from "./images/coinbasewallet.png";




const WalletConnection = ()=>{
    
   const [show, setShow] = useState(false)
   const [disable, setDisable] = useState(false)
   const [account, setAccount] = useState("")


    const handleShow = ()=>{setShow(prev => !prev)}
    const handleClick = ()=>{setDisable(prev => !prev)}
    const handleDisconect = ()=>{
        handleClick();
    }

    return(
    <div className="outer">
        <button className="wallet-button" onClick={handleShow}
                style={show ?{opacity:"1"}:{opacity:"0.5"}}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="30px" height="30px" 
                fill="currentColor"
                className="bi bi-wallet2"
                viewBox="0 0 16 16">
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
            </svg>
        </button>
        <div className="container" style={show ? {right:"0px"} : {right:"-450px"}}>
            <div className="header">
                <h2>Connect a Wallet</h2>
            </div>
            <div className="connectors">
                <p>
                    If you don't have a wallet yet, you can select a provider and create one now.
                </p>
                <button className="metamask"
                        disabled={disable}
                        onClick={handleClick}>
                    <img src={metamask}/>
                    <h4>Metamask</h4>
                </button>
                <button className="coinbase"
                        disabled={disable}
                        onClick={handleClick}>
                    <img src={coinbasewallet}/>
                    <h4>Coinbase Wallet</h4>
                </button>
                <button className="walletconnect"
                        disabled={disable} 
                        onClick={handleClick}>
                    <img src={walletconnect}/>
                    <h4>WalletConnect</h4>
                </button>
                {disable && <button className="disconnect" 
                        onClick={handleDisconect}>
                    Disconnect
                </button>}
            </div>
        </div>
    </div>
    )
}
export default WalletConnection
