var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1 || (mode == 0 && status == 0)){
		cm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;



	if(status == 0){
                if(cm.isQuestStarted(21728)) {
                        cm.sendOk("你在寻找木偶师的任何线索，但似乎有一股强大的力量挡住了你的去路... 最好回到#b#p1061019##k。");
                        cm.setQuestProgress(21728, 21761, 0);
                        cm.dispose();
                        return;
                }
            
		cm.sendGetText("要是想进去，就说出暗号！#b（听到了奇怪的说话声。#b想要进去，先说出暗号！）#k");
	}
	else if(status == 1){
                if(cm.getText() == "弗朗西斯是天才人偶师！"){
			if(cm.isQuestStarted(20730) && cm.getQuestProgressInt(21730, 9300285) == 0)
				cm.warp(910510001, 1);
                        else if(cm.isQuestStarted(21731) && cm.getQuestProgressInt(21731, 9300346) == 0)
				cm.warp(910510001, 1);
			else
                                cm.playerMessage(5, "有一股神秘的力量正在阻挡你的去路。");

			cm.dispose();
		}
		else{
			cm.sendOk("#b密码错了！");
		}
	}
	else if(status == 2){
		cm.dispose();
	}
}