var status = 0;
var em;
var eim;

function sendBaseText() {
    cm.sendOk("只有获得授权才能进入#b#m922000000##k。");
    cm.dispose();
}

function start() {
    em = cm.getEventManager("q3239");
    if (em != null)
        eim = cm.getEventInstance();

    if (em == null) { // No event handler
        sendBaseText();
        return;
    }
    else if (eim == null && !cm.isQuestStarted(3239)) { // Not in instance, quest is not in progress
        sendBaseText();
        return;
    }

    if (eim == null) { // Not in instance
        cm.sendYesNo("你准备好进入#b#m922000000##k了吗？");
    }
    else { // Inside the instance
        cm.sendYesNo("你想离开这里吗？");
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }

    if (eim == null) { // Not in instance, ready to enter
        cm.removeAll(4031092); // This handling is done in the portal script and in the event end, just for legacy purposes here
        if (!em.startInstance(cm.getPlayer())) {
            cm.sendOk("已经有人在尝试了，请稍后再试。");
        }
    }
    else { // Inside the instance, ready to exit
        eim.removePlayer(cm.getPlayer()); // This will end the event and warp the player out
    }
    cm.dispose();
}