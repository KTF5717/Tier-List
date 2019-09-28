import { Component, Input, OnInit } from '@angular/core';
import { Champion } from '../tier-list/tier-list';

@Component({
  selector: 'app-champion-item',
  template: `
    <div class="champion-item">
      <div><img [src]="champion.picture" class="champion-image" alt=""></div>
      <div class="champion-name">{{champion.name}}</div>
    </div>
  `,
  styleUrls: ['./champion-item.component.scss']
})
export class ChampionItemComponent {
  @Input() champion: Champion;
}
