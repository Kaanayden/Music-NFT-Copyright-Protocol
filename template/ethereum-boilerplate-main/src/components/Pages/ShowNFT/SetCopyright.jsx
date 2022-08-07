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
import SelectVideoRange from 'components/SelectVideoRange';

const { Meta } = Card;


export default function SetCopyright(props) {


    const { data, onFinish } = props

    console.log("2data", data)


    const [visible, setVisible] = useState(false);
    console.log("inside", data)

    const handleClick = () => {
        setVisible(true);
    }

    const handleFinish = () => {
        setVisible(false);
        onFinish();
    }


    if (data) {
        return (
            <div>

                <Card style={{ width: 300, marginTop: 16 }} key={data.args.copyrightId} hoverable onClick={handleClick}>
                    <Meta
                        avatar={
                            <Badge count={data.args.copyrightId.toNumber()} showZero size="small">
                                <CopyrightOutlined />
                            </Badge>
                        }
                        title={"Non Used Copyright Slot"}
                        description={"Buy Price: " + data.args.price.toNumber()}
                    />
                </Card>

                <Modal title="Basic Modal"
                    visible={visible}
                    footer={null}
                    onCancel={() => setVisible(false)}
                >
                    <SelectVideoRange tokenId={data.args.tokenId} copyrightId={data.args.copyrightId} onFinish={handleFinish} />
                </Modal>

            </div>
        );
    } else {
        return (
            null
        );
    }

}