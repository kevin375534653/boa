/*
	QUEST: Recovered Royal Seal.
	NPC: Violetta
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            if (!qm.hasItem(4001318) && qm.isQuestStarted(2331) && !qm.isQuestCompleted(2331)) {
                if (qm.canHold(4001318)) {
                    qm.forceStartQuest();
                    qm.gainItem(4001318, 1);
                    qm.forceCompleteQuest();
                    qm.sendOk("看起来你在与#b总理#k战斗时忘记拿起#b#t4001318##k。 这对我们的王国非常重要，所以请尽快将其交给我的父亲。");
                } else {
                    qm.sendOk("请在您的其他栏中腾出一个空位。");
                }
            } else {
                qm.dispose();
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
}