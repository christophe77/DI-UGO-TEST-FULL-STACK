<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240925134815 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__customer AS SELECT customer_id, title, lastname, firstname, postal_code, city, email FROM customer');
        $this->addSql('DROP TABLE customer');
        $this->addSql('CREATE TABLE customer (customer_id INTEGER NOT NULL, title INTEGER NOT NULL, lastname VARCHAR(255) DEFAULT NULL, firstname VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, PRIMARY KEY(customer_id))');
        $this->addSql('INSERT INTO customer (customer_id, title, lastname, firstname, postal_code, city, email) SELECT customer_id, title, lastname, firstname, postal_code, city, email FROM __temp__customer');
        $this->addSql('DROP TABLE __temp__customer');
        $this->addSql('CREATE TEMPORARY TABLE __temp__order AS SELECT purchase_identifier, customer_id, product_id, quantity, price, currency, date FROM "order"');
        $this->addSql('DROP TABLE "order"');
        $this->addSql('CREATE TABLE "order" (purchase_identifier VARCHAR(255) NOT NULL, customer_id INTEGER NOT NULL, product_id INTEGER NOT NULL, quantity INTEGER NOT NULL, price INTEGER NOT NULL, currency VARCHAR(255) NOT NULL, date VARCHAR(255) NOT NULL, PRIMARY KEY(purchase_identifier))');
        $this->addSql('INSERT INTO "order" (purchase_identifier, customer_id, product_id, quantity, price, currency, date) SELECT purchase_identifier, customer_id, product_id, quantity, price, currency, date FROM __temp__order');
        $this->addSql('DROP TABLE __temp__order');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__customer AS SELECT customer_id, title, lastname, firstname, postal_code, city, email FROM customer');
        $this->addSql('DROP TABLE customer');
        $this->addSql('CREATE TABLE customer (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, customer_id INTEGER NOT NULL, title INTEGER NOT NULL, lastname VARCHAR(255) DEFAULT NULL, firstname VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL)');
        $this->addSql('INSERT INTO customer (customer_id, title, lastname, firstname, postal_code, city, email) SELECT customer_id, title, lastname, firstname, postal_code, city, email FROM __temp__customer');
        $this->addSql('DROP TABLE __temp__customer');
        $this->addSql('CREATE TEMPORARY TABLE __temp__order AS SELECT purchase_identifier, customer_id, product_id, quantity, price, currency, date FROM "order"');
        $this->addSql('DROP TABLE "order"');
        $this->addSql('CREATE TABLE "order" (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, purchase_identifier VARCHAR(255) NOT NULL, customer_id INTEGER NOT NULL, product_id INTEGER NOT NULL, quantity INTEGER NOT NULL, price INTEGER NOT NULL, currency VARCHAR(255) NOT NULL, date VARCHAR(255) NOT NULL)');
        $this->addSql('INSERT INTO "order" (purchase_identifier, customer_id, product_id, quantity, price, currency, date) SELECT purchase_identifier, customer_id, product_id, quantity, price, currency, date FROM __temp__order');
        $this->addSql('DROP TABLE __temp__order');
    }
}
