import { inject, Injectable, signal } from '@angular/core';
import { JsonPlaceholderApiService } from '../../../../core/services/json-placeholder-api/json-placeholder-api.service';
import { IPost } from '../../model/post.model';
import { AlertService } from '../../../../core/services/alert-service/alert.service';
import { IPostFormData } from '../../model/posts-form-data.model';
import { IPostComment } from '../../model/post-comment.model';
import { ConfirmDialogService } from '../../../../core/services/dialog-service/confirm-dialog-service/confirm-dialog.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsFacade {
  private readonly api = inject(JsonPlaceholderApiService);
  private readonly alert = inject(AlertService);
  private readonly confirmService = inject(ConfirmDialogService);
  private readonly router = inject(Router);

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

    this.api.getAllPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loadingPosts.set(false);
        this.errorGetPosts.set(false);
      },
      error: () => {
        this.loadingPosts.set(false);
        this.errorGetPosts.set(true);
      },
    });
  }

  loadPostById(id: number): void {
    this.loadingPost.set(true);

    this.api.getPostById(id).subscribe({
      next: (post) => {
        this.post.set(post);
        this.loadingPost.set(false);
        this.errorGetPost.set(false);
      },
      error: () => {
        this.loadingPost.set(false);
        this.errorGetPost.set(true);
      },
    });
  }

  loadCommentsByPostId(postId: number) {
    this.loadingGetComments.set(true);

    this.api.getCommentsByPostId(postId).subscribe({
      next: (comments) => {
        this.postComments.set(comments);
        this.loadingGetComments.set(false);
        this.errorGetComments.set(false);
      },
      error: () => {
        this.loadingGetComments.set(false);
        this.errorGetComments.set(true);
      },
    });
  }

  createPost(post: IPostFormData, onSuccess?: () => void, onError?: () => void): void {
    this.api.createPost(post).subscribe({
      next: () => {
        this.alert.success('Postagem criada com sucesso.');
        this.alert.timeoutToClear();
        onSuccess?.();
      },
      error: () => {
        this.alert.error('Erro ao criar postagem.');
        this.alert.timeoutToClear();
        onError?.();
      },
    });
  }

  updatePost(id: number, post: IPostFormData, onSuccess?: () => void, onError?: () => void) {
    this.api.updatePost(id, post).subscribe({
      next: (post) => {
        this.post.set(post);
        this.alert.success('Postagem editada com sucesso.');
        this.alert.timeoutToClear();
        onSuccess?.();
      },
      error: () => {
        this.alert.error('Erro ao editar postagem.');
        this.alert.timeoutToClear();
        onError?.();
      },
    });
  }

  deletePost(postId: number): void {
    this.confirmService
      .confirm('Excluir postagem', 'Tem certeza que deseja excluir este post?', 'btn-danger')
      .then(() => {
        const redirectToPosts = () => this.router.navigate(['/posts']);
        this.deletePostById(postId, redirectToPosts, redirectToPosts);
      });
  }

  private deletePostById(id: number, onSuccess?: () => void, onError?: () => void): void {
    this.api.deletePostById(id).subscribe({
      next: () => {
        this.alert.success('Postagem deletada com sucesso.');
        this.alert.timeoutToClear();
        this.loadAllPosts();
        onSuccess?.();
      },
      error: () => {
        this.alert.error('Erro ao deletar postagem.');
        this.alert.timeoutToClear();
        onError?.();
      },
    });
  }
}
