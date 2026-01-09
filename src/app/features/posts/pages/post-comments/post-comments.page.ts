import { Component, DestroyRef, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostCardComponent } from '../../components/cards/post-card/post-card.component';
import { IPost } from '../../model/post.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPostComment } from '../../model/post-comment.model';
import { PostCommentListComponent } from '../../components/lists/post-comment-list/post-comment-list.component';
import { PostsFacade } from '../../facade/posts/posts.facade';
import { PostsUiFacade } from '../../facade/posts-ui/posts-ui.facade';

@Component({
  selector: 'app-post-comments.page',
  standalone: true,
  imports: [RouterLink, PostCardComponent, PostCommentListComponent],
  templateUrl: './post-comments.page.html',
  styleUrl: './post-comments.page.css',
})
export class PostCommentsPage {
  private readonly facade = inject(PostsFacade);
  private readonly ui = inject(PostsUiFacade);

  private readonly currentRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  errorGetPost = this.facade.errorGetPost;
  loadingPost = this.facade.loadingPost;

  errorGetComments = this.facade.errorGetComments;
  loadingGetComments = this.facade.loadingGetComments;
  post: Signal<IPost | null> = this.facade.post;

  comments: Signal<IPostComment[]> = this.facade.postComments;

  ngOnInit(): void {
    this.currentRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const postId = Number(params.get('postId'));
      this.facade.loadPostById(postId);
      this.facade.loadCommentsByPostId(postId);
    });
  }

  deletePost(postId: number): void {
    this.ui.deletePost(postId);
  }
}
