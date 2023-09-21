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
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Alcaster - El Nath Market (211000100)
-- By ---------------------------------------------------------------------------------------------
	Unknown & Information & xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.3 - Fixed up completely [xQuasar]
	1.2 - Add a missing text part [Information]
	1.1 - Recoded to official [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var selected;
var amount;
var totalcost;
var item = new Array(2050003,2050004,4006000,4006001);
var cost = new Array(300,400,5000,5000);
var msg = new Array("“治愈被封印和诅咒的状态”，“治愈一切”，“拥有魔力，用于高质量技能”，“拥有召唤能力，用于高质量技能”");
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (!cm.isQuestCompleted(3035)) {
        //cm.sendNext("如果你决定帮我，作为回报，我会把这件商品卖给你。");
        cm.sendNext("如果你能接受我的请求，我就把东西卖给你。");
        cm.dispose();
        return;
    }
    if(mode == 0 && status == 2) {
        cm.sendNext("我懂了。要知道我这里有很多不同的东西。看看周围。我只是把这些东西卖给你，所以我不会以任何形式把你抢走。");
        cm.dispose();
        return;
    }
    if (mode < 1) {
        cm.dispose();
        return;
    }
    
    status++;
    if (status == 0) {
        var selStr = "";
        for (var i = 0; i < item.length; i++){
            selStr += "\r\n#L" + i + "# #b#t" + item[i] + "# (价格："+cost[i]+"金币)#k#l";
        }
        cm.sendSimple("多亏了你安全密封了#b#t4031056##k。当然，也正因为如此，我耗尽了我在过去800年左右积累的大约一半的能量。。。但现在我可以平静地死去了。哦，顺便说一下。。。你是在找稀有物品吗？为了感谢你的辛勤工作，我会把我的一些东西卖给你，而且只卖给你。挑一个你想要的！"+selStr);
    }
    else if (status == 1) {
        selected = selection;
        cm.sendGetNumber("#b#t"+item[selected]+"##k真的是你需要的道具吗？这不是容易买到的东西，但我会给你一个好价钱。每件商品的价格是#b"+cost[selected]+"金币#k.你想购买多少？", 0, 1, 100);
    }
    else if (status == 2) {
        amount = selection;
        totalcost = cost[selected] * amount;
        if (amount == 0) {
            cm.sendOk("如果你什么都不买，那我也没什么可卖的。");
            cm.dispose();
        }
        cm.sendYesNo("你真的想要买#r"+amount+"个#t"+item[selected]+"##k？每个#r#t"+item[selected]+"##k的费用是"+cost[selected]+"金币，总共费用是#r"+totalcost+"金币#k。");
    } else if(status == 3) {
        if(cm.getMeso() < totalcost || !cm.canHold(item[selected])) {
            cm.sendNext("你确定你有足够的金币吗，如果没有至少也要有#r"+totalcost+"#k金币。");
            cm.dispose();
        }
        cm.sendNext("非常感谢。如果你发现自己在路上需要这些东西，一定要来这里。这些年来我可能变老了，但我仍然可以轻松制作魔法物品。");
        cm.gainMeso(-totalcost);
        cm.gainItem(item[selected], amount);
        cm.dispose();
    }
}