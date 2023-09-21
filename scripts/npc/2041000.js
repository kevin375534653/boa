function start() {
    if (cm.haveItem(4031045)) {
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            //cm.sendYesNo("你想去神秘大陆的天空之城吗？不过坐船的话需要有一张船票，现在要上船吗？");
            cm.sendYesNo("坐上船之后，需要飞很久才能到达目的地。如果你在这里有急事要办的话，请先把事情办完。怎么样？你要上船吗？");
        } else {
            cm.sendOk("前往天空之城的船已经开走了，请耐心等待下一航班。");
            cm.dispose();
        }
    } else {
        cm.sendOk("确保你有一张前往天空之城的船票。请检查你的背包.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode <= 0) {
       //cm.sendOk("好吧，如果你改变主意就跟我说！");
        cm.sendOk("看来你还有事情要办吧？");
        cm.dispose();
        return;
    }

    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(220000111);
        cm.gainItem(4031045, -1);
        cm.dispose();
    } else {
        cm.sendOk("船已经开走了，请耐心等待下一航班。");
        cm.dispose();
    }
}