import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../node_modules/rxjs';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  //valeur "courante" pendant toute sa durée de vie selon les opérations effectués = AUTOMATION
  //seul le service le manipule et peut faire next()
  private subject: BehaviorSubject<Array<Article>>;

  constructor() {

    this.subject = new BehaviorSubject(new Array());
  }

  //GETTER : recup le subject sous forme d'observable
  get articles(): Observable<Array<Article>> {
    return this.subject.asObservable();
  }

  //chargement du MOCK à remplacer par webservice en V2
  loadMock() {
    let mock : Array<Article> = [
      {
        id: 0,
        title: 'Article N*1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis fermentum ligula consequat pulvinar. Integer sit amet metus a est suscipit fringilla vitae a nisi. Aliquam at erat ante. Phasellus interdum libero ac feugiat porta. In egestas ultrices nunc, sed iaculis turpis. Aenean bibendum mauris sit amet rutrum sagittis. Morbi tempus malesuada mauris, vitae maximus risus vulputate eget. Morbi rhoncus dui sed ipsum aliquam varius. Cras euismod sed nunc egestas vulputate. In consequat feugiat nisi viverra euismod. Integer at elit facilisis, placerat tellus id, eleifend sem. In hac habitasse platea dictumst. Praesent et nunc purus. Donec nec tortor vel metus semper malesuada eu id lorem.'
      },
      {
        id: 1,
        title: 'Article N*2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis fermentum ligula consequat pulvinar. Integer sit amet metus a est suscipit fringilla vitae a nisi. Aliquam at erat ante. Phasellus interdum libero ac feugiat porta. In egestas ultrices nunc, sed iaculis turpis. Aenean bibendum mauris sit amet rutrum sagittis. Morbi tempus malesuada mauris, vitae maximus risus vulputate eget. Morbi rhoncus dui sed ipsum aliquam varius. Cras euismod sed nunc egestas vulputate. In consequat feugiat nisi viverra euismod. Integer at elit facilisis, placerat tellus id, eleifend sem. In hac habitasse platea dictumst. Praesent et nunc purus. Donec nec tortor vel metus semper malesuada eu id lorem.'
      },
      {
        id: 2,
        title: 'Article N*3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis fermentum ligula consequat pulvinar. Integer sit amet metus a est suscipit fringilla vitae a nisi. Aliquam at erat ante. Phasellus interdum libero ac feugiat porta. In egestas ultrices nunc, sed iaculis turpis. Aenean bibendum mauris sit amet rutrum sagittis. Morbi tempus malesuada mauris, vitae maximus risus vulputate eget. Morbi rhoncus dui sed ipsum aliquam varius. Cras euismod sed nunc egestas vulputate. In consequat feugiat nisi viverra euismod. Integer at elit facilisis, placerat tellus id, eleifend sem. In hac habitasse platea dictumst. Praesent et nunc purus. Donec nec tortor vel metus semper malesuada eu id lorem.'
      }
    ];
    
    this.subject.next(mock);
  }
}
