import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/enviroment';
import { ComunicationServiceService } from '../../services/comunication-service.service';



@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  router = inject(Router)
  comunicacionService = inject(ComunicationServiceService);

  logout() {
    this.router.navigate(['/login'])
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
    
    this.comunicacionService.loadNavComponent(true);
  }


}
