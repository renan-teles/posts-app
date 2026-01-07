import { Component, input } from '@angular/core';
import { IPostComment } from '../../../model/post-comment.model';
import { PostCommentCardComponent } from '../../cards/post-comment-card/post-comment-card.component';
import { LoadingComponent } from '../../../../../shared/components/loading/loading.component';
import { ErrorComponent } from '../../../../../shared/components/error/error.component';

@Component({
  selector: 'app-post-comment-list',
  standalone: true,
  imports: [PostCommentCardComponent, LoadingComponent, ErrorComponent],
  templateUrl: './post-comment-list.component.html',
  styleUrl: './post-comment-list.component.css',
})
export class PostCommentListComponent {
  comments = input.required<IPostComment[]>();
  loading = input.required<boolean>();
  error = input.required<boolean>();
}
