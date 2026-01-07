import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePostPage } from './update-post.page';

describe('UpdatePostPage', () => {
  let component: UpdatePostPage;
  let fixture: ComponentFixture<UpdatePostPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePostPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePostPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
