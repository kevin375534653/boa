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
/* Andre
	Kerning Random Hair/Hair Color Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_r = Array(30040, 30130, 30520, 30770, 30780, 30850, 30920, 33040);
var fhair_r = Array(31060, 31140, 31330, 31440, 31520, 31750, 31760, 31880, 34050);
var mhair_e = Array(30130, 30430, 30520, 30770, 30780, 30850, 30920, 33040);
var fhair_e = Array(31060, 31140, 31330, 31520, 31760, 31880, 34010, 34050);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

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
            cm.sendSimple("我是安德里亚.如果你有#b#t5150002##k, #b#t5150011##k或者 #b#t5151002##k,请让我给你换个发型.\r\n#L0#使用: #i5150002##t5150002##l\r\n#L1#使用: #i5150011##t5150011##l\r\n#L2#使用: #i5151002##t5151002##l");
        } else if (status == 1) {
            if (selection == 0) {
                beauty = 3;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for (var i = 0; i < mhair_r.length; i++) {
                        pushIfItemExists(hairnew, mhair_r[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for (var i = 0; i < fhair_r.length; i++) {
                        pushIfItemExists(hairnew, fhair_r[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                cm.sendYesNo("如果你使用普通会员卡，你的头发将随机改变，有机会获得一个新的实验风格，你真的打算用#b#t5150011##k来改变你的发型吗？");
            } else if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for (var i = 0; i < mhair_e.length; i++) {
                        pushIfItemExists(hairnew, mhair_e[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for (var i = 0; i < fhair_e.length; i++) {
                        pushIfItemExists(hairnew, fhair_e[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                cm.sendYesNo("如果你使用一般会员卡，你的头发将随机改变，有机会获得一个新的实验风格，你真的打算用#b#t5150011##k来改变你的发型吗？");
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()
                    / 10) * 10;
                for (var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendYesNo("如果你使用普通优惠券，你的头发会随机改变。是否仍要使用. #b#t5151002##k 并对其进行更改？");
            }
        } else if (status == 2) {
            cm.dispose();
            if (beauty == 1) {
                if (cm.haveItem(5150011) == true) {
                    cm.gainItem(5150011, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("享受你新的和改进的发型！");
                } else {
                    cm.sendOk("嗯……看来你没有我们指定的优惠券……恐怕没有它我不能给你理发。我很抱歉。。。");
                }
            }
            if (beauty == 2) {
                if (cm.haveItem(5151002) == true) {
                    cm.gainItem(5151002, -1);
                    cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
                    cm.sendOk("享受你新的和改进的发型颜色！");
                } else {
                    cm.sendOk("嗯…看来你没有我们指定的优惠券…恐怕没有它我不能染你的头发。我很抱歉。。。");
                }
            }
            if (beauty == 3) {
                if (cm.haveItem(5150002) == true) {
                    cm.gainItem(5150002, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("享受你新的和改进的发型！");
                } else {
                    cm.sendOk("嗯……看来你没有我们指定的优惠券……恐怕没有它我不能给你理发。我很抱歉。。。");
                }
            }
            if (beauty == 0) {
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150011, 1);
                    cm.sendOk("享受！");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151002, 1);
                    cm.sendOk("享受！");
                } else {
                    cm.sendOk("你没有足够的钱来买优惠券！");
                }
            }
        }
    }
}
