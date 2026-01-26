// Конфигурация для react-snap (pre-rendering)
// Это позволит поисковикам видеть контент

export default {
  // Страницы для pre-rendering
  include: [
    "/"
  ],
  
  // Пропускать запросы к третьим сторонам
  skipThirdPartyRequests: true,
  
  // Не кешировать AJAX запросы
  cacheAjaxRequests: false,
  
  // Минимализировать HTML
  minifyHtml: {
    collapseWhitespace: false,
    removeComments: true,
  },
  
  // Настройки для работы с i18n
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  
  // Время ожидания загрузки страницы
  waitFor: 2000,
  
  // Игнорировать ошибки при pre-rendering
  removeStyleTags: false,
  removeScriptTags: false,
}






