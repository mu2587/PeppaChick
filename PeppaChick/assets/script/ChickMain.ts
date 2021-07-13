// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ButtonScript from "./ButtonScript";
import MovieClip from "./mu/flash/MovieClip";
import Utils from "./mu/tool/Utils";
import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChickMain extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    
    public playerCtrl:Player;
    public player_mc:MovieClip;
    public score_mc:ButtonScript;

    onLoad () 
    {


        this.playerCtrl = this.node.getChildByName("Henhouse").getChildByName("player_mc").getComponent("Player");
        this.player_mc = this.node.getChildByName("Henhouse").getChildByName("player_mc").getComponent("MovieClip");
        this.score_mc = this.node.getChildByName("Henhouse").getChildByName("score_mc").getComponent("ButtonScript");

        this.player_mc.init();
        this.player_mc.frames[1].duration = 5;
        cc.log("onLoad    ----    this.player_mc = " + this.playerCtrl);
//         this.player_mc = cc.find("Henhouse/player_mc", this.node);
        //this.player_mc = cc.find("Henhouse/player_mc", this.node);

        //cc.director.getScene().children[0] == cc.Canvas.instance.node
    }

    

    start () 
    {
        this.node.on("mousedown", this.onMouseDown, this);
        // this.node.on("mousedown", evt => {
        //                 this.onMouseDown(evt);
        //             });
        // this.node.on("mousedown", () => {this.onMouseDown()});
    }

    protected onMouseDown(e:cc.Event.EventMouse):void
    {
        //this.node.
        cc.log("click   ----    this.player_mc = " + this.playerCtrl);
        cc.log("click X = " + e.getLocationX() + "     y = " + e.getLocationY());
        //Utils.localConvertWorldPoint(this.player_mc);
        

        //Platforms.p0n2n
        this.playerCtrl.setPosition(e.getLocationX() - 550, e.getLocationY() - 320);
        this.score_mc.addScore(1);
        //this.player_mc.x = e.getLocationX();
        //this.player_mc.y = e.getLocationY();
    }
    // update (dt) {}
}
