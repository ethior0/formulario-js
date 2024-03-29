class ValidandoCpf {
  constructor() {
    this.formulario = document.querySelector(".formulario");

    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if (camposValidos && senhasValidas) {
      alert("Deu bom...");
      // this.formulario.submit();
    }
  }

  camposSaoValidos() {
    let valid = true;

    for (let msgErro of this.formulario.querySelectorAll(".msgErro")) {
      msgErro.remove();
    }

    for (let campo of this.formulario.querySelectorAll(".validar")) {
      const label = campo.previousElementSibling.innerText;

      if (!campo.value) {
        valid = false;
        this.criaErro(campo, `O campo "${label}" está vazio.`);
      } else if (campo.classList.contains("nome") || campo.classList.contains("sobrenome")) {
        valid = this.validaNomeSobrenome(campo, label);
      } else if (campo.classList.contains("cpf")) {
        valid = this.validaCpf(campo);
      } else if (campo.classList.contains("email")) {
        valid = this.validaEmail(campo);
      }
    }

    return valid;
  }

  senhasSaoValidas() {
    let valid = true;
    const senha = this.formulario.querySelector(".senha");
    const repetirSenha = this.formulario.querySelector(".repetir-senha");

    if (senha.value.length < 6) {
      valid = false;
      this.criaErro(senha, `Campo "Senha" precisa ter no mínimo 6 caracteres.`);
    }
    if (repetirSenha.value.length < 6) {
      valid = false;
      this.criaErro(repetirSenha, `Campo "Confirmar senha" precisa ter no mínimo 6 caracteres.`);
    }
    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, `Campo "Senha" e "Confirmar senha" precisam ser iguais.`);
      this.criaErro(repetirSenha, `Campo "Senha" e "Confirmar senha" precisam ser iguais.`);
    }
    return valid;
  }

  validaNomeSobrenome(campo, label) {
    let valid = true;
    const valorCampo = campo.value;

    if (valorCampo.length >= 1 && valorCampo.length < 3) {
      valid = false;
      this.criaErro(campo, `O campo "${label}" precisa ter no mínimo 3 letras.`)
    }
    if (valorCampo.match(/[^A-ZÀ-ŸA-zÀ-ÿ\s]/g)) {
      valid = false;
      this.criaErro(campo, `O campo "${label}" precisa conter apenas letras.`);
    }

    return valid;
  }

  validaCpf(campo) {
    const validaCpf = new ValidaCpf(campo.value);

    if (validaCpf.cpfLimpo.length !== 11) {
      this.criaErro(campo, `O CPF deve conter 11 dígitos.`);
    } else if (!validaCpf.valida()) {
      this.criaErro(campo, `CPF inválido.`);
    }
    return validaCpf.valida();
  }

  validaEmail(campo) {
    let valid = true;
    const email = campo.value;
    const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!regexEmail.test(email)) {
      valid = false;
      this.criaErro(campo, `E-mail inválido.`);
    }

    return valid;
  }

  criaErro(campo, msg) {
    let msgErro = document.createElement("div");
    msgErro.innerText = msg;
    msgErro = this.addErrorStyle(msgErro);

    campo.insertAdjacentElement("afterend", msgErro);
  }

  addErrorStyle(el) {
    el.classList.add("msgErro", "text-sm", "text-red-400", "font-medium");
    return el;
  }
}

const iniciaValidacao = new ValidandoCpf();