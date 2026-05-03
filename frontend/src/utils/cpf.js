/** Apenas dígitos, no máximo 11. */
export function cpfDigits(value) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 11)
}

/** Formato visual 000.000.000-00 */
export function formatCpfMasked(value) {
  const d = cpfDigits(value)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

/**
 * Valida dígitos verificadores do CPF (11 dígitos numéricos).
 * Rejeita sequências inválidas conhecidas (ex.: 11111111111).
 */
export function isValidCpf(digits) {
  const d = cpfDigits(digits)
  if (d.length !== 11) return false
  if (/^(\d)\1{10}$/.test(d)) return false

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(d[i]) * (10 - i)
  }
  let mod = soma % 11
  const d10 = mod < 2 ? 0 : 11 - mod
  if (d10 !== Number(d[9])) return false

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(d[i]) * (11 - i)
  }
  mod = soma % 11
  const d11 = mod < 2 ? 0 : 11 - mod
  return d11 === Number(d[10])
}
