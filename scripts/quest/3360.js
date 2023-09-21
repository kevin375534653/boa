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
	NPC Name: 		Parwen
	Description: 		Quest - Verifying the password
*/
var status = -1;
var pass;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            qm.sendNext("Come on, hurry up. Get your pen and paper out if you're not that smart!");
            qm.dispose();
            return;
        }

        if (status == 0) {
            qm.sendNext("哦！ 你终于来了！ 我很高兴你及时赶到。 我有你打开秘密通道的万能钥匙！ 哈哈哈哈！ 是不是很神奇呢？ 说厉害吧！");
        } else if (status == 1) {
            qm.sendAcceptDecline("好吧，现在这个密钥非常长而且复杂。 我需要你牢牢记住它。 我不会再说了，所以你最好把它写在某个地方。 你准备好了吗？");
        } else if (status == 2) {
            pass = generateString();
            qm.sendOk("关键代码是#b" + pass + "#k。 了解？ 将钥匙插入秘密通道的门，你就可以在通道内自由走动了。");
        } else if (status == 3) {
            qm.forceStartQuest();
            qm.setQuestProgress(3360, pass);
            qm.dispose();
        }
    }
}

function generateString() {
    var thestring = "";
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var rnum;
    for (var i = 0; i < 10; i++) {
        rnum = Math.floor(Math.random() * chars.length);
        thestring += chars.substring(rnum, rnum + 1);
    }
    return thestring;
}
