/* 
 *  NPC     Naosuke
 *  Maps ;  Ninja Castle Hallway
 *
 */
var status = -1

function start() {
    cm.sendNext("哇！你是谁？！");
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++
    } else {
	if (status == 0) {
	    cm.sendOk("…..看到了吗？前方是一条险恶的道路，如果我是你，我会转身离开。");
	}
	cm.dispose();
	return;
    }
    if (status == 0) {
	cm.sendYesNo("什么？你想继续吗？你是说你知道里面发生了什么？");
    } else if (status == 1) {
	cm.sendNext("好的，如果你知道里面的真实情况，那么我不会阻止你。希望你去打败那些家伙！")
    } else if (status == 2) {
	cm.warp(800040300, 0);
	cm.dispose();
    }
}