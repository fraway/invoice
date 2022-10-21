import { Component, OnDestroy, OnInit } from "@angular/core";
import { MonoTypeOperatorFunction, Subject, takeUntil } from "rxjs";

@Component({
  template: ``
})
export class BaseComponent implements OnDestroy {
  private _unsubscribe = new Subject<void>();

  protected unsubscribe<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this._unsubscribe);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

}
