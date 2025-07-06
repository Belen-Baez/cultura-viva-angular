import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    //...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}