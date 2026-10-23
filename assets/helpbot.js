/* SignalCheckerHQ help assistant: answers common questions from a fixed FAQ (no AI, no data sent anywhere).
   Language comes from <html lang>. Unanswered questions point to support@signalcheckerhq.org. */
(function () {
  if (window.__scHelp) return; window.__scHelp = 1;
  var L = (document.documentElement.lang || "en").slice(0, 2);
  if (["en", "es", "ru"].indexOf(L) < 0) L = "en";
  var P = L === "en" ? "/" : "/" + L + "/";
  var MAIL = '<a href="mailto:support@signalcheckerhq.org">support@signalcheckerhq.org</a>';
  var GUM = "https://5778611980656.gumroad.com/l/";

  var UI = {
    en: { btn: "Help", title: "Help · SignalCheckerHQ", hi: "Hi! I answer common questions about our Google Sheets tools. Pick a question or type your own.", ph: "Type a question…", send: "Send",
      miss: "I'm not sure about that one. Please email " + MAIL + " and a real person will answer, usually within 24 hours. Bought on Etsy? You can also message the shop there.", more: "Other questions", close: "Close" },
    es: { btn: "Ayuda", title: "Ayuda · SignalCheckerHQ", hi: "¡Hola! Respondo preguntas frecuentes sobre nuestras herramientas de Google Sheets. Elige una pregunta o escribe la tuya.", ph: "Escribe una pregunta…", send: "Enviar",
      miss: "No estoy seguro de eso. Escribe a " + MAIL + " y te responderá una persona, normalmente en menos de 24 horas. ¿Compraste en Etsy? También puedes escribir a la tienda allí.", more: "Otras preguntas", close: "Cerrar" },
    ru: { btn: "Помощь", title: "Помощь · SignalCheckerHQ", hi: "Здравствуйте! Я отвечаю на частые вопросы о наших инструментах в Google Таблицах. Выберите вопрос или напишите свой.", ph: "Напишите вопрос…", send: "Отправить",
      miss: "Здесь я не уверен. Напишите на " + MAIL + " — ответит живой человек, обычно в течение 24 часов. Покупали на Etsy? Можно также написать магазину там.", more: "Другие вопросы", close: "Закрыть" }
  }[L];

  /* Each entry: id, keyword stems (any language; prefix match), question chip text, answer HTML. */
  var K = {
   en: [
    ["which", ["which", "choose", "best", "recommend", "differen", "start", "need"], "Which tool should I choose?",
     "<b>Signal Checker</b> ($19): test a signal group's calls against real prices before you pay or follow.<br><b>Trade Journal + DCA Planner</b> ($15): track your own trades, win rate and DCA plans.<br><b>Portfolio Tracker</b> ($12): all your coins, average buy price and P&amp;L.<br><b>Risk Calculator</b> ($7): exact position size and risk.<br>All 4 together: <a href='" + P + "bundle/'>Complete Kit, $39</a>. Not sure yet? Try the <a href='" + P + "signal-checker-demo/'>free demo</a>."],
    ["price", ["price", "cost", "how much", "cheap", "discount", "coupon", "bundle", "kit"], "How much do the tools cost?",
     "Signal Checker $19 · Trade Journal + DCA Planner $15 · Portfolio Tracker $12 · Risk Calculator $7. Bundles: Toolkit (Signal Checker + Trade Journal) $29, <a href='" + P + "bundle/'>Complete Kit (all 4) $39</a>. One-time payment, no subscription."],
    ["copy", ["copy", "access", "open", "receive", "get the sheet", "download", "after buy", "after purchas", "how does it work", "how it work"], "How do I get my sheet after buying?",
     "Your download (a PDF on Etsy, or the Gumroad receipt) has your personal link. Click it, sign in to Google, and choose <b>Make a copy</b>. The sheet is now in your own Google Drive, with the script included."],
    ["key", ["key", "license", "licence", "activat", "unlock"], "Where is my license key?",
     "<b>Gumroad:</b> the key is on your Gumroad receipt and in your Gumroad library.<br><b>Etsy:</b> open your PDF, click <b>Get my license key</b> and enter your Etsy order number. For the Complete Kit choose <i>Complete Kit (all 4)</i>: one key works in every sheet.<br>The Risk Calculator needs no key. Paste the key when the sheet asks the first time you use it."],
    ["perm", ["permission", "authoriz", "unverified", "unsafe", "warning", "allow", "advanced", "google hasn"], "Google shows a permission warning. Is it safe?",
     "Yes. The first time a menu runs, Google asks you to allow the script: choose your account → <b>Advanced</b> → <b>Go to …</b> → <b>Allow</b>. The script only fetches public price data (Coinbase, KuCoin) and writes to your own copy. It can't see your other files or your exchange."],
    ["broken", ["not work", "doesn't work", "doesnt work", "broken", "error", "problem", "can't", "cant", "issue", "bug", "link"], "The link or sheet isn't working",
     "Try this first: open the link in a desktop browser (not the Sheets app) and make sure you're signed in to a Google account. If it still doesn't work, email " + MAIL + " with your order number and we'll fix it or refund you."],
    ["refund", ["refund", "money back", "return", "cancel"], "Can I get a refund?",
     "These are instant digital downloads, so they can't be returned. But if your copy link or license key doesn't work, email " + MAIL + " and we'll fix it or refund you. Purchases are also covered by Gumroad's and Etsy's buyer policies."],
    ["excel", ["excel", "software", "install", "mac", "windows", "numbers app", "libreoffice"], "Do I need Excel or any software?",
     "No. Everything runs in free Google Sheets in your browser. You only need a free Google account. Excel isn't supported, because the sheets use Google's scripts and live prices."],
    ["phone", ["phone", "mobile", "iphone", "android", "tablet", "app"], "Does it work on my phone?",
     "The Risk Calculator works fully in the Google Sheets phone app. The other sheets work best on a computer (menus and price refresh run there); the phone app can view the results."],
    ["exchange", ["exchange", "api", "binance", "bybit", "coinbase", "connect", "wallet", "sync"], "Do I need to connect my exchange?",
     "No. Nothing asks for exchange logins or API keys. You type or paste your data; prices come from public market data (Coinbase, with KuCoin as backup). Trades from any exchange or wallet work."],
    ["advice", ["advice", "signal", "tell me what", "buy", "profit guarant", "guarantee", "recommend coin"], "Do you sell signals or give advice?",
     "No. These tools measure and record. They never tell you what or when to trade, and nothing here is financial advice. Signal Checker <i>checks</i> other people's signals against real prices."],
    ["data", ["privacy", "data", "safe", "secure", "see my", "store", "track"], "Can you see my data?",
     "No. Your sheet lives in your own Google Drive. The only thing our license server receives is your key and an anonymous code for your copy, never the contents. Details: <a href='/legal/'>privacy policy</a>."],
    ["lang", ["language", "english", "spanish", "russian", "translat", "espa", "russ"], "Are the sheets in my language?",
     "The website is in English, Spanish and Russian. The sheets and their instructions are in English, with simple menus and labels. Questions in Spanish or Russian are welcome at " + MAIL + "."],
    ["lost", ["lost", "find", "again", "redownload", "re-download", "library", "purchase", "lost download", "lost the pdf", "lost my", "lost the", "can t find", "cant find"], "I lost my download. How do I find it?",
     "<b>Gumroad:</b> sign in at <a href='https://gumroad.com/library'>gumroad.com/library</a> with the email you used. <b>Etsy:</b> go to <i>You → Purchases and reviews</i> and download the file again. Your copied sheet stays in your Google Drive."],
    ["share", ["share", "friend", "team", "resell", "colleague", "two people", "multiple"], "Can I share the sheet?",
     "Each purchase is for one person's own use. You can make as many copies as you like for yourself, but please don't share or resell the sheet, its link or your key. Keys found in many copies are switched off."],
    ["free", ["free", "trial", "try", "demo", "lite", "cheat sheet", "calculator"], "Is there anything free?",
     "Yes: the <a href='" + P + "signal-checker-demo/'>Signal Checker demo</a> (3 signals), <a href='" + GUM + "signal-checker-lite'>Signal Checker Lite</a> (10 signals), <a href='" + P + "telegram-signal-checker/'>Telegram channel checker</a>, <a href='" + P + "tools/'>free calculators</a> (position size, DCA, profit, liquidation, risk of ruin, trading costs) and the <a href='" + GUM + "risk-cheat-sheet'>Crypto Risk Cheat Sheet</a> PDF."],
    ["tgcheck", ["telegram", "channel", "export", "whole group", "all calls", "history", "result.json"], "Can I check a whole Telegram channel?",
     "Yes, free: export the channel from <b>Telegram Desktop</b> (⋮ → Export chat history → format: Machine-readable JSON) and drop <b>result.json</b> on the <a href='" + P + "telegram-signal-checker/'>Telegram channel checker</a>. It finds every call, checks it against real prices (leverage and liquidations included) and never uploads your file. The latest 20 calls are free; a Signal Checker license key checks all of them."],
    ["prices", ["price data", "live price", "coinbase", "kucoin", "coin missing", "which coins", "update price", "refresh"], "Where do the prices come from?",
     "Hourly and live prices come from Coinbase, with KuCoin as backup for coins Coinbase doesn't list. Stablecoins count as $1. Use the sheet's menu to refresh prices; hourly auto-refresh can be switched on."],
    ["contact", ["contact", "human", "person", "email", "support", "talk", "help me"], "How do I contact a person?",
     "Email " + MAIL + ". A real person answers, usually within 24 hours. If you bought on Etsy, you can also message the shop there."]
   ],
   es: [
    ["which", ["cual", "elegir", "mejor", "recomiend", "diferenc", "empezar", "necesit"], "¿Qué herramienta elijo?",
     "<b>Signal Checker</b> ($19): pon a prueba las llamadas de un grupo de señales con precios reales antes de pagar o seguirlas.<br><b>Trade Journal + DCA Planner</b> ($15): registra tus operaciones, tasa de acierto y planes DCA.<br><b>Portfolio Tracker</b> ($12): todas tus monedas, precio medio y P&amp;L.<br><b>Risk Calculator</b> ($7): tamaño exacto de posición y riesgo.<br>Las 4 juntas: <a href='" + P + "bundle/'>Complete Kit, $39</a>. ¿Aún dudas? Prueba la <a href='" + P + "signal-checker-demo/'>demo gratis</a>."],
    ["price", ["precio", "cuesta", "cuanto", "descuento", "cupon", "paquete", "kit"], "¿Cuánto cuestan?",
     "Signal Checker $19 · Trade Journal + DCA Planner $15 · Portfolio Tracker $12 · Risk Calculator $7. Paquetes: Toolkit (Signal Checker + Trade Journal) $29, <a href='" + P + "bundle/'>Complete Kit (las 4) $39</a>. Pago único, sin suscripción."],
    ["copy", ["copia", "acceso", "abrir", "recib", "obtener", "descarg", "despues de compr", "como funciona"], "¿Cómo recibo mi hoja tras comprar?",
     "Tu descarga (un PDF en Etsy o el recibo de Gumroad) tiene tu enlace personal. Haz clic, inicia sesión en Google y elige <b>Hacer una copia</b>. La hoja queda en tu propio Google Drive, con el script incluido."],
    ["key", ["clave", "licencia", "activ", "desbloque"], "¿Dónde está mi clave de licencia?",
     "<b>Gumroad:</b> la clave está en tu recibo y en tu biblioteca de Gumroad.<br><b>Etsy:</b> abre el PDF, haz clic en <b>Get my license key</b> e introduce tu número de pedido de Etsy. Para el Complete Kit elige <i>Complete Kit (all 4)</i>: una clave sirve para todas las hojas.<br>La Risk Calculator no necesita clave. Pega la clave cuando la hoja la pida la primera vez."],
    ["perm", ["permiso", "autoriz", "no verificad", "insegur", "advertencia", "permitir", "avanzad"], "Google muestra una advertencia de permisos. ¿Es seguro?",
     "Sí. La primera vez que usas un menú, Google pide permitir el script: elige tu cuenta → <b>Configuración avanzada</b> → <b>Ir a …</b> → <b>Permitir</b>. El script solo obtiene datos públicos de precios (Coinbase, KuCoin) y escribe en tu propia copia. No puede ver tus otros archivos ni tu exchange."],
    ["broken", ["no funciona", "no va", "error", "problema", "no puedo", "fallo", "enlace"], "El enlace o la hoja no funciona",
     "Prueba primero: abre el enlace en un navegador de ordenador (no en la app de Sheets) y asegúrate de haber iniciado sesión en Google. Si sigue sin funcionar, escribe a " + MAIL + " con tu número de pedido y lo arreglamos o te devolvemos el dinero."],
    ["refund", ["reembols", "devoluc", "devolver", "cancelar"], "¿Puedo pedir un reembolso?",
     "Son descargas digitales inmediatas, así que no se pueden devolver. Pero si tu enlace de copia o tu clave no funcionan, escribe a " + MAIL + " y lo arreglamos o te devolvemos el dinero. Las compras también están cubiertas por las políticas de Gumroad y Etsy."],
    ["excel", ["excel", "programa", "instalar", "mac", "windows", "software"], "¿Necesito Excel u otro programa?",
     "No. Todo funciona en Google Sheets gratis, en tu navegador. Solo necesitas una cuenta de Google gratis. Excel no es compatible, porque las hojas usan scripts y precios en vivo de Google."],
    ["phone", ["movil", "telefono", "celular", "iphone", "android", "tablet", "app"], "¿Funciona en el móvil?",
     "La Risk Calculator funciona completa en la app de Google Sheets del móvil. Las demás hojas funcionan mejor en ordenador (allí se usan los menús y la actualización de precios); en el móvil puedes ver los resultados."],
    ["exchange", ["exchange", "api", "binance", "bybit", "conectar", "wallet", "billetera", "sincroniz"], "¿Tengo que conectar mi exchange?",
     "No. Nada pide accesos a exchanges ni claves API. Tú escribes o pegas tus datos; los precios vienen de datos públicos del mercado (Coinbase, con KuCoin de respaldo). Sirven operaciones de cualquier exchange o wallet."],
    ["advice", ["consejo", "asesor", "senal", "que compr", "garantiz", "recomienda moneda"], "¿Venden señales o dan consejos?",
     "No. Estas herramientas miden y registran. Nunca te dicen qué ni cuándo operar, y nada aquí es asesoramiento financiero. Signal Checker <i>comprueba</i> las señales de otros con precios reales."],
    ["data", ["privacidad", "datos", "segur", "ver mis", "guardan", "rastre"], "¿Pueden ver mis datos?",
     "No. Tu hoja vive en tu propio Google Drive. Lo único que recibe nuestro servidor de licencias es tu clave y un código anónimo de tu copia, nunca su contenido. Detalles: <a href='/legal/'>política de privacidad (en inglés)</a>."],
    ["lang", ["idioma", "ingles", "espanol", "ruso", "traduc"], "¿Las hojas están en español?",
     "La web está en inglés, español y ruso. Las hojas y sus instrucciones están en inglés, con menús y textos sencillos. Puedes escribirnos en español a " + MAIL + "."],
    ["lost", ["perdi", "perdi mi", "perdi la", "perdi el", "no encuentro", "encontrar", "otra vez", "volver a descargar", "biblioteca", "compras"], "Perdí mi descarga. ¿Cómo la encuentro?",
     "<b>Gumroad:</b> entra en <a href='https://gumroad.com/library'>gumroad.com/library</a> con el correo que usaste. <b>Etsy:</b> ve a <i>Tú → Compras y opiniones</i> y descarga el archivo de nuevo. Tu hoja copiada sigue en tu Google Drive."],
    ["share", ["compartir", "amigo", "equipo", "revender", "dos personas", "varias personas"], "¿Puedo compartir la hoja?",
     "Cada compra es para uso personal de una persona. Puedes hacer todas las copias que quieras para ti, pero no compartas ni revendas la hoja, su enlace ni tu clave. Las claves que aparecen en muchas copias se desactivan."],
    ["free", ["gratis", "prueba", "demo", "lite", "chuleta", "calculadora"], "¿Hay algo gratis?",
     "Sí: la <a href='" + P + "signal-checker-demo/'>demo de Signal Checker</a> (3 señales), <a href='" + GUM + "signal-checker-lite'>Signal Checker Lite</a> (10 señales), el <a href='" + P + "telegram-signal-checker/'>comprobador de canales de Telegram</a>, las <a href='" + P + "tools/'>calculadoras gratis</a> (tamaño de posición, DCA, beneficio, liquidación, riesgo de ruina, costes) y la <a href='" + GUM + "risk-cheat-sheet'>chuleta de riesgo cripto</a> en PDF."],
    ["tgcheck", ["telegram", "canal", "exportar", "exportacion", "todas las llamadas", "historial", "result.json"], "¿Puedo comprobar un canal de Telegram entero?",
     "Sí, gratis: exporta el canal desde <b>Telegram Desktop</b> (⋮ → Exportar historial del chat → formato JSON legible por máquina) y suelta <b>result.json</b> en el <a href='" + P + "telegram-signal-checker/'>comprobador de canales de Telegram</a>. Encuentra cada llamada, la comprueba con precios reales (con apalancamiento y liquidaciones) y nunca sube tu archivo. Las últimas 20 llamadas son gratis; una clave de Signal Checker las comprueba todas."],
    ["prices", ["datos de precio", "precio en vivo", "coinbase", "kucoin", "falta moneda", "que monedas", "actualiz"], "¿De dónde salen los precios?",
     "Los precios horarios y en vivo vienen de Coinbase, con KuCoin de respaldo para monedas que Coinbase no lista. Las stablecoins cuentan como $1. Usa el menú de la hoja para actualizar precios; puedes activar la actualización automática cada hora."],
    ["contact", ["contact", "persona", "humano", "correo", "email", "soporte", "hablar", "ayudame"], "¿Cómo hablo con una persona?",
     "Escribe a " + MAIL + ". Responde una persona real, normalmente en menos de 24 horas. Si compraste en Etsy, también puedes escribir a la tienda allí."]
   ],
   ru: [
    ["which", ["какой", "какую", "выбрать", "лучше", "посовет", "разниц", "начать", "нужен"], "Какой инструмент выбрать?",
     "<b>Signal Checker</b> ($19): проверка сигналов группы по реальным ценам до того, как платить или следовать им.<br><b>Trade Journal + DCA Planner</b> ($15): учёт ваших сделок, винрейт и планы DCA.<br><b>Portfolio Tracker</b> ($12): все монеты, средняя цена покупки и P&amp;L.<br><b>Risk Calculator</b> ($7): точный размер позиции и риск.<br>Все 4 вместе: <a href='" + P + "bundle/'>Complete Kit, $39</a>. Сомневаетесь? Попробуйте <a href='" + P + "signal-checker-demo/'>бесплатное демо</a>."],
    ["price", ["цена", "стоит", "сколько", "скидк", "купон", "промокод", "набор", "kit"], "Сколько стоят инструменты?",
     "Signal Checker $19 · Trade Journal + DCA Planner $15 · Portfolio Tracker $12 · Risk Calculator $7. Наборы: Toolkit (Signal Checker + Trade Journal) $29, <a href='" + P + "bundle/'>Complete Kit (все 4) $39</a>. Разовая оплата, без подписки."],
    ["copy", ["копи", "скопир", "доступ", "открыть", "получить", "скача", "загруз", "после покупки", "как работает"], "Как получить таблицу после покупки?",
     "В вашей загрузке (PDF на Etsy или чек Gumroad) есть личная ссылка. Нажмите её, войдите в Google и выберите <b>Создать копию</b>. Таблица окажется в вашем Google Диске вместе со скриптом."],
    ["key", ["ключ", "лиценз", "активир", "разблок"], "Где мой лицензионный ключ?",
     "<b>Gumroad:</b> ключ есть в чеке и в вашей библиотеке Gumroad.<br><b>Etsy:</b> откройте PDF, нажмите <b>Get my license key</b> и введите номер заказа Etsy. Для Complete Kit выберите <i>Complete Kit (all 4)</i>: один ключ работает во всех таблицах.<br>Risk Calculator ключ не нужен. Вставьте ключ, когда таблица попросит его в первый раз."],
    ["perm", ["разрешен", "авториз", "не провер", "небезопас", "предупрежд", "разрешить", "дополнительн"], "Google показывает предупреждение о разрешениях. Это безопасно?",
     "Да. При первом запуске меню Google просит разрешить скрипт: выберите аккаунт → <b>Дополнительные настройки</b> → <b>Перейти на …</b> → <b>Разрешить</b>. Скрипт только загружает открытые данные о ценах (Coinbase, KuCoin) и пишет в вашу копию. Он не видит другие ваши файлы и вашу биржу."],
    ["broken", ["не работает", "ошибк", "проблем", "не могу", "не открыва", "сломал", "ссылк"], "Ссылка или таблица не работает",
     "Сначала попробуйте: откройте ссылку в браузере на компьютере (не в приложении Таблиц) и убедитесь, что вы вошли в аккаунт Google. Если не помогло, напишите на " + MAIL + " с номером заказа — мы всё исправим или вернём деньги."],
    ["refund", ["возврат", "вернуть деньги", "отмен"], "Можно вернуть деньги?",
     "Это мгновенные цифровые загрузки, поэтому вернуть их нельзя. Но если ссылка на копию или ключ не работают, напишите на " + MAIL + " — мы всё исправим или вернём деньги. Покупки также защищены правилами Gumroad и Etsy."],
    ["excel", ["excel", "эксел", "программ", "установ", "mac", "windows"], "Нужен ли Excel или другая программа?",
     "Нет. Всё работает в бесплатных Google Таблицах, в браузере. Нужен только бесплатный аккаунт Google. Excel не поддерживается: таблицы используют скрипты Google и живые цены."],
    ["phone", ["телефон", "мобильн", "смартфон", "iphone", "андроид", "android", "планшет", "приложени"], "Работает на телефоне?",
     "Risk Calculator полностью работает в мобильном приложении Google Таблиц. Остальные таблицы лучше использовать на компьютере (там работают меню и обновление цен); на телефоне можно смотреть результаты."],
    ["exchange", ["бирж", "api", "binance", "bybit", "подключ", "кошел", "синхрон"], "Нужно подключать биржу?",
     "Нет. Никаких входов на биржу и API-ключей. Вы вводите или вставляете данные сами; цены берутся из открытых рыночных данных (Coinbase, резерв — KuCoin). Подходят сделки с любой биржи или кошелька."],
    ["advice", ["совет", "рекомендац", "сигнал", "что купить", "гарант"], "Вы продаёте сигналы или даёте советы?",
     "Нет. Эти инструменты считают и записывают. Они никогда не говорят, что и когда торговать, и ничто здесь не является финансовой рекомендацией. Signal Checker <i>проверяет</i> чужие сигналы по реальным ценам."],
    ["data", ["конфиденц", "данны", "безопасн", "видите", "хран", "отслеж"], "Вы видите мои данные?",
     "Нет. Таблица хранится в вашем Google Диске. Наш сервер лицензий получает только ваш ключ и анонимный код копии, но не её содержимое. Подробнее: <a href='/legal/'>политика конфиденциальности (англ.)</a>."],
    ["lang", ["язык", "англ", "испан", "русск", "перевод"], "Таблицы на русском?",
     "Сайт на английском, испанском и русском. Сами таблицы и инструкции к ним на английском, с простыми меню и подписями. Вопросы на русском можно присылать на " + MAIL + "."],
    ["lost", ["потерял", "потерял загруз", "потеряла загруз", "потерял файл", "потеряла файл", "не могу найти", "найти", "снова", "заново скачать", "библиотек", "покупк"], "Я потерял загрузку. Как её найти?",
     "<b>Gumroad:</b> войдите на <a href='https://gumroad.com/library'>gumroad.com/library</a> с тем email, которым платили. <b>Etsy:</b> откройте <i>Вы → Покупки и отзывы</i> и скачайте файл снова. Скопированная таблица остаётся в вашем Google Диске."],
    ["share", ["поделит", "друг", "команд", "перепрод", "двоих", "несколько человек"], "Можно поделиться таблицей?",
     "Каждая покупка — для личного использования одним человеком. Можно делать сколько угодно копий для себя, но не передавайте и не перепродавайте таблицу, ссылку на неё или ваш ключ. Ключи, найденные во многих копиях, отключаются."],
    ["free", ["бесплат", "попроб", "демо", "lite", "шпаргал", "калькулятор"], "Есть что-то бесплатное?",
     "Да: <a href='" + P + "signal-checker-demo/'>демо Signal Checker</a> (3 сигнала), <a href='" + GUM + "signal-checker-lite'>Signal Checker Lite</a> (10 сигналов), <a href='" + P + "telegram-signal-checker/'>проверка Telegram-канала</a>, <a href='" + P + "tools/'>бесплатные калькуляторы</a> (размер позиции, DCA, прибыль, ликвидация, риск разорения, издержки) и PDF <a href='" + GUM + "risk-cheat-sheet'>Шпаргалка по риску</a>."],
    ["tgcheck", ["telegram", "телеграм", "канал", "экспорт", "все сигналы", "истори", "result.json"], "Можно проверить весь Telegram-канал?",
     "Да, бесплатно: экспортируйте канал в <b>Telegram Desktop</b> (⋮ → Экспорт истории чата → формат: машиночитаемый JSON) и перетащите <b>result.json</b> в <a href='" + P + "telegram-signal-checker/'>проверку Telegram-канала</a>. Она найдёт каждый сигнал, проверит его по реальным ценам (с плечом и ликвидациями) и никуда не загрузит ваш файл. Последние 20 сигналов — бесплатно; ключ Signal Checker проверяет все."],
    ["prices", ["откуда цены", "живые цены", "coinbase", "kucoin", "нет монеты", "какие монеты", "обнов"], "Откуда берутся цены?",
     "Часовые и живые цены — с Coinbase, а для монет, которых там нет, — с KuCoin. Стейблкоины считаются по $1. Цены обновляются через меню таблицы; можно включить автообновление каждый час."],
    ["contact", ["связат", "человек", "почт", "email", "поддержк", "поговор", "помогите"], "Как связаться с человеком?",
     "Напишите на " + MAIL + ". Ответит живой человек, обычно в течение 24 часов. Если покупали на Etsy, можно также написать магазину там."]
   ]
  }[L];

  var TOP = L === "en" ? ["which", "copy", "key", "free"] : ["which", "copy", "key", "free"];

  function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[ё]/g, "е").replace(/[^a-zа-я0-9' ]+/g, " ").replace(/\s+/g, " ").trim(); }
  var KN = K.map(function (k) { return { id: k[0], kw: k[1].map(norm), q: k[2], a: k[3] }; });

  function match(text) {
    var t = " " + norm(text) + " ", words = t.trim().split(" "), best = null, bs = 0;
    KN.forEach(function (k) {
      var s = 0;
      k.kw.forEach(function (w) {
        if (w.indexOf(" ") >= 0) { if (t.indexOf(" " + w) >= 0) s += 2; }
        else if (words.some(function (x) { return x.indexOf(w) === 0; })) s += 1;
      });
      if (s > bs) { bs = s; best = k; }
    });
    return bs > 0 ? best : null;
  }

  var css = ".schb{position:fixed;right:18px;bottom:18px;z-index:9000;font-family:Inter,'Segoe UI',system-ui,sans-serif}" +
    ".schb-btn{display:flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:12px 18px;font:700 15px Inter,sans-serif;color:#0b1120;background:linear-gradient(90deg,#4ade80,#38bdf8);box-shadow:0 12px 30px -8px rgba(56,189,248,.6);cursor:pointer}" +
    ".schb-p{position:absolute;right:0;bottom:62px;width:min(370px,calc(100vw - 32px));max-height:min(560px,calc(100vh - 110px));display:none;flex-direction:column;background:#0f172a;border:1px solid #1f2a44;border-radius:18px;box-shadow:0 30px 60px rgba(0,0,0,.55);overflow:hidden}" +
    ".schb.open .schb-p{display:flex}.schb-h{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #1f2a44;color:#f8fafc;font:700 15px 'Space Grotesk',Inter,sans-serif}" +
    ".schb-h button{background:none;border:0;color:#94a3b8;font-size:22px;cursor:pointer;line-height:1}.schb-m{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:8px}" +
    ".schb-b{max-width:88%;padding:9px 12px;border-radius:14px;font-size:14px;line-height:1.45;color:#e2e8f0;background:#111a2e;border:1px solid #1f2a44}.schb-b a{color:#4ade80}" +
    ".schb-b.u{align-self:flex-end;background:#14532d;border-color:#166534;color:#f0fdf4}.schb-c{display:flex;flex-wrap:wrap;gap:6px}" +
    ".schb-c button{border:1px solid #334155;background:transparent;color:#cbd5e1;border-radius:999px;padding:6px 10px;font-size:13px;cursor:pointer;text-align:left}.schb-c button:hover{border-color:#4ade80;color:#f8fafc}" +
    ".schb-f{display:flex;gap:6px;padding:10px;border-top:1px solid #1f2a44}.schb-f input{flex:1;min-width:0;padding:10px 12px;border-radius:10px;border:1px solid #334155;background:#0b1120;color:#f8fafc;font-size:15px}" +
    ".schb-f button{border:0;border-radius:10px;padding:0 14px;font-weight:700;background:#4ade80;color:#0b1120;cursor:pointer}" +
    "@media(max-width:480px){.schb{right:12px;bottom:12px}.schb-btn{padding:11px 15px}}@media print{.schb{display:none}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var root = document.createElement("div"); root.className = "schb";
  root.innerHTML = '<div class="schb-p" role="dialog" aria-label="' + UI.title + '"><div class="schb-h"><span>' + UI.title + '</span><button type="button" aria-label="' + UI.close + '">×</button></div>' +
    '<div class="schb-m" aria-live="polite"></div><form class="schb-f"><input type="text" maxlength="200" placeholder="' + UI.ph + '" aria-label="' + UI.ph + '"><button type="submit">' + UI.send + '</button></form></div>' +
    '<button type="button" class="schb-btn" aria-expanded="false"><span aria-hidden="true">💬</span>' + UI.btn + '</button>';
  document.body.appendChild(root);
  var box = root.querySelector(".schb-m"), btn = root.querySelector(".schb-btn"), inp = root.querySelector("input"), started = false;

  function bubble(html, user) { var d = document.createElement("div"); d.className = "schb-b" + (user ? " u" : ""); if (user) d.textContent = html; else d.innerHTML = html; box.appendChild(d); box.scrollTop = box.scrollHeight; }
  function chips(ids) {
    var c = document.createElement("div"); c.className = "schb-c";
    ids.forEach(function (id) { var k = KN.filter(function (x) { return x.id === id; })[0]; if (!k) return; var b = document.createElement("button"); b.type = "button"; b.textContent = k.q; b.onclick = function () { ask(k.q, k); }; c.appendChild(b); });
    box.appendChild(c); box.scrollTop = box.scrollHeight;
  }
  function count(name) { try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: "helpbot-" + name, title: "helpbot " + name, event: true }); } catch (e) {} }
  function ask(text, k) {
    bubble(text, true); k = k || match(text);
    setTimeout(function () {
      if (k) { bubble(k.a); count(k.id); chips(KN.map(function (x) { return x.id; }).filter(function (id) { return id !== k.id; }).slice(0, 4)); }
      else { bubble(UI.miss); count("miss"); chips(TOP); }
    }, 250);
  }
  function toggle(open) {
    root.classList.toggle("open", open); btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open && !started) { started = true; bubble(UI.hi); chips(KN.map(function (x) { return x.id; })); count("open"); }
    if (open) setTimeout(function () { inp.focus(); }, 50);
  }
  btn.onclick = function () { toggle(!root.classList.contains("open")); };
  root.querySelector(".schb-h button").onclick = function () { toggle(false); };
  root.querySelector("form").onsubmit = function (e) { e.preventDefault(); var v = inp.value.trim(); if (!v) return; inp.value = ""; ask(v); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && root.classList.contains("open")) toggle(false); });
})();
