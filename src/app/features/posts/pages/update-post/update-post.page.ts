import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { PostFormComponent } from '../../components/forms/post-form/post-form.component';
import { IPostFormData } from '../../model/posts-form-data.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IPost } from '../../model/post.model';
import { AlertService } from '../../../../core/services/alert-service/alert.service';
import { AlertState } from '../../../../shared/types/alert-state.type';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostsFacade } from '../../facade/posts/posts.facade';
import { AlertUtils } from '../../../../shared/interfaces/alert-utils.interface';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { PostsUiFacade } from '../../facade/posts-ui/posts-ui.facade';

@Component({
  selector: 'app-update-post.page',
  standalone: true,
  imports: [
    CommonModule,
    PostFormComponent,
    AlertComponent,
    RouterLink,
    LoadingComponent,
    ErrorComponent,
  ],
  templateUrl: './update-post.page.html',
  styleUrl: './update-post.page.css',
})
export class UpdatePostPage implements OnInit, OnDestroy, AlertUtils {
  private readonly facade = inject(PostsFacade);
  private readonly ui = inject(PostsUiFacade);

  private readonly currentRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private readonly alertService = inject(AlertService);
  alert: Signal<AlertState | null> = this.alertService.alert;

  errorGetPost = this.facade.errorGetPost;
  loadingPost = this.facade.loadingPost;
  post: Signal<IPost | null> = this.facade.post;

  ngOnInit(): void {
    this.currentRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.facade.loadPostById(Number(params.get('postId')));
    });
  }

  ngOnDestroy(): void {
    this.closeAlert();
  }

  updatePost(postForm: IPostFormData): void {
    const post = this.post();
    if (!post) return;

    this.ui.updatePost(post.id, postForm);
  }

  closeAlert(): void {
    this.alertService.clear();
  }
}
