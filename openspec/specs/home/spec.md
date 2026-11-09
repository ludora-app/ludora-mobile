# home Specification

## Purpose

Describe what the home screen shows: a yellow header greeting the player, one featured card that guides a player
who has not joined nor created any session yet toward a first action, and the list of all sessions underneath.

## Requirements

### Requirement: Home header

The home screen SHALL open on a yellow header with "Salut {prénom} !", a subtitle and the Ludora mascot, followed
by the featured card when there is one, then a cream panel with rounded top corners holding the sessions list. The
panel SHALL have no handle. The subtitle SHALL depend on the featured card:

- no featured session: "On fait quoi aujourd'hui ?", with a "Créer un match" button that opens the create-session flow;
- matching session: "On a trouvé LA session pour toi.", then "Et celle-ci ? À ton niveau aussi." after "Pas pour moi";
- prepared session: "On t'a préparé une session.", "Rien près de toi : lance la première !" when no session exists
  around, "Rien d'autre ce week-end : lance la tienne !" when every suggestion was passed;
- next match: "Ton prochain match à venir…" for a joined session, "Ta session est en ligne !" for a session the
  player organises.

#### Scenario: Greeting
- **WHEN** Camille opens the home screen
- **THEN** the header reads "Salut Camille !" on a yellow background with the mascot, above the cream panel

#### Scenario: Subtitle follows the featured card
- **WHEN** the featured card is the prepared session and sessions exist around the player
- **THEN** the subtitle reads "On t'a préparé une session."

### Requirement: Ludo's bubble on the first visit

On the first visit of the home screen after the on-boarding, when the featured card is the matching session or the
prepared session, Ludo SHALL speak: a mascot and a speech bubble SHALL replace the subtitle. The bubble SHALL read:

- matching session: "{prénom}, j'ai trouvé LA session pour toi !";
- prepared session, sessions exist around: "Ta session t'attend toujours !";
- prepared session, no session around: "Pas encore de session près de toi. Ta session est prête, sois le premier !".

The app SHALL remember on the device that the first visit took place: on the following visits, the header SHALL
show the plain subtitle. The bubble SHALL never show on an empty profile nor on the next match card, and it SHALL
give way to the plain subtitle once the player taps "Pas pour moi".

#### Scenario: First visit with a matching session
- **WHEN** Camille opens the home screen for the first time after the on-boarding and a session matches her profile
- **THEN** Ludo's bubble reads "Camille, j'ai trouvé LA session pour toi !" in place of the subtitle

#### Scenario: Next visits
- **WHEN** Camille opens the app again later
- **THEN** the header shows the subtitle "On a trouvé LA session pour toi." and no bubble

#### Scenario: Empty profile on the first visit
- **WHEN** a player without any sport opens the home screen for the first time
- **THEN** no bubble is shown

### Requirement: Featured card priority

The header SHALL feature at most one card, chosen in this order:

1. **next match**: the player has an upcoming session, joined or organised;
2. **nothing** (empty profile): the player has no sport preference;
3. **nothing**: the player has already joined or created a session, but has no upcoming one;
4. **matching session**: a recommended session is left that the player did not pass with "Pas pour moi";
5. **prepared session**: otherwise.

While the data needed to choose is loading, the header SHALL show a placeholder instead of a card.

#### Scenario: Matching session first
- **WHEN** a player with a sport has neither joined nor created a session, and recommended sessions exist
- **THEN** the featured card is the best recommended session

#### Scenario: No recommended session
- **WHEN** a player with a sport has neither joined nor created a session, and no session is recommended
- **THEN** the featured card is the prepared session

#### Scenario: Upcoming match wins
- **WHEN** the player has joined an upcoming session
- **THEN** the featured card is that next match, whatever the recommendations

### Requirement: Empty profile

When the player has no sport preference, the home screen SHALL feature no session, show no bubble and no "Pour
toi" badge, and offer "Créer un match" under the subtitle "On fait quoi aujourd'hui ?". The list of all sessions
SHALL stay underneath.

#### Scenario: Sport skipped at the on-boarding
- **WHEN** a player who skipped the sport step opens the home screen
- **THEN** the header shows "On fait quoi aujourd'hui ?" and "Créer un match", and the list shows every session without "Pour toi" badge

### Requirement: Featured matching session

The matching session card SHALL show the sport and format, the organiser and the level, the remaining seats, the
fill bar, the date and time range, the place and its distance, and the reasons of the match as green pills:

- "Ton niveau" when the session's level is the player's level for that sport, or open to all levels;
- the day and moment of the session (e.g. "Samedi aprèm") when it falls in one of the player's availabilities;
- "À {distance} km" when the distance is known.

"Rejoindre" (red) SHALL join the session with a team assigned by the server, then the home screen SHALL show the
next match card. A failed join SHALL keep the card and show an error message.

#### Scenario: Reasons of the match
- **WHEN** the featured session is a level 2 football session on Saturday at 15:00, 1.4 km away, and the player plays football at level 2 and is available on Saturday afternoons
- **THEN** the card shows the pills "Ton niveau", "Samedi aprèm" and "À 1,4 km"

#### Scenario: Join the featured session
- **WHEN** the player taps "Rejoindre"
- **THEN** the player joins the session in the team the server picks, and the header shows "Ton prochain match à venir…" with that session

