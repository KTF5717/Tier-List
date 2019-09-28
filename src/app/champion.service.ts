import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Champion } from './tier-list/tier-list';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChampionService {
  constructor(private http: HttpClient) {
  }

  getChampionList(): Observable<Champion[]> {
    return this.http.get<any>(
      `http://ddragon.leagueoflegends.com/cdn/${environment.leagueVersion}/data/en_US/champion.json`,
    ).pipe(
      map(response => response.data),
      map(champions => {
        const result: Champion[] = [];
        const championNames: string[] = Object.keys(champions);
        for (let i = 0; i < championNames.length; i++) {
          let name = championNames[i];
          let champion = new Champion(
            champions[name].name,
            `http://ddragon.leagueoflegends.com/cdn/9.19.1/img/champion/${champions[name].image.full}`
          );
          result.push(champion);
        }
        return result;
      }),
    );
  }
}
