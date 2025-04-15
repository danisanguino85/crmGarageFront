import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  router = inject(Router)


  logout() {
    this.router.navigate(['/login'])
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }


}
