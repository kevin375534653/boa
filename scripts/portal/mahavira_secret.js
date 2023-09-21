/*
  少林寺
*/
function enter(pi) {
    if(pi.isQuestCompleted(8530)) {
    pi.playPortalSound(); 
    pi.warp(702100000, 0);
    return true;
    }
}