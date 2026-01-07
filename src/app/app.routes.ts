import { Routes } from '@angular/router';
import { PostCommentsPage } from './features/posts/pages/post-comments/post-comments.page';
import { PostsPage } from './features/posts/pages/posts/posts.page';
import { CreatePostPage } from './features/posts/pages/create-post/create-post.page';
import { UpdatePostPage } from './features/posts/pages/update-post/update-post.page';

export const routes: Routes = [
  { path: 'post-comments/:postId', component: PostCommentsPage },
  { path: 'posts', component: PostsPage },
  { path: 'create-post', component: CreatePostPage },
  { path: 'update-post/:postId', component: UpdatePostPage },

  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '**', component: PostsPage },
];
