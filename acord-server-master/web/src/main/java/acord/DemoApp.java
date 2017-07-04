package acord;


import acord.domain.Event;
import acord.domain.Role;
import acord.domain.User;
import acord.persistence.UserRepository;
import acord.services.EventService;
import acord.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"acord"})
@EntityScan(basePackages = {"acord"})
@ComponentScan(basePackages = {"acord"})

public class DemoApp {

    public static void main(String[] args) {
        SpringApplication.run(DemoApp.class, args);
    }

    @Autowired
    public void authenticationManager(UserRepository repository, UserService service, EventService event) throws Exception {
        if (repository.count() == 0) {
            User user = new User("stef", "pass", "Stefana", "Pop", new Role("ADMIN"));
            service.save(user);
            User user2 = new User("test", "pass", "Stefana", "Pop", new Role("DEBATER"));
            service.save(user2);
            List<User> users = new ArrayList<>();
            users.add(user);
            users.add(user2);
            event.save(new Event("party", users, "COMPETITION", user));
            event.save(new Event("party2", users, "MEETING", user2));
        }
    }
}
