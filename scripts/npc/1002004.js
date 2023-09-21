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
 VIP Cab - Victoria Road : Lith Harbor (104000000)
 -- By ---------------------------------------------------------------------------------------------
 Xterminator
 -- Version Info -----------------------------------------------------------------------------------
 1.0 - First Version by Xterminator
 ---------------------------------------------------------------------------------------------------
 **/

var status = 0;
var cost = 10000;

function start() {
    cm.sendNext("您好~！我们是星级出租车。不同于村落之间来往的一般的中巴，我们给您提供更高级的服务。因此车费有点贵...您只要支付#b10,000#k金币，我们就会把你安全迅速的送到#b蚂蚁洞广场#k。");
}

function action(mode, type, selection) {
    status++;
    if (mode == -1) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("在这个村子里还有许多漂亮的景点，如果你想去蚂蚁洞广场，欢迎随时使用我们的出租车服务。");
        cm.dispose();
        return;
    }
    if (status == 1) {
        cm.sendYesNo(cm.getJobId() == 0 ? "我们对初学者有九折优惠。蚂蚁广场位于地下城深处，地下城位于金银岛的中心，那里有24小时排挡。你想去那里吗?" : "蚂蚁洞广场是位于金银岛中间的迷宫深处。在那里有24小时排挡。你是否要付10000金币后去蚂蚁洞广场？");
        cost /= ((cm.getJobId() == 0) ? 10 : 1);
    } else if (status == 2) {
        if (cm.getMeso() < cost) {
            cm.sendNext("看起来你没有足够的金币。对不起，没有它你不能享有VIP服务。")
        } else {
            cm.gainMeso(-cost);
            cm.warp(105070001);
        }
        cm.dispose();
    }
}
