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
/*	
	Author: Traitor, XxOsirisxX, Moogra
*/

/**
 * Dojo Entrance NPC
 */
var status = -2;
var readNotice = 0;

function start() {
    cm.sendSimple("#e< 公告 >#n\r\n有意挑战武陵道场的勇敢年轻人们请倒武陵道场来。- 武公\r\n\r\n\r\n#b#L0#尝试挑战武陵道场#l\r\n#L1#再仔细阅读公告#l");
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    }
    if (mode >= 0) {
        if (selection == 1 || readNotice == 1) {
            if (status == -1) {
                readNotice = 1;
                cm.sendNext("#b<公告：发行挑战>#k#n\r\n我是武陵道场的主人武公。很久以前为了成为仙人，我便开始在武陵进行修炼，现在我的内功已经达到了一定境界，武陵道场的主人是个懦弱无能的人，所以从今天起，武陵道场就由我来接手。最强大的人便有资格获得武陵道场。如果有人想要接受我的教诲，欢迎随时挑战！就算有人想要向我挑战也无妨，我会让你彻底地感受倒自己的懦弱的。");
            } else if (status == 0) {
                cm.sendPrev("你可以自己挑战我。也可以组队与你的好友一起前往挑战。");
            } else {
                cm.dispose();
            }
        } else {
            if (status == -1 && mode == 1) {
                cm.sendYesNo("（刚一碰触公告，就有一股神秘的气息开始包裹住了我。）\r\n\r\n要就此前往武陵道场吗？");
            } else if (status == 0) {
                if (mode == 0) {
                    cm.sendNext("#b（赶紧将手从公告上放了下来，围绕着我的神秘去洗也消失不见了。）");
                } else {
                    cm.getPlayer().saveLocation("MIRROR");
                    cm.warp(925020000, 4);
                }
                cm.dispose();
            }
        }
    } else {
        cm.dispose();
    }
}