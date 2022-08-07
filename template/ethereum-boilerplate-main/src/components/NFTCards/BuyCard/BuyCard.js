import React, { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton, Modal, Spin, Result } from "antd";
import { Link } from 'react-router-dom';
import "./BuyCard.css";

const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

const BuyCard = ({nft,id})=>{
    
    const [loading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [verify, setVerify] = useState(false);
    const [owned, setOwned] = useState(false);

    const onBuy = ()=>{
        setOwned(true)
        setTimeout(()=>{
            setLoading(false)
            setVerify(true)
            setLoading(false)
            setTimeout(()=>{
                setModal(false)
            },1500)
        },1000)
    }
    
    useEffect(async()=>{
        setTimeout(()=>{
            setLoading(false)
        },1000)
    })
  
    return(
    <>
        <div className="card-container">
            <Skeleton loading={loading} active paragraph={{rows: 8}}>
                <div className="card-outer">
                    <Link to={`/nft/${id}`}>
                        <div className="card-image">

                        </div>
                    </Link>
                    <div className="card-info">
                        <p className="card-price">Price</p>
                        <p className="card-cprice">Copyright Price</p>
                    </div>
                    <button onClick={()=>{!owned?setModal(true):setModal(false)}} className="buy-button">
                        Buy Now
                    </button>
                </div>
            </Skeleton>
        </div>
        <Modal title="NFT Name"
             visible={showModal}
            onCancel={()=>{setModal(false)}}
            footer={[<button onClick={onBuy} className="buy-buy" disabled={owned}>{owned?<Spin indicator={antIcon} />:"Buy"}</button>]}>
            {verify?
                <Result
                    status="success"
                    title="Successfully Purchased NFT Name"
                    subTitle="Order number: Token ID"
                />:
                <>
                <p>Owner Adress</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                </>
            }  
        </Modal>
    </>
    )
}

export default BuyCard;