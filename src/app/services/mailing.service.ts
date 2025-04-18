import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  httpClient = inject(HttpClient)
  private url = 'http://localhost:3000/api/mailing'


  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  sendMail(body: any) {

    return lastValueFrom(
      this.httpClient.post(this.url, body)

    )

  }


}
