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

/* Julius Styleman
	Amoria VIP Hair/Hair Color Change.

        GMS-like revised by Ronan. Contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_v = Array(30050, 30300, 30410, 30450, 30510, 30570, 30580, 30590, 30660, 30910);
var fhair_v = Array(31150, 31220, 31260, 31310, 31420, 31480, 31490, 31580, 31590, 31610, 31630);
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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("欢迎来到阿摩利亚美发店.如果你有 #b#t5150020##k,或者 #b#t5151017##k,请允许我帮你理一下发型.请选择你想要的.\r\n#L1#使用: #i5150020##t5150020##l\r\n#L2#使用: #i5151017##t5151017##l");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_v.length; i++) {
                        pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_v.length; i++) {
                        pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                cm.sendStyle("我完全可以改变你的发型，让它看起来很好看。你为什么不改一下呢？ #b#t5150020##k, 剩下的我帮你处理，选择你喜欢的风格！", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                haircolor.push(30000);
                var current = parseInt(cm.getPlayer().getHair()
                    /10)*10;
                for(var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendStyle("我完全可以改变你的发型颜色，让它看起来很好看。你为什么不改一下呢？有了#b#t5151017##k，剩下的我来处理。选择你喜欢的颜色！", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5420000)){
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("享受你新的发型！");
                } else if (cm.haveItem(5150020) == true){
                    cm.gainItem(5150020, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("享受你新的发型！");
                } else {
                    cm.sendOk("嗯……看来你没有我们指定的优惠券……恐怕没有它我不能给你理发。我很抱歉.");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151017) == true){
                    cm.gainItem(5151017, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("享受你新的发型！");
                } else {
                    cm.sendOk("嗯……看来你没有我们指定的优惠券……恐怕没有它我不能给你理发。我很抱歉..");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150020, 1);
                    cm.sendOk("享受吧!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151017, 1);
                    cm.sendOk("享受吧!");
                } else {
                    cm.sendOk("你没有足够的介子来买优惠券！");
                }
            }
        }
    }
}
