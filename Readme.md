Zadanie rekrutacyjne

Przejdź do kolejnego etapu rekrutacji! Weź sprawy w swoje ręce i rozwiąż zadanie rekrutacyjne.
Pewna firma telekomunikacyjna odezwała się z prośbą o stworzenie kalkulatora cen dla ich usług.

Zbuduj jednowidokową aplikację, która umożliwi użytkownikowi, z dostępnych danych wybrać rok i usługi, które chce zakupić, a poniżej pokaże cenę finalną tego zamówienia (przed i po uwzględnieniu promocji całościowo - bez wyszczególnienia dla poszczególnych produktów).

Dane powinny być pobierane z zewnętrznego źródła (np. plik JSON). Zaprojektuj model danych, który chciałbyś otrzymać od zewnętrznego dostawcy. Zadbaj o to, żeby model był czytelny i łatwy w modyfikacji (dodanie kolejnego produktu, zmiana cen, dodanie kolejnych lat), a także gotowy na dalszy rozwój.

Program powinien działać nie tylko dla danych przykładowych wymienionych poniżej, ale również jeśli dane o produktach, dane z cennika ulegną zmianie. Powinien implementować rozwiązania, które pozwolą na przeprowadzenie odpowiednich obliczeń, które wynikają z danych przykładowych (rabatowanie, możliwość łączenia w pakiety, brak możliwości dodania produktu zależnego od innych).

Aplikację wykonaj przy użyciu technologii React. Zadbaj o czystość i wysoką utrzymywalność Twojego rozwiązania, stosując znane Ci dobre praktyki programowania

Przykładowe dane

Lista usług:

Internet,
Telewizja,
Abonament telefoniczny,
Dekoder 4K
Ceny usług mogą być inne w zależności od wybranego roku. Obecnie o cenach wiemy, że:

Internet kosztuje 39zł w 2023, 49zł w 2024 i 59zł w 2025,
Telewizja kosztuje 49zł w 2023, 49zł w 2024 i 59zł w 2025,
Pakiet „Internet + telewizja” kosztuje mniej – 79zł w 2023, 89zł w 2024, 99zł w 2025,
Pakiet „Internet + Abonament telefoniczny” w każdym roku kosztuje 64zł,
Abonament telefoniczny kosztuje 29zł,
Dekoder 4K kosztuje 29zł, a w pakiecie „Internet + telewizja” jest dostępny za darmo.
Nie ma sensu, aby klient mógł zamówić „Dekoder 4K” bez zamawiania telewizji. Zadbaj o to, żeby program wyliczał najbardziej korzystne cenowo rozwiązanie dla użytkownika. Zniżki nie nakładają się na siebie – korzystniejsze rozwiązanie dla użytkownika wygrywa
