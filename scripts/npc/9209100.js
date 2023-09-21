var status;

function playerNearby(chrpos, portalpos) {
    try {
        return Math.sqrt( Math.pow((portalpos.getX() - chrpos.getX()), 2) + Math.pow((portalpos.getY() - chrpos.getY()), 2) ) < 77;
    } catch(err) {
        return false;
    }
}

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if (status == 0) {
                        if (playerNearby(cm.getPlayer().getPosition(), cm.getMap().getPortal("chimney01").getPosition())) cm.sendOk("嘿，嘿~~请不要擅自溜进别人家，你不想在今年圣诞老人的名单上看到一句淘气的话，是吗？");
                        else cm.sendOk("呵呵~~祝你健康、实现和幸福的一年！");
                } else {
                        cm.dispose();
                }
        }
}