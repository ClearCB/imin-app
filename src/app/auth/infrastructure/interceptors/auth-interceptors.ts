import { HttpRequest, HttpHandlerFn, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export function headersInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const contentType = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  const cloneRequest = req.clone({ headers: contentType });

  return next(cloneRequest)

}
