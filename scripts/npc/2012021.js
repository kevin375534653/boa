function start() {
    if (cm.haveItem(4031331)) {
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("坐上船之后，需要飞很久才能到达目的地。如果你在这里有急事要办的话，请先把事情办完。怎么样？你要上船吗？");
        } else {
            cm.sendOk("航班还没到，请等一会儿。");
            cm.dispose();
        }
    } else {
        cm.sendOk("你在这里还有别的事吗？");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.sendOk("看来你还有事情要办吧？");
        cm.dispose();
        return;
    }

    var em = cm.getEventManager("Cabin");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000132);
        cm.gainItem(4031331, -1);
    } else {
        cm.sendOk("航班还没到，请等一会儿。");
    }
    cm.dispose();
}