/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
 * @npc: Mark of the Squad
 * @map: Cave of Life - Cave Entrance (240050000)
 * @func: Horntail PQ
 */

var status = 0;
var price = 100000;
var em = null;
var hasPass;

function isRecruitingMap(mapid) {
    return mapid == 240050000;
}

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
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (isRecruitingMap(cm.getMapId())) {
            if (status == 0) {
                em = cm.getEventManager("HorntailPQ");
                if (em == null) {
                    cm.sendOk("脚本遇到未知错误，请联系冒险岛管理员。");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                //cm.sendSimple("#e#b<Party Quest: Horntail Trial Grounds>\r\n#k#n" + em.getProperty("party") + "\r\n\r\nThis is the path to Horntail's lair. If you want to face him, you and your team shall be tested on the trial grounds ahead.#b\r\n#L0#Let us pass to the trial grounds.\r\n#L1#I would like to " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "disable" : "enable") + " Party Search.\r\n#L2#I would like to hear more details.");
               cm.sendSimple("不知天高地厚踏进生命之穴的无知人们...只有找到隐藏的钥匙的人才能找到我。确定要挑战吗？\r\n#L0##b挑战。#k");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("只有加入队伍你才能参加这个任务。");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("你的队伍想要开始这个任务就来找我对话吧。");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("已经有其他队伍挑战任务，请更换频道或稍后重新尝试。");
                            }
                        } else {
                            cm.sendOk("没有与组队长同一地图的组队成员。");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("Your Party Search status is now: #b" + (psState ? "enabled" : "disabled") + "#k. Talk to me whenever you want to change it back.");
                    cm.dispose();
                } else {
                    cm.sendOk("#e#b<组队任务：生命之穴>#k#n\r\n作为生命之穴的守门人，我将准许那些值得他光临的人进入。即使对那些人来说，里面的道路充满了机遇和考验。然而，那些勇敢的冒险家门有更好的机会站在我们的前面带领我们。");
                    cm.dispose();
                }
            }
        } else {
            if (!cm.isEventLeader()) {
                cm.sendOk("要把这里所有的邪恶气息全部净化，才能使用钥匙从这里出去。消灭所有怪物之后再来找我对话吧。");
            } else if (cm.getMapId() == 240050100) {
                if (cm.haveItem(4001087) && cm.haveItem(4001088) && cm.haveItem(4001089) && cm.haveItem(4001090) && cm.haveItem(4001091)) {
                    cm.gainItem(4001087, -1);
                    cm.gainItem(4001088, -1);
                    cm.gainItem(4001089, -1);
                    cm.gainItem(4001090, -1);
                    cm.gainItem(4001091, -1);

                    cm.getEventInstance().warpEventTeam(240050200);
                } else {
                    cm.sendOk("你没有进入下一阶段所需的钥匙。");
                }
            } else if (cm.getMapId() == 240050300) {
                if (cm.haveItem(4001092, 1) && cm.haveItem(4001093, 6)) {
                    cm.gainItem(4001092, -1);
                    cm.gainItem(4001093, -6);
                    cm.getEventInstance().clearPQ();
                } else {
                    cm.sendOk("检查你是否有6把红色钥匙和1把蓝色钥匙。");
                }
            } else if (cm.getMapId() == 240050310) {
                if (cm.haveItem(4001092, 1) && cm.haveItem(4001093, 6)) {
                    cm.gainItem(4001092, -1);
                    cm.gainItem(4001093, -6);
                    cm.getEventInstance().clearPQ();
                } else {
                    cm.sendOk("检查你是否有6把红色钥匙和1把蓝色钥匙。");
                }
            }

            cm.dispose();
        }
    }
}