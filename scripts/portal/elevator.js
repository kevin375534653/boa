function enter(pi) {
    try {
        var elevator = pi.getEventManager("Elevator");
        if (elevator == null) {
            pi.getPlayer().dropMessage(5, "电梯正在维修中。");
        } else if (elevator.getProperty(pi.getMapId() == 222020100 ? ("goingUp") : ("goingDown")) === "false") {
            pi.playPortalSound();
            pi.warp(pi.getMapId() == 222020100 ? 222020110 : 222020210, 0);
            return true;
        } else if (elevator.getProperty(pi.getMapId() == 222020100 ? ("goingUp") : ("goingDown")) === "true") {
            pi.getPlayer().dropMessage(5, "电梯正在移动。");
        } else {
            pi.getPlayer().dropMessage(5, "Dafuq is happening?!");
        }
    } catch (e) {
        pi.getPlayer().dropMessage(5, "Error: " + e);
    }
    return false;
}