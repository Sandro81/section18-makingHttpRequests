import {HttpInterceptor} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  }

}
