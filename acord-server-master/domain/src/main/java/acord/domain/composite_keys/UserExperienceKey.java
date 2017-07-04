package acord.domain.composite_keys;


import acord.domain.User;
import acord.domain.types.ExperienceType;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class UserExperienceKey implements Serializable {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private User user;

    @Column(nullable = false)
    private String type;

    public UserExperienceKey(User user, String type) {
        this.user = user;
        this.type = type;
    }

    public UserExperienceKey() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getType() {
        return type;
    }

    public void setType(String experience) throws Exception {
        for (ExperienceType type : ExperienceType.values())
            if (type.toString().equals(experience.toUpperCase())) {
                this.type = experience;
                return;
            }
        throw new Exception("Experience type is not correct");
    }
}