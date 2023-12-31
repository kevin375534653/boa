var map = 677000006; //海盗
var quest = 28256;
var questItem = 4032494;
var status = -1;

function start(mode, type, selection) {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (cm.isQuestStarted(quest)) {
            if (cm.haveItem(questItem)) {
                cm.sendYesNo("是否要移动到#b#m" + map + "##k？");
            } else {
                cm.sendOk("入口被一种只有手持徽章的人才能举起的力量挡住。");
                cm.dispose();
            }
        } else {
            cm.sendOk("入口被一股奇怪的力量堵住了。");
            cm.dispose();
        }
    } else {
        if (cm.haveItem(4001362, 1)) {
            cm.gainItem(4001362, -cm.getItemQuantity(4001362));
        }
        if (cm.haveItem(4001363, 1)) {
            cm.gainItem(4001363, -cm.getItemQuantity(4001363));
        }
        if (cm.haveItem(4032486, 1)) {
            cm.gainItem(4032486, -1);
        }
        if (cm.haveItem(4032488, 1)) {
            cm.gainItem(4032488, -1);
        }
        if (cm.haveItem(4032489, 1)) {
            cm.gainItem(4032489, -1);
        }
        if (cm.haveItem(4220153, 1)) {
            cm.gainItem(4220153, -1);
        }

        cm.warp(map, 0);
        cm.dispose();
    }
}