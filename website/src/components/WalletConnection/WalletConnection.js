import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
        <button className="wallet-button" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="100" height="100" 
                fill="currentColor"
                className="bi bi-wallet2"
                viewBox="0 0 16 16">
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
            </svg>
        </button>
        <div className="container" style={show ? {right:"0"} : {right:"-450px"}}>
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
                    <h6>Metamask</h6>
                </button>
                <button className="coinbase"
                        disabled={disable}
                        onClick={handleClick}>
                    <img src={coinbasewallet}/>
                    <h6>Coinbase Wallet</h6>
                </button>
                <button className="walletconnect"
                        disabled={disable} 
                        onClick={handleClick}>
                    <img src={walletconnect}/>
                    <h6>WalletConnect</h6>
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
