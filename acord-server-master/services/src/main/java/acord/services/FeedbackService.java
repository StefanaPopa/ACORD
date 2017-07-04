package acord.services;

import acord.domain.Feedback;
import acord.persistence.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    FeedbackRepository repository;

    public void updateFeedback(Long id, Feedback feedback) {
        repository.save(feedback);
    }

    public Collection<Feedback> getAll() {
        return repository.findAll();
    }

    public Feedback save(Feedback feedback) {
        return repository.save(feedback);
    }

    public Feedback getById(Long id){
        return repository.findOne(id);
    }

    public void delete(Long id){
        repository.delete(id);
    }

    public List<Feedback> findAllByDebateId(Long id){
        return  repository.findByDebate_id(id);
    }

    public List<Feedback> findAllByReceiverId(Long id) {
        return repository.findByReceiver_id(id);
    }
}