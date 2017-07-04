package acord.services;

import acord.domain.Role;
import acord.persistence.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class RoleService {
    @Autowired
    RoleRepository repository;

    public void updateRole(Long id, Role role) {
        repository.save(role);
    }

    public Collection<Role> getAll() {
        return repository.findAll();
    }

    public Role save(Role role) {
        return repository.save(role);
    }

    public Role getById(Long id){
        return repository.findOne(id);
    }

    public void delete(Long id){
        repository.delete(id);
    }
}