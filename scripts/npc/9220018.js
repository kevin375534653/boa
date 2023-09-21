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
 * @npc: Charles
 * @func: Treasure PQ
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
                
                if (status == 0) {
                        em = cm.getEventManager("TreasurePQ");
                        if(em == null) {
                                cm.sendOk("副本错误，请联系客服。");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                        
                        //cm.sendSimple("#e#b<组队任务: 盖福克斯的宝藏>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你不能再往前走了，因为前面有非常危险的生物。 你想和组员合作完成任务吗？如果你想尝试一下，请让#b组队队长#k 和我说话.#b\r\n#L0#我想参加组队任务。\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启动") + "搜索状态。\r\n#L2#我想知道更多的细节。");

                        cm.sendSimple("#e#b<组队任务: 盖福克斯的宝藏>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你不能再往前走了，因为前面有非常危险的怪物。如果你想尝试一下，请让#b组长#k和我对话。#b\r\n#L0#我想参加组队任务。\r\n#L2#我想知道更多的细节。");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("只有在组队中，你才能参与组队任务。");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("你的组长必须和我谈谈，才能开始这个组队任务。");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("已有其他队伍进入，请更换频道或稍后再试。");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("没有与组队长同一地图的组队成员。");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("你的搜索状态为 : #b" + (psState ? "启用" : "禁用") + "#k. 想换回来的时候跟我说。");
                                cm.dispose();
                        } else {
                                //cm.sendOk("#e#b<组队任务: MV's Lair>#k#n\r\n再次出现，扰乱了新叶市人民的生活。与其他枫叶人联手抵御这次突然袭击。击败MV和他的手下后，在MV的宝藏室领取奖品。");
                                  cm.sendOk("#e#b<组队任务: 盖福克斯的宝藏>#k#n\r\n盖福克斯的再次出现，扰乱了新叶城人民的生活。与其他冒险家联手抵御这次突然袭击。击败盖福克斯后，在盖福克斯的宝藏城领取奖品。");
                                cm.dispose();
                        }
                }
        }
}