/**
 * ✏️ ALLE projectinhoud staat in dit bestand.
 *
 * Een nieuw project toevoegen:
 *   1. Kopieer een projectblok (van { tot en met },) en plak het in de lijst.
 *   2. Geef het een unieke `slug` — dat wordt de URL: /projects/<slug>
 *   3. Zet de afbeeldingen in /public/images/ en pas de paden aan.
 * De tegel en de projectpagina worden automatisch aangemaakt.
 *
 * Veldenoverzicht:
 *   slug         unieke URL-naam, kleine-letters-met-streepjes
 *   title        naam van het project
 *   tagline      kort genre/type, komt onder de titel
 *   thumbnail    afbeelding op de tegel (16:9 werkt het mooist)
 *   banner       grote afbeelding op de projectpagina (21:9 werkt het mooist)
 *   role         wat JIJ deed in het project
 *   tools        lijst van engines/talen/tools
 *   period       wanneer het gemaakt is
 *   summary      één of twee zinnen op de tegel
 *   description  intro-alinea's voor de projectpagina
 *   sections     optionele extra secties, elk met:
 *                  heading   koptekst
 *                  text      lijst van alinea's
 *                  list      lijst van bullets
 *                  image     { src, alt, caption }
 *                  code      { caption, snippet, explanation }
 *   link         optionele URL (itch.io, GitHub…) of null
 */

