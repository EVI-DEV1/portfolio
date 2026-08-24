/** Converte '(12) 98231-9139' em https://wa.me/5512982319139 */
export function whatsappLink(number: string): string {
  const digits = number.replace(/\D/g, '').replace(/^55/, '')
  return digits ? `https://wa.me/55${digits}` : ''
}
