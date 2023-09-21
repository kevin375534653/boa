var status = 0;
//被选择的装备列表
var selectedList = Array();
//筛选后的背包装备列表
var newItemList = Array();
var itemBorder = "#fUI/UIWindow.img/Item/activeIcon#";
var itemMaster = "#fUI/UIWindow.img/Item/bossPetIcon#"
var itemIcon = "#fUI/Basic.img/Cursor/0/0#";
var numArr = Array(
	"#fUI/Basic.img/LevelNo/0#",
	"#fUI/Basic.img/LevelNo/1#",
	"#fUI/Basic.img/LevelNo/2#",
	"#fUI/Basic.img/LevelNo/3#",
	"#fUI/Basic.img/LevelNo/4#",
	"#fUI/Basic.img/LevelNo/5#",
	"#fUI/Basic.img/LevelNo/6#",
	"#fUI/Basic.img/LevelNo/7#",
	"#fUI/Basic.img/LevelNo/8#",
	"#fUI/Basic.img/LevelNo/9#"
);
var btnOk_disabled="#fUI/Basic.img/BtYes2/disabled/0#";
var btnOk="#fUI/Basic.img/BtYes2/mouseOver/0#";
var startIcon = "#fUI/Basic.img/icon/arrow#";
//装备槽顺序
var selectedPosition = 0;
//标记位
var step = 0;
//成功率
var successRate = 0;
//加星等级限制
var xingdengji = 0;
//费用
var cost = 0;
var shuliang =0
//消耗的物品
var costitem = 4031669;
var haveLuck = false;
var useLuck = false;
var sflag = false;
//装备等级
var grade = Array(
	"★",
	"★★",
	"★★★",
	"★★★★",
	"★★★★★",
	"★★★★★★",
	"★★★★★★★"
);
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
		if (haveLuck && mode == 0) {
			useLuck = false;
			status=0;
			mode = 1;
		} else if (haveLuck && mode == 1) {
			useLuck = true;
		}
        if (mode == 0 && status == 0) {
			cm.dispose();
            return;
        }
		if (mode == 0 && status == -1) {
			cm.dispose();
            return;
        }
		//如果拥有黄金鱼，并且点了否
		
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
		if (cm.getPlayer().getMapId() == 220080001 || cm.getPlayer().getMapId() == 551030200) {
	    	cm.warp(910000000,0);
	        cm.dispose();
            return;
	    }
			if (step==1) {
				//清除副装备
				if (selectedPosition == 0)
					selectedList.splice(0,4);
				//加入到被选装备列表
				if (selection!=-1)
					selectedList[selectedPosition] = Array(selection, newItemList[selection]);
				//重置标记
				step=0;
				//计算成功率
				successRate = getSuccessRate();
				//计算费用
				cost = getCost();
				shuliang = getitem();
				if (getitemid()) {
							cm.sendOk("只能强化风暴系列的装备#k");
							cm.dispose();
							return;
						}
				
			}
			
			var text = "#e┌\t\t     ─ "+itemIcon+"装备强化 ─   \t\t\t┐#n\r\n\r\n";
			for (var i=0; i<4; i++) {
				if (selectedList[i]!=null)
					text+="#L"+i+"##v"+selectedList[i][1]+"##l";
				else
					if (i==0)
						text+="#L"+i+"#"+itemMaster+"#l主";
					else
						text+="#L"+i+"#"+itemBorder+"#l副";
			}
			text += "#e\r\n\r\n\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";
			//显示已经选择的装备信息
			if (selectedList.length >= 1) {
				text += "#k\r\n#e┌\t\t     ─ 已经选择的装备信息 ─   \t\t┐#n\r\n\r\n";
				for(var key in selectedList) {
					var item = cm.getInventory(1).getItem(selectedList[key][0]);
					var owner=item.getOwner();
					var flag=0;
					for(var i=0; i<grade.length; i++) {
						if (owner==grade[i])
							break;
						flag++;
					}
					if (flag>=grade.length) 
						owner = grade[0];
					var itemSeq = "主";
					if (key>=1)
						itemSeq = "#k副";
					var itemLevel = item.getLevel();
					var itemLevelStr = "";
					if (itemLevel != 0)
						itemLevelStr = " (+"+itemLevel+")";
					text+="\t"+itemSeq+": #r["+owner+"]#n Lv."+cm.getReqLevel(item.getItemId())+" #d#e"+cm.getItemName(item.getItemId())+"#n"+itemLevelStr+"\r\n";
				}
				text += "#e\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";
			}
			//显示计算后的合成成功率以及所需要的费用
			text += "\r\n#b"+startIcon+" 强化成功率："+successRate+"%\t\t\t"+startIcon+" 所需费用："+cost+"点卷\r\n 所需材料：#v"+costitem+"##b需要"+shuliang+"个\r\n";
			//显示确定按钮
			var lastBtn = btnOk_disabled;
			if (selectedList.length >= 2)  {
				lastBtn = btnOk;
			}
			text += "#k\t\t\t\t#L999##d#e"+lastBtn+"#l\r\n\r\n";
			//操作帮助
			text += "#k\r\n#e┌\t\t\t     ─ 操作帮助 ─   \t\t\t┐#n\r\n";
			text += "\t#b"+numArr[1]+" 合成前，请先仔细阅读合成说明。\r\n\t"+numArr[2]+" 第一个位置选择需要提升品级的主装备。\r\n\t#r"+numArr[3]+" 如果主装备变动，副装备需要重新选择。\r\n\t"+numArr[4]+" 选择装备时，装备的排列顺序是依据背包里的顺序。\r\n\t"+numArr[5]+" 选择结束后，点击“确认”进行装备合成#k\r\n\t"+numArr[6]+" 如果妳有#v4031648##b可以增加15的几率#k";
			text += "#e\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";
			cm.sendSimple(text);
		} else if (status==1){
			//装备合成逻辑运算
			if (sflag)
				selection=999;
			if (selection == 999) {
				sflag=true;
				if (selectedList.length < 2) {
					cm.sendPrev("无法合成，请至少放入一件副装备");
					cm.dispose();
							return;
				} else {
					if (cm.haveItem(4031648) && !haveLuck) {
						status=0;
						haveLuck = true;
						cm.sendYesNo("您的背包中拥有#v4031648##b#k道具，是否使用#b黄金鱼#k将成功率提升至#b#e"+(successRate+15)+"%#n#k？\r\n\r\n#d#e选择否则以#r"+successRate+"%#d的成功率继续强化。#n#k");
					} else {
						if (cm.getPlayer().getCSPoints(1)<cost) {
							cm.sendOk("您的点卷不足");
							cm.dispose();
							return;
						}
						if (!cm.haveItem(costitem,shuliang)) {
							cm.sendOk("你目前没有足够的#v"+costitem+"##b需要"+shuliang+"个#k");
							cm.dispose();
							return;
						}
						//主装备信息
						var masterItemId = selectedList[0][1];
						var masterItemPosition = selectedList[0][0];
						var masterItemReqLevel = cm.getReqLevel(masterItemId);
						//装备将提升的品级
						var nextGrade=Math.floor(getGrade(masterItemPosition))+1;
						if (nextGrade >= (grade.length)-xingdengji) {
							cm.sendOk("您的装备已经达到最高品级，无法再进行合成。");
							cm.dispose();
							return;
						}
						//活跃
						//cm.finishActivity(120114);
						//扣除费用
						cm.gainNX(1, -cost);
						//合成失败
						var chance = Math.floor(Math.random()*100);
						successRate = (useLuck) ? successRate+15 : successRate;
						if (useLuck) {
							cm.gainItem(2000019, -1);
						}
						if (chance > successRate) {
							var indexof = 0;
							for(var key in selectedList) {
								if (key==0)
									continue;
								var breakRate = Math.floor(Math.random()*100);
								if (breakRate <= 100) {
									indexof++;
									cm.removeSlot(1, selectedList[key][0], 1);
								}
							}
							var text = "庆幸的是，副装备都还在~继续努力吧！";
							if (indexof > 0)
								text = "#r"+indexof+"#k件副装备消失了，别灰心，后面的日子还长呢！";
							cm.sendOk("真不辛，装备强化失败了。");
							cm.gainItem(costitem, -shuliang);
							cm.dispose();
							return;
						}
						cm.gainItem(costitem, -shuliang);
						//合成成功部分
						var item = cm.getInventory(1).getItem(masterItemPosition);
						var ii = cm.getItemInfo();
						var toDrop = item.copy();
						var shuxing =getshuxing()
						//装备攻击力增幅计算
						var atkPoints = nextGrade*Math.round((masterItemReqLevel/30));
						//设置装备属性
						toDrop.setOwner(grade[nextGrade]);
						toDrop.setStr(item.getStr()+shuxing);
						toDrop.setDex(item.getDex()+shuxing);
						toDrop.setInt(item.getInt()+shuxing);
						toDrop.setLuk(item.getLuk()+shuxing);
						toDrop.setWatk(item.getWatk()+shuxing);
						toDrop.setMatk(item.getMatk()+shuxing);
						for(var key in selectedList) {
							cm.removeSlot(1, selectedList[key][0], 1)
						}
						//cm.addFromDrop(cm.getC(), toDrop, false);
						Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(),toDrop,false);
						var text = "#b力量#r+"+shuxing+"\r\n";
						text += "#b敏捷#r+"+shuxing+"\r\n";
						text += "#b智力#r+"+shuxing+"\r\n";
						text += "#b运气#r+"+shuxing+"\r\n";
						text += "#b攻击力#r+"+shuxing+"\r\n";
						text += "#b魔法力#r+"+shuxing+"\r\n";
						cm.sendOk("#r#e强化成功！#n#k本次强化为您的装备#d[#v"+masterItemId+"#]#k提升了\r\n#k"+text);
						sflag=false;
						//cm.gainGachaponItem(itemm[Math.floor(Math.random() * itemm.length)], 1,"装备强化",true);
							//cm.worldMessageItem("[装备强化] : " + "恭喜[" + cm.getPlayer().getName() + "]强化出 " + grade[nextGrade] + "的 "+cm.getItemName(masterItemId), toDrop);
							cm.worldMessageItem("装备强化 : " ,masterItemId);
							//cm.worldSpouseMessage(0x15, "[装备合成] : 恭喜 " + cm.getChar().getName() + " 合成出 " + grade[nextGrade] + "的 "+cm.getItemName(masterItemId));
						cm.dispose();
					}
				}
			} else {
				//选择装备过程
				selectedPosition = selection;
				if (selectedPosition!=0 && selectedList[0]==null) {
					cm.sendPrev("请先选择主装备！");
				} else {
					inventoryType = 1;
					var list = cm.getInventory(inventoryType).list();
					var itemList = list.iterator();
					text = "#e经过筛选，以下为所有符合强化合成条件的#r副装备#n\r\n\r\n#b";
					if (selectedPosition==0) {
						text="#e#d请选择需要进行强化合成的#r主装备：#n\r\n\r\n#b";
					}
					var indexof = 1;
					newItemList = Array();
					while (itemList.hasNext()) {
						var item = itemList.next();
						//过滤现金装备
						if (cm.isCash(item.getItemId())) 
							continue;
						//过滤不能参与合成部位
						//if (getItemType(item.getItemId())==getitemid(item.getItemId()))
							//continue; 
						//过滤不可以强化的装备
						if (getItemType(item.getItemId())==-1)
							continue; 
						//过滤小于50级的装备
						var getViceReqLevel = cm.getReqLevel(item.getItemId());
						if (getViceReqLevel < 80) 
							continue;
						//过滤等级差装备
						if (selectedPosition != 0) {
							var getMasterReqLevel = cm.getReqLevel(selectedList[0][1]);
							var getMasterGrade = getGrade(selectedList[0][0]);
							var getViceGrade = getGrade(item.getPosition());
							if (getViceGrade < getMasterGrade)
								continue;
							var levelDifference = (getMasterReqLevel - getViceReqLevel);
							//过滤等级差
							if (levelDifference > 10 || levelDifference < -10)
								continue;
							var getMasterItemType = getItemType(selectedList[0][1]);
							//过滤品级
							var getViceItemType = getItemType(item.getItemId());
							if (getMasterItemType != getViceItemType)
								continue;
						}
						//过滤已选装备
						var flag=0;
						for(var key in selectedList) {
							if (item.getPosition() == selectedList[key][0])
							{
								flag = 1;
								break;
							}
						}
						if (flag==1)
							continue;
						newItemList[item.getPosition()]=item.getItemId();
					}
					for(var key in newItemList) {
						text += "#L" + key + "##v" + newItemList[key] + "#";
						if (indexof > 1 && indexof % 5 == 0) {
							text += "\r\n";
						}
						indexof++;
					}
					status = -1;
					step=1;
					if (newItemList.length < 0) {
						text = "#r没有可以进行合成的副装。#k"
						cm.sendSimple(text);
						cm.dispose();
							return;
					}
					cm.sendSimple(text);
				}
			}
		}
    }
}
//获取装备类型
function getItemType(itemid) {
	var type = Math.floor(itemid/10000);
	switch (type) {
		case 100:
			return 0;  //帽子
		case 104:
			return 1;  //上衣
		case 105:
			return 2;  //套装
		case 106:
			return 3;  //裤裙
		case 107:
			return 4;  //鞋子
		case 108: 
			return 5;  //手套
		case 110:
			return 6;  //披风
		default:
			if (type==120)
				return -1;
			if (type==135)
				return -1;
			var type=Math.floor(type/10);
			if (type==12 || type==13 || type==14 || type==15 || type==17) {
				return 7;  //武器
			}
			return -1; 
	}
}
//计算成功率
function getSuccessRate() {
	var count=0;
	for(var key in selectedList) {
		if (selectedList[key]!=null && selectedList[key] != "")
			count++;
	}
	switch(count) {
		case 2:
			return 25;
		case 3:
			return 45;
		case 4:
			return 65;
		case 5:
			return 85;
		default:
			return 0;
	}
}
//计算费用
function getCost() {
	//装备的数量*主装备等级*品级+1
	var masterItemId = selectedList[0][1];
	var masterItemPosition = selectedList[0][0];
	var nextGrade=Math.floor(getGrade(masterItemPosition))+1;
		switch(nextGrade) {
		case 1:
			return 500;
		case 2:
			return 1500;
		case 3:
			return 2000;
		case 4:
			return 2500;
		case 5:
			return 3000;
		case 6:
			return 3500;
		case 7:
			return 4000;
		default:
			return 9999;
	}
	return baseCost;
}

