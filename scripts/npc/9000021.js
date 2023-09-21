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

                if (mode == 1) {
                        status++;
                } else {
                        status--;
	        }
	        if (status == 0) {
                        var display = "";
                        for (var i = 0; i < menu.length; i++) {
                               display += "\r\n#L1" + i + "#我想参加工作人员咪咪和喵喵的工作人员强化项目#b怪物对决。#k\r\n#L0" + i + "#我想去太空拯救佳佳。#k";
                        }
                        //cm.sendSimple("你准备好接受一个超越自己的挑战了吗？\r\n" + display);
		        cm.sendSimple("你好。找我有事吗？\r\n" + display);

                } else {
                        if (selection == 0) {
                                if (cm.getMeso() < 0) {
                                        cm.sendNext("你的金币不够，我就不能带你去了。");
                                        cm.dispose();
                                } else {
                                        cm.getPlayer().saveLocation("BOSSPQ");
                                        cm.warp(922231000); //拯救佳佳
                                        cm.dispose();
                                }

                        } else {
                                if (cm.getMeso() < 0) {
                                        cm.sendNext("你的金币不够，我就不能带你去了。");
                                        cm.dispose();
                                } else {
                                        cm.getPlayer().saveLocation("BOSSPQ");
                                        cm.warp(970030000); //工作人员强化特别训练场
                                        cm.dispose();
                                }
                        }
                }
        }
}