/*
	NPC Name: 		Cai Shen
	Map(s): 		Everywhere, towns
	Description: 		Introduction to Gachapon
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
	cm.sendNext("扭蛋机现已准备就绪。 设置在不同城镇的每台机器都会给出不同的物品。");
    } else if (status == 1) {
	cm.sendPrev("您甚至可能会获得很难找到的物品。 扭蛋券可在商城购买。 你想尝试一下吗？");
    } else if (status == 2) {
	cm.dispose();
    }
}