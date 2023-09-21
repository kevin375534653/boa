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
	Author : kevintjuh93
*/
var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            qm.sendOk("Ah, okay. I understand. Heroes are very busy. *Sniff...* If you ever get any free time, though...");
            qm.dispose();
            return;
        } else {
            qm.dispose();
            return;
        }
    }

    if (status == 0) {
        qm.sendNext("Wait, are you... No way.... Are you the hero that #p1201000# has been talking about all this time?! #p1201000#! Don't just nod... Tell me! Is this the hero you've been waiting for?! ")
    } else if (status == 1) {
        qm.sendNextPrev("   #i4001171#");
    } else if (status == 2) {
        qm.sendNextPrev("I'm sorry. I'm just so overcome with emotions... *Sniff sniff* My goodness, I'm starting to tear up. You must be so happy, #p1201000#.");
    } else if (status == 3) {
        qm.sendAcceptDecline("Wait a minute... You're not carrying any weapons. From what I've heard, each of the heroes had a special weapon. Oh, you must have lost it during the battle against the Black Mage.");
    } else if (status == 4) {
        qm.forceStartQuest();
        qm.sendOk("My brother #bPuir #kis just down the street, and he's been dying to meet you! I know you're busy, but could you please stop by and say hello to Puir? Please...");
    } else if (status == 5) {
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            qm.sendNext("*嗅嗅，嗅嗅，就目前而言，这把剑对你来说还不够好吗？我很荣幸。。。");
            qm.dispose();
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("和#p1201000#在一起的，难道……难道就是传说中的英雄？#p1201000#！别不耐烦地点头，给我们介绍介绍呀！这位就是传说中的英雄吗？！");
    } else if (status == 1) {
        qm.sendNextPrev("#i4001171#");
    } else if (status == 2) {
        qm.sendNextPrev("……真对不起，太激动了，忍不住嗓门大了些。呜呜～真是令人激动……唉，眼泪都快出来了……#p1201000#这回可开心了。");
    } else if (status == 3) {
        qm.sendNextPrev("等等……英雄大人怎么能没有武器呢？我听说每个英雄都有自己的独特武器……啊，估计是和黑魔法师战斗的时候遗失了。");
    } else if (status == 4) {
        qm.sendYesNo("虽然寒碜了点，不过#b先拿这把剑用着吧#k。算是送给英雄的礼物。英雄如果没有武器，岂不是会有些奇怪\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v1302000# 1 #t1302000#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
    } else if (status == 5) {
        if (qm.isQuestCompleted(21011)) {
            qm.dropMessage(1, "Unknown Error");
        } else if (qm.canHold(1302000)) {
            qm.gainItem(1302000, 1);
            qm.gainExp(35);
            qm.forceCompleteQuest();
            qm.sendNext("#b（看自己这技能水平没一点英雄的样子……这把剑感觉也很陌生。以前的我是用剑的吗？这把剑怎么用呢？）#k", 3);
        } else {
            qm.dropMessage(1, "Your inventory is full");
        }
    } else if (status == 6) {
        qm.guideHint(16);
        qm.dispose();
    }
}