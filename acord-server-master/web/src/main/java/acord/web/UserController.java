package acord.web;

import acord.domain.User;
import acord.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
/*@PreAuthorize("hasAuthority('ADMIN')")*/
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addUser(@RequestBody User user){
        try {
            return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
        } catch (ConstraintViolationException e) {
            List<String> errors = e.getConstraintViolations().stream().map(violation ->
                    violation.getPropertyPath().toString() + ": " + violation.getMessage()
            ).collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        } catch (DataIntegrityViolationException e) {
            StringBuilder errors = new StringBuilder();
            for (Throwable t = e.getCause(); t != null; t = t.getCause()) {
                errors.append(t.getMessage());
            }
            String message = errors.toString();
            if (message.contains("Duplicate entry")) {
                int beginIndex = message.indexOf("Duplicate entry");
                int endIndex = message.indexOf("for key");
                return new ResponseEntity<>(message.substring(beginIndex, endIndex), HttpStatus.BAD_REQUEST);
            }
            throw e;
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public void updateUser(@RequestBody User articleType, @PathVariable Long id) throws Exception {
        userService.updateUser(id, articleType);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
