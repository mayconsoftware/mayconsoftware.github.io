import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TechCategory {
  name: string;
  icon: string;
  items: TechItem[];
}

interface TechItem {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate';
  description: string;
  icon?: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  categories: TechCategory[] = [
    {
      name: 'Frontend',
      icon: '🖥️',
      items: [
        { name: 'Angular', level: 'expert', description: 'Framework principal — versões 2+ até v19. Standalone components, signals, SSR.' },
        { name: 'TypeScript', level: 'expert', description: 'Tipagem estática, decorators, generics e padrões de design orientados a tipo.' },
        { name: 'RxJS', level: 'advanced', description: 'Programação reativa, observables, operadores e composição de streams.' },
        { name: 'SCSS / CSS', level: 'advanced', description: 'Design systems, CSS custom properties, animações e layouts responsivos.' },
        { name: 'JavaScript', level: 'expert', description: 'ES2022+, async/await, módulos ESM e padrões modernos.' },
      ]
    },
    {
      name: 'Backend & Infra',
      icon: '⚙️',
      items: [
        { name: 'Node.js', level: 'advanced', description: 'APIs REST, WebSocket, autenticação JWT e integração com bancos de dados.' },
        { name: 'Python', level: 'intermediate', description: 'Scripts de automação, integrações com IoT e processamento de dados.' },
        { name: 'Docker', level: 'advanced', description: 'Containerização de aplicações e orquestração com Docker Compose.' },
        { name: 'GitHub Actions', level: 'advanced', description: 'CI/CD pipelines, deploy automatizado e verificações de qualidade.' },
        { name: 'Linux', level: 'advanced', description: 'Administração de servidores, shell scripting e automação de tarefas.' },
      ]
    },
    {
      name: 'Smart Home & IoT',
      icon: '🏠',
      items: [
        { name: 'Home Assistant', level: 'expert', description: 'Plataforma de automação residencial — integrações, scripts, dashboards e automações avançadas.' },
        { name: 'MQTT', level: 'advanced', description: 'Protocolo de mensagens para IoT, brokers Mosquitto e integração com dispositivos.' },
        { name: 'Zigbee', level: 'advanced', description: 'Protocolo de comunicação para dispositivos de baixa energia e smart home.' },
        { name: 'Matter / Thread', level: 'intermediate', description: 'Protocolo unificado para smart home, interoperabilidade entre ecossistemas.' },
        { name: 'ESPHome', level: 'intermediate', description: 'Firmware personalizado para microcontroladores ESP32/ESP8266 com YAML.' },
      ]
    },
    {
      name: 'Ferramentas',
      icon: '🛠️',
      items: [
        { name: 'Git & GitFlow', level: 'expert', description: 'Versionamento, branches estratégicas, PRs e code review.' },
        { name: 'VS Code', level: 'expert', description: 'Editor principal com extensões personalizadas e snippets.' },
        { name: 'Angular CLI', level: 'expert', description: 'Geração de código, build, serve, test e lint automáticos.' },
        { name: 'Postman / Insomnia', level: 'advanced', description: 'Teste e documentação de APIs REST e GraphQL.' },
      ]
    }
  ];

  levelLabel: Record<string, string> = {
    expert: 'Especialista',
    advanced: 'Avançado',
    intermediate: 'Intermediário'
  };

  levelColor: Record<string, string> = {
    expert: 'var(--color-success)',
    advanced: 'var(--color-primary)',
    intermediate: 'var(--color-accent)'
  };

  values = [
    { icon: '✨', title: 'Qualidade sobre velocidade', desc: 'Código limpo, testável e maintível.' },
    { icon: '🔄', title: 'Melhoria contínua', desc: 'Sempre aprendendo e aplicando o que há de melhor.' },
    { icon: '🤝', title: 'Colaboração', desc: 'Open source e comunidade como pilares do crescimento.' },
    { icon: '🏗️', title: 'Arquitetura sólida', desc: 'Decisões que escalam e resistem ao tempo.' },
  ];

  integrations = [
    { name: 'Alexa', icon: 'ha-integration-alexa.png' },
    { name: 'Anthropic', icon: 'ha-integration-anthropic.png' },
    { name: 'OpenAI', icon: 'ha-integration-openai.png' },
    { name: 'HomeKit', icon: 'ha-integration-apple_tv.png' },
    { name: 'Matter', icon: 'ha-integration-matter.png' },
    { name: 'Thread', icon: 'ha-integration-thread.png' },
    { name: 'SmartThings', icon: 'ha-integration-smartthings.png' },
    { name: 'Tuya', icon: 'ha-integration-tuya.png' },
    { name: 'Tapo', icon: 'ha-integration-tplink.png' },
    { name: 'Zigbee', icon: 'ha-integration-zha.png' },
    { name: 'Z-Wave', icon: 'ha-integration-zwave_js.png' },
    { name: 'MQTT', icon: 'ha-integration-mqtt.png' },
  ];
}
