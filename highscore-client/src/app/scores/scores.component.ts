import { Component, OnInit } from '@angular/core';
import { Score, ScoresService } from '../../lib/highscore-service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

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
