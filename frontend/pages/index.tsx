import React from 'react'
import { NextRequest, NextResponse, userAgent } from 'next/server'

import Layout from 'components/Layout'
import {ScrollTopButton, ScrollTopAnchor} from 'components/ScrollTop'
// @ts-ignore
import { useIsVisible } from 'react-is-visible'
const SideRiseMenu = React.lazy(() => import('components/SideRiseMenu'))

import Main from 'sections/Main'
const Blog = React.lazy(() => import('sections/Blog'))
const Recording = React.lazy(() => import('sections/Recording'))
const Bits = React.lazy(() => import('sections/Bits'))
const Studio = React.lazy(() => import('sections/Studio'))

export function middleware(request: NextRequest) {
        const url = request.nextUrl
        const { device } = userAgent(request)
        const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
        url.searchParams.set('viewport', viewport)
        return NextResponse.rewrite(url)
}

export default ({showcase, studio}: Props) => {
        let mainSectionRef = React.createRef<HTMLDivElement>()
        let isMainSectionVisible = useIsVisible(mainSectionRef)

        return (
                <Layout>
                        <ScrollTopAnchor />
                        <React.Suspense>
                                <Main showcase={showcase} ref={mainSectionRef} />
                        </React.Suspense>
                        <React.Suspense>
                                <Recording />
                        </React.Suspense>
                        <React.Suspense>
                                <Studio studio={studio} />
                        </React.Suspense>
                        <React.Suspense>
                                <Bits />
                        </React.Suspense>
                        <React.Suspense>
                                <Blog />
                        </React.Suspense>
                        <ScrollTopButton ignoreElement={mainSectionRef} />
                        <React.Suspense>
                                <SideRiseMenu fullHide={() => isMainSectionVisible}>
                                        <p>asdlfjaorigjaer jgoearpig japoerig j</p>
                                        <p>aoerigjaeog aeorig j</p>
                                </SideRiseMenu>
                        </React.Suspense>
                </Layout>
        )
}

import showcase from './../fakedataset/showcase.js'
import studioGalery from './../fakedataset/studiogalaery.js'

export async function getServerSideProps(): Promise<{props:Props}> {
        return {
                props: {
                        showcase: showcase,
                        studio: { galery: studioGalery }
                },
        }
}

interface Props {
        studio: {
                galery: {
                        file: string
                        title: string
                }[]
        },
        showcase: {
                title: string
                content: string
        }[]
}
