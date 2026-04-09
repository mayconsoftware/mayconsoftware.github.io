import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { BlogService } from '../../../core/services/blog.service';
import { BlogPost } from '../../../core/models/blog-post.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  post = signal<BlogPost | null>(null);
  content = signal<string>('');
  loading = signal(true);
  error = signal(false);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.error.set(true);
      this.loading.set(false);
      return;
    }

    // Load post metadata
    this.blogService.getPosts().subscribe(posts => {
      const found = posts.find(p => p.slug === slug) ?? null;
      this.post.set(found);
    });

    // Load post content
    this.blogService.getPost(slug).subscribe({
      next: (md) => {
        const html = marked.parse(md) as string;
        this.content.set(DOMPurify.sanitize(html));
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
