import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import withRedux from "next-redux-wrapper";
import makeStore from '../store/store';
import { ThemeProvider } from '@chakra-ui/core';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return { pageProps: pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        // hack 
        const props: any = this.props;
        const store = props.store;

        return (
            <Provider store={store}>
                <ThemeProvider>
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        );
    }
}


export default withRedux(makeStore)(MyApp);