import React, { startTransition, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import YoutubeComponent from './YoutubeComponent'
import { Row, Col, Slider, InputNumber, Input, Button, Spin, Result, Typography } from 'antd'
import getTimeRepresantation from 'scripts/getTimeRepresantation';
import { DeleteOutlined, SaveFilled, SaveOutlined, WarningOutlined, YoutubeFilled, YoutubeOutlined, CloseOutlined } from '@ant-design/icons';
import timeToNumber from 'scripts/timeToNumber';
import uploadData from 'scripts/uploadData';
import getIPFSLink from 'scripts/getIPFSLink';
const { Text, Link } = Typography;


export default function SelectVideoRange(props) {

    //props: tokenId and moralis hooks

    const [urlWarning, setUrlWarning] = useState();
    const [videoUrl, setVideoUrl] = useState(false);
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [videoDuration, setVideoDuration] = useState();
    const [pending, setPending] = useState(false);
    const [result, setResult] = useState();

    const formatter = (value) => {
        return getTimeRepresantation(value);
    }



    const handleSliderChange = (value) => {
        setStart(value[0]);
        setEnd(value[1]);
    }

    const handleStartChange = (value) => {
        setStart(value);
    }

    const handleEndChange = (value) => {
        setEnd(value);
    }

    const handleUrlChange = (url) => {
        url = url.target.value;
        if (ReactPlayer.canPlay(url)) {
            setUrlWarning(false);
            setVideoUrl(url);
        } else {
            setUrlWarning(true);
        }
        console.log(urlWarning);
    }

    const handleDuration = (duration) => {
        setVideoDuration(duration);
        setStart(0);
        setEnd(0);
        setEnd(Math.floor(2 * duration / 3))
        setStart(Math.floor(duration / 3));
    }

    const handleSubmit = async () => {
        setPending(true);
        const data = {
            videoUrl: videoUrl,
            start: start,
            end: end
        };
        console.log(JSON.stringify(data))
        let result = await uploadData(JSON.stringify(data));
        console.log(result);
        setResult(result);
    }

    if (start > end) {
        let temp = start;
        setStart(end);
        setEnd(temp);
    }

    return (
        <div>
            {!result && <div>
                <Spin
                    spinning={pending}
                    tip={"Data is being uploaded to IPFS..."}
                >

                    <Input
                        prefix={<YoutubeOutlined />}
                        suffix={urlWarning && <WarningOutlined />}
                        placeholder="Youtube Video URL"
                        onChange={handleUrlChange}
                        type="url"
                    />

                    <YoutubeComponent
                        url={videoUrl}
                        //start={start}
                        //end={end}
                        handleDuration={handleDuration}
                    />

                    <Slider
                        range={{ draggableTrack: true }}
                        defaultValue={[0, 0]}
                        max={videoDuration}
                        tipFormatter={formatter}
                        onChange={handleSliderChange}

                        value={[start, end]}
                    />

                    <InputNumber
                        min={0}
                        max={videoDuration}
                        formatter={formatter}
                        parser={timeToNumber}
                        onChange={handleStartChange}
                        value={start}
                    />
                    <InputNumber
                        min={0}
                        max={videoDuration}
                        formatter={formatter}
                        parser={timeToNumber}
                        onChange={handleEndChange}
                        value={end}
                    />
                    <Button
                        type="primary"
                        shape="round"
                        icon={<SaveOutlined />}
                        size={"large"}
                        onClick={handleSubmit}

                    >
                        Save The Video Timestamp Data To IPFS
                    </Button>
                </Spin>
            </div>}

            {result?.ok == true && <div>
                <Result
                    status="success"
                    title="Successfully Uploaded Data to IPFS!"
                    subTitle={
                        <div>
                            <Text type="secondary">Your video timestamp data saved in IPFS. </Text>

                            <Link href={getIPFSLink(result.value.url)} target="_blank">
                                You can check it by clicking here.
                            </Link>
                        </div>

                    }
                    extra={[
                        <Button type="primary" key="console" icon={<SaveOutlined />}>
                            Submit To Blockchain
                        </Button>,
                        <Button danger key="cancel" icon={<DeleteOutlined />}>Cancel</Button>,
                    ]}
                />
            </div>
            }

            {result?.ok == false &&
                <Result
                    status="error"
                    title="Data Uploading Failed"
                    subTitle={
                        <div>
                            <Text type="secondary">Please try again. </Text>
                        </div>

                    }
                    extra={[
                        <Button danger key="close" icon={<CloseOutlined />}>Close</Button>,
                    ]}
                />
            }

        </div>
    )
}