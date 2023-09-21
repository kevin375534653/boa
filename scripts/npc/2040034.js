/**
 * @author: Eric
 * @author: Ronan
 * @npc: Red Sign
 * @map: 101st Floor Eos Tower (221024500)
 * @func: Ludi PQ
*/

var status = 0;
var em = null;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                
                if (status == 0) {
                        em = cm.getEventManager("LudiPQ");
                        if(em == null) {
                                cm.sendOk("副本出现未知问题,无法工作.请联系管理员");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务：时间裂缝>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n从这里往上到处都是很危险的东西,你不能继续往上走了。你想和队员们一起齐心协力，完成任务吗？如果想挑战的话，就让#b队长#k跟我说话。#b\r\n#L0#我想参加组队任务。\r\n#L2#我想听听说明。");//\r\n#L1#" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用":"启用") + "组队搜索。
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("组队任务只有组成组队后才能参加。请和其他人组成组队之后再来挑战。");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("请让你的队长来跟我谈话。");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("已经有人在此频道进行任务。请尝试更换其他频道或等待他们完成任务。");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("你不能开始组队任务，可能你的队伍不在等级范围内，或者人数不足，或者他们不在这个地图。");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("您的队伍状态是：#b"+ (psState ? "启用":"禁用") +"#k。你什么时候想开始任务了就跟我说。");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<组队任务：时间裂缝>#k#n\r\n#b#m220000000##k出现了时空裂缝！如果想要阻止入侵这里的怪物，我们需要勇敢的冒险家的自发帮助。请和同伴们齐心协力，拯救玩具城吧！必须突破消灭怪物或解开谜题的各种难关，打败#r#o9300012##k。");
                                cm.dispose();
                        }
                }
        }
}