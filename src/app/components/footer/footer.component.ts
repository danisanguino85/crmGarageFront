import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/enviroment';



@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  router = inject(Router)

  logout() {
    this.router.navigate(['/login'])
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }


}
