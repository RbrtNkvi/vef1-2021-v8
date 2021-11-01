# Verkefni 8

[Kynning í fyrirlestri](https://youtu.be/5GAg9Olchf8)

Verkefni 8 heldur áfram með [verkefni 7](https://github.com/vefforritun/vef1-2021-v7) og bætir viðmóti við leikinn, reglur eru þær sömu. Við það bætist töluvert af kóða og utanumhaldi um _stöðu_ forritsins.

Til að hjálpa til við að skipuleggja forritið notum við [`JavaScript modules`](https://github.com/vefforritun/vef1-2021/blob/main/vikur/10/10.4.modules.md#javascript-modules), í `index.html` er vísað í `main.js` með `<script type="module">`.

Leyfilegt er að breyta öllu í grunn sem gefinn er, jafnvel skrifa eigin útfærslu frá grunni, svo lengi sem hún útfærir og gerir það sem verkefni og mat nefnir.

Sjá má hvernig leikur spilast í `virkni.mp4`.

Vefur skal vera prófaður og virka í nýjustu útgáfum af Firefox og Chrome.

## Stöður

Við getum hugsað um leikinn sem stöðuvél:

```text
┌────────────┐  ┌────────────┐     ┌───────────┐    ┌───────────┐
│            │  │Velja fjölda│     │           │    │           │
│ Byrja leik │─▶│  umferða   │────▶│ Setja út  │───▶│Birta stöðu│
│            │  │            │     │           │    │           │
└────────────┘  └────────────┘     └───────────┘    └───────────┘
                       ▲                 ▲                │      
                       │                 │                │      
                       │                Nei               │      
                       │                 │                │      
                ┌────────────┐       .───────.            │      
                │  Uppfæra   │      ╱         ╲           │      
                │  spilaða   │◀─Já─(Leik lokið?)◀─────────┘      
                │   leiki    │      `.       ,'                  
                └────────────┘        `─────'                    
```

Gefinn er grunnur sem skiptir á milli þessara staða að einhverju leiti, sérstaklega er gefið fall sem skiptir á milli skjáa, `show(part)`. Það tekur inn einn af fjórum skjám `start`, `rounds`, `play` eða `result`, felur aðra og birtir valdann.

Breytur sem halda utan um stöðu leiks eru skilgreindar í `main.js`, en þar sem það er skilgreint sem `module` eru þær _ekki_ settar í global scope og við hjúpum (encapsulate) leikinn okkar.

## Útlit

Allt útlit er gefið í `styles.css`. Þegar fela þarf hluti eða breyta útliti að einhverju leiti skal nota [`classList`](https://github.com/vefforritun/vef1-2021/blob/main/vikur/10/10.2.browser-dom.md#classlist), ekki skal nota `.styles` eigindi á node. Gefin er hjálpar klasi `.hidden` felur og er nýttur af `show()` fallinu.

Notað er [BEM](https://github.com/vefforritun/vef1-2021/blob/main/vikur/06/06.1.css-verkefni.md#bem) til að nefna alla klassa, nota ætti viðeigandi klassa þegar verið er að finna element til að bæta við elementum.

Í byrjun er allt sýnilegt en með því að ýta á `Byrja leik` hnapp er sá hnappur falinn og val á fjölda umferða sýnt.

## Debugger

Þegar smellt er á `Byrja leik` kemur upp villa. Ef DevTools eru opin er notað `debugger` lykilorðið í JavaScript til að útbúa _breakpoint_  á þeim stað.

Þar sem við höfum mismunandi stöður og gögn á hverjum tímapunkti er **mjög** hjálplegt að nota debugger til að aðstoða við gerð leiksins.

Sjá nánar um [debugger í Firefox](https://developer.mozilla.org/en-US/docs/Tools/Debugger) og [debugger í Chrome](https://developer.chrome.com/docs/devtools/javascript/).

## Netlify

Skila skal verkefninu keyrandi á Netlify. Gera þarf breytingar þannig að `build` script sé skilgreint í `package.json` og setja upp build ferli þ.a. mappa sem verður til í `build` ferli sé notuð fyrir vef.

## Mat

* 10% Snyrtilegur JavaScript kóði
* 10% Verkefni sett upp á Netlify
* 10% Modules sett upp með `import` og `export`
* 10% Atburðir settir upp og upplýsingar um þá lesnar úr `Event` hlut þar sem við á
* 30% Viðeigandi skjáir sýndir, hægt að spila leik og velja fjölda umferða
* 30% Staða uppfærð eftir hverja umferð og þegar leik er lokið

## Sett fyrir

Verkefni sett fyrir í fyrirlestri mánudaginn 25. október 2021.

## Skil

Skila skal í Canvas í seinasta lagi fyrir lok dags fimmtudaginn 4. nóvermber 2021.

Skil skulu innihalda:

* Slóð á GitHub repo fyrir verkefni, og dæmatímakennurum skal hafa verið boðið í repo ([sjá leiðbeiningar](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository)). Notendanöfn þeirra eru:
  * `alli959`
  * `einarpalsson`
  * `HallurKrist`
  * `oscar6662`
  * `thth168`
* Slóð á verkefnið keyrandi á Netlify

## Einkunn

Sett verða fyrir tíu minni verkefni þar sem átta bestu gilda 5% hvert, samtals 40% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 10%, samtals 20% af lokaeinkunn.
