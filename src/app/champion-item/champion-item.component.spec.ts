import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionItemComponent } from './champion-item.component';

describe('ChampionItemComponent', () => {
  let component: ChampionItemComponent;
  let fixture: ComponentFixture<ChampionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
