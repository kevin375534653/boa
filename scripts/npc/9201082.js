var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        cm.sendOk("嘿，你好。我叫斯宾德尔，专门修理坏掉的东西，做出新的东西。你有什么需要？没有的话，我先去忙了……");
                        cm.dispose();
                }
        }
}