import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Article } from '../article';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  @Input() article: Article;
  @Output() onCreate: EventEmitter<Article>;
  @Output() onUpdate: EventEmitter<Article>;

  private model: Article;



  constructor() {
    this.model = new Article();
    this.onCreate = new EventEmitter();
    this.onUpdate = new EventEmitter();
  }

  ngOnInit() {
    if (this.article) {
      this.model = this.article;
    }
  }

  submit(form: NgForm) {
    let data: Article = JSON.parse(JSON.stringify(this.model));
    if (this.article) {
      this.onUpdate.emit(data);
    } else {
      //reattribution de l'adresse pour la création du prochain article
      this.onCreate.emit(data);
    }
    form.resetForm();
  }

}
