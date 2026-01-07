import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentsPage } from './post-comments.page';

describe('PostCommentsPage', () => {
  let component: PostCommentsPage;
  let fixture: ComponentFixture<PostCommentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCommentsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
