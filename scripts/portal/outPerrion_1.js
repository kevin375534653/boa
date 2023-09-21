function enter(pi) {
    pi.message("你找到了通往地下之路的捷径。");
    pi.playPortalSound();
    pi.warp(105100000, 2);
    return true;
}