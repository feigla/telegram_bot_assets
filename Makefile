build:
	docker-compose build
up:
	docker-compose up
down:
	docker-compose down
rm:
	docker-compose rm
migrate:
	docker-compose exec main npm run migrate