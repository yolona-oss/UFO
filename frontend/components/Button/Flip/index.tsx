import React from 'react'

import styles from './FilpButton.module.scss'

export default function(props: {front: string, back: string, color: string, backgroun: string}) {
        return (
                <div
                        className={styles["btn-flip"]}
                        data-back={props.back}
                        data-front={props.front}
                        style={{
                                "--flip-button-color": props.color,
                                "--flip-button-background": props.backgroun
                        }}
                />
        )
}
