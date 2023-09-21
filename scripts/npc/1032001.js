/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
/* Grendel the Really Old
	Magician Job Advancement
	Victoria Road : Magic Library (101000003)

	Custom Quest 100006, 100008, 100100, 100101
*/

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
job = 210;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 2;

function start() {
    const GameConstants = Java.type('constants.game.GameConstants');
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "你已经走了很长的路来获得你今天所拥有的力量、智慧和勇气，不是吗？你觉得现在怎么样#r冒险岛荣耀大厅，持有你当前角色的图像#k? 你喜欢吗？";
        if (spawnPnpcFee > 0) {
            sendStr += "我可以为你做这件事#b " + cm.numberWithCommas(spawnPnpcFee) + "金币。#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("想成为#r魔法师#k吗？有一些标准需要满足。#b你的等级应该达到8级#k，与获得" + cm.getFirstJobStatRequirement(jobType) + "作为你的转职条件。让我看看你的能力。");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 200) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012)) {
                cm.sendNext("通过测试了吗？祝贺你！接下来，我将允许你在漫长的道路上迈出下一步。");
            } else if (cm.haveItem(4031009)) {
                cm.sendOk("去看看#b#p1072001##k。");
                cm.dispose();
            } else {
                cm.sendNext("你的等级已经达到了30级。你想进行2转吗？那好吧！");
            }
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("正在等你呢。几天前，从神秘岛的#b#p2020009##k那里。听说了有关你的事情。很好...我就来测试你的能力吧！在金银岛的某个地方，有通往其他次元的裂缝。一般人是进不去的，但是我会设法让你进去。你可以在裂缝里面见到我的分身，把他击倒后就会获得#b#t4031059##k，再请你把黑符拿到我这里来吧。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请击倒我的分身后，带着#b#t4031059##k回来找我。在金银岛的某个次元的裂缝里面可以找到他。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("怎么可能...竟然击倒了我的分身，拿回了#b#t4031059##k！好...通过这个考验，可以充分证明你的能力。以你目前的力量，完成三转是不会有问题的。按照约定给你#b#t4031057##k。戴着这个项链，回到神秘岛的#b#p2020011##k那里可以进行第二阶段的测试。那么祝你顺利完成三转...");
        } else {
            cm.sendOk("欢迎你来到魔法图书馆。不过这里好像没有你适合阅读的书哦。");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == -1 && selection == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && type == 0) {
        status -= 2;
    }

    if (status == -1) {
        start();
        return;
    } else {
        if (spawnPnpc) {
            if (mode > 0) {
                if (cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("对不起，你没有足够的金币来购买你在冒险岛荣耀大厅的位置。");
                    cm.dispose();
                    return;
                }

                const PlayerNPC = Java.type('server.life.PlayerNPC');
                const GameConstants = Java.type('constants.game.GameConstants');
                if (PlayerNPC.spawnPlayerNPC(GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("你走吧！希望你会喜欢它。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，冒险岛荣耀大厅现在已经满了…");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1) {
                    cm.sendOk("你知道没有其他选择…");
                }
                if (!(mode == 0 && type == 0)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status == 0) {
            if (cm.getLevel() >= 8 && cm.canGetFirstJob(jobType)) {
                cm.sendYesNo("哦…！你看起来绝对可以成为我们的一部分……你只需要一点智慧的头脑，然后…是的…你怎么看？想成为魔法师吗？");
            } else {
                cm.sendOk("多训练一点，直到你达到基本要求，我可以帮你转职成为#r魔法师#k。");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1372043)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(200);
                    cm.gainItem(1372043, 1);
                    cm.resetStats();
                }
                cm.sendNext("好吧，从这里开始，你成为了我们的一部分！你将在……过着流浪者的生活。但是你要有耐心，就会成长的。好吧，我会给你一些我的能力… 但不是很多，呵呵哈哈！");
            } else {
                cm.sendNext("你的背包满了，清理再来和我谈谈。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.sendNextPrev("你现在强大多了。我为你的每个背包栏都增加了空间。同时给了你一点#b技能点#k，当你打开#b技能#k，可以使用SP。不过还有一个提示：有一些技能，你只有在学会了一些技能之后才能掌握。");
        } else if (status == 3) {
            cm.sendNextPrev("但要记住，作为一个魔法师，智力是他们的主要属性，运气是他们的次要属性。使用#b自动分配#k可以自动强化这些能力。");
        } else if (status == 4) {
            cm.sendNextPrev("现在，再给你一个警告。如果你从现在开始在战斗中失败，你将会失去一部分经验值。要特别注意这一点，因为你的血量比大多数人都少。");
        } else if (status == 5) {
            cm.sendNextPrev("这就是我能教你的。祝你旅途好运，年轻的魔法师。");
        } else {
            cm.dispose();
        }
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012)) {
                cm.sendSimple("好吧，当你做出决定后，在下面点击 [我要转职] #b\r\n#L0#什么是法师 (火 / 毒).\r\n#L1#什么是法师 (冰 / 雷)\r\n#L2#什么是牧师\r\n#L3#我要转职");
            } else {
                cm.sendNext("在证明你的修炼成果和实力之前，我是不能让你转职的。我需要看看你是否真的有足够的能力通过测试，这不是一个很难的测试，相信你会做得很好。来，先把我的信拿走……别弄丢了！");
                if (!cm.isQuestStarted(100006)) {
                    cm.startQuest(100006);
                }
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031009)) {
                    if (!cm.haveItem(4031009)) {
                        cm.gainItem(4031009, 1);
                    }
                    cm.sendNextPrev("请把这封信送到#b#p1072001##k，在#b#m101020000##k附近，把信给他，他就代替我来考验你。祝你成功。");
                } else {
                    cm.sendNext("请在你的背包中留出一些空间。");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {
                        cm.sendNext("法师(火/毒)的魔法：#k\r\n\r\n#b#b法师(火/毒)#k可以使用强大的火属性和毒属性攻击的技能，这些能力使他们在攻击属性相克的怪物有了显著的优势。使用#r精神力#k和#r缓慢术，#b法师#k可以增加魔法力并降低怪物的移动速度。");    //f/p mage
                    } else if (selection == 1) {
                        cm.sendNext("法师(冰/雷)的魔法：#k\r\n\r\n#b#b法师(冰/雷)#k可以使用强大的冰属性和雷属性攻击的技能，这些能力使他们在攻击属性相克的怪物有了显著的优势。使用#r精神力#k和#r缓慢术，#b法师#k可以增加魔法力并降低怪物的移动速度。");    //i/l mage
                    } else {
                        cm.sendNext("牧师具有神圣的魔法：\r\n\r\n#b牧师#k有着强大的神圣技能，一定会被任何组队接受。因为他们拥有#r治愈术#k，可以治愈自己和组队的其他人。使用#r祝福#k和#r神之保护#k，#b牧师#k可以提高属性并减少怪物伤害。#b牧师#k的技能对黑暗系怪物特别有效。");    //cleric
                    }

                    status -= 2;
                } else {
                    cm.sendSimple("现在。。。你下定决心了吗？请进行第二次转职吧。#b\r\n#L0#法师 (火 / 毒)\r\n#L1#法师 (冰 / 雷)\r\n#L2#牧师");
                }
            }
        } else if (status == 2) {
            if (cm.haveItem(4031009)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("所以你想转职成为" + (job == 210 ? "#b法师 (火 / 毒)#k" : job == 220 ? "#b法师 (冰 / 雷)#k" : "#b牧师#k") + "？当你在这里下了决心，就不能为转为其他职业了，对吗？");
        } else if (status == 3) {
            if (cm.haveItem(4031012)) {
                cm.gainItem(4031012, -1);
            }
            cm.completeQuest(100008);
            cm.sendNext("好！现在起你就是" + (job == 210 ? "#b法师 (火 / 毒)#k" : job == 220 ? "#b法师 (冰 / 雷)#k" : "#b牧师#k") + "了！从这里开始，法师和牧师具有不可思议的魔法能力，能够轻松地刺穿怪物的心灵...为了要变得更强，需要不断进行修炼。若在修炼的过程中遇到困难，欢迎你随时来找我。");
            if (cm.getJobId() != job) {
                cm.changeJobById(job);
            }
        } else if (status == 4) {
            cm.sendNextPrev("我刚刚把记载着" + (job == 210 ? "#b法师 (火 / 毒)#k" : job == 220 ? "#b师 (冰 / 雷)#k" : "#b牧师#k") + "相关技能的书交给你了。里面有许多" + (job == 210 ? "#b法师 (火 / 毒)#k" : job == 220 ? "#b师 (冰 / 雷)#k" : "#b牧师#k") + "可修行的技能。此外消耗栏的栏位数量也有增加，此外，最大HP和MP也有提升，你再一一确认看看吧！");
        } else if (status == 5) {
            cm.sendNextPrev("我有给你一些技能点数（SP），打开技能栏后确认看看吧！你可以把点数配给到二转技能上，但无法一开始就全部设完，因为有些技能需要当前置技能的等级提升到莫i哥特阶段后才能学习。");
        } else if (status == 6) {
            cm.sendNextPrev((job == 210 ? "法师(火 / 毒)" : job == 220 ? "法师 (冰 / 雷)" : "牧师") + "必须要变得很强！但若将自身的力量发泄在弱者身上，这并不是正确的方法。将自己所拥有的力量用在正确的事情上，这是比变得更强更为重要的课题。好了！相信你不断自我修炼，过不久就会再与我相见的，我期待那天的到来。");
        }
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("你必须独自跟我的分身进行一对一的作战，既然是我的分身，想必他将拥有强大的力量。并且擅长使用各种高级技能。更何况，那里是跟这个世界不同的次元世界，人类逗留时间不宜过长，因此快速击倒是非常重要的。做好所有准备之后，再进行挑战吧。那我就等你平安拿回#b#t4031059##k。");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}