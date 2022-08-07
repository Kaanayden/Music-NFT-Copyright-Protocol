import React, { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton, Modal, Spin, Result } from "antd";
import { Link } from 'react-router-dom';
import { useMoralisWeb3Api, useChain, useMoralis,} from "react-moralis";
import contracts from '../../../contracts/contracts.json';
import getIPFSLink from 'scripts/getIPFSLink';
const contractAddress = contracts.mumbai;
import "./BuyCard.css";

const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

const BuyCard = ({id})=>{

    const { Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const { switchNetwork, chainId, chain, account } = useChain();
    
    const [loading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [verify, setVerify] = useState(false);
    const [owned, setOwned] = useState(false);
    const [nft, setNft] = useState();

    const fetchTokenIdMetadata = async () => {
        const options = {
            address: contractAddress,
            token_id: id,
            chain: chainId,
        };

        const tokenIdMetadata = await Web3Api.token.getTokenIdMetadata(options);
        tokenIdMetadata.json = JSON.parse(tokenIdMetadata.metadata);
        console.log("metadata", tokenIdMetadata);
        setNft(tokenIdMetadata);
    }

    const onBuyNft = ()=>{
        setTimeout(()=>{
            setVerify(true)
            setTimeout(()=>{
                setModal(false)
            },1500)
        },1000)
    }
    const onBuyRight = ()=>{

    }
    
    useEffect(async()=>{
        await fetchTokenIdMetadata();
        setTimeout(()=>{
            setLoading(false)
        },1000)
    },[])
    
    return nft?(
    <>
        <div className="card-container">
            <Skeleton loading={loading} active paragraph={{rows: 8}}>
                <div className="card-outer">
                    <Link to={`/nft/${id}`}>
                        <div className="card-image">
                        <img src={getIPFSLink(nft.json.image)} />
                        </div>
                    </Link>
                    <div className="card-info">
                        <p className="card-price">Price:</p>
                        <p className="card-cprice">Copyright Price:</p>
                        <p className="card-name">{nft.json.name}</p>
                    </div>
                    <button onClick={()=>{setModal(true)}} className="buy-button">
                        Buy Copyright / NFT
                    </button>
                </div>
            </Skeleton>
        </div>
        <Modal title={nft.name}
             visible={showModal}
             width={800}
            onCancel={()=>{setModal(false)}}
            footer={[<button onClick={onBuyNft} className="buy-buy" >Buy</button>,
                    <button onClick={onBuyRight} className="buy-buy" >Buy Copyright</button>]}>
            {verify?
                <Result
                    status="success"
                    title={"Successfully Purchased "+nft.json.name}
                    subTitle={"Token ID: " +nft.token_id}
                />:
                <div className="buy-modal">
                    <img className="modal-image" src={getIPFSLink(nft.json.image)} />
                    <p>Owner Adress: {nft.owner_of}</p>
                    <p>Token ID: {nft.token_id}</p>
                    <p>Price: </p>
                    <p>Copyright Price: </p>
                    <p>Copyrights</p>
                </div>
            }  
        </Modal>
    </>
    ):null
}

export default BuyCard;