/* Dawnveil
    Futuroid
	Gaga
    Made by Daenerys
*/
// var status = -1;
//
// function action(mode, type, selection) {
//     if (mode == 1) {
//         status++;
//     } else {
//         if (status == 0) {
// 		    cm.sendNext("真倒霉。你改变主意的时候告诉我。");
//             cm.dispose();
//         }
//         status--;
//     }
//     if (status == 0) {
// 	    cm.sendYesNo("我准备好用我的新发明来毁灭世界！你准备好做一个未来派了吗？");
// 	} else if (status == 1) {
// 	    cm.sendNext("哈哈，骗你的，活动还没有开放呢");
//         cm.dispose();
//     }
// }


var status = 0;
var xx = "#fEffect/ItemEff.img/1049000/0/0#"
var 信封未拆 = "#fEffect/BasicEff.img/FindPrize/Success/0#";
var 信封已拆 = "#fEffect/BasicEff.img/FindPrize/Success/11#";
var 金币 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 叹号按钮 = "#fUI/UIWindow.img/Item/BtGather/mouseOver/0#";
var maxActive = 510; //最大活跃只能是490
var nowActive = 250; //当前活跃
var encourageList = Array(50,100,150,200,250,300,400,510) //奖励档数
var encourageCharList = Array("①","②","③","④","⑤","⑥","⑦","⑧") //单个字符展示
var btstat = Array("#k[未完成]#k","#b[未领取]#k","#r[已领取]#k")
var logName = "activeValueDay_"

/**其他活跃数据配置*/
var otherList = Array(
    //等级,副本名称,次数,活跃点数,记录名字
    Array(0,"在线时间",240,240,"OnlineMin_HY_")
);

