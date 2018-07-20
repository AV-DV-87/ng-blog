import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {EditComponent} from './edit/edit.component';
import {FormsModule} from '@angular/forms';
import {ArticleService} from './article.service';
import {RouterModule} from '@angular/router';
import {ViewListComponent} from './view-list/view-list.component';
import {ViewEditComponent} from './view-edit/view-edit.component';
import {ROUTES} from './routes';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditComponent,
    ViewListComponent,
    ViewEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
