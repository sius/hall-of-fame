import { Component, OnInit } from '@angular/core';
import { ScoresService, Score } from '../lib/highscore-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Hall Of Fame';
  top = 25;
  skip = 0;
  scores: Score[] = []

  constructor(private hss: ScoresService) {}

  ngOnInit(): void {
    this.loadScores();
  }

  loadScores() {
    this.hss.findScores(this.skip, this.top).subscribe(
      data => this.scores =data,
      err => console.log(err)
    )
  }
  save(score: Score) {
    this.hss.updateScore(score._id, score, "response").subscribe(
      resp => {
        console.log(resp.status);
        this.loadScores();
      },
      err => console.log(err)
    )
  }
  remove(score: Score) {
    this.hss.removeScore(score._id, "response").subscribe(
      resp => {
        console.log(resp.status);
        this.loadScores();
      },
      err => console.log(err)
    )
  }
  create() {
    this.hss.createScore({ player: 'New Player', points: 0 }, "response").subscribe(
      resp => {
        console.log(resp.status);
        this.loadScores();
      },
      err => console.log(err)
    )
  }
}
