# Todo List back end poject

> 날짜, 태그를 기반으로 한 todo list api 프로젝트입니다.

## summary

날짜를 기반으로 한 todo list api.<br>
일정에 태그를 추가할 수 있는 것이 특징입니다.<br>
특정 일자, 혹은 특정 요일마다 반복되는 일정의 경우 루틴으로 등록할 수 있으며, 해당되는 날 자정에 자동으로 일정이 추가됩니다.<br>
동일한 내용으로 구성된 [Laravel 프로젝트](https://github.com/Y-Jean/todo)를 Node.js로 구현했습니다.<br>

## stack

- Framework: Express
- Cache Server: redis
- DBMS: postgreSQL
- ORM: Sequelize

## install(dev)

```bash
npm install
// .env 파일 생성
cp .env.example .env
// 데이터베이스 마이그레이션
npx babel-node node_modules/.bin/sequelize --config src/config/config.js --migrations-path src/migrations
// seed 생성 (선택사항)
npx babel-node node_modules/.bin/sequelize --config src/config/config.json --seeders-path src/seeders
// ES256 key pair 생성
openssl ecparam -name prime256v1 -genkey -noout -out src/config/keys/private.pem
openssl ec -in src/config/keys/private.pem -pubout -out src/config/keys/public.pem
// 개발환경으로 실행
npm run dev
```

## install(docker)
```bash
// .env 파일 생성
cp .env.example .env
docker compose build
docker compose up -d
// 데이터베이스 마이그레이션
docker compose exec todo-app npm run migrate
// seed 생성 (선택사항)
docker compose exec todo-app npm run seed
// ES256 key pair 생성
docker compose exec todo-app openssl ecparam -name prime256v1 -genkey -noout -out src/config/keys/private.pem
docker compose exec todo-app openssl ec -in src/config/keys/private.pem -pubout -out src/config/keys/public.pem
```