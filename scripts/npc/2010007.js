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
/* guild creation npc */
var status = 0;
var sel;

function start() {
    cm.sendSimple("有什么可以帮你的吗？\r\n#b#L0#我想创建家族#l\r\n#L1#我想解散家族#l\r\n#L2#我想要增加家族人数#l#k");
}

function action(mode, type, selection) {
    if (mode == 0) {
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
        if (status == 1) {
            sel = selection;
            if (selection == 0) {
                if (cm.getPlayer().getGuildId() > 0) {
                    cm.sendOk("你不能创建一个新的家族。");
                    cm.dispose();
                } else {
                    cm.sendYesNo("哦！你是来创建家族的吗......要想创建家族，需要150万金币。相信你应该准备好了。好的~你想创建家族吗？");
                }
            } else if (selection == 1) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("你不是公会的公会长！！这是只有公会的公会长才可以决定的工作。");
                    cm.dispose();
                } else {
                    cm.sendYesNo("你真的要解散家族吗？哎呀......哎呀......解散之后，你的家族就会被永久删除。很多家族特权也会一起消失。你真的要解散吗？");
                }
            } else if (selection == 2) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("你不是公会的公会长！！这是只有公会的公会长才可以决定的工作。");
                    cm.dispose();
                } else {
                    var Guild = Java.type("net.server.guild.Guild");  // thanks Conrad for noticing an issue due to call on a static method here
                    cm.sendYesNo("你是想增加家族人数吗？嗯，看来你的家族成长了不少~你也知道，要想增加家族人数，必须在家族本部重新登记。当然，必须使用#b" + Guild.getIncreaseGuildCost(cm.getPlayer().getGuild().getCapacity()) + "金币#k作为手续费。你确定要继续吗？");
                }
            }
        } else if (status == 2) {
            if (sel == 0 && cm.getPlayer().getGuildId() <= 0) {
                cm.getPlayer().genericGuildMessage(1);
                cm.dispose();
            } else if (cm.getPlayer().getGuildId() > 0 && cm.getPlayer().getGuildRank() == 1) {
                if (sel == 1) {
                    cm.getPlayer().disbandGuild();
                    cm.dispose();
                } else if (sel == 2) {
                    cm.getPlayer().increaseGuildCapacity();
                    cm.dispose();
                }
            }
        }
    }
}
