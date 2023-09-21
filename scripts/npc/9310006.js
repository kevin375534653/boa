/* 
  大王蜈蚣
*/

var status;
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;

                if (status == 0) {
                        cm.sendNext("你是为了打败大王蜈蚣来的吧？我送你到大王蜈蚣那里。");
                } else if (status == 1) {
                        if (randTalk = 0) {
                                cm.dispose();
                        } else {
                                cm.sendNext("一定要打败大王蜈蚣，夺回赤珠平安回来。。。");
                        }
                } else if (status == 2) {
                                var em = cm.getEventManager("z_Centipede");
                                if (em == null) {
                                        cm.sendOk("當前副本有問題，請聯絡管理員....");
                                        cm.dispose();
                                } else {
                                        if (em.startInstance(cm.getPlayer())) { // thanks RedHat for noticing an issue here
                                        } else {
                                                cm.sendOk("里面已经有人在挑战大王蜈蚣了...");
                                                cm.dispose();
                                        }
                                }
                                } else {
                                       var prop = em.getProperty("state");
                                       if (!em.startInstance(cm.getPlayer())) {
                                              em.startInstance(cm.getPlayer());
                                              cm.dispose();
                                              return;

                                        
                                  
                        }
                }
        }
}