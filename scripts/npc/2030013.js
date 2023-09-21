/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*Adobis
 *
 *@author Alan (SharpAceX)
 *@author Ronan
 */

var status = 0;
var expedition;
var expedMembers;
var player;
var em;
const ExpeditionType = Java.type('server.expeditions.ExpeditionType');
const exped = ExpeditionType.ZAKUM;
var expedName = "扎昆";
var expedBoss = "扎昆";
var expedMap = "扎昆的祭坛";
var expedItem = 4001017;

//var list = "你想做什么？#b\r\n#L2#加入" + expedBoss + "远征队。#l\r\n#L3#脱离" + expedBoss + "远征队。#l\r\n#L1#查看远征队员名单。#l";
var list = "你想做什么？#b\r\n#L2#进入远征队地图。#l\r\n#L3#退出" + expedBoss + "远征队。#l\r\n#L1#查看远征队员名单。#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(exped);
    em = cm.getEventManager("ZakumBattle");

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                cm.sendOk("你不符合挑战" + expedBoss + "的标准！");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e<" + expedName + "远征队>\r\n#k#n扎昆复活了。这样下去的话，它可能会让火山爆发，把整个冰峰雪域变成一片地狱。\r\n\r\n#b#L1#扎昆远征队申请入场。#l");
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {    // thanks Conrad for noticing exped leaders being able to still manage in-progress expeds
                    cm.sendOk("已经有远征队在进行中了，为了那些仍在战斗的人们，让我们为那些勇敢的英雄祈祷吧。");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("你已经登记在远征队了。请等待#r" + expedition.getLeader().getName() + "#k开始。");
                    cm.dispose();
                } else { //If you aren't in it, you're going to get added
                    cm.sendOk(expedition.addMember(cm.getPlayer()));
                    cm.dispose();
                }
            } else if (expedition.isInProgress()) { //Only if the expedition is in progress
                if (expedition.contains(player)) { //If you're registered, warp you in
                    var eim = em.getInstance(expedName + player.getClient().getChannel());
                    if (eim.getIntProperty("canJoin") == 1) {
                        eim.registerPlayer(player);
                    } else {
                        cm.sendOk("已经有远征队在进行中了，为了那些仍在战斗的人们，让我们为那些勇敢的英雄祈祷吧。");
                    }

                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("已经有远征队在挑战" + expedBoss + "了。");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                if (!cm.haveItem(expedItem)) {
                    cm.sendOk("作为远征队的队长，请确认你的背包有#b#t" + expedItem + "！");
                    cm.dispose();
                    return;
                }

                expedition = cm.getExpedition(exped);
                if (expedition != null) {
                    cm.sendOk("已经有人申请了远征队队长，请尝试加入远征队！");
                    cm.dispose();
                    return;
                }

                var res = cm.createExpedition(exped);
                if (res == 0) {
                    cm.sendOk("#r" + expedBoss + "#k远征队已经创建成功，与我交谈后开始战斗吧！");
                } else if (res > 0) {
                    cm.sendOk("你今天已经进去2次了。这样的话，你今天就不能再进去了。你明天再来试试吧。");
                } else {
                    cm.sendOk("游戏发生意外错误，请稍后再试！");
                }

                cm.dispose();

            } else if (selection == 2) {
                cm.sendOk("当然，不是每个人都能挑战" + expedBoss + "。");
                cm.dispose();

            }
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("远征队无法进入。");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size > 0) {
                //     cm.sendOk("You are the only member of the expedition.");
                //     cm.dispose();
                //     return;
                // }
                var text = "总申请者人数为" + size + "名" + "，" + "申请者列表如下：";
                text += "\r\n#L" + 1 + "#" + 1 + "号：" + expedition.getLeader().getName() + "（远征队长）#l"
                for (var i = 1; i < size; i++) {
                    text += "\r\n#L" + (i + 1) + "#" + (i + 1) + "号：" + expedMembers.get(i).getValue() + "#l"
                    }
                }
                cm.sendSimple(text);
                status = 6;
            } else if (selection == 2) {
                var min = exped.getMinSize();

                var size = expedition.getMemberList().size();
                if (size < min) {
                    cm.sendOk("远征队至少需要" + min + "人才能进入地图。");
                    cm.dispose();
                    return;
                }

                cm.sendOk("远征队挑战" + expedBoss + "即将开始，你现在将被传送到#b" + expedMap + "#k。");
                status = 4;
            } else if (selection == 3) {
                const PacketCreator = Java.type('tools.PacketCreator');
                player.getMap().broadcastMessage(PacketCreator.serverNotice(6, expedition.getLeader().getName() + " 解散了远征队。"));
                cm.endExpedition(expedition);
                cm.sendOk("远征队已经结束了，有时最好的策略是逃跑。");
                cm.dispose();

            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("无法初始化事件。");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if (!em.startInstance(expedition)) {
                cm.sendOk("已经有远征队在进行中了，为了那些仍在战斗的人们，让我们为那些勇敢的英雄祈祷吧。");
                cm.dispose();
                return;
            }

            cm.dispose();

        } else if (status == 6) {
            if (selection == 1) {
                cm.sendOk("你不能将自己移除远征队！"); 
                cm.dispose();
                return;
            }
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("你在远程名单上移除了" + banned.getValue() + "。");    // getValue, thanks MedicOP (MicroWilly69) for finding this issue
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        }
    }
}
