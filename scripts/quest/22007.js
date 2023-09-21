var status = -1;

function end(mode, type, selection) {
    if (mode == 0 && type == 0) {
        status--;
    } else if (mode == -1) {
        qm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        qm.sendNext("哦，#t4032451#拿来了吗？快把蛋给我吧。我来帮你把它孵化。");
    } else if (status == 1) {
        qm.sendYesNo("来，拿着。不知道这到底可以用来干什么……\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 360 exp");
    } else if (status == 2) {
        if (mode == 0) {//decline
            qm.sendNext("嗯？真奇怪，孵化失败。再试一次。");
        } else {
            qm.gainItem(4032451, -1);
            qm.forceCompleteQuest();
            qm.gainExp(360);
            qm.sendImage("UI/tutorial/evan/9/0");
        }
    } else if (status == 3) {
        qm.dispose();
    }
}