/**副本活跃数据配置*/
var partyTaskList = Array(
    //等级,副本名称,次数,活跃点数,记录名字
    Array(21,"废弃都市",2,50,"p_fqds_hy_"),
    Array(30,"嘉年华 ",2,50,"p_jnh_hy_"),
    Array(35,"玩具副本",1,50,"p_wjc_hy_"),
    Array(45,"毒物森林",2,50,"p_dwsl_hy_"),
    Array(55,"海盗副本",5,50,"p_bcthd_hy_"),
    Array(71,"男女副本",2,50,"p_nvfb_hy_"),
    Array(85,"女神塔 ",2,50,"p_vst_hy_")
);
/**怪物活跃数据配置*/
var openMobList = Array(
    //等级,怪物名字,次数,活跃点数,记录名字,怪物id
    Array(20,"红蜗牛王",1,25,"m_2220000_hy_",2220000),
    Array(30,"蝙蝠怪 ",1,25,"m_8130100_hy_",8130100),
    Array(35,"木妖王 ",1,25,"m_3220000_hy_",3220000),
    Array(38,"大宇   ",1,25,"m_3220001_hy_",3220001),
    Array(45,"歇尔夫 ",1,25,"m_4220000_hy_",4220000),
    Array(50,"浮士德 ",1,25,"m_5220002_hy_",5220002),
    Array(55,"巨居蟹 ",1,25,"m_5220001_hy_",5220001),
    Array(59,"提莫   ",1,25,"m_5220003_hy_",5220003),
    Array(60,"蘑菇王 ",1,25,"m_6130101_hy_",6130101),
    Array(65,"多尔   ",1,25,"m_6220000_hy_",6220000),
    Array(65,"僵尸蘑菇",1,25,"m_6300005_hy_",6300005),
    Array(65,"朱诺   ",1,25,"m_6220001_hy_",6220001),
    Array(70,"九尾狐 ",1,25,"m_7220001_hy_",7220001),
    Array(71,"肯德熊 ",1,25,"m_7220000_hy_",7220000),
    Array(77,"妖怪禅师",1,25,"m_7220002_hy_",7220002),
    Array(83,"艾利杰 ",1,25,"m_8220000_hy_",8220000),
    Array(85,"吉米拉 ",1,25,"m_8220002_hy_",8220002),
    Array(90,"驮狼雪人",1,25,"m_8220001_hy_",8220001),
    Array(90,"蓝蘑菇王",1,25,"m_9400205_hy_",9400205),
    //Array(100,"蝙蝠魔 ",1,20,"m_8150000_hy_",8150000),
    // Array(115,"天球   ",1,20,"m_9400014_hy_",9400014),
	Array(120,"大海兽",1,25,"m_8220003_hy_",8220003)
    
);
var slc = 0;
function action(mode, type, selection) {
    if(mode == 0){
        // cm.sendOk("好的");
        cm.dispose();
        return
    }

    /*if(cm.getPlayer().getLevel() < 30 && !cm.getPlayer().isGM()){
        cm.sendOk("拍卖是活跃功能30级后才开启!!!");
        cm.dispose();
    }*/


    // var zz = cm.dayDictGetIntValue()
    nowActive =cm.dayDictGetIntValue(logName+cm.getPlayer().getAccountID());
    var gz = cm.getPlayer().getGZ();//玩家工资
    var name = cm.getPlayer().getName();
    var nx = cm.getPlayer().getCSPoints(1);
    var mpoints = cm.getPlayer().getCSPoints(2);
    // cm.getPlayer().dropMessage(5,"mode="+mode+" type="+type+" selection="+selection+" status="+status);

    // a = (nowActive>= encourageList[0])?(true?btstat[2]:btstat[1]):btstat[0];

    if(status == 0){
        var text ="\t\t\t\t\t#b枫之谷每日活跃系统#n\r\n" +

            "\t"+金币+"#r工资:#b"+gz+"\r\n" +
            "\t"+金币+"#r活跃:#b"+nowActive+"\t\t\t\t"+金币+"#r满活跃:#b"+maxActive+"\r\n" +
            activeProgressBar(nowActive,maxActive)+
            //getOtherListStr(cm.getPlayer().getLevel())+
            getPartyTaskList(cm.getPlayer().getLevel())+

            getOpenMobListStr(cm.getPlayer().getLevel())+

            // "#r [怪物副本]\r\n"+
            " #L0#"+叹号按钮+ ((nowActive>= encourageList[0])?(getHYJL("HYJL1_")>0?btstat[2]:btstat[1]):btstat[0]) +"活跃奖励"+encourageCharList[0]+"#b#l"+

            "\t#L1#"+叹号按钮+ ((nowActive>= encourageList[1])?(getHYJL("HYJL2_")>0?btstat[2]:btstat[1]):btstat[0]) +"活跃奖励"+encourageCharList[1]+"#b#l\r\n"+

            " #L2#"+叹号按钮+ ((nowActive>= encourageList[2])?(getHYJL("HYJL3_")>0?btstat[2]:btstat[1]):btstat[0]) +"活跃奖励"+encourageCharList[2]+"#b#l"+

            "\t#L3#"+叹号按钮+ ((nowActive>= encourageList[3])?(getHYJL("HYJL4_")>0?btstat[2]:btstat[1]):btstat[0]) +"活极奖励"+encourageCharList[3]+"#r#l\r\n\r\n"+
			
			" #L4#"+叹号按钮+ ((nowActive>= encourageList[4])?(getHYJL("HYJL5_")>0?btstat[2]:btstat[1]):btstat[0]) +"活跃奖励"+encourageCharList[4]+"#b#l"+

            "\t#L5#"+叹号按钮+ ((nowActive>= encourageList[5])?(getHYJL("HYJL6_")>0?btstat[2]:btstat[1]):btstat[0]) +"活跃奖励"+encourageCharList[5]+"#b#l\r\n"+

            " #L6#"+叹号按钮+ ((nowActive>= encourageList[6])?(getHYJL("HYJL7_")>0?btstat[2]:btstat[1]):btstat[0]) +"活跃奖励"+encourageCharList[6]+"#b#l"+

            "\t#L7#"+叹号按钮+ ((nowActive>= encourageList[7])?(getHYJL("HYJL8_")>0?btstat[2]:btstat[1]):btstat[0]) +"终极奖励"+encourageCharList[7]+"#r#l\r\n\r\n"+

            " \#L10#"+叹号按钮+"我要用工资兑换奖励#b#l"+"\t#L11#"+叹号按钮+"我要听歌#b#l\r\n"
			//" \#L10#"+叹号按钮+"我要用工资兑换奖励#b#l"

        ;
//
//         if(cm.getPlayer().isGM()){
//         		cm.gainItem(5072000,1,false,2,false,-1,"活跃奖励");
//        //
//        // 	text+=cm.showBossStat();
//         }



        cm.sendSimple(text);
        status++;
    } else if(status == 1){
        switch (selection) {
            case -1:
                cm.dispose();
                break;
            case 0:
                cm.sendYesNo("活跃奖励①：\r\n" +
                	//"\t"+"#r#v5072000##k高质地喇叭*1(现时2天).\r\n" +
                    "\t"+"#r抵用券增加20点\r\n" +
                    "\t"+"#r工资增加"+金币+"20点\r\n"+
                    "#k是否需要领取?");
                slc = selection;
                break;
            case 1:
                cm.sendYesNo("活跃奖励②：\r\n" +
				    //"\t"+"#r#v5072000##k高质地喇叭*1(限时3天).\r\n" +
					"\t"+"#r抵用券增加30点\r\n" +
                    //"\t"+"#r#v4001254##k闪耀的冒险岛纪念币*1(用于升级伴生戒指).\r\n" +
                    "\t"+"#r工资增加"+金币+"30点\r\n"+
                    "#k是否需要领取?");
                slc = selection;
                break;
            case 2:
                cm.sendYesNo("活跃奖励③：\r\n" +
                    //"\t"+"#r#v4001254##k闪耀的冒险岛纪念币*1(用于升级伴生戒指).\r\n" +
                    "\t"+"#r抵用券增加40点\r\n" +
					"\t"+"#r工资增加"+金币+"40点\r\n"+
                    "#k是否需要领取?");
                slc = selection;
                break;
            case 3:
                cm.sendYesNo("活跃奖励④：\r\n" +
                    //"\t"+"#r#v2022118##k管理员的祝福(20分钟内提高10物魔攻)\r\n" +
                    "\t"+"#r抵用券增加50点\r\n" +
					"\t"+"#r工资增加"+金币+"50点\r\n"+
                    "#k是否需要领取?");
                slc = selection;
                break;
            case 4:
                cm.sendYesNo("活跃奖励⑤：\r\n" +
                    //"\t"+"#r邀请积分增加10点\r\n" +
					"\t"+"#r抵用券增加60点\r\n" +
                    "\t"+"#r工资增加"+金币+"60点\r\n"+
                    "#k是否需要领取?");
                slc = selection;
                break;
            case 5:
                cm.sendYesNo("活跃奖励⑥：\r\n" +
                    //"\t"+"#r#v5041000#一个.\r\n" +
					"\t"+"#r抵用券增加70点\r\n" +
                    "\t"+"#r工资增加"+金币+"70点\r\n"+
                    "#k是否需要领取?");
                slc = selection;
                break;
            case 6:
                cm.sendYesNo("活跃奖励⑦：\r\n" +
                    //"\t"+"#r#v5150040#一个.\r\n" +
					"\t"+"#r抵用券增加200点\r\n" +
                    "\t"+"#r工资增加"+金币+"100点\r\n"+
                    "#k是否需要领取?");
                slc = selection;
                break;
            case 7:
                cm.sendYesNo("终极奖励⑧：\r\n" +
                    "\t"+"#r抵用券增加300点\r\n" +
                    "\t"+"#r工资增加"+金币+"150点\r\n"+
                    "#k是否需要领取?");
                slc = selection;
                break;				
            case 10:
			    cm.openNpcMod(9000021,"工资兑换");
                //cm.openNpc(9330076);
                break;
			case 11:
			    cm.openNpcMod(9000021,"听歌");
                //cm.openNpc(9900004);
                break;
            case 999:
                cm.sendOk(cm.showBossStat());
                cm.dispose();
                break;

        }
        status++;
        // cm.dispose();
    } else if(status == 2){
        var fail = true;
        switch (slc){
            case 0:
                if(nowActive>=encourageList[slc] && getHYJL("HYJL1_") < 1){
                    /**设置记录*/
                    //if(cm.canHold(5072000)){
	                    cm.dayDictSetIntValue("HYJL1_"+cm.getPlayer().getAccountID(),getHYJL("HYJL1_")+1);
	                    //cm.gainItem(5072000,1,false,2,false,-1,"活跃奖励");
						cm.mpointsAdd(20);//增加抵用
	                    cm.getPlayer().addGZ(20);
	                    cm.sendOk("领取成功");
	                    fail = false;
                    //} else {
                    //    cm.sendOk("背包空间不足！");
                    //    cm.dispose();
                    //}
                }
                cm.dispose();
                break;
            case 1:
                if(nowActive>=encourageList[slc] && getHYJL("HYJL2_") < 1){
                    /**设置记录*/
                    //if(cm.canHold(5072000)){
                        cm.dayDictSetIntValue("HYJL2_"+cm.getPlayer().getAccountID(),getHYJL("HYJL2_")+1);
                        //cm.gainItemPeriod(5072000,1,3);//3天的喇叭
						cm.mpointsAdd(30);//增加抵用
                        cm.getPlayer().addGZ(30);
                        cm.sendOk("领取成功");
                        fail = false;
                    //}else{
                    //    cm.sendOk("背包空间不足！");
                    //    cm.dispose();
                    //}

                }
                cm.dispose();
                break;
            case 2:
                if(nowActive>=encourageList[slc] && getHYJL("HYJL3_") < 1){
                    /**设置记录*/
                    //if(cm.canHold(4001254)){
                        cm.dayDictSetIntValue("HYJL3_"+cm.getPlayer().getAccountID(),getHYJL("HYJL3_")+1);
                        //cm.gainItem(4001254,1);//枫叶纪念币
						cm.mpointsAdd(40);//增加抵用
                        cm.getPlayer().addGZ(40);
                        cm.sendOk("领取成功");
                        fail = false;
                    //}else{
                    //    cm.sendOk("背包空间不足！");
                    //    cm.dispose();
                    //}
                }
                cm.dispose();
                break;
            case 3:
                if(nowActive>=encourageList[slc] && getHYJL("HYJL4_") < 1){
                    /**设置记录*/
                    //if(cm.canHold(2022118)){
                        cm.dayDictSetIntValue("HYJL4_"+cm.getPlayer().getAccountID(),getHYJL("HYJL4_")+1);
                    //    cm.gainItem(2022118,1);//管理员的祝福
					    cm.mpointsAdd(50);//增加抵用
                        cm.getPlayer().addGZ(50);
                        cm.sendOk("领取成功");
                        fail = false;
                   // }else{
                    //    cm.sendOk("背包空间不足！");
                    //    cm.dispose();
                    //}
                }
                cm.dispose();
                break;
            case 4:
                if(nowActive>=encourageList[slc] && getHYJL("HYJL5_") < 1){
                    /**设置记录*/
                    //if(cm.canHold(2022118)){
                        cm.dayDictSetIntValue("HYJL5_"+cm.getPlayer().getAccountID(),getHYJL("HYJL5_")+1);
                        //cm.gainItem(2022118,3);//管理员的祝福
						//cm.pointAdd(10);//加10积分
						cm.mpointsAdd(60);//增加抵用
                        cm.getPlayer().addGZ(60);
                        cm.sendOk("领取成功");
                        fail = false;
                    //}else{
                    //    cm.sendOk("背包空间不足！");
                    //    cm.dispose();
                    //}
                }
                cm.dispose();
                break;
            case 5:
                if(nowActive>=encourageList[slc] && getHYJL("HYJL6_") < 1){
                    /**设置记录*/
                    //if(cm.canHold(5041000)){
                        cm.dayDictSetIntValue("HYJL6_"+cm.getPlayer().getAccountID(),getHYJL("HYJL6_")+1);
                        //cm.gainItem(5041000,1);//高级瞬移石
						cm.mpointsAdd(70);//增加抵用
                        cm.getPlayer().addGZ(70);
                        cm.sendOk("领取成功");
                        fail = false;
                    //}else{
                    //    cm.sendOk("背包空间不足！");
                    //    cm.dispose();
                    //}
                }
                cm.dispose();
                break;
            case 6:
                if(nowActive>=encourageList[slc] && getHYJL("HYJL7_") < 1){
                    /**设置记录*/
                    //if(cm.canHold(5150040)){
                        cm.dayDictSetIntValue("HYJL7_"+cm.getPlayer().getAccountID(),getHYJL("HYJL7_")+1);
                        //cm.gainItem(5150040,1);//皇家美容卡
						cm.mpointsAdd(200);//增加抵用
                        cm.getPlayer().addGZ(100);
                        cm.sendOk("领取成功");
                        fail = false;
                    //}else{
                    //    cm.sendOk("背包空间不足！");
                    //    cm.dispose();
                    //}
                }
                cm.dispose();
                break;
            case 7:
                if(nowActive>=encourageList[slc] && getHYJL("HYJL8_") < 1){
                    /**设置记录*/
                    //if(cm.canHold(2022118)){
                        cm.dayDictSetIntValue("HYJL8_"+cm.getPlayer().getAccountID(),getHYJL("HYJL8_")+1);
                        //cm.gainItem(2022118,3);//管理员的祝福
						cm.mpointsAdd(300);//增加抵用
                        cm.getPlayer().addGZ(150);
                        cm.sendOk("领取成功");
                        fail = false;
                    //}else{
                    //    cm.sendOk("背包空间不足！");
                   //     cm.dispose();
                    //}
                }
                cm.dispose();
                break;

				
            case 30:
                if(nowActive>=encourageList[slc] && getHYJL("HYJL30_") < 1){
                    var says ="每天只可以选择其中一种奖励哦。\r\n\r\n";
                    says+="#L1#我要领取3个#v5072000##l\r\n";
                    says+="#L2#我要领取2个#v5510000##l\r\n";
                    says+="#L3#我要领取2个#v5130000##l\r\n";
                    says+="#L4#我要领取2个#v5150040##l\r\n";
                    says+="#L5#我要领取1个#v5076000##l\r\n";
                    says+="#L6#我要领取1个#v5041000##l\r\n";
                    cm.sendSimple(says);
                    fail = false;
                    status++;

                }
                break;
        }
        if(fail){
            cm.sendOk("小伙子，想浑水摸鱼？");
            cm.dispose();
        }

        //cm.dispose();
    }else if(status == 3){
        switch (selection){
            case 1:
                if(cm.canHold(5072000)){
                    cm.dayDictSetIntValue("HYJL4_"+cm.getPlayer().getAccountID(),getHYJL("HYJL4_")+1);/**设置记录*/
                    cm.getPlayer().addGZ(100);
                    cm.gainItem(5072000,3);
                    cm.sendOk("恭喜你成功领取");
                    cm.dispose();
                }else{
                    cm.sendOk("背包空间不足！");
                    cm.dispose();
                }
                break;
            case 2:
                if(cm.canHold(5510000)){
                    cm.dayDictSetIntValue("HYJL4_"+cm.getPlayer().getAccountID(),getHYJL("HYJL4_")+1);/**设置记录*/
                    cm.getPlayer().addGZ(100);
                    cm.gainItem(5510000,2);
                    cm.sendOk("恭喜你成功领取");
                    cm.dispose();
                }else{
                    cm.sendOk("背包空间不足！");
                    cm.dispose();
                }
                break;
            case 3:
                if(cm.canHold(5130000)){
                    cm.dayDictSetIntValue("HYJL4_"+cm.getPlayer().getAccountID(),getHYJL("HYJL4_")+1);/**设置记录*/
                    cm.getPlayer().addGZ(100);
                    cm.gainItem(5130000,2);
                    cm.sendOk("恭喜你成功领取");
                    cm.dispose();
                }else{
                    cm.sendOk("背包空间不足！");
                    cm.dispose();
                }
                break;
            case 4:
                if(cm.canHold(5150040)){
                    cm.dayDictSetIntValue("HYJL4_"+cm.getPlayer().getAccountID(),getHYJL("HYJL4_")+1);/**设置记录*/
                    cm.getPlayer().addGZ(100);
                    cm.gainItem(5150040,2);
                    cm.sendOk("恭喜你成功领取");
                    cm.dispose();
                }else{
                    cm.sendOk("背包空间不足！");
                    cm.dispose();
                }
                break;
            case 5:
                if(cm.canHold(5076000)){
                    cm.dayDictSetIntValue("HYJL4_"+cm.getPlayer().getAccountID(),getHYJL("HYJL4_")+1);/**设置记录*/
                    cm.getPlayer().addGZ(100);
                    cm.gainItem(5076000,1);
                    cm.sendOk("恭喜你成功领取");
                    cm.dispose();
                }else{
                    cm.sendOk("背包空间不足！");
                    cm.dispose();
                }
                break;
            case 6:
                if(cm.canHold(5041000)){
                    cm.dayDictSetIntValue("HYJL4_"+cm.getPlayer().getAccountID(),getHYJL("HYJL4_")+1);/**设置记录*/
                    cm.getPlayer().addGZ(100);
                    cm.gainItem(5041000,1);
                    cm.sendOk("恭喜你成功领取");
                    cm.dispose();
                }else{
                    cm.sendOk("背包空间不足！");
                    cm.dispose();
                }
                break;

        }
        cm.dispose();
    }


}

