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
        qm.sendNext("主人和我真是心灵相通！主人变强之后，我也变强了。我变强之后，主人就能使用我的力量，变得更强！那就是我们之间的契约！看来我能和主人签订契约，真的很幸运！");
    } else if (status == 1) {
        qm.sendNextPrev("#b嘿嘿，原来如此……但是我们到底是怎么签订契约的呢？", 2);
    } else if (status == 2) {
        qm.sendNextPrev("嗯……我也不知道。我不记得我还是蛋的时候的事情了。就像是梦中的事情一样，只能隐隐约约地记得。在一片充满迷雾的森林里，主人向我走来。看到我之后，主人被吓了一跳。我叫了主人。");
    } else if (status == 3) {
        qm.sendNextPrev("#b#b(哦，和我的梦很相似。难道我们是在梦中见面的吗？我在梦中见到的巨大的龙，就是#p1013000#？)", 2);
    } else if (status == 4) {
        qm.sendNextPrev("主人和我的灵魂非常吻合。我一眼就知道，主人可以和我签订契约。所以我最终和主人签订了契约。主人付出了契约的代价。");
    } else if (status == 5) {
        qm.sendNextPrev("#b代价是什么？", 2);
    } else if (status == 6) {
        qm.sendNextPrev("你认出了我，然后向我伸出了手。你忘了吗？这是我规定的契约的条件。你向曾经是蛋的我伸出手的时候，契约就成立了，我们的灵魂就连接在了一起。");
    } else if (status == 7) {
        qm.sendNextPrev("#b灵魂……连接？", 2);
    } else if (status == 8) {
        qm.sendNextPrev("嗯！现在我们就像是一个身体的两个部分。因此我变强的话，主人也会变强。主人变强的话，我也会变强！很了不起吧？");
    } else if (status == 9) {
        qm.sendNextPrev("#b虽然不太清楚，但好像是很了不起的事情。", 2);
    } else if (status == 10) {
        qm.sendNextPrev("当然很了不起了！现在你不用为怪物担心了，因为你现在有了我。我会保护你的，主人！来，让我们试验一下吧！");
    } else if (status == 11) {
        qm.sendNextPrev("#b但是……这里是平静的农场，没有怪物。", 2);
    } else if (status == 12) {
        qm.sendNextPrev("嗯？是吗？那就没意思了……主人难道不出去冒险吗？为人们消灭怪物或击退魔王，你不做这些事情吗？");
    } else if (status == 13) {
        qm.sendNextPrev("#b暂时没这个打算……", 2);
    } else if (status == 14) {
        qm.sendAcceptDecline("呃……但是#b龙神#k不能这么平静地生活下去！很快就会有机会展现我的能力了！到那时让我们一起去冒险吧，主人？\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 810 exp");
    } else if (status == 15) {
        if (mode == 0) {
            qm.sendNext("呃，你开玩笑吧？告诉我你的手指滑了！去接受这个任务吧.");
        } else {
            if (!qm.isQuestCompleted(22507)) {
                qm.forceCompleteQuest();
                qm.gainExp(810);
            }
            qm.sendNext("嘿嘿嘿，那以后就拜托你了，主人。");
        }
    } else if (status == 16) {
        qm.sendNextPrev("#b(稀里糊涂地成为了龙神，开始和龙一起生活。也许有一天，会和它一起出去冒险。)", 2);
    } else if (status == 17) {
        qm.sendPrev("#b#b(但是现在必须先完成眼前的事情。爸爸说有话要跟我说，去见见他吧。)");
    } else if (status == 18) {
        qm.dispose();
    }
}