//消耗道具数量
function getitem() {
	//装备的数量*主装备等级*品级+1
	var masterItemId = selectedList[0][1];
	var masterItemPosition = selectedList[0][0];
	var nextGrade=Math.floor(getGrade(masterItemPosition))+1;
		switch(nextGrade) {
		case 1:
			return 10;
		case 2:
			return 30;
		case 3:
			return 60;
		case 4:
			return 90;
		case 5:
			return 150;
		case 6:
			return 300;
		case 7:
			return 450;
		default:
			return 9999;
	}
	return baseCost;
}
//获得属性
function getshuxing() {
	//装备的数量*主装备等级*品级+1
	var masterItemId = selectedList[0][1];
	var masterItemPosition = selectedList[0][0];
	var nextGrade=Math.floor(getGrade(masterItemPosition))+1;
		switch(nextGrade) {
		case 1:
			return 5;
		case 2:
			return 10;
		case 3:
			return 15;
		case 4:
			return 25;
		case 5:
			return 30;
		case 6:
			return 35;
		case 7:
			return 40;
		default:
			return 9999;
	}
	return baseCost;
}
//获取装备品级
function getGrade(equipPosition) {
	if (equipPosition!=null) {
		var item = cm.getChar().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getItem(equipPosition).copy();
        var statup = new java.util.ArrayList();
		//var item = cm.getInventory(1).getItem(equipPosition);
		var itemGrade=item.getOwner();
		if (itemGrade == null || itemGrade == "")
			return 0;
		for(var k in grade) {
			if (itemGrade==grade[k])
				return k;
		}
	}
	return 0;
}

