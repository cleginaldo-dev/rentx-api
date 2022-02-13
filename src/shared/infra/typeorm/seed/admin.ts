import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, username, email, password, "admin", created_at, driver_license )
    values('${id}', 'admin', 'rentxAdmin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXX-XXXX')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created"));
