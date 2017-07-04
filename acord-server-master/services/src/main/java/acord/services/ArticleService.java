package acord.services;

import acord.domain.Article;
import acord.domain.ArticleTag;
import acord.persistence.ArticleRepository;
import acord.persistence.ArticleTagRepository;
import acord.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.ListIterator;

@Service
public class ArticleService {

    @Autowired
    ArticleRepository repository;

    @Autowired
    ArticleTagRepository tagRepository;

    @Autowired
    UserRepository userRepository;

    public Collection<Article> getAll() {
        return repository.findAllByOrderByCreationDateDesc();
    }

    public Article save(Article article) throws Exception {
        ListIterator<ArticleTag> tags = article.getTags().listIterator();
        while (tags.hasNext()) {
            ArticleTag tag = tags.next();
            ArticleTag repoTag = tagRepository.findByName(tag.getName());
            if (repoTag == null)
                tagRepository.save(tag);
            else
                tags.set(repoTag);
        }
        if (userRepository.findOne(article.getAuthor().getId())== null)
            throw new Exception("Author doesn't exist.");
        else
            article.setAuthorObject(userRepository.findOne(article.getAuthor().getId()));
        return repository.save(article);
    }

    public Article getById(Long id) {
        return repository.findOne(id);
    }

    public void delete(Long id) {
        repository.delete(id);
    }

    public Collection<Article> findByTitleContaining(String title) {
        return repository.findByTitleContaining(title);
    }

}
