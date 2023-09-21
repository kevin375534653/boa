function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if(cm.haveItem(4031454)){
            cm.gainItem(4031454,1);
            cm.gainItem(4031455,1);
            // cm.dispose();
        }


    }
}