/**野外列表*/
function getOtherListStr(level){
    var text = "";
    if(level>=otherList[0][0] || cm.getPlayer().isGM()){
        text+= "#r [其他活跃]\r\n";
        for (var i = 0; i < otherList.length; i++) {//等级,怪物名字,次数,活跃点数,记录名字,怪物id
            if(level >= otherList[i][0] || cm.getPlayer().isGM()){//判断等级

                var other=otherList[i];
                var count = cm.dayDictGetIntValue(other[4]+cm.getPlayer().getAccountID()); //副本已活跃点

                text += "\t"+(count==other[3]?"#k":"#b")+other[1]+"x"+other[2]+"\t["+count+"/"+other[3]+"]";
                text += (((i%2)!=0)?"\r\n":"\t\t");
            }
        }
    }
    // text += "\t"+"#b废弃都市*4\t[15/60]"+"\t\t"+"#k嘉年华*4\t#k[80/80]\r\n";
    text+="\r\n"


    return text;
}

/**野外列表*/
function getOpenMobListStr(level){
    var text = "";
    if(level>=openMobList[0][0] || cm.getPlayer().isGM()){
        text+= "#r [野外怪物]      #L999#怪物复活时间#l\r\n\r\n";
        for (var i = 0; i < openMobList.length; i++) {//等级,怪物名字,次数,活跃点数,记录名字,怪物id
            if(level >= openMobList[i][0] || cm.getPlayer().isGM()){//判断等级

                var openMob=openMobList[i];
                var count = cm.dayDictGetIntValue(openMob[4]+cm.getPlayer().getAccountID()); //副本已活跃点

                text += "\t"+(count==openMob[3]?"#k":"#b")+openMob[1]+"x"+openMob[2]+"\t["+count+"/"+openMob[3]+"]";
                text += (((i%2)!=0)?"\r\n":"\t\t");
            }
        }
    }
    // text += "\t"+"#b废弃都市*4\t[15/60]"+"\t\t"+"#k嘉年华*4\t#k[80/80]\r\n";
    text+="\r\n"


    return text;
}

