import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostFormComponent } from '../../components/forms/post-form/post-form.component';
import { IPostFormData } from '../../model/posts-form-data.model';
import { PostsUiFacade } from '../../facade/posts-ui/posts-ui.facade';

@Component({
  selector: 'app-create-post.page',
  standalone: true,
  imports: [RouterLink, PostFormComponent],
  templateUrl: './create-post.page.html',
  styleUrl: './create-post.page.css',
})
export class CreatePostPage {
  private readonly ui = inject(PostsUiFacade);

  createPost(post: IPostFormData): void {
    this.ui.createPost(post);
  }
}
