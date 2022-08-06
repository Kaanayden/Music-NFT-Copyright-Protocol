import React from 'react'
import ReactPlayer from 'react-player/youtube'


export default function YoutubeComponent(props) {

    return (
        <ReactPlayer url = {props.url}
            controls={true}
            playsinline={true}
            loop={true}
            onDuration={
                ( duration ) => props.handleDuration( duration )
            }
            config={{
                youtube: {
                    playerVars: {
                        start: props.start,
                        end: props.end
                    }
                }
            }
            }
        />
    )
}