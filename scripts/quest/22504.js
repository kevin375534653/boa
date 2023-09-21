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
        qm.sendNext("哎，我快不行了。不需要别的。除了草和肉之外……难道没有了吗？主人，你比我年纪大，知道的应该比我多啊？");
    } else if (status == 1) {
        qm.sendNextPrev("#b话是这么说，但我也不知道……又不是年纪大知道的就一定多……", 2);
    } else if (status == 2) {
        qm.sendAcceptDecline("但是年纪大的话，肯定会多经历一些事情，知道更多的知识。不是吗？啊，对了！你去问问比你年纪大的人，也许他们会知道！");
    } else if (status == 3) {
        if (mode == 0) {
            qm.sendNext("我自己想办法找到答案是没有用的. 我最好去找 #b比主人更老更聪明的人#k！");
        } else {
            qm.forceStartQuest();
            qm.sendNext("#b#b(已经问过爸爸一次了……不过还是再去问问他吧。)");
        }
    } else if (status == 4) {
        qm.dispose();
    }
}