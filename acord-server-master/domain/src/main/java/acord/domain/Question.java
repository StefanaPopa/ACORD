package acord.domain;

import acord.domain.base_models.BaseModel;
import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "QUESTIONS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Question extends BaseModel implements Serializable {

    @Column(nullable = false)
    String QuestionText;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "Lesson_id", nullable = false)
    private Lesson lesson;

    @Column(nullable = false)
    private int score = 1;

    @Transient
    @JsonProperty
    private List<Answer> answers;

    public Question() {
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public String getQuestionText() {
        return QuestionText;
    }

    public void setQuestionText(String questionText) {
        QuestionText = questionText;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }
}
