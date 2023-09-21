/**
   黑轮王PQ
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
                        //if (cm.getPlayer().getHistoryData("黑轮王前置")>0)
                        if (cm.isQuestCompleted(8626))
                               {
                                    cm.sendNext("嘿！这不就是通过考验的勇士吗？若是你的话，无论如何我都会让你进去的！哈哈哈~");

                        } else {
                                if (cm.haveItem(4031356)) {
                                    cm.sendNext("你带来了#v4031356#，好的，这就让你进去。");
                                } else {
                                    cm.sendOk("只有带来#v4031356#，我才能让你进去。");
                                    cm.dispose();
                                return;
                        }
		}
                } else if (status == 1) {

					cm.sendNext("走到下一个地方时，你会遇到很危险的怪物。千万小心。再见。");

                } else if (status == 2) {
                                var em = cm.getEventManager("z_SnackBar");
                                if (em == null) {
                                        cm.sendOk("当前副本有问题，请联系管理员。");
                                        cm.dispose();
                                } else {
                                        var prop = em.getProperty("state");
                                        if (em.startInstance(cm.getPlayer())) {
                                        if (cm.haveItem(4031356)) {
                                               cm.gainItem(4031356,-1);
                                               cm.isQuestCompleted(8626);
                                               cm.dispose();
                                               return;
                                        }
                                        em.startInstance(cm.getPlayer());
                                              cm.dispose();
                                              return;
                                        } else {
                                                if (em.startInstance(cm.getPlayer())) { // thanks RedHat for noticing an issue here
                                                } else {
                                                        cm.sendOk("里面已经有人在挑战黑轮王了。");
                                                        cm.dispose();
                                        }
                                }
                        }
                }
        }
}