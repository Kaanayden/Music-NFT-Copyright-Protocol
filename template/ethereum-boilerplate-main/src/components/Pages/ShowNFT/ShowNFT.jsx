import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const ShowNFT = () => {
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
    return (
        <div>
            
        </div>
    );
};
export default ShowNFT;