//可以强化的装备
function getitemid() {
	//装备的数量*主装备等级*品级+1
	var masterItemId = selectedList[0][1];
	var masterItemPosition = selectedList[0][0];
	var nextGrade=Math.floor(getGrade(masterItemPosition))+1;
		switch(masterItemId) {
		case 1132161:
			return true;
		case 1032148:
			return true;
		case 1072672:
			return true;
		case 1102467:
			return true;
		case 1082438:
			return true;
		case 1052467:
			return true;
		case 1112748:
			return true;
		case 1003561:
			return true;
		case 1152099:
			return true;
		case 1122200:
			return true;
        case 1032148:
			return true;
        case 1022149:
			return true;
        case 1532082:
			return true;
        case 1522079:
			return true;
        case 1492163:
			return true;
        case 1482152:
			return true;
        case 1472198:
			return true;
        case 1462178:
			return true;
        case 1452190:
			return true;
        case 1442203:
			return true;
        case 1432151:
			return true;
        case 1422125:
			return true;
        case 1412123:
			return true;
        case 1402174:
			return true;
        case 1382193:
			return true;
        case 1372162:
			return true;
        case 1362075:
			return true;
        case 1332207:
			return true;	
        case 1322182:
			return true;
        case 1312136:
			return true;
        case 1302249:
			return true;
        case 1252045:
			return true;
        case 1222040:
			return true;
        case 1212040:
			return true;	
        case 1022149:
			return true;			
		default:
			return false;
	}
	return false;
}
