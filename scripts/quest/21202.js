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

var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type == 1) {
            qm.sendNext("你不想通过转职来获得终极武器吗？");
        }
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendNext("呵呵……年轻人来这么偏僻的地方干嘛？");
    } else if (status == 1) {
        qm.sendNextPrev("我想要最厉害的长矛！", 2);
    } else if (status == 2) {
        qm.sendNextPrev("最厉害的长矛？那种东西在小村子里怎么有卖的……");
    } else if (status == 3) {
        qm.sendNextPrev("我知道你就是冒险岛世界里最厉害的铁匠！我想要你做的武器！", 2);
    } else if (status == 4) {
        qm.sendAcceptDecline("我这个老头子太老了，哪还能做什么优秀的武器啊。倒是有一支很久以前做的长矛……不过却不能给你。那个家伙太锋利，弄不好连主人都会被伤到。这种武器你还想要吗？");
    } else if (status == 5) {
        qm.sendOk("呵呵……既然你这么说，我这个老头子就试一试你。你去旁边的#b修炼场#k，打败那些#r#o9001012##k，取回#b#t4032311##k#b30个#k给我。我就把#p1201001#交给你。");
    } else if (status == 6) {
        qm.startQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type == 1) {
            qm.sendNext("嗯？这武器果然寒气逼人吧？估计得让你头疼好一阵子呢。呵呵呵......虽说早晚它会认为你主人的。");
        }
        qm.dispose();
        return;
    }
    if (status == 0) {
        if (qm.haveItem(4032311, 30)) {
            qm.sendNext("哎呦～#t4032311#都取回来了？你……比我想象的还要厉害一些嘛。不过，对于随时都可能伤到自己的危险武器，你那种毫不畏惧的爽朗豪放的心态实在是……好吧，#p1201001#就给你了。");
        } else {
            qm.sendNext("Go for the 30 #t4032311#.");
            qm.dispose();
        }
    } else if (status == 1) {
        qm.sendNextPrev("#b(过了好一会儿，#p1203000#才郑重地将裹在布里的#p1201001#交给我。)");
    } else if (status == 2) {
        qm.sendYesNo("这就是专门为你而做的长矛，名叫#p1201002#……以后就拜托了。");
    } else if (status == 3) {
        //qm.showVideo("Polearm");
        qm.completeQuest();
        qm.removeAll(4032311);
        qm.dispose();
    }
}