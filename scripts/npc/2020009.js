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

status = -1;
var job;
var sel;
actionx = {"Mental": false, "Physical": false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 2;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)) {
        if (cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }

        cm.sendNext("你是想探索扎昆副本吗？但你不是魔法师，我没办法对你进行判断。你去找你职业对应的长老吧。");
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031058)) {
        actionx["Mental"] = true;
    } else if (cm.haveItem(4031057)) {
        actionx["Physical"] = true;
    }
    cm.sendSimple("你来这里有什么事吗？#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#我想进行第三次转职。" : "") + "\r\n#L1#我想挑战扎昆。");
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if (mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3) {
        if (mode == 0 && type == 1) {
            cm.sendNext("下定决心。");
        }
        cm.dispose();
        return;
    }
    if (actionx["Mental"]) {
        if (status == 0) {
            cm.sendNext("噢噢...看样子找到了圣石，也顺利回答了问题阿！我本来还很担心你能不能顺利通过第二个考验...真了不起呀。在进行三转之前，先把项链交给我吧。");
        } else if (status == 1) {
            cm.sendYesNo("好的！透过我的帮助，今后你将成为更强悍的魔法师。在这之前，请再确认一下是否充分消耗了技能点数。至少要将等级70级前所获得的所有技能点数使用完毕，才可以进行三转。另外由于二转时，你已经选择了要走的路，所以三转只能延续你在二转时所做的选择。你现在要进行转职吗？");
        } else if (status == 2) {
            if (cm.getPlayer().getRemainingSp() > 0) {
                if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
                    cm.sendNext("Please, use all your SP before continuing.");
                    cm.dispose();
                    return;
                }
            }
            if (cm.getJobId() % 10 == 0) {
                cm.gainItem(4031058, -1);
                cm.changeJobById(cm.getJobId() + 1);
                cm.getPlayer().removePartyQuestItem("JBQ");
            }

            if (Math.floor(cm.getJobId() / 10) == 21) {
                cm.sendNext("好！从现在起你就是火毒魔导师了。可以修炼新的火与毒属性的技能，魔力激化（提高魔法攻击力）和魔法狂暴（提高魔法攻击速度）等技能将使你能够快速有效地攻击怪物。火毒抗性（可以提高对火毒属性的魔法抗性）和封印术（对怪物进行封印）将有助于消除魔法师缺少HP的弱点。");
            } else if (Math.floor(cm.getJobId() / 10) == 22) {
                cm.sendNext("好！从现在起你就是冰雷魔导师了。可以修炼新的冰与雷属性的技能，魔力激化（提高魔法攻击力）和魔法狂暴（提高魔法攻击速度）等技能将使你能够快速有效地攻击怪物。冰雷抗性（可以提高对冰雷属性的魔法抗性）和封印术（对怪物进行封印）将有助于消除魔法师缺少HP的弱点。");
            } else {
                cm.sendNext("好！从现在起你就是祭司了。可以修炼新的神圣技能，如圣光和圣龙召唤，而时空门（制造通向最近村落的时空门）和神圣祈祷（提高经验值）等技能对组队游戏至关重要。像巫毒术（使怪物变成蜗牛）这样的技能，是祭司的神圣技能中最与之不同的。");
            }
        } else if (status == 3) {
            cm.sendNextPrev("我给了你一些技能点数和升级点数，确认一下吧。由此刻开始你将成为非常强悍的魔法师。往后还有更艰难更危险的冒险等着你...如果你认为已经没有任何可以挑战的地方时，就再来找我吧。我始终会在这等着你。");
        }
    } else if (actionx["Physical"]) {
        if (status == 0) {
            cm.sendNext("噢噢...看样子顺利完成#p1022000#给你的任务了。我就相信你能够办到。但你应该没有忘记还有第二阶段的考验吧？在进行第二阶段的考验之前，先把项链交给我吧。");
        } else if (status == 1) {
            if (cm.haveItem(4031057)) {
                cm.gainItem(4031057, -1);
                cm.getPlayer().setPartyQuestItemObtained("JBQ");
            }
            cm.sendNextPrev("好！只剩下第二阶段的测试了。如果能够顺利通过这个测试。你将可以成为更强悍的战士。在神秘岛-冰峰雪域的圣地里，有颗神圣的石头，传说若有人供奉圣石一样特殊的物品，就可以测试那人的智慧，你就去看看吧！");
        } else if (status == 2) {
            cm.sendNextPrev("交出特殊物品给神圣的石头后，正确并诚恳地回答圣石的问题。如果你回答的答案是正确的，那么圣石就会给你#b#t4031058##k。把那个项链拿来给我，我就会认同你，并且把你提升为更强的魔法师。加油吧！");
        }
    } else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0) {
        cm.sendNext("去跟#b#p1032001##k对话，并把#b#t4031057##k带回来给我。");
        cm.dispose();
    } else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0) {
        cm.sendNext("去跟#b#p2030006##k对话，并把#b#t4031058##k带回来给我。");
        cm.dispose();
    } else {
        if (sel == undefined) {
            sel = selection;
        }
        if (sel == 0) {
            if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0) {
                if (status == 0) {
                    cm.sendYesNo("你好！找我有什么事情吗？哦...你想进行三转，成为更强的魔法师是吗？当然用我的力量可以让你更强，但是在这之前我必须了解你付出了多少的努力。到现在为止来找我的年轻人很多，而能够实际证明自己确实很强大的勇者却没有几个。怎么样？就算很困难你也要试试看吗？");
                } else if (status == 1) {
                    cm.getPlayer().setPartyQuestItemObtained("JB3");
                    cm.sendNext("好！你要证明的是你的力量和你的智慧，就这个两种。首先为你说明有关力量的考验！你要记得为你进行一、二转的魔法密林#p1032001#吧？去找他，他会给你一个任务，当你完成那个任务之后，从武术教练那里拿来#b#t4031057##k吧。");
                } else if (status == 2) {
                    cm.sendNextPrev("接着是有关智慧的考验，但是你必须先通过有关力量的考验，拿来#b#t4031057##k。如果第一阶段已经顺利通过，那马上就可以进行第二阶段的考验了。来...我会事先跟#p1032001#打声招呼的，沿着这条路一直走下去，就可以找到他。我知道这并不容易，但是我对你有信心。加油吧。");
                }
            }
        } else {
            if (cm.getPlayer().getLevel() >= 50) {
                cm.sendOk("那么，现在就将允许你前往#b阿杜比斯#k所在的#b通向扎昆的门#k。");
                if (!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) {
                    cm.startQuest(100200);
                }
                const YamlConfig = Java.type('config.YamlConfig');
                if (YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS && !cm.isQuestCompleted(100201)) {
                    cm.completeQuest(100201);
                }
            } else {
                cm.sendOk("以你现在的等级，是无法靠近扎昆的。至少必须达到50级。");
            }
            cm.dispose();
        }
    }
}