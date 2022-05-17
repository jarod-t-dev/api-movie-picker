import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {genreData} from "../../assets/genre-data";

@Component({
  selector: 'app-roulette-wheel',
  templateUrl: './roulette-wheel.component.html',
  styleUrls: ['./roulette-wheel.component.css'],
})
export class RouletteWheelComponent implements OnInit {
  public genres: string[] = []
  public moviePick: string | undefined
  public arrOfVowels: string[] = ['A', 'E', 'I', 'O', 'U']
  public sentenceStructure: string
  public genreArray = genreData
  public url: string
  public movieFilter: number
  public spinButton: string = "Spin"


  spinTheWheel() {
    this.moviePick = this.genres[Math.floor(Math.random() * this.genres.length)]
    if (this.arrOfVowels.includes(this.moviePick[0])) {
      this.sentenceStructure = "an " + this.moviePick
    }
    else {
      this.sentenceStructure = "a " + this.moviePick
    }
    let selectedGenre = this.moviePick
    this.url = genreData.find(function(item){
      return item.genre == selectedGenre
    }).url
    console.log(this.moviePick)
    switch (this.moviePick) {
      case "Action":
      case "Adventure":
      case "Crime":
      case "Family":
      case "Fantasy":
      case "Film-Noir":
      case "Horror":
      case "History":
      case "Music":
      case "Mystery":
      case "Romance":
      case "Sci-Fi":
      case "Superhero":
      case "War":
        this.movieFilter = 1
        break;
      case "Animation":
      case "Biography":
      case "Comedy":
      case "Documentary":
      case "Drama":
      case "Game-Show":
      case "Musical":
      case "Short":
      case "Talk-Show":
      case "Thriller":
      case "Western":
        this.movieFilter = 2
        break;
      case "Reality-TV":
        this.movieFilter = 3
        break;
      case "Sport":
        this.movieFilter = 4
        break;
      default:
        console.log("switch case hit the default condition - somethings not right")
    }
    this.spinButton = "Spin Again"
  };

  findGenre() {
    window.open(this.url, "_blank");
  }


  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    let headers = new HttpHeaders({
      'X-RapidAPI-Host': 'data-imdb1.p.rapidapi.com',
      'X-RapidAPI-Key': '5a9337323cmshbfd37230fa22185p1606ebjsn044038e0c161'
    });
    this.http
      .get<GenreDataWrapper>('https://data-imdb1.p.rapidapi.com/titles/utils/genres', {
        headers: headers
      })
      .subscribe(data => {
        this.genres = data.results.filter(genre => genre);
        this.genres.splice(1, 1)
        this.genres.splice(17, 1)
      });
  }
}

interface GenreDataWrapper {
  results: string[]
}
