/**
 * true quando a página foi carregada em uma aba em segundo plano.
 *
 * Nesse cenário o navegador pausa o requestAnimationFrame e as
 * animações de entrada podem ficar presas no estado inicial
 * (conteúdo invisível, opacity 0). Quando isso acontece, os
 * componentes pulam a animação e renderizam o estado final —
 * quem abre a aba depois vê o site completo.
 */
export const loadedInBackground =
  typeof document !== 'undefined' && document.visibilityState === 'hidden'
