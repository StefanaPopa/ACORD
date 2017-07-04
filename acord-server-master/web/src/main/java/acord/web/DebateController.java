package acord.web;

import acord.domain.Debate;
import acord.services.DebateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@EnableGlobalMethodSecurity(prePostEnabled = true)
/*@PreAuthorize("hasAuthority('ADMIN')")*/
@RequestMapping("/debates")
@CrossOrigin
public class DebateController {

    @Autowired
    DebateService debateService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Collection<Debate>> getDebates() {
        return new ResponseEntity<>(debateService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"author"})
    public ResponseEntity<Collection<Debate>> getDebatesByAuthor(@RequestParam("author") Long author) {
        return new ResponseEntity<>(debateService.getAllByAuthorId(author), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Debate> getDebate(@PathVariable long id) {
        Debate Debate = debateService.getById(id);
        if (Debate != null)
            return new ResponseEntity<>(Debate, HttpStatus.OK);
        return new ResponseEntity<>((Debate) null, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Debate> addDebate(@RequestBody Debate Debate) throws Exception {
        return new ResponseEntity<>(debateService.save(Debate), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteDebate(@PathVariable long id) {
        debateService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public  ResponseEntity updateDebate(@RequestBody Debate Debate, @PathVariable Long id) throws Exception {
        debateService.save(Debate);
        return new ResponseEntity(HttpStatus.OK);
    }
}