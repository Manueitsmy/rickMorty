import { Component, OnInit } from '@angular/core';
import { RickMortyService } from '../services/rick-morty.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];

  constructor(private rickMortyService: RickMortyService) {}

  ngOnInit(): void {
    this.rickMortyService.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
    });
  }
}