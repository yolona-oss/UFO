import React, { useState } from 'react'
import Image from 'next/image'
import { hexToCSSFilter } from 'hex-to-css-filter';
import NavLink from './NavLink'

import { useAuth } from 'components/Auth/hooks'
import {FlipButton} from 'components/Button'
import Button from 'components/Button'
import Menu from 'components/Header/components/Menu'
import useWindowDimensions from 'hooks/useWindowDimensions'
import Floating from 'components/Effects/Floating'

import Navigation from 'NavigationConfig'

import styles from './../../styles/Navbar.module.scss'
import stylesMenu from './../../styles/Menu.module.scss'

function MenuButton({onClick, isToggled}: {onClick: () => void, isToggled: () => boolean}) {
        return (
                <div className={styles["menu-button"]}>
                        <div className={styles["menu-icon"]} onClick={onClick}>
                                {isToggled() ?
                                        (<>
                                                <span key={0} className={styles["rotate-45"] + ` ${styles.toggled}`}></span>
                                                <span key={1} className={styles["rotate45"]  + ` ${styles.toggled}`}></span>
                                        </>)
                                                :
                                        (<>
                                                <span key={0}></span>
                                                <span key={1}></span>
                                                <span key={2} className={styles.shorted}></span>
                                        </>)
                                }
                        </div>
                </div>
        )
}

export default function() {
        let winSize = useWindowDimensions()
        let [menuToggled, setMenuToggled] = useState(false)
        let [authedUser] = useAuth()

        const mainColor = (menuToggled ? styles.purple1 : styles.green )

        const logoFillColorStyle = {
                filter: hexToCSSFilter(mainColor, {acceptanceLossPercentage: 0.1, maxChecks: 100, forceFilterRecalculation: true}).filter
        }

        function toggleMenu() {
                setMenuToggled(!menuToggled)
        }

        // <span className={`${styles["go-down"]} material-symbols-outlined`}>south</span>
        const commonNavButtons = () => Navigation.map(( link, i ) => (
                <NavLink key={i} href={link.href}>
                        <FlipButton color="white" background="transparent" front={link.linkName} back="залупа"/>
                </NavLink>
        ))

        const authNavButtons = () => {
                if (authedUser) {
                        return <NavLink><Button version={19}>Logout</Button></NavLink>
                } else {
                        return (
                                <>
                                        <NavLink><Button version={19}>Login</Button></NavLink>
                                        <NavLink><Button version={19}>Logout</Button></NavLink>
                                </>
                        )
                }
        }

        return (
                <div className={"header " + stylesMenu.menu}>
                        <div className={styles["header-content"] + " segment"}>
                                <div className={styles["logo-wrapper"]}>
                                        <svg className={styles.logo} viewBox="0 0 100 100" style={logoFillColorStyle}>
                                                <g><path d={ufoSvgPath}/></g>
                                        </svg>)
                                        <span className={styles["title-wrapper"]}>
                                                <span style={{ color: mainColor }}>
                                                        <span className={styles.title}>UFORECORDS</span>
                                                </span>
                                                <Floating distance={"14px"}>
                                                        <span className={styles["ufo-ship"]}>
                                                                <Image
                                                                        src="/images/ufo.png"
                                                                        alt="ufo"
                                                                        width={32}
                                                                        height={32}
                                                                        />
                                                        </span>
                                                </Floating>
                                        </span>
                                </div>
                                <div className={styles.navbar}>
                                        {!menuToggled ? 
                                                winSize.width >= 1100 ? commonNavButtons() : null
                                                :
                                                authNavButtons()}
                                        <MenuButton onClick={() => { toggleMenu() }} isToggled={() => menuToggled}/>
                                </div>
                                <Menu isToggled={() => menuToggled}/>
                        </div>
                </div>
        )
}

const ufoSvgPath = "M43.87256,90.94519c3.49365,3.06519,8.76123,3.06824,12.25488,0 c10.98035-9.6333,29.40063-28.76392,29.40063-48.64594C85.52808,22.69946,69.59082,6.75476,50,6.75476 s-35.52808,15.9447-35.52808,35.54449C14.47192,62.18127,32.89221,81.31189,43.87256,90.94519z M62.04529,45.05988 c6.37634-6.37939,16.91772-5.88007,17.37488-5.84839c0.78589,0.04218,1.41345,0.66968,1.45557,1.45569 c0.02563,0.44653,0.53101,10.99689-5.84839,17.37482c-5.40479,5.40637-13.80566,5.86798-16.51489,5.86798 c-0.4873,0-0.79053-0.01508-0.85986-0.01959c-0.78589-0.0423-1.41357-0.6698-1.45569-1.45569 C56.17114,61.98816,55.66589,51.43781,62.04529,45.05988z M20.57983,39.21149c0.4541-0.02869,10.99854-0.53101,17.37488,5.84839 c6.37939,6.37793,5.87415,16.92828,5.84839,17.37482c-0.04211,0.78589-0.6698,1.41339-1.45569,1.45569 c-0.06934,0.00452-0.37256,0.01959-0.85986,0.01959c-2.70923,0-11.11011-0.46161-16.51489-5.86798 c-6.37939-6.37793-5.87402-16.92828-5.84839-17.37482C19.16638,39.88116,19.79395,39.25366,20.57983,39.21149z"
