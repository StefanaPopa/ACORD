package acord.web;

import acord.domain.Event;
import acord.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@EnableGlobalMethodSecurity(prePostEnabled = true)
/*@PreAuthorize("hasAuthority('ADMIN')")*/
@RequestMapping("/events")
@CrossOrigin
public class EventController {

    @Autowired
    EventService eventService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Collection<Event>> getEvents() {
        return new ResponseEntity<>(eventService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Event> getEvent(@PathVariable long id) {
        Event Event = eventService.getById(id);
        if (Event != null)
            return new ResponseEntity<>(Event, HttpStatus.OK);
        return new ResponseEntity<>((Event) null, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Event> addEvent(@RequestBody Event Event) throws Exception {
        return new ResponseEntity<>(eventService.save(Event), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteEvent(@PathVariable long id) {
        eventService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public  ResponseEntity updateEvent(@RequestBody Event Event, @PathVariable Long id) throws Exception {
        eventService.save(Event);
        return new ResponseEntity(HttpStatus.OK);
    }
}
