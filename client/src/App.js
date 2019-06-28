import React from 'react';
import Main from './container/main';
import { initializeWeb3Api } from './provider/web3provider';

import "./App.scss";

  export default function App() {
    const [state, setState] = React.useState({
      loading: true,
    });

    // Initial web3
    const init = async() => {
      return await initializeWeb3Api();
    }
    init().then(()=>{
      setState({loading: false});
    }).catch((e)=>{
      console.log(e);
      setState({loading: false});
    });

    return (
      <Main loading = {state.loading} />
    );
  }
