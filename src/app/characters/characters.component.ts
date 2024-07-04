import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RickMortyService } from '../services/rick-morty.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];
  selectedCharacter: any;
  buttonDisabled: boolean = true;
  countdown: number = 10;
  countdownSubscription!: Subscription;

  constructor(
    private rickMortyService: RickMortyService,
    private ngZone: NgZone // Injecter NgZone
  ) {}

  ngOnInit(): void {
    this.fetchCharacters(); // Appel initial pour charger les personnages
  }

  fetchCharacters(): void {
    this.rickMortyService.getCharacters().subscribe(
      (data: any) => {
        this.characters = data.results;
        console.log('Characters loaded:', this.characters);
        this.startCountdown(); // Démarrage du décompte une fois que les personnages sont chargés
      },
      (error) => {
        console.error('Error loading characters:', error);
      }
    );
  }

  startCountdown(): void {
    console.log('Starting countdown:', this.countdown);
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
        console.log('Countdown:', this.countdown);
        // Forcer la mise à jour de la vue à l'intérieur de la zone Angular
        this.ngZone.run(() => {});
      } else {
        this.buttonDisabled = false;
        this.unsubscribeCountdown(); // Arrêt du décompte une fois terminé
        console.log('Countdown finished, button enabled.');
        // Forcer la mise à jour de la vue à l'intérieur de la zone Angular
        this.ngZone.run(() => {});
      }
    });
  }

  unsubscribeCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  drawRandomCharacter(): void {
    if (this.buttonDisabled || this.characters.length === 0) return;

    const randomIndex = Math.floor(Math.random() * this.characters.length);
    this.selectedCharacter = this.characters[randomIndex];
    console.log('Selected character:', this.selectedCharacter);
    this.resetCountdown();
  }

  resetCountdown(): void {
    this.buttonDisabled = true;
    this.countdown = 10;
    this.startCountdown();
  }
}