package acord.domain;

import acord.domain.base_models.BaseModel;
import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ANSWERS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Answer extends BaseModel implements Serializable {

    @ManyToOne
    @JoinColumn(name = "Question_id", nullable = false)
    @JsonIgnore
    private Question question;

    @Column(nullable = false)
    private String textAnswer;

    @Column(nullable = false)
    private Boolean valueOfTruth;


    public Answer() {
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getTextAnswer() {
        return textAnswer;
    }

    public void setTextAnswer(String textAnswer) {
        this.textAnswer = textAnswer;
    }

    public Boolean getValueOfTruth() {
        return valueOfTruth;
    }

    public void setValueOfTruth(Boolean valueOfTruth) {
        this.valueOfTruth = valueOfTruth;
    }
}
