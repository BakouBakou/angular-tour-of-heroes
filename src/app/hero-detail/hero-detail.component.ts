import {Component, OnInit, Input} from '@angular/core';
import {Hero} from '../model/Hero';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero?: Hero;

  constructor(private heroService: HeroService, private activatedRoute: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  private getHero(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }
}
