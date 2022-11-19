import React from 'react'
// import { findDOMNode } from 'react-dom'
import Script from 'next/script'
import Background from 'components/Background'

export default function() {
        // const ref = React.createRef<HTMLDivElement>()
        // let wave

        return (
                <Background>
                        <Script src="/third-party/circular-audio-wave.min.js"
                                onReady={() => {
                                        let wave = new CircularAudioWave(document.querySelector("#asdf"));
                                        wave.loadAudio('/audio/Resonance.mp3').then(() => {
                                                console.log("Loaded")
                                                wave.play()
                                        })
                                }}
                                />
                        <div id={"asdf"} style={{width: "100%", height: "100%"}}/>
                </Background>
        )
}
