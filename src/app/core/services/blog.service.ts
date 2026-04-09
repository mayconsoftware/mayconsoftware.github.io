import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private _posts = signal<BlogPost[]>([]);

  readonly posts = this._posts.asReadonly();

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>('assets/blog/index.json').pipe(
      tap(posts => this._posts.set(posts))
    );
  }

  getPost(slug: string): Observable<string> {
    return this.http.get(`assets/blog/${slug}.md`, { responseType: 'text' });
  }
}
