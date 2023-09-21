/*
	QUEST: The Identity of the Princess
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
        qm.forceStartQuest();
        qm.sendNext("非常感谢你，#b#h ##k。 你是把我们的帝国从危险中拯救出来的英雄。 我非常感谢你所做的一切。 我不知道该如何感谢你。 请理解为什么我不能向你展示我的脸。");
    } else if (status == 1) {
        qm.sendNextPrev("说起来很丢脸，但从我还是个婴儿的时候起，我的家人就一直把我的脸蒙在外面。 他们害怕男人会无可救药地爱上我。 我已经习惯了，甚至回避女性。 我知道，背对着英雄是我的失礼，但我需要一些时间来鼓起勇气，才能面对面地和你打招呼。");
    } else if (status == 2) {
        qm.sendNextPrev("我明白了...\r\n#b（哇，她有多漂亮？）", 2);
    } else if (status == 3) {
        qm.sendNextPrev("#b什么(-.-)?", 2);
    } else if (status == 4) {
        qm.sendNextPrev("#b(这就是蘑菇世界里的美丽吗？！)", 2);
    } else if (status == 5) {
        qm.sendNextPrev("我很害羞，我脸红了。 无论如何，谢谢你, #b#h ##k.");
    } else if (status == 6) {
        qm.forceStartQuest();
        qm.gainExp(1000);
        qm.forceCompleteQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {}