
import React, { useState } from 'react'
import { Input, Upload, message, Button, Alert, Typography, Spin, Result } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined, FileImageOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { BsFileEarmarkMusic } from "react-icons/bs";
import uploadFileNftStorage from 'scripts/uploadFileNftStorage';
import uploadData from 'scripts/uploadData';
import getIPFSLink from 'scripts/getIPFSLink';
import "./MintNFT.css";

import contracts from '../../contracts/contracts.json'
const contractAddress = contracts.mumbai;
import abi from '../../contracts/contractAbi'

import { useMoralis, useChain } from 'react-moralis';
import { useAPIContract as getAPIContract } from 'hooks/useAPIContract';

const { TextArea } = Input;

const { Text, Link } = Typography;



const NFTMetadataGenerator = (data) => {
  let metadata = {};

  metadata.name = data.name;
  metadata.description = data.description;
  metadata.audio = data.audioFileUrl;
  metadata.image = data.imageFileUrl;
  metadata.external_url = "https://nft-copyright.kaanaydeniz.com/nft/" + data.tokenId;

  return metadata;
}

export default function MintNFT(props) {

  const { Moralis } = useMoralis();
  const { switchNetwork, chainId, chain, account } = useChain();

  //onFinish prop

  const submitNft = async () => {

    let output = await Moralis.executeFunction(
      {
        contractAddress: contractAddress,
        functionName: "safeMint",
        abi: abi,
        params: {
          to: account,
          uri: result.ipfsGatewayUrl
        }
      }
    )

    console.log(output);

  }





  const [loading, useLoading] = useState(false);
  const [image, setImage] = useState();
  const [pending, setPending] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [audio, setAudio] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [imageIpfs, setImageIpfs] = useState();
  const [audioIpfs, setAudioIpfs] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [isAudioUploading, setAudioUploading] = useState(false);
  const [isImageUploading, setImageUploading] = useState(false);
  const [result, setResult] = useState();

  let { tokenId } = props;

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <FileImageOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Image
      </div>
    </div>
  );

  const uploadMusicButton = (
    <div>
      {loading ? <LoadingOutlined /> : <BsFileEarmarkMusic />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Audio
      </div>
    </div>
  );

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleChange = async (e) => {
    let file = e.file.originFileObj
    console.log(file);
    setImage(file);
    setImageUrl(URL.createObjectURL(file))
    setImageUploading(true);
    let result = await uploadFileNftStorage(file);
    setImageUploading(false);
    setImageIpfs(result);

  }

  const handleAudioChange = async (e) => {
    console.log("file", e);
    let file = e.file.originFileObj;
    console.log(file);
    setAudio(file);
    setAudioUrl(URL.createObjectURL(file))
    setAudioUploading(true);
    console.log("audioUrl", audioUrl)
    let result = await uploadFileNftStorage(file);
    setAudioUploading(false);
    console.log("ipfs", result)
    setAudioIpfs(result);
  }

  const handleClick = async () => {
    let data = {};
    data.name = name;
    data.description = description;
    data.imageFileUrl = imageIpfs.ipfsGatewayUrl;
    data.audioFileUrl = audioIpfs.ipfsGatewayUrl;
    data.tokenId = 5;
    //data.tokenId = tokenId;
    let metadata = NFTMetadataGenerator(data);
    console.log(metadata)
    console.log(JSON.stringify(metadata))
    setPending(true);
    let result = await uploadData(JSON.stringify(metadata));
    console.log(result)
    setResult(result);
  }





  return (
    <button className='mint-button'>Mint NFT</button>
  )
}