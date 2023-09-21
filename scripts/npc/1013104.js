function start() {
    if (cm.isQuestStarted(22007)) {
        if (!cm.haveItem(4032451)) {
            cm.gainItem(4032451, true);
            cm.sendNext("#b(你得到了一个鸡蛋。把它送到尤塔吧。)");
        } else {
            cm.sendNext("#b(你已经得到了一个鸡蛋. 把你的鸡蛋送给尤塔。)");
        }
    } else {
        cm.sendNext("#b(你现在不需要吃鸡蛋了。)#k");
    }
    cm.dispose();
}