import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostFormComponent } from '../../components/forms/post-form/post-form.component';
import { IPostFormData } from '../../model/posts-form-data.model';
import { PostsFacade } from '../../facade/posts-facade/posts.facade';

@Component({
  selector: 'app-create-post.page',
  standalone: true,
  imports: [RouterLink, PostFormComponent],
  templateUrl: './create-post.page.html',
  styleUrl: './create-post.page.css',
})
export class CreatePostPage {
  private readonly facade = inject(PostsFacade);
  private readonly router = inject(Router);

  createPost(post: IPostFormData): void {
    const redirectToPosts = () => this.router.navigate(['/posts']);
    this.facade.createPost(post, redirectToPosts, redirectToPosts);
  }
}
