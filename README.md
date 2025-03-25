# teachat
учебный пробный проект


### Основные компоненты технического задания MVP Учебного чата.

1. **Введение и общие сведения:**
   - **Цель документа:** Описание цели создания ТЗ и его назначение.
   - **Общие сведения о проекте:** Чат. Для загрузки страниц HTTPS, для обмена сообщениями websocket. Бэк на node, как фреймворк nestjs. База данных - postgress. Фронт на react, react native, vue. и.т.д. любой другой Фреймворк для фронта. Обмен только текстовыми сообщениями. Приватные и групповые чаты. Регистрация, управление пользователями. Поиск по групповым чатам, поиск пользователей. Фронт представлен в нескольких независимых вариантах реализации. Сборщики vite. Тесты. Проект должен подниматься в докере. Сборка и управление монорепой осуществляется с помощью NX.

2. **Область применения:**
   - **Описание области, в которой будет использоваться продукт или проект.**
   - **Целевая аудитория:** Кто будет использовать продукт или проект. Все желающие.

3. **Цели и задачи проекта:**
   - **Основные цели:** Поучаствовать в разработке опенсорсного миниприложения.
   - **Задачи:** Изучить технологии, использованные в разработке.

4. **Функциональные требования:**
   - **Описание функций и возможностей продукта или проекта.**
   - **Сценарии использования:** 
   - Регистрация учётной записи.
   - Поиск других участников для создания приватного чата.
   - Поиск других групп для подключения к групповому чату.
   - Создание группового чата.
   - Добавлять \ удалять участников группового чата. <-админ чата
   - Обмениваться сообщениями
   - поиск по тексу в чате.


4. **Технические требования:**
   - **Требования к аппаратному и программному обеспечению.** Docker.
   - **Требования к производительности, безопасности, надежности и совместимости.** Запуск на мобилке и десктопе. 
   
4. **Критерии приемки:**
   - **Условия, при которых проект считается успешно завершенным.**
   - **Тесты и проверки, которые необходимо провести для подтверждения соответствия требованиям.** Главное что функционал был реализован минимально и работало хотябы локально.

7. **Сроки и этапы выполнения:**
   - **План-график проекта с указанием основных этапов и сроков их выполнения.**
   - **Вехи проекта:** Готовность бэка, для возможности работы над фронтом.

8. **Бюджет и ресурсы:**
   - **Оценка затрат на реализацию проекта.**
   - **Необходимые ресурсы (человеческие, материальные, финансовые).** - хотябы пару часов в неделю.

9. **Ответственность сторон:**
   - **Обязанности заказчика и исполнителя.**
   - **Процедуры взаимодействия и коммуникации между сторонами.** - Собранность и целеустремлённость.

10. **Приложения и дополнительные материалы:**
    - **Дополнительные документы, схемы, диаграммы, которые могут помочь в понимании требований.**


### Далее промт для deepseek:
Как senior full stack разработчик. Опиши структуру backend части приложения для текстового чата. Используй postgresql, nestjs, websocket. Запускаться приложение должно в docker. Функционал чата: 
- Регистрация учётной записи (без email)
- Поиск других участников для создания приватного чата.
- Поиск других групп для подключения к групповому чату.
- Создание группового чата.
- Добавлять, удалять участников группового чата (может создатель группового чата)
- Обмениваться сообщениями в чатах.
- поиск по тексу в чате.
- администратор может удалять пользователей.
Составь схему базы данных. Опиши структуру приложения. Опиши по шагам этапы реализации.

