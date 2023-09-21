function enter(pi) {
    if (pi.isQuestCompleted(2324)) {
        pi.playPortalSound();
        pi.warp(106020501, 0);
        return true;
    } else {
        pi.playerMessage(5, "前面小路的藤蔓上长满了荆棘，只有使用道具清除这些荆棘才能过去。");
        return false;
    }
}