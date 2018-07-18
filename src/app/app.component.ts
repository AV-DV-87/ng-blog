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

  constructor(private articleService : ArticleService) {
    this.showList = true;
    this.articles = new Array();
  }

  ngOnInit(){
    //etape 1 et 2 peuvent être inversée car ASYNC
    
    //1 chargé les articles mock
    this.articleService.loadMock();
    //2 une fois connécté au service et mock recup rempli articles
    this.articleService.articles.subscribe((result)=> this.articles = result);
    console.log('NgONInit terminé')
  }

  handleCreate(article: Article) {
    //TODO implement method, put article in articles
    this.articles.push(article);
    this.showList = true;
    console.log('Un article a été créé.', article);
  }

  handleDelete(id: number) {
    this.updateList(id);
  }

  handleUpdate(article: Article) {
    this.updateList(article.id, article);
    this.editArticle = undefined;
    this.showList = true;
  }

  showEdit(id: number) {
    this.editArticle = this.articles.find((a) => a.id === id);
    this.showList = false;
  }

  private updateList(id: number, article?: Article) {
    let index = this.articles.findIndex((a) => a.id === id);
    if (index >= 0) {
      if (article) {
        this.articles.splice(index, 1, article);
      } else {
        this.articles.splice(index, 1);
      }
    }
  }
}
