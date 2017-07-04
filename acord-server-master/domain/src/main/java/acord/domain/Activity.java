package acord.domain;


import acord.domain.composite_keys.ActivityKey;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ACTIVITY")
public class Activity implements Serializable {

    @EmbeddedId
    ActivityKey id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private User author;


    public Activity() {
    }

    public Activity(long activity_id, String type, User author) {
        this.id = new ActivityKey(activity_id, type);
        this.author = author;
    }

    public Activity(User authorId) {
        this.author = authorId;
    }

    public User getAuthorId() {
        return author;
    }

    public void setAuthorId(User author) {
        this.author = author;
    }

    public ActivityKey getId() {
        return id;
    }

    public void setId(long activity_id, String type) {
        this.id = new ActivityKey(activity_id, type);
    }
}
