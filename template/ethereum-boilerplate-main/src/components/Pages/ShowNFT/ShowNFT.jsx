import React, { useState, useEffect } from 'react';
import { Collapse, Input, Menu, Statistic } from 'antd';
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

const ZoraModuleManager = "0x850A7c6fE2CF48eea1393554C8A3bA23f20CC401"
const ERC20TransferHelper = "0xCCA379FDF4Beda63c4bB0e2A3179Ae62c8716794"
const ERC721TransferHelper = "0x909e9efE4D87d1a6018C2065aE642b6D0447bc91"
const AsksV1_1 = "0xCe6cEf2A9028e1C3B21647ae3B4251038109f42a"


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ShowNFT = () => {
    const { Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const { switchNetwork, chainId, chain, account } = useChain();

    const [nft, setNft] = useState();
    const [copyright, setCopyright] = useState();
    const [nftPrice, setNftPrice] = useState();
    const [copyrightPrice, setCopyrightPrice] = useState();
    const [selectedPrice, setSelectedPrice] = useState();

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
        const web3Provider = await Moralis.web3;
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
        return (copyrightData)
    }

    const checkType = (data, text) => {
        return data.event == text
    }

    let isOwner;
    console.log("acctest", account);
    if (nft) {

        isOwner = (nft?.owner_of.toLowerCase() == account?.toLowerCase())

    }

    const openPage = async () => {
        await fetchTokenIdMetadata()
        await getEvents();
        await fetchPrice();
        await getCopyrightPrice();
    }

    const handleRefresh = async () => {
        return (await getEvents());

    }



    const approve = async () => {
        const web3Provider = await Moralis.web3;
        const ethers = Moralis.web3Library;
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        let moduleAbi = [
            "function setApprovalForModule(address _module, bool _approved)",
        ]
        const iface = new ethers.utils.Interface(moduleAbi)
        console.log(iface)
        let erc721 = [
            "function setApprovalForAll(address _operator, bool _approved)",
        ]

        const zoraContract = new ethers.Contract(ZoraModuleManager, moduleAbi, signer);
        console.log("zora", zoraContract);
        const erc721Contract = new ethers.Contract(ERC721TransferHelper, erc721, signer);
        await contract.setApprovalForAll(ERC721TransferHelper, true);
        await zoraContract.setApprovalForModule(AsksV1_1, true);

    }

    const getCopyrightPrice = async () => {
        const web3Provider = await Moralis.web3;
        const ethers = Moralis.web3Library;
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, web3Provider);
        let result = await contract.musicNFTs(id)
        setCopyrightPrice(result);

    }

    const buy = async () => {
        const web3Provider = await Moralis.web3;
        const ethers = Moralis.web3Library;
        const signer = web3Provider.getSigner();

        let asks = [
            "function fillAsk(address _tokenContract,uint256 _tokenId,address _fillCurrency,uint256 _fillAmount,address _finder) payable"

        ]
        const asksContract = new ethers.Contract(AsksV1_1, asks, signer);
        await asksContract.fillAsk(
            contractAddress,
            id,
            "0x0000000000000000000000000000000000000000", // 0 address for ETH sale
            nftPrice,
            "0x0000000000000000000000000000000000000000",
            { value: nftPrice }
        );

    }

    const sell = async () => {
        const web3Provider = await Moralis.web3;
        const ethers = Moralis.web3Library;
        const signer = web3Provider.getSigner();
        let price = selectedPrice;
        let asks = [
            "function createAsk(address _tokenContract, uint256 _tokenId, uint256 _askPrice, address _askCurrency, address _sellerFundsRecipient, uint16 _findersFeeBps)"

        ]
        const asksContract = new ethers.Contract(AsksV1_1, asks, signer);
        await asksContract.createAsk(
            contractAddress,
            id,
            price,
            "0x0000000000000000000000000000000000000000", // 0 address for ETH sale
            account,
            0
        );

    }

    const setCopyrightt = async () => {
        const web3Provider = await Moralis.web3
        const ethers = Moralis.web3Library;
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        let copyrights = await contract.setCopyrightPrice(id, selectedPrice)
    }

    const fetchPrice = async () => {
        const web3Provider = await Moralis.web3;
        const ethers = Moralis.web3Library;
        let asks = [

            "function askForNFT(address, uint256) view returns( address, address, address, uint16, uint256 )"
        ]
        const asksContract = new ethers.Contract(AsksV1_1, asks, web3Provider);
        let result = await asksContract.askForNFT(
            contractAddress,
            id
        );
        result = result[4];
        setNftPrice(result.toNumber())
    }

    console.log(chain)

    const handlePriceChange = (e) => {
        setSelectedPrice(e.target.value)
    }

    return (
        <div>
            <button style={nft ? { visibility: "hidden" } : { visibility: "visible" }} onClick={openPage}>Click to See NFT</button>
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
                            <div className='prices'>
                                <p className="price"><Statistic title="NFT Price" value={nftPrice + " " + "Gwei"} /></p>
                                <p className="cprice"><Statistic title="Copyright Price" value={copyrightPrice + " " + "Gwei"} /></p>
                            </div>

                            <div className='description-div'>
                                Description:
                                <p className='description'>{nft.json.description}</p>
                            </div>
                            <div className='nft-buttons'>
                                {!isOwner && <button onClick={buy} className='nft-buy'>Buy</button>}
                                {isOwner && <Input placeholder="Price" onChange={handlePriceChange} />}
                                {isOwner && <button onClick={sell} className='nft-sell'>Sell</button>}
                                {isOwner && <button onClick={setCopyrightt} className='nft-setc'>Set Copyright Price</button>}
                                {isOwner && <button onClick={approve} className='nft-setc'>Approve to Zora</button>}
                                <button onClick={() => {
                                    fetchPrice()
                                    getCopyrightPrice()
                                }
                                } className='nft-setc'>Fetch Prices</button>

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
                                    copyrightInfos={copyright}
                                    refresh={handleRefresh}
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