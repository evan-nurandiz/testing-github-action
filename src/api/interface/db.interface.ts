export interface DBOptionsInterface {
    client: string,
    connection: {
      user: string,
      database: string,
      port: number,
      host: string,
      password: string
    },
    pool: {
      min: number,
      max: number,
    },
    schemaName: string | null
};
    