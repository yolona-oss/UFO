import React, { useEffect, useState } from 'react'

import IsVisible from 'react-is-visible'

// import { useSelector, useDispatch } from 'react-redux'
// import { setActive, addSection, removeSection } from 'store/reducers/sectionSwitchReducer'

import { ISection } from './../types'

import Nav from './Nav'

import styles from './../styles/Section.module.scss'

interface Props {
        children?: React.ReactNode
        title?: string
        id: string
        disablenav?: boolean
}

export default function(props: Props) {
        const children = props.children
        const childArray = React.Children.toArray(children)
        const title = props.title
        const sections: ISection[] = childArray.filter((child: any) => {
                if (child.props?.id) {
                        return true
                }
        }).map((child: any) => {
                return {
                        value: child.props.title ?? "",
                        link: child.props.id
                }
        })
        const id = props.id

        let [ activeSectionId, setActiveSectionId ] = useState("")

        return (
                <div id={id} className={styles.section}>
                        {React.Children.map(children, (child: any, i) => {
                                if (child.props.id) {
                                        return (
                                                <IsVisible once={false}>
                                                        {(( isVisible: boolean ) => {
                                                                if (isVisible) {
                                                                        console.log("visible new", child.props.id)
                                                                        setActiveSectionId(child.props.id)
                                                                }
                                                                return React.cloneElement(child, {
                                                                        // @ts-ignore
                                                                        ...child.props,
                                                                        children: "",
                                                                        isActive: child.props.id == activeSectionId,
                                                                        key: i,
                                                                }, child.props.children)
                                                        })}
                                                </IsVisible>
                                        )
                                } else {
                                        return child
                                }
                        })}
                        {!props.disablenav ?
                                <Nav
                                        title={title ?? "Навигация"}
                                        sections={sections}
                                        activeSubSection={activeSectionId}
                                        />
                                : null}
                </div>
        )
}
