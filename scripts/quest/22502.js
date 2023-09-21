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
        qm.sendAcceptDecline("可能和蜥蜴一样，可以喂它吃#b#t4032452##k。这里有很多#b草垛#k，你可以喂给它试试。如果不吃的话，就再看看吃不吃别的。");
    } else if (status == 1) {
        if (mode == 0) {
            qm.sendNext("嗯，除非你努力，否则你永远不会知道。不管你信不信，那只蜥蜴大到可以爬上枫树。它可能吃干草。");
        } else {
            qm.forceStartQuest();
            qm.sendImage("UI/tutorial/evan/12/0");
        }
        qm.dispose();
    }
}
