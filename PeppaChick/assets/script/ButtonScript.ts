// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonScript extends cc.Component 
{

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    private score:number = 0;
    //private label:cc.Node;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.label = this.node.getChildByName("Henhouse").getChildByName("score_mc");
        //this.label = this.node.getComponent("score_mc");
        this.label = this.node.getComponent(cc.Label);
        cc.log("onload   this.label = " + this.label);
    }

    start () {

    }

    public setScore(num:number):void
    {
        this.score = num;
        this.refreshScore();
    }

    public addScore(num:number):void
    {
        this.score += num;
        this.refreshScore();
    }

    public refreshScore():void
    {
        cc.log("this.label = " + this.label);
        cc.log("this.score = " + this.score);
        this.label.string = this.score.toString();
    }
    // update (dt) {}
}
