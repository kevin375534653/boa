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
/* Dances with Balrog
	Warrior Job Advancement
	Victoria Road : Warriors' Sanctuary (102000003)

	Custom Quest 100003, 100005
*/

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
job = 110;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 1;

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
            cm.sendNext("想成为#r战士#k吗？有一些标准需要满足。因为我们不能接受…#b你的等级应该达到10级#k，与获得" + cm.getFirstJobStatRequirement(jobType) + "#k作为你的转职条件。让我看看你的能力。");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 100) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012)) {
                cm.sendNext("通过测试了吗？祝贺你！接下来，我将允许你在漫长的道路上迈出下一步。");
            } else if (cm.haveItem(4031008)) {
                cm.sendOk("去看看#b#p1072000##k。");
                cm.dispose();
            } else {
                cm.sendNext("你的等级已经达到了30级。你想进行2转吗？那好吧！");
            }
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
            actionx["3thJobI"] = true;
            cm.sendNext("正在等你呢。几天前，从神秘岛的#b#p2020008##k那里。听说了有关你的事情。很好...我就来测试你的能力吧！在金银岛的某个地方，有通往其他次元的裂缝。一般人是进不去的，但是我会设法让你进去。你可以在裂缝里面见到我的分身，把他击倒后就会获得#b#t4031059##k，再请你把黑符拿到我这里来吧。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请击倒我的分身后，带着#b#t4031059##k回来找我。在金银岛的某个次元的裂缝里面可以找到他。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("怎么可能...竟然击倒了我的分身，拿回了#b#t4031059##k！好...通过这个考验，可以充分证明你的能力。以你目前的力量，完成三转是不会有问题的。按照约定给你#b#t4031057##k。戴着这个项链，回到神秘岛的#b#p2020008##k那里可以进行第二阶段的测试。那么祝你顺利完成三转...");
        } else {
            cm.sendOk("你的选择很明智。");
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
                    cm.sendOk("对不起，你没有足够的金币在冒险岛荣耀大厅买你的位子。");
                    cm.dispose();
                    return;
                }

                const PlayerNPC = Java.type('server.life.PlayerNPC');
                const GameConstants = Java.type('constants.game.GameConstants');
                if (PlayerNPC.spawnPlayerNPC(GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("There you go! Hope you will like it.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("对不起，荣耀大厅现在满了。。。");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJob"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1) {
                    cm.sendOk("下定决心再来找我。");
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
                cm.sendNextPrev("一旦转职了就不能反悔。");
            } else {
                cm.sendOk("再训练一点直到你达到基本要求，我可以告诉你#r战士#k.");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1302077)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendNext("从这里开始，你将走上勇士之路。这不是一件容易的事情，但如果你对自己有信心，你将克服成长道路上的任何困难。去吧，年轻的勇士！");
            } else {
                cm.sendNext("请在背包中留出足够的空间。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.sendNextPrev("我刚刚给了你一点SP。当你打开屏幕右下角的技能栏时，你可以通过使用SP来学习一些技巧。不过，有一个警告：有一些技能只有在你先学会了一些技能之后才能获得。");
        } else if (status == 3) {
            cm.sendNextPrev("现在提醒你。一旦你选择了，你就不能改变主意，现在就去尝试选择另一条路，做一个强大的战士。");
        } else {
            cm.dispose();
        }
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012)) {
                cm.sendSimple("好吧，当你做了决定, 点击下面的#b[我要转职]#b\r\n#L0#关于剑客\r\n#L1#关于准骑士\r\n#L2#关于枪战士\r\n#L3#我要转职");
            } else {
                cm.sendNext("在证明你的修炼成果和实力之前，我是不能让你转职的。我需要看看你是否真的有足够的能力通过测试，这不是一个很难的测试，相信你会做得很好。来，先把我的信拿走……别弄丢了！");
                if (!cm.isQuestStarted(100003)) {
                    cm.startQuest(100003);
                }
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031008)) {
                    if (!cm.haveItem(4031008)) {
                        cm.gainItem(4031008, 1);
                    }
                    cm.sendNextPrev("请把这封信送到#b#p1072000##k，在#b#m102020300##k附近，把信给他，他就代替我来考验你。祝你成功。");
                } else {
                    cm.sendNext("请在你的背包中留出一些空间。");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //fighter
                        cm.sendNext("掌握剑和斧头的战士.\r\n\r\n#r剑客#k会使用#b愤怒之火#k, 使你的的武器攻击得到提高。#b伤害反击#k减少40%的触碰伤害，并将其伤害反击给怪物。这就是为什么剑客被认为是强大的主要原因。");
                    } else if (selection == 1) {    //page
                        cm.sendNext("掌握剑和钝器的战士.\r\n\r\n#r准骑士#k会使用#b压制术#k,将敌人的武器防御和武器攻击降低的技能；主要用于降低对你造成的伤害。#b伤害反击#k减少40%的触碰伤害，并将其伤害反击给怪物。这就是为什么准骑士被认为是强大的主要原因。");
                    } else {    //spearman
                        cm.sendNext("掌握枪或矛的战士\r\n\r\n#r枪战士#k会使用#b神圣之火#k,使你和你的队友的最大生命值提高60%。这项技能对于组队的飞侠、海盗、弓箭手和法师特别有用，在组队以及BOSS战斗中的更多攻击中生存特别有用。枪战士还可以使用#b极限防御#k，它基本上是一个类似的祝福的技能，持续时间多100秒，但没有剑客或准骑士的减少伤害加成。即使这项技能发挥到极致，也不足以在组队中发挥强大作用，这也是为什么枪战士不能独行的原因。");
                    }

                    status -= 2;
                } else {
                    cm.sendSimple("现在。。。你下定决心了吗？请选择您希望为第二次升职选择的工作。 #b\r\n#L0#剑客\r\n#L1#准骑士\r\n#L2#枪战士");
                }
            }
        } else if (status == 2) {
            if (cm.haveItem(4031008)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("所以你想把第二次转职转为" + (job == 110 ? "#b剑客#k" : job == 120 ? "#b准骑士#k" : "#b枪战士#k") + "? 你知道一旦你在这里下了决心，你就不能反悔，你确定吗？");
        } else if (status == 3) {
            if (cm.haveItem(4031012)) {
                cm.gainItem(4031012, -1);
            }
            cm.completeQuest(100005);

            if (job == 110) {
                cm.sendNext("好吧，你现在成了#b剑客#k。剑客要努力成为强者中的强者，从不停止战斗。永远不要失去战斗的意志，我会帮助你变得比现在更强大。");
            } else if (job == 120) {
                cm.sendNext("好吧，你现在成了#b准骑士#k。准骑士有很高的智力和力量，我希望你能在整个旅程中运用到正确的道路上。我会帮助你变得比现在强大得多。");
            } else {
                cm.sendNext("好吧，你现在成了#b枪战士#k。枪战士用黑暗的力量来消灭敌人，总是在黑暗中。。。在旅途中，请相信你自己和你那令人敬畏的力量。我会帮助你变得比现在更强壮。");
            }
            if (cm.getJobId() != job) {
                cm.changeJobById(job);
            }
        } else if (status == 4) {
            cm.sendNextPrev("我刚刚把记载着" + (job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + "相关技能的书交给你了。里面有许多" + (job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + "可修行的技能。此外消耗栏的栏位数量也有增加，此外，最大HP和MP也有提升，你再一一确认看看吧！");
        } else if (status == 5) {
            cm.sendNextPrev("我有给你一些技能点数（SP），打开技能栏后确认看看吧！你可以把点数配给到二转技能上，但无法一开始就全部设完，因为有些技能需要当前置技能的等级提升到某个阶段后才能学习。");
        } else if (status == 6) {
            cm.sendNextPrev((job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + "需要坚强。但要记住，你不能滥用你的力量，把它用在弱者身上。请以正确的方式使用你巨大的力量，因为。。。对你来说，用正确的方式，这比变得更强大要硬得多。你再往前走，请找我。我会等你的。");
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

/* 3th Job Part
	PORTAL 20 MINUTES.
 */