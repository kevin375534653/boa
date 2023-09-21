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
                cm.sendGetText("门会对插入的进入通行证做出反应。 #b密码#k！");
	}
	else if(status == 1){
                if(cm.getText() == cm.getQuestProgress(3360)){
                        cm.setQuestProgress(3360, 1);
                        cm.getPlayer().announce(Packages.tools.MaplePacketCreator.playPortalSound());
                        cm.warp(261030000, "sp_" + ((cm.getMapId() == 261010000) ? "jenu" : "alca"));
                }
                else {
			cm.sendOk("#r错误...!");
		}
                
                cm.dispose();
	}
}