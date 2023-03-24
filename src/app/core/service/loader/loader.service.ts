import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loader$: Observable<boolean>;
  constructor() {
    this.loader$ = this.loaderSubject.asObservable();
  }
  triggerLoader(value: boolean) {
    this.loaderSubject.next(value);
  }
}
