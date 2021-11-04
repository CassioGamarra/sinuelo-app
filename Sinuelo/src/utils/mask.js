export const pesoMask = value => {
  return value
      .replace(/\D/g, '')
      .replace(/(\d{1})(\d{14})$/,'$1.$2')
      .replace(/(\d{1})(\d{11})$/,'$1.$2')
      .replace(/(\d{1})(\d{8})$/,'$1.$2')
      .replace(/(\d{1})(\d{5})$/,'$1.$2') 
      .replace(/(\d{1})(\d{1,2})$/,'$1,$2')
}
