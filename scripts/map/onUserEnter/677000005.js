function start(ms) {
    const Point = Java.type('java.awt.Point');
    var pos = new Point(201, 80);
    var mobId = 9400609;
    var mobName = "印第安老斑鸠";

    var player = ms.getPlayer();
    var map = player.getMap();

    if (map.getMonsterById(mobId) != null) {
        return;
    }

    const LifeFactory = Java.type('server.life.LifeFactory');
    map.spawnMonsterOnGroundBelow(LifeFactory.getMonster(mobId), pos);
    player.message(mobName + "出现了！");
}