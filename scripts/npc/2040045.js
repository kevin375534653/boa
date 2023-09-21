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

/*
@	Author : Raz
@       Author : Ronan
@
@	NPC = Pink Balloon
@	Map = Hidden-Street <Stage B>
@	NPC MapId = 922011000
@	Function = LPQ - B Stage
@
*/

/**副本活跃数据配置*/
var partyTaskList = Array(
    //等级,副本名称,次数,活跃点数,记录名字
    Array(21,"废弃都市",2,50,"p_fqds_hy_"),
    Array(30,"嘉年华",2,50,"p_jnh_hy_"),
    Array(35,"玩具副本",1,50,"p_wjc_hy_"),
    Array(45,"毒物森林",2,50,"p_dwsl_hy_"),
    Array(55,"海盗副本",5,50,"p_bcthd_hy_"),
    Array(71,"男女副本",2,50,"p_nvfb_hy_"),
    Array(85,"女神塔",2,50,"p_vst_hy_")
    // Array(85,"金字塔",2,50,"p_vst_hy_"),
    // Array(85,"竞技场",2,50,"p_vst_hy_"),
    // Array(85,"列车平台",2,50,"p_vst_hy_"),
    // Array(85,"武陵道场",2,50,"p_vst_hy_"),
    // Array(85,"强化特训",2,50,"p_vst_hy_"),
    // Array(85,"公会对抗",2,50,"p_vst_hy_"),

);

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();//ExitChat
    } else if (mode == 0) {
        cm.sendOk("明智的选择，奖励关卡可以得到免费的金币。");
        cm.dispose();//No
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        /**通用活跃点数加成奖励*/
        var p = cm.getPlayer();
        if(p.getActiveByName(partyTaskList[2][4]) < partyTaskList[2][3]){
            var hyd = partyTaskList[2][3]/partyTaskList[2][2];
            p.insertActive(partyTaskList[2][4],hyd,1);
            p.dropMessage(5,"获得"+partyTaskList[2][1]+"活跃点:"+hyd);
            p.gainExp(61000)
        }

        if (status == 0) {
            cm.sendYesNo("恭喜来到奖励关卡！享受胜利的喜悦吧，稍后我会把你们送回开始的地方。祝你们好运！");
        } else {



            cm.warp(922011100, "st00");
            cm.dispose();
        }
    }
}