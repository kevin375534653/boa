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
/* Tara
	Ludibrium : Tara and Sarah's House (220000303)
	
	Refining NPC: 
	* Shoes - All classes, 30-50, stimulator (4130001) available on upgrades
	* Price is 90% of locations on same items
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var stimulator = false;
var stimID = 4130001;

function start() {
    cm.getPlayer().setCS(true);
    var selStr = "你好，欢迎来到玩具城制鞋店。今天我能帮你什么忙吗？#b"
    var options = new Array("什么是辅助剂？","制作战士鞋子","制作弓箭手鞋子","制作魔法师鞋子","制作盗贼鞋子", "使用辅助剂制作战士鞋子","使用辅助剂制作弓箭手鞋子","使用辅助剂制作魔法师鞋子","使用辅助剂制作盗贼鞋子");
    for (var i = 0; i < options.length; i++){
        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
    }
    cm.sendSimple(selStr);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 1) {
        selectedType = selection;
        var selStr;
        var shoes;
        if (selectedType > 4) {
            stimulator = true;
            selectedType -= 4;
        }
        else
            stimulator = false;
        if (selectedType == 0){ // what is stim
            cm.sendNext("辅助剂是一种特殊的药剂，我可以添加到创建某些物品的过程中。它给出的数据就好像是从怪物身上掉下来的一样。但是，有可能没有变化，也有可能项目低于平均水平。使用辅助剂也有10%的几率得不到任何物品，所以请明智选择。")
            cm.dispose();
        } else if (selectedType == 1){ //warrior shoe
            selStr = "想要制作哪种战士鞋子？#b";
            shoes = new Array ("绿斗士鞋#k - 需要30级#b","蓝斗士鞋#k - 需要30级#b","银斗士鞋#k - 需要30级#b","红斗士鞋#k - 需要30级#b", "铁头皮鞋#k - 需要35级#b","蓝铁头鞋#k - 需要35级#b","黑铁头鞋#k - 需要35级#b", "黄金月长靴#k - 需要40级#b","紫金月鞋#k - 需要40级#b","蓝金月鞋#k - 需要40级#b", "祖母绿将军靴#k - 需要50级#b","锂矿蓝将军靴#k - 需要50级#b","紫矿将军靴#k - 需要50级#b","黄金将军靴#k - 需要50级#b");;
        } else if (selectedType == 2){ //bowman shoe
            selStr = "想要制作哪种弓箭手鞋子？#b";
            shoes = new Array ("红打猎鞋#k - 需要30级#b","蓝打猎鞋#k - 需要30级#b","绿打猎鞋#k - 需要30级#b","黑打猎鞋#k - 需要30级#b", "褐打猎鞋#k - 需要30级#b","蓝棉丝鞋#k - 需要35级#b","绿棉丝鞋#k - 需要35级#b","红棉丝鞋#k - 需要35级#b", "红精灵鞋#k - 需要40级#b","黄精灵鞋#k - 需要40级#b","褐精灵鞋#k - 需要40级#b","蓝精灵鞋#k - 需要40级#b", "褐空空鞋#k - 需要50级#b","绿空空鞋#k - 需要50级#b","蓝空空鞋#k - 需要50级#b","紫空空鞋#k - 需要50级#b");
        } else if (selectedType == 3){ //magician shoe
            selStr = "想要制作哪种魔法师鞋子？#b";
            shoes = new Array ("红魔法鞋#k - 需要30级#b","蓝魔法鞋#k - 需要30级#b","白魔法鞋#k - 需要30级#b","黑魔法鞋#k - 需要30级#b","紫守护鞋#k - 需要35级#b","红守护鞋#k - 需要35级#b","黑守护鞋#k - 需要35级#b","红月鞋#k - 需要40级#b","蓝月鞋#k - 需要40级#b","黄月鞋#k - 需要40级#b","黑月鞋#k - 需要40级#b", "粉红黄金风#k - 需要50级#b","蓝黄金风#k - 需要50级#b","紫黄金风#k - 需要50级#b","绿黄金风#k - 需要50级#b");
        } else if (selectedType == 4){ //thief shoe
            selStr = "想要制作哪种盗贼鞋子？#b";
            shoes = new Array ("青铜链鞋#k - 需要30级#b","钢铁链鞋#k - 需要30级#b","银链鞋#k - 需要30级#b","金链鞋#k - 需要30级#b", "红杨柳鞋#k - 需要35级#b","绿杨柳鞋#k - 需要35级#b","蓝杨柳鞋#k - 需要35级#b", "红流星鞋#k - 需要40级#b","绿流星鞋#k - 需要40级#b","黄流星鞋#k - 需要40级#b","蓝流星鞋#k - 需要40级#b","蓝雷电鞋#k - 需要50级#b","红雷电鞋#k - 需要50级#b","绿雷电鞋#k - 需要50级#b","紫雷电鞋#k - 需要50级#b");
        }	
        if (selectedType != 0) {
            for (var i = 0; i < shoes.length; i++)
                selStr += "\r\n#L" + i + "#" + shoes[i] + "#l";
            cm.sendSimple(selStr);
        }
    }
    else if (status == 2) {
        selectedItem = selection;
        if (selectedType == 1){ //warrior shoe
            var itemSet = new Array(1072003,1072039,1072040,1072041,1072002,1072112,1072113,1072000,1072126,1072127,1072132,1072133,1072134,1072135);
            var matSet = new Array(new Array(4021003,4011001,4000021,4003000),new Array(4011002,4011001,4000021,4003000),
                new Array(4011004,4011001,4000021,4003000),new Array(4021000,4011001,4000021,4003000),new Array(4011001,4021004,4000021,4000030,4003000),new Array(4011002,4021004,4000021,4000030,4003000),new Array(4021008,4021004,4000021,4000030,4003000),
                new Array(4011003,4000021,4000030,4003000,4000103),new Array(4011005,4021007,4000030,4003000,4000104),new Array(4011002,4021007,4000030,4003000,4000105),new Array(4021008,4011001,4021003,4000030,4003000),
                new Array(4021008,4011001,4011002,4000030,4003000),new Array(4021008,4011001,4011005,4000030,4003000),new Array(4021008,4011001,4011006,4000030,4003000));
            var matQtySet = new Array(new Array(4,2,45,15),new Array(4,2,45,15),new Array(4,2,45,15),new Array(4,2,45,15),new Array(3,1,30,20,25),new Array(3,1,30,20,25),new Array(2,1,30,20,25),
                new Array(4,100,40,30,100),new Array(4,1,40,30,100),new Array(4,1,40,30,100),new Array(1,3,6,65,45),new Array(1,3,6,65,45),new Array(1,3,6,65,45),new Array(1,3,6,65,45));
            var costSet = new Array(20000,20000,20000,20000,22000,22000,25000,38000,38000,38000,50000,50000,50000,50000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 2){ //bowman shoe
            var itemSet = new Array(1072079,1072080,1072081,1072082,1072083,1072101,1072102,1072103,1072118,1072119,1072120,1072121,1072122,1072123,1072124,1072125);
            var matSet = new Array(new Array(4000021,4021000,4003000),new Array(4000021,4021005,4003000),new Array(4000021,4021003,4003000),
                new Array(4000021,4021004,4003000),new Array(4000021,4021006,4003000),new Array(4021002,4021006,4000030,4000021,4003000),new Array(4021003,4021006,4000030,4000021,4003000),new Array(4021000,4021006,4000030,4000021,4003000),
                new Array(4021000,4003000,4000030,4000106),new Array(4021006,4003000,4000030,4000107),new Array(4011003,4003000,4000030,4000108),new Array(4021002,4003000,4000030,4000099),new Array(4011001,4021006,4021008,4000030,4003000,4000033),
                new Array(4011001,4021006,4021008,4000030,4003000,4000032),new Array(4011001,4021006,4021008,4000030,4003000,4000041),new Array(4011001,4021006,4021008,4000030,4003000,4000042));
            var matQtySet = new Array(new Array(50,2,15),new Array(50,2,15),new Array(50,2,15),new Array(50,2,15),new Array(50,2,15),
                new Array(3,1,15,30,20),new Array(3,1,15,30,20),new Array(3,1,15,30,20),new Array(4,30,45,100),new Array(4,30,45,100),new Array(5,30,45,100),new Array(5,30,45,100),
                new Array(3,3,1,60,35,80),new Array(3,3,1,60,35,150),new Array(3,3,1,60,35,100),new Array(3,3,1,60,35,250));
            var costSet = new Array(19000,19000,19000,19000,19000,19000,20000,20000,20000,32000,32000,40000,40000,50000,50000,50000,50000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 3){ //magician shoe
            var itemSet = new Array(1072075,1072076,1072077,1072078,1072089,1072090,1072091,1072114,1072115,1072116,1072117,1072140,1072141,1072142,1072143,1072136,1072137,1072138,1072139);
            var matSet = new Array(new Array(4021000,4000021,4003000),new Array(4021002,4000021,4003000),new Array(4011004,4000021,4003000),new Array(4021008,4000021,4003000),new Array(4021001,4021006,4000021,4000030,4003000),new Array(4021000,4021006,4000021,4000030,4003000),
                new Array(4021008,4021006,4000021,4000030,4003000),new Array(4021000,4000030,4000110,4003000),new Array(4021005,4000030,4000111,4003000),new Array(4011006,4021007,4000030,4000100,4003000),new Array(4021008,4021007,4000030,4000112,4003000),
                new Array(4021009,4011006,4021000,4000030,4003000),new Array(4021009,4011006,4021005,4000030,4003000),new Array(4021009,4011006,4021001,4000030,4003000),new Array(4021009,4011006,4021003,4000030,4003000));
            var matQtySet = new Array(new Array(2,50,15),new Array(2,50,15),new Array(2,50,15),new Array(1,50,15),new Array(3,1,30,15,20),new Array(3,1,30,15,20),new Array(2,1,40,25,20),new Array(4,40,100,25),new Array(4,40,100,25),new Array(2,1,40,100,25),new Array(2,1,40,100,30),
                new Array(1,3,3,60,40),new Array(1,3,3,60,40),new Array(1,3,3,60,40),new Array(1,3,3,60,40));
            var costSet = new Array(18000,18000,18000,18000,20000,20000,22000,30000,30000,35000,40000,50000,50000,50000,50000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        else if (selectedType == 4){ //thief shoe
            var itemSet = new Array(1072032,1072033,1072035,1072036,1072104,1072105,1072106,1072107,1072108,1072109,1072110,1072128,1072130,1072129,1072131);
            var matSet = new Array(new Array(4011000,4000021,4003000),new Array(4011001,4000021,4003000),new Array(4011004,4000021,4003000),new Array(4011006,4000021,4003000),new Array(4021000,4021004,4000021,4000030,4003000),new Array(4021003,4021004,4000021,4000030,4003000),
                new Array(4021002,4021004,4000021,4000030,4003000),new Array(4021000,4000030,4000113,4003000),new Array(4021003,4000030,4000095,4003000),new Array(4021006,4000030,4000096,4003000),new Array(4021005,4000030,4000097,4003000),new Array(4011007,4021005,4000030,4000114,4003000),
                new Array(4011007,4021000,4000030,4000115,4003000),new Array(4011007,4021003,4000030,4000109,4003000),new Array(4011007,4021001,4000030,4000036,4003000));
            var matQtySet = new Array(new Array(3,50,15),new Array(3,50,15),new Array(2,50,15),new Array(2,50,15),new Array(3,1,30,15,20),new Array(3,1,30,15,20),new Array(3,1,30,15,20),
                new Array(5,45,100,30),new Array(4,45,100,30),new Array(4,45,100,30),new Array(4,45,100,30),new Array(2,3,50,100,35),new Array(2,3,50,100,35),new Array(2,3,50,100,35),new Array(2,3,50,80,35));
            var costSet = new Array(19000,19000,19000,21000,20000,20000,20000,40000,32000,35000,35000,50000,50000,50000,50000);
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }
        //Ludi fee is -10%, array not changed unlike 2040016 and 2040020
        cost *= 0.9;
        var prompt = "你想制作#t" + item + "#吗?在这种情况下，我需要你的制作物品的具体名字。不过，要确保你的库存中有足够的空间！#b";
        if(stimulator)
            prompt += "\r\n#i"+stimID+"#1个#t" + stimID + "#";
        if (mats instanceof Array) {
            for (var i = 0; i < mats.length; i++)
                prompt += "\r\n#i"+mats[i]+"#" + matQty[i] + "个#t" + mats[i] + "#";
        } else {
            prompt += "\r\n#i"+mats+"#" + matQty + "#t" + mats + "#";
        }
        if (cost > 0)
            prompt += "\r\n#i4031138#" + cost + "金币";
        cm.sendYesNo(prompt);
    } else if (status == 3) {
        var complete = true;			
        
        if(!cm.canHold(item, 1)) {
            cm.sendOk("请检查你的背包是否有足够的空间。");
            cm.dispose();
            return;
        }
        else if (cm.getMeso() < cost){
            cm.sendOk("对不起，你没有足够的金币。");
            cm.dispose();
            return;
        }
        else {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                    if (!cm.haveItem(mats[i], matQty[i]))
                        complete = false;
            }
            else if (!cm.haveItem(mats, matQty))
                complete = false;
        }		
        if (stimulator){ //check for stimulator
            if (!cm.haveItem(stimID)) {
                complete = false;
            }
        }		
        if (!complete)
            cm.sendOk("对不起，我得把这些东西都准备好才能搞定。下次吧。");
        else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++){
                    cm.gainItem(mats[i], -matQty[i]);
                }
            } else
                cm.gainItem(mats, -matQty);		
            cm.gainMeso(-cost);
            if (stimulator){ //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0) {
                    cm.gainItem(item, 1, true, true);
                    cm.sendOk("好了，鞋子准备好了。小心点，它们还很烫。");
                } else {
                    cm.sendOk("好吧！我想我不小心加了太多的辅助剂，好吧，现在整个东西都不能用了。。。对不起，我不能退款。");
                }
            } else  {
                cm.gainItem(item, 1);
                cm.sendOk("好了，鞋子准备好了。小心点，它们还很烫。");
            }
        }
        cm.dispose();
    }
}