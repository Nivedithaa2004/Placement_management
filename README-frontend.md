# Placement Management - Frontend (static) + PostgreSQL

Frontend is located at:
- `src/main/resources/static/index.html`

It calls backend endpoints:
- `POST /addplacement`
- `GET /getplacement`
- `GET /getplacement/{id}`
- `PUT /updateplacement`
- `DELETE /deleteplacement/{id}`

## Run
Start the Spring Boot backend:
```bash
mvnw spring-boot:run
```
Then open the frontend at:
- `http://localhost:8083/`

