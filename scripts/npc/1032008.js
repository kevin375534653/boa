function start() {
    if (cm.haveItem(4031045)) {
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你现在要乘船去天空之城吗？怎么样？你要上船吗？");
        } else {
            cm.sendOk("本次航班已经出发，请等待下一次航班。");
            cm.dispose();
        }
    } else {
        cm.sendOk("确保你有一张乘坐这艘船的船票。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.sendOk("好吧，如果你改变想法跟我说！");
        cm.dispose();
        return;
    }
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(101000301);
        cm.gainItem(4031045, -1);
        cm.dispose();
    } else {
        cm.sendOk("船已经在准备出发。对不起，请乘坐下一班船。运行时间表可以通过售票员确认。");
        cm.dispose();
    }
}	