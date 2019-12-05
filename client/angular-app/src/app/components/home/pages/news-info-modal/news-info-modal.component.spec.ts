import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsInfoModalComponent } from './news-info-modal.component';

describe('NewsInfoModalComponent', () => {
  let component: NewsInfoModalComponent;
  let fixture: ComponentFixture<NewsInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
