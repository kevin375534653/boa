function start() {
    if (!cm.isQuestStarted(22015)) {
        cm.sendOk("#b(再靠近一些。)");
    } else {
        cm.gainItem(4032449, true);
        cm.forceCompleteQuest(22015);
        cm.playerMessage(5, "救出了小猪。");
    }
    cm.dispose();
}