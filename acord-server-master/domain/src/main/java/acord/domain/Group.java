package acord.domain;

import acord.domain.base_models.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Entity
@Table(name = "GROUPS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Group extends BaseModel implements Serializable {
    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(name = "USER_GROUPS",
            joinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    public List<User> members;
    @Column
    String name;

    public Group() {
    }

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
