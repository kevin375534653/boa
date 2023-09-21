/**
----------------------------------------------------------------------------------
        Whale Between Lith harbor and Rien.

        9000021 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/
var cost = 100;//判断数量
var menu = new Array("余夫");
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
                                display += "\r\n#L0" + i + "##b东方神州：钓鱼场#k\r\n#L1" + i + "##b精灵钓鱼场#k\r\n";
                        }
                        cm.sendSimple("你想去哪里钓鱼呢？\r\n" + display);

                } else {
                        if (selection == 0) {
                                if (cm.haveItem(5220001, cost)) { //需要的物品
                                        cm.sendNext("恐怕你没有门票就不能进入钓鱼场了。");
                                        cm.dispose();
                                } else {
                                        cm.getPlayer().saveLocation("BOSSPQ");
                                        cm.warp(741000200); //东方神州：钓鱼场
                                        cm.gainItem(5220001, -1);//减去的物品
                                        cm.dispose();
                                }

                        } else {
                                if (cm.haveItem(5220001, cost)) { //需要的物品
                                        cm.sendNext("恐怕你没有门票就不能进入钓鱼场了。");
                                        cm.dispose();
                                } else {
                                        cm.getPlayer().saveLocation("BOSSPQ");
                                        cm.warp(749050502); //精灵钓鱼场
                                        cm.gainItem(5220001, -cost);//减去的物品
                                        cm.dispose();
                                }
                        }
                }
        }
}