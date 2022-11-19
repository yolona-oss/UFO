import React from 'react'
import Image from 'next/image'
import Navigation from 'NavigationConfig'

import styles from './../../styles/Menu.module.scss'

import NavLink from './../Navbar/NavLink'
import Button from 'components/Button'
import SocialLink from 'components/Link/Social'
import MenuBackground from 'components/Background/GlowingSphere'
import { motion } from 'framer-motion'

interface Props {
        isToggled: () => boolean
}

function MenuSocials() {
        return (
                <div className={styles["links"]}>
                        <div className={"flex justify-center align-center"}>
                                <SocialLink
                                        href="https://tg.link..."
                                        color="red"
                                        image={
                                        <Image alt="blue" src="/images/social/vk.png" width={50} height={50} />
                                }
                                        />
                                <SocialLink
                                        href="https://vk.com..."
                                        color="blue"
                                        image={
                                        <Image alt="red" src="/images/social/telegram.png" width={50} height={50} />
                                }
                                        />
                        </div>
                </div>
        )
}

function VerticalMenu() {
        return (
                <div className={styles.nav}>
                        {Navigation.map(( link, i ) => (
                                <NavLink key={i} href={link.href}>
                                        <Button borderColor="#5d009f" fontSize="1.5rem" width="6rem" centred>
                                                {link.linkName}
                                        </Button>
                                </NavLink>
                        ))}
                </div>
        )
}

export default function({isToggled}: Props) {
        const menuClasses = styles.menu + (isToggled() ? "" : " disabled")

        return (
                <motion.div
                        animate={isToggled() ? "show" : "hide"}
                        transition={{ duration: 0.3 }}
                        variants={{
                                show: { opacity: 1 },
                                hide: { opacity: 0 }
                        }}
                        initial="hide"
                        style={{ position: "absolute" }}
                >
                        <div className={menuClasses}>
                                <div className={styles["fullscreen-menu"]}>
                                        <MenuBackground />
                                        <div className={styles.content}>
                                                <div className={styles["content-wrapper"]}>
                                                        <VerticalMenu />
                                                        <div className={styles.profile}>
                                                        </div>
                                                </div>
                                                <MenuSocials/>
                                        </div>
                                </div>
                        </div>
                </motion.div>
        )
}
