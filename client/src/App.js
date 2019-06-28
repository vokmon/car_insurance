import React from 'react';
import Main from './container/main';
import { initializeWeb3Api } from './provider/web3provider';

import "./App.scss";

  export default function App() {
    const [state, setState] = React.useState({
      loading: true,
    });

    // Initialize web3
    async function initWeb3() {
      await initializeWeb3Api();
      setState({loading: false});
    }
    initWeb3();

    return (
      <Main loading = {state.loading} />
    );
  }
