function start() {
    //cm.sendNext("你做的很好，" + cm.getPlayer().getName() + "。现在我会把你送到冰封雪域。把挂件放在身上，当你准备好学习新技能了和我对话。");
    cm.sendNext("谢谢，幸亏有你的帮助，成功完成了任务。果然是哈尔模尼亚推荐的人。作为代价，我教你技能。");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        cm.warp(211000000, "in01");
        cm.dispose();
    }
}