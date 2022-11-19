import React from 'react'

import styles from './GlowingButton.module.scss'

export default function({children, onClick = () => {}, fontSize = "1rem"}) {
        return (<button className={styles.button} role={"button"} onClick={onClick} style={{ fontSize: fontSize }}>{children}</button>)
}
