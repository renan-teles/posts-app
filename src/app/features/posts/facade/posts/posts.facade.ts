import { inject, Injectable, signal } from '@angular/core';
import { JsonPlaceholderApiService } from '../../../../core/services/json-placeholder-api/json-placeholder-api.service';
import { IPost } from '../../model/post.model';
import { AlertService } from '../../../../core/services/alert-service/alert.service';
import { IPostFormData } from '../../model/posts-form-data.model';
import { IPostComment } from '../../model/post-comment.model';
import { ConfirmDialogService } from '../../../../core/services/dialog-service/confirm-dialog-service/confirm-dialog.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsFacade {
  private readonly api = inject(JsonPlaceholderApiService);

  readonly loadingPosts = signal(false);
  readonly errorGetPosts = signal(false);

  readonly loadingPost = signal(false);
  readonly errorGetPost = signal(false);

  readonly loadingGetComments = signal(false);
  readonly errorGetComments = signal(false);

  readonly posts = signal<IPost[]>([]);
  readonly post = signal<IPost | null>(null);
  readonly postComments = signal<IPostComment[]>([]);

  loadAllPosts(): void {
    this.loadingPosts.set(true);

    this.api
      .getAllPosts()
      .pipe(finalize(() => this.loadingPosts.set(false)))
      .subscribe({
        next: (posts) => {
          this.posts.set(posts);
          this.errorGetPosts.set(false);
        },
        error: () => this.errorGetPosts.set(true),
      });
  }

  loadPostById(id: number): void {
    this.loadingPost.set(true);

    this.api
      .getPostById(id)
      .pipe(finalize(() => this.loadingPost.set(false)))
      .subscribe({
        next: (post) => {
          this.post.set(post);
          this.errorGetPost.set(false);
        },
        error: () => this.errorGetPost.set(true),
      });
  }

  loadCommentsByPostId(postId: number): void {
    this.loadingGetComments.set(true);

    this.api
      .getCommentsByPostId(postId)
      .pipe(finalize(() => this.loadingGetComments.set(false)))
      .subscribe({
        next: (comments) => {
          this.postComments.set(comments);
          this.errorGetComments.set(false);
        },
        error: () => this.errorGetComments.set(true),
      });
  }

  createPost(post: IPostFormData) {
    return this.api.createPost(post);
  }

  updatePost(id: number, post: IPostFormData) {
    return this.api.updatePost(id, post);
  }

  deletePostById(id: number) {
    return this.api.deletePostById(id);
  }
}
