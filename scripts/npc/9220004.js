/** 
Happy - Happy ville 
@author Ronan
**/ 
var status = -1;
function start() { 
        action(1, 0, 0); 
} 
function action(mode, type, selection) { 
	if (mode == -1) { 
		cm.dispose(); 
	} else {
                if (status == 0 && mode == 0) { 
			cm.sendOk("当你想再跟我说话的时候。"); 
			cm.dispose(); 
		} 
                if (mode == 1) 
                        status++; 
                else 
                        status--; 
                 
                if (status == 0) { 
                        cm.sendSimple("#b<突袭任务：欢乐之城>#k\r\n你好，我是洒雪小矮人。我知道怎样飘落雪花，如果你能给我#r永恒的雪花#，就可以了！请从怪物身上获取#r永恒的雪花#k\r\n#b\r\n#L0#我要召唤小雪人\r\n#L1#我要召唤圣诞鹿\r\n#L2#没什么，只是冷。#k");
                } else if(status == 1) {
                        if(selection == 0) {
                                if(cm.getMap().getMonsters().size() > 1) {  //reactor as a monster? wtf
                                        cm.sendOk("消灭该地区所有的小雪人。"); 
                                        cm.dispose();
                                        return;
                                }
                            
                                cm.getMap().spawnMonsterOnGroundBelow(9500317, 1700, 80);
                        } else if(selection == 1) {
                                if(cm.getMap().getMonsters().size() > 6) {  //reactor as a monster? wtf
                                        cm.sendOk("这地方现在太拥挤了。在再试之前消灭一些怪物。"); 
                                        cm.dispose();
                                        return;
                                }
                            
                                cm.getMap().spawnMonsterOnGroundBelow(9500320, 1700, 80);
                        } else {
                                cm.sendOk("那好吧。");
                        }
                        
                        cm.dispose();
                }
        }
} 