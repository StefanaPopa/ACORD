package acord.domain;

import acord.domain.base_models.BaseModel;
import acord.domain.types.EventType;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "EVENTS")
public class Event extends BaseModel implements Serializable {
    @Column(nullable = false)
    @Size(min = 4, max = 150, message = "Name must have between 4 and 150 characters")
    String name;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(
            name="EVENT_PARTICIPANTS",
            joinColumns = @JoinColumn( name="activity_id"),
            inverseJoinColumns = @JoinColumn( name="user_id")
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<User> participants;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Article description;

    @Column(nullable = false)
    private String eventType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private User author;

    @Transient
    private String activityType = "EVENT";

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    @Transient
    private EventType eventTypes;

    public Event(String name, List<User> participants, String eventType, User author) {
        this.name = name;
        this.participants = participants;
        this.eventType = eventType;
        this.setAuthor(author);
    }

    public Event() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<User> getParticipants() {
        return participants;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }

    public Article getDescription() {
        return description;
    }

    public void setDescription(Article description) {
        this.description = description;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) throws Exception {
        for (EventType event : EventType.values())
            if (event.toString() == eventType) {
                this.eventType = eventType;
                return;
            }
        throw new Exception("Event type doesn't exist");
    }

    public EventType getEventTypes() {
        return eventTypes;
    }

    public String getActivityType() {
        return activityType;
    }

}
