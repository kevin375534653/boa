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
 * @npc: Lakelis
 * @map: 103000000 - Kerning City
 * @func: Kerning PQ
*/

var status = 0;
var state;
var em = null;

function start() {
	status = -1;
        state = (cm.getMapId() >= 103000800 && cm.getMapId() <= 103000805) ? 1 : 0;
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
                        if(state == 1) {
                                cm.sendYesNo("你想放弃这个地区吗？");
                        }
                        else {
                                em = cm.getEventManager("KerningPQ");
                                if(em == null) {
                                        cm.sendOk("副本遇到了一个错误。");
                                        cm.dispose();
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                            
                                cm.sendSimple("#e#b<组队任务：第一次同行>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n您愿意与队员一起集合力量解决任务吗？这里有太多障碍是必须结合力量才能解决...如果想要挑战，#b请透过您所属队伍的队长#k与我对话。#b\r\n#L0#我想要进行组队任务。\r\n#L2#我想要听取说明。");
                              // cm.sendSimple("#e#b<组队任务：第一次同行>#k#n\r\n\r\n您愿意与队员一起集合力量解决任务吗？这里有太多障碍是必须结合力量才能解决...如果想要挑战，#b请透过您所属队伍的队长#k与我对话。#b\r\n#L0#我想要进行组队任务。\r\n#L2#我想要听取说明。");
                        }
                } else if (status == 1) {
                        if(state == 1) {
                                cm.warp(103000000);
                                cm.dispose();
                        }
                        else {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("你只有在组队里面才能参加组队任务。");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("请让你的队长来跟我谈话。");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("已经有人在此频道进行任务。请尝试更换其他频道或等待他们完成任务。");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("没有与组队长同一地图的组队成员。");
                                                }
                                                
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你的组队状态是#b"+(psState ? "开启":"关闭")+"#k。想换回来的时候跟我说。");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务：第一次同行>#k#n\r\n你的队伍必须通过消灭怪物或解开谜题的各种难关，同时通过所有任务目标。与你的组队协调，并进一步推进和击败最终的BOSS和收集掉落的项目，以便进入奖励阶段。");
                                        cm.dispose();
                                }
                        }
                }
        }
}