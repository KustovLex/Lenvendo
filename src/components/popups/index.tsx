import React from "react";
import { inject, observer } from "mobx-react";
import { ApplicationStore } from "../../store/applicationStore";
import './style.scss';

interface IProps{}

interface IInjectProps{
  applicationStore: ApplicationStore;
}

@inject("applicationStore")
@observer
export class Popups extends React.Component<IProps>{
  
  get injected() {
    return this.props as IInjectProps;
  }

  constructor(props: IProps){
    super(props);
  }

  onClose(){
    this.injected.applicationStore.popupHide();
  }

  onRemove(){
    this.injected.applicationStore.removeBlock();
  }

  render(){

    return(
      <React.Fragment>
        <div className="popup"
          hidden={!this.injected.applicationStore.popupToggle}>
          <div className="popup__bg" onClick={() => { this.onClose() }}></div>
          <div className="popup__inner">
            <div className="popup__title">
              Do you want to remove this block?
            </div>
            <div className="popup__close" onClick={()=>{this.onClose()}}></div>
            <div className="popup__action">
              <button className="popup__button" onClick={() => { this.onRemove() }}>
                Yes, delete it
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}