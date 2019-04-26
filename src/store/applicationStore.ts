import { BlockModel } from "../models/blockModel";
import { observable, computed } from "mobx"
import * as _ from "lodash";

export class ApplicationStore{
  @observable blocks: Array<BlockModel>;
  typeOfBlock: Array<string>;
  colorOfType: Array<string>;
  @observable popupToggle: boolean;
  blockToDelete: BlockModel;
  
  @computed get getTotal() {
    return this.blocks.length;
  }
  
  @computed get getSelectedCount() {
    return this.blocks.filter(block => block.isSelected === true).length;
  }
  
  @computed get getGreenSelectedCount() {
    return this.blocks.filter(block => block.isSelected === true && block.type === "green").length;
  }
  
  @computed get getRedSelectedCount() {
    return this.blocks.filter(block => block.isSelected === true && block.type === "red").length;
  }

  constructor(){
    this.blocks = new Array<BlockModel>();
    this.typeOfBlock = ["default","red","green"];
  }

  addBlock(){
    var block: BlockModel = {
      id: +_.uniqueId(),
      text: this.getName(),
      type: this.getType(),
      isSelected: false
    }
    this.blocks.push(block);
  }

  removeBlock(block: BlockModel = null){
    if (!block && !this.blockToDelete) return;
    if(!block){
      this.blocks = this.blocks.filter(b => b !== this.blockToDelete);
      this.popupToggle = false;
    }
    else
      this.blocks = this.blocks.filter(b => b !== block);
  }

  selectBlock(block: BlockModel) {
    block.isSelected = !block.isSelected;
  }

  changeColor(block: BlockModel){
    if(block.type === "default") return;
    if(block.type === "green")
      block.type = "red";
    else if(block.type === "red")
      block.type = "green";
  }

  getName(){
    return Math.random().toString(36).substring(2, 15);
  }

  getType(){
    return this.typeOfBlock[Math.floor(Math.random() * this.typeOfBlock.length)];
  }

  popupShow(block: BlockModel){
    this.popupToggle = true;
    this.blockToDelete = block;
  }

  popupHide(){
    this.popupToggle = false;
    this.blockToDelete = null;
  }
}