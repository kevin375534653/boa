/**
----------------------------------------------------------------------------------
        Whale Between Lith harbor and Rien.

        9000021 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("佳佳");
var method;

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode < 0)
                cm.dispose();
        else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }

                if (mode == 1)
                        status++;
                else
                        status--;
                if (status == 0) {
                        var display = "";
                        for (var i = 0; i < menu.length; i++) {
                                display += "\r\n#L0" + i + "##b获得秘密信件#k\r\n";
                        }
                        cm.sendSimple("快进来参加V怪客活的动吧。\r\n" + display);

                } else {
                        if (selection == 0) {
                                if (cm.getMeso() < 800) {
                                        cm.sendNext("钱不够不要捣乱");
                                        cm.dispose();
                                } else {
                                        cm.getPlayer().saveLocation("BOSSPQ");
                                        cm.warp(674030100); //拯救佳佳
                                        cm.dispose();
                                }

                        } else {
                                if (cm.getMeso() < 800) {
                                        cm.sendNext("钱不够不要捣乱");
                                        cm.dispose();
                                } else {
                                        cm.getPlayer().saveLocation("BOSSPQ");
                                        cm.warp(970030000); //工作人员强化特别训练场 970030000
                                        cm.dispose();
                                }
                        }
                }
        }
}