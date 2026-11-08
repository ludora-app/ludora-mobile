## Purpose

Turn the on-boarding answers (sports, play area, availabilities) into a first low-commitment action: join a
matching session, otherwise publish a session Ludora prepared, and remind the player until they have one.

## ADDED Requirements

### Requirement: Routing after the last on-boarding step

Only the sport is required to get a first session. After the last on-boarding step is submitted, the app SHALL
route the player according to the steps they answered.

#### Scenario: Sport skipped
- **WHEN** the player submits the on-boarding without any sport
- **THEN** the app goes to the home screen, without the "Ton profil est prêt" screen and without a prepared session

#### Scenario: Sessions match the profile
- **WHEN** the player answered the sport and the place, and at least one recommended session exists
- **THEN** "Ton profil est prêt" says sessions were found, and its button opens "Sessions pour toi" with at most 5 sessions

#### Scenario: No session matches
- **WHEN** the player answered the sport and the place, and no recommended session exists
- **THEN** "Ton profil est prêt" announces, in positive words, that their first session is waiting (it never says that nothing matches), and its button "Voir ma session" opens the prepared session

#### Scenario: Place skipped
- **WHEN** the player answered the sport but skipped the place
- **THEN** "Ton profil est prêt" says "On te prépare ta première session.", the session suggestions are not shown, and its button opens the prepared session without a field

### Requirement: Session suggestions footer

"Sessions pour toi" SHALL offer two ways out besides joining: "Créer ma propre session", which opens the prepared
session, and "Aller à l'accueil".

#### Scenario: Create my own session
- **WHEN** the player taps "Créer ma propre session" on "Sessions pour toi"
- **THEN** the prepared session opens (not the generic create-session flow)

#### Scenario: Go home
- **WHEN** the player taps "Aller à l'accueil"
- **THEN** the home screen opens

### Requirement: Prepared session values

The prepared session SHALL be computed from the on-boarding answers:

- **sport**: the sport with the highest level; on a tie, the first one chosen;
- **level and format**: those of that sport; without a format, the sport's default format (football 5 vs 5, basketball 5 vs 5, padel 2 vs 2, tennis 1 vs 1); without a level, "Débutant";
- **players**: two teams of the format's size, the creator included;
- **date**: the earliest availability slot starting at least 48 hours from now, preferring a Saturday or Sunday slot when one exists within the 7 days after that delay;
- **time**: 10:00 for the morning, 15:00 for the afternoon, 19:30 for the evening;
- **duration**: the duration set for the sport and format;
- **field**: the nearest approved public field hosting the sport, within the play area (center and radius);
- **visibility**: public.

#### Scenario: Highest level wins
- **WHEN** the player chose football "Initié" then basketball "Confirmé"
- **THEN** the prepared session is a basketball session at level "Confirmé"

#### Scenario: Weekend preferred
- **WHEN** it is Monday 09:00 and the player is available on Wednesday evenings and Saturday mornings
- **THEN** the prepared session starts on the coming Saturday at 10:00

#### Scenario: 48 hours minimum
- **WHEN** it is Friday 12:00 and the player is available on Saturday mornings only
- **THEN** the prepared session starts on the Saturday of the following week at 10:00

#### Scenario: Availabilities skipped
- **WHEN** the player gave no availability
- **THEN** the prepared session starts on the first Saturday at least 48 hours away, at 10:00, and the screen says "Tu n'as pas indiqué de dispos, on propose samedi."

#### Scenario: No field in the play area
- **WHEN** no public field hosting the sport exists in the play area
- **THEN** the field row asks the player to choose where to play, as when the place is missing

### Requirement: Prepared session screen

"Ta première session est prête" SHALL show the prepared session (sport and format, level, date, time and
duration, field and distance, players) with "Modifier", "Publier la session" and an "Aller à l'accueil" link. When
the session has a field and compatible players are free at its time, a hint above the card SHALL show up to two of
their avatars and "N joueurs compatibles sont dispos" with the day and the moment (e.g. "sam. matin"). The
link SHALL ask "Quitter sans publier ?" with "Continuer ma session" and "Aller à l'accueil"; only the latter SHALL go
home, without creating anything. Until the "Modifier la session" page exists (SCRUM-693), "Modifier" SHALL open
"Choisir un terrain", where the player changes the field, the start time and the duration of the same day.

#### Scenario: Compatible players hint
- **WHEN** the prepared session has a field and 3 compatible players are free on Saturday morning
- **THEN** a hint above the card reads "3 joueurs compatibles sont dispos sam. matin", with two avatars

#### Scenario: Publish the prepared session
- **WHEN** the player taps "Publier la session"
- **THEN** the session is created, "Session publiée !" is shown, and the invitation screen opens

#### Scenario: Leave without publishing
- **WHEN** the player taps "Aller à l'accueil", then "Aller à l'accueil" in "Quitter sans publier ?"
- **THEN** the home screen opens and no session is created

#### Scenario: Keep the session
- **WHEN** the player taps "Aller à l'accueil", then "Continuer ma session"
- **THEN** the dialog closes and the prepared session stays as it was

#### Scenario: Edit the prepared session
- **WHEN** the player taps "Modifier" on the prepared session
- **THEN** "Choisir un terrain" opens, and validating a slot updates the field, the start and the end of the prepared session

#### Scenario: Back from the prepared session
- **WHEN** the player goes back from the prepared session
- **THEN** "Ton profil est prêt" shows again

### Requirement: Choose a field when the place is missing

When the prepared session has no field, the field row SHALL read "Choisir où jouer" and stand out, and the main
footer button SHALL read "Choisir où jouer" in beige instead of "Publier la session" in red. Both SHALL open
"Choisir un terrain".

