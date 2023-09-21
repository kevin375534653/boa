package client;

/**师徒系统*/
public class Master {

    /**宗门id*/
    private int id;

    /**角色id*/
    private int cid;

    /**宗门名字*/
    private String name;

    /**师徒点*/
    private int schoolPoints;


    /**建立时间*/
    private Long time;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSchoolPoints() {
        return schoolPoints;
    }

    public void setSchoolPoints(int schoolPoints) {
        this.schoolPoints = schoolPoints;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }
}
