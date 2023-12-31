/**
 * @author: Ronan
 * @npc: Ellin
 * @map: Ellin PQ
 * @func: Ellin PQ Coordinator
*/

var status = 0;
var mapid;

function start() {
        mapid = cm.getPlayer().getMapId();
    
	status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                if(status == 0) {
                        var ellinStr = ellinMapMessage(mapid);
                    
                        if(mapid == 930000000) {
                            cm.sendNext(ellinStr);
                        } else if(mapid == 930000300) {
                            var eim = cm.getEventInstance();
                            
                            if(eim.getIntProperty("statusStg4") == 0) {
                                eim.showClearEffect(cm.getMap().getId());
                                eim.setIntProperty("statusStg4", 1);
                            }
                            
                            cm.sendNext(ellinStr);
                        } else if(mapid == 930000400) {
                            if (cm.haveItem(4001169, 20)) {
                                if(cm.isEventLeader()) {
                                    cm.sendNext("哦，你带来了！我们现在可以继续了，好吗?");
                                } else {
                                    cm.sendOk("你带来了他们，但你不是队长！请让队长把毒珠递给我...");
                                    cm.dispose();
                                    return;
                                }
                            } else {
                                if(cm.getEventInstance().gridCheck(cm.getPlayer()) != 1) {
                                    cm.sendNext(ellinStr);
                                    
                                    cm.getEventInstance().gridInsert(cm.getPlayer(), 1);
                                    status = -1;
                                } else {
                                    var mobs = cm.getMap().countMonsters();
                                
                                    if(mobs > 0) {
                                        if (!cm.haveItem(2270004)) {
                                            if(cm.canHold(2270004, 10)) {
                                                cm.gainItem(2270004, 10);
                                                cm.sendOk("请给我 10个 #t2270004#. 首先, #r攻击 #o9300174##k 当它的生命值降低时，使用我给你的物品来捕捉它们.");
                                                cm.dispose();
                                                return;
                                            } else {
                                                cm.sendOk("在收到净化器之前，请在您的使用背包上留出空间!");
                                                cm.dispose();
                                                return;
                                            }
                                        } else {
                                            cm.sendYesNo(ellinStr + "\r\n\r\n可能是你想离开？请再三考虑，也许你的队友还在尝试这个任务.");
                                        }
                                    } else {
                                        cm.sendYesNo("你们抓到了所有的#o9300174#. 请让你的队长把 #b20个 #t4001169##k 交给我." + "\r\n\r\n可能是你想离开这里#k? 请再三考虑，也许你的队友还在尝试这个任务.");
                                    }
                                }
                            }
                        } else {
                            cm.sendYesNo(ellinStr + "\r\n\r\n可能是你想离开？请再三考虑，也许你的队友还在尝试这个任务.");
                        }
                } else if(status == 1) {
                        if(mapid == 930000000) {
                        } else if(mapid == 930000300) {
                            cm.getEventInstance().warpEventTeam(930000400);
                        } else if(mapid == 930000400) {
                            if(cm.haveItem(4001169, 20) && cm.isEventLeader()) {
                                cm.gainItem(4001169, -20);
                                cm.getEventInstance().warpEventTeam(930000500);
                            } else {
                                cm.warp(930000800, 0);
                            }
                        } else {
                            cm.warp(930000800, 0);
                        }
                        
                        cm.dispose();
                }
        }
}

function ellinMapMessage(mapid) {
    switch(mapid) {
	case 930000000:
	    return "欢迎来到毒雾森林。进入入口继续.";
	    
	case 930000100:
	    return " #b#o9300172##k 已经占领了这个地区。我们必须消灭所有这些被污染的怪物才能继续前.";
	    
	case 930000200:
	    return "一根大刺藤挡住了前面的路。为了消除这个障碍，我们必须找回#b#o9300173##k 以阻止过度生长的脊柱。然而，天然状态下的毒药是不能处理的，因为它太浓了. 我们需要再 #b泉水#k 那边稀释.";
	    
	case 930000300:
            return "太好了，你找到我了。我们现在可以继续深入森林.";
	    
	case 930000400:
	    return "#b#o9300175##k接管了这个地区。然而他们不是普通的怪物，然后很快的重生，普通的武器和魔法对它没有任何伤害。我们必须净化所有这些被污染的怪物#b#t2270004##k! 让你的组长给我拿20个怪物毒珠.";
	    
	case 930000600:
	    return "森林所有问题的根源！把得到的魔法石放在祭坛上，自己准备!";
	    
	case 930000700:
	    return "就这样，你们做到了！非常感谢你净化了森林!!";
	    
    }
}