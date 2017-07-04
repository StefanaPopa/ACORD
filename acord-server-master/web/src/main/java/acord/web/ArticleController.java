package acord.web;

import acord.domain.Article;
import acord.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/articles")
/*@PreAuthorize("hasAuthority('ADMIN')")*/
@CrossOrigin
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ArticleController {

    @Autowired
    ArticleService articleService;

    /*    @PreAuthorize("hasAnyAuthority('ADMIN', 'DEBATER')")*/
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Collection<Article>> getArticles() {
        return new ResponseEntity<>(articleService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Article> getArticle(@PathVariable long id) {
        Article article = articleService.getById(id);
        if (article != null) {
            return new ResponseEntity<>(article, HttpStatus.OK);
        }
        return new ResponseEntity<>(article, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Article> addArticle(@RequestBody Article article) throws Exception {
        return new ResponseEntity<>(articleService.save(article), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteArticle(@PathVariable long id) {
        articleService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public ResponseEntity<Article> updateArticle(@RequestBody Article article, @PathVariable Long id) throws Exception {
        return new ResponseEntity<>(articleService.save(article), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"title"})
    public ResponseEntity<Collection<Article>> findByTitleContaining(@RequestParam("title") String title) {
        return new ResponseEntity<>(articleService.findByTitleContaining(title), HttpStatus.OK);
    }
}
