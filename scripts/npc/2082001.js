function start() {
    if (cm.haveItem(4031045)) {
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你想乘坐开往天空之城的船吗？到达那里大约需要1分钟。");
        } else {
            cm.sendOk("航班还没有到，请稍等片刻。");
            cm.dispose();
        }
    } else {
        cm.sendOk("确保你有一张开往天空之城的的船票，请检查你的背包。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.sendOk("好吧，如果你改变主意了跟我说！");
        cm.dispose();
        return;
    }
    var em = cm.getEventManager("Cabin");
    if (em.getProperty("entry") == "true") {
        cm.warp(240000111);
        cm.gainItem(4031045, -1);
    } else {
        cm.sendOk("航班还没有到，请稍等片刻。");
    }
    cm.dispose();
}