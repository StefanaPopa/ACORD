package acord.services;

import acord.domain.Debate;
import acord.domain.Feedback;
import acord.persistence.DebateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class DebateService {

    @Autowired
    DebateRepository repository;

    @Autowired
    FeedbackService feedbackService;

    public Collection<Debate> getAll() {
        return repository.findAll();
    }

    public Debate save(Debate debate) {
        Debate savedDebate =  repository.save(debate);
        for (Feedback feedback : debate.getFeedbacks()) {
            feedback.setDebate(debate);
            feedbackService.save(feedback);
        }
        return savedDebate;
    }

    public Debate getById(Long id){
        Debate debate = repository.findOne(id);
        debate.setFeedbacks(feedbackService.findAllByDebateId(id));
        return debate;
    }

    public void delete(Long id){
        for (Feedback feedback : feedbackService.findAllByDebateId(id))
            feedbackService.delete(feedback.getId());
        repository.delete(id);
    }

    public List<Debate> getAllByAuthorId(Long id){
        return repository.findDebatesByAuthor_id(id);
    }
}