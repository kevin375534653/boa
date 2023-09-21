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
/* guild emblem npc */

var status = 0;
var sel;

function start() {
    cm.sendSimple("你好！我是负责管理#b家族徽标#k的#b蕾雅#k。拥有家族特有的徽标，可以增加成员的归属感，提高凝聚力。你还没做好制作家族徽标的准备吗？那就这么办吧。等你什么时候做好了准备，到时再来找我。\r\n#b#L0#我想制作/删除家族徽标。#k");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            sel = selection;
            if (sel == 0) {
                if (cm.getPlayer().getGuildRank() == 1) {
                    cm.sendYesNo("生成家族徽标需要 #b5000000 金币#k的费用。我来跟你说明一下，家族徽标是每个家族特有的徽标，会出现在家族名称的左边。怎么样？你想制作家族徽标吗？");
                } else {
                    cm.sendOk("咦？你好像不是家族族长啊？家族徽标相关事务只有#r家族族长#k#r可以#k处理。");
                }
            }
        } else if (status == 2 && sel == 0) {
            cm.getPlayer().genericGuildMessage(17);
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}
