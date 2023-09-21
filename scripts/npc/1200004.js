/**
----------------------------------------------------------------------------------
	Whale Between Lith harbor and Rien.

	1200004 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Rien");
var method;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("嗯......不想去也没办法。哪里对人来而言是荒凉了些，但却是企鹅的天堂......");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
			for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b前往里恩(800 金币)#k";
                        }
                        cm.sendSimple("要离开金银岛去我们的村子吗？坐船可以送你到#b里恩#k......不过必须要花#b800#k金币买票才行。去里恩吗？只要1分钟就到了。\r\n"+display);
			
                } else if(status == 1) {
                        if(cm.getMeso() < 800) {
                                cm.sendNext("嗯......#b800#k金币你真有吗？请确认一下钱是否足够。不然是无法坐船的。");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-800); 
                                cm.warp(200090060);
                                cm.dispose();
                        }
                }
        }
}