import React, { useState, useEffect } from 'react';
import { Collapse, Menu } from 'antd';
const { Panel } = Collapse;



import { useParams } from "react-router-dom";
import axios from 'axios';
import "./ShowNFT.css";

import { useMoralisWeb3Api, useChain, useMoralis, useMoralisQuery } from "react-moralis";
import contracts from '../../../contracts/contracts.json'
const contractAddress = contracts.mumbai;
import abi from '../../../contracts/contractAbi'
import getIPFSLink from 'scripts/getIPFSLink';

import Copyrights from './Copyrights';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ShowNFT = () => {
    const { Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const { switchNetwork, chainId, chain, account } = useChain();

    const [nft, setNft] = useState();
    const [copyright, setCopyright] = useState();

    let { id } = useParams();

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

    console.log("nft", nft)
    console.log("copyright", copyright)

     const onBuy = async () => {
        //buyfunction
    }

    const onSell = async () => {
        let result = await Moralis.Plugins.covalent.getLogEventsByContractAddress({
            chainId: chainId,
            contractAddress: contractAddress,
            startingBlock: "26915107",
            endingBlock: "latest",
            pageSize: 100,
        })
        console.log(result)
    }



    const getEvents = async () => {
        const web3Provider = await Moralis.enableWeb3();
        const ethers = Moralis.web3Library;
        const contract = new ethers.Contract(contractAddress, abi, web3Provider);
        const blockNumber = await web3Provider.getBlockNumber();
<<<<<<< HEAD
        let result = await contract.queryFilter("*", blockNumber - 10000, blockNumber)
=======
        let result = await contract.queryFilter("*", blockNumber - 15000, blockNumber)
        console.log("result", result);
>>>>>>> 2dceb7af550f47edbb36631b421c6406aa19c554
        let copyrightData = {}
        copyrightData.priceSet = result.filter((data) => checkType(data, "CopyrightPriceSet"));
        copyrightData.licenseBought = result.filter((data) => checkType(data, "UsageLicenseBought"));
        copyrightData.licenseSet = result.filter((data) => checkType(data, "UsageLicenseDataSet"));
        setCopyright(copyrightData)
    }

    const checkType = (data, text) => {
        return data.event == text
    }

    let isOwner;
    if (nft) {
        isOwner = (nft?.owner_of.toLowerCase() == account?.toLowerCase())

    }

    const openPage = async () => {
        await fetchTokenIdMetadata()
        await getEvents();

    }


    return (
        <div>
            <button onClick={openPage}>a</button>
            {nft &&
                <div className='nft-outer'>

                    <div className='nft-container'>
                        <div className='nft-image'>
                            <img src={getIPFSLink(nft.json.image)} />

                            <audio controls >
                                <source src={getIPFSLink(nft.json.audio)} type="audio/mpeg" />
                            </audio>
                        </div>
                        <div className='nft-info'>
                            <p className='name'>Name: {nft.json.name}</p>
                            {isOwner && <p className='owner'>Owned by: You</p>}
                            {!isOwner && <p className='owner'>Owned by: {nft.owner_of}</p>}
                            <p className="price">Price: {}ETH</p>
                            <p className="price">Copyright Price: {}ETH</p>
                            <p className='token-id'>Token ID: {nft.token_id}</p>
                            <p className="contract-id">Contract Address: {nft.token_address}ETH</p>
                            <div className='description-div'>
                                Description
                                <p className='description'>{nft.json.description}</p>
                            </div>
                            <div className='nft-buttons'>
                                {!isOwner && <button onClick={onBuy} className='nft-buy'>Buy</button>}
                                {isOwner && <button onClick={onSell} className='nft-sell'>Sell</button>}
                                {isOwner && <button onClick={onSell} className='nft-setc'>Set Copyright Price</button>}
                            </div>
                            
                            {//putted be graphic
                            }
                        </div>
                    </div>



                    <Collapse>
                        <Panel header="Usage Copyrights" className='nft-copyrights'>
                            <Copyrights
                                nft={nft}
                                copyrightInfo
                            />
                        </Panel>
                    </Collapse>
                </div>
            }
        </div>
    );
};
export default ShowNFT;