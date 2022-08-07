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
        console.log("hey")

        const tokenIdMetadata = await Web3Api.token.getTokenIdMetadata(options);
        console.log(tokenIdMetadata)
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
        let result = await contract.queryFilter("*", blockNumber - 15000, blockNumber)
        console.log("result", result);
        let copyrightData = {}
        copyrightData.priceSet = result.filter((data) => checkType(data, "CopyrightPriceSet"));
        copyrightData.licenseBought = result.filter((data) => checkType(data, "UsageLicenseBought"));
        copyrightData.licenseSet = result.filter((data) => checkType(data, "UsageLicenseDataSet"));
        if (copyrightData.priceSet.length > 0) {
            copyrightData.price = copyrightData.priceSet[copyrightData.priceSet.length - 1].args.newPrice.toNumber();
        } else {
            copyrightData.price = 0;
        }

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

    console.log(chain)
    return (
        <div>
            <button style={nft?{visibility:"hidden"}:{visibility:"visible"}} onClick={openPage}>Click to See NFT</button>
            {nft &&
                <div className='nft-outer'>

                    <div className='nft-container'>
                        <div className='nft-image'>
                            <img src={getIPFSLink(nft.json.image)} />

                            <audio controls>
                                <source src={getIPFSLink(nft.json.audio)} type="audio/mpeg" />
                            </audio>
                        </div>
                        <div className='nft-info'>
                            <p className='name'>{nft.json.name}</p>
                            {isOwner && <p className='owner'>  Owned by: You</p>}
                            {!isOwner && <p className='owner'>  Owned by: {nft.owner_of}</p>}
                            <p className='token-id'>Token ID: {nft.token_id}</p>
                            <p className="contract-id">Contract Address: {nft.token_address}ETH</p>
                            <p className="price">Price: xxxx {chain?.nativeCurrency.symbol}</p>
                            <p className="cprice">Copyright Price: xxxx {chain?.nativeCurrency.symbol}</p>
                            <div className='description-div'>
                                Description:
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
                            {nft && copyright &&
                                <Copyrights
                                    nft={nft}
                                    copyrightInfo={copyright}
                                />
                            }
                        </Panel>
                    </Collapse>
                </div>
            }
        </div>
    );
};
export default ShowNFT;