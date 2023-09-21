/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>
    Copyleft (L) 2016 - 2019 RonanLana (HeavenMS)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
* @Author: Moogra, XxOsirisxX, Ronan
* @NPC:    2091005
* @Name:   So Gong
* @Map(s): Dojo Hall
*/

var disabled = false;
var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);
var belt_on_inventory;
var belt_points;

var status = -1;
var selectedMenu = -1;
var dojoWarp = 0;

function start() {
    if (disabled) {
        cm.sendOk("我的师傅要求#r关闭#k道场，所以我不能让你进来。");
        cm.dispose();
        return;
    }

    const YamlConfig = Java.type('config.YamlConfig');
    belt_points = YamlConfig.config.server.USE_FAST_DOJO_UPGRADE ? Array(10, 90, 200, 460, 850) : Array(200, 1800, 4000, 9200, 17000);

    belt_on_inventory = [];
    for (var i = 0; i < belts.length; i++) {
        belt_on_inventory.push(cm.haveItemWithId(belts[i], true));
    }

    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.getPlayer().setDojoStage(dojoWarp);
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }

        if (status == 0) {
            if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                var text = "哇，真是厉害！可以轻松的来这。但是前面就不会这么简单！\r\n\r\n#b#L0#继续挑战#l\r\n#L1#我要离开#l\r\n";

                const MapId = Java.type('constants.id.MapId');
                if (!MapId.isPartyDojo(cm.getPlayer().getMapId())) {
                    text += "#L2#我想记录当前的分数#l";
                }
                cm.sendSimple(text);
            } else if (cm.getPlayer().getLevel() >= 25) {
                if (cm.getPlayer().getMap().getId() == 925020001) {
                    cm.sendSimple("师父是这里的第一强者。像你这种家伙也敢挑战？你会后悔的！\r\n\r\n#b#L0#个人挑战#l\r\n#L1#组队挑战#l\r\n#L2#换取腰带#l\r\n#L3#想初始化修炼点数#l\r\n#L4#换取勋章#l\r\n#L5#武陵道场是什么？#l");
                } else {
                    cm.sendYesNo("入场前弄丢了尾巴吗？哈哈，看来你是没力气了，感到害怕吧？");
                }
            } else {
                cm.sendOk("嘿！你在嘲笑我的师傅吗？你认为你要挑战谁？这是个笑话！你至少需要#b25#k级。");
                cm.dispose();

            }
        } else {
            if (cm.getPlayer().getMap().getId() == 925020001) {
                if (mode >= 0) {
                    if (status == 1) {
                        selectedMenu = selection;
                    }
                    if (selectedMenu == 0) { //I want to challenge him alone.
                        if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                            if (status == 1) {
                                cm.sendYesNo("这是你第一次挑战武陵道场吗，嗯？好吧，我的师傅他很忙。如果你能打败我，我就让你见见我的师傅？");
                            } else if (status == 2) {
                                if (mode == 0) {
                                    cm.sendNext("哈哈，失败了吧?\r\n请回去吧！");
                                    cm.dispose();

                                } else {
                                    var avDojo = cm.getClient().getChannelServer().ingressDojo(true, 0);

                                    if (avDojo < 0) {
                                        if (avDojo == -1) {
                                            cm.sendOk("其他人正在使用道场，请稍后进入。");
                                        } else {
                                            cm.sendOk("你的队伍正在挑战武陵道场，请等待他们完成后再次进入。");
                                        }
                                    } else {
                                        cm.getClient().getChannelServer().getMapFactory().getMap(925020010 + avDojo).resetMapObjects();

                                        cm.resetDojoEnergy();
                                        cm.warp(925020010 + avDojo, 0);
                                    }

                                    cm.dispose();

                                }
                            }
                        } else if (cm.getPlayer().getDojoStage() > 0) {
                            dojoWarp = cm.getPlayer().getDojoStage();
                            cm.getPlayer().setDojoStage(0);

                            var stageWarp = ((dojoWarp / 6) | 0) * 5;
                            cm.sendYesNo("在上次进行个人挑战的时候，你挑战到了第#b" + stageWarp + "层#k。我现在可以带你去。你想去那里吗？（选择#r不是#k会删除此记录。）");
                        } else {
                            var avDojo = cm.getClient().getChannelServer().ingressDojo(false, dojoWarp);

                            if (avDojo < 0) {
                                if (avDojo == -1) {
                                    cm.sendOk("其他人正在使用道场，请稍后进入。");
                                } else {
                                    cm.sendOk("你的队伍正在挑战武陵道场，请等待他们完成后再次进入。");
                                }

                                cm.getPlayer().setDojoStage(dojoWarp);
                            } else {
                                var warpDojoMap = 925020000 + (dojoWarp + 1) * 100 + avDojo;
                                cm.getClient().getChannelServer().resetDojoMap(warpDojoMap);

                                cm.resetDojoEnergy();
                                cm.warp(warpDojoMap, 0);
                            }

                            cm.dispose();

                        }
                    } else if (selectedMenu == 1) { //I want to challenge him with a party.
                        var party = cm.getPlayer().getParty();
                        if (party == null) {
                            cm.sendNext("你想去哪儿？你好像不是队长！去让你的队长和我谈谈。");
                            cm.dispose();
                            return;
                        }

                        if (party.getLeader().getId() != cm.getPlayer().getId()) {
                            cm.sendNext("你想去哪儿？你好像不是队长！去让你的队长和我谈谈。");
                            cm.dispose();

                        }

                            //else if (party.getMembers().size() == 1) {
                            //    cm.sendNext("你要以一个人的身份接受挑战？");
                        //}

                        else if (!isBetween(party, 30)) {
                            cm.sendNext("已经超出了等级范围，请确保你们所有的队员都在30级以内。");
                            cm.dispose();

                        } else {
                            var avDojo = cm.getClient().getChannelServer().ingressDojo(true, cm.getParty(), 0);

                            if (avDojo < 0) {
                                if (avDojo == -1) {
                                    cm.sendOk("其他人正在使用道场，请稍后进入。");
                                } else {
                                    cm.sendOk("你的队伍正在挑战武陵道场，请等待他们完成后再次进入。");
                                }
                            } else {
                                cm.getClient().getChannelServer().resetDojoMap(925030100 + avDojo);

                                cm.resetPartyDojoEnergy();
                                cm.warpParty(925030100 + avDojo);
                            }

                            cm.dispose();

                        }

                    } else if (selectedMenu == 2) { //I want to receive a belt.
                        if (!cm.canHold(belts[0])) {
                            cm.sendNext("在你的装备栏中留出空间，然后再尝试领取腰带！");
                            cm.dispose();
                            return;
                        }
                        if (mode < 1) {
                            cm.dispose();
                            return;
                        }
                        if (status == 1) {
                            var selStr = "你有#b" + cm.getPlayer().getDojoPoints() + "#k修炼点。师父喜欢有才能的人。如果你获得的分数高于平均分，你可以根据你的分数获得一条腰带。\r\n";
                            for (var i = 0; i < belts.length; i++) {
                                if (belt_on_inventory[i]) {
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "# (Already on inventory)";
                                } else {
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#";
                                }
                            }
                            cm.sendSimple(selStr);
                        } else if (status == 2) {
                            var belt = belts[selection];
                            var level = belt_level[selection];
                            var points = belt_points[selection];

                            var oldbelt = (selection > 0) ? belts[selection - 1] : -1;
                            var haveOldbelt = (oldbelt == -1 || cm.haveItemWithId(oldbelt, false));

                            if (selection > 0 && !belt_on_inventory[selection - 1]) {
                                sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                            } else if (cm.getPlayer().getDojoPoints() >= points) {
                                if (selection > 0 && !haveOldbelt) {
                                    sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                                } else if (cm.getPlayer().getLevel() > level) {
                                    if (selection > 0) {
                                        cm.gainItem(oldbelt, -1);
                                    }
                                    cm.gainItem(belt, 1);
                                    cm.getPlayer().setDojoPoints(cm.getPlayer().getDojoPoints() - points);
                                    cm.sendNext("这就是#i" + belt + "# #b#t" + belt + "##k。你已经证明了你的勇气去提升道场的等级。做得好！");
                                } else {
                                    sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                                }
                            } else {
                                sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                            }

                            cm.dispose();

                        }
                    } else if (selectedMenu == 3) { //I want to reset my training points.
                        if (status == 1) {
                            cm.sendYesNo("你确定要重置修炼点吗？不过，这并不总是件坏事。重置后可以重新开始获得修炼点，然后可以再次获得腰带。现在要重置修炼点吗？");
                        } else if (status == 2) {
                            if (mode == 0) {
                                cm.sendNext("重置以后修炼点会清零。确定吗？");
                            } else {
                                cm.getPlayer().setDojoPoints(0);
                                cm.sendNext("所有的修炼点都重置了。把它当作一个新的开始，努力训练！");
                            }
                            cm.dispose();

                        }
                    } else if (selectedMenu == 4) { //I want to receive a medal.
                        if (status == 1 && cm.getPlayer().getVanquisherStage() <= 0) {
                            cm.sendYesNo("你还没有勋章吗？如果你在一定时间内击败怪物，你可以获得#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k。看来你连#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k嗯...你想试试吗？#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k？");
                        } else if (status == 2 || cm.getPlayer().getVanquisherStage() > 0) {
                            if (mode == 0) {
                                cm.sendNext("If you don't want to, that's fine.");
                            } else {
                                if (cm.getPlayer().getDojoStage() > 37) {
                                    cm.sendNext("你已经完成了所有的挑战。");
                                } else if (cm.getPlayer().getVanquisherKills() < 100 && cm.getPlayer().getVanquisherStage() > 0) {
                                    cm.sendNext("你还需要#b" + (100 - cm.getPlayer().getVanquisherKills()) + "#k修炼点，#k为了获得#b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k。请继续努力！请击败怪物后离开！#r如果你在击败怪物后没有进入下一层，那就不算胜利。");
                                } else if (cm.getPlayer().getVanquisherStage() <= 0) {
                                    cm.getPlayer().setVanquisherStage(1);
                                } else {
                                    cm.sendNext("You have obtained #b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k.");
                                    cm.gainItem(1142033 + cm.getPlayer().getVanquisherStage(), 1);
                                    cm.getPlayer().setVanquisherStage(cm.c.getPlayer().getVanquisherStage() + 1);
                                    cm.getPlayer().setVanquisherKills(0);
                                }
                            }

                            cm.dispose();

                        } else {
                            cm.dispose();

                        }
                    } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                        cm.sendNext("我的师傅是武林最强之人，武陵道场是由师傅所建造的，共有38层，由37层建筑加上师傅的单独楼层所构成。一层一层的逐渐往上走，就可以修炼自己。当然凭你的实力要进入最后一层是十分困难的。");
                        cm.dispose();

                    }
                } else {
                    cm.dispose();

                }
            } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                if (selectedMenu == -1) {
                    selectedMenu = selection;
                }

                if (selectedMenu == 0) {
                    var hasParty = (cm.getParty() != null);

                    var firstEnter = false;
                    var avDojo = cm.getClient().getChannelServer().lookupPartyDojo(cm.getParty());
                    if (avDojo < 0) {
                        if (hasParty) {
                            if (!cm.isPartyLeader()) {
                                cm.sendOk("你不是队长！如果你想继续的话，请让你的队长与我交谈。");
                                cm.dispose();
                                return;
                            }

                            if (!isBetween(cm.getParty(), 35)) {
                                cm.sendOk("已经超出了等级范围，请确保你们所有的队员都在35级以内。");
                                cm.dispose();
                                return;
                            }
                        }

                        avDojo = cm.getClient().getChannelServer().ingressDojo(hasParty, cm.getParty(), Math.floor((cm.getPlayer().getMap().getId()) / 100) % 100);
                        firstEnter = true;
                    }

                    if (avDojo < 0) {
                        if (avDojo == -1) {
                            cm.sendOk("已经有人进入武陵道场了。请稍等片刻，然后再试一次。");
                        } else {
                            cm.sendOk("已经注册了道场，请等待注册时间结束后再次输入。");
                        }
                    } else {
                        var baseStg = hasParty ? 925030000 : 925020000;
                        var nextStg = Math.floor((cm.getPlayer().getMap().getId() + 100) / 100) % 100;

                        var dojoWarpMap = baseStg + (nextStg * 100) + avDojo;
                        if (firstEnter) {
                            cm.getClient().getChannelServer().resetDojoMap(dojoWarpMap);
                        }

                        //non-leader party members can progress whilst having the record saved if they don't command to enter the next stage
                        cm.getPlayer().setDojoStage(0);

                        if (!hasParty || !cm.isLeader()) {
                            cm.warp(dojoWarpMap, 0);
                        } else {
                            cm.warpParty(dojoWarpMap, 0);
                        }
                    }

                    cm.dispose();

                } else if (selectedMenu == 1) { //I want to leave
                    if (status == 1) {
                        cm.sendYesNo("你确定要离开吗？");
                    } else {
                        if (mode == 1) {
                            cm.warp(925020002, "st00");
                        }
                        cm.dispose();

                    }
                } else if (selectedMenu == 2) { //I want to record my score up to this point
                    if (status == 1) {
                        cm.sendYesNo("如果记录了分数，下次挑战的时候你可以从本次结束的地方开始。你想记录你现在的分数吗？");
                    } else {
                        if (mode == 0) {
                            cm.sendNext("你觉得你能走得更远吗？祝你好运！");
                        } else if (cm.getPlayer().getDojoStage() == Math.floor(cm.getMapId() / 100) % 100) {
                            cm.sendOk("你的分数已经记录下来了。下一次你要挑战武陵道场，你就可以从这里开始。");
                        } else {
                            cm.sendNext("我记录了你的分数。在你下次挑战你就可以从上次记录分数的地方开始了。请注意，如果你选择继续挑战，你记录的分数将被删除，因此请谨慎选择。");
                            cm.getPlayer().setDojoStage(Math.floor(cm.getMapId() / 100) % 100);
                        }
                        cm.dispose();

                    }
                }
            } else {
                if (mode == 0) {
                    cm.sendNext("别再改变主意了！很快，你就会哭了，求我回去。");
                } else if (mode == 1) {
                    var dojoMapId = cm.getPlayer().getMap().getId();

                    cm.warp(925020002, 0);
                    cm.getPlayer().message("你确定要离开吗？");

                    cm.getClient().getChannelServer().freeDojoSectionIfEmpty(dojoMapId);
                }
                cm.dispose();
            }
        }
    }
}

function sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points) {
    var beltReqStr = (oldbelt != -1) ? "你的背包已经有#i" + oldbelt + "#了。" : "";

    var pointsLeftStr = (points - cm.getPlayer().getDojoPoints() > 0) ? "至少还需要获得#r" + (points - cm.getPlayer().getDojoPoints()) + "#k修炼点" : "";
    var beltLeftStr = (!haveOldbelt) ? "你的腰带需要从装备栏中摘下放到背包中，并且背包需要留有空间。" : "";
    var conjStr = (pointsLeftStr.length > 0 && beltLeftStr.length > 0) ? " 并且" : "";

    cm.sendNext("在领取#i" + belt + "# #b#t" + belt + "##k之前，你需要达到#b" + level + "#k级，同时获得#b" + points + "修炼点#k。\r\n\r\n如果你想得到这条腰带，" + beltLeftStr + conjStr + pointsLeftStr + "。");
}

function isRestingSpot(id) {
    return (Math.floor(id / 100) % 100) % 6 == 0 && id != 925020001;
}

function isBetween(party, range) {
    var lowest = cm.getPlayer().getLevel();
    var highest = lowest;
    for (var x = 0; x < party.getMembers().size(); x++) {
        var lvl = party.getMembers().get(x).getLevel();
        if (lvl > highest) {
            highest = lvl;
        } else if (lvl < lowest) {
            lowest = lvl;
        }
    }
    return (highest - lowest) <= range;
}
