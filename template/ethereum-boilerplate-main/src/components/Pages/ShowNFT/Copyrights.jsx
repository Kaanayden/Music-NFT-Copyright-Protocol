import React, { useState, useEffect } from 'react';
import { Collapse, Menu } from 'antd';
const { Panel } = Collapse;

import { CopyrightOutlined } from '@ant-design/icons';
import { BsPersonCheckFill, BsPersonPlusFill } from "react-icons/bs";
import { GrDocumentLocked } from "react-icons/gr"

import { useMoralisWeb3Api, useChain, useMoralis } from "react-moralis";
import contracts from '../../../contracts/contracts.json'
const contractAddress = contracts.mumbai;
import abi from '../../../contracts/contractAbi'
import getIPFSLink from 'scripts/getIPFSLink';
import Copyright from './Copyright';


export default function Copyrights(props) {
    const { Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const { switchNetwork, chainId, chain, account } = useChain();


    const { nft, copyrightInfo } = props;

    const [menu, setMenu] = useState("all");

    const handleSelect = (value) => {
        setMenu(value.key);
    }


    let isOwner;
    if (nft) {
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
                    <Copyright />

                </div>
            }
            {menu == "userset" &&
                <div>


                </div>
            }
            {menu == "userfree" &&
                <div>


                </div>
            }
            {menu == "private" &&
                <div>


                </div>
            }

        </div>
    );
}