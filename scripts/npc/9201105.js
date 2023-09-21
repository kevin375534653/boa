/**
 *9201105 - Sage
 *@author Ronan
 */

function start() {
    if (cm.getMapId() == 610020005) {
        cm.sendOk("绯红巢穴就在前面，现在你已经获得了伟大的成就，向你致敬。穿过这片区域进入要塞的大门。");
    } else {
        cm.sendOk("到目前为止，你的进步非常出色，干得好。然而，为了坚持下去，你必须面对并完成这场考验，继续。");
    }
    cm.dispose();
}
