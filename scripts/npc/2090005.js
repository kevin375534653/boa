/**
-- Odin JavaScript --------------------------------------------------------------------------------
    Hak - Cabin <To Mu Lung>(200000141) / Mu Lung Temple(250000100) / Herb Town(251000000)
-- By ---------------------------------------------------------------------------------------------
    Information
-- Version Info -----------------------------------------------------------------------------------
    1.1 - Text and statement fix [Information]
    1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var menu = new Array("武陵","天空之城","百草堂","武陵");
var cost = new Array(1500,1500,500,1500);
var hak;
var slct;
var display = "";
var btwmsg;
var method;


function start() {
    status = -1;
    hak = cm.getEventManager("Hak");
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1) {
        cm.dispose();
        return;
    } else {
        if(mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if(mode == 0) {
            cm.sendNext("如果你改变主意，请告诉我。");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            for(var i=0; i < menu.length; i++) {
                if(cm.getPlayer().getMapId() == 200000141 && i < 1) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+"金币)#k";
                } else if(cm.getPlayer().getMapId() == 250000100 && i > 0 && i < 3) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+"金币)#k";
                }
            }
            if(cm.getPlayer().getMapId() == 200000141 || cm.getPlayer().getMapId() == 251000000) {
                btwmsg = "#b天空之城#k to #b武陵#k";
            } else if(cm.getPlayer().getMapId() == 250000100) {
                btwmsg = "#b武陵#k to #b天空之城#k";
            }
            if(cm.getPlayer().getMapId() == 251000000) {
                cm.sendYesNo("你好？冒险家，旅途愉快吗？没有像我一样的翅膀，是不是有些不方便？最近在帮一些没有翅膀的人直接飞往#b"+menu[3]+"#k。怎样？有兴趣吗？只需要#b"+cost[2]+"金币#k就可以。");
                status++;
            } else if(cm.getPlayer().getMapId() == 250000100) {
                cm.sendSimple("你好啊，冒险家！旅行进行得愉快吗？你不像我这样有翅膀，旅途中有很多不便。最近我在帮助那些没有翅膀的人们去往别的地区，你需要帮忙吗？那么选择你要去的地方吧。\r\n"+display);
            } else {
                cm.sendSimple("嗨！我是往返#b武陵#k和#b天空之城#k的鹤。反正我也是来来回回，顺便驮着像你一样的冒险家们，还能挣点儿零花钱，不是一举两得的事情吗？怎么样？马上出发到#b武陵#k怎么样？\r\n"+display);
            }
        } else if(status == 1) {
            slct = selection;
            cm.sendYesNo("要向#b"+menu[selection]+"#k移动吗？如果你有"+cost[selection]+"金币#k，我现在就可以带你过去。");

        } else if(status == 2) {
            if(slct == 2) {
                if(cm.getMeso() < cost[2]) {
                    cm.sendNext("你有足够的金币吗？");
                    cm.dispose();
                } else {
                    cm.gainMeso(-cost[2]);
                    cm.warp(251000000, 0);
                    cm.dispose();
                }
            }
            
            else {
                if(cm.getMeso() < cost[slct]) {
                        cm.sendNext("你有足够的金币吗？");
                        cm.dispose();
                } else {
                        if(cm.getPlayer().getMapId() == 251000000) {
                            cm.gainMeso(-cost[2]);
                            cm.warp(250000100, 0);
                            cm.dispose();
                        } else {
                            var em = cm.getEventManager("Hak");
                            if (!em.startInstance(cm.getPlayer())) {
                                cm.sendOk("请稍候再试。");
                                cm.dispose();
                                return;
                            }
                            
                            cm.gainMeso(-cost[slct]);
                            cm.dispose();
                        }
                }
            }
        }
    }
}  