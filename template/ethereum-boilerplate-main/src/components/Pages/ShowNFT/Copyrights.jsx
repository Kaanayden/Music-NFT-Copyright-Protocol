import React, { useState, useEffect } from 'react';
import { Collapse, Menu, Card, Badge, Alert, Button, Upload, Input } from 'antd';
const { Panel } = Collapse;

import { CopyrightOutlined, ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons';
import { BsPersonCheckFill, BsPersonPlusFill } from "react-icons/bs";
import { GrDocumentLocked } from "react-icons/gr"

import { useMoralisWeb3Api, useChain, useMoralis } from "react-moralis";
import contracts from '../../../contracts/contracts.json'
const contractAddress = contracts.mumbai;
import abi from '../../../contracts/contractAbi'
import getIPFSLink from 'scripts/getIPFSLink';
import Copyright from './Copyright';
import SetCopyright from './SetCopyright';
import LitJsSdk from 'lit-js-sdk'

const { Meta } = Card;


export default function Copyrights(props) {
    const { Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const { switchNetwork, chainId, chain, account } = useChain();
    const [free, setFree] = useState([]);

    const [isLicenseOwner, setIsLicenseOwner] = useState(false);

    const { nft, copyrightInfos, refresh } = props;

    const [copyrightInfo, setCopyrightInfo] = useState(copyrightInfos);

    const [menu, setMenu] = useState("all");
    const [videoRangeVisible, setVideoRangeVisible] = useState(false)
    const [isNftOwner, setIsNftOwner] = useState(false);
    const [data, setData] = useState();


    const handleSelect = (value) => {
        setMenu(value.key);
        if (value.key == "userfree" && copyrightInfo) {
            checkFreeLicense()
        }
        if (value.key == "private" && copyrightInfo) {
            handlePrivate()
        }
    }

    useEffect(() => {

        //setMenu("all");
    }, [account])


    const checkFreeLicense = async () => {
        setCopyrightInfo(await refresh())
        const web3Provider = await Moralis.web3
        const ethers = Moralis.web3Library;
        const contract = new ethers.Contract(contractAddress, abi, web3Provider);
        let array = []
        console.log("olay1")
        let copyrights = await contract.getUsageCopyrights(nft.token_id);
        console.log("olay2")
        console.log("copy", copyrights)
        for (let i = 0; i < copyrightInfo.licenseBought.length; i++) {
            if (copyrights[copyrightInfo.licenseBought[i].args.copyrightId].isDataSet == false) {
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

    const buyUsage = async () => {
        const web3Provider = await Moralis.web3
        const ethers = Moralis.web3Library;
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        let nfts = await contract.musicNFTs(nft.token_id);
        let price = nfts.toNumber();

        console.log("test", price)
        let copyrights = await contract.buyUsageLicense(nft.token_id, { value: price });
        await checkFreeLicense()
        console.log(copyrights)
    }


    const handleSetFinish = async () => {

        await checkFreeLicense()
    }

    //lit protocol private files
    const handlePrivate = async () => {

        const web3Provider = await Moralis.web3
        const ethers = Moralis.web3Library;
        //const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, web3Provider);

        let licensed = await contract.checkLicenseWithAddress(nft.token_id, account)
        let owner = await contract.ownerOf(nft.token_id)
        setIsLicenseOwner(licensed);
        setIsNftOwner(owner.toLowerCase() == account.toLowerCase());
    }


    const handleUserUpload = async (info) => {
        let file = info.file.originFileObj;
        console.log("file", file)

        const client = new LitJsSdk.LitNodeClient()
        await client.connect()
        console.log(client);
        const chain = "mumbai";
        const accessControlConditions = [
            {
                contractAddress: contractAddress,
                functionName: "checkLicenseWithAddress",
                functionParams: [nft.token_id, ":userAddress"],
                functionAbi: {
                    type: "function",
                    stateMutability: "view",
                    outputs: [
                        {
                            type: "bool",
                            name: "",
                            internalType: "bool",
                        },
                    ],
                    name: "checkLicenseWithAddress",
                    inputs: [
                        {
                            type: "uint",
                            name: "tokenId",
                            internalType: "uint",
                        },
                        {
                            type: "address",
                            name: "_address",
                            internalType: "address",
                        },
                    ],
                },
                chain,
                returnValueTest: {
                    key: "",
                    comparator: "==",
                    value: "true",
                },
            },
        ]

        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'mumbai' })
        const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
            "this is a secret message"
        );

        const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
            accessControlConditions,
            symmetricKey,
            authSig,
            chain,
        });

    }

    const handleOwnerUpload = (info) => {

    }

    function handleInput(e) {
        setData(e.target.value);
        console.log(data)
    }

    const handleUserUpload = async (e) => {
        let file = e.file.originFileObj
        console.log(file);
        setUser(file);
    
        const client = new LitJsSdk.LitNodeClient()
        await client.connect()
        console.log(client);
        const chain = "mumbai";
    
        const options = {
          address: contractAddress,
          chain: chainId,
        };
        const NFTs = await Web3Api.token.getAllTokenIds(options);
        const id = NFTs.total;
        /*
            const accessControlConditions = [
              {
                contractAddress: contractAddress,
                functionName: "checkLicenseWithAddress",
                functionParams: [id, ":userAddress"],
                functionAbi: {
                  type: "function",
                  stateMutability: "view",
                  outputs: [
                    {
                      type: "bool",
                      name: "",
                      internalType: "bool",
                    },
                  ],
                  name: "checkLicenseWithAddress",
                  inputs: [
                    {
                      type: "uint",
                      name: "tokenId",
                      internalType: "uint",
                    },
                    {
                      type: "address",
                      name: "_address",
                      internalType: "address",
                    },
                  ],
                },
                chain,
                returnValueTest: {
                  key: "",
                  comparator: "==",
                  value: "true",
                },
              },
            ]
        */
    
        const accessControlConditions = [
          {
            contractAddress: '',
            standardContractType: '',
            chain: 'mumbai',
            method: 'eth_getBalance',
            parameters: [':userAddress', 'latest'],
            returnValueTest: {
              comparator: '>=',
              value: '1000000000000',  // 0.000001 ETH
            },
          },
        ]
    
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'mumbai' })
        const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
          "this is a secret message"
        );
    
        let encryptedSymmetricKey = await client.saveEncryptionKey({
          accessControlConditions,
          symmetricKey,
          authSig,
          chain,
        });
    
        encryptedSymmetricKey = LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    
        let encrypted = {
          encryptedString: blobToBase64(encryptedString)
          , encryptedSymmetricKey: encryptedSymmetricKey
        }
        console.log("encryiption", encrypted);
    
    
        const symmetricKeyy = await client.getEncryptionKey({
          accessControlConditions,
          toDecrypt: encryptedSymmetricKey,
          chain,
          authSig
        })
    
        const decryptedString = await LitJsSdk.decryptString(
          encryptedString,
          symmetricKeyy
        );
        console.log("decrypt", decryptedString)
        setUserUploading(true);
        let result = await uploadData(JSON.stringify(encrypted));
        console.log(result)
        setUserUploading(false);
        setUserIpfs(result);
    
      }

    return (
        <div>

            <Menu
                selectedKeys={menu}
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
                    <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large" onClick={buyUsage}>Buy Usage License</Button>

                    {free.map((data) => {
                        if (data.args.buyer.toLowerCase() == account.toLowerCase()) {

                            return (

                                <SetCopyright data={data} onFinish={handleSetFinish} />
                            )
                        } else {
                            return null;
                        }

                    })}
                </div>
            }
            {
                menu == "private" &&
                <div>
                    <Alert message="You need to own NFT or buy usage copyright license to access private files." type="warning" />
                    <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large" onClick={handlePrivate} disabled={!isLicenseOwner}>View Usage Paid Files</Button>
                    <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large" onClick={buyUsage} disabled={!isNftOwner}>View Owner Files</Button>
                    {isOwner && <Input placeholder="Data(url eg.)" onChange={handleInput} />}
                    {isOwner && <Button type="primary" danger shape="round" icon={<UploadOutlined />} size="large" >Set Usage Paid Files</Button>}
                    {isOwner && <Button type="primary" danger shape="round" icon={<UploadOutlined />} size="large" >Set Owner Files</Button>}
                </div>
            }

        </div>
    );
}