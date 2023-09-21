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

/* Pata
	Mu Lung Random/VIP Eye Color Change.
        
        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var mface_v = Array(20000, 20001, 20004, 20005, 20006, 20007, 20009, 20012, 20022, 20028, 20031);
var fface_v = Array(21000, 21003, 21005, 21006, 21008, 21009, 21011, 21012, 21023, 21024, 21026);

function pushIfItemsExists(array, itemidList) {
    for (var i = 0; i < itemidList.length; i++) {
        var itemid = itemidList[i];

        if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
            array.push(itemid);
        }
    }
}

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
            cm.sendSimple("嘿，我是帕塔，是这里的整形外科医生和美容镜片专家。我相信你的脸和眼睛是你身体最重要的特征，有了#b#t5152028##k或#b#t5152041##k，我可以给你开合适的面部护理和化妆镜片。现在，你想用什么？\r\n#L1#使用: #i5152028##t5152028##l\r\n#L2#使用: #i5152041##t5152041##l\r\n#L3#使用: #i5152100# (任何颜色)#l");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                facenew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for (var i = 0; i < mface_v.length; i++) {
                        pushIfItemExists(facenew, mface_v[i] + cm.getPlayer().getFace()
                            % 1000 - (cm.getPlayer().getFace()
                                % 100));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for (var i = 0; i < fface_v.length; i++) {
                        pushIfItemExists(facenew, fface_v[i] + cm.getPlayer().getFace()
                            % 1000 - (cm.getPlayer().getFace()
                                % 100));
                    }
                }
                cm.sendStyle("我完全可以把你的脸变成新的。。。我们试试怎么样？如果你有#b#t5152028##k，你可以得到你喜欢的面孔…花点时间选择你喜欢的面孔.", facenew);
            } else if (selection == 2) {
                beauty = 2;
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace()
                        % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace()
                        % 100 + 21000;
                }
                colors = Array();
                colors.push(20000)
                pushIfItemsExists(colors, [current, current + 100, current + 300, current + 500, current + 600, current + 700]);
                cm.sendStyle("用我们的手术方式，你可以在治疗后提前看到自己。你想戴什么样的镜片？请选择你喜欢的款式.", colors);
            } else if (selection == 3) {
                beauty = 3;
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace()
                        % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace()
                        % 100 + 21000;
                }

                colors = Array();
                colors.push(20000)
                for (var i = 0; i < 8; i++) {
                    if (cm.haveItem(5152100 + i)) {
                        pushIfItemExists(colors, current + 100 * i);
                    }
                }

                if (colors.length == 0) {
                    cm.sendOk("你没有一次性化妆镜.");
                    cm.dispose();
                    return;
                }

                cm.sendStyle("你想戴什么样的镜片？请选择您喜欢的款式。", colors);
            }
        } else if (status == 2) {
            cm.dispose();
            if (beauty == 1) {
                if (cm.haveItem(5152028)) {
                    cm.gainItem(5152028, -1);
                    cm.setFace(facenew[selection]);
                    cm.sendOk("好好享受你的新面孔！");
                } else {
                    cm.sendOk("对不起，我想你现在没带我们的整形优惠券。没有优惠券，恐怕我不能帮你..");
                }
            } else if (beauty == 2) {
                if (cm.haveItem(5152041)) {
                    cm.gainItem(5152041, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("享受新的和改进的化妆镜！");
                } else {
                    cm.sendOk("对不起，我想你现在没有带我们的化妆镜优惠券。没有优惠券，恐怕我不能帮你..");
                }
            } else if (beauty == 3) {
                var color = (colors[selection] / 100) % 10 | 0;

                if (cm.haveItem(5152100 + color)) {
                    cm.gainItem(5152100 + color, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("享受新的和改进的化妆镜！");
                } else {
                    cm.sendOk("对不起，我想你现在没有带我们的化妆镜优惠券。没有优惠券，恐怕我不能帮你..");
                }
            }
        }
    }
}
