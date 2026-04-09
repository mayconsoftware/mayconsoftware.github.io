import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../core/services/blog.service';
import { BlogPost } from '../../../core/models/blog-post.model';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  posts = signal<BlogPost[]>([]);
  loading = signal(true);
  selectedTag = signal<string | null>(null);

  allTags = signal<string[]>([]);

  filteredPosts = signal<BlogPost[]>([]);

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getPosts().subscribe(posts => {
      const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.posts.set(sorted);
      this.filteredPosts.set(sorted);
      const tags = [...new Set(posts.flatMap(p => p.tags))].sort();
      this.allTags.set(tags);
      this.loading.set(false);
    });
  }

  filterByTag(tag: string | null) {
    this.selectedTag.set(tag);
    if (!tag) {
      this.filteredPosts.set(this.posts());
    } else {
      this.filteredPosts.set(this.posts().filter(p => p.tags.includes(tag)));
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
