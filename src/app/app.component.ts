import { Component, OnInit } from '@angular/core';
import { ChampionService } from './champion.service';
import { Champion, Tier, TierList } from './tier-list/tier-list';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <div class="champions-section">
      Champions
      <div *ngFor="let champion of champions"
           [class.champion-selected]="selectedChampion?.name == champion.name">
        <app-champion-item
          [champion]="champion"
          (click)="selectChampion(champion)"
          (contextmenu)="deselectChampion($event)"
        ></app-champion-item>
      </div>
    </div>
    <div class="tier-list-section">
      <div>
        <form>
          <input [formControl]="tierNameControl"
                 type="text"
                 placeholder="Tier Name">
          <button (click)="addTier()">Add Tier</button>
        </form>
        <div class="error">{{error}}</div>
      </div>
      <div>
        <form>
          <input [formControl]="roleNameControl"
                 type="text"
                 placeholder="Role Name">
          <button (click)="addRole()">Add Role</button>
        </form>
      </div>
      <div class="tier-list-row">
        <div class="tier-list-header"></div>
        <div class="tier-list-header" *ngFor="let tier of tierLists[0]?.tiers; let i = index">
          <div class="tier-name">
            {{tier.name}}
          </div>
          <div class="tier-remove-button" (click)="removeTier(i)">
            <i class="material-icons">
              delete
            </i>
          </div>
        </div>
      </div>
      <div class="tier-list-row" *ngFor="let list of tierLists">
        <div class="tier-list-name">{{list.name}}</div>
        <div class="tier-list-champion-section"
             [class.champion-selected]="selectedChampion != null"
             *ngFor="let tier of list.tiers"
             (click)="addChampion(tier)"
        >
          <img *ngFor="let champion of tier.champions; let i = index"
               [src]="champion.picture"
               (contextmenu)="deleteChampion($event, tier, i)"
               height="35">
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  champions: Champion[];
  tierLists: TierList[];

  tierNameControl: FormControl;
  roleNameControl: FormControl;
  error: string;
  selectedChampion: Champion;

  constructor(private championService: ChampionService) {
    this.tierNameControl = new FormControl('', Validators.required);
    this.roleNameControl = new FormControl('', Validators.required);
    this.tierLists = [];
  }

  ngOnInit(): void {
    this.championService.getChampionList()
      .subscribe(champions => this.champions = champions);
  }

  addTier(): void {
    if (this.tierNameControl.invalid) {
      return;
    }
    if (this.tierLists[0].tiers.length == 5) {
      this.error = 'You can only have 5 tiers total.';
      return;
    }

    const name = this.tierNameControl.value;
    for (const tierList of this.tierLists) {
      let newTier = new Tier(name, []);
      tierList.tiers.push(newTier);
    }
    this.tierNameControl.reset();
  }

  addRole() {
    if (this.roleNameControl.invalid) {
      return;
    }

    const name = this.roleNameControl.value;
    let newTiers: Tier[] = [];
    if (this.tierLists.length > 0) {
      let existingTiers = this.tierLists[0].tiers;

      for (const existingTier of existingTiers) {
        newTiers.push(new Tier(existingTier.name, []))
      }
    }

    let list = new TierList(name, newTiers);
    this.tierLists.push(list);
    this.roleNameControl.reset();
  }

  removeTier(index: number) {
    for (const tierList of this.tierLists) {
      tierList.tiers.splice(index, 1);
    }
  }

  deleteChampion(event: MouseEvent, tier: Tier, index: number) {
    event.preventDefault();
    tier.champions.splice(index, 1);
  }

  selectChampion(champion: Champion) {
    this.selectedChampion = champion;
  }

  deselectChampion(event: MouseEvent) {
    event.preventDefault();
    this.selectedChampion = null;
  }

  addChampion(tier: Tier) {
    if (this.selectedChampion == null) {
      return;
    }

    tier.champions.push(this.selectedChampion);
  }
}
