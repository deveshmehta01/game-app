import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';
import { Subject, asyncScheduler, BehaviorSubject } from 'rxjs';
import { throttleTime, mergeMap } from 'rxjs/operators';

interface UrlHistory {
  url: string;
  queryParams?: any;
}

@Injectable({
  providedIn: 'root'
})


export class NavigationHelperService {
  static singletonInstance: NavigationHelperService;

  private _history: Array<UrlHistory> = [];

  navigateToPreviousUrl$ = new Subject;

  private localStoragekey = 'previousUrl';

  private STORAGE_LIMIT = 20;

  $drawer = new BehaviorSubject<boolean>(false);

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.handlePrevNavigation();
    if (!NavigationHelperService.singletonInstance) {
      NavigationHelperService.singletonInstance = this;
    }
    return NavigationHelperService.singletonInstance;
  }

  private storeUrlHistory(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
      } else if (e instanceof NavigationEnd) {
        const urlAfterRedirects = e;
        const queryParams = this.activatedRoute.root.children[this.activatedRoute.root.children.length - 1].snapshot.queryParams;
        const url = urlAfterRedirects.url.split('?')[0];
        let history: UrlHistory;
        if (!queryParams) {
          history = { url };
        } else {
          history = { url, queryParams };
        }
        const previousUrl = this._history.pop();
        if (previousUrl === undefined || (previousUrl && previousUrl.url === history.url)) {
          this._history.push(history);
        } else {
          this._history.push(previousUrl, history);
        }
        if (this._history.length > this.STORAGE_LIMIT) {
          this._history = this._history.slice(this._history.length - this.STORAGE_LIMIT, this._history.length);
        }
        localStorage.setItem(this.localStoragekey, JSON.stringify(this._history || []));
      }
    });
  }


  get history(): Array<UrlHistory> {
    return this._history;
  }

  initialize() {
    const localStorageData = localStorage.getItem(this.localStoragekey) || '[]';
    const sessionData = JSON.parse(localStorageData);
    if (sessionData && sessionData !== '[]') {
      this._history = sessionData;
    }
    this.storeUrlHistory();
  }

  public getPreviousUrl(): UrlHistory {
    const previousUrl = this.history[this._history.length - 2];
    const localStorageData = localStorage.getItem(this.localStoragekey) || '{}';
    const sessionUrl = JSON.parse(localStorageData);
    if (previousUrl) {
      return previousUrl;
    } else if (sessionUrl) {
      return sessionUrl;
    } else {
      return { url: '' };
    }
  }

  public navigateToPreviousUrl(defaultUrl: string = '/') {
    this.navigateToPreviousUrl$.next(defaultUrl);
  }


  private handlePrevNavigation() {
    this.navigateToPreviousUrl$.pipe(
      throttleTime(250, asyncScheduler, { leading: true, trailing: false }))
      .subscribe(defaultUrl => {
        const previousUrl = this.getPreviousUrl();
        this._history.pop();
        this._history.pop();
        if (previousUrl.queryParams) {
          this.router.navigate([previousUrl.url], { queryParams: previousUrl.queryParams });
        } else {
          this.router.navigate([previousUrl.url]);
        }
      });
  }

}
