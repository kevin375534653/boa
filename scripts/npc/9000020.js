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
status = -1;


var travelFrom = [777777777,541000000,500000000];
var travelFee = [3000,3000,3000];

var travelMap = [800000000,500000000,702000000];
var travelPlace = ["日本古代神社，","泰国的水上市场，","少林寺"];
var travelPlaceShort = ["古代神社","水上市场","嵩山镇"];
var travelPlaceCountry = ["Japan","Malaysia"];
var travelAgent = ["","#r#p9201135##k"];

// var travelDescription = [
//                         "如果你想感受日本的精髓，蘑菇神殿是一个神话般的地方，供奉着自古以来无与伦比的蘑菇神。",
//                         "泰国的水上市场，是个和当地居民生活有着密切联系的场所。一条条卖货的小船在运河上交错往来，再加上河岸边那一家家水乡居民的住宅，构成了一幅令人深感亲切而又典型的泰国印象图卷。",
//                         "嵩山有着悠久的历史文化，在那里有着著名的少林寺，其中的大雄宝殿、藏经阁和塔林会让你充分感受到那里的文化氛围和迷人的风景，怎么样，你想去嵩山吗？"
// ];


// var travelDescription2 = [
//                         "看看那个为蘑菇神服务的女萨满，我强烈建议你尝尝日本街头出售的美味食品。现在，让我们去古代神社，一个神话般的地方。",
//                         "泰国水上市场集合了泰国传统的水上市场的面貌，让你在购物的同时还可以感受当地人淳朴自然的风俗文化，也成为游客必到的一个著名景点。现在，让我们开始去水上市场吧。",
//                         "现在你对嵩山有所了解了吗？让我们一起去嵩山吧。"
// ];

 var travelDescription = [ //原版对话
                        "你已经决定好，确定要去#b古代神社#k吗？那么你将要付给我3000金币，你真的想去？",
                        "你已经决定好，确定要去#b水上市场#k吗？那么你将要付给我3000金币，你真的想去？",
                        "你已经决定好，确定要去#b嵩山镇#k吗？那么你将要付给我3000金币，你真的想去？"
 ];

var travelType;
var travelStatus;

function start() {
    travelStatus = getTravelingStatus(cm.getPlayer().getMapId());
    action(1,0,0);
}

function getTravelingStatus(mapid) {
    for(var i = 0; i < travelMap.length; i++) {
        if(mapid == travelMap[i]) {
            return i;
        }
    }
    
    return -1;
}

function getTravelType(mapid) {
    for(var i = 0; i < travelFrom.length; i++) {
        if(mapid == travelFrom[i]) {
            return i;
        }
    }
    
    return 0;
}

function action(mode, type, selection) {
    status++;
    if(mode != 1){
        if(mode == 0 && status == 3)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    
    if (travelStatus != -1) {
        if (status == 0) 
            cm.sendSimple("旅行怎么样？你喜欢吗？#b\r\n#L0#是的，我旅行完了。我能回到#m" + cm.getPlayer().peekSavedLocation("WORLDTOUR") + "#吗？\r\n#L1#不，我想继续探索这个地方。");
        else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("好吧。我带你回到之前的地方。如果你想再去旅行，请告诉我！");
            } else if (selection == 1) {
                cm.sendOk("好啊。如果你改变主意，请告诉我。");
                cm.dispose();
            }
        } else if (status == 2) {
            var map = cm.getPlayer().getSavedLocation("WORLDTOUR");
            if (map == -1) map = 104000000;
            
            cm.warp(map);
            cm.dispose();
        }
    } else {
        if (status == 0) {
            travelType = getTravelType(cm.getPlayer().getMapId());
            //cm.sendNext("如果你厌倦了单调的日常生活，不如出去换个环境吧？没有什么比沉浸在一种新的文化中，一分一秒地学习新的东西更好的了！你该出去旅行了。我们，枫树旅行社推荐你去世界旅游！你担心旅行费用吗？你不应该！我们，枫叶旅行社，已经仔细地想出了一个计划，让你只花 #b" + cm.numberWithCommas(travelFee[travelType]) + " 金币#k！");
	  cm.sendNext("为了从繁忙的日常中解脱，去享受一趟旅游怎么样？不仅可以体验新颖的异国文化，还能学到不少东西的机会！我们冒险岛旅游公司为您准备了，丰富有趣的#b世界旅游#k套餐。谁说环游世界很贵？请放一万个心。我们的#b冒险岛世界旅游套餐#k只需要#b" + cm.numberWithCommas(travelFee[travelType]) + "金币#k就可以享受全过程。");
        } else if (status == 1) {
        	var text = "现在就可以去往 ";
        	for(var i = 0; i<travelPlace.length;i++){
        		text += "#b"+travelPlace[i]+" ";
        	}
        	text += "#k游览一番。在各旅游地我都会为大家提供满意热诚的服务。那么请准备好，我们出发去\r\n#b";
          //text += "#k游览一番。在各旅游地我都会为大家提供满意热诚的服务。那么请准备好，新手可以1折优惠。\r\n#b";
        	                for(var i = 0; i<travelMap.length;i++){
        		           text +="#L"+i+"##m"+travelMap[i]+"#\r\n";
        	}
        	cm.sendSimple(text);
        } else if (status == 2) { //此处引用var travelDescription的内容
		   if(cm.getMeso() < travelFee[travelType]){
		    cm.sendNext("你没有足够的金币去旅行。");
			cm.dispose();
			return;
		}
         	travelType = selection;
            //cm.sendNext("你想去#b#m" + travelMap[selection] + "##k？" + travelDescription[selection]);
			cm.sendNext("" + travelDescription[selection]);
        // } else if (status == 3) {
        //     if(cm.getMeso() < travelFee[travelType]){
        //         cm.sendNext("你没有足够的金币去旅行。");
        //         cm.dispose();
        //         return;
        //     }
        //     cm.sendNextPrev(travelDescription2[travelType]);
        } else if (status == 3) {
            cm.gainMeso(-travelFee[travelType]);
            cm.getPlayer().saveLocation("WORLDTOUR");
            cm.warp(travelMap[travelType], 0);
            cm.dispose();
        }
    }
}