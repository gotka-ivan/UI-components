/**
 *
 *  Набор правил
 *  Имена ключей в этом объекте могут быть любыми
 *  Они для лучшего понимания частей итогового регулярного выражения
 *  var patterns = {
 *    'numeric':     '0-9',
 *    'special':     '!@#$%^&*',
 *    'latin_lower': 'a-z',
 *    'latin_upper': 'A-Z'
 *  };
 *
 *  В вашем случае есть ограничение только по минимальной длине от 6 символов
 *  var min = 6;
 *
 *  Передаём правила в функцию и смотрим итоговое выражение
 *  console.log(makeRegExp(patterns, min));
 *
 *  Вывод: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{6,}/g
 */

export default function(patterns, min, max) {
  const minimum = min || '' // Если минимальное число символов не указано, берём пустую строку
  const maximum = max || '' // Если максимальное число символов не указано, берём пустую строку
  let regex_string = ''
  const rules = []
  const range = '{' + minimum + ',' + maximum + '}' // Разрешённый диапазон для длины строки
  for (let rule in patterns) {
    // Обрабатываем входящий массив из ВСЕХ правил для строки
    // eslint-disable-next-line no-prototype-builtins
    if (patterns.hasOwnProperty(rule)) {
      rules.push(patterns[rule]) // Запоминаем правила
      // Формируем последовательность из шаблонов `(?=.*[%s])`
      // Она проверит обязательное присутствие всех символов из входящего набора
      regex_string += '(?=.*[' + patterns[rule] + '])'
    }
  }
  // Добавляем в хвост набор из ВСЕХ разрешённых символов и разрешённую длину строки
  regex_string += '[' + rules.join('') + ']' + range
  // Собираем всё в одно регулярное выражение
  return new RegExp(regex_string, 'g')
}
