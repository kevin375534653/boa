/* Author: Xterminator
	NPC Name: 		???
	Map(s): 		Maple Road : ???? (1010000)
	Description: 		Talks about Amherst
*/
function start() {
    status = -1;

    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			// cm.openWeb("mxd.sdo.com");
		cm.dispose();
		}
	}
}