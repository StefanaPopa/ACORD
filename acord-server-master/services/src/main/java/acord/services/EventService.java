package acord.services;

import acord.domain.Activity;
import acord.domain.Event;
import acord.persistence.ActivityRepository;
import acord.persistence.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class EventService {
    @Autowired
    EventRepository repository;

    @Autowired
    ActivityRepository activityRepository;

    public void updateEvent(Long id, Event event) {
        repository.save(event);
    }

    public Collection<Event> getAll() {
        return repository.findAll();
    }

    public Event save(Event event) throws Exception {
        event = repository.save(event);
        if (event != null) {
            Activity activity = new Activity(event.getId(), event.getActivityType(), event.getAuthor());
            if (activityRepository.save(activity) == null) {
                repository.delete(event);
                throw new Exception("Activity could not be created");
            }
        }
        return event;
    }

    public Event getById(Long id){
        return repository.findOne(id);
    }

    public void delete(Long id){
        repository.delete(id);
    }
}
