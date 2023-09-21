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
        qm.sendNext("一大早就来开玩笑，哈哈哈。别乱说了，快去给#p1013102#喂饭吧。");
    } else if (status == 1) {
        qm.sendNextPrev("#b嗯？那不是#p1013101#的事情吗？", 2);
    } else if (status == 2) {
        qm.sendAcceptDecline("你这家伙！快去喂呀！！#p1013102#有多讨厌我，你也知道。哥哥我去的话，它一定会咬我的。猎犬喜欢你，你去给它送饭。");
    } else if (status == 3) {
        if (mode == 0) {
            qm.sendNext("别再偷懒了。你想看到你弟弟被狗咬吗？快点！再和我谈谈接受这个任务！");
            qm.dispose();
        } else {//accept
            qm.gainItem(4032447, true);
            qm.forceStartQuest();
            qm.sendNext("去山头 #b左边#k 喂 #b#p1013102##k. 他整个早上都在叫着要喂.");
        }
    } else if (status == 4) {
        qm.sendNextPrev("给#p1013102#喂完食之后，赶快回来。");
    } else if (status == 5) {
        qm.dispose();
    }
}