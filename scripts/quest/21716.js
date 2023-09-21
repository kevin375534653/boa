var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || mode == 0 && type > 0) {
        qm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("什么我认为除了那孩子以外，没有其他嫌疑人。请再想想。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("#p1012108#说什么？", 8);
    } else if (status == 1) {
        qm.sendNextPrev("#b(我把听到的内容转达给了#p1012108#。)#k", 2);
    } else if (status == 2) {
        qm.sendAcceptDecline("拿着人偶的小家伙？不得不叫人怀疑。一定是他让怪物们变得残暴的。");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.sendNext("#m100000000#的和平已经被打破…………这种恶行绝对不能饶恕…………看来我得提醒村民们最近一定要多加小心。", 2);
    } else if (status == 4) {
        qm.sendPrev("#b(怪物们变得凶暴的原因找到了。现在把搜集到的情报告诉#p1002104#吧。)#k", 2);
    } else if (status == 5) {
        qm.dispose();
    }
}

function end(mode, type, selection) {
    qm.dispose();
}