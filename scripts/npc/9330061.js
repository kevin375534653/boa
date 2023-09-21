

var status = 0;
var ticketSelection = -1;
var text = "检票口";
var hasTicket = false;
var NLC = false;
var em;

function start() {
    cm.sendSimple("选择目的地：   \n\r\n#L0##b金银岛：废弃都市#l\n\r\n#L1##b福尔摩沙：101大道#l");
}

function action(mode, type, selection) {
    em = cm.getEventManager("Subway");

    if (mode == -1) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 1) {
        if (selection == 0) {
            var em = cm.getEventManager("z_tw");
            if (!em.startInstance(cm.getPlayer())) {
                cm.sendOk("地铁已经出发了，待会儿再来吧。");
            }
            cm.dispose();
            return;
        }else if (selection == 1) {
           cm.warp(742000104, 0);
           cm.dispose();
           return;
        }
    }
}