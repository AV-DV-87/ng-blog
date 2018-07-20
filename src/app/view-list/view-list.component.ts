import {Component, OnInit} from '@angular/core';
import {Article} from '../article';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {
  articles: Array<Article>;

  constructor(private articleService: ArticleService) {
    this.articles = new Array();
  }

  ngOnInit() {
    this.articleService.list().subscribe((list) => this.articles = list);
  }

}
