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
        qm.sendNext("我终于醒来了！呵～这就是世界上的空气！哦，那个就是太阳！那是树！那是草！那是花！真了不起！比我在蛋里想想的更加漂亮！还有……嗯？你是我的主人吗？怎么好像和我期待的有点不一样？");
    } else if (status == 1) {
        qm.sendNextPrev("#b哇啊啊啊啊啊啊！你会说话？！", 2);
    } else if (status == 2) {
        qm.sendNextPrev("……我的主人真是个奇怪的人。不过已经签订了契约，我也不能选择其他主人了。今后还请多多关照。");
    } else if (status == 3) {
        qm.sendNextPrev("#b嗯？这是什么意思？今后请多多关照……？契约？那是什么？", 2);
    } else if (status == 4) {
        qm.sendNextPrev("你在说什么啊……就是你把我从蛋中唤醒的契约啊。你是我的主人，当然应该照顾我，让我变成强大的龙。不是吗？");
    } else if (status == 5) {
        qm.sendNextPrev("#b嗯？龙？！你是龙吗？你在说什么啊？我完全听不懂！契约到底是什么？主人又是怎么回事？", 2);
    } else if (status == 6) {
        qm.sendNextPrev("嗯？你在说什么啊？你不是和我签订了将龙和人的灵魂合二为一的契约吗？所以你就是我的主人。你连这都不知道，就签了契约？但是现在已经晚了，契约已经无法解开了。");
    } else if (status == 7) {
        qm.sendNextPrev("#b啊？等，等等！虽然我不是很明白，不过听你这么说……我必须得无条件地照顾你吗？", 2);
    } else if (status == 8) {
        qm.sendNextPrev("那当然！……嗯？干嘛？那副委屈的表情？你不想成为我的主人吗？");
    } else if (status == 9) {
        qm.sendNextPrev("#b不，不是不愿意，而是不知道怎么养宠物。", 2);
    } else if (status == 10) {
        qm.sendNextPrev("宠，宠物~？！你，你觉得我是宠物？！你把我当什么了？我可是地表最强生命体，龙！");
    } else if (status == 11) {
        qm.sendNextPrev("#b...#b(再怎么看，也只是条小蜥蜴而已。)#k", 2);
    } else if (status == 12) {
        qm.sendAcceptDecline("干嘛？那种眼神？你是觉得我像条小蜥蜴吗！哎呀，受不了啦！我来证明我的力量给你看！好了，你做好准备了吗？");
    } else if (status == 13) {
        if (mode == 0 && type == 15) {
            qm.sendNext("你不相信我？grrrr，你让我生气了!");
            qm.dispose();
        } else {
            if (!qm.isQuestStarted(22500)) {
                qm.forceStartQuest();
            }
            qm.sendNext("立刻去攻击#r#o1210100##k吧！唤醒你的魔力，同时我也会证明自己作为龙的能力！来，冲吧！");
        }
    } else if (status == 14) {
        qm.sendNextPrev("不，不对啊，等一下！在此之前难道不该先分配属性点吗？魔法会受到#b智力#k的影响！所以好好分配属性点，#b穿戴魔法师装备#k后再战吧！");
    } else if (status == 15) {
        qm.sendImage("UI/tutorial/evan/11/0");
        qm.dispose();
    }
}