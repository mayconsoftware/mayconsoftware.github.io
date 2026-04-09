import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContributionGraphComponent } from '../../shared/components/contribution-graph/contribution-graph.component';
import { BlogService } from '../../core/services/blog.service';
import { BlogPost } from '../../core/models/blog-post.model';

interface Tech {
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, ContributionGraphComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentPosts = signal<BlogPost[]>([]);

  techs: Tech[] = [
    { name: 'Angular', icon: 'A', color: '#dd0031' },
    { name: 'TypeScript', icon: 'TS', color: '#3178c6' },
    { name: 'Node.js', icon: 'N', color: '#339933' },
    { name: 'Python', icon: 'Py', color: '#3776ab' },
    { name: 'Home Assistant', icon: 'HA', color: '#18bcf2' },
    { name: 'Docker', icon: '🐳', color: '#2496ed' },
    { name: 'MQTT', icon: 'MQ', color: '#660066' },
    { name: 'Zigbee', icon: 'ZB', color: '#e8873a' },
  ];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getPosts().subscribe(posts => {
      this.recentPosts.set(posts.slice(0, 3));
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}
