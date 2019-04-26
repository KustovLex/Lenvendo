import React from 'react';
import { Provider } from "mobx-react";
import { ApplicationStore } from "../../store/applicationStore";
import { Board } from '../../components/board';
import "./style.scss"
export class App extends React.Component <{}> {

  render(){
    return (
      <Provider applicationStore = { new ApplicationStore()}>
        <Board />
      </Provider>
    );
  }
}