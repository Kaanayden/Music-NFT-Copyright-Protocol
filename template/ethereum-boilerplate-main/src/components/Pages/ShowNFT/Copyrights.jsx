import React, { useState, useEffect } from 'react';
import { Collapse, Menu, Card, Badge, Alert, Button } from 'antd';
const { Panel } = Collapse;

import { CopyrightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { BsPersonCheckFill, BsPersonPlusFill } from "react-icons/bs";
import { GrDocumentLocked } from "react-icons/gr"

import { useMoralisWeb3Api, useChain, useMoralis } from "react-moralis";
import contracts from '../../../contracts/contracts.json'
const contractAddress = contracts.mumbai;
import abi from '../../../contracts/contractAbi'
import getIPFSLink from 'scripts/getIPFSLink';
import Copyright from './Copyright';

const { Meta } = Card;


export default function Copyrights(props) {
    const { Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const { switchNetwork, chainId, chain, account } = useChain();
    const [free, setFree] = useState([]);

    const { nft, copyrightInfo } = props;

    const [menu, setMenu] = useState("all");

    const handleSelect = (value) => {
        setMenu(value.key);
        if (value.key == "userfree" && copyrightInfo) {
            checkFreeLicense()
        }
    }


    const checkFreeLicense = async () => {
        const web3Provider = await Moralis.enableWeb3();
        const ethers = Moralis.web3Library;
        const contract = new ethers.Contract(contractAddress, abi, web3Provider);
        let array = []
        let copyrights = await contract.getUsageCopyrights(nft.token_id);
        console.log("copy", copyrights)
        for (let i = 0; i < copyrightInfo.licenseBought.length; i++) {
            if (copyrights[copyrightInfo.licenseBought[i].args.copyrightId].isDataSet != false) {
                array.push(copyrightInfo.licenseBought[i])
            }
        }
        console.log("array", array)
        setFree(array);
    }

    let isOwner;
    if (nft) {
        console.log("yeninft", nft)
        console.log("yeniacc", account)
        isOwner = (nft.owner_of.toLowerCase() == account.toLowerCase())

    }

    return (
        <div>

            <Menu
                mode="horizontal"
                defaultSelectedKeys={['all']}
                onSelect={handleSelect}
            >
                <Menu.Item key="all" icon={<CopyrightOutlined />}>
                    All Copyright Licenses
                </Menu.Item>
                <Menu.Item key="userset" icon={<BsPersonCheckFill />}>
                    Your Copyright Usages
                </Menu.Item>
                <Menu.Item key="userfree" icon={<BsPersonPlusFill />}>
                    Set New Usages
                </Menu.Item>
                <Menu.Item key="private" icon={<GrDocumentLocked />}>
                    Paid Files
                </Menu.Item>
            </Menu>

            {menu == "all" &&
                <div>
                    {copyrightInfo.licenseSet.map((data) => {

                        return (

                            <Copyright data={data} key={data} />
                        )
                    })}

                </div>
            }
            {menu == "userset" &&
                <div>
                    {copyrightInfo.licenseSet.map((data) => {
                        if (data.args.buyer.toLowerCase() == account.toLowerCase()) {

                            return (

                                <Copyright data={data} key={data} />
                            )
                        } else {
                            return null;
                        }

                    })}

                </div>
            }
            {menu == "userfree" &&
                <div>
                    <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large" >Buy Usage License</Button>
                    {free.map((data) => {
                        if (data.args.buyer.toLowerCase() == account.toLowerCase()) {

                            return (

                                "bb"
                            )
                        } else {
                            return null;
                        }

                    })}
                </div>
            }
            {menu == "private" &&
                <div>
                    <Alert message="You need to own NFT or buy usage copyright license to access private files." type="warning" />

                </div>
            }

        </div>
    );
}