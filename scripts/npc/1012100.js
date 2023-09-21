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

/*      Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)
*/

status = -1;
actionx = {"1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false};
job = 310;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 3;

function start() {
    const GameConstants = Java.type('constants.game.GameConstants');
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "你已经走了很长一段路，才能达到今天的力量、智慧和勇气，不是吗？你觉得现在有什么 #r在弓箭手培训中心里保持你现在的形象#k? 你喜欢吗？";
        if (spawnPnpcFee > 0) {
            sendStr += "我可以为你做，收费#b " + cm.numberWithCommas(spawnPnpcFee) + "金币。#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("你想选择#r弓箭手#k吗？有一些标准需要满足。#b你需要达到10级，与获得" + cm.getFirstJobStatRequirement(jobType) + "点#k，让我看看你的能力。");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012)) {
                cm.sendNext("哈哈…我就知道你会轻松通过考试的。我承认，你是一个伟大的弓箭手。我会让你比现在更强壮。但在那之前。。。你需要从给你的两条路中选择一条。这对你来说是个艰难的决定，但是。。。如果有什么问题要问，请问。");
            } else if (cm.haveItem(4031011)) {
                cm.sendOk("去看看#b#p1072002##k。");
                cm.dispose();
            } else {
                cm.sendYesNo("嗯。。。自从上次我见到你以来，你已经强大了很多。没有了我以前看到的那样弱小，相反，现在看起来更像一个弓箭手。你觉得呢？通过一个简单的测试，我就会为你转职，你想继续吗？");
            }
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 3 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("正在等你呢。几天前，从神秘岛的#b#p2020010##k那里。听说了有关你的事情。很好...我就来测试你的能力吧！在金银岛的某个地方，有通往其他次元的裂缝。一般人是进不去的，但是我会设法让你进去。你可以在裂缝里面见到我的分身，把他击倒后就会获得#b#t4031059##k，再请你把黑符拿到我这里来吧。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("Please, bring me the #b#t4031059##k.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("怎么可能...竟然击倒了我的分身，拿回了#b#t4031059##k！好...通过这个考验，可以充分证明你的能力。以你目前的力量，完成三转是不会有问题的。按照约定给你#b#t4031057##k。戴着这个项链，回到神秘岛的#b#p2020010##k那里可以进行第二阶段的测试。那么祝你顺利完成三转...");
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
                    cm.sendOk("对不起，你没有足够的金币来购买你在荣耀大厅的位置。");
                    cm.dispose();
                    return;
                }

                const PlayerNPC = Java.type('server.life.PlayerNPC');
                const GameConstants = Java.type('constants.game.GameConstants');
                if (PlayerNPC.spawnPlayerNPC(GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("给你！希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，现在荣耀大厅满了。");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1) {
                    cm.sendOk("你知道没有别的选择。。。");
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
                cm.sendOk("再训练一点直到你达到基本要求，我可以帮你转职成#r弓箭手#k。");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1452051) && cm.canHold(2070000)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(300);
                    cm.gainItem(1452051, 1);
                    cm.gainItem(2060000, 1000);
                    cm.resetStats();
                }
                cm.sendNext("好吧，从这里开始，你成为我们的一部分！你将....继续接受训练，但只要耐心一点。好吧，没什么，但我会给你一些我的能力。");
            } else {
                cm.sendNext("在你的背包里腾出点地方来和我谈谈。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.sendNextPrev("我给了你一些#b技能点#k，你可以使用。不过，有一个提醒：有一些技能只有在你先学会了一些技能之后才能获得。");
        } else if (status == 3) {
            cm.sendNextPrev("现在开始，一旦你选择了，你就不能改变主意，尝试选择另一条路。去吧，做一个骄傲的弓箭手。");
        } else {
            cm.dispose();
        }
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012)) {
                cm.sendSimple("好吧，当你做出决定后，在下面点击#b[选择我的职业]。#b\r\n#L0#我想了解猎人\r\n#L1#我想了解弩弓手\r\n#L3#选择职业");
            } else {
                cm.sendNext("很好的选择。但在证明你的修炼成果和实力之前，我是不能让你转职的。我需要看看你是否真的有足够的能力通过测试，这不是一个很难的测试，相信你会做得很好。 来，先把我的信拿走……别弄丢了！");
                if (!cm.isQuestStarted(100000)) {
                    cm.startQuest(100000);
                }
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031010)) {
                    if (!cm.haveItem(4031010)) {
                        cm.gainItem(4031010, 1);
                    }
                    cm.sendNextPrev("请把这封信送到#b#p1072002##k，她在#b#m106010000##k附近。把信给她，她就代替我来考验你。祝你好运。");
                    cm.dispose();
                } else {
                    cm.sendNext("请在你的背包中留出一些空间。");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //hunter
                        cm.sendNext("使用弓的弓箭手.\r\n\r\n#b猎手#k在早期阶段拥有着的群体输出技能,攻击速度更快,#b猎人#k的#r爆炸箭#k技能, 一个稍微弱一点的技能,但可以使6个敌人被击晕.");
                    } else if (selection == 1) {    //crossbowman
                        cm.sendNext("掌握弩的弓箭手.\r\n\r\n#b弩弓手#k与猎人相比,你的攻击力会随着等级的提高而提高.#b弩弓手#k的#r穿透箭#k,不以敌人为家,但能穿墙而带来的更猛烈的攻击.");
                    }

                    status -= 2;
                } else {
                    cm.sendSimple("现在。。。你下定决心了吗？请选择你希望转的职业。#b\r\n#L0#猎人\r\n#L1#弩弓手");
                }
            }
        } else if (status == 2) {
            job += selection * 10;
            cm.sendYesNo("所以你想转职成为" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "吗？你知道一旦你在这里下了决心，你就不能反悔重新选择其他职业了，对吧？");
        } else if (status == 3) {
            if (cm.haveItem(4031012)) {
                cm.gainItem(4031012, -1);
            }

            cm.sendNext("好！现在起你就是" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "了！从这里开始，" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "聪明的一群人有着不可思议的视力，能够轻松地刺穿怪物的心脏。。。请每天训练自己。我会帮助你变得比现在更强大。");
            if (cm.getJobId() != job) {
                cm.changeJobById(job);
            }
        } else if (status == 4) {
            cm.sendNextPrev("我刚刚把记载着" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "相关技能的书交给你了。里面有许多" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "可修行的技能。此外消耗栏的栏位数量也有增加，此外，最大HP和MP也有提升，你再一一确认看看吧！");
        } else if (status == 5) {
            cm.sendNextPrev("我有给你一些技能点数（SP），打开技能栏后确认看看吧！你可以把点数配给到二转技能上，但无法一开始就全部设完，因为有些技能需要当前置技能的等级提升到莫i哥特阶段后才能学习。");
        } else if (status == 6) {
            cm.sendNextPrev((job == 310 ? "猎人" : "弩弓手") + "必须要变得很强！但若将自身的力量发泄在弱者身上，这并不是正确的方法。将自己所拥有的力量用在正确的事情上，这是比变得更强更为重要的课题。好了！相信你不断自我修炼，过不久就会再与我相见的，我期待那天的到来。");
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
