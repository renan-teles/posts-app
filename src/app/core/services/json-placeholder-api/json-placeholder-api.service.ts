import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../../features/posts/model/post.model';
import { IPostFormData } from '../../../features/posts/model/posts-form-data.model';
import { IPostComment } from '../../../features/posts/model/post-comment.model';

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly URL = 'https://jsonplaceholder.typicode.com';

  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.URL}/posts`);
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.URL}/posts/${id}`);
  }

  getCommentsByPostId(id: number): Observable<IPostComment[]> {
    return this.http.get<IPostComment[]>(`${this.URL}/comments`, { params: { postId: id } });
  }

  createPost(post: IPostFormData): Observable<IPost> {
    return this.http.post<IPost>(`${this.URL}/posts`, post);
  }

  updatePost(postId: number, post: IPostFormData): Observable<IPost> {
    return this.http.put<IPost>(`${this.URL}/posts/${postId}`, post);
  }

  deletePostById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/posts/${id}`);
  }
}
