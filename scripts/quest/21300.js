var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if (mode != 1) {
        //if (mode == 0)
        qm.sendNext("#b(你需要考虑一下。。。)#k");
        qm.dispose();
        return;
    }

    if (status == 0) {
        qm.sendNext("修炼得如何？嗯……60级了……虽然还不够，不过比起当初把你刚从冰窟里挖出来的那个状态要强百倍了。像这样下去，很快你就能恢复从前的实力了。");
    } else if (status == 1) {
        qm.sendAcceptDecline("不过，你得先回#b#m140000000##k一趟。你的#b#p1201001##k又出现了奇怪的反应。似乎是有什么话要对你说。说不定能唤醒你的能力也说不定，赶紧回去一趟吧。");
    } else if (status == 2) {
        qm.forceStartQuest();
        qm.sendOk("不管怎样，拥有意识的武器还是很厉害的，某个方面来看，那家伙有种很神圣的感觉。如果不听它的，它就会呜呜哭……啊，这种话可一定要对长矛保密。我可不想让它吵得更凶。");
    } else if (status == 3) {
        qm.dispose();
    }
}