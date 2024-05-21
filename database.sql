CREATE TABLE "user"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");
CREATE TABLE "board"(
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "columns" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "board" ADD PRIMARY KEY("id");
CREATE TABLE "task"(
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "order" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "task" ADD PRIMARY KEY("id");
ALTER TABLE
    "task" ADD CONSTRAINT "task_columnid_foreign" FOREIGN KEY("columnId") REFERENCES "board"("columns");
ALTER TABLE
    "task" ADD CONSTRAINT "task_boardid_foreign" FOREIGN KEY("boardId") REFERENCES "board"("id");
ALTER TABLE
    "task" ADD CONSTRAINT "task_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");


insert into user(name, email, password) values('Umidjon', 'umidjon@gmail.com', 'umidjon12345');