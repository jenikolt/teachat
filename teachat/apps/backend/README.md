## Требование к разработке:
- версия среды: 20.9.0
- субд: Postgres 15.1
- фреймворк: NestJS

### Локальная разработка

- Для установки зависимостей `npm install --legacy-peer-deps`
- Запуск базы данных `docker-compose up -d`
- Запуск дев сборки `npm run start:backend:dev`

### Генерация миграции после изменения entities

В консоли из корня проекта выполнить команду:  
`npm run db:migration:generate src/database/migrations/<MigrationName>`  
Где `<MigrationName>` - имя миграции. Например, "CreateIndex".  
При необходимости отредактировать код миграции.
