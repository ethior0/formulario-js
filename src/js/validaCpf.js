class ValidaCpf {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D/g, "")
    });
  }

  geraNovoCpf() {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    const digito1 = this.geraDigito(cpfSemDigitos);
    const digito2 = this.geraDigito(cpfSemDigitos + digito1);

    this.novoCpf = cpfSemDigitos + digito1 + digito2;
  }

  geraDigito(cpfParcial) {
    let reverso = cpfParcial.length + 1;

    const arrayDigitos = Array.from(cpfParcial).reduce((ac, v) => {
      ac += Number(v) * reverso;
      reverso--;
      return ac;
    }, 0);
    const digitoFinal = 11 - (arrayDigitos % 11);

    return digitoFinal > 9 ? "0" : String(digitoFinal);
  }

  isSequencia() {
    return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
  }

  valida() {
    if (!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== "string") return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;
    this.geraNovoCpf();

    return this.novoCpf === this.cpfLimpo;
  }
}

// const cpf01 = new ValidaCpf("997.043.520-50");
// console.log(cpf01.valida());