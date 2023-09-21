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
/* Dark Lord
	Thief Job Advancement
	Victoria Road : Thieves' Hideout (103000003)
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
job = 410;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 4;

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
            cm.sendNext("想成为#r飞侠#k吗？有一些标准需要满足。因为我们不能只接受每个人...#b你的等级应该达到10级#k，与获得" + cm.getFirstJobStatRequirement(jobType) + "#k作为你的转职条件。让我看看你的能力。");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 400) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012)) {
                cm.sendNext("我看你做得很好。 我会让你在漫长的道路上迈出下一步。");
            } else if (cm.haveItem(4031011)) {
                cm.sendOk("去看看#b#p1072003##k。");
                cm.dispose();
            } else {
                cm.sendNext("你的等级已经达到了30级以上。你想进行2转吗？那好吧！");
            }
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 4 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("正在等你呢。几天前，从神秘岛的#b#p2020011##k那里。听说了有关你的事情。很好...我就来测试你的能力吧！在金银岛的某个地方，有通往其他次元的裂缝。一般人是进不去的，但是我会设法让你进去。你可以在裂缝里面见到我的分身，把他击倒后就会获得#b#t4031059##k，再请你把黑符拿到我这里来吧。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请给我带来#b#t4031059##k。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("怎么可能...竟然击倒了我的分身，拿回了#b#t4031059##k！好...通过这个考验，可以充分证明你的能力。以你目前的力量，完成三转是不会有问题的。按照约定给你#b#t4031057##k。戴着这个项链，回到神秘岛的#b#p2020011##k那里可以进行第二阶段的测试。那么祝你顺利完成三转...");
        } else if (cm.isQuestStarted(6141)) {
            cm.warp(910300000, 3);
        } else {
            cm.sendOk("你做出了明智的选择。");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == -1 && selection == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && type != 1) {
        status -= 2;
    }

    if (status == -1) {
        start();
        return;
    } else {
        if (spawnPnpc) {
            if (mode > 0) {
                if (cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("抱歉，你没有足够的金币来购买你在荣耀大厅的位置。");
                    cm.dispose();
                    return;
                }

                const PlayerNPC = Java.type('server.life.PlayerNPC');
                const GameConstants = Java.type('constants.game.GameConstants');
                if (PlayerNPC.spawnPlayerNPC(GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("给你！ 希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，荣耀大厅目前已满……");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1) {
                    cm.sendOk("你知道没有其他选择...");
                }
                if (!(mode == 0 && type != 1)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendYesNo("一旦转职了就不能反悔。");
            } else {
                cm.sendOk("多训练一点，直到你达到基本要求，我可以帮你成为#r飞侠#k。");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(2070000) && cm.canHoldAll([1472061, 1332063])) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(400);
                    cm.gainItem(2070015, 500);
                    cm.gainItem(1472061, 1);
                    cm.gainItem(1332063, 1);
                    cm.resetStats();
                }
                cm.sendNext("好吧，从现在开始，你成为我们的一部分！今后你将开始…过着流浪者的生活，但只要耐心一点，你将变的强大。好吧，没什么，但我会给你一些我的能力。。。哈哈！！！");
            } else {
                cm.sendNext("请在背包中留出足够的空间。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.sendNextPrev("我有给你一些技能点数（SP），打开技能栏后确认看看吧！你可以把点数配给到一转技能上，但无法一开始就全部设完，因为有些技能需要当前置技能的等级提升到某个阶段后才能学习。");
        } else if (status == 3) {
            cm.sendNextPrev("现在提醒你。一旦你选择了，你就不能改变主意，现在就去尝试选择另一条路，做一个骄傲的飞侠。");
        } else {
            cm.dispose();
        }
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012)) {
                cm.sendSimple("好吧，当你做了决定, 点击下面的#b[我要转职]#b\r\n#L0#关于刺客\r\n#L1#关于侠客\r\n#L3#我要转职");
            } else {
                cm.sendNext("但在证明你的修炼成果和实力之前，我是不能让你转职的。我需要看看你是否真的有足够的能力通过测试，这不是一个很难的测试，证明给我看看！");
                if (!cm.isQuestStarted(100009)) {
                    cm.startQuest(100009);
                }
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031011)) {
                    if (!cm.haveItem(4031011)) {
                        cm.gainItem(4031011, 1);
                    }
                    cm.sendNextPrev("证明的方法很简单，只要把这封信送到#b#p1072003##k，在#b#m102040000##k附近，把信给他，他就代替我来考验你。祝你成功。");
                } else {
                    cm.sendNext("请在背包中留出足够的空间。");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //assassin
                        cm.sendNext("刺客使用#r飞镖#k攻击怪物。\r\n\r\n#b刺客s#k是远程攻击者. 它们相当中观有效，具有良好的破坏潜力，相比侠客来说需要花费更多的金币.");
                    } else if (selection == 1) {    //bandit
                        cm.sendNext("侠客使用#r短刀#k攻击怪物。\r\n\r\n#b侠客s#k是快速的近战攻击者。它们的中距离不如刺客，没有远程攻击的优势，但是他的攻击力很强。");
                    }

                    status -= 2;
                } else {
                    cm.sendSimple("现在。。。你下定决心了吗？请选择您希望转职的职业。#b\r\n#L0#刺客\r\n#L1#侠客");
                }
            }
        } else if (status == 2) {
            if (cm.haveItem(4031011)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("你想转职为" + (job == 410 ? "#b刺客#k" : "#b侠客#k") + "? 一旦进行了二次转职就不能选择其他的职业了，你确定吗？");
        } else if (status == 3) {
            if (cm.haveItem(4031012)) {
                cm.gainItem(4031012, -1);
            }
            cm.completeQuest(100011);

            if (job == 410) {
                cm.sendNext("好吧，从现在开始你就是#b刺客#k了。刺客他们有灵敏的动作来控制敌人。请继续训练。我会让你比现在更强大！");
            } else {
                cm.sendNext("好吧，从现在开始你就是#b侠客了。侠客隐藏在黑暗和阴影中，等待合适的时机，让他们用匕首刺穿敌人的壁炉，突然而迅速。。。请继续训练。我会让你比现在更强大。");
            }

            if (cm.getJobId() != job) {
                cm.changeJobById(job);
            }
        } else if (status == 4) {
            cm.sendNextPrev("我刚刚把记载着" + (job == 410 ? "刺客" : "侠客") + "相关技能的书交给你了。里面有许多" + (job == 410 ? "刺客" : "侠客") + "可修行的技能。此外消耗栏的栏位数量也有增加，此外，最大HP和MP也有提升，你再一一确认看看吧！");
        } else if (status == 5) {
            cm.sendNextPrev("我有给你一些技能点数（SP），打开技能栏后确认看看吧！你可以把点数配给到二转技能上，但无法一开始就全部设完，因为有些技能需要当前置技能的等级提升到某个阶段后才能学习。");
        } else if (status == 6) {
            cm.sendNextPrev((job == 410 ? "Assassin" : "Bandit") + "需要坚强。但要记住，你不能滥用你的力量，把它用在弱者身上。请以正确的方式使用你巨大的力量，因为。。。对你来说，用正确的方式，这比变得更强大要硬得多。你再往前走，请找我。我会等你的。");
        }
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
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