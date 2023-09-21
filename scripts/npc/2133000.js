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
 * @npc: Ellin
 * @map: 300030100 - Deep Fairy Forest
 * @func: Ellin PQ
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
                        em = cm.getEventManager("EllinPQ");
                        if(em == null) {
                                cm.sendOk("发现了未知的错误.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务：毒雾森林>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想创建或加入一个组队来解决毒雾森林的难题吗#k？如果想挑战的话，就让#b队长#k跟我说话。#b\r\n#L0#我想参加组队任务。\r\n#L2#我想听听说明。\r\n#L3#我想领取奖品。");//\r\n#L1#" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启动") + "队伍状态。
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("只有在队伍中，你才能参加组队任务。");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("你的队长必须和我谈谈，才能开始这个组队的任务");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("已经有人在此频道进行任务。请尝试更换其他频道或等待他们完成任务。");
                                                }
                                        }
                                        else {
                                                cm.sendOk("你不能开始组队任务，可能你的队伍不在等级范围内，或者人数不足，或者他们不在这个地图。");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("您的队伍状态是：#b"+ (psState ? "启用":"禁用") +"#k。你什么时候想开始任务了就跟我说。");
                                cm.dispose();
                        } else if (selection == 2) {
                                cm.sendOk("#e#b<组队任务：毒雾森林>#k#n\r\n在这个任务中，你的任务是逐步地穿过树林，迎战你道路上的所有坏蛋，解决你遇到的许多难题，并团结队伍，克服时间限制和强大的怪物。完成最后一个BOSS挑战之后，你的组队有机会获得相应的奖励。祝你好运。");
                                cm.dispose();
                        }
                        else {
                                cm.sendSimple("那么，你想获得什么奖品呢？\r\n#b#L0#把阿尔泰耳环给我。\r\n#L1#给我闪亮的阿尔泰耳环。\r\n#L2#给我闪耀的阿尔泰耳环。");
                        }
                } else if (status == 2) {
                        if (selection == 0) {
                                if (!cm.haveItem(1032060) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060,1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("你想领取阿尔泰耳环吗？制作道具带来了吧？");
                                        cm.dispose();
                                }
                        } else if (selection == 1){
                                if (cm.haveItem(1032060) && !cm.haveItem(1032061) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060,-1);
                                        cm.gainItem(1032061, 1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                       cm.sendOk("你想领取闪亮阿尔泰耳环吗？制作道具带来了吧？");
                                       cm.dispose();
                                }
                        } else if (selection == 2){
                                if (cm.haveItem(1032061) && !cm.haveItem(1032072) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032061,-1);
                                        cm.gainItem(1032072, 1);    // thanks yuxaij for noticing unexpected itemid here
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("你想领取闪耀阿尔泰耳环吗？制作道具带来了吧？");
                                        cm.dispose();
                                }
                        }
                }
        }
}