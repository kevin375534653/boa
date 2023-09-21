/*  作者：   枫之谷
	NPC名字: 解梦人
	地图(ID):枫叶饭店内部
	描述:    解梦
*/
jilu = Math.floor(Math.random()*3);
function start() {
    cm.sendSimple ("你好.我是解梦.可以帮你了解你做的梦境.\r\n#b#L0#你目前只睡眠了" + cm.getBoss("做梦")+ "分钟\r\n#L1#兑换奖励(美梦)  你目前做了" + cm.getBoss("美梦")+ "次美梦\r\n#L2#兑换奖励(噩梦)  你目前做了" + cm.getBoss("噩梦")+ "次噩梦\r\n#L5#兑换经验(一分钟可以获得10,000点经验)\r\n#L3#解梦奖励\r\n#L4#领取勋章")
}

function action(mode, type, selection) {
    if (mode == 1) {
	if (selection == 0) {
		if (cm.getBoss("做梦") >= 240) {
		if(jilu == 2){
			cm.getPlayer().resetBoss("做梦",0,0,240) 
            cm.sendOk("梦镜分析出来了.你做了一个美梦")
			cm.setBoss("美梦");
			cm.dispose();
			return;
         }else {
		    cm.getPlayer().resetBoss("做梦",0,0,240) 
			cm.sendOk("梦镜分析出来了.你做了一个噩梦")
			cm.setBoss("噩梦");
			cm.dispose();
			return;
			} 
		}
		cm.sendOk("经过四个小时以上的充足睡眠后才可以解梦.\r\n你目前只睡眠了" + cm.getBoss("做梦")+ "分钟")
		
	} else if (selection == 1) {
	 		if (cm.getBoss("美梦") >= 5) {
			cm.getPlayer().resetBoss("美梦",0,0,5) 
			cm.gainItem(3010054, 1);
            cm.sendOk("恭喜你用美梦回购了 #i3010054#")
			cm.喇叭(3,"解梦","恭喜玩家：["+cm.getName()+"]用美梦回购了["+cm.getPlayer().xianshiwup(3010054)+"],想要的快去旅馆做梦吧!");					
         }else {
		cm.sendOk("五次美梦便可与解梦姐姐回购黄金猪梦获得#b呼噜呼噜床#i3010054#.你目前做了" + cm.getBoss("美梦")+ "次美梦")
		 }
} else if (selection == 2) {
            if (cm.getBoss("噩梦") >= 5) {
			cm.getPlayer().resetBoss("噩梦",0,0,5) 
			cm.gainItem(4032225, 1);
            cm.sendOk("恭喜你用噩梦回购了#i4032225#")
         }else {
		cm.sendOk("如果你做到五次梦.没有关系,让解梦姐姐给你辟邪.你目前做了" + cm.getBoss("噩梦")+ "次噩梦")
		 }	
} else if (selection == 3) {
	cm.sendOk("进入旅馆后会开始做梦(十分钟记录一次).\r\n经过四个小时以上的充足睡眠后.找美丽的解梦姐姐分析梦镜.五次美梦便可与解梦姐姐回购黄金猪梦获得#b呼噜呼噜床#i3010054\r\n#k如果你做到五次噩梦.没有关系,让解梦姐姐给你辟邪,\r\n还会得到意想不到的奖励哦.")
} else if (selection == 4) {
	if(cm.getBoss("做梦") >= 240){
		if (cm.getBoss("梦勋章") == 0) 
            cm.gainItem(1142085, 1);
				if (cm.getBoss("梦勋章") == 2) 
            cm.gainItem(1142086, 1);
				if (cm.getBoss("梦勋章") == 3) 
            cm.gainItem(1142087, 1);
				if (cm.getBoss("梦勋章") == 4) 
            cm.gainItem(1142088, 1);
				if (cm.getBoss("梦勋章") == 5) 
            cm.gainItem(1142089, 1);
				if (cm.getBoss("梦勋章") == 6) 
            cm.gainItem(1142090, 1);
				if (cm.getBoss("梦勋章") == 7) 
            cm.gainItem(1142091, 1);
				if (cm.getBoss("梦勋章") == 8) 
            cm.gainItem(1142092, 1);
				if (cm.getBoss("梦勋章") == 9) 
            cm.gainItem(1142093, 1);
				if (cm.getBoss("梦勋章") == 10) 
            cm.gainItem(1142094, 1);
				if (cm.getBoss("梦勋章") == 11) 
            cm.gainItem(1142095, 1);
				if (cm.getBoss("梦勋章") == 12) 
            cm.gainItem(1142096, 1);
				if (cm.getBoss("梦勋章") == 13) 
            cm.gainItem(1142097, 1);
				if (cm.getBoss("梦勋章") == 14) 
            cm.gainItem(1142098, 1);
				if (cm.getBoss("梦勋章") == 15) 
            cm.gainItem(1142099, 1);
		       if (cm.getBoss("梦勋章") == 16) {
            cm.sendOk("你领取到最高等勋章无法继续领取了")
			cm.dispose();
			return;
		    }
		    cm.setBoss("梦勋章");
			cm.getPlayer().resetBoss("做梦",0,0,240) 
            cm.sendOk("恭喜你领取成功")
			cm.喇叭(3,"解梦","恭喜玩家：["+cm.getName()+"]领取了做梦勋章,想要的快去旅馆做梦把");	
         }else {
		    cm.sendOk("经过二十四个小时以上的充足睡眠后才可以领取.\r\n你目前只睡眠了" + cm.getBoss("做梦")+ "分钟")
			} 
} else if (selection == 5) {
	if(cm.getBoss("做梦") >= 10){
		cm.getPlayer().resetBoss("做梦",0,0,10) 
		cm.gainExp(10000);
		cm.喇叭(3,"解梦","恭喜玩家：["+cm.getName()+"]成功兑换了1万点经验,想要的快去旅馆做梦把");	
	}else {
		    cm.sendOk("经过10分钟以上的充足睡眠后才可以兑换经验.\r\n你目前只睡眠了" + cm.getBoss("做梦")+ "分钟")
			} 
}
	}
cm.dispose();
}
