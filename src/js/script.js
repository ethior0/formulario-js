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
    const camposValidos = this.senhasSaoValidas();
    const senhasValidas = this.camposSaoValidos();

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
      }

      if (campo.classList.contains("nome") || campo.classList.contains("sobrenome")) {
        valid = this.validaNomeSobrenome(campo, label);
      }

      if (campo.classList.contains("cpf")) {

      }

      if (campo.classList.contains("email")) {
        
      }
    }

    return valid;
  }

  senhasSaoValidas() {

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