import React, { useEffect, useState, useRef } from 'react'

import styles from './Main.module.scss'

import Space from 'components/Background/Space'
import Background from 'components/Background'
import AudioSpectrum from 'react-audio-spectrum'
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';
import { AudioVisualizerStatus, useAudioVisualizerContext } from 'react-audio-visualizers-core';
import {Section, SubSection} from 'components/Section'
import Slider, { Node as SliderNode } from 'components/Slider/index_v1'
import WordRotationer, { Word } from 'components/Effects/WordRotate'
import { current } from '@reduxjs/toolkit'

export default React.forwardRef(({showcase}: Props, ref: React.Ref<HTMLDivElement>) => {
        let sectionRef = React.createRef<HTMLDivElement>()
        const { audioContext, analyser, status } = useAudioVisualizerContext();

        useEffect(() => {
                if (status == "PAUSED") {
                        audioContext?.resume()
                }
        }, [])

        useEffect(() => {
                if (status == "PAUSED") {
                        audioContext?.resume()
                }
        }, [status])

        return (
                <Section disablenav id="main">
                        <Space />
                        <SubSection ref={sectionRef} title="" id="main" css_class="section-main">
                                <div className={styles.wrapper}>
                                        <Background layer={-1} style={{background: "transparent"}}>
                                                <SpectrumVisualizer
                                                        audio="/audio/Aomine Daiki.m4a"
                                                        theme={SpectrumVisualizerTheme.radialSquaredBars}
                                                        colors={['#009688', '#26a69a']}
                                                        iconsColor="transparent"
                                                        backgroundColor="transparent"
                                                        showMainActionIcon
                                                        // showMainActionIcon
                                                        showLoaderIcon
                                                        // highFrequency={20000}
                                                        />
                                        </Background>
                                        <div ref={ref} className={styles.content}>
                                                <div className={styles["title-content"] + " segment"}>
                                                        <div className={styles["small-description"]}>
                                                                <p>UFO Records - студия звукозаписи</p>
                                                        </div>
                                                        <div className={styles["title"]}>
                                                                <h1>
                                                                        <span><b>Сведение треков & запись</b></span>
                                                                        <br/>
                                                                        <WordRotationer>
                                                                                <Word className="_1">Быстро</Word>
                                                                                <Word className="_2">Качественно</Word>
                                                                                <Word className="_3">На трапе</Word>
                                                                                <Word className="_4">У Тантала</Word>
                                                                        </WordRotationer>
                                                                </h1>
                                                        </div>
                                                        <div className={styles["note"]}>
                                                                <p><span className="material-symbols-outlined">home</span>Продам гораж<br/>
                                                                        <i>г. Краснодар улица-хуюлица дон</i></p>
                                                        </div>
                                                </div>
                                                <div className={styles.slider}>
                                                        <Slider
                                                                interval={5000}
                                                                height="8rem"
                                                                visibleNodes={3}

                                                                scrollPadding="1rem"
                                                                nodeClass={styles["slider-node"]}
                                                                activeNodeClass={styles["slider-node-active"]}
                                                        >
                                                                {showcase.map((( item, i ) => (
                                                                        <SliderNode  key={i}>
                                                                                <div className={styles["slider-node-title"]}>{item.title}</div>
                                                                                <div className={styles["slider-node-content"]}>
                                                                                        {item.content}
                                                                                </div>
                                                                        </SliderNode>
                                                                )))}
                                                        </Slider>
                                                </div>
                                        </div>
                                </div>
                                <div className={styles["bottom-content"]}>
                                        Мы тут не хуйней занимаемся
                                </div>
                        </SubSection>
                </Section>
        )
})

interface showcaseItem {
        title: string
        content: string
}

interface Props {
        showcase: showcaseItem[]
}
