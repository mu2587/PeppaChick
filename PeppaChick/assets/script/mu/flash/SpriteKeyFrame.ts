// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpriteKeyFrame extends cc.SpriteFrame {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    //持续时间
    public duration:number = 1;
    //给帧命名的位置
    public frameName:string = null;
    
    public isStartStop:boolean = false;
    public isOverStop:boolean = false;

    //动画开始时执行的方法.
    public startFunction:Function = null;

    //动画播放完成的回叫函数
    public endFunction:Function = null;
}
