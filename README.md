
# Демонстрационный автоматизированный тест на примере A La Carte
Проект автоматизации тестирования главной страницы сайта "A La Carte" - https://alacarte.world/.

## Структура проекта
```
a_la_carte\
│
├── components\                       # Переиспользуемые UI компоненты
│    ├── header.js
│    ├── headerMenu.js
│    ├── footer.js
│    └── footerMenu.js
│
├── helpers\                          # Вспомогательные утилиты
│    └── assertions.js
│
├── pages\                            # Слассы страниц для Page Object Model (POM)
│    └── homePage.js
│
├── tests\                            # Тестовые спецификации
│    ├── apiTests\                    # API тесты
│    │    └── openHome.spec.js
│    ├── pomTests\                    # UI тесты с POM (они же e2e)
│    │    └── openHome.spec.js
│    └── bddTests\                    # BDD тесты с Cucumber
│         ├── features\
│         │    └── openHome.feature
│         ├── steps\
│         │    └── openHomeSteps.js
│         ├── cucumber.js
│         └── world.js
├── .gitignore
├── package.json
└── playwright.config.js
```

## Технологический стэк проекта
- **Playwright** - основной фреймворк для автоматизации
- **Cucumber** - фреймворк для BDD тестов
- **JavaScript** - язык программирования

## Установка
#### Склонируйте репозиторий
`git clone https://github.com/wDl59/a_la_carte.git`

#### Установите зависимости
`npm install`

#### Установите браузеры для Playwright
`npx playwright install`

## Запуск тестов
#### Запуск всех тестов
`npx playwright test`

#### Запуск BDD тестов
`npm run test:cucumber`
