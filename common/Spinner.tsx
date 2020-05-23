import * as React from 'react';
import {CSSProperties} from "react";
import { BounceLoader } from 'react-spinners';
import {store} from "./state/types";
import {connect} from "net";

interface SpinnerState {
  loading: boolean
}

// {props}, {state}
export default class Spinner extends React.Component <{}, SpinnerState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    store.subscribe(() => {
      this.setState({
        loading: store.getState().loading
      });
    });
  }

  render() {
    const loader: CSSProperties = {
      position: 'fixed',
      bottom: '15px',
      right: '15px',
      width: '30px',
      height: '30px',
      zIndex: 9999
    };

    return (
      <div style={loader} className='d-inline sweet-loading'>
        <BounceLoader
          color={'#007bff'}
          loading={this.state.loading}
          size={30}
        />
      </div>
    )
  }
}