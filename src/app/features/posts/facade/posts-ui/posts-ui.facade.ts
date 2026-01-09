import { inject, Injectable } from '@angular/core';
import { PostsFacade } from '../posts/posts.facade';
import { AlertService } from '../../../../core/services/alert-service/alert.service';
import { ConfirmDialogService } from '../../../../core/services/dialog-service/confirm-dialog-service/confirm-dialog.service';
import { Router } from '@angular/router';
import { IPostFormData } from '../../model/posts-form-data.model';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsUiFacade {
  private readonly postsFacade = inject(PostsFacade);
  private readonly alert = inject(AlertService);
  private readonly confirmService = inject(ConfirmDialogService);
  private readonly router = inject(Router);

  createPost(post: IPostFormData): void {
    this.postsFacade
      .createPost(post)
      .pipe(finalize(() => this.redirectToPosts()))
      .subscribe({
        next: () => {
          this.alert.success('Postagem criada com sucesso.');
          this.alert.timeoutToClear();
        },
        error: () => {
          this.alert.error('Erro ao criar postagem.');
          this.alert.timeoutToClear();
        },
      });
  }

  updatePost(id: number, post: IPostFormData): void {
    this.postsFacade.updatePost(id, post).subscribe({
      next: (updatedPost) => {
        this.postsFacade.post.set(updatedPost);
        this.alert.success('Postagem editada com sucesso.');
        this.alert.timeoutToClear();
      },
      error: () => {
        this.alert.error('Erro ao editar postagem.');
        this.alert.timeoutToClear();
      },
    });
  }

  deletePost(postId: number): void {
    this.confirmService
      .confirm('Excluir postagem', 'Tem certeza que deseja excluir este post?', 'btn-danger')
      .then(() => this.executeDelete(postId));
  }

  private executeDelete(postId: number): void {
    this.postsFacade
      .deletePostById(postId)
      .pipe(finalize(() => this.redirectToPosts()))
      .subscribe({
        next: () => {
          this.alert.success('Postagem deletada com sucesso.');
          this.alert.timeoutToClear();
          this.postsFacade.loadAllPosts();
        },
        error: () => {
          this.alert.error('Erro ao deletar postagem.');
          this.alert.timeoutToClear();
        },
      });
  }

  private redirectToPosts(): void {
    this.router.navigate(['/posts']);
  }
}
