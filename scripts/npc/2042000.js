/**
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Drago (MapleStorySA)
        2.0 - Second Version by Ronan (HeavenMS)
        3.0 - Third Version by Jayd - translated CPQ contents to English & added Pirate items
                                Special thanks to 頼晏 (ryantpayton) for also stepping in to translate CPQ scripts.
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var rnk = -1;
var n1 = 50; //???
var n2 = 40; //??? ???
var n3 = 7; //35
var n4 = 10; //40
var n5 = 20; //50

var cpqMap = 980000000;
var cpqMinLvl = 30;
var cpqMaxLvl = 300;
var cpqMinAmt = 2;
var cpqMaxAmt = 6;

// Ronan's custom ore refiner NPC
var refineRocks = true;     // enables moon rock, star rock
var refineCrystals = true;  // enables common crystals
var refineSpecials = true;  // enables lithium, special crystals
var feeMultiplier = 7.0;

function start() {
    status = -1;
    
    if (!Packages.config.YamlConfig.config.server.USE_CPQ) {
        if (Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            status = 0;
            action(1, 0, 4);
        } else {
            cm.sendOk("怪物嘉年华目前不可用。");
            cm.dispose();
        }
        
        return;
    }
    
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        if (cm.getPlayer().getMapId() == 980000010) {
            if (status == 0) {
                cm.sendNext("我希望你在怪兽嘉年华玩得开心！");
            } else if (status > 0) {
                cm.warp(980000000, 0);
                cm.dispose();
            }
        } else if (cm.getChar().getMap().isCPQLoserMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shiu = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shiu += "#rA#k";
                        cm.sendOk("不幸的是，尽管你表现得很出色，但你不是输了就是输了。下次你一定能胜利! \r\n\r\n#b你的结果: " + shiu);
                        rnk = 10;
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shiu += "#rB#k";
                        rnk = 20;
                        cm.sendOk("不幸的是，你要么战平要么输掉了这场战斗，即使是你的最终表现。只要一点点，胜利就可能属于你! \r\n\r\n#b你的结果: " + shiu);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shiu += "#rC#k";
                        rnk = 30;
                        cm.sendOk("不幸的是，你要么战平要么输掉这场战斗。胜利属于奋斗的人。我看到了你的努力，所以胜利离你不远了。坚持下去!\r\n\r\n#b你的结果: " + shiu);
                    } else {
                        shiu += "#rD#k";
                        rnk = 40;
                        cm.sendOk("不幸的是，你要么扳平了比分，要么输掉了比赛，你的表现清楚地反映了这一点。我对你下次期望更高。 \r\n\r\n#b你的结果: " + shiu);
                    }
                } else {
                    cm.warp(980000000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 10:
                        cm.warp(980000000, 0);
                        cm.gainExp(17500);
                        cm.dispose();
                        break;
                    case 20:
                        cm.warp(980000000, 0);
                        cm.gainExp(1200);
                        cm.dispose();
                        break;
                    case 30:
                        cm.warp(980000000, 0);
                        cm.gainExp(5000);
                        cm.dispose();
                        break;
                    case 40:
                        cm.warp(980000000, 0);
                        cm.gainExp(2500);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980000000, 0);
                        cm.dispose();
                        break;
                }
            }
        } else if (cm.getChar().getMap().isCPQWinnerMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shi = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shi += "#rA#k";
                        rnk = 1;
                        cm.sendOk("祝贺你的胜利!!! 多么精彩的表演啊。另一组什么也做不了!我希望下次也能做得一样好! \r\n\r\n#b你的结果: " + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shi += "#rB#k";
                        rnk = 2;
                        cm.sendOk("祝贺你的胜利! 那是太棒了!你在与对手的比赛中表现得很好!只要再多一点时间，下次你一定能得A! \r\n\r\n#b你的结果: " + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shi += "#rC#k";
                        rnk = 3;
                        cm.sendOk("祝贺你的胜利. 你在这里和那里做了一些事情，但那不能被认为是一个好的胜利。我对你下次期望更高。\r\n\r\n#b你的结果: " + shi);
                    } else {
                        shi += "#rD#k";
                        rnk = 4;
                        cm.sendOk("祝贺你的胜利, 尽管你的表现并没有完全反映出这一点。更积极地参与您的下一次怪物嘉年华! \r\n\r\n#b你的结果: " + shi);
                    }
                } else {
                    cm.warp(980000000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 1:
                        cm.warp(980000000, 0);
                        cm.gainExp(50000);
                        cm.dispose();
                        break;
                    case 2:
                        cm.warp(980000000, 0);
                        cm.gainExp(25500);
                        cm.dispose();
                        break;
                    case 3:
                        cm.warp(980000000, 0);
                        cm.gainExp(21000);
                        cm.dispose();
                        break;
                    case 4:
                        cm.warp(980000000, 0);
                        cm.gainExp(19505);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980000000, 0);
                        cm.dispose();
                        break;
                }
            }
        } else if (cm.getMapId() == cpqMap) {   // only CPQ1
            if (status == 0) {
                if (cm.getParty() == null) {
                    status = 10;
                    cm.sendOk("你需要先创建一个队伍，然后才能加入战斗！");
                } else if (!cm.isLeader()) {
                    status = 10;
                    cm.sendOk("如果你想开始战斗，让队长和我谈谈。");
                } else {
                    var party = cm.getParty().getMembers();
                    var inMap = cm.partyMembersInMap();
                    var lvlOk = 0;
                    var isOutMap = 0;
                    for (var i = 0; i < party.size(); i++) {
                        if (party.get(i).getLevel() >= cpqMinLvl && party.get(i).getLevel() <= cpqMaxLvl) {
                            lvlOk++;

                            if (party.get(i).getPlayer().getMapId() != cpqMap) {
                                isOutMap++;
                            }
                        }
                    }

                    if (party >= 1) {
                        status = 10;
                        cm.sendOk("你的队伍里有足够的人。你需要一个聚会 #b" + cpqMinAmt + "#k - #r" + cpqMaxAmt + "#k 成员，他们应该和你在地图上。");
                    } else if (lvlOk != inMap) {
                        status = 10;
                        cm.sendOk("确保你的组队中每个人的等级满足" + cpqMinLvl + "~" + cpqMaxLvl + "级！");
                    } else if (isOutMap > 0) {
                        status = 10;
                        cm.sendOk("没有与组队长同一地图的组队成员。");
                    } else {
                        if (!cm.sendCPQMapLists()) {
                            cm.sendOk("所有的怪物嘉年华目前都在使用中！请稍后再试。");
                            cm.dispose();
                        }
                    }
                }
            } else if (status == 1) {
                if (cm.fieldTaken(selection)) {
                    if (cm.fieldLobbied(selection)) {
                        cm.challengeParty(selection);
                        cm.dispose();
                    } else {
                        cm.sendOk("目前房间已满。");
                        cm.dispose();
                    }
                } else {
                    var party = cm.getParty().getMembers();
                    if ((selection >= 0 && selection <= 3) && party.size() < (Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS ? 1 : 2)) {
                        cm.sendOk("你需要至少2名玩家才能参与战斗！");
                    } else if ((selection >= 4 && selection <= 5) && party.size() < (Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS ? 1 : 3)) {
                        cm.sendOk("你需要至少3个玩家才能参与战斗！");
                    } else {
                        cm.cpqLobby(selection);
                    }
                    cm.dispose();
                }
            } else if (status == 11) {
                cm.dispose();
            }
        } else {
            if (status == 0) {
                var talk = "你想做什么?如果你从来没有参加过怪兽嘉年华，在参加之前你需要知道一些事情! \r\n#b#L0# 去怪物嘉年华 1.#l \r\n#L3# 去怪物嘉年华 2.#l \r\n#L1# 了解怪物嘉年华。#l\r\n#L2# 进行交换#t4001129#.#l";
                if (Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
                    talk += "\r\n#L4# ... Can I just refine my ores?#l";
                }
                cm.sendSimple(talk);
            } else if (status == 1) {
                if (selection == 0) {
                    if ((cm.getLevel() > 29 && cm.getLevel() < 255) || cm.getPlayer().isGM()) {
                        cm.getChar().saveLocation("MONSTER_CARNIVAL");
                        cm.warp(980000000, 0);
                        cm.dispose();
                        return;
                    } else if (cm.getLevel() < 30) {
                        cm.sendOk("你必须至少达到30级才能参加怪物嘉年华。当你足够强大的时候再和我说话。");
                        cm.dispose();
                        return;
                    } else {
                        cm.sendOk("对不起，只有30 ~ 50级的玩家才能参加怪物嘉年华。");
                        cm.dispose();
                        return;
                    }
                } else if (selection == 1) {
                    status = 60;
                    cm.sendSimple("你想做什么?\r\n#b#L0#什么是怪兽嘉年华？#l\r\n#L1#怪物嘉年华概述。#l\r\n#L2#关于怪物嘉年华的详细信息。#l\r\n#L3#没什么，我改变主意了。#l");
                } else if (selection == 2) {
                    cm.sendSimple("记住，如果你有#t4001129#，你可以交换物品。选择您想要更改的项目！\r\n#b#L0# #t1122007# (" + n1 + " 硬币)#l\r\n#L1# #t2041211# (" + n2 + " 硬币)#l\r\n#L2#战士武器#l\r\n#L3#魔法师武器#l\r\n#L4#弓箭手武器#l\r\n#L5#飞侠武器#l\r\n#L6#海盗武器#l");
                } else if (selection == 3) {
                    cm.getChar().saveLocation("MONSTER_CARNIVAL");
                    cm.warp(980030000, 0);
                    cm.dispose();
                    return;
                } else if (selection == 4) {
                    var selStr = "很好，相反我提供一个坚定的#b矿石精炼#k为你服务，征税#r" + ((feeMultiplier * 100) | 0) + "%#k 超过了合成它们的通常费用。你会怎么做？#b";

                    var options = new Array("提炼矿石","提炼宝石矿石");
                    if(refineCrystals) {
                        options.push("完善水晶矿石");
                    }
                    if(refineRocks) {
                        options.push("完善板/珠宝");
                    }

                    for (var i = 0; i < options.length; i++){
                        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
                    }

                    cm.sendSimple(selStr);
                    
                    status = 76;
                }
            } else if (status == 2) {
                select = selection;
                if (select == 0) {
                    if (cm.haveItem(4001129, n1) && cm.canHold(4001129)) {
                        cm.gainItem(1122007, 1);
                        cm.gainItem(4001129, -n1);
                        cm.dispose();
                    } else {
                        cm.sendOk("检查一下，看看你是否丢失了#b#t4001129##k或者你的装备已经满了。");
                        cm.dispose();
                    }
                } else if (select == 1) {
                    if (cm.haveItem(4001129, n2) && cm.canHold(2041211)) {
                        cm.gainItem(2041211, 1);
                        cm.gainItem(4001129, -n2);
                        cm.dispose();
                    } else {
                        cm.sendOk("检查一下，看看你是否丢失了#b#t4001129##k或者你的使用背包已经满了。");
                        cm.dispose();
                    }
                } else if (select == 2) {//S2 Warrior 26 S3 Magician 6 S4 弓箭手 6 S5 Thief 8
                    status = 10;
                    cm.sendSimple("请确认你有#t4001129 #你想要的武器。选择你想交易的武器# 4001129#。我的选择真的很好，我不是那个对那些说这种话的人说话的人!\r\n#b#L0# #z1302004# (" + n3 + " 硬币)#l\r\n#L1# #z1402006# (" + n3 + " 硬币)#l\r\n#L2# #z1302009# (" + n4 + " 硬币)#l\r\n#L3# #z1402007# (" + n4 + " 硬币)#l\r\n#L4# #z1302010# (" + n5 + " 硬币)#l\r\n#L5# #z1402003# (" + n5 + " 硬币)#l\r\n#L6# #z1312006# (" + n3 + " 硬币)#l\r\n#L7# #z1412004# (" + n3 + " 硬币)#l\r\n#L8# #z1312007# (" + n4 + " 硬币)#l\r\n#L9# #z1412005# (" + n4 + " 硬币)#l\r\n#L10# #z1312008# (" + n5 + " 硬币)#l\r\n#L11# #z1412003# (" + n5 + " 硬币)#l\r\n#L12#继续到下一页 (1/2)#l");
                } else if (select == 3) {
                    status = 20;
                    cm.sendSimple("选择你想交易的武器。我这里的武器非常吸引人。你自己看! \r\n#b#L0# #z1372001# (" + n3 + " 硬币)#l\r\n#L1# #z1382018# (" + n3 + " 硬币)#l\r\n#L2# #z1372012# (" + n4 + " 硬币)#l\r\n#L3# #z1382019# (" + n4 + " 硬币)#l\r\n#L4# #z1382001# (" + n5 + " 硬币)#l\r\n#L5# #z1372007# (" + n5 + " 硬币)#l");
                } else if (select == 4) {
                    status = 30;
                    cm.sendSimple("选择你想交易的武器。我这里的武器非常吸引人。你自己看!\r\n#b#L0# #z1452006# (" + n3 + " 硬币)#l\r\n#L1# #z1452007# (" + n4 + " 硬币)#l\r\n#L2# #z1452008# (" + n5 + " 硬币)#l\r\n#L3# #z1462005# (" + n3 + " 硬币)#l\r\n#L4# #z1462006# (" + n4 + " 硬币)#l\r\n#L5# #z1462007# (" + n5 + " 硬币)#l");
                } else if (select == 5) {
                    status = 40;
                    cm.sendSimple("选择你想交易的武器。我所拥有的武器都是高质量的。选择一个最吸引你的! \r\n#b#L0# #z1472013# (" + n3 + " 硬币)#l\r\n#L1# #z1472017# (" + n4 + " 硬币)#l\r\n#L2# #z1472021# (" + n5 + " 硬币)#l\r\n#L3# #z1332014# (" + n3 + " 硬币)#l\r\n#L4# #z1332031# (" + n4 + " 硬币)#l\r\n#L5# #z1332011# (" + n4 + " 硬币)#l\r\n#L6# #z1332016# (" + n5 + " 硬币)#l\r\n#L7# #z1332003# (" + n5 + " 硬币)#l");
                } else if (select == 6) {
                    status = 50; //pirate rewards
                    cm.sendSimple("选择你想交易的武器。我所拥有的武器都是高质量的。选择一个最吸引你的! \r\n#b#L0# #z1482005# (" + n3 + " 硬币)#l \r\n#b#L1# #z1482006# (" + n4 + " 硬币)#l \r\n#b#L2# #z1482007# (" + n5 + " 硬币)#l \r\n#b#L3# #z1492005# (" + n3 + " 硬币)#l \r\n#b#L4# #z1492006# (" + n4 + " 硬币)#l \r\n#b#L5# #z1492007# (" + n5 + " 硬币)#l");
                }
            } else if (status == 11) {
                if (selection == 12) {
                    cm.sendSimple("选择你想交易的武器。我这里的武器非常有用。看一看!\r\n#b#L0# #z1322015# (" + n3 + " 硬币)#l\r\n#L1# #z1422008# (" + n3 + " 硬币)#l\r\n#L2# #z1322016# (" + n4 + " 硬币)#l\r\n#L3# #z1422007# (" + n4 + " 硬币)#l\r\n#L4# #z1322017# (" + n5 + " 硬币)#l\r\n#L5# #z1422005# (" + n5 + " 硬币)#l\r\n#L6# #z1432003# (" + n3 + " 硬币)#l\r\n#L7# #z1442003# (" + n3 + " 硬币)#l\r\n#L8# #z1432005# (" + n4 + " 硬币)#l\r\n#L9# #z1442009# (" + n4 + " 硬币)#l\r\n#L10# #z1442005# (" + n5 + " 硬币)#l\r\n#L11# #z1432004# (" + n5 + " 硬币)#l\r\n#L12#回到第一页 (2/2)#l");
                } else {
                    var item = new Array(1302004, 1402006, 1302009, 1402007, 1302010, 1402003, 1312006, 1412004, 1312007, 1412005, 1312008, 1412003);
                    var cost = new Array(n3, n3, n4, n4, n5, n5, n3, n3, n4, n4, n5);
                    if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                        cm.gainItem(item[selection], 1);
                        cm.gainItem(4001129, -cost[selection]);
                        cm.dispose();
                    } else {
                        cm.sendOk("你的钱不够#b#t4001129##k，或者你的背包已经满了。请再检查一次。");
                        cm.dispose();
                    }
                }
            } else if (status == 12) {
                if (selection == 12) {
                    status = 10;
                    cm.sendSimple("请确认你有#b#t4001129##k你想要的武器。选择你想交易的武器#t4001129#。我的选择真的很好，我不是那个对那些说这种话的人说话的人！\r\n#b#L0# #z1302004# (" + n3 + " 硬币)#l\r\n#L1# #z1402006# (" + n3 + " 硬币)#l\r\n#L2# #z1302009# (" + n4 + " 硬币)#l\r\n#L3# #z1402007# (" + n4 + " 硬币)#l\r\n#L4# #z1302010# (" + n5 + " 硬币)#l\r\n#L5# #z1402003# (" + n5 + " 硬币)#l\r\n#L6# #z1312006# (" + n3 + " 硬币)#l\r\n#L7# #z1412004# (" + n3 + " 硬币)#l\r\n#L8# #z1312007# (" + n4 + " 硬币)#l\r\n#L9# #z1412005# (" + n4 + " 硬币)#l\r\n#L10# #z1312008# (" + n5 + " 硬币)#l\r\n#L11# #z1412003# (" + n5 + " 硬币)#l\r\n#L12#继续到下一页(1/2)#l");
                } else {
                    var item = new Array(1322015, 1422008, 1322016, 1422007, 1322017, 1422005, 1432003, 1442003, 1432005, 1442009, 1442005, 1432004);
                    var cost = new Array(n3, n3, n4, n4, n5, n5, n3, n3, n4, n4, n5, n5);
                    if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                        cm.gainItem(item[selection], 1);
                        cm.gainItem(4001129, -cost[selection]);
                        cm.dispose();
                    } else {
                        cm.sendOk("你的钱不够#b#t4001129##k，或者你的背包已经满了。请再检查一次。");
                        cm.dispose();
                    }
                }
            } else if (status == 21) {
                var item = new Array(1372001, 1382018, 1372012, 1382019, 1382001, 1372007);
                var cost = new Array(n3, n3, n4, n4, n5, n5);
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你的钱不够#b#t4001129##k，或者你的背包已经满了。请再检查一次。");
                    cm.dispose();
                }
            } else if (status == 31) {
                var item = new Array(1452006, 1452007, 1452008, 1462005, 1462006, 1462007);
                var cost = new Array(n3, n4, n5, n3, n4, n5);
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你的钱不够#b#t4001129##k，或者你的背包已经满了。请再检查一次。");
                    cm.dispose();
                }
            } else if (status == 41) {
                var item = new Array(1472013, 1472017, 1472021, 1332014, 1332031, 1332011, 1332016, 1332003);
                var cost = new Array(n3, n4, n5, n3, n4, n4, n5, n5);
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你的钱不够#b#t4001129##k，或者你的背包已经满了。请再检查一次。");
                    cm.dispose();
                }
            } else if (status == 51) {
                var item = new Array(1482005, 1482006, 1482007, 1492005, 1492006, 1492007);
                var cost = new Array(n3, n4, n5, n3, n4, n5);
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你的钱不够#b#t4001129##k，或者你的背包已经满了。请再检查一次。");
                    cm.dispose();
                }
            } else if (status == 61) {
                select = selection;
                if (selection == 0) {
                    cm.sendNext("哈哈！我是休彼德蔓，这个怪物嘉年华的领导者。我在这里得到了第一个“怪物嘉年华”，等着像你这样的游客参加这个盛会！");
                } else if (selection == 1) {
                    cm.sendNext("#b怪物嘉年华#k 由两个小组组成，进入战场，放下对方召唤的怪物。#b根据获得的嘉年华点数（CP）确定胜利者的战斗旅#k。");
                } else if (selection == 2) {
                    cm.sendNext("当你进入嘉年华区域时，你会看到怪物列表窗口出现。您只需选择要使用的内容，然后按OK。很简单，对吧？");
                } else {
                    cm.dispose();
                }
            } else if (status == 62) {
                if (select == 0) {
                    cm.sendNext("什么是#b怪物嘉年华#k？哈哈哈！让我们说这是一次你永远不会忘记的经历！这是一场与你一样的其他旅行者的战斗！#k");
                } else if (select == 1) {
                    cm.sendNext("当进入嘉年华场地时，你的任务是通过杀死对方的怪物来获得CP，并使用这些CP分散对方的注意力，使其无法击中怪物。");
                } else if (select == 2) {
                    cm.sendNext("一旦习惯了这些命令，请尝试使用TAB和F1~F12。选项卡在怪物调用/技能/保护器之间切换，F1~F12允许您直接访问其中一个窗口。");
                }
            } else if (status == 63) {
                if (select == 0) {
                    cm.sendNext("我知道你们用真枪实弹打仗太危险了；我不会建议这样的野蛮行为。不是我的朋友，是我为比赛提供的。战斗的激情以及与如此强大和积极的人竞争的激情。我提供的前提是，你的团队和对方团队都参与了怪物，并击败了对方团队调用的怪物。这就是怪物嘉年华的精髓所在。此外，你可以使用怪物嘉年华期间赚取的枫树硬币来获得新物品和武器！");
                } else if (select == 1) {
                    cm.sendNext("有三种方法可以分散对方的注意力：召唤怪物、异能和保护者。如果你想了解更多关于“详细说明”的信息，我会给你更深入的了解！");
                } else if (select == 2) {
                    cm.sendNext("#b召唤#k怪物召唤一个在其控制下攻击对方的怪物。使用CP带来一个被召唤的怪物，它将出现在同一区域，攻击对方。");
                }
            } else if (status == 64) {
                if (select == 0) {
                    cm.sendNext("当然，事情没那么简单。还有其他的方法来阻止其他团体投掷怪物，这取决于你如何做到这一点。你怎么认为？对友谊赛感兴趣吗？");
                    cm.dispose();
                } else if (select == 1) {
                    cm.sendNext("请记住。保持你的CP从来都不是个好主意您使用的CP将帮助确定怪物嘉年华的赢家和输家。");
                } else if (select == 2) {
                    cm.sendNext("#b能力#k可以选择使用黑暗、虚弱等技能来阻止对方杀死其他怪物。不需要很多CP，但它是值得的。唯一的问题是它们不会持续很长时间。明智地使用这个策略！");
                }
            } else if (status == 65) {
                if (select == 1) {
                    cm.sendNext("哦，别担心会变成鬼。在怪物嘉年华中，你死后不会失去经验。所以这真的是一次前所未有的经历！");
                    cm.dispose();
                } else if (select == 2) {
                    cm.sendNext("#b保护者#k基本上是一个被调用的物品，它可以极大地提高你的团队所调用的怪物的能力。保护者会一直工作到被对方摧毁，所以我希望你先召唤几个怪物，然后带上保护者。");
                }
            } else if (status == 66) {
                cm.sendNext("最后，在怪物嘉年华中，您不能使用随身携带的物品/恢复药剂。与此同时，怪物们让这些物品永远掉落。当和当您设置它们时，该项目将立即激活。这就是为什么知道什么时候买这些东西很重要。");
                cm.dispose();
            } else if (status == 77) {
                var allDone;

                if (selection == 0) {
                    allDone = refineItems(0); // minerals
                } else if (selection == 1) {
                    allDone = refineItems(1); // jewels
                } else if (selection == 2 && refineCrystals) {
                    allDone = refineItems(2); // crystals
                } else if (selection == 2 && !refineCrystals || selection == 3) {
                    allDone = refineRockItems(); // moon/star rock
                }

                if(allDone) {
                    cm.sendOk("完成。谢谢你的光临~。");
                } else {
                    cm.sendOk("完成。请注意，有些项目无法合成，因为您的背包库存空间不足，或者没有足够的金币来支付费用。");
                }
                cm.dispose();
            }
        }
    }
}

function getRefineFee(fee) {
    return ((feeMultiplier * fee) | 0);
}

function isRefineTarget(refineType, refineItemid) {
    if(refineType == 0) { //mineral refine
        return refineItemid >= 4010000 && refineItemid <= 4010007 && !(refineItemid == 4010007 && !refineSpecials);
    } else if(refineType == 1) { //jewel refine
        return refineItemid >= 4020000 && refineItemid <= 4020008 && !(refineItemid == 4020008 && !refineSpecials);
    } else if(refineType == 2) { //crystal refine
        return refineItemid >= 4004000 && refineItemid <= 4004004 && !(refineItemid == 4004004 && !refineSpecials);
    }
    
    return false;
}

function getRockRefineTarget(refineItemid) {
    if(refineItemid >= 4011000 && refineItemid <= 4011006) {
        return 0;
    } else if(refineItemid >= 4021000 && refineItemid <= 4021008) {
        return 1;
    }
    
    return -1;
}

function refineItems(refineType) {
    var allDone = true;
    
    var refineFees = [[300,300,300,500,500,500,800,270],[500,500,500,500,500,500,500,1000,3000],[5000,5000,5000,5000,1000000]];
    var itemCount = {};
    
    var iter = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).iterator();
    while (iter.hasNext()) {
        var it = iter.next();
        var itemid = it.getItemId();

        if(isRefineTarget(refineType, itemid)) {
            var ic = itemCount[itemid];
            
            if(ic != undefined) {
                itemCount[itemid] += it.getQuantity();
            } else {
                itemCount[itemid] = it.getQuantity();
            }
        }
    }
    
    for(var key in itemCount) {
        var itemqty = itemCount[key];
        var itemid = parseInt(key);
        
        var refineQty = ((itemqty / 10) | 0);
        if(refineQty <= 0) continue;
        
        while(true) {
            itemqty = refineQty * 10;
        
            var fee = getRefineFee(refineFees[refineType][(itemid % 100) | 0] * refineQty);
            if(cm.canHold(itemid + 1000, refineQty, itemid, itemqty) && cm.getMeso() >= fee) {
                cm.gainMeso(-fee);
                cm.gainItem(itemid, -itemqty);
                cm.gainItem(itemid + (itemid != 4010007 ? 1000 : 1001), refineQty);
                
                break;
            } else if(refineQty <= 1) {
                allDone = false;
                break;
            } else {
                refineQty--;
            }
        }
    }
    
    return allDone;
}

function refineRockItems() {
    var allDone = true;
    var minItems = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    var minRocks = [2147483647, 2147483647];
    
    var rockItems = [4011007, 4021009];
    var rockFees = [10000, 15000];

    var iter = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).iterator();
    while (iter.hasNext()) {
        var it = iter.next();
        var itemid = it.getItemId();
        var rockRefine = getRockRefineTarget(itemid);
        if(rockRefine >= 0) {
            var rockItem = ((itemid % 100) | 0);
            var itemqty = it.getQuantity();
            
            minItems[rockRefine][rockItem] += itemqty;
        }
    }
    
    for(var i = 0; i < minRocks.length; i++) {
        for(var j = 0; j < minItems[i].length; j++) {
            if(minRocks[i] > minItems[i][j]) {
                minRocks[i] = minItems[i][j];
            }
        }
        if(minRocks[i] <= 0 || minRocks[i] == 2147483647) continue;
        
        var refineQty = minRocks[i];
        while(true) {
            var fee = getRefineFee(rockFees[i] * refineQty);
            if(cm.canHold(rockItems[i], refineQty) && cm.getMeso() >= fee) {
                cm.gainMeso(-fee);

                var j;
                if(i == 0) {
                    for(j = 4011000; j < 4011007; j++) {
                        cm.gainItem(j, -refineQty);
                    }
                    cm.gainItem(j, refineQty);
                } else {
                    for(j = 4021000; j < 4021009; j++) {
                        cm.gainItem(j, -refineQty);
                    }
                    cm.gainItem(j, refineQty);
                }
                
                break;
            } else if(refineQty <= 1) {
                allDone = false;
                break;
            } else {
                refineQty--;
            }
        }
    }
    
    return allDone;
}
