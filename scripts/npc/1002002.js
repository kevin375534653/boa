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
/* Author: Xterminator
	NPC Name: 		Pison
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Florina Beach Tour Guide
 */
var status = 0;

function start() {
    cm.sendSimple("你听说过在离明珠港不远的地方有个叫#b黄金海滩#k的美丽海滩吗？只要你有#b1500金币#k或#b#t4031134##k，我就送你到那里去。怎么样？想不想去黄金海滩？\r\n\r\n#L0##b我想付1500金币#l\r\n#L1#使用#b#t4031134##k#l\r\n#L2##b#t4031134##k是什么？#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if ((mode == 0 && type == 1) || mode == -1 || (mode == 0 && status == 1)) {
            if (type == 1) {
                cm.sendNext("看来你在这里有些事还没有办完嘛？身心疲惫的时候到这黄金海滩休息放松一下也不错。");
            }
            cm.dispose();
            return;
        } else {
            status -= 2;
        }
    }
    if (selection == 0) {
        status++;
    }
    if (status == 1) {
        if (selection == 1) {
            cm.sendYesNo("所以你有#b#t4031134##k吗？你可以带着它去黄金海滩。好吧，但是你要知道你可能会遇到一些怪物。好的，你现在想去黄金海滩吗？");
        } else if (selection == 2) {
            cm.sendNext("你一定对#b#t4031134##k很好奇。哈哈，只要拥有它你就可以免费前往黄金海滩。这张票是很特别的，但不幸的是，几周前我弄丢了。");
        }
    } else if (status == 2) {
        if (type != 1 && selection != 0) {
            cm.sendNextPrev("可惜我还没找到它。希望有人把它捡起来放在安全的地方。如果你有机会捡到它，可能对你很有用。");
            cm.dispose();
        } else {
            if (cm.getMeso() < 1500 && selection == 0) {
                cm.sendNext("什么~ 没钱还想去？你真个奇怪的家伙！...");
            } else if (!cm.haveItem(4031134) && selection != 0) {
                cm.sendNext("什么~你没有#b#t4031134##k？那我就不能帮你了！");
            } else {
                if (selection == 0) {
                    cm.gainMeso(-1500);
                }
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
            }
            cm.dispose();
        }
    }
}