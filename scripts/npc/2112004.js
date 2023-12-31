/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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

/**
 * @author: Ronan
 * @npc: Romeo
 * @map: Magatia - Zenumist - Hidden Room (261000011)
 * @func: Magatia PQ (Zenumist)
*/

var status = 0;
var em = null;

function start() {
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
                    
                if(cm.getMapId() != 261000011) {
                        if(status == 0) {
                                cm.sendYesNo("我们必须继续战斗来拯救朱丽叶，请保持你的步伐。如果你不想继续下去，你的同伴和我会理解。。。所以，你要撤退吗?");
                        } else if(status == 1) {
                                cm.warp(926100700, 0);
                                cm.dispose();
                        }
                } else {
                        if (status == 0) {
                                em = cm.getEventManager("MagatiaPQ_Z");
                                if(em == null) {
                                        cm.sendOk("发生了未知的错误.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务：拯救罗密欧与朱丽叶>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n我亲爱的朱丽叶被绑架了！但我不能袖手旁观，就因为这场愚蠢的冲突而看着她受苦。我需要你和你的同事帮忙救她！求你了，帮帮我们！！请你的队长跟我谈谈。#b\r\n#L0#我想参加组队任务。\r\n#L2#我想听听罗密欧的故事。");//\r\n#L1#" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启动") + "组队搜索。
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("只有在组队中你才能参加组队任务。");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("只有你的队长来跟我对话才能开始任务。");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("已经有人在此频道进行任务。请尝试更换其他频道，或等待他们完成任务。");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("你还无法参加这次任务，请稍后再试。");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("您的队伍状态为：#b" + (psState ? "启动" : "禁用") + "#k。想回来的时候跟我说。");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务：罗密欧与朱丽叶>#k#n\r\n我和朱丽叶相互深爱着。但我属于蒙特鸠，而朱丽叶属于卡帕莱特，因此没办法在一起.....刚开始的时候，两个学会并没有现在这么仇恨对方。因此我希望能成为解开卡帕莱特和蒙特鸠学会的矛盾的桥梁。我一直在努力，但很遗憾，现在玛加提亚陷入了#b战争的危机#k之中。不久前，#b蒙特鸠和卡帕莱特学会的能量源全部被盗#k，现在卡帕莱特和蒙特鸠学会相互指责对方。我接到了匿名举报，得知这是#b第3者#k所为。为了阻止玛加提亚的战争，实现朱丽叶和我的爱，必须找到#b第3者#k，阻止他的阴谋。勇敢的冒险家！！为了玛加提亚的和平，请帮帮我们！！");
                                        cm.dispose();
                                }
                        }
                }
        }
}