var status = -1;

function end(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if (mode != 1) {
        //if (mode == 0)
        qm.sendNext("#b(你需要考虑一下...)#k");
        qm.dispose();
        return;
    }

    if (status == 0) {
        qm.sendNext("抓到#o9001013#了吗？呵呵呵……真不愧是我的主人！很好，把你找到的#t4032312#给我吧……啊……？怎么不说话？难道……你没找到？");
    } else if (status == 1) {
        qm.sendNextPrev("什么？！没找到#t4032312#？怎么会这样？！你忘了吗？啊，怎么……再怎么被黑魔法师诅咒，再怎么被封冻几百年也不能让你变得这么笨啊……");
    } else if (status == 2) {
        qm.sendNextPrev("不行。我不能绝望。主人糊里糊涂，我可不能糊涂……深呼吸……深呼吸……");
    } else if (status == 3) {
        qm.sendNextPrev("再去找找，反正小偷已经逃走。看来必须重新做#t4032312#了。以前也做过一次，你知道需要哪些材料吧？快去搜集材料……");
    } else if (status == 4) {
        qm.sendNextPrev("这家伙肯定失去了所有的记忆！");
    } else if (status == 5) {
        qm.sendNextPrev(".……彻底没希望了。啊啊啊！");
    } else if (status == 6) {
        qm.completeQuest();
        qm.sendNextPrev("#b(#p1201002#正在气头上。先撤再说。说不定#p1201000#能给我什么帮助。)", 2);
    } else if (status == 7) {
        qm.dispose();
    }
}