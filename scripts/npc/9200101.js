/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Dr. Rhomes
	Orbis Random/VIP Eye Color Change.
*/
var status = 0;
var beauty = 0;
var colors = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("嗨，你好。我在这里的目标是通过化妆镜片的奇迹为每个人的眼睛增添个性，只要你有#b#t5152011##k或#b#t5152014##k，我就可以为你提供帮助！现在，你想使用吗？\r\n#L1#使用: #i5152011##t5152011##l\r\n#L2#使用: #i5152014##t5152014##l\r\n#L3#使用: #i5152104# (任何颜色)#l");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                selectedRegularCoupon()
            } else if (selection == 2) {
                beauty = 2;
                selectedVipCoupon()
            } else if (selection == 3) {
                beauty = 3;
                selectedOneTimeCoupon()
            }
        } else if (status == 2) {
            cm.dispose();
            if (beauty == 1) {
                acceptedRegularCoupon()
            } else if (beauty == 2) {
                selectedVipStyle(selection)
            } else if (beauty == 3) {
                selectedOneTimeStyle(selection)
            }
        }
    }
}

function selectedRegularCoupon() {
    if (cm.getPlayer().getGender() == 0) {
        var current = cm.getPlayer().getFace() % 100 + 20000;
    }
    if (cm.getPlayer().getGender() == 1) {
        var current = cm.getPlayer().getFace() % 100 + 21000;
    }
    colors = Array();
    pushIfItemsExists(colors, [current + 100, current + 300, current + 400, current + 700]);
    cm.sendYesNo("如果你使用普通优惠券，你将获得一副随机的化妆镜。你要用#b#t5152011##k来改变你的眼睛吗？");
}

function selectedVipCoupon() {
    if (cm.getPlayer().isMale()) {
        var current = cm.getPlayer().getFace() % 100 + 20000;
    } else {
        var current = cm.getPlayer().getFace() % 100 + 21000;
    }

    colors = Array();
    colors.push(20000)
    pushIfItemsExists(colors, [current + 100, current + 300, current + 400, current + 700]);
    cm.sendStyle("通过我们的新电脑程序，您可以提前看到治疗后的自己。你想戴什么样的镜片？请选择您喜欢的款式。", colors);
}

function pushIfItemsExists(array, itemidList) {
    for (var i = 0; i < itemidList.length; i++) {
        var itemid = itemidList[i];

        if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
            array.push(itemid);
        }
    }
}

function selectedOneTimeCoupon() {
    if (cm.getPlayer().isMale()) {
        var current = cm.getPlayer().getFace() % 100 + 20000;
    } else {
        var current = cm.getPlayer().getFace() % 100 + 21000;
    }

    colors = Array();
    colors.push(20000)
    for (var i = 0; i < 8; i++) {
        const oneTimeCouponId = 5152100 + i
        if (cm.haveItem(oneTimeCouponId)) {
            pushIfItemExists(colors, current + 100 * i);
        }
    }

    if (colors.length == 0) {
        cm.sendOk("你没有任何一次性的化妆镜。");
        cm.dispose();
        return;
    }

    cm.sendStyle("你想戴什么样的镜片？请选择您喜欢的款式。", colors);
}

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function acceptedRegularCoupon() {
    const regularCouponItemId = 5152011
    if (cm.haveItem(regularCouponItemId)) {
        cm.gainItem(regularCouponItemId, -1);
        cm.setFace(colors[Math.floor(Math.random() * colors.length)]);
        cm.sendOk("享受新的和改进的化妆镜！");
    } else {
        sendLackingCoupon()
    }
}

function selectedVipStyle(selection) {
    const vipCouponItemId = 5152014
    if (cm.haveItem(vipCouponItemId)) {
        cm.gainItem(vipCouponItemId, -1);
        const selectedFace = colors[selection]
        cm.setFace(selectedFace);
        cm.sendOk("享受新的和改进的化妆镜！");
    } else {
        sendLackingCoupon()
    }
}

function selectedOneTimeStyle(selection) {
    const selectedFace = colors[selection]
    const color = Math.floor(selectedFace / 100) % 10;

    const oneTimeCouponItemId = 5152100 + color
    if (cm.haveItem(oneTimeCouponItemId)) {
        cm.gainItem(oneTimeCouponItemId, -1);
        cm.setFace(selectedFace);
        cm.sendOk("享受新的和改进的化妆镜！");
    } else {
        sendLackingCoupon()
    }
}

function sendLackingCoupon() {
    cm.sendOk("对不起，我想你现在没有我们的化妆镜优惠券。没有优惠券，恐怕我不能帮你。。");
}
