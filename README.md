# kolibri-develop
УЧЕБНАЯ ПЛАТФОРМА KOLIBRI С ОТКРЫТЫМ ИСХОДНЫМ КОДОМ

https://learningequality.org/kolibri/

Kolibri - это образовательная платформа с открытым исходным кодом и инструментарий, разработанный для сообществ с низкими ресурсами. Kolibri создана для работы на легком локальном сервере, но с растущей библиотекой открытых образовательных ресурсов и инструментами для их адаптации к местной учебной программе.

Процесс установки.
1. Установите Python, запуск проводился с уже установленной версией Python 3.10.4. [Python 3.10.4](https://www.python.org/downloads/release/python-3104/).
2. Установите git [Система контроля версий](https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git)
3. Выполните команду ```git clone https://github.com/savlmaks26/kolibri-develop.git```
4. Выполните команду: ```cd kolibri-develop & pip3 install -r requirements.txt``` 
5. Команда ```python -m site``` для отображения текущего пути пакетов pip. В папку site-packages копируем kolibri из папки kolibri-develop.

Запуск Kolibri CLI.

Использование: ```kolibri [OPTIONS] COMMAND [ARGS]...```

  Утилита командной строки Kolibri

  Подробная информация для каждой основной команды: ```kolibri COMMAND --help```

  Список дополнительных команд управления: ```kolibri manage help```

  Для получения дополнительной информации см.: https://kolibri.readthedocs.io/

Опции:

  ```--version``` Показать версию и выйти.
  
  ```--help``` Показать это сообщение и выйти.

Команды:

  ``configure`` Настройка Kolibri и включенных плагинов
  
  ```manage``` Команды управления Django.
  
  ```plugin``` Управление плагинами Kolibri
  
  ```restart``` Перезапуск процесса Kolibri
  
  ```services``` Запуск рабочих процессов
  
  ```shell``` Запуск оболочки Django
  
  ```start``` Запустить процесс Kolibri
  
  ```status``` Показать статус процесса Kolibri
  
  ```stop``` Остановить процесс Kolibri
  
Kolibri studio:
https://studio.learningequality.org/en/accounts/#/
