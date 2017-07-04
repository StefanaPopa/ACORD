package acord.domain;

import acord.domain.base_models.BaseModel;
import acord.domain.types.ArticleCategories;
import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "LESSONS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Lesson extends BaseModel implements Serializable {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Author_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private User author;

    @Column(unique = true, nullable = false)
    @Size(min = 4, max = 150, message = "Title must have between 4 and 150 characters")
    private String title;

    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date creationDate;

    @Transient
    @JsonProperty
    private List<Question> quiz;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String content;

    public Lesson() {
    }

    public Lesson(String title) {
        this.title = title;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(Long id) {
        this.author = new User();
        this.author.setId(id);
    }

    public void setAuthorObject(User user) {
        this.author = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) throws Exception {
        for (ArticleCategories categoryType : ArticleCategories.values())
            if (categoryType.toString().equals(category.toUpperCase())) {
                this.category = category;
                return;
            }
        throw new Exception("The category type you are trying to set is not tracked");
    }

    public List<Question> getQuiz() {
        return quiz;
    }

    public void setQuiz(List<Question> questions) {
        this.quiz = questions;
    }
}

