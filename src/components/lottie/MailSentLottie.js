import React, { useState } from 'react'
// import { useLottie } from "lottie-react";
import { Player } from '@lottiefiles/react-lottie-player';
const MailSentLottie = () => {
    const [complete, setComplete] = useState(false)
    const style = {
        height: '300px',
        width: '300px'
    };

    const onComplete = () => { setComplete(true) }
    return (
        <>
            <Player
                autoplay
                loop='false'
                keepLastFrame='false'
                src="https://assets6.lottiefiles.com/packages/lf20_pwppxjbo.json"
                style={style}

                onEvent={event => {
                    if (event === 'complete') onComplete() // check event type and do something
                }}
            >
            </Player>
            {/* {complete ? 'hiiiii' : false} */}
        </>
    );
}

export default MailSentLottie