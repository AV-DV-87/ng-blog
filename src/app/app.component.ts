import { Component } from '@angular/core';
import { Article } from './article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  articles: Array<Article>;
  showList: boolean;
  editArticle: Article;

  constructor() {
    this.showList = true;
    this.articles = new Array();
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
