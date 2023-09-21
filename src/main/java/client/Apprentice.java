package client;


/**徒弟*/
public class Apprentice {

    /**徒弟角色id*/
    private int id;

    /**师傅id*/
    private int masterId;

    /**产出师徒点*/
    private int schoolPoints;


    /**入门时间*/
    private long time;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMasterId() {
        return masterId;
    }

    public void setMasterId(int masterId) {
        this.masterId = masterId;
    }

    public int getSchoolPoints() {
        return schoolPoints;
    }

    public void setSchoolPoints(int schoolPoints) {
        this.schoolPoints = schoolPoints;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }
}
