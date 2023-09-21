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

status = -1;
var sel, sel2;

function start() {
    cm.sendOk("你好，周末集市暂时无法使用。");
    cm.dispose();
    return;
    
    cm.sendSimple("您好，今天是举办冒险岛周末集市的日子。#b\r\n#L0#移动到冒险岛周末集市地图\r\n#L1#听听有关冒险岛周末集市的说明");
}

function action(mode, type, selection) {
    status++;
    if (status == 6 && mode == 1) {
        sel2 = undefined;
        status = 0;
    }
    if (mode != 1) {
        if (mode == 0 && type == 0)
            status -= 2;
        else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        if (sel == undefined)
            sel = selection;
        if (selection == 0) {
            cm.sendNext("好的，我们会把您送到周末集市地图。");
        } else
            cm.sendSimple("你想了解周末集市吗?#b\r\n#L0#周末集市市场在哪里举行?\r\n#L1#在周末集市你能做什么?\r\n#L2#我没有任何问题。");
    } else if(status == 1) {
        if (sel == 0) {
        	cm.getPlayer().saveLocation("EVENT");
            cm.warp(680100000 + parseInt(Math.random() * 3));
            cm.dispose();
        } else if (selection == 0) {
            cm.sendNext("集市地图只在星期天开放。如果你在任何一个城镇找到我，我几乎无处不在!");
            status -= 2;
        } else if (selection == 1)
            cm.sendSimple("你可以找到稀有的商品，很难找到其他地方的周末集市。#b\r\n#L0#足够特殊项目\r\n#L1#帮助养鸡场主人");
        else {
            cm.sendNext("我想你没有什么问题了。请把我们放在你的思想中，并询问你是否对任何事情感到好奇。");
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel2 == undefined)
            sel2 = selection;
        if (sel2 == 0)
            cm.sendNext("你可以在集市找到很多商品。价格可能会变动，所以你最好在便宜的时候购买。");
        else
            cm.sendNext("除了商人，你还可以在集市找到养鸡场主人的烦斯乐。帮助咪咪和孵化她的蛋，直到它成长为一只鸡！");
    } else if (status == 3) {
        if (sel2 == 0)
            cm.sendNextPrev("在这里购买的商品可以卖回给商人中介阿得拉。他不会接受任何超过一周的东西，所以一定要在周六之前转售!");
        else
            cm.sendNextPrev("既然她不能把鸡蛋交给任何人，她就会要求定金。付她押金，好好照看这只蛋。");
    } else if (status == 4) {
        if (sel2 == 0)
            cm.sendNextPrev("阿得拉也调整了他的转卖率，所以当你能获得最大利润的时候出售是明智的。价格每小时都会波动，所以要记得经常查看。");
        else
            cm.sendNextPrev("如果你成功地把鸡蛋培育成一只鸡，并把它带回咪咪那里，咪咪会奖励你的。她可能很懒，但她并不忘恩负义。");
    } else if (status == 5) {
        if (sel2 == 0)
            cm.sendNextPrev("你可以在集市上低价买到商品，然后在价格上涨时卖给中间商，以此来测试你的商业智慧。");
        else
            cm.sendNextPrev("你可以点击鸡蛋来查看它的生长情况。你必须勤奋地对待鸡蛋，因为你获得的经验和鸡蛋将一起成长。");
    }
}