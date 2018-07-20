import {Component, OnInit} from '@angular/core';
import {Article} from '../article';
import {ArticleService} from '../article.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {filter, map, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {
  article: Article;
  constructor(private articleService: ArticleService,
              private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
    // OLD SCHOOL VERSION pas bon car subscribe dans subscribe
    // this.route.queryParamMap.subscribe(
    //   (paramMap: ParamMap) => {
    //     if (paramMap.has('id')) {
    //       const id: number = parseInt(paramMap.get('id'));
    //       this.articleService.read(id).subscribe((article) =>
    //       this.article = article);
    //     } else {
    //       this.article = undefined;
    //     }
    //   }
    // );
    // soucrire aux routes sans id pour réinitialiser en mode création
    this.route.queryParamMap.pipe(filter((paramMap) => !paramMap.has('id')))
      .subscribe(() => this.article = undefined );
    // soucrire aux routes avec un id pour récupérer l'id puis appeler articleService.read
    this.route.queryParamMap.pipe(
      filter((paramMap) => paramMap.has('id')),
      map((paramMap) => paramMap.get('id')),
      map((id: string) => parseInt(id)),
      switchMap((id: number) => this.articleService.read(id))
    ).subscribe((article) => this.article = article);
  }
  create(article: Article) {
    // deux propriétés en callback pour ok et pas ok
    this.articleService.create(article)
      .subscribe({
        next: (newArticle) => console.log(`Article ${newArticle} créé avec succès`),
        error: (errorMessage) => console.log(`Impossible de créer l'article ${article} : ${errorMessage}`),
        complete: () => { console.log('Création du nouvel article terminée avec succès !');
        this.location.back(); }

      });
  }

  update(article: Article) {
    this.articleService.update(article).subscribe({
      complete: () => {
        console.log(`Article d'id ${article.id} mis à jour avec succès.`);
        this.location.back();
      }, error: (message) => console.log(`Impossible de mettre à jour l'article: ${message}`)
    });
  }

}
