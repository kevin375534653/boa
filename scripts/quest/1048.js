var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendOk("是位新的旅行者吧？怎么样，还很陌生吧？我是#b冒险岛运营员#k，好好听着，人物的各项属性都关系着以后的冒险经历，所以正确的选择职业，是很重要的。如果你还不知道应该选择什么职业，可以到明珠港找#b坤#k谈谈，他会告诉你一些你想要知道的。");
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}