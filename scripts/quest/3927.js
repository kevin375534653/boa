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
	Author : Ronan Lana
*/

var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            qm.dispose();
            return;
        }

        if (mode == 1)
            status++;
        else
            status--;
        
        
        if(qm.getQuestProgress(3927) == 0) {    // didn't find the wall yet, eh?
            qm.sendOk("还没找到#p2103001#？也是，沙子图团不是儿戏。");
            qm.dispose();
            return;
        }

        if (status == 0) {
            qm.sendSimple("找到有他们标志的墙壁了吗？\r\n#L0##b找是找到了…… 但不知是什么意思。#l");
        } else if (status == 1) {
            qm.sendSimple("上面写着什么？\r\n#L0##b'若有铁锤和短剑，弓和弓箭……'#l\r\n#L1#'巴一岚?西琳'#l\r\n#L2#'啊…… 忘了。'");
        } else if (status == 2) {
            if(selection == 0) {
                qm.sendOk("铁锤和短剑，弓和弓箭…… 是什么意思呢？告诉你？呵呵，我也不知道。这些得由你自己想，不是吗？我给你些提示吧…… 武器仅仅是武器。使用他们的是人…… 就这些？");
            } else if(selection == 1) {
                qm.sendOk("智由拉这个家伙又乱写乱画！真是让人伤心啊！");
                qm.dispose();
                return;
            } else {
                qm.sendOk("什么？再去看一下。还记得在哪儿吧？");
                qm.dispose();
                return;
            }
        } else if (status == 3) {
            qm.gainExp(1000);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}