import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { PostListComponent } from '../../components/lists/post-list/post-list.component';
import { AlertService } from '../../../../core/services/alert-service/alert.service';
import { AlertState } from '../../../../shared/types/alert-state.type';
import { ConfirmDialogService } from '../../../../core/services/dialog-service/confirm-dialog-service/confirm-dialog.service';
import { IPost } from '../../model/post.model';
import { AlertUtils } from '../../../../shared/interfaces/alert-utils.interface';
import { PostsFacade } from '../../facade/posts/posts.facade';
import { PostsUiFacade } from '../../facade/posts-ui/posts-ui.facade';

@Component({
  selector: 'app-posts.page',
  standalone: true,
  imports: [RouterLink, AlertComponent, PostListComponent],
  templateUrl: './posts.page.html',
  styleUrl: './posts.page.css',
})
export class PostsPage implements OnInit, OnDestroy, AlertUtils {
  private readonly facade = inject(PostsFacade);
  private readonly ui = inject(PostsUiFacade);

  loadingPosts = this.facade.loadingPosts;
  errorGetPosts = this.facade.errorGetPosts;
  posts: Signal<IPost[]> = this.facade.posts;

  private readonly alertService = inject(AlertService);
  alert: Signal<AlertState | null> = this.alertService.alert;

  ngOnInit(): void {
    this.facade.loadAllPosts();
  }

  ngOnDestroy(): void {
    this.closeAlert();
  }

  deletePost(postId: number): void {
    this.ui.deletePost(postId);
  }

  closeAlert(): void {
    this.alertService.clear();
  }
}
