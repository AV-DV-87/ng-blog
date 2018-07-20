import {Component, OnInit} from '@angular/core';
import {Article} from '../article';
import {ArticleService} from '../article.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {
  articles: Array<Article>;

  constructor(private articleService: ArticleService, private router: Router) {
    this.articles = new Array();
  }

  ngOnInit() {
    this.articleService.list().subscribe((list) => this.articles = list);
  }

  edit(id: number) {
    this.router.navigate([`edit`], {
      queryParams: {id: id}
    });
  }

  delete(id: number) {
    this.articleService.delete(id).subscribe({
      complete: () => console.log(`Article id : ${id} supprimé avec succès`),
      error: (message) => console.log(`Impossible de supprimer l'article: ${message}`)
    });
  }

}
