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
/*  Author:         Xterminator
	NPC Name: 		Second Eos Rock
	Map(s): 		Ludibrium : Eos Tower 71st Floor (221022900)
	Description: 	Brings you to 100th Floor or 71st Floor
*/
var status = 0;
var map = 221024400;

function start() {
    if (cm.haveItem(4001020)) {
        cm.sendSimple("这是为玩具塔的旅行者而设的魔法石。你只要使用#t4001020#，就能移动至任意的楼层。#b\r\n#L0#玩具塔（100层）#l\r\n#L1#玩具塔（41层）#l");
    } else {
        cm.sendOk("你需要有#t4001020#才可以启动。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 1) {
            if (selection == 0) {
                cm.sendYesNo("#m221024400#进行移动吗？将会消耗1个#t4001020#。");
            } else {
                cm.sendYesNo("#m221021700#进行移动吗？将会消耗1个#t4001020#。");
                map = 221021700;
            }
        } else if (status == 2) {
            cm.gainItem(4001020, -1);
            cm.warp(map, 3);
            cm.dispose();
        }
    }
}