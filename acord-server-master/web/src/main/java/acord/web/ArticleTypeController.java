package acord.web;

import acord.domain.types.ArticleType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Collection;

@RestController
@EnableGlobalMethodSecurity(prePostEnabled = true)
/*@PreAuthorize("hasAuthority('ADMIN')")*/
@RequestMapping("/articleTypes")
@CrossOrigin
public class ArticleTypeController {
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Collection<ArticleType>> getArticleTypes() {
        return new ResponseEntity<Collection<ArticleType>>(Arrays.asList(ArticleType.values()), HttpStatus.OK);
    }
}
