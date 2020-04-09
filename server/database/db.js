import pool from './connect';
export const Createtables = () => {
  const Users = `CREATE TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY,email VARCHAR(30) UNIQUE NOT NULL,password VARCHAR(300) NOT NULL,
    username VARCHAR(20) NOT NULL,
      createdOn TIMESTAMP NOT NULL  DEFAULT NOW()
    )`;
  const Images = `CREATE TABLE IF NOT EXISTS
  images(
    id SERIAL PRIMARY KEY,
    url VARCHAR(200) UNIQUE NOT NULL,
    snippet VARCHAR(10),
    context VARCHAR(200),
    photographer VARCHAR(20),
    createdOn TIMESTAMP NOT NULL  DEFAULT NOW()
  )
  `;
  const Queries = `${Users};${Images}`;
  pool
    .query(Queries)
    .then((res) => {
      pool.end();
      console.log(res);
    })
    .catch((err) => {
      pool.end();
      console.log(err);
    });
};
export const Droptables = () => {
  const Users = 'DROP TABLE IF EXISTS users CASCADE';
  const Images = 'DROP TABLE IF EXISTS images CASCADE';
  const Queries = `${Users};${Images}`;
  pool
    .query(Queries)
    .then((res) => {
      pool.end();
      console.log(res);
    })
    .catch((err) => {
      pool.end();
      console.log(err);
    });
  pool.on('removed', () => {
    process.exit();
  });
};
export const DefaultImages = () => {
  const image1 = `INSERT INTO images(url,snippet,context,photographer) VALUES('https://i.picsum.photos/id/936/200/300.jpg','youtube','Learn to code','Steve Jobs'
) ON CONFLICT DO NOTHING returning *`;
  const image2 = `INSERT INTO images(url,snippet,context,photographer) VALUES('https://i.picsum.photos/id/629/200/200.jpg','youtube','Learn to code','Steve Jobs'
) ON CONFLICT DO NOTHING returning *`;
  const image3 = `INSERT INTO images(url,snippet,context,photographer) VALUES('https://media.inquirer.com/storage/inquirer/projects/year-in-pictures-2019/photos/POY2019_RedC.JPG','youtube','Learn to code','Steve Jobs'
) ON CONFLICT DO NOTHING returning *`;
  const Queries = `${image1};${image2};${image3}`;
  pool
    .query(Queries)
    .then((res) => {
      pool.end();
      console.log('res', res);
    })
    .catch((err) => {
      pool.end();
      console.log('error', err);
    });
};
require('make-runnable');
