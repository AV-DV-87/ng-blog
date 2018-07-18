import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  articles : Array<Article>;
  @Output()
  onDelete : EventEmitter<number>;
  @Output()
  onEdit : EventEmitter<number>;

  constructor() { 
    this.onDelete = new EventEmitter();
    this.onEdit = new EventEmitter();
  }

  delete(article: Article){
    if(article && article.id != null){
      this.onDelete.emit(article.id);
    }
  }
  
  edit(article: Article){
    if(article && article.id != null){
      this.onEdit.emit(article.id);
    }
  }

  

  ngOnInit() {
  }

}
