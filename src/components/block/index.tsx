import React from "react";
import { BlockModel } from "../../models/blockModel";
import { inject, observer } from "mobx-react";
import { ApplicationStore } from "../../store/applicationStore";
import { BlockViewModel } from "./viewModel";
import './style.scss'
import * as _ from "lodash";

interface IProps{
  block: BlockModel;
}

interface IInjectedProps {
  applicationStore: ApplicationStore;
}

@inject("applicationStore")
@observer
export class Block extends React.Component<IProps>{
  viewModel: BlockViewModel;

  get injected() {
    return (this.props as unknown) as IInjectedProps;
  }

  constructor(props: IProps) {
    super(props);

    this.viewModel = new BlockViewModel(props.block, this.injected.applicationStore);
  }

  onRemove(){
    this.viewModel.onRemove();
  }

  onClicked() {
    this.viewModel.onClicked();
  };

  onDoubleClicked() {
    this.viewModel.onDoubleClicked();
  }

  render(){

    return(
      <div
      className={this.viewModel.getClassName()}
        onClick={() => this.onClicked()} onDoubleClick={() =>this.onDoubleClicked()}>
        <div className="block__close" onClick={()=>this.onRemove()}></div>
        <div className="block__text">
          {this.viewModel.block.text}
        </div>
      </div>
    )
  }
}