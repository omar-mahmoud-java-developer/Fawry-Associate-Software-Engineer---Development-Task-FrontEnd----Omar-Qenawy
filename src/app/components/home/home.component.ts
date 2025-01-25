import { Component, inject, OnInit } from '@angular/core';
import { MovieDto, MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { UpdateMovieComponent } from '../update-movie/update-movie.component';
import { DeleteMovieComponent } from '../delete-movie/delete-movie.component';
import { SearchService } from '../../services/search.service';
import { ViewMovieDetailsComponent } from '../view-movie-details/view-movie-details.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: MovieDto[] = []; // Holds the list of movies

  movieService = inject(MovieService);
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  searchService = inject(SearchService); // Inject the SearchService

  ngOnInit(): void {
    // Subscribe to search query changes
    this.searchService.getSearchQuery().subscribe((query: string) => {
      if (query.trim() === '') {
        this.getAllMovies(); // Fetch all movies if query is empty
      } else {
        this.searchMovies(query); // Search movies if query is provided
      }
    });

    // Fetch all movies initially
    this.getAllMovies();
  }
  // Fetch all movies
  getAllMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response; // Update the movies list
      },
      error: (err) => {
        console.error("Error fetching movies:", err);
      }
    });
  }

  // Search for movies by title
  searchMovies(query: string): void {
    this.movieService.searchMovies(query).subscribe({
      next: (response) => {
        this.movies = response; // Update the movies list with search results
      },
      error: (err) => {
        console.error("Error searching movies:", err);
      }
    });
  }

  // Check if the current user is an admin
  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  update(movie: MovieDto) {
    const dialogRef = this.matDialog.open(UpdateMovieComponent, {
      data: { movie: movie },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.getAllMovies();
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  delete(movie: MovieDto) {
    const dialogRef = this.matDialog.open(DeleteMovieComponent, {
      data: { movie: movie },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.getAllMovies();
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  viewDetails(movie: MovieDto) {
    const dialogRef = this.matDialog.open(ViewMovieDetailsComponent, {
      data: movie
    });
  
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        // Any action after closing (if needed)
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
