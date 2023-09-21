/* ===========================================================
			Ronan Lana
	NPC Name: 		Chrishrama
	Description: 	Quest -  How to Shoo Away the Evil
=============================================================
Version 1.0 - Script Done.(20/3/2017)
=============================================================
*/

var status = -1;
var canStart;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendOk("如果我们不把这些驱逐恶魔的道符放在灵验石上，邪恶可能会觉醒。。。");
                        canStart = false;
                        status = 0;
			return;
		}
	}
	if (status == 0) {
		qm.sendAcceptDecline("我能感觉到邪恶的力量。他们在地牢的深处，非常非常强大。如果我们想把恶魔赶出这个地方，我们必须在地牢里的灵验石上放置驱逐恶魔的道符。你能帮我吗？");
                canStart = true;
	} else if (status == 1) {
                if (canStart) {
                        qm.sendOk("请把这些驱逐恶魔的道符放在地牢里的灵验石上。");
                } else {
                        qm.dispose();
                }
	} else {
                qm.forceStartQuest();
                
                if(qm.haveItem(4032263)) qm.gainItem(4032263, -6);
		qm.gainItem(4032263, 6);
                
		qm.dispose();
        }
}

function end(mode, type, selection) {
	status++;

	if(status == 0) {
		if(qm.getQuestProgress(2236) == 63) {	//111111
			qm.sendOk("我感觉到了。灵验石的力量开始压倒邪恶的力量。我觉得现在很安全。邪恶已被消灭.");
			qm.gainExp(60000);
			qm.forceCompleteQuest();
		}
		else {
			if(qm.haveItem(4032263)) qm.gainItem(4032263, -6);
			qm.gainItem(4032263, 6);

			qm.sendOk("哦，不太好。我仍然感觉到来自地下的邪恶力量。来，把这些道符放在灵验石上。感谢你.");
			qm.updateQuest(2236, 0);
		}
	} else if (status == 1) {
		qm.dispose();
        }
}