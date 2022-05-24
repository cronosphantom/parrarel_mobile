import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TabnavComponent } from './app/tabnav/tabnav.component';
import { TabnavModule } from './app/tabnav/tabnav.module';
import { environment } from './../environments/environment';

@NgModule({
  declarations: [AppComponent, TabnavComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TabnavModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: environment.apiUrl,
        }),
      }),
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
