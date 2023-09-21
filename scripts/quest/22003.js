var status = -1;

function start(mode, type, selection) {
    if (mode == 0 && type == 0) {
        status--;
    } else if (mode == -1) {
        qm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        qm.sendAcceptDecline("去农场干活的时候，#b爸爸#k忘了把便当带过去了。你能去#b#m100030300##k给爸爸#b送便当#k吗？");
    } else if (status == 1) {
        if (mode == 0 && type == 15) {//decline
            qm.sendNext("好孩子听妈妈的话。现在，小不点，做个好孩子，再和我说话.");
            qm.dispose();
        } else {
            if (!qm.isQuestStarted(22003)) {
                if (!qm.haveItem(4032448)) {
                    qm.gainItem(4032448, true);
                }
                qm.forceStartQuest();
            }
            qm.sendNext("呵呵，小不点果然是个好孩子～#b从家里出去之后，往左边走#k。爸爸一定饿极了，你最好快点给他送过去。");
        }
    } else if (status == 2) {
        qm.sendNextPrev("如果不小心把便当弄丢了，就马上回来。我再给你包一份。");
    } else if (status == 3) {
        qm.sendImage("UI/tutorial/evan/5/0");
        qm.dispose();
    }
}