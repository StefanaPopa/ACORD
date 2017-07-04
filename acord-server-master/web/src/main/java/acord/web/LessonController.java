package acord.web;

import acord.domain.Lesson;
import acord.services.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@EnableGlobalMethodSecurity(prePostEnabled = true)
/*@PreAuthorize("hasAuthority('ADMIN')")*/
@RequestMapping("/lessons")
@CrossOrigin
public class LessonController {

    @Autowired
    LessonService lessonService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Collection<Lesson>> getLessons() {
        return new ResponseEntity<>(lessonService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Lesson> getLesson(@PathVariable long id) {
        Lesson lesson = lessonService.getById(id);
        if (lesson != null)
            return new ResponseEntity<>(lesson, HttpStatus.OK);
        return new ResponseEntity<>((Lesson) null, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Lesson> addLesson(@RequestBody Lesson Lesson) throws Exception {
        return new ResponseEntity<>(lessonService.save(Lesson), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteLesson(@PathVariable long id) {
        lessonService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public ResponseEntity updateLesson(@RequestBody Lesson Lesson,
                                       @PathVariable Long id) throws Exception {
        lessonService.save(Lesson);
        return new ResponseEntity(HttpStatus.OK);
    }
}
