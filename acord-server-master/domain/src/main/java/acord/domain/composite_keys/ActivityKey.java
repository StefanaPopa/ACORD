package acord.domain.composite_keys;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class ActivityKey implements Serializable {
    @Column(nullable = false)
    private long activity_id;

    @Column(nullable = false)
    private String type;

    public ActivityKey(long activity_id, String type) {
        this.activity_id = activity_id;
        this.type = type;
    }

    public ActivityKey() {
    }

    public long getActivity_id() {
        return activity_id;
    }

    public void setActivity_id(long activity_id) {
        this.activity_id = activity_id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
