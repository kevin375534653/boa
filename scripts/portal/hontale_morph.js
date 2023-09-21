//importPackage(Packages.client);
function enter(pi) {
    pi.playPortalSound();
    var map, portal;
    //var msg;
    if (!(isTransformed(pi.getPlayer()) || pi.haveItem(4001086))) {
        //map = 240040600;
        map = 240040700, 0;
        portal = 0;
        //msg = "够了，人类！任何人不许越过此处。";
        pi.getPlayer().dropMessage(6, "够了，人类！任何人不许越过此处。");
    } else if (pi.getPlayer().getLevel() > 99) {
        map = 240050000;
        portal = 0;
        //msg = "小心，现在已经踏入了生命之穴。";
        //pi.getPlayer().dropMessage(6, "小心，现在已经踏入了生命之穴。");
    } else {
        //map = 240040600;
        map = 240040700, 0;
        portal = 0;
        //msg = "挑战暗黑龙王需要100级以上。";
        pi.getPlayer().dropMessage(6, "挑战暗黑龙王需要100级以上。");
    }
    pi.warp(map, portal);
    //pi.getPlayer().dropMessage(msg);
    return true;
}
function isTransformed(ch) {
    const BuffStat = Java.type('client.BuffStat');
    return ch.getBuffSource(BuffStat.MORPH) == 2210003;
}