\boxed{```markdown
## Структура Backend части приложения для текстового чата

### Технологический стек:
- **PostgreSQL**: база данных.
- **NestJS**: фреймворк для создания серверных приложений на Node.js.
- **WebSocket**: протокол для двусторонней связи между клиентом и сервером в реальном времени.

### Функционал чата:
1. Регистрация учётной записи (без email).
2. Поиск других участников для создания приватного чата.
3. Поиск других групп для подключения к групповому чату.
4. Создание группового чата.
5. Добавление и удаление участников группового чата (только создателем группового чата).
6. Обмен сообщениями в чатах.
7. Поиск по тексту в чате.
8. Администратор может удалять пользователей.

### Схема базы данных

#### Таблицы:
1. `users` - таблица для хранения информации о пользователях.
2. `chats` - таблица для хранения информации о чатах (приватных и групповых).
3. `chat_participants` - таблица для связи пользователей с чатами.
4. `messages` - таблица для хранения сообщений в чатах.
5. `admins` - таблица для хранения администраторов (если администраторы - это отдельная роль, можно добавить поле `is_admin` в таблицу `users`).

#### Подробная схема базы данных:

##### Таблица `users`:
- `id` (UUID или SERIAL PRIMARY KEY)
- `username` (VARCHAR, UNIQUE)
- `password` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `is_admin` (BOOLEAN, DEFAULT FALSE)

##### Таблица `chats`:
- `id` (UUID или SERIAL PRIMARY KEY)
- `name` (VARCHAR, может быть NULL для приватных чатов)
- `is_group` (BOOLEAN, указывает, является ли чат групповым)
- `created_by` (UUID или INTEGER, FOREIGN KEY REFERENCES `users(id)`)
- `created_at` (TIMESTAMP)

##### Таблица `chat_participants`:
- `id` (UUID или SERIAL PRIMARY KEY)
- `chat_id` (UUID или INTEGER, FOREIGN KEY REFERENCES `chats(id)`)
- `user_id` (UUID или INTEGER, FOREIGN KEY REFERENCES `users(id)`)
- `joined_at` (TIMESTAMP)

##### Таблица `messages`:
- `id` (UUID или SERIAL PRIMARY KEY)
- `chat_id` (UUID или INTEGER, FOREIGN KEY REFERENCES `chats(id)`)
- `user_id` (UUID или INTEGER, FOREIGN KEY REFERENCES `users(id)`)
- `content` (TEXT)
- `sent_at` (TIMESTAMP)

### Структура приложения на NestJS

#### Модули:
1. `UsersModule` - отвечает за регистрацию, аутентификацию и управление пользователями.
2. `AuthModule` - отвечает за аутентификацию и авторизацию пользователей (JWT).
3. `ChatsModule` - отвечает за управление чатами (создание, поиск, добавление участников).
4. `MessagesModule` - отвечает за отправку и получение сообщений.
5. `WebSocketModule` - отвечает за обработку WebSocket соединений для обмена сообщениями в реальном времени.

#### Шаги реализации:

##### 1. Настройка проекта NestJS:
   - Установить NestJS CLI и создать новый проект.
   - Установить необходимые пакеты, такие как `@nestjs/websockets`, `@nestjs/jwt`, `typeorm`, `pg`, `bcrypt` и другие.

##### 2. Настройка TypeORM и PostgreSQL:
   - Настроить подключение к базе данных PostgreSQL через TypeORM.
   - Создать сущности для таблиц `users`, `chats`, `chat_participants`, `messages`.

##### 3. Реализация `UsersModule`:
   - Создать контроллеры и сервисы для регистрации пользователей (без email, только username и password).
   - Реализовать поиск пользователей по username для создания приватных чатов.
   - Добавить функционал для администраторов (например, удаление пользователей).

##### 4. Реализация `AuthModule`:
   - Реализовать аутентификацию пользователей через JWT.
   - Создать guard для проверки JWT токена в запросах.

##### 5. Реализация `ChatsModule`:
   - Создать контроллеры и сервисы для создания чатов (приватных и групповых).
   - Реализовать поиск групповых чатов по названию.
   - Реализовать добавление и удаление участников в групповых чатах (только для создателя чата).

##### 6. Реализация `MessagesModule`:
   - Создать контроллеры и сервисы для отправки и получения сообщений.
   - Реализовать поиск сообщений по тексту в конкретном чате.

##### 7. Реализация `WebSocketModule`:
   - Создать шлюз (Gateway) для обработки WebSocket соединений.
   - Реализовать обмен сообщениями в реальном времени через WebSocket.

##### 8. Настройка Docker:
   - Создать `Dockerfile` для NestJS приложения.
   - Создать `docker-compose.yml` для запуска приложения вместе с PostgreSQL.

### Пример `Dockerfile` для NestJS приложения:
```Dockerfile
# Установка базового образа Node.js
FROM node:16

# Создание директории приложения
WORKDIR /usr/src/app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование остальных файлов приложения
COPY . .

# Сборка приложения
RUN npm run build

# Запуск приложения
CMD [ "npm", "run", "start:prod" ]
```

### Пример `docker-compose.yml`:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/chat_app
  db:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: chat_app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Детали реализации

#### 1. Регистрация учётной записи (без email):
   - Пользователь предоставляет `username` и `password`.
   - Пароль хэшируется с помощью `bcrypt` и сохраняется в таблице `users`.

#### 2. Поиск других участников для создания приватного чата:
   - Пользователь может искать других пользователей по `username`.
   - Если пользователь найден, можно создать новый чат (если его еще нет) и добавить обоих пользователей в `chat_participants`.

#### 3. Поиск других групп для подключения к групповому чату:
   - Пользователь может искать групповые чаты по названию (поле `name` в таблице `chats`).
   - Если пользователь находит групповой чат, он может запросить присоединение (если это разрешено политикой чата).

#### 4. Создание группового чата:
   - Пользователь предоставляет название чата и создает новый чат с флагом `is_group` равным `true`.
   - Создатель чата автоматически добавляется в `chat_participants`.

#### 5. Добавление и удаление участников группового чата:
   - Только создатель чата может добавлять и удалять участников из группового чата.
   - Для добавления участника в `chat_participants` добавляется запись с `chat_id` и `user_id`.
   - Для удаления участника соответствующая запись удаляется из `chat_participants`.

#### 6. Обмен сообщениями в чатах:
   - Пользователь отправляет сообщение в чат, которое сохраняется в таблице `messages` с `chat_id`, `user_id` и `content`.
   - Сообщения доставляются другим участникам чата через WebSocket.

#### 7. Поиск по тексту в чате:
   - Пользователь может выполнять поиск по тексту сообщений в конкретном чате (используя SQL-запросы с `LIKE` или полнотекстовый поиск).

#### 8. Администратор может удалять пользователей:
   - Пользователи с флагом `is_admin` могут удалять других пользователей из системы.
   - При удалении пользователя, все связанные записи (например, в `chat_participants` и `messages`) должны быть обработаны (например, удалены или помечены как "удаленный пользователь").

### Примеры кода (кратко):

#### Сущность `User`:
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

#### Сущность `Chat`:
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: false })
  is_group: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @CreateDateColumn()
  created_at: Date;
}
```

#### Сущность `ChatParticipant`:
```typescript
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from './user.entity';

@Entity()
export class ChatParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chat)
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  joined_at: Date;
}
```

#### Сущность `Message`:
```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chat)
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  sent_at: Date;
}
```

#### WebSocket Gateway:
```typescript
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): void {
    this.server.emit('message', data);
  }
}
```

Этот план и структура должны помочь в реализации backend части приложения для текстового чата с использованием PostgreSQL, NestJS и WebSocket, запускаемого в Docker.
```}
