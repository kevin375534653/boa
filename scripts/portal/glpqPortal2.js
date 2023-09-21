function enter(pi) {
    var eim = pi.getEventInstance();
    if (eim != null) {
        pi.playPortalSound();
        pi.warp(610030300, 0);

        if (eim.getIntProperty("glpq3") < 5 || eim.getIntProperty("glpq3_p") < 5) {
            if (eim.getIntProperty("glpq3_p") == 5) {
                pi.mapMessage(6, "并不是所有的信号都被激活了。确保它们都已激活，以便进入下一阶段。");
            } else {
                eim.setIntProperty("glpq3_p", eim.getIntProperty("glpq3_p") + 1);

                if (eim.getIntProperty("glpq3") == 5 && eim.getIntProperty("glpq3_p") == 5) {
                    pi.mapMessage(6, "安泰利昂允许你进入下一个入口！继续！");

                    eim.showClearEffect(610030300, "3pt", 2);
                    eim.giveEventPlayersStageReward(3);
                } else {
                    pi.mapMessage(6, "一个冒险家通过了！" + (5 - eim.getIntProperty("glpq3_p")) + "");
                }
            }
        } else {
            pi.getPlayer().dropMessage(6, "底部的入口已经打开了！继续！");
        }

        return true;
    }

    return false;
}