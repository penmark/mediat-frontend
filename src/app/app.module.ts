import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { StoreModule } from '@ngrx/store';
import { appRoutes } from './app.routes';
import { App } from './app.component';
import { NoContent } from './no-content';
import { ApiService } from './api/api.service';
import { appReducer } from './app.reducer';
import {SocketService} from './api/socket.service';
import { HttpService } from './api/http.service'
import { AuthService } from './auth/auth.service'

type StoreType = {
  disposeOldHosts: () => void
};


@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    NoContent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore(appReducer),
  ],
  providers: [
    ApiService,
    SocketService,
    AuthService,
    HttpService
  ],
  exports: [
    CommonModule
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, socketService: SocketService) {
    //socketService.send({korv: 'salami'});
    //socketService.receive()
    //  .subscribe(data => console.log('Socket data', data));
  }
  hmrOnInit(store: StoreType) {
    if (!store) return;
    console.log('HMR store', store);
    this.appRef.tick();
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
