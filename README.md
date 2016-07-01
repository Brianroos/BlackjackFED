# BlackjackFED
Eindopdracht voor het vak Frontend development (FED01).

## Beschrijving applicatie
#### Concept
Blackjack game met custom database, toepassen geld inzetten

#### Beschrijving
Ik wil aan de hand van de stof in de lessen een basisversie maken van het casinospel Blackjack. Er wordt mede gebruik gemaakt van ‘babel’ om de code te schrijven. Daarnaast komt er een ‘custom database’ waar alle data opgeslagen staat om te gebruiken voor de applicatie. Deze elementen moeten ervoor zorgen dat er een mooie en goed werkende applicatie komt.

#### Verloop van het spel
Voordat het spel begint moet de gebruiker een bedrag selecteren wat hij dit spel in wilt zetten. Vervolgens worden de kaarten aan het begin van elk nieuw spel door elkaar gehusseld (in een array gestopt, en een hoeveelheid random kaarten worden gepakt). Vervolgens moet de gebruiker gaan kiezen of hij nog een kaart wilt of niet (deze zal natuurlijk weer random zijn). Nadat de gebruiker tevreden is met zijn aantal of af is, zal de ‘bank’ wel of geen kaarten trekken aan de hand van zijn situatie.

Vervolgens worden de waarden van de kaarten van beide spelers opgeteld en vergeleken met elkaar. Wie dan het hoogste getal en niet hoger dan 21 heeft, wint. Wanneer de gebruiker wint, krijgt hij het ingezette bedrag terug x2. Wanneer hij verliest is hij het ingezette bedrag kwijt. Bij een gelijkspel wint er niemand, en krijgt de gebruiker zijn inzet terug.

#### Overig
Het spel zal er verzorgd uitzien, wat ervoor zorgt dat het prettig speelt voor de gebruiker.

## Criteria
- [x] Het programma is via git opgeleverd en kent een online werkend exemplaar.
- [x] Het programma heeft een professionele setup (bv. nodejs en babeljs) en een goede mappenstructuur.
- [x] Het programma werkt in 3 browsers (IE, Chrome en Firefox). De testresultaten zijn daarvan aanwezig.
- [x] De code is voorzien van goed en zinvol commentaar volgens de JSDocs specificatie.
- [x] Models (M) zijn op een goede manier gekozen en opgezet. Aandachtspunt: de opdracht uitwerking bevat tenminste 3 models.
- [x] Views (V) zijn goed gekozen en slim opgezet. Aandachtspunt: de opdracht uitwerking bevat tenminste 3 views.
- [ ] Routing van de url’s is goed doordacht en uitgevoerd.
- [x] De gekozen events werken goed en zijn zinvol opgebouwd.
- [x] ES2015 is waar mogelijk toegepast. Aandachtspunten: arrow functions, promises, variables (const, var, let) and iterators.
- [x] De complexiteit van de opdracht is aanwezig.
