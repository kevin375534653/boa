/* 
	韵 自由市场进入钓鱼的NPC
*/

var status = -1;
var sel;

function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
    if (status == 0) {
        cm.sendSimple("你想去哪里钓鱼呢？\r\n#b#L0# 外层空间钓鱼场#l\r\n#L1# 梦幻王国钓鱼场\r\n#b#L2# 精灵钓鱼场#l#k");
    } else if (status == 1) {
        if (selection <= 2 && selection >= 0) {
            if (cm.getPlayer().getMapId() < 749050500 || cm.getPlayer().getMapId() > 749050502) {
                cm.getPlayer().saveLocation("FREE_DIAOYU");
            }
            cm.warp(749050500 + selection);
        }
        cm.dispose();
    }
}
}
