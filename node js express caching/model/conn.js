import knex from "knex"

const mysqlConn = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'belajar_caching'
    }
});

export default mysqlConn;