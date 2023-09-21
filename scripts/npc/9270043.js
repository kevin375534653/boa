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
//Gachapon 快乐百宝箱

var ids = [
2000004,2020012,2000005,2030007,2022027,2040001,2041002, 2040805, 2040702, 2043802, 2040402, 2043702, 1302022, 1322021, 1322026, 1302026, 1442017, 1082147, 1102043, 1442016, 1402012, 1302027, 1322027, 1322025, 1312012, 1062000, 1332020, 1302028, 1372002, 1002033, 1092022, 1302021, 1102041, 1102042, 1322024, 1082148, 1002012, 1322012, 1322022, 1002020, 1302013, 1082146, 1442014, 1002096, 1302017, 1442012, 1322010, 1442011, 1442018, 1092011, 1092014, 1302003, 1432001, 1312011, 1002088, 1041020, 1322015, 1442004, 1422008, 1302056, 1432000, 1382001, 1041053, 1060014, 1050053, 1051032, 1050073, 1061036, 1002253, 1002034, 1051025, 1050067, 1051052, 1002072, 1002144, 1051054, 1050069, 1372007, 1050056, 1050074, 1002254, 1002274, 1002218, 1051055, 1382010, 1002246, 1050039, 1382007, 1372000, 1002013, 1050072, 1002036, 1002243, 1372008, 1382008, 1382011, 1092021, 1051034, 1050047, 1040019, 1041031, 1051033, 1002153, 1002252, 1051024, 1002153, 1050068, 1382003, 1382006, 1050055, 1051031, 1050025, 1002155, 1002245, 1452004, 1452023, 1060057, 1040071, 1002137, 1462009, 1452017, 1040025, 1041027, 1452005, 1452007, 1061057, 1472006, 1472019, 1060084, 1472028, 1002179, 1082074, 1332015, 1432001, 1060071, 1472007, 1472002, 1051009, 1061037, 1332016, 1332034, 1472020, 1102084, 1102086, 1102042, 1032026, 1082149, 1115059, 1115148, 1112151, 1112263, 1112156, 1112268, 1115020, 1115109, 1115117, 1115028, 1115114, 1115025, 1702811, 1702736, 1702813, 1702587, 1051553, 1050486, 1004974, 1053187, 1702769, 1004883, 1053398, 1702771, 1005154, 1005153, 1102912, 1004957, 1004884, 1032262, 1053141, 1053096, 1004941, 1004940, 1004939, 1004938, 1004937, 1492194, 1482183, 1472230, 1462208, 1452220, 1432182, 1422156, 1402214, 1382226, 1332242, 1002850, 1002728, 1004427, 1003982, 1002798, 1002743, 1022047, 1022058, 1022067, 1022060, 1012056, 1012015];
var status = 0;

function start() {
    if (cm.haveItem(5451000)) {
        cm.gainItem(5451000, -1);
        cm.doGachapon();
        cm.dispose();
    } else if (cm.haveItem(5220000))
        cm.sendYesNo("你可以使用" + curMapName + "快乐百宝箱进行抽奖，你确定要使用它吗？");
    else {
        cm.sendSimple("欢迎来到" + cm.getPlayer().getMap().getMapName() + "快乐百宝箱。我能为您效劳吗？\r\n\r\n#L0#什么是快乐百宝箱？#l\r\n#L1#在哪里可以获得快乐百宝券。#l");
    }
}

function action(mode, type, selection){
    if (mode == 1 && cm.haveItem(5220000)) {
        cm.doGachapon();
        cm.dispose();
    } else {
        if (mode > 0) {
            status++;
            if (selection == 0) {
                cm.sendNext("使用快乐百宝箱可以获得稀有的卷轴、时装、椅子、宠物和其他很酷的物品！只需要使用一张#b快乐百宝券#k就可以随机抽到它。");
            } else if (selection == 1) {
                cm.sendNext("快乐百宝券可以在#r游戏商城#k中购买，点击游戏右下方的红色商店访问#r游戏商城#k即可购买。");
                cm.dispose();
            } else if (status == 2) {
                cm.sendNext("你会在商店里找到各种各样的东西" + cm.getPlayer().getMap().getMapName() + " 但是你很可能会发现一些相关的项目和卷轴" + cm.getPlayer().getMap().getMapName() + "被称为小镇。");
                cm.dispose();
            }
        }
    }
}