package acord.web;


import acord.domain.ArticleTag;
import acord.services.ArticleTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@EnableGlobalMethodSecurity(prePostEnabled = true)
/*@PreAuthorize("hasAuthority('ADMIN')")*/
@RequestMapping("/articleTags")
@CrossOrigin
public class ArticleTagController {

    @Autowired
    ArticleTagService articleTagService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Collection<ArticleTag>> getArticleTags() {
        return new ResponseEntity<>(articleTagService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArticleTag> getArticleTag(@PathVariable long id) {
        ArticleTag articleTag = articleTagService.getById(id);
        if (articleTag != null)
            return new ResponseEntity<>(articleTag, HttpStatus.OK);
        return new ResponseEntity<>((ArticleTag) null, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<ArticleTag> addArticleTag(@RequestBody ArticleTag articleTag) {
        return new ResponseEntity<>(articleTagService.save(articleTag), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteArticleTag(@PathVariable long id) {
        articleTagService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public  ResponseEntity updateArticleTag(@RequestBody ArticleTag articleTag, @PathVariable Long id) {
        articleTagService.save(articleTag);
        return new ResponseEntity(HttpStatus.OK);
    }
}
