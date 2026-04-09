# Angular Signals: O Guia Completo para Reatividade Moderna

O Angular v16 introduziu os **Signals** — uma nova primitiva reativa que muda fundamentalmente a forma como gerenciamos estado em aplicações Angular. Se você ainda usa `BehaviorSubject` e `subscribe` para tudo, este guia vai abrir seus olhos.

## O que são Signals?

Signals são valores reativos que notificam automaticamente os consumidores quando mudam. Diferente do RxJS, eles são síncronos, simples e têm integração profunda com o Change Detection do Angular.

```typescript
import { signal, computed, effect } from '@angular/core';

// Criando um signal
const count = signal(0);

// Lendo o valor (note os parênteses — é uma função!)
console.log(count()); // 0

// Modificando
count.set(1);
count.update(v => v + 1);

// Computed: valor derivado automaticamente
const doubled = computed(() => count() * 2);
console.log(doubled()); // 4
```

## Por que Signals?

### O problema com Zone.js e Change Detection

O Angular tradicional usa Zone.js para detectar mudanças. Isso significa que **qualquer operação assíncrona** (clique, setTimeout, fetch) pode disparar um ciclo de detecção de mudanças em toda a árvore de componentes.

Com Signals, o Angular sabe exatamente **quais componentes precisam ser re-renderizados** — somente aqueles que consomem o signal que mudou.

### Comparação direta

```typescript
// ❌ Forma tradicional com BehaviorSubject
@Component({...})
export class OldComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  count$ = new BehaviorSubject(0);

  ngOnInit() {
    this.count$.pipe(takeUntil(this.destroy$)).subscribe(v => {
      // Side effects...
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// ✅ Forma moderna com Signals
@Component({...})
export class NewComponent {
  count = signal(0);

  constructor() {
    effect(() => {
      console.log('Count mudou para:', this.count());
      // Cleanup automático quando o componente é destruído
    });
  }
}
```

## Signals no Template

Uma das maiores vantagens é a integração direta no template:

```html
<!-- Leitura direta no template -->
<p>Contagem: {{ count() }}</p>

<!-- Condicional reativo -->
@if (isLoggedIn()) {
  <app-dashboard />
}

<!-- Loop reativo -->
@for (item of items(); track item.id) {
  <app-item [data]="item" />
}
```

## Input Signals (Angular v17+)

```typescript
@Component({
  selector: 'app-user-card',
  template: `<h2>{{ user().name }}</h2>`
})
export class UserCardComponent {
  user = input.required<User>();
  theme = input<'light' | 'dark'>('light');
}
```

## Integração com RxJS

Signals e RxJS não são mutuamente exclusivos. Você pode converter entre os dois:

```typescript
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  // Observable → Signal
  private posts$ = this.http.get<Post[]>('/api/posts');
  readonly posts = toSignal(this.posts$, { initialValue: [] });

  // Signal → Observable
  private count = signal(0);
  readonly count$ = toObservable(this.count);
}
```

## Conclusão

Signals representam o futuro do Angular. Eles tornam o código mais:

- **Simples**: sem boilerplate de subscribe/unsubscribe
- **Performático**: Change Detection granular
- **Previsível**: comportamento síncrono e rastreável

Nos próximos posts vou explorar como usar Signals com formulários reativos e rotas. Fique ligado!