/**组队副本*/
function getPartyTaskList(level){
    var text = "";
    if(level>=partyTaskList[0][0] || cm.getPlayer().isGM()){
        text+= "#r [组队副本]\r\n";
        for (var i = 0; i < partyTaskList.length; i++) {//等级,副本名称,次数,活跃点数,记录名字
            if(level >= partyTaskList[i][0] || cm.getPlayer().isGM()){//判断等级

                var partyTask=partyTaskList[i];
                // cm.getPlayer().dropMessage(5,"level="+level+" pl="+partyTask[0]);
                var count = cm.dayDictGetIntValue(partyTask[4]+cm.getPlayer().getAccountID()); //副本已活跃点

                text += "\t"+(count==partyTask[3]?"#k":"#b")+partyTask[1]+"x"+partyTask[2]+"\t["+count+"/"+partyTask[3]+"]";
                text += (((i%2)!=0)?"\r\n":"\t\t");
            }
        }
    }
    // text += "\t"+"#b废弃都市*4\t[15/60]"+"\t\t"+"#k嘉年华*4\t#k[80/80]\r\n";

    text+="\r\n"

    return text;
}

/**活跃进度条*/
function activeProgressBar(now,max){
    var now = Math.floor(now/10);
    // cm.getPlayer().dropMessage(5,"now="+now);
    var head = now < 1?"#b":"#r"
    var progressBar = "";//进度条
    var progressBar2 = "";//奖励导航
    /**判断字段*/
    var has = false;
    var it = false;
    for (var i = 1;i<=(max/10);i++){
        /**奖励字符插入*/
        for(var k = 0;k<encourageList.length;k++){
            if((encourageList[k]/10)==(i+1)){
                progressBar+=encourageCharList[k];
                progressBar+= (now == i || now == i+1)?"#b":"";
                /**一个奖励字符占2个字段*/
                i++;
                has = true;
                it = false;
            }
            if((encourageList[k]/10)==(i+2)){
                progressBar2+=now>=(i+2)?"":"#b"
                progressBar2+= encourageList[k];//这个占3个字符
                it=true;
            }
        }
        if (has){
            has = false;
        } else {
            progressBar+= i==now?">#b":"="
            progressBar2+= it?"":" "
            progressBar2 += i==now?"#b":""
        }
    }
    // var text = "#b["+head+"======================①=============②==========③=#b]\r\n" +
    var text = "#b|"+head+progressBar+"#b|\r\n" +
        "#b|"+head+progressBar2+"#b|\r\n";
    return text
}

function getHYJL(str){
    return cm.dayDictGetIntValue(str+cm.getPlayer().getAccountID());
}
