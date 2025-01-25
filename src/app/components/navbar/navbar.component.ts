import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = ''; // Input value for the search bar
  isLoggedIn = signal<boolean>(false); // Signal to manage login status

  searchService = inject(SearchService); // Inject SearchService
  authService = inject(AuthService); // Inject AuthService
  router = inject(Router); // Inject Router

  ngOnInit(): void {
    this.getName(); // Initialize the name when the component loads
    this.isLoggedIn = this.authService.getLoggedIn(); // Check login status from AuthService
  }

  // Get the logged-in user's name from session storage
  getName(): string | null {
    return sessionStorage.getItem('name');
  }

  // Logout method
  logout(): void {
    this.authService.logout();
    this.authService.setLoggedIn(false);
    this.router.navigate(['login']); // Redirect to login page after logout
  }

  // Reset the search query
  getAllMovies(): void {
    this.searchService.setSearchQuery(''); 
    this.router.navigate(['/'])// Reset the search query
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  // Navigate to the Add Movie page and then redirect to Home page
  navigateToAddMovie(): void {
    this.router.navigate(['/add-movie']);
      // After the navigation to add-movie is complete, navigate to home

  }

  // Pass the search query to the SearchService
  searchMovies(): void {
    this.searchService.setSearchQuery(this.searchQuery); // Set the search query in the service
  }
}
