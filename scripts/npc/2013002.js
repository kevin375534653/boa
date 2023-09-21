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
 *2013002.js - Minerva the Goddess
 *@author Ronan
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
    if (mode < 1)
        cm.dispose();
    else {
        status++;        
        if (cm.getPlayer().getMapId() == 920010100) { //Center tower
            if (status == 0)
                cm.sendYesNo("我解除了阻止进入塔楼监狱仓库的咒语。你可以在下面找到一些好吃的。。。或者，你可能想现在就离开。你准备好退出了吗？");
            else if (status == 1) {
                cm.warp(920011300, 0);
                cm.dispose();
            }
            
        } else if (cm.getPlayer().getMapId() == 920011100) {
            if (status == 0)
                cm.sendYesNo("那么，你准备好退出了吗？");
            else if (status == 1) {
                cm.warp(920011300, 0);
                cm.dispose();
            }
                        
        } else if (cm.getPlayer().getMapId() == 920011300) {
            if (status == 0) 
                cm.sendNext("谢谢你不仅修复了雕像，而且还救了女神，从陷阱中。愿女神的祝福与你同在直到最后。。。为了表示感谢，请接受这份你勇敢的纪念品。");
            else if (status == 1) {
                if(cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(200080101, 0);
                    /**通用活跃点数加成奖励*/
                    var p = cm.getPlayer();
                    if(p.getActiveByName(partyTaskList[6][4]) < partyTaskList[6][3]){
                        var hyd = partyTaskList[6][3]/partyTaskList[6][2];
                        p.insertActive(partyTaskList[6][4],hyd,1);
                        p.dropMessage(5,"获得"+partyTaskList[6][1]+"活跃点:"+hyd);
                        p.gainExp(250000);
                    }
                    cm.dispose();
                }
                else {
                    cm.sendOk("请先在你的其他栏留出一些空间。");
                    cm.dispose();
                }
            }
        }
    }
}