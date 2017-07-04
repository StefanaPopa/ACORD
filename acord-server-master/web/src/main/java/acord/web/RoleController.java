package acord.web;

import acord.domain.Role;
import acord.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
/*@PreAuthorize("hasAuthority('ADMIN')")*/
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequestMapping("/roles")
@CrossOrigin
public class RoleController {

    @Autowired
    RoleService roleService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Collection<Role>> getRoles() {
        return new ResponseEntity<>(roleService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Role> getRole(@PathVariable long id) {
        Role role = roleService.getById(id);
        if (role != null)
            return new ResponseEntity<>(role, HttpStatus.OK);
        return new ResponseEntity<>(role, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addRole(@RequestBody Role role) {
        return new ResponseEntity<>(roleService.save(role), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteRole(@PathVariable long id) {
        roleService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public void updateRole(@RequestBody Role role, @PathVariable Long id) {
        roleService.updateRole(id, role);
    }
}
