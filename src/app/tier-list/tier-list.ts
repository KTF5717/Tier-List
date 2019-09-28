export class TierList {
  name: string;
  tiers: Tier[];

  constructor(name: string, tiers: Tier[]) {
    this.name = name;
    this.tiers = tiers;
  }
}

export class Tier {
  name: string;
  champions: Champion[];

  constructor(name: string, champions: Champion[]) {
    this.name = name;
    this.champions = champions;
  }
}

export class Champion {
  name: string;
  picture: string;

  constructor(name: string, picture: string) {
    this.name = name;
    this.picture = picture;
  }
}
