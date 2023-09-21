/**
 * @author: Ronan
 * @event: Jail
 */

function enter(pi) {
    var jailedTime = pi.getJailTimeLeft();

    if (jailedTime <= 0) {
        pi.playPortalSound();
        pi.warp(300000010, "in01");
        return true;
    } else {
        var seconds = Math.floor(jailedTime / 1000) % 60;
        var minutes = (Math.floor(jailedTime / (1000 * 60)) % 60);
        var hours = (Math.floor(jailedTime / (1000 * 60 * 60)) % 24);

        pi.playerMessage(5, "你被冒险岛管理员抓到有不良行为。你得在这里等待" + hours + "小时" + minutes + "分钟" + seconds + "秒才能出去。");
        return false;
    }
}