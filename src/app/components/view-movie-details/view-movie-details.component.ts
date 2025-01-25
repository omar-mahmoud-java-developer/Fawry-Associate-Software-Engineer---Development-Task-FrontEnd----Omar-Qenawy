import { Component, Inject } from '@angular/core';
import { MovieDto } from '../../services/movie.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-movie-details',
  templateUrl: './view-movie-details.component.html',
  styleUrls: ['./view-movie-details.component.css']
})
export class ViewMovieDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public movie: MovieDto) {}
}
