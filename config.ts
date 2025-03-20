import * as sql from 'mssql';
export class Config {
  private static async createDatabase() {
    const sqlConfig = {
      server: process.env.SERVER,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      options: {
        trustServerCertificate: true,
        encrypt: true,
      },
    };

    try {
      await sql.connect(sqlConfig);
      await sql.query('use AppComentarios');
      const comentariosQuery = await sql.query(`Select * from dbo.Comentarios`);
      const comentarios = comentariosQuery.recordset;
      console.log({ comentarios });
    } catch (error) {
      console.error(error);
    }
  }

  static async runScript() {
    await this.createDatabase();
  }
}
