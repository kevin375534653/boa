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
        qm.sendNext("除了这个，没别的吃的了吗？我不喜欢吃草，我需要营养更高的东西，主人！");
    } else if (status == 1) {
        qm.sendNextPrev("#b嗯……不喜欢吃吗？龙说不定会喜欢吃肉食。#t4032453#之类的东西怎么样呢？", 2);
    } else if (status == 2) {
        qm.sendAcceptDecline("我不知道#t4032453#是什么东西～但是只要是好吃的东西，不管什么都可以。快给我去找点吃的～除了草！");
    } else if (status == 3) {
        if (mode == 0) {
            qm.sendNext("你怎么能这样，要饿死我啊。我还只是个宝宝。这是不对的！");
        } else {
            qm.forceStartQuest();
            qm.sendNext("#b#b(请你把#t4032453#给#p1013000#吧。在农场抓几只#o1210100#就可以，只要10个就够了吧？)");
        }
    } else if (status == 4) {
        qm.dispose();
    }
}