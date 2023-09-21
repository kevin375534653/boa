// function enter() {
//     if (pi.haveItem(4001094)) {
//         pi.getMap().getReactorByName('dragonBaby').hitReactor(pi.getClient());
//         pi.getMap().getReactorByName('dragonBaby2').hitReactor(pi.getClient());
//         pi.playerMessage(5, '九灵龙的蛋，舒舒服服的发了一道神秘的光，现在已经回到巢里。');
//         pi.gainItem(4001094, -1);
//     }
// }

function enter(pi) {
    var player = pi.getPlayer();
    //if (player.haveItem(4001094) && pi.isQuestStarted(100203)) {
    if (player.haveItem(4001094) && pi.isQuestStarted(3706)) {
        pi.spawnNpc(2081008, pi.getMap().getReactorById(2406000).getPosition(), pi.getMap());
        player.dropMessage(5, "九灵龙的蛋，舒舒服服的发了一道神秘的光，现在已经回到巢里。");
        pi.gainItem(4001094, -1);
    }
    return false;
}