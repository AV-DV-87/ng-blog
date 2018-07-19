import { Component, OnInit } from '@angular/core';
import { Article } from './article';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  articles: Array<Article>;
  showList: boolean;
  editArticle: Article;

  constructor(private articleService: ArticleService) {
    this.showList = true;
    this.articles = new Array();
  }

  ngOnInit() {
    this.articleService.list().subscribe((list) => {
      console.log('Nb article' + list.length);
      this.articles = list
    });
  }

  handleCreate(article: Article) {
    //deux propriétés en callback pour ok et pas ok
    this.articleService.create(article)
      .subscribe({

        next: (newArticle) => console.log(`Article ${newArticle} créé avec succès`),

        error: (errorMessage) => console.log(`Impossible de créer l'article ${article} : ${errorMessage}`),
        //fin du game
        complete: () => console.log('Création du nouvel article terminée avec succès !')

      })
    this.showList = true;
    console.log('Un article a été créé.', article, this.showList);
  }

  handleDelete(id: number) {
    this.articleService.delete(id).subscribe({
      complete: () => console.log(`Article id : ${id} supprimé avec succès`),
      error: (message) => console.log(`Impossible de supprimer l'article: ${message}`)
    });
  }

  handleUpdate(article: Article) {
    this.articleService.update(article).subscribe({
      complete: () => {

        console.log(`Article d'id ${article.id} mis à jour avec succès.`);
        this.editArticle = undefined;
        this.showList = true;
      }, error: (message) => console.log(`Impossible de mettre à jour l'article: ${message}`)
    });
  }

  showEdit(id: number) {
    this.articleService.read(id).subscribe(
      (article) => {
        this.editArticle = article;
        this.showList = false;
      });
  }
}
