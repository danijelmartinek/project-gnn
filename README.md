# project-gnn
 (grad na nogama)
 
 CarLess
 
OPIS: Svrha je aplikacije da se, prvenstveno djeca, a onda i odrasli ljudi motiviraju za što više korištenje bicikla kao prijevozno sredstvo do škole/posla. Aplikacija je jednostavna, spaja se API od mobilne aplikacije za "activity tracking" pod imenom Strava i automatski povlači podatke o prijeđenim kilometrima (i minutama aktivnosti) te na temelju toga radi "leaderboard" korisnika koji su se prijavili u aplikaciju. Ova aplikacija neće imati zaseban autentifikacijski sistem nego će se preko OAuth 2 protokola uzimati podaci sa Strava aplikacije, što znači da će se korisnik trebati samo jednom autentificirati na Strava stranici nakon čega se preko cookiesa user autentificira na ovoj aplikaciji. Svaki put dok korisnik napravi neku aktivnost (vožnja bicikla, trčanje), uključit će se Strava webhook koji će ovoj aplikaciji slati podatke o novoj aktivnosti i nakon toga će aplikacija spremati tu aktivnost u bazu podataka.
