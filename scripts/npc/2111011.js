// NPC - Wall
// Location: Magatia - Home of the Missing Alchemist
// Used to handle quest 3311 - Clue

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (!cm.isQuestStarted(3311)) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            //Amidst the throng of spider webs, there's a wall behind it that seems to have something written on it. Perhaps you should take a closer look at the wall?
            cm.sendYesNo("看到了乱糟糟的桌子。可能已经有很多人调查过了，有很多手印。仔细搜了一下周边，没发现什么特别的。");
        }
        else if (status == 1) {
            cm.setQuestProgress(3311, 5);
            //On a wall full of graffiti, there seems to be a phrase that really stands out above the rest. #bIt's in a form of a pendant...#k What does that mean?
            cm.sendOk("透过观察墙壁，发现蜘蛛网好像可以看到一些字迹……#b它是一种坠饰形态#k...是什么意思呢？");
        }
        else {
            cm.dispose();
        }
    }
}