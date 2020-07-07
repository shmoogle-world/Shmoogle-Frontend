import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { constants } from 'buffer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.auth.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });
        return next.handle(modifiedReq).pipe(map(this.afterRequest));
      })
    );
  }

  private afterRequest(event) {
    if (event instanceof HttpResponse && event.body && event.body['jwt']) {
      // TODO: Handle this jwt token for.
      const jwt = event.body["jwt"];
      delete event.body['jwt'];
    }
    return event;
  }
}
