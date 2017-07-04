package acord.services;

import acord.domain.ArticleTag;
import acord.persistence.ArticleTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class ArticleTagService {
    
    @Autowired
    ArticleTagRepository repository;

    public Collection<ArticleTag> getAll() {
        return repository.findAll();
    }

    public ArticleTag save(ArticleTag article) {
        return repository.save(article);
    }

    public ArticleTag getById(Long id){
        return repository.findOne(id);
    }

    public void delete(Long id){
        repository.delete(id);
    }
}
