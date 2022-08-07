
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { Layout, Checkbox, Divider, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BuyCard from 'components/NFTCards/BuyCard/BuyCard';
import SellCard from 'components/NFTCards/SellCard/SellCard';
import "./MarketPlace.css";

const { Content, Sider } = Layout;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['description', 'On auction', 'Orange'];

import { useMoralisWeb3Api, useChain } from "react-moralis";
import contracts from '../../../contracts/contracts.json'
const contractAddress = contracts.mumbai;
import abi from '../../../contracts/contractAbi'

const NFTS_PER_PAGE = 20;

export default function MarketPlace() {



  const Web3Api = useMoralisWeb3Api();
  const { switchNetwork, chainId, chain, account } = useChain();

  

  const fetchAllTokenIds = async () => {
    const options = {
      address: contractAddress,
      chain: chainId,
    };
    const NFTs = await Web3Api.token.getAllTokenIds(options);
    setAllNfts(NFTs.result);
    console.log(NFTs);
    setFilteredNfts(NFTs.result)
  }




  const pageSize = NFTS_PER_PAGE;
  const [checkedList, setCheckedList] = useState();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [allNfts, setAllNfts] = useState();
  const [filteredNfts, setFilteredNfts] = useState();
  const [totalPage, setPages] = useState(0);
  const [currentPage, setCurrent] = useState(1);
  const [minIndex, setMin] = useState(0);
  const [maxIndex, setMax] = useState(pageSize);

  const onCheck = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onPage = (page) => {
    setCurrent(page);
    setMin((page - 1) * pageSize);
    setMax(page * pageSize);
    console.log(minIndex + " " + maxIndex);
  }

  const filterNfts = () => {

  }

  const handleApply = async () => {
    setCurrent(1)
    onPage(1)
    await fetchAllTokenIds();
  }


  return (
    <div className='outer'>


      <div className='container'>
        <div className="filters">
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Check all
          </Checkbox>
          <br />
          <br />
          <CheckboxGroup className='filter' options={plainOptions} value={checkedList} onChange={onCheck} />
          <br />
          <button onClick={handleApply} className='apply'>Apply Filters</button>
        </div>
        <ul className='nfts'>
          {filteredNfts?.map((nft, index) => index >= minIndex && index < maxIndex && (
            <li key={nft.token_id}><BuyCard id={nft.token_id}></BuyCard></li>
          ))
          }
        </ul>

      </div>
      <Pagination className='pagination'
        total={filteredNfts ? filteredNfts.length : 100}
        showSizeChanger={false}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={pageSize}
        current={currentPage}
        onChange={onPage}
      />
    </div >
  );
}