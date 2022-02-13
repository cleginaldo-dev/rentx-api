import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  await getConnectionOptions();
  return createConnection();
};
