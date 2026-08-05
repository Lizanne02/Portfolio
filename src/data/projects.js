/**
 * ✏️ ALL project content lives in this file.
 *
 * Adding a new project:
 *   1. Copy a project block (from { through },) and paste it into the list.
 *   2. Give it a unique `slug` — that becomes the URL: /projects/<slug>
 *   3. Put the images in /public/images/ and update the paths.
 * The tile and the project page are generated automatically.
 *
 * Field overview:
 *   slug         unique URL name, lowercase-with-dashes
 *   title        name of the project
 *   tagline      short genre/type, shown under the title
 *   thumbnail    image on the tile (16:9 works best)
 *   banner       large image on the project page (21:9 works best)
 *   role         what YOU did on the project
 *   tools        list of engines/languages/tools
 *   period       when it was made
 *   summary      one or two sentences on the tile
 *   description  intro paragraphs for the project page
 *   sections     optional extra sections, each with:
 *                  heading   section heading
 *                  text      list of paragraphs
 *                  list      list of bullets
 *                  image     { src, alt, caption }
 *                  code      { caption, snippet, explanation }
 *   link         optional URL (itch.io, GitHub…) or null
 */

export const projects = [
  {
    slug: "orginsights",
    title: "OrgInsights",
    tagline: "VR menu redesign & 3D environment",
    thumbnail: "/images/orginsights-guidance.png",
    banner: "/images/orginsights-guidance.png",
    role: "VR interaction design, UX research, 3D environment & C# implementation",
    tools: ["Unity", "C#", "XR Interaction Toolkit", "Blender", "Quixel Mixer"],
    period: "2026",
    summary:
      "Redesign of a VR menu and a modular 3D office environment for the Immersive Tech Studio — from research and A/B tests to a working world-space menu in Unity.",
    highlights: [
      "Designed a fully data-driven VR menu that scales to 50+ processes without hand-built UI.",
      "Ran UX research and A/B tests to validate menu concepts with real users.",
      "Built a real-time guidance system with dynamic highlights and paths.",
    ],
    description: [
      "For the Immersive Tech Studio, I worked on redesigning a VR menu to make it more user-friendly, accessible, and scalable for large amounts of data. The existing overlay menu didn't work well in VR, because users couldn't open the menu on their own and the overview got lost with many options.",
      "To solve this, I first researched different VR menu systems, such as world-space, view-fixed, and radial menus. I also analyzed existing VR games such as Beat Saber and Half-Life: Alyx to understand which interaction patterns work intuitively within virtual reality. This research showed that a scalable world-space/view-fixed menu was the best solution for complex interfaces with many processes and steps.",
      "Next, I designed two menu concepts and tested them via an A/B test with users. This showed that one compact radial menu was understood faster, but that a more extensive structured menu worked better with 50+ processes. Based on these results, I designed a final menu that stayed clear even with larger datasets.",
      "During user testing, the majority of testers found the menu clear and easy to use, successfully achieving the goal of a more accessible and user-friendly VR menu.",
    ],
    sections: [
      {
        heading: "The world-space menu",
        text: [
          "The menu is fully world-space instead of a fullscreen overlay. It can be opened and closed at any time with a button on the controller, after which it opens right in front of the player wherever they're standing — whereas before, this was only possible via the host laptop running the game.",
        ],
        list: [
          "When opened, only the folders are visible; processes and steps only appear after a selection, keeping the overview clear.",
          "The player can turn multiple toggles on and off at the same time, but always sees the processes and steps of the most recently activated option.",
          "Each part has a button that deactivates all activated toggles in that panel.",
          "The menu always shows which folder and which process you currently have open.",
          "Clear color blocks and titles per section prevent confusion; scrollbars keep the menu usable as the number of options grows.",
          "The background is transparent, so you can see the effects of selecting options directly in the environment.",
        ],
        image: {
          src: "/images/orginsights-worldspace-menu.png",
          alt: "The world-space VR menu with Folders, Processes, and Steps panels",
          caption:
            "The world-space menu in VR: folders, processes, and steps in separate panels, with a transparent background.",
        },
        code: {
          caption: "From MenuFollowHead.cs — world-fixed or view-fixed with a single option",
          snippet: `[Header("View-fixed?")]
[SerializeField] private bool followWhileOpen = true;

private void LateUpdate()
{
    if (!isOpen || !followWhileOpen) return;
    MoveMenuInFrontOfHead(smooth: true);
}

private void MoveMenuInFrontOfHead(bool smooth)
{
    // Only use the horizontal look direction, so the menu
    // doesn't tilt when the player looks up or down
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
            "A single configurable boolean determines whether the menu stays in place (world-fixed) or moves along with the head (view-fixed). When opened, the menu is placed directly in front of the player at eye level. Research and testing showed that view-fixed gave players an uncomfortable experience, so this option was later dropped entirely.",
        },
      },
      {
        heading: "Scalable to 50+ processes",
        text: [
          "The research showed that the interface needed to be able to grow to dozens of processes, each with their own steps. That's why the menu content is fully data-driven: the structure of folders, processes, and steps is filled in via the Unity Inspector, and the UI builds itself at runtime from toggle prefabs.",
        ],
        code: {
          caption: "From ProcessMenuManager.cs — the data structure behind the menu",
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
    public Graphic[] highlightGraphics;   // UI that lights up
    public DeskEffect[] deskEffects;      // effects in the environment
}

// The UI is built from this at runtime:
Toggle t = Instantiate(stepTogglePrefab, stepsParent);
SetToggleLabel(t, stepDef.stepName);
t.onValueChanged.AddListener(toggleIsOn =>
{
    stepSelectionStates[folderIndex][processIndex][stepIndex] = toggleIsOn;
    ApplyStepVisuals(folderIndex, processIndex, stepIndex, toggleIsOn, captured);
});`,
          explanation:
            "Adding new processes or steps means just filling in data — no UI needs to be built by hand. Each step knows for itself which UI elements should light up and which effects in the environment belong to it, and the selection state is remembered per folder, process, and step.",
        },
      },
      {
        heading: "The modular office environment",
        text: [
          "For this project, I also designed and built a modular office environment in Blender and Quixel Mixer, intended for use within a realtime 3D/VR environment. I started by creating a floorplan and moodboard, taking into account both functional requirements and performance optimization, such as reusable assets, low-poly modeling, and a logical scene structure.",
          "During the process, I discovered that one large model wasn't efficient for UV unwrapping and performance. So I split the design into separate, reusable parts (prefabs) such as walls, doors, and glass panels, which could later be placed flexibly in Unity. I then optimized the models with UV unwrapping, baked ID masks, and texture workflows in Quixel Mixer to apply different materials without losing performance.",
          "The end result was a scalable and optimized office environment with modular assets, realistic materials, and a workflow suited for further expansion within realtime applications and VR projects.",
        ],
        image: {
          src: "/images/orginsights-modular-environment.png",
          alt: "Modular office assets: a table and a wall segment with cabinet space, made in Blender",
          caption:
            "Examples of the modular assets from the office environment: a table and a wall segment with cabinet space.",
        },
      },
      {
        heading: "Guidance through the environment",
        text: [
          "When a step in the menu is activated, the relevant desks — which represent the people and parts involved in that step — are highlighted in several ways: a purple highlight, floating particles above them, and a glowing path leading to the desks. This guides the user through the environment to the right spots.",
          "These effects were thoroughly tested beforehand, and turned out to draw the most attention from users. The highlight is a transparent purple cube at the desk's location. Unity's particle effect floats just above it and moves slowly downward to draw a bit of extra attention. The path is a line renderer with a glowing material that runs from the player's position to the desks; with multiple desks, multiple paths appear. The path updates to the player's new position every ten seconds, so it always stays accurate, even as you walk through the environment. Outside a certain range the effects disappear, and they reappear once you get close again.",
        ],
        image: {
          src: "/images/orginsights-guidance.png",
          alt: "VR environment with a purple highlight on a desk, particles, and glowing paths from the controller",
          caption:
            "The guidance effects in action: highlight, particles, and glowing paths leading the user to the right desks.",
        },
        code: {
          caption: "From DeskEffect.cs — the path that moves along with the player",
          snippet: `private void UpdatePath()
{
    updateTimer += Time.deltaTime;
    if (updateTimer >= updateInterval)   // every 10 seconds
    {
        updateTimer = 0;
        SetNewStartPoint(currentPlayer);
    }

    // Start point glides smoothly to the player's new position
    startPoint = Vector3.Lerp(startPoint, targetStartPoint,
        followSpeed * Time.deltaTime);

    pathLine.SetPosition(0, startPoint);
    Vector3 end = deskTransform.position;
    end.y = 0.1f;
    pathLine.SetPosition(1, end);
}

// Multiple steps can point to the same desk,
// hence a counter instead of a simple on/off bool
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
            "Each desk effect keeps count of how many active steps need it: only once the last step is turned off do the highlight, particles, and path disappear. The path's start point moves smoothly to the player's new position via a lerp instead of jumping. A prefab was made for each effect and placed as a child under the desk object.",
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
    role: "Solo developer",
    tools: ["Unity", "C#"],
    period: "2025",
    summary:
      "Solo prototype in Unity and C#: shoot the enemy with color bullets to defeat it, while flying around with a jetpack with limited fuel.",
    highlights: [
      "Solo-developed the full prototype in Unity and C#.",
      "Built a color-shooting mechanic that never repeats the same color twice.",
      "Implemented a tunable jetpack fuel system for fast, responsive flight.",
    ],
    description: [
      "This is a prototype of a game I made myself in Unity and C#. The idea is that you shoot the enemy with color bullets, giving it a color and defeating it that way. At the same time, you fly around with a jetpack with limited fuel. The enemy changes to the color it's shot with, and you can never shoot the same color twice in a row. If you get hit yourself, you lose health and your color.",
      "Once you've collected all the collectibles, you become invincible for five seconds: you turn bright pink and can't be hit by the enemy. After that, the collectibles respawn.",
    ],
    sections: [
      {
        heading: "Gameplay",
        images: [
          {
            src: "/images/prism-break.gif",
            alt: "Gameplay from Prism Break: the player flies with a jetpack over a platform with pillars",
            caption: "Flying around with the jetpack between the pillars.",
          },
          {
            src: "/images/prism-break-2.gif",
            alt: "Gameplay from Prism Break: close-up of the player between two pillars",
            caption: "The player up close between the pillars.",
          },
        ],
      },
      {
        heading: "Never the same color twice",
        text: [
          "The core of the prototype is the color mechanic: every bullet gets a random color, but never the same as the previous one. This keeps the player switching and prevents any color from being 'spammed'.",
        ],
        code: {
          caption: "From ShootingController.cs — the color bullets",
          snippet: `void Shoot()
{
    GameObject bullet = Instantiate(bulletPrefab,
        shootingPoint.position, Quaternion.identity);
    Rigidbody rb = bullet.GetComponent<Rigidbody>();

    Color chosenColor = ChooseDifferentColor();
    lastChosenColor = chosenColor;

    bullet.GetComponent<Bullet>().bulletColor = chosenColor;
    bullet.GetComponent<Renderer>().material.color = chosenColor;

    // Make sure the bullet flies in the direction of the camera
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
            "The do-while loop keeps rolling a random color until it differs from the previous one. The bullet passes its color on to the enemy as soon as it's hit.",
        },
      },
      {
        heading: "Jetpack with fuel management",
        text: [
          "The jetpack consumes fuel as long as you're flying and slowly refills once you're back on the ground. Once it's empty, the player falls with extra gravity while descending, so flying stays snappy instead of floaty.",
        ],
        code: {
          caption: "From PlayerController.cs — consuming and refilling fuel",
          snippet: `// If space is pressed and there's fuel, reduce fuel
if (isSpacePressed && currentFuel > 0)
{
    currentFuel -= fuelConsumptionRate * Time.deltaTime;
    if (currentFuel <= 0)
    {
        currentFuel = 0; // Stop flying when the fuel runs out
    }
}

if (!isSpacePressed && currentFuel < maxFuel)
{
    currentFuel += fuelRefillRate * Time.deltaTime;
    if (currentFuel > maxFuel) currentFuel = maxFuel;
}`,
          explanation:
            "Both consumption and refill rate are configurable via the Inspector, making it easy to tweak the flying balance during testing.",
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
    role: "Gameplay programming: traffic lights & laser",
    tools: ["Unity", "C#"],
    period: "2024",
    summary:
      "Arcade game made as a team in Unity and C#. I built the traffic lights that dynamically switch position, the sound design, and the laser that shoots at the player.",
    highlights: [
      "Built traffic lights that dynamically reposition and double as a multi-phase boss.",
      "Implemented an object-pooled laser system with sword-deflect mechanics.",
      "Designed the sound design and warning cues for boss attacks.",
    ],
    description: [
      "This game was made as a team in Unity and C#. Personally, I worked on the traffic lights themselves, which dynamically switch position, the sound design, and firing the laser at the player. You can jump over the laser, but you lose health if you get hit.",
      "The boss you eventually have to defeat by hitting it was deliberately made bigger and given a different color, so it's clearly distinguishable as the boss from the other traffic lights.",
    ],
    sections: [
      {
        heading: "Gameplay",
        image: {
          src: "/images/stoplight-chaos.gif",
          alt: "Gameplay from Stoplight Chaos: the traffic lights change color and position while cars drive past",
          caption:
            "The traffic lights change color and position, each with its own attack phase.",
        },
        // text: [
        //   "Jump over the moving cars to avoid falling, dodge the lasers from the evil traffic light, and finally defeat the boss with your sword. The game can be played directly in the browser via the button below.",
        // ],
        // list: [
        //   "WASD — move",
        //   "Spacebar — jump",
        //   "Left mouse button — sword attack",
        // ],
      },
      {
        heading: "Traffic lights that are the boss",
        text: [
          "The traffic light itself acts as a boss: it automatically switches color at configurable intervals, and each color activates its own attack phase for the boss. When switching, both the materials and actual light sources switch along with it, so you can always tell at a glance which phase is active.",
        ],
        code: {
          caption: "From TrafficLightController.cs — each color is an attack phase",
          snippet: `[Header("Auto Mode Settings")]
public bool autoSwitch = true;
public float redTime = 3f;
public float yellowTime = 1f;
public float greenTime = 4f;

void SetLight(LightColor color)
{
    currentColor = color;

    // Each color activates its own attack phase for the boss
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

    // Materials and actual light sources switch along too
    greenRenderer.material = (color == LightColor.GREEN) ? greenOn : greenOff;
    greenLight.enabled = (color == LightColor.GREEN);
    // ... and the same for yellow and red
}`,
          explanation:
            "The timing per color is configurable in the Inspector, making it easy to tweak the difficulty during playtests. The attack phases (green, orange, red) are separate components that get turned on and off. New phases can be added without rewriting this controller.",
        },
      },
      {
        heading: "Lasers from an object pool",
        text: [
          "The boss fires lasers at the player's position. Before each shot, a charge-up sound plays as a warning, giving you a second to jump out of the way. The lasers themselves aren't created anew each time but reused from an object pool, which is better for the game's performance.",
        ],
        code: {
          caption: "From BossAttack.cs & LaserPool.cs — aiming, firing, reusing",
          snippet: `private IEnumerator FireLaserWithSound(Vector3 target)
{
    PlayChargeUpSound();                 // warning for the player
    yield return new WaitForSeconds(1f);
    PlayLaserSound();

    Vector3 shootDirection = (target - firePoint.position).normalized;
    Quaternion laserRotation =
        Quaternion.LookRotation(shootDirection) * Quaternion.Euler(90, 0, 0);

    GameObject laser = laserPool.GetLaser();   // reuse from the pool
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
    // Create an extra laser if the pool is empty
    return Instantiate(laserPrefab);
}`,
          explanation:
            "Fired lasers go back into the pool after a hit or after five seconds. A laser can be deflected with the sword. A deflected laser that hits the boss damages the boss itself.",
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
    role: "Level design, game states & gameplay systems",
    tools: ["MonoGame", "C#"],
    period: "2024",
    summary:
      "Top-down shooter in a haunted house, made as a team in C# and MonoGame. I designed the levels and built the win/lose systems and enemy behavior, among other things.",
    highlights: [
      "Designed all levels and the enemy shooting patterns.",
      "Built win/lose conditions and game states across both levels.",
      "Added database queries to save player progress between sessions.",
    ],
    description: [
      "This game was made as a team in C# and MonoGame. Personally, I designed the levels, along with the enemy and its shooting pattern. The game gets harder with each level, and in the last level the enemy even moves back and forth. The goal is to shoot the enemy while dodging their attacks.",
    ],
    sections: [
      {
        heading: "My contribution",
        list: [
          "Player movement and the map boundaries",
          "Start screen, win and lose screen with restart button",
          "Win and lose conditions",
          "Game states for level 1 and 2",
          "Skeletons that move to a random position and shoot from there",
          "A maximum number of skeletons on screen at once",
          "A database query to save your progress (levels completed)",
        ],
      },
      {
        heading: "Win conditions that actually work",
        text: [
          "You only win once you've defeated all enemies. That sounds simple, but my first versions got it slightly wrong: at first, losing 'killed' all enemies at once, which immediately triggered the win screen too, and later you'd win as soon as the maximum number of enemies had spawned without actually defeating them. The fix was a counter that only goes up on an actual kill.",
        ],
        code: {
          caption: "From Enemy.cs — the win condition",
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

    // Call the base Die() method to remove the object
    base.Die();
}`,
          explanation:
            "Every enemy that actually dies increments the static counter; only once it equals the total does the game switch to the win screen. I kept track of lessons like this — first the wrong approach, then understanding why it was wrong — in my technical documentation each sprint.",
        },
      },
      {
        heading: "Skeletons with a mind of their own",
        text: [
          "The skeletons in level 2 pick a random position on the map, move there, and start throwing bones from that spot. The challenge is the base Enemy class, which moves toward the player by default, and I had to override that behavior without breaking the rest of the inheritance.",
        ],
        code: {
          caption: "From Skeleton.cs — moving to a random stop position",
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
    // Generate a random position within the screen boundaries
    float randomX = (float)random.Next(60, 750);
    float randomY = (float)random.Next(60, 770);
    randomStopPosition = new Vector2(randomX, randomY);
}`,
          explanation:
            "Once a skeleton stops, a shooting timer starts that throws a bone projectile at the player every few seconds. The level also keeps track of how many skeletons are on screen at once, so spawning stops at the maximum and only continues once one has been defeated.",
        },
      },
    ],
    link: null,
  },

];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