"Choisir un terrain" SHALL list the approved public fields hosting the session's sport, with their count. Each
field SHALL show its photo (or the sport's placeholder) with a "Terrain public" badge, its name, its address,
its distance when a position is known, the hourly start times of the session's day (the session's time highlighted
on the chosen field only), and "Point de rendez-vous, sans réservation".

A search bar SHALL offer a city, district or address search and an "Autour de moi" button. The location
permission SHALL be requested only when the player taps "Autour de moi". The position found or searched SHALL
only sort the fields by distance (within 30 km): it SHALL NOT be saved as the player's play area.

Tapping a start time SHALL open "Combien de temps ?" with 1 h, 1 h 30 and 2 h as quick choices with their end
time, and a − / + stepper by 30 min from 30 min to 6 h showing the duration and its end time, starting on the
prepared duration. "Valider" SHALL set the field, the start and the end of the prepared session, go back to it
and show "Terrain et créneau choisis.". The screen SHALL offer no "Aller à l'accueil": the player leaves it with
the back button.

#### Scenario: Fields without position
- **WHEN** "Choisir un terrain" opens and no position is known
- **THEN** the public fields hosting the sport are listed without distance

#### Scenario: Around me, permission granted
- **WHEN** the player taps "Autour de moi" and grants the location permission
- **THEN** the fields are sorted by distance with their distance shown, and the play area is not saved

#### Scenario: Permission denied
- **WHEN** the location permission is denied
- **THEN** the screen shows "La localisation est désactivée" with "Ouvrir les Réglages", and the search stays available

#### Scenario: Place searched
- **WHEN** the player picks a search result
- **THEN** the input shows that place, the suggestions close, and the fields are sorted by distance from it

#### Scenario: Searched place cleared
- **WHEN** the player clears the input after picking a place
- **THEN** the fields are listed again as without position

#### Scenario: Around me after a searched place, permission denied
- **WHEN** the player taps "Autour de moi" after picking a place and denies the location permission
- **THEN** the input is empty, the fields are listed again as without position, and "La localisation est désactivée" is shown

#### Scenario: Duration adjusted
- **WHEN** the player taps + twice from 2 h in "Combien de temps ?"
- **THEN** the duration reads 3 h with its end time, and no quick choice is highlighted

#### Scenario: Field and time chosen
- **WHEN** the player taps 15:00 on a field, chooses 1 h 30 and taps "Valider"
- **THEN** the prepared session shows that field, starts at 15:00 and ends at 16:30, its header no longer says the place is missing, and "Publier la session" is offered

#### Scenario: Leave without choosing
- **WHEN** the player goes back from "Choisir un terrain" without validating a slot
- **THEN** the prepared session shows again, unchanged

### Requirement: Invite partners after publishing

Once the prepared session is published, "Session publiée" SHALL open without a back button (and without the back
gesture): "Ta session est en ligne. Invite des joueurs.", an "Inviter par lien" card showing the link with "Copier"
and WhatsApp, Messages, Mail and "Plus" shortcuts, then the
compatible players with their level, distance and an "Inviter" / "Invité" toggle. The footer SHALL be "Inviter (n)"
when n players are selected, otherwise "Terminer".

"Inviter (n)" SHALL send the invitations, show "Invitations envoyées." and go home. "Terminer" SHALL go home.

#### Scenario: Invite after publishing
- **WHEN** the player selects 2 players and taps "Inviter (2)"
- **THEN** both players are invited, "Invitations envoyées." is shown and the home screen opens

#### Scenario: Finish without inviting
- **WHEN** no player is selected and the player taps "Terminer"
- **THEN** the home screen opens, and the session stays published

#### Scenario: No compatible player
- **WHEN** no compatible player exists
- **THEN** the screen says "Personne avec les mêmes dispos pour l'instant" and "Invite tes amis avec le lien", and keeps the link card and "Terminer"

#### Scenario: Copy the link
- **WHEN** the player taps "Copier"
- **THEN** the published session's link is copied a toast confirms it, and the button reads "Copié" for 2 seconds

#### Scenario: Share the link
- **WHEN** the player taps WhatsApp, Messages or Mail under the link
- **THEN** that app opens with a message holding the session's sport, date and link; "Plus", or an app that is not installed, opens the system share sheet

#### Scenario: More compatible players than one page
- **WHEN** 23 players are compatible and the player scrolls to the bottom of the list
- **THEN** the next players load under the first 10, with a loader meanwhile, until all 23 are listed

#### Scenario: Loading and error
- **WHEN** the compatible players are loading, or fail to load
- **THEN** skeletons are shown while loading, and an error message with "Réessayer" on failure

### Requirement: Home reminder card

The home screen SHALL show a "Crée ou rejoins ta première session" card ("Choisis où jouer, on s'occupe du
reste.") with "Rejoindre une session" and "Créer une session", as long as the player has neither joined nor
created any session.

#### Scenario: Card shown
- **WHEN** a player who has never joined nor created a session opens the home screen
- **THEN** the reminder card is shown

#### Scenario: Card hidden
- **WHEN** the player has joined or created at least one session
- **THEN** the reminder card is not shown

#### Scenario: Create from the card
- **WHEN** the player taps "Créer une session" and has a sport preference
- **THEN** the prepared session opens, asking for the place if the play area is missing

#### Scenario: Create from the card without a sport
- **WHEN** the player taps "Créer une session" and has no sport preference
- **THEN** the create-session flow opens

#### Scenario: Join from the card
- **WHEN** the player taps "Rejoindre une session"
- **THEN** "Sessions pour toi" opens with the recommended sessions
