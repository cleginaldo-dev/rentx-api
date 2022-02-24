# Cadastro de carro

**Requisitos Funcionais** </br>
* Deve se possivel cadastrar um novo carro.</br>

**Requisitos não Funcionais** </br>

**Regras de Negocio** </br>
* Não deve ser possivel cadastrar um carro com uma placa já existente.</br>
* O carro deve ser cadastrado por padrão como disponível.</br>
* O usuário responsável pelo cadastro deve ser um administrador.</br>

# Atualizar cadastro de carro

**Requisitos Funcionais** </br>
* Deve se possivel o cadastro de um carro.</br>

**Requisitos não Funcionais** </br>

**Regras de Negocio** </br>
* Não deve ser possivel alterar um carro inexistente.</br>
* Não deve ser possivel alterar a placa de um carro já cadastrado.</br>

# Listagem de carros

**Requisitos Funcionais** </br>
* Deve ser possível listar todos os carros disponiveis.</br>
* Deve ser possível listar todos os carros disponiveis pelo nome da categoria.</br>
* Deve ser possível listar todos os carros disponiveis pelo nome da marca.</br>
* Deve ser possível listar todos os carros disponiveis pelo nome do carro.</br>

**Requisitos não Funcionais** </br>
* O usuário não precisa estar logado no sistema.</br>

**Regras de Negocio** </br>

# Cadastro de especificação no carro

**Requisitos Funcionais** </br>
* Deve ser possível cadastrar uma especificação para um carro.</br>

**Requisitos não Funcionais** </br>

**Regras de Negocio** </br>
* Não deve ser possível cadastratar uma especificação para um carro não cadastrado.</br>
* Não deve ser possível cadastratar uma especificação já existente para o mesmo carro.</br>
* O usuário responsável pelo cadastro deve ser um administrador.</br>

# Cadastro de imagens do carro

**Requisitos Funcionais** </br>
* Deve ser possível cadastrar uma imagem do carro.</br>

**Requisitos não Funcionais** </br>
* Utilizar o Multer para uploads de arquivos

**Regras de Negocio** </br>
* O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.</br>
* O usuário responsável pelo cadastro deve ser um administrador.</br>

# Aluguel de carro

**Requisitos Funcionais** </br>
* Deve ser possível cadastrar um aluguel.</br>

**Requisitos não Funcionais** </br>

**Regras de Negocio** </br>
* O aluguel deve ter duração mínima de 24 horas.</br>
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.</br>
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.</br>
* O usuário deve estar logado na aplicação.</br>
* Ao realizar um aluguel, o status do carro deverá ser alterado para indisponivel.</br>
# Devolução de carro

**Requisitos Funcionais** </br>
* Deve ser possível realizar a devolução de um carro.</br>

**Requisitos não Funcionais** </br>

**Regras de Negocio** </br>
* Se o carro for devolvido com menos de 24 horas, deverá ser cobrado uma diaria completa.</br>
* Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.</br>
* Ao realizar a devolução, o usuario deverá ser liberado para outro aluguel.</br>
* Ao realizar a devolução, deverá ser calculado o totatl do aluguel.</br>
* Caso o horaŕio de devolução sejá superior ao horário previsto de entrega deverá ser cobrado multa proporcional aos dias de atrazo.</br>
* Caso haja multa deverá ser somado ao total do aluguel.</br>
* O usuário deve estar logado na aplicação.</br>
# Listagem de alugueis para usuário

**Requisitos Funcionais** </br>
* Deve ser possível realizar a busca de todos os alugueis para o usuário.</br>

**Regras de Negocio** </br>
* O usuário deve estar logado na aplicação.</br>
# Recuperar senha de usuário

**Requisitos Funcionais** </br>
* Deve ser possível o usuário recuperar a senha informando o email.</br>
* O usuário deve receber um email com o passo a passo para a recuperação da senha.</br>
* O usuário deve conseguir inserir uma nova senha.</br>

**Regras de Negocio** </br>
* O usuário precisa informar uma nova senha.</br>
* O link enviado para a recuperação deve expirar em 3 horas.</br>




