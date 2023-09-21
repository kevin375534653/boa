/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>
    Copyleft (L) 2016 - 2018 RonanLana (HeavenMS)

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

importPackage(Packages.config);

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
        cm.sendOk("我的师傅要求#r关闭#k道场，所以我不能让你进来.");
        cm.dispose();
        return;
    }
    
    belt_points = YamlConfig.config.server.USE_FAST_DOJO_UPGRADE ? Array(10, 90, 200, 460, 850) : Array(200, 1800, 4000, 9200, 17000);
    
    belt_on_inventory = new Array();
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
        if (mode == 1)
            status++;
        
        if(status == 0) {
            if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                var text = "我很惊讶你走了这么远!但从现在开始，这并不容易。你还想挑战吗?\r\n\r\n#b#L0#我想继续#l\r\n#L1#我想离开#l\r\n";
                if (!cm.getPlayer().getDojoParty()) {
                    text += "#L2#我想记录下我到目前为止的分数#l";
                }
                cm.sendSimple(text);
            } else if (cm.getPlayer().getLevel() >= 25) {
                if (cm.getPlayer().getMap().getId() == 925020001) {
                    cm.sendSimple("我师父可是武陵最厉害的人，你居然要对他进行挑战？日后可别后悔了.\r\n\r\n#b#L0#个人进行挑战.#l\r\n#L1#组队进行挑战.#l\r\n\r\n#L2#我想要获取腰带.#l\r\n#L3#我想重置我的训练点.#l\r\n#L4#我想要一枚奖章.#l\r\n#L5#武陵道场是什么?#l");
                } else {
                    cm.sendYesNo("什么，你放弃了？你真的想离开吗?");
                }
            } else {
                cm.sendOk("嘿！你在嘲笑我的师傅吗？你认为你要挑战谁？这是个笑话！你至少需要#b25个#k..");
                cm.dispose();
                return;
            }
        } else {
            if (cm.getPlayer().getMap().getId() == 925020001) {
                if (mode >= 0) {
                    if (status == 1)
                        selectedMenu = selection;
                    if (selectedMenu == 0) { //I want to challenge him alone.
                        if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                            if (status == 1) {
                                cm.sendYesNo("嘿!你!这是你第一次吗?我的主人不会见任何人。他是个大忙人。从你的长相来看，我觉得他不会介意。哈!但是，今天是你的幸运日…我告诉你，如果你能打败我，我就允许你见我的主人。你怎么看?");
                            } else if (status == 2) {
                                if (mode == 0) {
                                    cm.sendNext("哈哈!你想用这样的心打动谁?\r\n回到属于你的家!");
                                    cm.dispose();
                                    return;
                                } else {
                                    var avDojo = cm.getClient().getChannelServer().getAvailableDojo(true);

                                    if(avDojo < 0) {
                                        if(avDojo == -1) cm.sendOk("道场已经有人在挑战了，请稍等片刻再重试。");
                                        else cm.sendOk("已经有人在使用道场了，或者您的一方在道场上分配的时间尚未过期。等待他们完成进入。");
                                    }
                                    else {
                                        cm.getClient().getChannelServer().getMapFactory().getMap(925020010 + avDojo).resetMapObjects();
                                        cm.getClient().getChannelServer().resetDojo(925020010 + avDojo);
                                        
                                        cm.resetDojoEnergy();
                                        cm.warp(925020010 + avDojo, 0);
                                    }

                                    cm.dispose();
                                    return;
                                }
                            }
                        } else if (cm.getPlayer().getDojoStage() > 0) {
                            dojoWarp = cm.getPlayer().getDojoStage();
                            cm.getPlayer().setDojoStage(0);
                            cm.sendYesNo("上次你自己接受挑战的时候，你去了 等级 #b" + dojoWarp + "#k. 我现在就可以带你去。你想去那儿吗? (选择 #rNo#k 删除这条记录.)");
                        } else {
                            var avDojo = cm.getClient().getChannelServer().getAvailableDojo(false);

                            if(avDojo < 0) {
                                if(avDojo == -1) cm.sendOk("所有的道场都已经在使用了。等一会儿再试。");
                                else cm.sendOk("要么您的团队已经在使用道场，要么您的团队在道场上的分配时间还没有过期。等待他们完成进入。");
                                
                                cm.getPlayer().setDojoStage(dojoWarp);
                            } else {
                                var warpDojoMap = 925020000 + (dojoWarp + 1) * 100 + avDojo;
                                cm.getClient().getChannelServer().resetDojoMap(warpDojoMap);
                                cm.getClient().getChannelServer().resetDojo(warpDojoMap);
                                
                                cm.resetDojoEnergy();
                                cm.warp(warpDojoMap, 0);
                            }

                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 1) { //I want to challenge him with a party.
                        var party = cm.getPlayer().getParty();
                        if (party == null) {
                            cm.sendNext("你想去哪儿?你甚至不是队长!去告诉你们的队长跟我谈谈。");
                            cm.dispose();
                            return;
                        }
                        
                        if (party.getLeader().getId() != cm.getPlayer().getId()) {
                            cm.sendNext("你想去哪儿?你甚至不是队长!去告诉你们的队长跟我谈谈。");
                            cm.dispose();
                            return;
                        }

                        //else if (party.getMembers().size() == 1) {
                        //    cm.sendNext("You're going to take on the challenge as a one-man party?");
                        //}

                        else if (!isBetween(party, 30)) {
                            cm.sendNext("你的队友的等级范围太高而不能进入。请确保所有队员都在 #r30 级#k 范围内.");
                            cm.dispose();
                            return;
                        } else {
                            var avDojo = cm.getClient().getChannelServer().getAvailableDojo(true, cm.getParty());

                            if(avDojo < 0) {
                                if(avDojo == -1) cm.sendOk("所有的道场都已经在使用了。等一会儿再试.");
                                else cm.sendOk("要么您的团队已经在使用道场，要么您的团队在道场上的分配时间还没有过期。等待他们完成进入。");
                            } else {
                                cm.getClient().getChannelServer().resetDojoMap(925030100 + avDojo);
                                cm.getClient().getChannelServer().resetDojo(925030100 + avDojo);
                                
                                cm.resetPartyDojoEnergy();
                                cm.warpParty(925030100 + avDojo);
                            }

                            cm.dispose();
                            return;
                        }

                    } else if (selectedMenu == 2) { //I want to receive a belt.
                        if (!cm.canHold(belts[0])) {
                            cm.sendNext("在领取腰带之前，在你的装备栏中留出空间！");
                            cm.dispose();
                            return;
                        }
                        if (mode < 1) {
                            cm.dispose();
                            return;
                        }
                        if (status == 1) {
                            var selStr = "你有#b" + cm.getPlayer().getDojoPoints() + "#k 训练点数。 师父更喜欢有才华的人。 如果您获得的分数高于平均分，您可以根据您的分数获得一条腰带。\r\n";
                            for (var i = 0; i < belts.length; i++) {
                                if (belt_on_inventory[i]) {
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "# (Already on inventory)";
                                } else
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#";
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
                                    if(selection > 0) cm.gainItem(oldbelt, -1);
                                    cm.gainItem(belt, 1);
                                    cm.getPlayer().setDojoPoints(cm.getPlayer().getDojoPoints() - points);
                                    cm.sendNext("你有 #i" + belt + "# #b#t" + belt + "##k. 你已经证明了自己在道场排名上的勇气。 做得好！");
                                } else
                                    sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                            } else
                                sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);

                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 3) { //I want to reset my training points.
                        if (status == 1) {
                            cm.sendYesNo("你知道，如果你重置你的训练点数，它就会恢复为 0，对吧？ 不过，这并不总是坏事。 如果您可以在重置后重新开始赚取训练积分，则可以再次获得腰带。 您现在想重置您的训练点数吗？");
                        } else if (status == 2) {
                            if (mode == 0) {
                                cm.sendNext("你需要自己收集还是什么？ 深呼吸后回来。");
                            } else {
                                cm.getPlayer().setDojoPoints(0);
                                cm.sendNext("那里！ 您的所有训练点均已重置。 把它当作一个新的开始，努力训练！");
                            }
                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 4) { //I want to receive a medal.
                        if (status == 1 && cm.getPlayer().getVanquisherStage() <= 0) {
                            cm.sendYesNo("您还没有尝试过获得奖牌吗？ 如果你在武陵道场#b100次#k击败一种怪物，你可以获得一个名为 #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k. 看来您还没有获得 #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k... 您想尝试一下 #b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k?");
                        } else if (status == 2 || cm.getPlayer().getVanquisherStage() > 0) {
                            if (mode == 0) {
                                cm.sendNext("如果你不想，也没关系。");
                            } else {
                                if (cm.getPlayer().getDojoStage() > 37) {
                                    cm.sendNext("您已完成所有奖牌挑战。");
                                } else if (cm.getPlayer().getVanquisherKills() < 100 && cm.getPlayer().getVanquisherStage() > 0)
                                    cm.sendNext("你还需要 #b" + (100 - cm.getPlayer().getVanquisherKills()) + "#k 以获得#b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k。 请再努力一点。 提醒一下，只有在武陵道场被师父召唤的怪物才会被考虑。 哦，并确保你没有猎杀怪物并退出！#r 如果你在击败怪物后没有进入下一个级别，则不算胜利#k。");
                                else if (cm.getPlayer().getVanquisherStage() <= 0) {
                                    cm.getPlayer().setVanquisherStage(1);
                                } else {
                                    cm.sendNext("您已获得 #b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k.");
                                    cm.gainItem(1142033 + cm.getPlayer().getVanquisherStage(), 1);
                                    cm.getPlayer().setVanquisherStage(cm.c.getPlayer().getVanquisherStage() + 1);
                                    cm.getPlayer().setVanquisherKills(0);
                                }
                            }

                            cm.dispose();
                            return;
                        } else {
                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                        cm.sendNext("我们的师父是穆龙最强壮的人。他建造的地方叫牧龙道场，那是一座建筑 #r有 38 层楼#k 高!你可以在每一级训练自己。当然，像你这样级别的人很难达到顶峰。");
                        cm.dispose();
                        return;
                    }
                } else {
                    cm.dispose();
                    return;
                }
            } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                if (selectedMenu == -1)
                    selectedMenu = selection;
                
                if (selectedMenu == 0) {
                    var hasParty = (cm.getParty() != null);
                    
                    var firstEnter = false;
                    var avDojo = cm.getClient().getChannelServer().lookupPartyDojo(cm.getParty());
                    if(avDojo < 0) {
                        if(hasParty) {
                            if(!cm.isPartyLeader()) {
                                cm.sendOk("You are not the leader! Call your party leader to talk to me if you wish to continue.");
                                cm.dispose();
                                return;
                            }
                            
                            if(!isBetween(cm.getParty(), 35)) {
                                cm.sendOk("你不是队长！ 如果您想继续，请让你的队长与我交谈。");
                                cm.dispose();
                                return;
                            }
                        }
                        
                        avDojo = cm.getClient().getChannelServer().getAvailableDojo(hasParty, cm.getParty());
                        firstEnter = true;
                    }

                    if(avDojo < 0) {
                        if(avDojo == -1) cm.sendOk("所有道场都已被使用。 等待一段时间后再重试。");
                        else cm.sendOk("你的队伍已经进入了道场。 等待报名时间结束再次进入。");
                    } else {
                        var baseStg = hasParty ? 925030000 : 925020000;
                        var nextStg = Math.floor((cm.getPlayer().getMap().getId() + 100) / 100) % 100;

                        var dojoWarpMap = baseStg + (nextStg * 100) + avDojo;
                        if(firstEnter) {
                            cm.getClient().getChannelServer().resetDojoMap(dojoWarpMap);
                            cm.getClient().getChannelServer().resetDojo(dojoWarpMap, nextStg - 1);
                        }
                        
                        //non-leader party members can progress whilst having the record saved if they don't command to enter the next stage
                        cm.getPlayer().setDojoStage(0);
                        
                        if(!hasParty || !cm.isLeader()) cm.warp(dojoWarpMap, 0);
                        else cm.warpParty(dojoWarpMap, 0);
                    }

                    cm.dispose();
                    return;
                } else if (selectedMenu == 1) { //I want to leave
                    if (status == 1) {
                        cm.sendYesNo("那么，你要放弃吗？ 你真的要离开吗？");
                    } else {
                        if (mode == 1) {
                            cm.warp(925020002, "st00");
                        }
                        cm.dispose();
                        return;
                    }
                } else if (selectedMenu == 2) { //I want to record my score up to this point
                    if (status == 1) {
                        cm.sendYesNo("如果您记录了分数，下次就可以从上次中断的地方开始。 是不是很方便？ 您想记录您当前的分数吗？");
                    } else {
                        if (mode == 0) {
                            cm.sendNext("你认为你还能走得更高吗？ 祝你好运！");
                        } else if (cm.getPlayer().getDojoStage() == Math.floor(cm.getMapId() / 100) % 100) {
                            cm.sendOk("您的分数已被记录。 下次挑战道场的时候，就可以回到这里了。");
                        } else {
                            cm.sendNext("我记录了你的分数。 如果你下次上去时告诉我，你就可以从上次停下的地方开始。 请注意，如果您选择#b继续挑战道场#k，您的#r记录将被删除#k，因此请谨慎选择。");
                            cm.getPlayer().setDojoStage(Math.floor(cm.getMapId() / 100) % 100);
                        }
                        cm.dispose();
                        return;
                    }
                }
            } else {
                if (mode == 0) {
                    cm.sendNext("别再改变主意了！ 很快，你就会哭着求我回去。");
                } else if (mode == 1) {
                    var dojoMapId = cm.getPlayer().getMap().getId();
                    
                    cm.warp(925020002, 0);
                    cm.getPlayer().message("请问你能拿定主意吗？");
                    
                    cm.getClient().getChannelServer().freeDojoSectionIfEmpty(dojoMapId);
                }
                cm.dispose();
            }
        }
    }
}

function sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points) {
    var beltReqStr = (oldbelt != -1) ? " 你必须有 #i" + oldbelt + "# 背包中的腰带" : "";
    
    var pointsLeftStr = (points - cm.getPlayer().getDojoPoints() > 0) ? " 你需要 #r" + (points - cm.getPlayer().getDojoPoints()) + "#k 更多训练点数" : "";
    var beltLeftStr = (!haveOldbelt) ? " 您的装备栏中必须有未装备且可用的所需腰带" : "";
    var conjStr = (pointsLeftStr.length > 0 && beltLeftStr.length > 0) ? " 和" : "";
        
    cm.sendNext("为了接收 #i" + belt + "# #b#t" + belt + "##k," + beltReqStr + " 你的等级必须至少超过 #b" + level + "#k 并且你需要 至少获得 #b" + points + " 训练点数#k.\r\n\r\n如果你想获得这条腰带，" + beltLeftStr + conjStr + pointsLeftStr + ".");
}

function isRestingSpot(id) {
    return (Math.floor(id / 100) % 100) % 6 == 0 && id != 925020001;
}

function isBetween(party, range) {
    var lowest = cm.getPlayer().getLevel();
    var highest = lowest;
    for (var x = 0; x < party.getMembers().size(); x++) {
        var lvl = party.getMembers().get(x).getLevel();
        if (lvl > highest)
            highest = lvl;
        else if (lvl < lowest)
            lowest = lvl;
    }
    return (highest - lowest) <= range;
}
