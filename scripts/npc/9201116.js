var status = -1;
var msg;
var sel;
//var item = [1932212,1932005,1932017,1932020,1932021,1932052,1932054,1932056,1932091,1932092,1932108,1932116,1932117,1932140,1932157,1932158,1932173,1932198,1932212,1932223,1932234,1932236,1932246,1932258,1932261,1932272,1932286,1932288,1932317,1932329,1932355,1932315];
var item = [1932006,1932007,1932008,1932009,1932010,1932011,1932012,1932013,1932014,1932015,1932016,1932017,1932018,1932020,1932021,1932022,1932023,1932025,1932026,1932027,1932028,1932029,1932030,1932031,1932032,1932033,1932034,1932035,1932036,1932038,1932041,1932043,1932044,1932045,1932046,1932047,1932048,1932049,1932050,1932051,1932052,1932053,1932054,1932055,1932056,1932057,1932058,1932059,1932060,1932061,1932062,1932063,1932064,1932065,1932066,1932071,1932072,1932078,1932080,1932081,1932083,1932084,1932001,1932086,1932087,1932088,1932089,1932090,1932091,1932092,1932093,1932094,1932095,1932096,1932097,1932098,1932099,1932100,1932102,1932103,1932105,1932106,1932107,1932108,1932109,1932110,1932112,1932113,1932114,1932115,1932116,1932117,1932118,1932119,1932120,1932121,1932122,1932123,1932124,1932126,1932127,1932128,1932129,1932130,1932131,1932132,1932133,1932134,1932135,1932136,1932137,1932138,1932139,1932140,1932141,1932142,1932143,1932144,1932145,1932146,1932147,1932148,1932149,1932150,1932151,1932152,1932153,1932154,1932155,1932156,1932157,1932158,1932159,1932002,1932161,1932162,1932163,1932164,1932165,1932166,1932167,1932168,1932169,1932170,1932171,1932172,1932173,1932174,1932175,1932176,1932177,1932178,1932179,1932180,1932181,1932182,1932183,1932184,1932185,1932186,1932187,1932188,1932189,1932190,1932191,1932192,1932193,1932194,1932195,1932196,1932197,1932198,1932199,1932200,1932201,1932202,1932203,1932204,1932205,1932206,1932207,1932208,1932211,1932212,1932213,1932214,1932215,1932216,1932217,1932218,1932219,1932220,1932221,1932222,1932223,1932224,1932225,1932226,1932227,1932228,1932230,1932231,1932232,1932234,1932235,1932236,1932237,1932238,1932239,1932240,1932241,1932242,1932243,1932244,1932245,1932246,1932247,1932248,1932249,1932250,1932251,1932252,1932253,1932254,1932255,1932256,1932258,1932259,1932260,1932261,1932262,1932263,1932264,1932265,1932266,1932267,1932268,1932269,1932270,1932271,1932272,1932273,1932274,1932275,1932276,1932277,1932279,1932280,1932281,1932282,1932286,1932287,1932288,1932289,1932290,1932291,1932292,1932293,1932294,1932295,1932296,1932297,1932298,1932299,1932300,1932301,1932302,1932303,1932304,1932305,1932306,1932307,1932308,1932310,1932311,1932313,1932314,1932315,1932316,1932317,1932318,1932319,1932320,1932321,1932322,1932323,1932324,1932325,1932326,1932327,1932329,1932330,1932332,1932334,1932335,1932336,1932337,1932338,1932339,1932341,1932342,1932350,1932351,1932352,1932353,1932355,1932366,1939000,1939001,1939002,1939003,1939004,1939005,1930001,1932005];
var random = true;
var need = 5000;

function start(){
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == 1){
		status++;
	} else if(mode == 0){
		status--;
	} else {
		cm.dispose();
		return;
	}
	if(status == 0) {
		msg = "你好,我是皇家骑宠代理人,你将愿意花费点卷在我这里随机获取皇家骑宠技能吗 ?";
		if(cm.getPlayer().getMountId() != 0 && Packages.server.MapleItemInformationProvider.getInstance().itemExists(cm.getPlayer().getMountId())){
			msg += "\r\n#r 目前你的骑宠是 : #i" + cm.getPlayer().getMountId() + "##t" + cm.getPlayer().getMountId() + "#";
		}
		cm.sendYesNo(msg);
	} else if(status == 1) {
		cm.sendSimple("#b#L0# 抽取骑宠#l\r\n#r #L1#查看骑宠种类\r\n#r #L2#还原骑宠(UFO)");
	} else if(status == 2) {
		msg = "\r\n";
		if(selection == 1){
			for(var i = 0; i < item.length; i++){
				if(Packages.server.MapleItemInformationProvider.getInstance().itemExists(item[i])){
					msg += "#i"+item[i]+":##t"+item[i]+"#\r\n ";
				}
			}
			cm.sendNext(msg);
			status = 0;
		}
		
		if(selection == 0 && random){
			if(cm.getPlayer().getCSPoints(1) < need){
				cm.sendNext("点卷不足" + need);
				cm.dispose();
				return;
			} else if(!cm.canHold(1932081)){
				//cm.sendNext("装备栏空间不足");
				//cm.dispose();
				//return;
			}
			
			var exist = true;
			do{
				sel = Math.floor(Math.random() * item.length);
				exist = Packages.server.MapleItemInformationProvider.getInstance().itemExists(item[sel]);
			}while(!exist);
			cm.getPlayer().setMountId(item[sel]);
			cm.收点券(-need);
			cm.sendNext("你获得了 #i"+item[sel]+":##t"+item[sel]+"#");
			cm.dispose();
		} else if(selection == 2){
			cm.getPlayer().setMountId(0);
			cm.sendNext("成功还原骑宠(UFO)");
			cm.dispose();
		} else {
			if(selection == 0){
				for(var i = 0; i < item.length; i++){
					msg += "#L"+i+"##i"+item[i]+":##t"+item[i]+"\r\n";
				}
				cm.sendSimple(msg);
			}
		}
	} else if(status == 3){
		if(!random){
			sel = selection;
			cm.sendYesNo("你确定是否选择 #i"+item[sel]+":##t"+item[sel]+"#");
		}
	} else if(status == 4){
		if(!random){
			cm.getPlayer().setMountId(item[sel]);
			cm.sendNext("你获得了 #i"+item[sel]+":##t"+item[sel]+"#");
			cm.dispose();
		}
	} else {
		cm.dispose();
	}
}