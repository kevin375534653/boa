var fromWitch = false;
function start() {
    if (cm.getMapId() == 980040000) {
        fromWitch = true;
        cm.sendSimple('#b（嗯...怎么说呢，如果你不小心碰到了下面的巧克力，你就会失败被传送出来。）#k啊！！你是谁啊？是哪只猫告诉你在这里可以找到宝藏？哼，好吧。既然来了，就挑战一下吧，你想挑战哪个难度呢？....\r\n\r\n#b#L0# #v03994115##l #L1# #v03994116##l #L2# #v03994117##l');
    } else {
        cm.sendSimple('Hey who are you? Are you...one of those Ninjas looking to steal some treasures from here? \r\n #L0##bTreasures?#l \r\n #L1##b(Secretly) Head over to Witch Tower#k#l');
    }
}
function action(f, c, b) {
    if (!fromWitch) {
        switch (b) {
        case 0:
            cm.sendOk('T...treasures? Who...who said that? Do you think I\'d tell you that the Pink Bean Hat made by the witch with Pink Bean that looks like this #v01002971:# can be obtained after clearing normal or hard mode 5 times, and Pink Bean Suit looks like this #v01052202:# can be obtained after getting Pink Bean Hat and go to grave yard through portal in the top right of Witch Tower Entrance? As if!..');
            break;
        case 1:
            cm.warp(980040000, 0);
            break;
        }
    } else {
        switch (b) {
        case 0:
            var d = cm.getEventManager('WitchTower_EASY');
            d.newInstance(cm.getName()).registerPlayer(cm.getPlayer());
            break;
			cm.dispose();
			return;
        case 1:
            var e = cm.getEventManager('魔女塔_普通');
            e.newInstance(cm.getName()).registerPlayer(cm.getPlayer());
            break;
			cm.dispose();
			return;
        case 2:
            var a = cm.getEventManager('魔女塔_困难');
            a.newInstance(cm.getName()).registerPlayer(cm.getPlayer());
            break;
			cm.dispose();
			return;
        }
    }
    cm.dispose();
}
var status = -1;