### Requirement: Not for me

"Pas pour moi" (beige) SHALL replace the featured session with the next recommended one, at most 3 suggestions in
a row. When none is left, the prepared session SHALL take its place with the subtitle "Rien d'autre ce week-end :
lance la tienne !". The passed sessions SHALL be remembered until the app is closed; they SHALL stay in the list.

#### Scenario: Next suggestion
- **WHEN** two sessions are recommended and the player taps "Pas pour moi" on the first one
- **THEN** the second one is featured with the subtitle "Et celle-ci ? À ton niveau aussi."

#### Scenario: No suggestion left
- **WHEN** the player taps "Pas pour moi" on the last suggestion
- **THEN** the prepared session is featured with the subtitle "Rien d'autre ce week-end : lance la tienne !"

#### Scenario: App reopened
- **WHEN** the player closes the app after passing a suggestion and opens it again
- **THEN** that suggestion can be featured again

### Requirement: Featured prepared session

The prepared session SHALL follow the same rules as the prepared first session of the on-boarding
(`onboarding-first-session`, "Prepared session values"), recomputed each time the home screen opens. Nothing SHALL
be saved before the player publishes it.

Its card SHALL show the sport and format, "Préparée pour toi · niveau {niveau}", the date and time range, the field
and its distance, and, when compatible players are free at that time, a pink hint "N joueurs compatibles sont
dispos {jour} {moment}" with up to two avatars and the number of the others. It SHALL offer:

- "Modifier", which opens the prepared session screen where the field and the time slot can be changed, until the
  "Modifier la session" page exists (SCRUM-693);
- "Publier ma session" (red), which creates the session as a public session, then the home screen shows the next
  match card. A failed publish SHALL keep the card and show an error message.

When no public field hosting the sport is found in the play area, the card SHALL show "Choisir où jouer" in place of
the field and of "Publier ma session", opening the prepared session screen.

#### Scenario: Publish the prepared session
- **WHEN** the player taps "Publier ma session"
- **THEN** the session is created, and the header shows "Ta session est en ligne !" with that session

#### Scenario: Nothing saved before publishing
- **WHEN** the player leaves the home screen without publishing
- **THEN** no session is created, and the prepared session is computed again on the next opening

#### Scenario: Compatible players hint
- **WHEN** 8 players compatible with the prepared session are free on Saturday afternoon
- **THEN** the card shows two avatars, "+6" and "8 joueurs compatibles sont dispos samedi aprèm"

#### Scenario: No field found
- **WHEN** no public field hosting the sport exists in the play area
- **THEN** the card shows "Choisir où jouer", which opens the prepared session screen

### Requirement: Next match card

When the player has an upcoming session, joined or organised, the featured card SHALL be the next one by start
date, without any button; tapping it SHALL open the session. The card SHALL show the sport and format, the fill bar,
the date and time range, and the place with its distance, plus:

- for a joined session: the player's team and the number of players ("Équipe A · 8/10 joueurs") and a green
  "Inscrit" pill;
- for an organised session: "Tu organises · niveau {niveau}" and the number of players over the capacity ("1/10").

#### Scenario: Joined session
- **WHEN** the next match is a session the player joined in team A, with 8 players out of 10
- **THEN** the card shows "Équipe A · 8/10 joueurs" and the "Inscrit" pill

#### Scenario: Organised session
- **WHEN** the next match is the session the player just published, with 1 player out of 10
- **THEN** the card shows "Tu organises · niveau moyen" and "1/10"

### Requirement: Sessions list

Under the header, "Toutes les sessions" SHALL list the upcoming sessions around the player, within 10 km unless the
filters set another distance, with a "Filtres" button opening the filters page, and sport chips ("Tous", then each
sport) that filter the list on one sport. The list SHALL show neither a search input, nor the place and radius, nor
a week calendar. A card SHALL have no button: tapping it SHALL open the session.

#### Scenario: Filter by sport
- **WHEN** the player taps the "Basket" chip
- **THEN** only basketball sessions are listed, and tapping "Tous" lists every sport again

#### Scenario: Open a session
- **WHEN** the player taps a card of the list
- **THEN** the session opens

### Requirement: Sessions list badges

A card of the list SHALL carry a "Tu es inscrit" badge (green) when the player has joined that session, otherwise a
"Pour toi" badge (pink, with a star) when the session is recommended to the player. An empty profile SHALL show no
"Pour toi" badge.

#### Scenario: Recommended session
- **WHEN** a listed session is recommended to the player
- **THEN** its card carries "Pour toi"

#### Scenario: Joined session
- **WHEN** the player has joined a listed session
- **THEN** its card carries "Tu es inscrit", not "Pour toi"

### Requirement: No session around

When no upcoming session exists within the list's distance and no sport chip nor filter is applied, the list SHALL
give way to an empty state "Pas encore de session à {distance} km" with "Les premières arrivent. Élargis ta zone,
ou lance la tienne juste au-dessus." and, under 20 km, an "Élargir à 20 km" button that widens the list to 20 km.

#### Scenario: Widen the area
- **WHEN** no session exists within 10 km and the player taps "Élargir à 20 km"
- **THEN** the list shows the sessions within 20 km, or "Pas encore de session à 20 km" without button when there is none
