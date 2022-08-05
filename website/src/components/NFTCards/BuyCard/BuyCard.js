import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import "./BuyCard.css";

const NFTCard = ()=>{
    const [showModal, setShowModal] = useState(false);
    
    const clickBuyBtn = ()=>{  
        setShowModal(true);
    }
  
    return(
        <>
            <div className="card-outer">
                <button onClick={clickBuyBtn} className="buy-button">
                    Buy Now
                </button>
            </div>
           <Modal isOpen={showModal} onClose={setShowModal}>
                <h3>Buy Nft</h3>
                <div>
                    selamlar
                </div>
            </Modal>
        </>
    )
}

export default NFTCard;