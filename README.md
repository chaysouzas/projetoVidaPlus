# Vida Plus

Sistema de gestão hospitalar com acesso por perfis (paciente, profissional de saúde e administrador), cobrindo agendamento de consultas, telemedicina, prontuário eletrônico, exames, gestão de leitos e unidades.

## Funcionalidades por perfil

**Paciente**
- Visão geral com próximas consultas
- Agendamento de consultas
- Teleconsulta
- Prontuário e exames

**Profissional de saúde**
- Dashboard com agenda do dia e pacientes recentes
- Cadastro de pacientes
- Agenda
- Teleconsulta
- Lista de prontuários

**Administrador**
- Visão geral da rede (leitos, profissionais)
- Gestão de pacientes e profissionais
- Cadastro de profissionais
- Gestão de unidades

## Tecnologias

- [React 19](https://react.dev) + [React DOM 19](https://react.dev)
- [Vite 8](https://vite.dev) com [@vitejs/plugin-react](https://vite.dev)
- [TypeScript 5.7](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- [Lucide React](https://lucide.dev) para ícones

## Como rodar

```bash
npm install
npm run dev
```

O servidor sobe por padrão na porta `8443` (configurável via variável de ambiente `PORT`).


## Estrutura do projeto

```
src/
  main.tsx        # entrypoint React
  App.tsx         # componente principal e roteamento por perfil
  index.css       # entrypoint global de CSS / Tailwind
  components/     # componentes compartilhados (Layout, Logo, Badge)
  pages/          # páginas por funcionalidade
  data/           # dados mock (pacientes, profissionais, consultas, exames, leitos)
  hooks/          # hooks compartilhados
```

## Acesso ao sistema

O login é validado contra um conjunto de credenciais de demonstração (dados mock, sem backend):

| Perfil | E-mail | Senha |
|---|---|---|
| Paciente | paciente@vidaplus.com | 123456 |
| Profissional | medico@vidaplus.com | 123456 |
| Administrador | admin@vidaplus.com | 123456 |

[Link de acesso](https://chaysouzas.github.io/projetoVidaPlus/)
