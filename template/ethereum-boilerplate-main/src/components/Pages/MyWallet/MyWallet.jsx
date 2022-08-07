import React,{ useEffect, useState } from "react";
import { useMoralisWeb3Api, useChain } from "react-moralis";
import contracts from '../../../contracts/contracts.json'
const contractAddress = contracts.mumbai;
import abi from '../../../contracts/contractAbi'
import SellCard from "components/NFTCards/SellCard/SellCard";
import { Pagination } from "antd";
import "./MyWallet.css";


export default function MyWallet(){

    const Web3Api = useMoralisWeb3Api();
    const { switchNetwork, chainId, chain, account } = useChain();
    const [myNFTs, setNFTs] = useState([]);
    const pageSize = 2;
    const [totalPage, setPages] = useState(0);
    const [currentPage, setCurrent] = useState(1);
    const [minIndex, setMin] = useState(0);
    const [maxIndex, setMax] = useState(pageSize);

    const fetchNFTs = async () => {
        const options = {
            chain: chainId,
            address: account,
        };
        const polygonNFTs = await Web3Api.account.getNFTs(options);
        console.log(polygonNFTs);
        setNFTs(polygonNFTs.result)
    
    }

    const onPage = (page) => {
        setCurrent(page);
        setMin((page - 1) * pageSize);
        setMax(page * pageSize);
        console.log(minIndex + " " + maxIndex);
      }

    useEffect( async()=>{
        await fetchNFTs();
    },[])
  
return(
    myNFTs.length>0?<>
        <div className="my-outer">
            <ul className='my-nfts'>
            {myNFTs?.map((nft,index)=> index<maxIndex && index>=minIndex && (
                <li key={nft.token_id}><SellCard id={nft.token_id}></SellCard></li>
            ))}
            </ul>
            <Pagination className='pagination'
                total={myNFTs ? myNFTs.length : 100}
                showSizeChanger={false}
                showTotal={(total) => `Total ${total} items`}
                defaultPageSize={pageSize}
                current={currentPage}
                onChange={onPage}
            />
        </div>
    </>
    :<p>You do not have any NFT</p>
)}