
-- Database Script
-- @author Siddique Muhammad

-- Base de dades: 'angular'
CREATE DATABASE IF NOT EXISTS nodee DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE node;

-- --------------------------------------------------------

-- Table structure for users
DROP TABLE IF EXISTS userss;
CREATE TABLE IF NOT EXISTS userss (
  id int(11) NOT NULL,
  username varchar(200) NOT NULL,
  password varchar(200) NOT NULL,
  role varchar(50) NOT NULL,
  name varchar(255) NOT NULL,
  age int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE userss ADD PRIMARY KEY (id);
ALTER TABLE userss MODIFY id int(11) NOT NULL AUTO_INCREMENT;

-- Estructura de la taula 'books'
DROP TABLE IF EXISTS books;
CREATE TABLE IF NOT EXISTS books (
  id varchar(9) NOT NULL,
  name varchar(40) NOT NULL,
  description varchar(100) NOT NULL,
  price varchar(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE books MODIFY id int(11) NOT NULL AUTO_INCREMENT;



-- Bolcament de dades per a la taula 'userss'
INSERT INTO userss (id, username, password, role, name, age) VALUES
(1, 'user1', 'pass1', 'admin', 'Juan', 20),
(2, 'user2', 'pass2', 'staff', 'Marta', 24),
(3, 'user3', 'pass3', 'admin', 'Laura', 22),
(4, 'user4', 'pass4', 'staff', 'Pablo', 24),
(5, 'user5', 'pass5', 'admin', 'Marti', 21);


-- Bolcament de dades per a la taula 'books'
INSERT INTO books (id, name, description, price) VALUES
('4221', 'Petter Man', 'libro de accion', '20'),
('5425', 'Spider man', 'libro de aventura', '32'),
('3443', 'La oveja', 'cuento para niños', '23'),
('4343', 'Tecnologia i ciencia', 'libro de aprendizaje', '10');
