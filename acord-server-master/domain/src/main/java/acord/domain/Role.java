package acord.domain;


import acord.domain.base_models.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "ROLES")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Role extends BaseModel implements Serializable {

    @Column(unique = true, nullable = false)
    @Size(min = 3, max = 30, message = "Role name must have between 3 and 30 characters")
    String name;

    Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}