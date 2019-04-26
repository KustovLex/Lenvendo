import React from "react";
import { inject, observer } from "mobx-react";
import { ApplicationStore } from "../../store/applicationStore";
import { Block } from "../block";
import "./style.scss";
import { Header } from "../header";
import { Popups } from "../popups";

interface IProps{}

interface IInjectedProps {
  applicationStore: ApplicationStore;
}

@inject("applicationStore")
@observer
export class Board extends React.Component<IProps>{
  get injected() {
    return this.props as IInjectedProps;
  }

  constructor(props: IProps) {
    super(props);
  }

  render(){
    return(
      <div className="wrapper">
        <Header />
        <div className="board">
        
          {this.injected.applicationStore.blocks.length > 0 &&
            <div className="board__title">Blocks</div>
          }
          <div className="board__inner">
            {this.injected.applicationStore.blocks.map(block => (
              <Block key={block.id} block={block} />
            ))}
          </div>
        </div>
        <Popups />
      </div>
    )
  }
}