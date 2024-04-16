import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

export function headersInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const cloneRequest = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });

  return next(cloneRequest)

}
