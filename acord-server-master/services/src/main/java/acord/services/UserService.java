package acord.services;


import acord.domain.Role;
import acord.domain.User;
import acord.persistence.RoleRepository;
import acord.persistence.UserRepository;
import acord.services.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private RoleRepository roleRepository;

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public User save(User user) throws Exception{
        Role role = roleRepository.findByName(user.getRole().getName());
        user.setPassword(getPasswordEncoder().encode(user.getPassword()));
        if (role == null)
            roleRepository.save(user.getRole());
        else
            user.setRole(role);
        return repository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = repository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(user) {
        };
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<User>();
        repository.findAll().forEach(users::add);
        return users;
    }

    public User getUser(Long id) {
        return repository.findOne(id);
    }

    public User addUser(User user) throws Exception {
        return save(user);
    }

    public void updateUser(Long id, User user) throws Exception {
        save(user);
    }

    public void deleteUser(Long id) {
        repository.delete(id);
    }
}