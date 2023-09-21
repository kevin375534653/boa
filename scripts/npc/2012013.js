function start() {
    if (cm.haveItem(4031074)) {
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你想现在乘坐开往玩具城的船吗？不过坐船的话需要有一张船票，现在要上船吗？");
        } else {
            cm.sendOk("去玩具城的船已经开走了，请耐心等待下一航班。");
            cm.dispose();
        }
    } else {
        cm.sendOk("你确定有去往玩具城的票吗？");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.sendOk("你在这里还有别的事吗？");
        cm.dispose();
        return;
    }
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000122);
        cm.gainItem(4031074, -1);
        cm.dispose();
    } else {
        cm.sendOk("去玩具城的船已经开走了，请耐心等待下一航班。");
        cm.dispose();
    }
}