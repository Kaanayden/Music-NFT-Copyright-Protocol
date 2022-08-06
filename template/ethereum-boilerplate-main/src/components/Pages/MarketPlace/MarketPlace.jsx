
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { Layout, Checkbox, Divider, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./MarketPlace.css";

const {  Content, Sider } = Layout;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['description', 'On auction', 'Orange'];



export default function MarketPlace() {

  const pageSize = 4;
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

  const onPage = (page)=>{
    setCurrent(page);
    setMin((page-1)*pageSize);
    setMax(page*pageSize);
    console.log(minIndex + " " + maxIndex);
  }

  const filterNfts = ()=>{
    let res=allNfts;
    res = res.filter(item => {
      for (var key in checkedList) {
        return(item[checkedList[key]].includes("your"))
      }
    });
    setFilteredNfts(res.length?res:allNfts);
  }

  const handleApply = ()=>{
    setCurrent(1)
    onPage(1)
    filterNfts()
  }

  useEffect(()=>{
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        // console.log(res);
        setAllNfts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <div className='outer'>
      <div className='container'>
        <div className="filters">
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Check all
          </Checkbox>
          <br/>
          <br/>
          <CheckboxGroup className='filter' options={plainOptions} value={checkedList} onChange={onCheck} />
          <br/>
          <button onClick={handleApply} className='apply'>Apply Filters</button>
        </div>
        <ul className='nfts'>
          {filteredNfts?.map((filteredNfts,index)=> index >= minIndex && index < maxIndex && (
            <li key={filteredNfts.id}>{filteredNfts.title} <Link to={`/nft/${filteredNfts.id}`}>View</Link></li>
          ))
          }
        </ul>
        
      </div>
      <Pagination className='pagination'
        total={filteredNfts?filteredNfts.length:100}
        showSizeChanger={false}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={pageSize}
        current={currentPage}
        onChange={onPage}
      />
    </div>
  );
}