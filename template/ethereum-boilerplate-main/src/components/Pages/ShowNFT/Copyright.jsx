import React, { useState, useEffect } from 'react';
import { Collapse, Menu, Card, Badge, Statistic, Modal } from 'antd';
const { Panel } = Collapse;

import { CopyrightOutlined } from '@ant-design/icons';
import { BsPersonCheckFill, BsPersonPlusFill } from "react-icons/bs";
import { GrDocumentLocked } from "react-icons/gr"

import { useMoralisWeb3Api, useChain, useMoralis } from "react-moralis";
import contracts from '../../../contracts/contracts.json'
const contractAddress = contracts.mumbai;
import abi from '../../../contracts/contractAbi'
import getIPFSLink from 'scripts/getIPFSLink';
import getTimeRepresantation from 'scripts/getTimeRepresantation';
import YoutubeComponent from 'components/YoutubeComponent';
import AddressLink from './AddressLink';

const { Meta } = Card;


export default function Copyright(props) {
    const { data } = props
    const [ipfsData, setIpfsData] = useState();
    const [visible, setVisible] = useState(false);
    console.log("inside", data)
    if (!ipfsData) {
        fetch(getIPFSLink(data.args.videoDataUrl))
            .then(result => result.json())
            .then(result => setIpfsData(result))
    }

    const handleClick = () => {
        setVisible(true);
    }


    if (ipfsData) {
        return (
            <div>

                <Card style={{ width: 300, marginTop: 16 }} key={data.args.copyrightId} loading={!ipfsData} hoverable onClick={handleClick}>
                    <Meta
                        avatar={
                            <Badge count={data.args.copyrightId.toNumber()} showZero size="small">
                                <CopyrightOutlined />
                            </Badge>
                        }
                        title={ipfsData?.videoUrl}
                        description={getTimeRepresantation(ipfsData?.start) + "-" + getTimeRepresantation(ipfsData?.end)}
                    />
                </Card>

                <Modal title="Basic Modal"
                    visible={visible}
                    footer={null}
                    onCancel={() => setVisible(false)}
                >
                    <YoutubeComponent url={ipfsData.videoUrl} start={ipfsData.start} end={ipfsData.end} playing={visible} />
                    <p>Owned by: {<AddressLink address={data.args.buyer} />}</p>
                    <p>{getTimeRepresantation(ipfsData?.start) + "-" + getTimeRepresantation(ipfsData?.end)}</p>
                </Modal>

            </div>
        );
    } else {
        return (
            <div>

                <Card style={{ width: 300, marginTop: 16 }} key={data.args.copyrightId} loading={!ipfsData} hoverable onClick={handleClick}>
                </Card>

            </div>
        );
    }

}