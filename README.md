# 日本語 — Этап 1 · Telegram Mini App

Интерактивное приложение для самостоятельного изучения японского языка (Этап 1).  
Работает как Telegram Mini App и как обычная веб-страница.

## Что внутри

- **Хирагана** — 46 знаков, режимы «карточки» и «таблица», отметка выученных
- **Катакана** — 46 знаков, аналогично хирагане
- **Квиз** — случайный символ, 4 варианта, счётчик серий, haptic feedback
- **Словарь** — 60 базовых слов по 5 категориям
- **План** — программа по неделям, ежедневный план, ресурсы

## Деплой на GitHub Pages

### 1. Создай репозиторий

```
https://github.com/new
```

Назови, например, `nihongo-stage1`. Видимость — **Public**.

### 2. Загрузи файлы

**Вариант A — через браузер (проще):**
1. Открой репозиторий → кнопка **Add file → Upload files**
2. Перетащи `index.html` и `README.md`
3. Нажми **Commit changes**

**Вариант B — через Git:**
```bash
git clone https://github.com/ВАШ_НИК/nihongo-stage1.git
cd nihongo-stage1
cp /путь/к/index.html .
git add .
git commit -m "init: Japanese Stage 1 app"
git push
```

### 3. Включи GitHub Pages

1. Репозиторий → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, папка: `/ (root)`
4. Нажми **Save**

Через ~1 минуту приложение будет доступно по адресу:
```
https://ВАШ_НИК.github.io/nihongo-stage1/
```

## Подключение к Telegram боту

1. Зайди к [@BotFather](https://t.me/BotFather) в Telegram
2. Выбери своего бота (или создай новый: `/newbot`)
3. Отправь `/newapp` → следуй инструкциям, укажи URL из GitHub Pages
4. Или добавь кнопку прямо в сообщение бота:

```python
# Пример на python-telegram-bot
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

button = InlineKeyboardButton(
    "📖 Открыть приложение",
    web_app=WebAppInfo(url="https://ВАШ_НИК.github.io/nihongo-stage1/")
)
```

## Как работает адаптация к теме Telegram

Приложение использует CSS-переменные Telegram SDK:

| Переменная | Назначение |
|---|---|
| `--tg-theme-bg-color` | Фон |
| `--tg-theme-text-color` | Текст |
| `--tg-theme-hint-color` | Подсказки |
| `--tg-theme-secondary-bg-color` | Нижняя навигация |
| `--tg-theme-button-color` | Акцентный цвет |

В браузере (без Telegram) отображается в тёмной теме по умолчанию.

## Структура проекта

```
nihongo-stage1/
├── index.html   # Всё приложение — один файл
└── README.md    # Этот файл
```

Всё в одном HTML-файле: CSS, JS, данные. Никаких зависимостей, кроме Google Fonts и Telegram SDK (загружаются из CDN).
