import { Space, Typography } from 'antd';
import React from 'react';
import { useChain } from 'react-moralis';

const link = "https://mumbai.polygonscan.com/address/";

const { Text, Link } = Typography;

export default function AddressLink(props) {
    const { switchNetwork, chainId, chain, account } = useChain();
    if (props.address.toLowerCase() != account.toLowerCase())
        return (
            <Link href={link + props.address} target="_blank">
                {props.address}
            </Link>
        );
    else
        return (
            <Link href={link + props.address} target="_blank">
                You
            </Link>
        )
}