/*
   NPC Name: 		Divine Bird
   Map(s): 		Erev
   Description: 		3rd job KoC Buff
*/

function start() {
    const GameConstants = Java.type('constants.game.GameConstants');
    if (cm.getPlayer().isCygnus() && GameConstants.getJobBranch(cm.getJob()) > 2) {
        cm.useItem(2022458);
        cm.sendOk("让我祝福你，希望你为了冒险岛世界变得更强……");
    } else {
        cm.sendOk("别停止训练。你的每一份精力都是用来保护冒险岛世界的…");
    }

    cm.dispose();
}