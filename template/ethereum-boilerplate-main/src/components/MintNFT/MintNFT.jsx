
import React, { useState } from 'react'
import { Input, Upload, message, Button, Alert, Typography, Spin, Result, Modal, notification } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined, FileImageOutlined, SaveOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
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
    setTimeout(()=>{
      setModal(false)
    },500)
    setTimeout(()=>{
      notification.open({
        message: 'NFT Minted',
        description:
          'Your NFT succesfully minted',
        icon: <CheckCircleOutlined style={{color:"green"}}/>,
      });
      setAllStates();
    },1000)
  
  }





  const [loading, setLoading] = useState(false);
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
  const [modal, setModal] = useState(false);

  const setAllStates = ()=>{
    setLoading(false)
    setImage(null)
    setPending(false)
    setImageUrl(null)
    setAudio(null)
    setAudioUrl(null)
    setImageIpfs(null)
    setAudioIpfs(null)
    setName(null)
    setDescription(null)
    setAudioUploading(false)
    setImageUploading(false)
    setResult(null)
    setModal(false)
  }

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
  <>
    <Button onClick={()=>{setModal(true)}} style={{borderRadius:12, width:125, height: 40, border: "2px solid rgb(231, 234, 243)",}}>Mint NFT</Button>
    <Modal
        visible={modal}
        title="Mint Your NFT"
        onCancel={()=>{setModal(false)}}
        footer={[]}
      >
      <div>{
        !result &&
        <Spin
          spinning={pending}
          tip={"Data is being uploaded to IPFS..."}
        >
          <Input
            placeholder="Name"
            //addonBefore="Name"
            size="large"
            onChange={handleNameChange}
          />
          <TextArea
            placeholder="Description"
            size="large"
            autoSize={{ minRows: 2, maxRows: 5 }}
            onChange={handleDescriptionChange}
          />

          <Spin tip="Uploading To IPFS..." spinning={isImageUploading}>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
            >
              {image ? (
                <img

                  src={imageUrl}
                  alt="Image"
                  style={{
                    width: '100%',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Spin>
          {imageIpfs &&
            <Alert message={

              <Link href={imageIpfs.ipfsPublicGatewayUrl} target="_blank">
                Image has been uploaded to IPFS successfully.
              </Link>
            } type="success" />

          }

            <div>

              <Spin tip="Uploading To IPFS..." spinning={isAudioUploading}>
                <Upload
                  name="audio"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleAudioChange}
                >
                  {image ? (
                    <div>
                      {loading ? <LoadingOutlined /> : <BsFileEarmarkMusic />}
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload New Audio File
                      </div>
                    </div>

                  ) : (
                    uploadMusicButton
                  )}
                </Upload>
              </Spin>
              {audio &&
                <audio
                  src={audioUrl}
                  controls
                />

              }
              {audioIpfs &&
                <Alert message={

                  <Link href={audioIpfs.ipfsPublicGatewayUrl} target="_blank">
                    Audio has been uploaded to IPFS successfully.
                  </Link>
                } type="success" />

              }
            </div>

            <Button type="primary" shape="round" icon={<SaveOutlined />} size="large"
              disabled={!(name && description && imageIpfs && audioIpfs)}
              onClick={handleClick}
            >
              Mint NFT
            </Button>
          </Spin>
        }

        {result &&
          <Result
            status="success"
            title="Successfully Uploaded Metadata to IPFS!"
            subTitle={
              <div>
                <Text type="secondary">Your NFT metadata saved in IPFS. </Text>

                <Link href={getIPFSLink(result.value.url)} target="_blank">
                  You can check it by clicking here.
                </Link>
              </div>

            }
            extra={[
              <Button type="primary" key="console" icon={<SaveOutlined />}
                onClick={submitNft}
              >
                Submit To Blockchain And Mint Your Music NFT
              </Button>,
              <Button onClick={()=>{setModal(false),setAllStates()}} danger key="cancel" icon={<DeleteOutlined />}>Cancel</Button>,
            ]}
          />

        }

        </div>
      </Modal>
  </>
   
  )
}