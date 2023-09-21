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
        if (mode == 0 && type == 12) {
            qm.sendNext("当你明智地接受了你的决定后再回来。");
        }
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendAcceptDecline("训练进展如何？哇，你达到了这么高的水平！太棒了。我知道你在金银岛会做得很好。。。哦，看看我。我在浪费你的时间。我知道你很忙，但你得回岛上一会儿。");
    } else if (status == 1) {
        qm.sendOk("你的#b#p1201001##k在#b#m140000000##k突然变得奇怪起来。据记载，北极熊在召唤主人的时候会这样做。它在召唤你。请回到岛上，检查一下。");
    } else if (status == 2) {
        qm.startQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type == 1) {
            qm.sendNext("你这家伙！好歹也要努力回忆一下吧？");
        }
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendNext("嗡嗡嗡嗡嗡.....");
    }//Giant Polearm
    else if (status == 1) {
        qm.sendNextPrev("#b(#p1201001#在发出嗡鸣声。奇怪，那边的少年是谁？)", 2);
    } else if (status == 2) {
        qm.sendNextPrev("#b(以前没见过他啊？怎么看起来不太像人类？)", 2);
    } else if (status == 3) {
        qm.sendNextPrev("喂！战神！还听不见我的声音吗？到底听不听得见？唉，烦死了");
    } else if (status == 4) {
        qm.sendNextPrev("#b(咦？这是谁的声音？怎么听起来像个凶巴巴的少年......)", 2);
    } else if (status == 5) {
        qm.sendNextPrev("唉......哪有这样的主人啊？丢开武器在冰窟里睡了几百年，现在连话都听不懂了......");
    } else if (status == 6) {
        qm.sendNextPrev("你是谁啊？", 2);
    } else if (status == 7) {
        qm.sendNextPrev("啊，战神，现在听到我的声音了？是我啊，不记得我了？我就是武器#b长矛#k，#b#p1201002#战斧之魂#k！");
    } else if (status == 8) {
        qm.sendNextPrev("#b(...#p1201002#？#p1201001#会说话？)", 2);
    } else if (status == 9) {
        qm.sendNextPrev("不至于吧？这么吃惊？再怎么失忆，总不能连我都忘了吧？太不够意思了！");
    } else if (status == 10) {
        qm.sendNextPrev("不好意思，真的一点都想不起来。", 2);
    } else if (status == 11) {
        qm.sendYesNo("说声不好意思就能算了？！几百年来就我一个人孤苦伶仃地，有多寂寞你知道吗？不管怎样，你快点给我想起来！");
    } else if (status == 12) {
        qm.completeQuest();
        qm.sendNext("#b(一口一个自己是巨大的战斧、摩诃的，还越说越生气了。再这么说下去也不会有啥进展，还是先走到利琳跟前，好好商量商量。)", 2);
        //qm.sendNoExit("#b(The voice that claims to be #p1201002# the #p1201001# is yelling in frustration. You don't think this conversation is going anywhere. You better go talk to #p1201000# first.)", true);
    } else if (status == 13) {
        //qm.showVideo("Maha");
        qm.dispose();
    }
}