
import React, { useState } from 'react'
import { Input } from 'antd';

const { TextArea } = Input;


export default function MintNFT(props) {



    return (
        <div>

            <Input
                placeholder="Name"
                //addonBefore="Name"
                size="large"
            />
            <TextArea
                placeholder="Description"
                size="large"
                autoSize={{ minRows: 2, maxRows: 5 }}
            />

        </div>
    );
}