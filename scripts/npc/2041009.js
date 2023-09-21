/* Mini
	Ludibrium Random Hair/Hair Color Change.
*/
var status = -1;
var beauty = 0;
var hair_Colo_new;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	cm.sendSimple("我是协助店长的美发店助手。要是你有#b#t5150006##k或#b#t5151006##k，就在我这里更换发型吧？\r\n#L0#使用#b#i5150006##t5150006##k\r\n#L1#使用#b#i5151006##t5151006##l#k");
    } else if (status == 1) {
	if (selection == 0) {
	    var hair = cm.getPlayerStat("HAIR");
	    hair_Colo_new = [];
	    beauty = 1;

	    if (cm.getPlayerStat("GENDER") == 0) {
		hair_Colo_new = [30250, 30190, 30150, 30050, 30280, 30240, 30300, 30160, 30650, 30540, 30640, 30680];
	    } else {
		hair_Colo_new = [31150, 31280, 31160, 31120, 31290, 31270, 31030, 31230, 31010, 31640, 31540, 31680, 31600];
	    }
	    for (var i = 0; i < hair_Colo_new.length; i++) {
		hair_Colo_new[i] = hair_Colo_new[i] + (hair % 10);
	    }
	    cm.sendYesNo("使用普通理发券可以随机更换发型。你确定要使用#b#t5150006##k更换发型吗？");
	} else if (selection == 1) {
	    var currenthaircolo = Math.floor((cm.getPlayerStat("HAIR") / 10)) * 10;
	    hair_Colo_new = [];
	    beauty = 2;

	    for (var i = 0; i < 8; i++) {
		hair_Colo_new[i] = currenthaircolo + i;
	    }
	    cm.sendYesNo("如果使用普通染色券，会随机更换头发颜色。你真的想使用#b#t5151006##k，更换头发颜色吗？");
	}
    } else if (status == 2){
	if (beauty == 1){
	    if (cm.setRandomAvatar(5150006, hair_Colo_new) == 1) {
		cm.sendOk("享受!");
	    } else {
		cm.sendOk("呃......你是不是没带我们美发店的专用理发券啊？很抱歉，没有理发券的话，我不能给你做头发");
	    }
	} else {
	    if (cm.setRandomAvatar(5151006, hair_Colo_new) == 1) {
		cm.sendOk("享受!");
	    } else {
		cm.sendOk("呃......你是不是没带我们美发店的专用染色卡啊。很抱歉，没有染色卡的话，我不能给你染色");
	    }
	}
	cm.dispose();
    }
}