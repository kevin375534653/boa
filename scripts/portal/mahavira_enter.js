/*
  少林寺
*/
function enter(pi) {
    if(pi.isQuestCompleted(8530)) {
        pi.playPortalSound(); pi.warp(702100000, "in00");
        return true;
    } else {
        pi.message("此地区因为有地气阻挡，无法移动。");
        return false;
    }
}