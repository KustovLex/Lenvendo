import React from "react";
import { inject, observer } from "mobx-react";
import { ApplicationStore } from "../../store/applicationStore";
import "./style.scss";

interface IProps { }

interface IInjectedProps {
  applicationStore: ApplicationStore;
}

@inject("applicationStore")
@observer
export class Header extends React.Component<IProps>{
  get injected() {
    return this.props as IInjectedProps;
  }

  constructor(props: IProps) {
    super(props);
  }

  addBlock(e: any) {
    e.preventDefault();
    this.injected.applicationStore.addBlock();
  }

  render(){

    return(
      <div className="header">
        <div className="header-action">
          <button className="header-action__button" onClick={(e) => this.addBlock(e)}>
            Create block
            </button>
          <div className="header-action__help">
            Create a random block
            </div>
        </div>
        <div className="header-scoreboard">
          <div className="header-scoreboard__row">
            <div className="header-scoreboard__label">
              Total:
              </div>
            <div className="header-scoreboard__data">
              {this.injected.applicationStore.getTotal}
            </div>
          </div>
          <div className="header-scoreboard__row">
            <div className="header-scoreboard__label">
              Selected:
              </div>
            <div className="header-scoreboard__data">
              {this.injected.applicationStore.getSelectedCount}
            </div>
          </div>
          <div className="header-scoreboard__row">
            <div className="header-scoreboard__label">
              Red selected:
              </div>
            <div className="header-scoreboard__data">
              {this.injected.applicationStore.getRedSelectedCount}
            </div>
          </div>
          <div className="header-scoreboard__row">
            <div className="header-scoreboard__label">
              Green selected:
              </div>
            <div className="header-scoreboard__data">
              {this.injected.applicationStore.getGreenSelectedCount}
            </div>
          </div>
        </div>
      </div>
    )
  }
}