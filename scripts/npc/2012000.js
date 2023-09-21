var ticket = new Array(4031047, 4031074, 4031331, 4031576);
var cost = new Array(5000, 6000, 30000, 6000, 1000, 1500);
var mapNames = new Array("金银岛", "玩具城", "神木村", "阿里安特");
var mapName2 = new Array("金银岛", "玩具城", "神木村", "阿里安特");
var select;
var status = 0;

function start() {
    var where = "我负责给来往的游客介绍去往各个地区的船。你要去哪个地区？";
    for (var i = 0; i < ticket.length; i++)
        where += "\r\n#L" + i + "##b" + mapNames[i] + "#k#l";
    cm.sendSimple(where);
}

function action(mode, type, selection) {
    if(mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            select = selection;
            cm.sendYesNo("你想到#b" + mapName2[select] + "#k去吗？这里有开往#b" + mapName2[select] + "#k的单人船随时待命，需要" + (select == 0 ? 15 : 10) + "分钟，会花费你#b"+cost[select]+"金币#k。你要购买#b#t"+ticket[select]+"##k吗？马上就可以送你过去。");
        } else if(status == 2) {
            if (cm.getMeso() < cost[select] || !cm.canHold(ticket[select]))
                cm.sendOk("你确定你有#b"+cost[select]+"金币#k? 如果有的话，我劝您检查下身上其他栏位看是否有没有满了.");
            else {
                cm.gainMeso(-cost[select]);
                cm.gainItem(ticket[select],1);
            }
            cm.dispose();
        }
    }
}
