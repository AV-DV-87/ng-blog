import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from '../../node_modules/rxjs';
import { Article } from './article';
import { HttpClient, HttpErrorResponse } from '../../node_modules/@angular/common/http';
import { environment as ENV } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  //valeur "courante" pendant toute sa durée de vie selon les opérations effectués = AUTOMATION
  //seul le service le manipule et peut faire next()
  private subject: BehaviorSubject<Array<Article>>;
  private apiUrl: string;

  constructor(private httpclient: HttpClient) {

    this.subject = new BehaviorSubject(new Array());
    this.apiUrl = ENV.apiUrl + '/article';
  }

  //GETTER : recup le subject sous forme d'observable
  get articles(): Observable<Array<Article>> {
    return this.subject.asObservable();
  }

  //chargement du MOCK à remplacer par webservice en V2

  loadMock() {
    this.httpclient.get<Array<Article>>(ENV.apiUrl).subscribe((list) =>
      this.subject.next(list));
  }

  list(): Observable<Array<Article>> {
    this.httpclient.get<Array<Article>>(this.apiUrl)
      .subscribe((list) => this.subject.next(list))
    //fais lui même référence à subject
    return this.articles;
  }

  create(article: Article): Observable<Article> {

    let result = new Subject<Article>();
    //si HTTP POST ok result.complete

    this.httpclient.post<Article>(this.apiUrl, article)
      .subscribe((newArticle) => {
        this.republish(null, newArticle)
        result.next(newArticle);
        result.complete();

      }, (response: HttpErrorResponse) => {
        //si erreur result.error
        result.error(response.message);
      })

    return result;
  }

  read(id: number): Observable<Article> {
    let result = new Subject<Article>();
    this.httpclient.get(this.apiUrl + `/${id}`).subscribe(
      (article: Article)=> result.next(article), 
      (response: HttpErrorResponse) => result.error(response.message)
    )
    return result;
  }

  update(article: Article): Observable<Article> {
    let result = new Subject<Article>();
    this.httpclient.put<Article>(this.apiUrl, article)
    .subscribe((updateArticle)=>{
      this.republish(article.id, updateArticle);
      result.next(updateArticle);
      result.complete();
    },(resp: HttpErrorResponse)=> result.error(resp.message));
    return result;
  }

  delete(id: number): Observable<void> {
    let result = new Subject<void>();
    this.httpclient.delete(this.apiUrl + `/${id}`).subscribe(
      () => {
        this.republish(id, null);
        result.complete()},
      (response: HttpErrorResponse)=>result.error(response.message)
    );
    return result;
  }

  //permet de republier un article apres creation modif ou suppression
  republish(id: number, article: Article) {
    let currentArticles = this.subject.value.slice();

    if (id === null) {
      //Création
      currentArticles.push(article);
    } else {
      //récupération de l'index de l'article à MAJ ou suppr
      let index = currentArticles.findIndex((a) => a.id === id);

      if (index >= 0 && article) {
        //MAJ
        currentArticles.splice(index, 1, article);
      }
      else if (index >= 0) {
        //suppresion
        currentArticles.splice(index, 1);
      }
      else {
        console.error(`Impossible de traiter une opération sur un article inexistant (id=${id})`);
      }
      //republication de la nouvellet liste à jour      
    }
    console.log('Nb article REPUBLISH'+ currentArticles.length);
    this.subject.next(currentArticles);
  }
}
