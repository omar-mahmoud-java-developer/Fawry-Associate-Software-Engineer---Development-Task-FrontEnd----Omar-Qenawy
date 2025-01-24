import { CommonModule } from '@angular/common';
import {Component, inject, OnInit, signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DeleteMovieComponent } from '../delete-movie/delete-movie.component';
import { MovieDto, MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  movies: MovieDto[] = [];

  movieService = inject(MovieService);

  isLoggedIn = signal<boolean>(false);
  
  constructor(private authService: AuthService,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.getName();
    this.isLoggedIn = this.authService.getLoggedIn();
  }

  getName(): string|null {
    return sessionStorage.getItem('name');
  }

  logout() {
    this.authService.logout();
    this.authService.setLoggedIn(false);
    this.router.navigate(['login']);
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  navigateToAddMovie(): void {
    this.router.navigate(['/add-movie']);
  }



}
