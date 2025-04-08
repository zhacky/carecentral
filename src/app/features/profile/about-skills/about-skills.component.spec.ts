import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSkillsComponent } from './about-skills.component';

describe('AboutSkillsComponent', () => {
  let component: AboutSkillsComponent;
  let fixture: ComponentFixture<AboutSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
