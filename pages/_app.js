import '@/styles/globals.css';
import 'react-notifications/lib/notifications.css';
import { Provider, useStore } from 'react-redux';
import { store, persistor } from '@/store';
import Loader from '@/components/Loader';
import { NotificationContainer } from 'react-notifications';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { wrapper } from "../store";

function App({ Component, pageProps }) {
    const store = useStore((state) => state);

    return (
        // <Provider store={store}>
            <PersistGate
                persistor={store.__persistor}
                loading={<div>loading..</div>}
            >
                <NotificationContainer />
                <Loader />
                <Component {...pageProps} />
            </PersistGate>
        // </Provider>
    );

    // return (
    //     // <Provider store={store}>
    //         {/* <PersistGate loading={null} persistor={persistor}> */}
    //         <PersistGate persistor={store.__persistor} loading={null}>
    //             <NotificationContainer />
    //             <Loader />
    //             <Component {...pageProps} />
    //          </PersistGate>
    //     {/* // </Provider> */}
    // );
}

export default wrapper.withRedux(App);
