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
        qm.sendYesNo("你决心成为一名唤灵斗师吗？现在还可以重新选择。只要停止对话，放弃任务，然后和其他人对话就行。你要考虑清楚。你真的要选择唤灵斗师吗？你觉得这个职业适合你的反抗者之路吗？");
    } else if (status == 1) {
        if (mode == 0) {
            qm.sendNext("做决定之前要仔细考虑。");
        } else {
            if (!qm.isQuestCompleted(23011)) {
                qm.gainItem(1382100);
                qm.gainItem(1142242);
                qm.forceCompleteQuest();
                qm.changeJobById(3200);
                qm.showItemGain(1382100, 1142242);
            }
            qm.sendNext("很好！欢迎你正式成为反抗者。从现在开始你就是唤灵斗师了。作为一名战斗的魔法师，希望你能勇敢地冲在最前面和敌人战斗。");
        }
    } else if (status == 2) {
        qm.sendNextPrev("你不能在外面自称是唤灵斗师。如果被黑色之翼抓住了的话，就麻烦了。从现在起，你要把我叫做班主任。你是因为特别课程才到教室这里来的。呵呵……特别课程由我负责，我会好好带你的。 ");
    } else if (status == 3) {
        qm.dispose();
    }
}