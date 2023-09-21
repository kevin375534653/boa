package client;


import java.util.Date;

/**师徒任务*/
public class MasterQuest {

    private int id;

    private int cid;

    private int type;

    private int itemid;

    private int modid;

    private int num;

    private String msg;

    private int stat;

    private String createTime;

    private int finshNum;

    private int exp;

    private int shituPoints;

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public int getShituPoints() {
        return shituPoints;
    }

    public void setShituPoints(int shituPoints) {
        this.shituPoints = shituPoints;
    }

    public int getFinshNum() {
        return finshNum;
    }

    public void setFinshNum(int finshNum) {
        this.finshNum = finshNum;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCid() {
        return cid;
    }

    public void setCid(int cid) {
        this.cid = cid;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getItemid() {
        return itemid;
    }

    public void setItemid(int itemid) {
        this.itemid = itemid;
    }

    public int getModid() {
        return modid;
    }

    public void setModid(int modid) {
        this.modid = modid;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getStat() {
        return stat;
    }

    public void setStat(int stat) {
        this.stat = stat;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
