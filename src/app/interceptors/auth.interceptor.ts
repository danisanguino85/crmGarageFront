import { HttpHeaders, type HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('crm_garage_token')

  if (token) {
    const reqClone = req.clone({
      headers: new HttpHeaders({
        "Authorization": token
      })
    })
    return next(reqClone)
  }
  return next(req);
};