export const projects = [
  {
    slug: "orginsights",
    title: "OrgInsights",
    tagline: "VR-menu redesign & 3D-omgeving",
    thumbnail: "/images/orginsights-guidance.png",
    banner: "/images/orginsights-guidance.png",
    role: "VR-interactieontwerp, UX-onderzoek, 3D-omgeving & C#-implementatie",
    tools: ["Unity", "C#", "XR Interaction Toolkit", "Blender", "Quixel Mixer"],
    period: "2026",
    summary:
      "Redesign van een VR-menu en een modulaire 3D-kantooromgeving voor de Immersive Tech Studio — van onderzoek en A/B-tests tot een werkend world-space menu in Unity.",
    description: [
      "Voor de Immersive Tech Studio heb ik gewerkt aan het redesignen van een VR-menu om het gebruiksvriendelijker, toegankelijker en schaalbaar te maken voor grote hoeveelheden data. Het bestaande overlay-menu werkte niet goed binnen VR, omdat gebruikers het menu niet zelfstandig konden openen en het overzicht verloren ging bij veel opties.",
      "Om dit op te lossen heb ik eerst onderzoek gedaan naar verschillende VR-menusystemen, zoals world-space, view-fixed en radiale menu's. Daarnaast analyseerde ik bestaande VR-games zoals Beat Saber en Half-Life: Alyx om te begrijpen welke interactiepatronen intuïtief werken binnen virtual reality. Uit dit onderzoek bleek dat een schaalbaar world-space/view-fixed menu de beste oplossing was voor complexe interfaces met veel processen en stappen.",
      "Vervolgens heb ik twee menuconcepten ontworpen en getest via een A/B-test met gebruikers. Hieruit bleek dat één compact radiaal menu sneller begrepen werd, maar dat een uitgebreider gestructureerd menu beter werkte bij 50+ processen. Op basis van deze resultaten heb ik een definitief menu ontworpen dat overzichtelijk bleef, ook bij grotere datasets.",
      "Tijdens gebruikerstesten bleek dat de meerderheid van de testers het menu duidelijk en makkelijk te gebruiken vond, waarmee het doel van een toegankelijker en gebruiksvriendelijker VR-menu succesvol werd behaald.",
    ],
    sections: [
      {
        heading: "Het world-space menu",
        text: [
          "Het menu is volledig world-space in plaats van een fullscreen overlay. Het kan op elk moment geopend en gesloten worden met een knop op de controller, waarna het, waar de speler ook staat, voor hun ogen wordt geopend, waarbij dit hiervoor alleen mogelijk was via de host laptop waarop de game runde. ",
        ],
        list: [
          "Bij het openen zijn alleen de folders zichtbaar; processen en stappen verschijnen pas na een keuze, zodat het overzicht blijft.",
          "De speler kan meerdere toggles tegelijk aan- en uitzetten, maar ziet altijd de processen en stappen van de laatst geactiveerde optie.",
          "Elk onderdeel heeft een knop die alle geactiveerde toggles in dat paneel weer deactiveert.",
          "Het menu laat altijd zien welke folder en welk proces je op dat moment open hebt staan.",
          "Duidelijke kleurvakken en titels per onderdeel voorkomen verwarring; scrollbars houden het menu bruikbaar als het aantal opties groeit.",
          "De achtergrond is doorzichtig, zodat je de effecten van het selecteren van opties direct in de omgeving ziet.",
        ],
        image: {
          src: "/images/orginsights-worldspace-menu.png",
          alt: "Het world-space VR-menu met Folders, Processes en Steps panelen",
          caption:
            "Het world-space menu in VR: folders, processen en stappen in aparte panelen, met een doorzichtige achtergrond.",
        },
        code: {
          caption: "Uit MenuFollowHead.cs — world-fixed of view-fixed met één optie",
          snippet: `[Header("View-fixed?")]
[SerializeField] private bool followWhileOpen = true;

private void LateUpdate()
{
    if (!isOpen || !followWhileOpen) return;
    MoveMenuInFrontOfHead(smooth: true);
}

private void MoveMenuInFrontOfHead(bool smooth)
{
    // Alleen de horizontale kijkrichting gebruiken, zodat het menu
    // niet scheef hangt als de speler omhoog of omlaag kijkt
    Vector3 forward = head.forward;
    forward.y = 0f;
    forward.Normalize();

    Vector3 targetPos = head.position + forward * distance
                      + Vector3.up * heightOffset;

    if (!smooth)
    {
        menuRoot.position = targetPos;
        menuRoot.rotation = targetRot;
    }
    else
    {
        menuRoot.position = Vector3.Lerp(menuRoot.position, targetPos,
            Time.deltaTime * positionLerp);
        menuRoot.rotation = Quaternion.Slerp(menuRoot.rotation, targetRot,
            Time.deltaTime * rotationLerp);
    }
}`,
          explanation:
            "Eén instelbare boolean bepaalt of het menu op zijn plek blijft staan (world-fixed) of meebeweegt met het hoofd (view-fixed). Bij het openen wordt het menu direct vóór de speler op ooghoogte geplaatst. Uit onderzoek en testen bleek dat view-fixed een oncomfortabele ervaring gaf voor spelers, en deze optie is later dus compleet weggelaten.",
        },
      },
      {
        heading: "Schaalbaar tot 50+ processen",
        text: [
          "Uit het onderzoek bleek dat de interface moest kunnen groeien tot tientallen processen met elk hun eigen stappen. Daarom is de menu-inhoud volledig data-gedreven opgezet: de structuur van folders, processen en stappen wordt in de Unity Inspector gevuld, en de UI bouwt zichzelf tijdens runtime op uit toggle-prefabs.",
        ],
        code: {
          caption: "Uit ProcessMenuManager.cs — de datastructuur achter het menu",
          snippet: `[System.Serializable]
public class FolderDefinition
{
    public string folderName;
    public ProcessDefinition[] processes;
}

[System.Serializable]
public class ProcessDefinition
{
    public string processName;
    public StepDefinition[] steps;
}

[System.Serializable]
public class StepDefinition
{
    public string stepName;
    public Graphic[] highlightGraphics;   // UI die oplicht
    public DeskEffect[] deskEffects;      // effecten in de omgeving
}

// De UI wordt hieruit op runtime opgebouwd:
Toggle t = Instantiate(stepTogglePrefab, stepsParent);
SetToggleLabel(t, stepDef.stepName);
t.onValueChanged.AddListener(toggleIsOn =>
{
    stepSelectionStates[folderIndex][processIndex][stepIndex] = toggleIsOn;
    ApplyStepVisuals(folderIndex, processIndex, stepIndex, toggleIsOn, captured);
});`,
          explanation:
            "Nieuwe processen of stappen toevoegen betekent alleen data invullen. Er hoeft geen UI met de hand gebouwd te worden. Elke stap weet zelf welke UI-elementen moeten oplichten en welke effecten in de omgeving bij hem horen, en de selectiestatus wordt per folder, proces en stap onthouden.",
        },
      },
      {
        heading: "De modulaire kantooromgeving",
        text: [
          "Voor dit project heb ik ook een modulaire kantooromgeving ontworpen en uitgewerkt in Blender en Quixel Mixer, bedoeld voor gebruik binnen een realtime 3D/VR-omgeving. Ik begon met het maken van een floorplan en moodboard, waarbij ik rekening hield met zowel functionele eisen als performance-optimalisatie, zoals herbruikbare assets, low-poly modelling en een logische scene-structuur.",
          "Tijdens het proces ontdekte ik dat één groot model niet efficiënt werkte voor UV-unwrapping en performance. Daarom heb ik het ontwerp opgesplitst in losse, herbruikbare onderdelen (prefabs) zoals muren, deuren en glaswanden, die later flexibel in Unity geplaatst konden worden. Vervolgens heb ik de modellen geoptimaliseerd met UV-unwrapping, baked ID masks en texture-workflows in Quixel Mixer om verschillende materialen toe te passen zonder performanceverlies.",
          "Het eindresultaat was een schaalbare en geoptimaliseerde kantooromgeving met modulaire assets, realistische materialen en een workflow die geschikt is voor verdere uitbreiding binnen realtime applicaties en VR-projecten.",
        ],
        image: {
          src: "/images/orginsights-modular-environment.png",
          alt: "Modulaire kantoor-assets: een tafel en een muursegment met kastruimtes, gemaakt in Blender",
          caption:
            "Voorbeelden van de modulaire assets uit de kantooromgeving: een tafel en een muursegment met kastruimtes.",
        },
      },
      {
        heading: "Guidance door de omgeving",
        text: [
          "Wanneer een stap in het menu wordt geactiveerd, worden de bijbehorende bureaus, die de betrokken en onderdelen in die stap vertegenwoordigen, op meerdere manieren uitgelicht: een paarse highlight, zwevende particles erboven en een oplichtend pad dat naar de bureaus leidt. Zo wordt de gebruiker door de omgeving naar de juiste plekken geleid.",
          "Deze effecten zijn eerst grondig onderzocht met testen, en bleken uiteindelijk de meeste aandacht van de gebruiker te trekken. De highlight is een doorzichtige paarse kubus op de plek van het bureau. Het particle-effect uit Unity zweeft er net boven en beweegt langzaam naar beneden om wat extra aandacht te trekken. Het pad is een line renderer met een glowing materiaal dat vanaf de positie van de speler naar de bureaus loopt; bij meerdere bureaus verschijnen meerdere paden. Het pad past zich elke tien seconden aan de nieuwe positie van de speler aan, zodat het altijd blijft kloppen, ook als je door de omgeving loopt. Buiten een bepaald bereik verdwijnen de effecten en zodra je weer dichterbij komt verschijnen ze opnieuw.",
        ],
        image: {
          src: "/images/orginsights-guidance.png",
          alt: "VR-omgeving met paarse highlight op een bureau, particles en oplichtende paden vanaf de controller",
          caption:
            "De guidance-effecten in actie: highlight, particles en oplichtende paden die de gebruiker naar de juiste bureaus leiden.",
        },
        code: {
          caption: "Uit DeskEffect.cs — het pad dat met de speler meebeweegt",
          snippet: `private void UpdatePath()
{
    updateTimer += Time.deltaTime;
    if (updateTimer >= updateInterval)   // elke 10 seconden
    {
        updateTimer = 0;
        SetNewStartPoint(currentPlayer);
    }

    // Startpunt glijdt soepel naar de nieuwe positie van de speler
    startPoint = Vector3.Lerp(startPoint, targetStartPoint,
        followSpeed * Time.deltaTime);

    pathLine.SetPosition(0, startPoint);
    Vector3 end = deskTransform.position;
    end.y = 0.1f;
    pathLine.SetPosition(1, end);
}

// Meerdere stappen kunnen hetzelfde bureau aanwijzen,
// daarom een teller in plaats van een simpele aan/uit-bool
public void AddRequest(Transform player)
{
    activeRequests++;
    currentPlayer = player;
}

public void RemoveRequest()
{
    activeRequests = Mathf.Max(0, activeRequests - 1);
}`,
          explanation:
            "Elk bureau-effect telt hoeveel actieve stappen hem nodig hebben: pas als de laatste stap wordt uitgezet, verdwijnen de highlight, particles en het pad. Het startpunt van het pad beweegt met een lerp soepel naar de nieuwe positie van de speler in plaats van te verspringen. Voor elk effect is een prefab gemaakt die als child onder het bureau-object wordt geplaatst.",
        },
      },
    ],
    link: null,
  },
  {
    slug: "prism-break",
    title: "Prism Break",
    tagline: "3D Action Prototype",
    thumbnail: "/images/prism-break.gif",
    banner: "/images/prism-break.png",
    role: "Solo-ontwikkelaar",
    tools: ["Unity", "C#"],
    period: "2025",
    summary:
      "Soloprototype in Unity en C#: beschiet de enemy met kleurkogels om hem te verslaan, terwijl je rondvliegt met een jetpack met gelimiteerde fuel.",
    description: [
      "Dit is een prototype van een game die ik zelf gemaakt heb in Unity en C#. Het is de bedoeling dat je de enemy beschiet met kleurkogels, zodat je hem een kleur kan geven en hem daarmee kan verslaan. Tegelijkertijd vlieg je met een jetpack met gelimiteerde fuel. De enemy verandert in de kleur waarmee hij beschoten wordt, en er kan nooit twee keer achter elkaar met dezelfde kleur geschoten worden. Als je zelf wordt geraakt, verlies je health én je kleur.",
      "Als je alle collectibles hebt verzameld, ben je vijf seconden invincible: je wordt felroze en kunt niet geraakt worden door de enemy. Daarna respawnen de collectibles weer.",
    ],
    sections: [
      {
        heading: "Gameplay",
        images: [
          {
            src: "/images/prism-break.gif",
            alt: "Gameplay uit Prism Break: de speler vliegt met een jetpack over een platform met pilaren",
            caption: "Rondvliegen met de jetpack tussen de pilaren.",
          },
          {
            src: "/images/prism-break-2.gif",
            alt: "Gameplay uit Prism Break: close-up van de speler tussen twee pilaren",
            caption: "De speler van dichterbij tussen de pilaren.",
          },
        ],
      },
      {
        heading: "Nooit twee keer dezelfde kleur",
        text: [
          "De kern van het prototype is de kleur-mechaniek: elke kogel krijgt een willekeurige kleur, maar nooit dezelfde als de vorige. Zo blijft de speler wisselen en kan er geen kleur 'gespamd' worden.",
        ],
        code: {
          caption: "Uit ShootingController.cs — de kleurkogels",
          snippet: `void Shoot()
{
    GameObject bullet = Instantiate(bulletPrefab,
        shootingPoint.position, Quaternion.identity);
    Rigidbody rb = bullet.GetComponent<Rigidbody>();

    Color chosenColor = ChooseDifferentColor();
    lastChosenColor = chosenColor;

    bullet.GetComponent<Bullet>().bulletColor = chosenColor;
    bullet.GetComponent<Renderer>().material.color = chosenColor;

    // Zorg ervoor dat de kogel in de richting van de camera vliegt
    rb.linearVelocity = cameraTransform.forward * bulletSpeed;
}

Color ChooseDifferentColor()
{
    Color chosenColor;
    do
    {
        chosenColor = bulletColors[Random.Range(0, bulletColors.Length)];
    } while (chosenColor == lastChosenColor);

    return chosenColor;
}`,
          explanation:
            "De do-while-lus runt net zo lang een willekeurige kleur tot die verschilt van de vorige. De kogel geeft zijn kleur door aan de enemy zodra die geraakt wordt.",
        },
      },
      {
        heading: "Jetpack met fuel-management",
        text: [
          "De jetpack verbruikt fuel zolang je vliegt en vult langzaam weer bij zodra je op de grond staat. Op is op, dan valt de speler terug met extra zwaartekracht bij het dalen, zodat het vliegen snappy blijft voelen in plaats van zweverig.",
        ],
        code: {
          caption: "Uit PlayerController.cs — fuel verbruiken en bijvullen",
          snippet: `// Als spatie ingedrukt is en er brandstof is, verminder brandstof
if (isSpacePressed && currentFuel > 0)
{
    currentFuel -= fuelConsumptionRate * Time.deltaTime;
    if (currentFuel <= 0)
    {
        currentFuel = 0; // Stop met vliegen als de brandstof op is
    }
}

if (!isSpacePressed && currentFuel < maxFuel)
{
    currentFuel += fuelRefillRate * Time.deltaTime;
    if (currentFuel > maxFuel) currentFuel = maxFuel;
}`,
          explanation:
            "Verbruik en bijvullen zijn allebei instelbaar via de Inspector, zodat de balans van het vliegen makkelijk te tweaken was tijdens het testen.",
        },
      },
    ],
    link: "https://rhijnl.itch.io/prism-break",
  },  {
    slug: "stoplight-chaos",
    title: "Stoplight Chaos",
    tagline: "3D Arcade Game",
    thumbnail: "/images/stoplight-chaos.gif",
    banner: "/images/stoplight-chaos.png",
    role: "Gameplay-programmering: stoplichten & laser",
    tools: ["Unity", "C#"],
    period: "2024",
    summary:
      "Arcade game in teamverband gemaakt in Unity en C#. Ik bouwde de stoplichten die dynamisch van positie wisselen, het sound-design en de laser die op de speler schiet.",
    description: [
      "Deze game is gemaakt in teamverband in Unity en C#. Persoonlijk heb ik gewerkt aan de stoplichten zelf, die dynamisch switchen van positie, het sound-design en het schieten van de laser richting de player. Je kunt over de laser heenspringen, maar verliest health als je geraakt wordt.",
      "De boss die je uiteindelijk moet verslaan door deze te slaan is expres groter gemaakt en heeft een andere kleur gekregen, zodat deze duidelijk als baas te onderscheiden is van de andere stoplichten.",
    ],
    sections: [
      {
        heading: "Gameplay",
        image: {
          src: "/images/stoplight-chaos.gif",
          alt: "Gameplay uit Stoplight Chaos: de stoplichten wisselen van kleur en positie terwijl auto's voorbijrijden",
          caption:
            "De stoplichten wisselen van kleur en positie, elk met een eigen aanvalsfase.",
        },
        // text: [
        //   "Spring over de rijdende auto's om niet te vallen, ontwijk de lasers van het kwaadaardige stoplicht en versla uiteindelijk de boss met je zwaard. De game is direct in de browser te spelen via de knop hieronder.",
        // ],
        // list: [
        //   "WASD — bewegen",
        //   "Spatiebalk — springen",
        //   "Linkermuisknop — zwaardaanval",
        // ],
      },
      {
        heading: "Stoplichten die de baas zijn",
        text: [
          "Het stoplicht zelf dient als een baas: het wisselt automatisch van kleur op instelbare tijden, en elke kleur activeert een eigen aanvalsfase van de boss. Bij het wisselen schakelen zowel de materialen als echte lichtbronnen mee, zodat je altijd in één oogopslag ziet welke fase actief is.",
        ],
        code: {
          caption: "Uit TrafficLightController.cs — elke kleur is een aanvalsfase",
          snippet: `[Header("Auto Mode Settings")]
public bool autoSwitch = true;
public float redTime = 3f;
public float yellowTime = 1f;
public float greenTime = 4f;

void SetLight(LightColor color)
{
    currentColor = color;

    // Elke kleur activeert een eigen aanvalsfase van de boss
    greenAttack.isActive = false;
    orangeAttack.isActive = false;
    redAttack.isActive = false;

    switch (color)
    {
        case LightColor.GREEN:
            currentLightColor = LightColorState.GREEN;
            greenAttack.isActive = true;
            break;
        case LightColor.YELLOW:
            currentLightColor = LightColorState.YELLOW;
            orangeAttack.isActive = true;
            break;
        case LightColor.RED:
            currentLightColor = LightColorState.RED;
            redAttack.isActive = true;
            break;
    }

    // Materialen én echte lichtbronnen schakelen mee
    greenRenderer.material = (color == LightColor.GREEN) ? greenOn : greenOff;
    greenLight.enabled = (color == LightColor.GREEN);
    // ... en hetzelfde voor geel en rood
}`,
          explanation:
            "De tijden per kleur zijn instelbaar in de Inspector, zodat de moeilijkheid makkelijk te tweaken was tijdens playtests. De aanvalsfases (groen, oranje, rood) zijn losse componenten die aan- en uitgezet worden. Mieuwe fases toevoegen kan zonder deze controller te herschrijven.",
        },
      },
      {
        heading: "Lasers uit een object pool",
        text: [
          "De boss schiet lasers richting de positie van de speler. Vóór elk schot klinkt eerst een oplaadgeluid als waarschuwing, zodat je een seconde hebt om weg te springen. De lasers zelf worden niet steeds opnieuw aangemaakt maar hergebruikt uit een object pool, wat beter is voor de performance van de game",
        ],
        code: {
          caption: "Uit BossAttack.cs & LaserPool.cs — richten, schieten, hergebruiken",
          snippet: `private IEnumerator FireLaserWithSound(Vector3 target)
{
    PlayChargeUpSound();                 // waarschuwing voor de speler
    yield return new WaitForSeconds(1f);
    PlayLaserSound();

    Vector3 shootDirection = (target - firePoint.position).normalized;
    Quaternion laserRotation =
        Quaternion.LookRotation(shootDirection) * Quaternion.Euler(90, 0, 0);

    GameObject laser = laserPool.GetLaser();   // hergebruik uit de pool
    laser.transform.position = firePoint.position;
    laser.transform.rotation = laserRotation;
    laser.GetComponent<Rigidbody>().linearVelocity =
        shootDirection * laserSpeed;
    StartCoroutine(DisableLaserAfterTime(laser, 5f));
}

// LaserPool.cs
public GameObject GetLaser()
{
    if (laserPool.Count > 0)
    {
        GameObject laser = laserPool.Dequeue();
        laser.SetActive(true);
        return laser;
    }
    // Extra laser maken als de pool leeg is
    return Instantiate(laserPrefab);
}`,
          explanation:
            "Uitgeschoten lasers gaan na een raak schot of vijf seconden terug de pool in. Een laser kan met het zwaard teruggekaatst worden. Een gedeflecte laser die de boss raakt, doet schade aan de boss zelf.",
        },
      },
    ],
    link: "https://rhijnl.itch.io/stoplight-chaos",
  },
  {
    slug: "graveyard-madness",
    title: "Graveyard Madness",
    tagline: "2D Top-down Shooter",
    thumbnail: "/images/graveyard-madness.png",
    banner: "/images/graveyard-madness.png",
    role: "Leveldesign, gamestates & gameplay-systemen",
    tools: ["MonoGame", "C#"],
    period: "2024",
    summary:
      "Top-down shooter in een spookhuis, gemaakt in teamverband in C# en MonoGame. Ik ontwierp de levels en bouwde onder andere de win- en verliessystemen en het vijandgedrag.",
    description: [
      "Deze game is in teamverband gemaakt in C# en MonoGame. Persoonlijk heb ik de levels gedesigned, samen met de enemy en het schietpatroon. De game wordt moeilijker met elk level, waarin de enemy in het laatste level zelfs heen en weer beweegt. Het doel is om de enemy te beschieten, terwijl je hun aanvallen ontwijkt.",
    ],
    sections: [
      {
        heading: "Mijn bijdrage",
        list: [
          "Player movement en de boundaries van de map",
          "Startscreen, win- en losescreen met restart-knop",
          "Win- en losecondities",
          "Gamestates voor level 1 en 2",
          "Skeletons die naar een willekeurige positie bewegen en daar schieten",
          "Een maximum aantal skeletons tegelijk op het scherm",
          "Query naar de database om je voortgang (behaalde levels) op te slaan",
        ],
      },
      {
        heading: "Wincondities die echt kloppen",
        text: [
          "Je wint pas als je alle vijanden hebt verslagen. Dat klinkt simpel, maar mijn eerste versies deden het net verkeerd: eerst werden bij verlies alle vijanden meteen mee 'gedood' waardoor je ook direct het winscreen zag, en daarna won je al zodra het maximale aantal vijanden gespawnd was zonder ze echt te verslaan. De oplossing was een teller die alleen bij een echte kill omhoog gaat.",
        ],
        code: {
          caption: "Uit Enemy.cs — de winconditie",
          snippet: `public static int EnemiesKilled = 0;

public override void Die()
{
    EnemiesKilled++;
    // Check if all enemies are spawned and all are defeated
    if (EnemiesKilled == MaxEnemies)
    {
        GameEnvironment.GameStateManager.SwitchToState(
            GameStateManager.WIN_SCREEN_STATE);
    }

    // Roep de basis Die() methode aan om het object te verwijderen
    base.Die();
}`,
          explanation:
            "Elke vijand die ook echt sterft telt de statische teller op; pas als die gelijk is aan het totaal, schakelt de game naar het winscreen. Dit soort lessen: eerst de foute aanpak, dan begrijpen waarom die fout is, heb ik in mijn technische documentatie per sprint bijgehouden.",
        },
      },
      {
        heading: "Skeletten met een eigen wil",
        text: [
          "De skeletons in level 2 kiezen een willekeurige positie op de map, bewegen daarheen en beginnen daar met botten gooien. De uitdaging is de basisklasse Enemy die standaard beweegt richting de speler, en dat gedrag moest ik overschrijven zonder de rest van de overerving te breken.",
        ],
        code: {
          caption: "Uit Skeleton.cs — bewegen naar een willekeurige stoppositie",
          snippet: `private void MoveToRandomPosition()
{
    // Calculate direction towards the random stopping position
    Vector2 direction = Vector2.Normalize(randomStopPosition - position);
    Velocity += direction * MovementSpeed;

    if (Vector2.Distance(position, randomStopPosition) < 1f)
    {
        // If close enough to the random position, stop moving
        Velocity = Vector2.Zero;
        isStopped = true;
    }

    Position += Velocity;
}

private void GenerateRandomStopPosition()
{
    // Genereer een willekeurige positie binnen de schermgrenzen
    float randomX = (float)random.Next(60, 750);
    float randomY = (float)random.Next(60, 770);
    randomStopPosition = new Vector2(randomX, randomY);
}`,
          explanation:
            "Zodra een skelet stilstaat, start een schiet-timer die elke paar seconden een botprojectiel richting de speler gooit. Daarnaast houdt het level bij hoeveel skeletten er tegelijk op het scherm staan, zodat het spawnen stopt bij het maximum en pas verdergaat als er eentje verslagen is.",
        },
      },
    ],
    link: null,
  },

];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
