import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { videoReducer } from './video/video.reducer';

type StoreType = {
  $inputs: any[],
  disposeOldHosts: () => void
};

const rootReducer = compose(storeLogger(), combineReducers)({item: itemReducer, video: videoReducer});

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    NoContent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.provideStore(rootReducer),
  ],
  providers: [
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
