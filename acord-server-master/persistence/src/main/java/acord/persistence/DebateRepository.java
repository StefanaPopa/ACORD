package acord.persistence;

import acord.domain.Debate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DebateRepository extends JpaRepository<Debate, Long> {
    List<Debate> findAll();
    List<Debate> findDebatesByAuthor_id(long id);
}
