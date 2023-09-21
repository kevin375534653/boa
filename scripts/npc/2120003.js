/* @Author SharpAceX
        Name: Maid
        Map(s): Foyer.
        Info: Maid
*/
var cost = 1; //判断数量
var 次数 = 30; //次数限制
var randTalk = Math.floor(Math.random() * 10) + 1; //解梦几率
var status;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            if (cm.getBossLog("鬼娃恰吉") >= 次数) {
                cm.sendOk("你已经达到了挑战次数，这样的话我就不能帮你解梦了，请稍后再试。");
                cm.dispose();
                return;
            }
            cm.sendNext("收集到解梦钥匙了吗？让我来帮你解梦吧！看看你在万圣节会出现什么样的梦，解梦钥匙就交给我吧！");
        } else if (status == 1) {
            if (!cm.haveItem(4001337, cost)) { //需要的物品
                cm.sendOk("你沒有钥匙就不能做梦了！");
                cm.dispose();
                return;
            }
            if (randTalk >= 5) {
                cm.sendNext("梦里面的南瓜正在睡觉呢~如果你帶一些南瓜碎片以及300万金币，他有可能会唤醒也说不定？");
                cm.gainItem(4001337, -1);
                cm.gainMeso( - 3000000);
                cm.dispose();
            } else {
                cm.sendNext("哦不~可怕的噩梦就要开始了，你梦见了鬼娃恰吉正在破坏万圣节派对，他抢走了孩子们的糖果！好好教训他，并把他赶出去！");
            }
        } else if (status == 2) {
            if (cm.haveItem(4001337)) {
                var em = cm.getEventManager("Ghostbaby");
                // if (cm.getBossLog("鬼娃恰吉") >= 次数) {
                //      cm.sendOk("你已经达到了挑战次数，这样的话我就不能帮你解梦了，请稍后再试。");
                //      cm.dispose();
                //      return;
                // }
                // java.lang.System.out.println("xx");
                if (em == null) {
                    cm.sendOk("當前副本有問題，請聯絡管理員....");
                    cm.dispose();
                } else {
                    var prop = em.getProperty("state");
                    if (prop == ("0") || prop == null) {
                        em.startInstance(cm.getPlayer());
                        cm.getPlayer().setBossLog("鬼娃恰吉");
                        cm.gainItem(4001337, -1);
                        cm.dispose();
                        return;
                    } else {
                        cm.sendOk("里面已经有人在挑战鬼娃恰吉了...");
                        cm.dispose();
                    }
                }
            } else {
                cm.sendOk("貌似沒有钥匙就不能做梦了！");
                cm.dispose();
            }
        }
    }
}

function generateSelectionMenu(array) { // nice tool for generating a string for the sendSimple functionality
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "#" + array[i] + "#l\r\n";
    }
    return menu;
}