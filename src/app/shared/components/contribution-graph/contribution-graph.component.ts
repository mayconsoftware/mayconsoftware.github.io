import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../../core/services/github.service';
import { ContributionCalendar, ContributionDay, ContributionWeek } from '../../../core/models/contribution.model';

@Component({
  selector: 'app-contribution-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contribution-graph.component.html',
  styleUrls: ['./contribution-graph.component.scss']
})
export class ContributionGraphComponent implements OnInit {
  private githubService: GithubService;
  calendar = signal<ContributionCalendar | null>(null);
  loading = signal(true);
  error = signal(false);

  weeks = computed(() => this.calendar()?.weeks ?? []);
  total = computed(() => this.calendar()?.totalContributions ?? 0);

  // Month labels derived from the weeks data
  monthLabels = computed(() => {
    const weeks = this.weeks();
    const labels: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, i) => {
      const firstDay = week.contributionDays.find(d => d.date);
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          labels.push({
            label: date.toLocaleString('pt-BR', { month: 'short' }),
            colIndex: i
          });
          lastMonth = month;
        }
      }
    });
    return labels;
  });

  constructor(private _githubService: GithubService) {
    this.githubService = _githubService;
  }

  ngOnInit() {
    this.githubService.getContributions().subscribe({
      next: (data) => {
        this.calendar.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
        // Fallback: generate empty calendar
        this.calendar.set(this.generateEmptyCalendar());
      }
    });
  }

  getCellColor(count: number): string {
    if (count === 0) return 'var(--color-contrib-0)';
    if (count <= 3) return 'var(--color-contrib-1)';
    if (count <= 6) return 'var(--color-contrib-2)';
    if (count <= 9) return 'var(--color-contrib-3)';
    return 'var(--color-contrib-4)';
  }

  getDayOfWeek(day: ContributionDay): number {
    return new Date(day.date + 'T12:00:00').getDay();
  }

  formatDate(date: string): string {
    return new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  private generateEmptyCalendar(): ContributionCalendar {
    const weeks: ContributionWeek[] = [];
    const today = new Date();
    const start = new Date(today);
    start.setFullYear(start.getFullYear() - 1);

    // Align to Sunday
    start.setDate(start.getDate() - start.getDay());

    let current = new Date(start);
    while (current <= today) {
      const week: ContributionWeek = { contributionDays: [] };
      for (let d = 0; d < 7; d++) {
        week.contributionDays.push({
          contributionCount: 0,
          date: current.toISOString().split('T')[0],
          color: '#ebedf0'
        });
        current.setDate(current.getDate() + 1);
      }
      weeks.push(week);
    }
    return { totalContributions: 0, weeks };
  }

  trackByWeek(index: number): number { return index; }
  trackByDay(index: number, day: ContributionDay): string { return day.date; }
}
