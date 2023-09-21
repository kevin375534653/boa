/**
	名字:	碧欧蕾塔在哪？
    NPC：   1300002
	地圖:	结婚礼堂
	描述:	106021600
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
        qm.sendAcceptDecline("勇士，拜托你了！请你一定要拯救菇菇王国");
    } else if (status == 1) {
        qm.sendNext("#b蘑菇大臣#k是幕后策划的黑手！哦，不！他来了。。。");
    } else if (status == 2) {
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
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
            if (!qm.haveItem(4032388, 1) && !qm.isQuestStarted(2332)) {
                qm.sendOk("碧欧蕾塔公主在哪？你还没有找到她吗？");
            } else {
                qm.gainItem(4032388, -1);
                qm.sendOk("结婚礼堂的钥匙已经拿到，我必须找到碧欧蕾塔公主！");
				qm.forceCompleteQuest(2332);
				qm.forceStartQuest(2333);
				//1300002
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}