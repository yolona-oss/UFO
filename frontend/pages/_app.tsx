import '../styles/global.scss'
import type { AppProps } from 'next/app'
// import { wrapper, store } from "store"
// import { Provider } from "react-redux"

function App({ Component, pageProps }: AppProps) {
                        // <Provider store={store}>
                        // </Provider>
        return (
                <Component {...pageProps} />
        )
}

export default App

// export default wrapper.withRedux(App);
