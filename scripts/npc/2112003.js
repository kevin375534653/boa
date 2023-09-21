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
 * @npc: 男女
 * @map: Magatia - Alcadno - Hidden Room (261000021)
 * @func: Magatia PQ (Alcadno)
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
                    
                if(cm.getMapId() != 261000021) {
                        if(status == 0) {
                                cm.sendYesNo("我们必须继续战斗来拯救罗密欧，请保持你的步伐。如果你不想继续下去，我会理解。。。所以，你要撤退吗？");
                        } else if(status == 1) {
                                cm.warp(926110700, 0);
                                cm.dispose();
                        }
                } else {
                        if (status == 0) {
                                em = cm.getEventManager("MagatiaPQ_A");
                                if(em == null) {
                                        cm.sendOk("遇到了未知的错误.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                //cm.sendSimple("#e#b<组队副本: 罗密欧与朱丽叶>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n我心爱的罗密欧被绑架了! 虽然他是泽努米斯特的，但我不能袖手旁观，仅仅因为这场愚蠢的冲突就看到他受苦。我需要你和你的同事帮忙救他！求你了，帮帮我们！！请你的队长来跟我谈谈.#b\r\n#L0#我想参加组队副本呢.\r\n#L1#我想知道 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "disable" : "enable") + " 参加方式.\r\n#L2#我想听听更多的细节.");
			cm.sendSimple("#e#b<组队任务：罗密欧与朱丽叶>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n玛加提亚目前面临极大的危机！冒险岛的勇士们~你们愿意帮我们的忙吗？#b\r\n#L0#开始任务\r\n#L2#听朱丽叶所说的故事");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("只有在队伍中你才能参加组队任务。");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("你的队长一定要跟我谈谈才能开始这个派对任务.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("另一方已进入此频道的“组队副本”。请尝试其他频道，或等待当前参与方完成。");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("没有与组队长同一地图的组队成员。");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("我们的搜索状态是：#b" + (psState ? "enabled" : "disabled") + "#k。想回来的时候跟我说。");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务：罗密欧与朱丽叶>#k#n\r\n不久前，一位名叫尤利特的科学家因为研究阿尔卡多和泽努米斯特的结合炼金术而被逐出了这个小镇，由于这种结合所产生的巨大力量，法律禁止对两者进行研究。然而，他忽视了这一规律，在两项研究中都获得了成功。结果，他被流放了。\r\n他现在正在报复，已经带走了我心爱的一个，他的下一个目标是我，因为我们是两个社会的继承人马加蒂的大照片。但我不害怕。我们必须不惜一切代价找到他！\r\n");
                                        cm.dispose();
                                }
                        }
                }
        }
}