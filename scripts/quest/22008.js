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
        qm.sendAcceptDecline("你不觉得奇怪吗？最近的鸡怎么和以前不一样了？以前它们会下很多#t4032451#，但现在越来越少了。是不是因为狐狸增多了呢？那样的话，必须赶紧想办法才行。你说对不对？");
    } else if (status == 1) {
        if (mode == 0) {//decline
            qm.sendNext("我滴个妈呀... 你害怕 #o9300385#k？别告诉任何人你和我有关系。太丢人了.");
            qm.dispose();
        } else {
            qm.forceStartQuest();
            qm.sendNext("好吧，让我们去消灭狐狸吧。你先去#b#m100030103##k消灭#r10只#o9300385##k。我会负责剩下的事情的。好了，你快到#m100030103#去吧～");
        }
    } else if (status == 2) {
        qm.sendImage("UI/tutorial/evan/10/0");
        qm.dispose();
    }
}

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
        qm.sendNext("#o9300385#消灭掉了吗？");
    } else if (status == 1) {
        qm.sendNextPrev("#b你说要去收拾剩下的狐狸的，怎么回事？", 2);
    } else if (status == 2) {
        qm.sendNextPrev("啊，那个嘛？我后来是去了，但走错了路，怕被#o9300385#抓去做人质，所以就回来了。");
    } else if (status == 3) {
        qm.sendNextPrev("#b该不会是害怕狐狸而躲起来了吧？", 2);
    } else if (status == 4) {
        qm.sendNextPrev("你在胡说什么啊？！我为什么会害怕狐狸？！我一点都不害怕狐狸！");
    } else if (status == 5) {
        qm.sendNextPrev("#b……啊，有一只#o9300385#！", 2);
    } else if (status == 6) {
        qm.sendNextPrev("啊！快躲起来！");
    } else if (status == 7) {
        qm.sendNextPrev("#b……", 2);
    } else if (status == 8) {
        qm.sendNextPrev("…………");
    } else if (status == 9) {
        qm.sendNextPrev("……你这家伙。别吓哥哥我！哥哥我的心脏不好，不能受惊吓！");
    } else if (status == 10) {
        qm.sendNextPrev("#b(所以叫哥哥才不愿意去，叫我去。)", 2);
    } else if (status == 11) {
        qm.sendNextPrev("哼哼，不管怎样，#o9300385#消灭掉了。辛苦你了，我把一个路过的冒险家送我的东西送给你，作为给你的报酬。来，拿着。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1372043# 1 #t1372043# \r\n#i2022621# 25 #t2022621# \r\n#i2022622# 25 #t2022622#s \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 910 exp");
    } else if (status == 12) {
        if (!qm.isQuestCompleted(22008)) {
            qm.gainItem(1372043, true);
            qm.gainItem(2022621, 25, true);
            qm.gainItem(2022622, 25, true);
            qm.forceCompleteQuest();
            qm.gainExp(910);
        }
        qm.sendNextPrev("#b是#b魔法师的攻击武器短杖#k。虽然你也可能没什么用，但拿在手里到处走，还是很帅的，哈哈哈。");
    } else if (status == 13) {
        qm.sendPrev("狐狸的数量确实增加了，对吧？奇怪。狐狸的数量为什么会增加呢？看来必须调查一下。");
    } else if (status == 14) {
        qm.dispose();
    }
}