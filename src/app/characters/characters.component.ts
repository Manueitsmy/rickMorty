import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RickMortyService } from '../services/rick-morty.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: any[] = [];
  selectedCharacter: any;
  drawnCharacters: any[] = [];
  buttonDisabled: boolean = true;
  countdown: number = 200;
  countdownSubscription: Subscription | undefined;

  constructor(
    private rickMortyService: RickMortyService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.fetchCharacters();
    this.loadCountdown();
    this.loadDrawnCharacters();
  }

  ngOnDestroy(): void {
    this.unsubscribeCountdown();
  }

  fetchCharacters(): void {
    this.rickMortyService.getCharacters().subscribe(
      (data: any) => {
        this.characters = data.results;
        console.log('Characters loaded:', this.characters);
        this.startCountdown();
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
        this.saveCountdown();
        this.ngZone.run(() => {});
      } else {
        this.buttonDisabled = false;
        this.unsubscribeCountdown();
        console.log('Countdown finished, button enabled.');
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

    this.drawnCharacters.push(this.selectedCharacter);
    this.saveDrawnCharacters();

    this.resetCountdown();
  }

  resetCountdown(): void {
    this.buttonDisabled = true;
    this.countdown = 200; // Reset du décompte à 2 heures
    this.saveCountdown();
    this.startCountdown();
  }

  saveCountdown(): void {
    localStorage.setItem('countdown', this.countdown.toString());
    localStorage.setItem('buttonDisabled', this.buttonDisabled.toString());
  }

  loadCountdown(): void {
    const savedCountdown = localStorage.getItem('countdown');
    const savedButtonState = localStorage.getItem('buttonDisabled');

    if (savedCountdown !== null) {
      this.countdown = parseInt(savedCountdown, 10);
    }
    if (savedButtonState !== null) {
      this.buttonDisabled = savedButtonState === 'true';
    }
  }

  saveDrawnCharacters(): void {
    localStorage.setItem('drawnCharacters', JSON.stringify(this.drawnCharacters));
  }

  loadDrawnCharacters(): void {
    const savedDrawnCharacters = localStorage.getItem('drawnCharacters');
    if (savedDrawnCharacters !== null) {
      this.drawnCharacters = JSON.parse(savedDrawnCharacters);
    }
  }
}
