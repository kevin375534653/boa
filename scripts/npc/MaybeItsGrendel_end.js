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
		cm.sendNext("...一个黑色的影子出来袭击你了？ 这怎么会发生在#b#p1032001##k的家里？ 这听起来像是一个大阴谋...");
	}
	else if(status == 1){
		cm.sendNextPrev("我得在心里把这一切都解决掉。 等会儿跟我聊聊吧。");
	}
	else if(status == 2){
		cm.dispose();
	}
}