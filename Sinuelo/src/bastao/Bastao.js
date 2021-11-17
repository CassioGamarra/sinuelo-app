export default class Bastao {

  static instancia = null;

  _bastao = null;

  static createInstance() {
    const object = new Bastao();
    return object;
  }

  static getInstance() {
    if(!Bastao.instancia) {
      Bastao.instancia = Bastao.createInstance();
    }
    return Bastao.instancia;
  }

  getBastao() {
    return this._bastao;
  }

  setBastao(bastao) {
    this._bastao = bastao;
  } 
}