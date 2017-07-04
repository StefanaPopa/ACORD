package acord.domain;

import acord.domain.composite_keys.UserExperienceKey;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "USERS_EXPERIENCE")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserExperience implements Serializable {

    @EmbeddedId
    UserExperienceKey id;

    @Column(nullable = false)
    int experiencePoints = 0;

    public UserExperience() {
    }

    public UserExperience(User user, String type, int experiencePoints) {
        this.id = new UserExperienceKey(user, type);
        this.experiencePoints = experiencePoints;
    }

    public UserExperienceKey getId() {
        return id;
    }

    public void setId(User user, String type) {
        this.id = new UserExperienceKey(user, type);
    }

    public int getExperiencePoints() {
        return experiencePoints;
    }

    public void setExperiencePoints(int experiencePoints) {
        this.experiencePoints = experiencePoints;
    }
}
