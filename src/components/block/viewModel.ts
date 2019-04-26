import { BlockModel } from "../../models/blockModel";
import { ApplicationStore } from "../../store/applicationStore";

export class BlockViewModel{
  block: BlockModel;
  className: string;
  timer: number;
  applicationStore: ApplicationStore;

  constructor(block: BlockModel, applicationStore: ApplicationStore){
    this.block = block;
    this.applicationStore = applicationStore;
    this.className = this.getClassName();
  }

  getClassName(){
    var className = "block"

    if (this.block.isSelected)
      className += " is-selected";

    className += " block--"+this.block.type;

    return className;
  }

  onClicked() {
    if (this.timer)
      return

    this.timer = window.setTimeout(() => {
      this.applicationStore.selectBlock(this.block);
      this.timer = null;
    }, 200);
  };

  onDoubleClicked() {
    clearTimeout(this.timer);
    this.timer = null;
    this.applicationStore.changeColor(this.block);
  }

  onRemove(){
    if (this.block.type === "default")
      this.applicationStore.removeBlock(this.block);
    else
      this.applicationStore.popupShow(this.block);
  }
}