var status = 0;
//被選擇的裝備列表
var selectedList = Array();
//篩選後的背包裝備列表
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
//裝備槽順序
var selectedPosition = 0;
//標記位元
var step = 0;
//成功率
var successRate = 0;
//加星等級限制
var xingdengji = 0;
//費用
var cost = 0;
var shuliang =0

var itemlevel=0,itemstr=0,itemdex=0,itemluk=0,itemint=0,itemhp=0,itemmp=0,itemwatk=0,itemmatk=0,itemwdef=0,itemmdef=0,itemavoid=0,itemacc=0,itemjump=0,itemspeed=0;
//消耗的物品
var costitem = 4031669;
var baositem = 4031669;
var wanjiavip = 0;
var haveLuck = false;
var useLuck = false;
var sflag = false;
//裝備等級
var grade = Array(
	"★",
	"★★",
	"★★★",
	"★★★★",
	"★★★★★",
	"★★★★★★",
	"★★★★★★★",
	"★★★★★★★★",
	"★★★★★★★★★",
	"★★★★★★★★★★",
	"★★★★★★★★★★★",
	"★★★★★★★★★★★★",
	"★★★★★★★★★★★★★",
	"★★★★★★★★★★★★★★",
	"★★★★★★★★★★★★★★★",
	"★★★★★★★★★★★★★★★★",
	"★★★★★★★★★★★★★★★★★"
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
		//如果擁有黃金魚，並且點了否
		
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
				//清除副裝備
				if (selectedPosition == 0)
					selectedList.splice(0,4);
				//加入到被選裝備列表
				if (selection!=-1)
					selectedList[selectedPosition] = Array(selection, newItemList[selection]);
				//重置標記
				step=0;
				//計算成功率
				wanjiavip=cm.getPlayer().getVip()*10;
				successRate = 30+wanjiavip;
				//計算費用
				cost = 1;
				shuliang = 10;	
			}
			
			var text = "#e┌\t\t     ─ "+itemIcon+"装备强化 ─   \t\t\t┐#n\r\n\r\n";
			for (var i=0; i<2; i++) {
				if (selectedList[i]!=null)
					text+="#L"+i+"##v"+selectedList[i][1]+"##l";
				else
					if (i==0)
						text+="#L"+i+"#"+itemMaster+"#l需要强化的装备";
					else
						text+="#L"+i+"#"+itemBorder+"#l需要强化的属性宝石";
			}
			text += "#e\r\n\r\n\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";
			//顯示已經選擇的裝備資訊
			if (selectedList.length >= 1) {
				text += "#k\r\n#e┌\t\t     ─ 已经选择的装备资讯 ─   \t\t┐#n\r\n\r\n";
				for(var key in selectedList) {
					var item = cm.getInventory(1).getItem(selectedList[key][0]);
					var item1 = cm.getInventory(4).getItem(selectedList[key][0]);
					//var owner=item.getOwner();
					var flag=0;
					for(var i=0; i<grade.length; i++) {
						//if (owner==grade[i])
							break;
						flag++;
					}

					var itemshux = item1.getItemId();
					if (itemshux == 4250000){
					text+="物理攻击力+1\r\n";
				    itemwatk=1
					baositem=4250000
                    } else if (itemshux == 4250001){
					text+="物理攻击力+2\r\n";
				    itemwatk=2
					baositem=4250001
				    } else if (itemshux == 4250002){
					text+="物理攻击力+3\r\n";
				    itemwatk=3
					baositem=4250002
				} else if (itemshux == 4250100){
					text+="魔法攻击力+1\r\n";
				    itemmatk=1
					baositem=4250100
                    } else if (itemshux == 4250101){
					text+="魔法攻击力+2\r\n";
				    itemmatk=2
					baositem=4250101
				    } else if (itemshux == 4250102){
					text+="魔法攻击力+3\r\n";
				itemmatk=3
				baositem=4250102
				} else if (itemshux == 4250200){
					text+="命中率+2\r\n";
				itemacc=2
				baositem=4250200
                    } else if (itemshux == 4250201){
					text+="命中率+3\r\n";
				itemacc=3
				baositem=4250201
				    } else if (itemshux == 4250202){
					text+="命中率+5\r\n";
				itemacc=5
				baositem=4250202
				} else if (itemshux == 4250300){
					text+="回避率+2\r\n";
				itemavoid=2
				baositem=4250300
                    } else if (itemshux == 4250301){
					text+="回避率+3\r\n";
				itemavoid=3
				baositem=4250301
				    } else if (itemshux == 4250302){
					text+="回避率+5\r\n";
				itemavoid=5
				baositem=4250302
				} else if (itemshux == 4250400){
					text+="移动速度+2 \r\n";
				itemspeed=2
				baositem=4250400
                    } else if (itemshux == 4250401){
					text+="移动速度+3 \r\n";
				itemspeed=3
				baositem=4250401
				    } else if (itemshux == 4250402){
					text+="移动速度+5 \r\n";
				itemspeed=5
				baositem=4250402
				} else if (itemshux == 4250500){
					text+="跳跃力+1\r\n";
				itemjump=1
				baositem=4250500
                    } else if (itemshux == 4250501){
					text+="跳跃力+2\r\n";
				itemjump=2
				baositem=4250501
				    } else if (itemshux == 4250502){
					text+="跳跃力+3\r\n";
				itemjump=3
				baositem=4250502
				} else if (itemshux == 4250600){
					text+="最大HP+10\r\n";
				itemhp=10
				baositem=4250600
                    } else if (itemshux == 4250601){
					text+="最大HP+20\r\n";
				itemhp=20
				baositem=4250601
				    } else if (itemshux == 4250602){
					text+="最大HP+30\r\n";
				itemhp=30
				baositem=4250602
				} else if (itemshux == 4250700){
					text+="最大MP+10\r\n";
				itemmp=10
				baositem=4250700
                    } else if (itemshux == 4250701){
					text+="最大MP+20\r\n";
				itemmp=20
				baositem=4250701
				    } else if (itemshux == 4250702){
					text+="最大MP+30\r\n";
				itemmp=30
				baositem=4250702
				} else if (itemshux == 4250800){
					text+="力量+2\r\n";
				itemstr=2
				baositem=4250800
                   } else  if (itemshux == 4250801){
					text+="力量+3\r\n";
				itemstr=3
				baositem=4250801
				    } else if (itemshux == 4250802){
					text+="力量+5\r\n";
				itemstr=5
				baositem=4250802
				} else if (itemshux == 4250900){
					text+="智力+2\r\n";
				itemint=2
				baositem=4250900
                    } else if (itemshux == 4250901){
					text+="智力+3\r\n";
				itemint=3
				baositem=4250901
				    } else if (itemshux == 4250902){
					text+="智力+5\r\n";
				itemint=5
				baositem=4250902
				} else if (itemshux == 4251100){
					text+="敏捷+2\r\n";
				itemdex=2
				baositem=4251100
                    } else if (itemshux == 4251101){
					text+="敏捷+3\r\n";
				itemdex=3
				baositem=4251101
				    } else if (itemshux == 4251102){
					text+="敏捷+5\r\n";
				itemdex=5
				baositem=4251102
				} else if (itemshux == 4251000){
					text+="幸運+2\r\n";
				itemluk=2
				baositem=4251000
                    } else if (itemshux == 4251001){
					text+="幸运+3\r\n";
				itemluk=3
				baositem=4251001
				    } else if (itemshux == 4251002){
					text+="幸运+5\r\n";
				itemluk=5
				baositem=4251002
				} else if (itemshux == 4251200){
					text+="需要等级-1\r\n";
				itemlevel=1
				baositem=4251200
                    } else if (itemshux == 4251201){
					text+="需要等级-2\r\n";
				itemlevel=2
				baositem=4251201
				    } else if (itemshux == 4251202){
					text+="需要等级-3\r\n";
				itemlevel=3
				baositem=4251202
				} else if (itemshux == 4251300){
					text+="不知道会发生什么变化。\r\n";
					itemwdef=10
					baositem=4251300
                    } else if (itemshux == 4251301){
					text+="不知道会发生什么变化。\r\n";
					itemwdef=20
					baositem=4251301
				    } else if (itemshux == 4251302){
					text+="不知道会发生什么变化。\r\n";
					itemwdef=30
					baositem=4251302
				} else if (itemshux == 4251400){
					text+="不知道会发生什么变化。\r\n";
					itemmdef=10
					baositem=4251400
                    } else if (itemshux == 4251401){
					text+="不知道会发生什么变化。\r\n";
					itemmdef=20
					baositem=4251401
				    } else if (itemshux == 4251402){
					text+="不知道会发生什么变化。\r\n";
					itemmdef=30
					baositem=4251402
					}
				}
				text += "#e\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";
			}
			//顯示計算後的合成成功率以及所需要的費用
			text += "\r\n#b"+startIcon+" 強化成功率："+successRate+"%\t\t\t"+startIcon+" 所需費用："+cost+"点券\r\n 所需材料：#v"+costitem+"##b需要"+shuliang+"個\r\n";
			//顯示確定按鈕
			var lastBtn = btnOk_disabled;
			if (selectedList.length >= 2)  {
				lastBtn = btnOk;
			}
			text += "#k\t\t\t\t#L999##d#e"+lastBtn+"#l\r\n\r\n";
			//操作幫助
			text += "#k\r\n#e┌\t\t\t     ─ 操作帮助 ─   \t\t\t┐#n\r\n";
			text += "\t#b"+numArr[1]+" 合成前，请先仔细阅读合成说明。\r\n\t"+numArr[2]+" 第一个位置选择需要提升品级的主装备。\r\n\t#r"+numArr[3]+" 如果主装备变动，副装备需要重新选择。\r\n\t"+numArr[4]+" 选择装备时，装备的排列顺序是依据背包里的顺序。\r\n\t"+numArr[5]+" 选择结束后，点击“确认”进行装备合成#k\r\n\t"+numArr[6]+" 如果你有#v4031648##b可以增加15%的机率#k";
			text += "#e\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";
			cm.sendSimple(text);
		} else if (status==1){
			//裝備合成邏輯運算
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
						cm.sendYesNo("您的背包中拥有#v4031648##b#k道具，是否使用#b黄金鱼#k将成功率提升至#b#e"+(successRate+15)+"%#n#k？ \r\n\r\n#d#e选择否则以#r"+successRate+"%#d的成功率继续强化。 #n#k");
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
						//主裝備資訊
						var masterItemId = selectedList[0][1];
						var masterItemPosition = selectedList[0][0];
						var masterItemReqLevel = cm.getReqLevel(masterItemId);
						//裝備將提升的品級
						var nextGrade=Math.floor(getGrade(masterItemPosition))+1;
						//活躍
						//cm.finishActivity(120114);
						//扣除費用
						cm.gainNX(1, -cost);
						cm.gainItem(baositem, -1);
						//合成失敗
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
						//裝備攻擊力增幅計算
						var atkPoints = nextGrade*Math.round((masterItemReqLevel/30));
						//設置裝備屬性
						
						if (item.getLevel() == 0)
						itemlevel=0
					    if (item.getStr() > 999)
						itemstr=0
					if (item.getInt() > 999)
						itemint=0
					if (item.getDex() > 999)
						itemdex=0
					if (item.getLuk() > 999)
						itemluk=0
					if (item.getHp() > 999)
						itemhp=0
					if (item.getMp() > 999)
						itemmp=0
					if (item.getWatk() > 999)
						itemwatk=0
					if (item.getMatk() > 999)
						itemmatk=0
					if (item.getWdef() > 999)
						itemwdef=0
					if (item.getMdef() > 999)
						itemmdef=0
					if (item.getAvoid() > 999)
						itemavoid=0
					if (item.getAcc() > 999)
						itemacc=0
					if (item.getJump() > 999)
						itemjump=0
					if (item.getSpeed() > 999)
						itemspeed=0
					
						toDrop.setOwner(grade[nextGrade]);
						toDrop.setLevel(item.getLevel()-itemlevel);
						toDrop.setStr(item.getStr()+itemstr);
						toDrop.setDex(item.getDex()+itemdex);
						toDrop.setInt(item.getInt()+itemint);
						toDrop.setLuk(item.getLuk()+itemluk);				
						toDrop.setHp(item.getHp()+itemhp);
						toDrop.setMp(item.getMp()+itemmp);				
						toDrop.setWatk(item.getWatk()+itemwatk);
						toDrop.setMatk(item.getMatk()+itemmatk);
						toDrop.setWdef(item.getWdef()+itemwdef);
						toDrop.setMdef(item.getMdef()+itemmdef);						
						toDrop.setAvoid(item.getAvoid()+itemavoid);
						toDrop.setAcc(item.getAcc()+itemacc);
						toDrop.setJump(item.getJump()+itemjump);
						toDrop.setSpeed(item.getSpeed()+itemspeed);
						for(var key in selectedList) {
							cm.removeSlot(1, selectedList[key][0], 1)
						}
						//cm.addFromDrop(cm.getC(), toDrop, false);
						Packages.server.MapleInventoryManipulator.addFromDrop(cm.getC(),toDrop,false);
		text += "力量+：" + itemstr + "\r\n" ;
        text += "敏捷+：" + itemdex + "\r\n" ;
        text += "运气+：" + itemluk + "\r\n" ;
        text += "智力+：" + itemint + "\r\n" ;
        text += "攻击+：" + itemwatk + "\r\n" ;
        text += "魔力+：" + itemmatk + "\r\n" ;
		text += "HP+：" + itemhp + "\r\n" ;
        text += "MP+：" + itemmp + "\r\n" ;
        text += "防御力+：" + itemwdef + "\r\n" ;
        text += "魔法防御力+：" + itemmdef + "\r\n" ;
        text += "回避率+：" + itemavoid + "\r\n" ;
        text += "命中率+：" + itemacc + "\r\n" ;
        text += "跳跃力+：" + itemjump + "\r\n" ;
		text += "移动速度+：" + itemspeed + "\r\n" ;
						cm.sendOk("#r#e强化成功！ #n#k本次强化为您的装备#d[#v"+masterItemId+"#]#k提升了\r\n#k"+text);
						sflag=false;
						cm.喇叭(3,"装备强化","恭喜玩家：["+cm.getName()+"]成功升级了装备["+cm.getPlayer().xianshiwup(masterItemId)+"]，继续加油将它打造到极致吧！");
						//cm.gainGachaponItem(itemm[Math.floor(Math.random() * itemm.length)], 1,"裝備強化",true);
							//cm.worldMessageItem("[裝備強化] : " + "恭喜[" + cm.getPlayer().getName() + "]強化出 " + grade[nextGrade] + "的 "+cm.getItemName(masterItemId), toDrop);
							//cm.worldMessageItem("裝備強化 : " ,masterItemId);
							//cm.worldSpouseMessage(0x15, "[裝備合成] : 恭喜 " + cm.getChar().getName() + " 合成出 " + grade[nextGrade] + "的 "+cm.getItemName(masterItemId));
						cm.dispose();
					}
				}
			} else {
				//選擇裝備過程
				selectedPosition = selection;
				if (selectedPosition!=0 && selectedList[0]==null) {
					cm.sendPrev("请先选择主装备！");
				} else {
					if (selectedPosition!=1) {
					inventoryType = 1;
				} else {
					inventoryType = 4;
				}
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
						//過濾現金裝備
						//if (cm.isCash(item.getItemId())) 
							//continue;
						//過濾不能參與合成部位
						//if (getItemType(item.getItemId())==getitemid(item.getItemId()))
							//continue; 
						//過濾不可以強化的裝備
						//if (getItemType(item.getItemId())==-1)
							//continue; 
						//過濾小於50級的裝備
						//var getViceReqLevel = cm.getReqLevel(item.getItemId());
						//if (getViceReqLevel < 80) 
							//continue;
						//過濾等級差裝備
					
						//過濾已選裝備
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
//獲取裝備類型
function getItemType(itemid) {
	var type = Math.floor(itemid/10000);
	switch (type) {
		case 100:
			return 0;  //帽子
		case 104:
			return 1;  //上衣
		case 105:
			return 2;  //套裝
		case 106:
			return 3;  //褲裙
		case 107:
			return 4;  //鞋子
		case 108: 
			return 5;  //手套
		case 110:
			return 6;  //披風
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
//計算成功率
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
//計算費用
function getCost() {
	//裝備的數量*主裝備等級*品級+1
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

//消耗道具數量
function getitem() {
	//裝備的數量*主裝備等級*品級+1
	var masterItemId = selectedList[0][1];
	var masterItemPosition = selectedList[0][0];
	var nextGrade=Math.floor(getGrade(masterItemPosition))+1;
		switch(nextGrade) {
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		case 5:
			return 5;
		case 6:
			return 6;
		case 7:
			return 7;
		default:
			return 8;
	}
	return baseCost;
}
//獲得屬性
function getshuxing() {
	//裝備的數量*主裝備等級*品級+1
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
//獲取裝備品級
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

//可以強化的裝備
function getitemid() {
	//裝備的數量*主裝備等級*品級+1
	var masterItemId = selectedList[0][1];
	var masterItemPosition = selectedList[0][0];
	var nextGrade=Math.floor(getGrade(masterItemPosition))+1;
		switch(masterItemId) {
		case 1452044:
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

function getshuxjin() {
	//裝備的數量*主裝備等級*品級+1
	var masterItemId = selectedList[0][1];
		switch(masterItemId) {
		case 4250000:
			return 1;
		case 4250001:
			return 2;
		case 4250002:
			return 3;		
		default:
			return 10;
	}
	 return 10;
}

