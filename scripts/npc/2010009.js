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
var status;
var choice;
var guildName;

var allianceCost = 5000000;
var increaseCost = 1000000;
var allianceLimit = 5;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
            cm.sendNext("你好！我叫#b蕾那丽#k，我负责管理家族联盟的有关事务，在这里可以建立家族联盟。");
            cm.dispose();
            return;
        }

        cm.sendSimple("你好！我叫#b蕾那丽#k。#k\r\n#b#L0#请您告诉我家族联盟是什么？#l\r\n#L1#要成立家族联盟的话应该怎么做？#l\r\n#L2#我想成立家族联盟。#l\r\n#L3#我想增加家族联盟的家族数量。#l\r\n#L4#我想解散家族联盟。#l");
    } else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            cm.sendNext("多个家族结合在一起成立的组织被称为家族联盟。我负责管理家族联盟的有关事务。");
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("要想创建家族联盟，必须先由2名家族管理员组成队伍。其中队长会成为家族联盟长。2名家族管理员集齐之后，还需要500万金币。这是注册家族联盟所需的手续费。另外还有一个！如果已经加入了其他家族联盟的话，就无法建立新的家族联盟！");
            cm.dispose();
        } else if (selection == 2) {
            if (!cm.isLeader()) {
                cm.sendNext("如果你想建立家族联盟，请让你的队长和我谈谈。队长将成为家族联盟长。");
                cm.dispose();
                return;
            }
            if (cm.getPlayer().getGuild().getAllianceId() > 0) {
                cm.sendOk("你已经加入其他家族联盟的话，就无法建立新的家族联盟。");
                cm.dispose();
                return;
            }

            cm.sendYesNo("你想建立家族联盟吗？手续费是#b" + allianceCost + " 金币#k。");
        } else if (selection == 3) {
            if (cm.getPlayer().getMGC() == null) {
                cm.sendOk("只有家族管理员才能注册家族联盟。");
                cm.dispose();
                return;
            }

            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1) {
                cm.sendYesNo("你想增加家族联盟的家族数量吗？手续费是#b“+increaseCost+“金币#k”。");
            } else {
                cm.sendNext("只有家族联盟盟主可以增加家族数量。");
                cm.dispose();
            }
        } else if (selection == 4) {
            if (cm.getPlayer().getMGC() == null) {
                cm.sendOk("如果你没有家族联盟，你就不能解散家族。");
                cm.dispose();
                return;
            }

            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1) {
                cm.sendYesNo("你确定要解散家族联盟吗？");
            } else {
                cm.sendNext("只有家族联盟盟主可以解散家族联盟。");
                cm.dispose();
            }
        }
    } else if (status == 2) {
        if (choice == 2) {
            if (cm.getMeso() < allianceCost) {
                cm.sendOk("你没有足够的金币来满足这个要求。");
                cm.dispose();
                return;
            }
            cm.sendGetText("请输入想要创建家族联盟的名称。(英文最多12字，中文最多6字)");
        } else if (choice == 3) {
            if (cm.getAllianceCapacity() == allianceLimit) {
                cm.sendOk("你的家族联盟已经达到最大上限。");
                cm.dispose();
                return;
            }
            if (cm.getMeso() < increaseCost) {
                cm.sendOk("你没有足够的金币来满足这个要求。");
                cm.dispose();
                return;
            }

            cm.upgradeAlliance();
            cm.gainMeso(-increaseCost);
            cm.sendOk("你的家族联盟现在可以多增加一个家族。");
            cm.dispose();
        } else if (choice == 4) {
            if (cm.getPlayer().getGuild() == null || cm.getPlayer().getGuild().getAllianceId() <= 0) {
                cm.sendNext("你不能解散不存在的家族联盟。");
                cm.dispose();
            } else {
                cm.disbandAlliance(cm.getClient(), cm.getPlayer().getGuild().getAllianceId());
                cm.sendOk("你的家族联盟已经解散。");
                cm.dispose();
            }
        }
    } else if (status == 3) {
        guildName = cm.getText();
        cm.sendYesNo("你确定使用'" + guildName + "'做为家族联盟的名称吗？");
    } else if (status == 4) {
        if (!cm.canBeUsedAllianceName(guildName)) {
            cm.sendNext("你不能使用这个名称。"); //Not real text
            status = 1;
            choice = 2;
        } else {
            if (cm.createAlliance(guildName) == null) {
                cm.sendOk("只有在队员为2人时才能创建家族联盟。");
            } else {
                cm.gainMeso(-allianceCost);
                cm.sendOk("你已经成功建立了家族联盟。");
            }
            cm.dispose();
        }
    }
}