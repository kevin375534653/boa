/**
----------------------------------------------------------------------------------
	Whale Between Lith harbor and Rien.

	1200003 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("明珠港");
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
			cm.sendNext("如果你改变主意，请告诉我.");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
			for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b前往明珠港(800金币)#k";
                        }			
                        cm.sendSimple("你想离开里恩岛了吗？坐这艘船，可以到达金银岛的明珠港。费用是800金币。到那儿大约需要一分钟。\r\n"+display);
			
                } else if(status == 1) {
                        if(cm.getMeso() < 800) {
                                cm.sendNext("嗯......#b800金币#k，请再确认一下是否有钱。没钱可没法送你去。");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-800);
                                cm.warp(200090070);
                                cm.dispose();
                        }
				
                }
        }
}