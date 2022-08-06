import React,{useState, useEffect} from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

import { useParams } from "react-router-dom";
import axios from 'axios';
import "./ShowNFT.css";

const ShowNFT = () => {
    const egNFT = { tokenid:"8932795879048732986738347289",
                    owner:"347263097hvxjbv9889w8yvnwy5n79yv",
                    contractid:"8sd678gshgndgfs8d7fyghd78shvf",
                    price:"2.1",
                    name:"bla bla bla",
                    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    img:"https://www.qries.com/images/banner_logo.png",
                    audio:"https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg",
                    copyrights:["jsahgjks","ajhfjkshdk"],
                }

    let {id}= useParams();
    const [nft, setNft] = useState();

    useEffect(()=>{
        axios
        .get(
            `https://fakestoreapi.com/products/${id}`
        )
        .then((res) => {
            setNft(res.data);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    }, [])

    const onBuy = async(nftId)=>{
        //buyfunction
    }
    return (
    <div className='nft-outer'>
        <div className='nft-container'>
            <div className='nft-image'>
                <img src={egNFT.img}/>
                <audio
                    src={egNFT.audio}
                    controls
                />
            </div>
            <div className='nft-info'>
                <p className='name'>Name: {egNFT.name}</p>
                <p className='owner'>Owner: {egNFT.owner}</p>
                <p className="price">Price: {egNFT.price}ETH</p>
                <p className='token-id'>Token ID: {egNFT.tokenid}</p>
                <p className="contract-id">Contract ID: {egNFT.contractid}ETH</p>
                <div className='description-div'>
                    Description
                    <p className='description'>{egNFT.description}</p>
                </div>
                <button onClick={onBuy(egNFT.tokenid)} className='nft-buy'>Buy</button>
            </div>
        </div>
        <Collapse>
            <Panel header="Copyrights" className='nft-copyrights'>
                {egNFT.copyrights.map((index)=>{
                    console.log(index)
                     return(<p>{index}</p>)})}
            </Panel>
        </Collapse>
    </div>
    );
};
export default ShowNFT;