package acord.services;

import acord.domain.Lesson;
import acord.domain.Question;
import acord.persistence.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class LessonService {
    @Autowired
    LessonRepository repository;

    @Autowired
    QuestionService questionService;

    public void updateLesson(Long id, Lesson lesson) {
        save(lesson);
    }

    public Collection<Lesson> getAll() {
        return repository.findAll();
    }

    public Lesson save(Lesson lesson) {
        Lesson savedLesson = repository.save(lesson);
        for (Question question :lesson.getQuiz()) {
            question.setLesson(lesson);
            questionService.save(question);
        }
        return savedLesson;
    }

    public Lesson getById(Long id) {
        Lesson lesson = repository.findOne(id);
        lesson.setQuiz(questionService.getByLesson(lesson.getId()));
        return lesson;
    }

    public void delete(Long id) {
        for (Question question : questionService.getByLesson(id))
            questionService.delete(question.getId());
        repository.delete(id);
    }
}
