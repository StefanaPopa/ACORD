package acord.web;

import acord.domain.Feedback;
import acord.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collection;

@EnableGlobalMethodSecurity(prePostEnabled = true)
/*@PreAuthorize("hasAuthority('ADMIN')")*/
@RequestMapping("/feedback")
@CrossOrigin
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @RequestMapping(method = RequestMethod.GET, params = {"receiver"})
    public ResponseEntity<Collection<Feedback>> getDebatesByAuthor(@RequestParam("receiver") Long receiver) {
        return new ResponseEntity<>(feedbackService.findAllByReceiverId(receiver), HttpStatus.OK);
    }
}