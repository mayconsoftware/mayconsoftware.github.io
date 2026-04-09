# Home Assistant: Automações Avançadas com Scripts e Blueprints

O Home Assistant é muito mais do que ligar e desligar luzes. Com **scripts**, **templates Jinja2** e **blueprints**, você pode criar automações sofisticadas que tornam sua casa verdadeiramente inteligente.

## Scripts vs Automações

Antes de mergulhar nos exemplos, é importante entender a diferença:

- **Automação**: reageo a um *trigger* (evento, estado, horário)
- **Script**: sequência de ações reutilizáveis, chamada por automações ou manualmente

```yaml
# script.yaml
modo_cinema:
  alias: "Modo Cinema"
  sequence:
    - service: light.turn_off
      target:
        area_id: sala
    - service: media_player.select_source
      target:
        entity_id: media_player.tv_sala
      data:
        source: "HDMI 1"
    - service: climate.set_temperature
      target:
        entity_id: climate.sala
      data:
        temperature: 23
```

## Templates Jinja2

O Jinja2 permite lógica dinâmica dentro do YAML:

```yaml
automation:
  - alias: "Luz adaptativa por hora"
    trigger:
      - platform: time_pattern
        minutes: "/30"
    action:
      - service: light.turn_on
        target:
          entity_id: light.sala
        data:
          brightness: >
            {% set hora = now().hour %}
            {% if hora < 6 or hora >= 22 %}
              50
            {% elif hora < 8 or hora >= 20 %}
              150
            {% else %}
              255
            {% endif %}
          color_temp: >
            {% set hora = now().hour %}
            {% if hora < 8 or hora >= 20 %}
              500
            {% else %}
              300
            {% endif %}
```

## Blueprints: Automações Reutilizáveis

Blueprints são templates de automação que podem ser compartilhados e instanciados com configurações diferentes:

```yaml
blueprint:
  name: "Luz por presença com timeout"
  description: "Liga a luz quando detectar presença e desliga após X minutos sem movimento"
  domain: automation
  input:
    sensor_presenca:
      name: Sensor de Presença
      selector:
        entity:
          domain: binary_sensor
          device_class: motion
    luz_alvo:
      name: Luz
      selector:
        entity:
          domain: light
    timeout_minutos:
      name: Timeout (minutos)
      default: 5
      selector:
        number:
          min: 1
          max: 60

trigger:
  - platform: state
    entity_id: !input sensor_presenca
    to: "on"
  - platform: state
    entity_id: !input sensor_presenca
    to: "off"
    for:
      minutes: !input timeout_minutos

action:
  - choose:
      - conditions:
          - condition: state
            entity_id: !input sensor_presenca
            state: "on"
        sequence:
          - service: light.turn_on
            target:
              entity_id: !input luz_alvo
      - conditions:
          - condition: state
            entity_id: !input sensor_presenca
            state: "off"
        sequence:
          - service: light.turn_off
            target:
              entity_id: !input luz_alvo
```

## Notificações Inteligentes

```yaml
automation:
  - alias: "Alerta de consumo energético"
    trigger:
      - platform: numeric_state
        entity_id: sensor.tomada_sala_power
        above: 2000
    condition:
      - condition: time
        after: "07:00:00"
        before: "23:00:00"
    action:
      - service: notify.mobile_app_meu_celular
        data:
          title: "⚡ Consumo Alto!"
          message: >
            A tomada da sala está consumindo
            {{ states('sensor.tomada_sala_power') }}W.
            Verifique o que está ligado.
          data:
            push:
              sound: "default"
              badge: 1
```

## Conclusão

O poder do Home Assistant está na combinação dessas ferramentas. Scripts encapsulam lógica, templates tornam tudo dinâmico, e blueprints permitem compartilhar e reutilizar suas melhores criações.

No próximo post, vou mostrar como integrar o Home Assistant com Zigbee2MQTT para controlar dezenas de dispositivos com custo mínimo.
