# Cadrastro de carro

**Requisitos Funcionais** ->
Deve se possivel cadastrar um novo carro.

**Requisitos não Funcionais** ->

**Regras de Negocio** ->
Não deve ser possivel cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado por padrão como disponível.
O usuário responsável pelo cadastro deve ser um administrador.

# Atualizar cadrastro de carro

**Requisitos Funcionais** ->
Deve se possivel o cadastro de um carro.

**Requisitos não Funcionais** ->

**Regras de Negocio** ->
Não deve ser possivel alterar um carro inexistente.
Não deve ser possivel alterar a placa de um carro já cadastrado.

# Listagem de carros

**Requisitos Funcionais** ->
Deve ser possível listar todos os carros disponiveis.
Deve ser possível listar todos os carros disponiveis pelo nome da categoria.
Deve ser possível listar todos os carros disponiveis pelo nome da marca.
Deve ser possível listar todos os carros disponiveis pelo nome do carro.

**Requisitos não Funcionais** ->
O usuário não precisa estar logado no sistema.

**Regras de Negocio** ->

# Cadastro de especificação no carro

**Requisitos Funcionais** ->
Deve ser possível cadastrar uma especificação para um carro.

**Requisitos não Funcionais** ->

**Regras de Negocio** ->
Não deve ser possível cadastratar uma especificação para um carro não cadastrado.
Não deve ser possível cadastratar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um administrador.

# Cadastro de imagens do carro

**Requisitos Funcionais** ->
Deve ser possível cadastrar uma imagem do carro.

**Requisitos não Funcionais** ->
Utilizar o Multer para uploads de arquivos

**Regras de Negocio** ->
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um administrador.

# Aluguel de carro

**Requisitos Funcionais** ->
Deve ser possível cadastrar um aluguel.

**Requisitos não Funcionais** ->

**Regras de Negocio** ->
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve estar logado na aplicação.
