export default {
  test: {
    client: "mysql",
    pool: {
      min: 2,
      max: 10
    },
    connection: {
      host: process.env.MARIADB_HOST,
      port: 3306,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE
    }
  },
  development: {
    client: "mysql",
    pool: {
      min: 2,
      max: 10
    },
    connection: {
      host: process.env.MARIADB_HOST,
      port: 3306,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE
    }
  },
  production: {
    client: "mysql",
    pool: {
      min: 2,
      max: 10
    },
    connection: {
      host: process.env.MARIADB_HOST,
      port: 3306,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE
    }
  }
};
