package acord.services;

import acord.domain.Answer;
import acord.domain.Question;
import acord.persistence.AnswerRepository;
import acord.persistence.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository repository;

    @Autowired
    AnswerRepository answerRepository;

    public void updateQuestion(Long id, Question question) {
        repository.save(question);
    }

    public Collection<Question> getAll() {
        return repository.findAll();
    }

    public Question save(Question question) {
        Question savedQuestion = repository.save(question);
        for (Answer answer : question.getAnswers()) {
            answer.setQuestion(question);
            answerRepository.save(answer);
        }
        return savedQuestion;
    }

    public Question getById(Long id) {
        return repository.findOne(id);
    }

    public List<Question> getByLesson(long id) {
        List<Question> questions = repository.findByLesson_id(id);
        for (Question question : questions)
            question.setAnswers(answerRepository.findByQuestion_id(question.getId()));
        return questions;
    }

    public void delete(Long id) {
        for (Answer answer : answerRepository.findByQuestion_id(id))
            answerRepository.delete(answer.getId());
        repository.delete(id);
    }


}
