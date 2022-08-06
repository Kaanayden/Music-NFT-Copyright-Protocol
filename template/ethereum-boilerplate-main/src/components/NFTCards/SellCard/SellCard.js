import React, { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton, Modal, Spin, Result } from "antd";
import "./SellCard.css";

const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

const SellCard = (nft)=>{
    
    const [loading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [verify, setVerify] = useState(false);
    const [selled, setSelled] = useState(false);

    const onSell = ()=>{
        setSelled(true)
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
                    <button onClick={()=>{!selled?setModal(true):setModal(false)}} className="sell-button">
                        Sell Now
                    </button>
                </div>
            </Skeleton>
        </div>
        <Modal title="NFT Name"
             visible={showModal}
            onCancel={()=>{setModal(false)}}
            footer={[<button onClick={onSell} className="sell-sell" disabled={selled}>{selled?<Spin indicator={antIcon} />:"Sell"}</button>]}>
            {verify?
                <Result
                    status="success"
                    title="Successfully Selled NFT Name"
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

export default SellCard;