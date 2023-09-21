/*
	QUEST: Eliminating the Rest
	NPC: Violetta
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 0)) {
        qm.dispose();
        return;
    } else if (mode == 0) {
        status--;
    } else {
        status++;
    }


    if (status == 0) {
        qm.sendNext("这不是结束, #b#h ##k。 #b总理 #k 的爪牙仍然散布在城堡各处。");
    } else if (status == 1) {
        qm.sendAcceptDecline("据我所知，#b摩天大楼3#k附近有一个地方，那里有一群总理的爪牙。 我捡到了首相前几天掉下的一把钥匙。 在这里，使用这个键。");
    } else if (status == 2) {
        if (qm.canHold(4032405)) {
            qm.gainItem(4032405, 1);
            qm.sendNext("最后一次，祝你好运。");
        } else {
            qm.sendOk("请在消耗栏留至少一个空位，好吗？");
            qm.dispose();
        }
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {}