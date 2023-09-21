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
/* Miranda
        NLC Skin Change.
*/
var status = 0;
var price = 1000000;
var skin = Array(0, 1, 2, 3, 4);

function start() {
    cm.sendSimple("您好！欢迎来到护肤中心。您是否想拥有和我一样健康润泽的皮肤呢？只要有了#b#t5153009##k，我们就会给您想要的皮肤。请相信我们，一定会让您满意的！\r\n#L2#使用: #i5153009##t5153009##l");
}

function action(mode, type, selection) {
    if (mode < 1)  // disposing issue with stylishs found thanks to Vcoc
    {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 1) {
            if (selection == 2) {
                cm.sendStyle("通过本店特殊开发的机器可以查看护肤后的样子。您想要哪种皮肤呢？请选择吧！", skin);
            }
        } else if (status == 2) {
            if (cm.haveItem(5153009)) {
                cm.gainItem(5153009, -1);
                cm.setSkin(skin[selection]);
                cm.sendOk("好了，让朋友们赞叹您的新肤色吧！");
            } else {
                cm.sendOk("嗯……您好像没有#b#t5153009##k啊？不好意思，没有会员卡的话，我不能帮您护理皮肤。");
            }

            cm.dispose();
        }
    }
}