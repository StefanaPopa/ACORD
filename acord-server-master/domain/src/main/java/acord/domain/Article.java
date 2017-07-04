package acord.domain;

import acord.domain.types.ArticleType;
import acord.domain.base_models.BaseModel;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ARTICLES")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Article extends BaseModel implements Serializable {

    @ManyToMany(cascade = {CascadeType.MERGE})
    @JoinTable(name = "ARTICLE_TAGS",
            joinColumns = @JoinColumn(name = "article_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    public List<ArticleTag> tags;

    @Column
    int likeNumber = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private User author;

    @Column(unique = true, nullable = false)
    @Size(min = 4, max = 150, message = "Title must have between 4 and 150 characters")
    private String title;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Column(nullable = false)
    private String privacy;

    @Column(nullable = false, length = 100000)
    private String content;

    @Column(nullable = false)
    private String category;

    public Article() {
    }

    public Article(String title) {
        this.title = title;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(Long id) {
        this.author = new User();
        this.author.setId(id);
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setAuthorObject(User user) {
        this.author = user;
    }

    public String getPrivacy() {
        return privacy;
    }

    public void setPrivacy(String privacy) throws Exception {
        for (ArticleType type : ArticleType.values())
            if (type.toString().equals(privacy.toUpperCase())) {
                this.privacy = privacy;
                return;
            }
        throw new Exception("Level of privacy is not correct");
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

    public List<ArticleTag> getTags() {
        return tags;
    }

    public void setTags(List<ArticleTag> tags) {
        this.tags = tags;
    }

    public int getLikeNumber() {
        return likeNumber;
    }

    public void setLikeNumber(int likeNumber) {
        this.likeNumber = likeNumber;
    }
}
