/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Twilight of the gods
	Description: 		Pink Bean
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        var eim = cm.getEventInstance();
        if (!eim.isEventCleared()) {
            if (status == 0) {
                cm.sendYesNo("你现在想出去吗？");
            } else if (status == 1) {
                cm.warp(270050000, 0);
                cm.dispose();
            }

        } else {
            if (status == 0) {
                cm.sendYesNo("品克缤被打败了！你们是这片土地上的英雄！时间神殿恢复了以往的荣耀，这一切都要感谢你们的努力！现在你准备好走了吗？");
            } else if (status == 1) {
                if (eim.giveEventReward(cm.getPlayer(), 1)) {
                    cm.warp(270050000);
                } else {
                    cm.sendOk("你的背包中没足够的空间，清理背包后再来试试。");
                }

                cm.dispose();
            }
        }
    }
}