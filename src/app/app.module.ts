import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import { NoContent } from './no-content';
import { itemReducer } from './item/item.reducer';
import { combineReducers, StoreModule } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { compose } from '@ngrx/core/compose';
import { DurationPipe } from './item/duration.filter';
import { ApiService } from './api/api.service';

type StoreType = {
  disposeOldHosts: () => void
};

const rootReducer = compose(storeLogger(), combineReducers)({
  item: itemReducer,
});

@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    NoContent,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.provideStore(rootReducer),
  ],
  providers: [
    ApiService
  ],
  exports: [
    DurationPipe,
    CommonModule
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
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
