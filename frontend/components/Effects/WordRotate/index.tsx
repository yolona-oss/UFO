import React, { useEffect, useRef } from 'react'

import Space from './../../Space'

import styles from './WordRotate.module.scss'

export const Word = React.forwardRef(({children, className, visible}: WordProps, ref: React.Ref<HTMLElement>) => {
        return (
                <span ref={ref} className={styles["word"] + (className ? ` ${className}` : "")} style={{ opacity: `${(visible ? 1 : 0)}` }}>
                        {Array.from(children as string).map(( letter, i ) => (
                                <span key={i}>{letter == ' ' ? <Space /> : letter}</span>
                        ))}
                </span>
        )
})

function WordRotate({children, interval = 4000}: Props) {
        let words = useRef<Map<number, HTMLElement>>(new Map<number, HTMLElement>())

        useEffect(() => {
                const rotate = () => {
                        const nextWillHopeHead = currentWordInd == words.current.size-1
                        const currentWordElement = words.current.get(currentWordInd)
                        let nextWordElement = nextWillHopeHead ? words.current.get(0) : words.current.get(currentWordInd + 1)

                        Array.from((currentWordElement as HTMLElement).children ).forEach((letter, i) => {
                                setTimeout(() => {
                                        letter.className = `${styles.letter} ${styles.out}`
                                }, i * 80)
                        })

                        nextWordElement!.style.opacity = "1";
                        Array.from((nextWordElement as HTMLElement).children).forEach((letter, i) => {
                                letter.className = `${styles.letter} ${styles.behind}`;
                                setTimeout(() => {
                                        letter.className = `${styles.letter} ${styles.in}`;
                                }, 340 + i * 80);
                        });

                        currentWordInd = nextWillHopeHead ? 0 : currentWordInd + 1
                }

                let currentWordInd = 0
                const intervalTimerId = setInterval(rotate, interval)

                return () => clearInterval(intervalTimerId)
        }, [])

        return (
                <div className={styles["rotating-text"]}>
                        <p>
                                {React.Children.map(children, (child, i) => {
                                        return React.cloneElement(child, {
                                                ...child.props,
                                                // @ts-ignore
                                                ref: (ref: any) => {words.current.set(i, ref); return true;},
                                                visible: (i == 0)
                                        })
                                })}
                        </p>
                </div>
        )
}

export default WordRotate

export interface WordProps {
        children?: React.ReactNode
        className?: string
        visible?: boolean
}

interface Props {
        children: React.ReactElement<typeof Word>[]
        interval?: number
}
