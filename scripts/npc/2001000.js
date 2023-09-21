/*
 *  Cliff - Happy Ville NPC
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status > 0) {
            status--;
        } else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        cm.sendNext("你看到一群雪人站在那里吗？去和他们中的一个谈谈，它会把你带到圣诞树那里，那棵圣诞树实在是太大了，可以用各种各样的装饰品来装饰。你觉得怎么样？听起来很有趣，对吧？");
    } else if (status == 1) {
        cm.sendNextPrev("只有6个人能同时进入圣诞树那里，在那里无法进行个人#b交易#k。你仍下来的装饰品只能自己捡起来，所以不用担心在这里它会丢了。");
    } else if (status == 2) {
        cm.sendNextPrev("当然，装饰在圣诞树上的物品永远不会消失。你在地图上出来的时候，圣诞树上的装饰品会收回到你的背包中。");
    } else if (status == 3) {
        cm.sendPrev("那么，去看看#p2002001#吧，在那里买些圣诞装饰品，然后用这些装饰圣诞树~哦耶！最大、最漂亮的装饰品是买不到的。可能是。。。被怪物带走了。。。呵呵。。");
        cm.dispose();
    }
}