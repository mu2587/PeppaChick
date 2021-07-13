// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//const {ccclass, property} = cc._decorator;

//@ccclass
export default class Utils
{
    // public static p0n2n(from: cc.Node, to: cc.Node): void {
    //     from.convertToWorldSpaceAR(this.n2n_p0, this.n2n_tmp);
    //     to.convertToNodeSpaceAR(this.n2n_tmp, this.n2n_out);
    // }
    // public static p100n2n(from: cc.Node, to: cc.Node): void {
    //      from.convertToWorldSpaceAR(this.n2n_p100, this.n2n_tmp);
    //      to.convertToNodeSpaceAR(this.n2n_tmp, this.n2n_out);
    // }
    // update (dt) {}

    /**
     * 得到一个节点的世界坐标
     * node的原点在中心
     * @param {*} node 
     */
    public static localConvertWorldPointAR(node) {
        if (node) {
            return node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        return null;
    }
    
    /**
     * 得到一个节点的世界坐标
     * node的原点在左下边
     * @param {*} node 
     */
    public static localConvertWorldPoint(node) {
        if (node) {
            return node.convertToWorldSpace(cc.v2(0, 0));
        }
        return null;
    }

    
    /**
     * 把一个世界坐标的点，转换到某个节点下的坐标
     * 原点在node中心
     * @param {*} node 
     * @param {*} worldPoint 
     */
    public static worldConvertLocalPointAR(node, worldPoint) {
        if (node) {
            return node.convertToNodeSpaceAR(worldPoint);
        }
        return null;
    }
    
    /**
     * 把一个世界坐标的点，转换到某个节点下的坐标
     * 原点在node左下角
     * @param {*} node 
     * @param {*} worldPoint 
     */
    public static worldConvertLocalPoint(node, worldPoint) {
        if (node) {
            return node.convertToNodeSpace(worldPoint);
        }
        return null;
    }

    /**
     *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
     * @param {*} node 
     * @param {*} targetNode 
     */
     public static convetOtherNodeSpace(node, targetNode) {
        if (!node || !targetNode) {
            return null;
        }
        //先转成世界坐标
        let worldPoint = Utils.localConvertWorldPoint(node);
        return Utils.worldConvertLocalPoint(targetNode, worldPoint);
    }
    
    /**
     *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
     * @param {*} node 
     * @param {*} targetNode 
     */
     public static convetOtherNodeSpaceAR(node, targetNode) {
        if (!node || !targetNode) {
            return null;
        }
        //先转成世界坐标
        let worldPoint = Utils.localConvertWorldPointAR(node);
        return Utils.worldConvertLocalPointAR(targetNode, worldPoint);
    }
}
