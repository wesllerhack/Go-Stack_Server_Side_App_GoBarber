Comando para criar Migrations npm run typeorm -- migration:create -n CreateUsers

# Recuperação de senha

**RequisitosFuncionais**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve reveber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RequisitosNãoFuncionais**

- Utilizar Mailtrap para testar envios em ambientes dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background Job);

**RegrasdeNegocios**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualiza do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve indormar a senha antiga;
- para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um  novo agendamento.
- o prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador dever sem enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;


# Agendamento de serviço

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- o usuário deve poder listar os dias de um mês pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar um horário já ocupado;
- O usuáiro não pode agendar um horário que já passou;
- O usuário não pode agendar serviços com consigo mesmo;

