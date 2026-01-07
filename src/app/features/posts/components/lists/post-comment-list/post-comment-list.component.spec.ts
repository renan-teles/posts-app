import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentListComponent } from './post-comment-list.component';

describe('PostCommentListComponent', () => {
  let component: PostCommentListComponent;
  let fixture: ComponentFixture<PostCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCommentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
