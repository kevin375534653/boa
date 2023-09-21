 var textz = "\r\n你好，我是大姐大，请选择你需要租的装备";

var a = 0;
var text;
var selects; //记录玩家的选项
var buynum = 0;
var typed = 0; // 记录玩家选择的类型
var itemlist = null;
var searchItemList = null;
var lastItemList = null;
var isSearch = false;
var typeList = Array(
	Array(0, "帽子"),
	Array(1, "上衣"),
	Array(2, "套装"),
	Array(3, "裤裙"),
	Array(4, "鞋子"),
	Array(5, "手套"),
	Array(6, "披风"),
	Array(7, "武器"),
	Array(8, "戒指")
	//Array(999, "其他")
);
function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
		} else if (a == 0) {
			text = "#h0#，你好，我是大姐大，请选择你需要租的装备\r\n";
			text += "#d#e#L2014#我要进行搜索#l#k#n\r\n\r\n"
			for(var i=0; i<typeList.length; i++) {
				text += "#b#L"+i+"#"+typeList[i][1]+"#l\t";
				if (!((i+1)%4))
					text +="\r\n";
			}
			cm.sendSimple(text);
        } else if (a == 1) {
			if (selection == 2014) {
				a = 0;
				cm.sendGetText("请输入您要搜索的物品名称，可以进行模糊查询");
				isSearch=true;
			} else {
				typed = selection;
				if (isSearch) {
					searchItemList = getItemListByName(cm.getText());
					typed = 9;
					lastItemList = searchItemList;
					text = "#h0#,您搜索的【#r"+cm.getText()+"#k】物品如下：\r\n\r\n#b";
				} else {
					if (itemlist == null)
						itemlist = getItemList();
					lastItemList = itemlist;
					text = "#b#h0##k,您可以在这里租用#e#b【"+typeList[typed][1]+"】#n#k，请选择你想要租的物品：\r\n\r\n#b";
				}
				
				if (lastItemList.length<=0)
				{
					a = -1;
					text+="未找到您要找的物品，请联系管理员进行添加。";
					cm.sendOk(text);
					cm.dispose();
				return;
				}
				for (var i=0; i<lastItemList.length; i++) {
					if (getItemType(lastItemList[i][0])!=typeList[typed][0] && !isSearch)
						continue;
					text += "#L" + (i) + "##i" + lastItemList[i] + ":##t" + lastItemList[i] + "\r\n\r\n";
				}
				isSearch = false;
				cm.sendSimple(text);
			}
        } else if (a == 2) {
			selects = selection;
			if (selects == -1) {
				cm.sendOk('没有可以购买的物品');
				cm.dispose();
				return;
			}
            buynum = 1;
            cm.sendYesNo("你想租的装备" + buynum + "个#r#i" + lastItemList[selects][0] + "##k？");
        } else if (a == 3) {
			if (cm.getSpace(1)<1) {
				cm.sendOk('背包字段不足');
				cm.dispose();
				return;
			}
			if (cm.haveItem(5220007,1)){
				cm.gainItem(5220007,0);
                cm.gainItem(lastItemList[selects][0], 1,true,true,24*6000*500);
                cm.sendOk("租成功了！");
                cm.dispose();
            } else {
                cm.sendOk("#v5220007##z5220007#您没有该物品 需要在商城购买后在来吧#k");
                cm.dispose();
            }
        }
    }//mode
}//f

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
		case 111:
			return 8;  //戒指
		default:
			if (type==120)
				return 999;
			if (type==135)
				return 999;
			var type=Math.floor(type/10);
			if (type==12 || type==13 || type==14 || type==15 || type==17) {
				return 7;  //武器
			}
			return 999; 
	}
}

//获取商店列表
function getItemList() {
	var conn = Packages.tools.DatabaseConnection.getConnection();
	var sql = "select itemid, itemprice from npccashshopdajieda order by id desc, itemprice asc";
	var pstmt = conn.prepareStatement(sql);
	var rs = pstmt.executeQuery();
	var rsList = Array();
	while(rs.next())
	{
		rsList.push(Array(rs.getInt("itemid"), rs.getInt("itemprice")));
	}
	rs.close();
	pstmt.close();
	//conn.close();
	return rsList;
}
function getItemListByName(name) {
	var conn = c
	name = name.replace(".*([';]+|(--)+).*", " ");
	var sql = "select itemid, itemprice from npccashshopdajieda where itemname like '%"+name+"%' order by id desc, itemprice asc";
	var pstmt = conn.prepareStatement(sql);
	var rs = pstmt.executeQuery();
	var rsList = Array();
	while(rs.next())
	{
		rsList.push(Array(rs.getInt("itemid"), rs.getInt("itemprice")));
	}
	rs.close();
	pstmt.close();
	//conn.close();
	return rsList;
}
