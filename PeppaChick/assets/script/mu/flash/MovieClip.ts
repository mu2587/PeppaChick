// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SpriteKeyFrame from "./SpriteKeyFrame";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MovieClip extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property([ SpriteKeyFrame ])
    public frames:SpriteKeyFrame[] = [];
    protected _frameNum:number[] = [];

    //protected _currSpriteFrame:SpriteKeyFrame;
    //当前关键帧数组里的index,不是公开帧的.
    protected _keyFrameIndex:number = 0;

    //跳过关键帧检测.
    protected _jumpKeyFrameDetect:boolean = false;

    //总帧数
    protected _frameMaxNum:number = 0;

    @property
    protected _isPlay:boolean = false;
    
    @property
    protected _index:number = 0;

    protected _sprice:cc.Sprite = null;

    onLoad () 
    {
        this._sprice = this.getComponent(cc.Sprite);
    }
    // start () {}

    update (dt) 
    {
        //这里的index为公开的索引,而不是真正的贞索引;
        if(this._isPlay)
        {
            if(this._index >= this.frames.length)
            {
                this._index = 0;
            }
            else
            {
                this._index++;
            }

            if(this._jumpKeyFrameDetect)
                this.showFrame(this._index)
            else
            {
                this.showFrameByTimeLine(this._index);
            }
        }
    }

    protected showFrameByTimeLine(num:number):void
    {
        //临时的帧数
        let keyFrameNum:number = this.getKeyFrameNum(num);
        if(this._keyFrameIndex == keyFrameNum)
        {
            return;
        }
        else
        {
            if(this.frames[this._index].endFunction)
                this.frames[this._index].endFunction();
            this._keyFrameIndex = keyFrameNum;
            this.showFrame(this._keyFrameIndex);
        }
    }

    /**
     * 
     * 设置是否跳过关键帧检测机制（就是flash里的F6）
     * 如果跳过，则不去检测静止帧，其实是为了节省效能的一种方法。
     * 一定要在初始化的时候设置，之后设置可能会出现问题，我懒得写避免问题的方法了（因为基本用不到）。
     */
    public setJumpKeyFrameDetect(b:boolean):void
    {
        this._jumpKeyFrameDetect = b;
    }


    /**
     * 大概是添加关键帧吧? 
     */
    public addKeyFrame():void
    {
        //不知道咋写.
    }


    public getFrameNum():number
    {
        return this._index;
    }

    public init():void
    {
        this._index = 0;
        this.showFrame(this._index);
        
        this.refreshframeMax();
    }

    /**
     * 刷新最大帧数以及关键帧的帧序号
     */
    protected refreshframeMax():void
    {
        // 计算总帧数
        this._frameMaxNum = 0;
                
        for(let i:number = 0; i < this.frames.length; i++)
        {
            this._frameNum[i] = this._frameMaxNum;
            this._frameMaxNum += this.frames[i].duration;
        }
    }

    /**
     * 获取最大帧数 需要在init之后执行.
     */
    public get frameMaxNum():number
    {
        return this._frameMaxNum;
    }

    protected getKeyFrameNum(publicFrameNum:number):number
    {
        let time:number = 0
        for(let i:number = 0; i < this.frames.length; i++)
        {
            time += this.frames[i].duration;
            if(publicFrameNum < time)
            {
                return i;
            }
        }
    }

    /**
     * 动画显示真实帧数.
     * @param indexNum 
     */
    protected showFrame(indexNum:number):void
    {
        this._sprice.spriteFrame = this.frames[this._index];
        if(this.frames[this._index].isStartStop)
        {
            this._isPlay = false;
        }

        //执行换图的方法.
        if(this.frames[this._index].startFunction)
            this.frames[this._index].startFunction();
    }

    public stop():void
    {
        this._isPlay = false;
    }

    public play():void
    {
        this._isPlay = true;
    }

    public gotoAndPlay(indexNum:number):void
    {
        this._isPlay = true;
        this._index = indexNum - 1;
        if(this._index >= this._frameMaxNum)
        {
            cc.log("设置gotoAndPlay索引超出最大上限");
        }
        else if(this._index < 0)
        {
            cc.log("设置gotoAndPlay索引小于0");
        }
    }

    public gotoAndStop(indexNum:number):void
    {
        this._isPlay = false;
        this._index = indexNum - 1;
        if(this._index >= this._frameMaxNum)
        {
            cc.log("设置gotoAndPlay索引超出最大上限");
            this._index = this._frameMaxNum - 1;
        }
        else if(this._index < 0)
        {
            cc.log("设置gotoAndPlay索引小于0");
            this._index = 0;
        }
        this.showFrameByTimeLine(this._index);
    }
}
