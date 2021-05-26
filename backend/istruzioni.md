### Per far partire il server PHP

*php -S localhost:8000*

### Per installare le dependecies all'interno di vendor

*php composer.phar install*

### Utente per accedere al DB

CREATE USER 'atmi'@'%localhost' IDENTIFIED WITH caching_sha2_password BY '***';
GRANT ALL PRIVILEGES ON *.* TO 'atmi'@'%localhost' WITH GRANT OPTION;
ALTER USER 'atmi'@'%localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0; 

#### Vincolo password nel database:

https://www.php.net/manual/en/function.password-hash.php

con PASSWORD_BCRYPT

#### Da aggiungere a file .sql per importare il db

CREATE DATABASE ATMI CHARACTER SET utf8 COLLATE utf8_general_ci;
USE ATMI;