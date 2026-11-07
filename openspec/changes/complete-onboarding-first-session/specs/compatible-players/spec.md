## Purpose

Decide which players are proposed when a player invites partners to a session, including a session that is
not published yet, using the session's sport, level, format, date and field.

## ADDED Requirements

### Requirement: Compatible players for a session

Given a sport, a level, an optional format, a start date and a field (and optionally a published session), a
player SHALL be proposed only when all of these hold:

- they have a preference for the sport at the same level or one level apart; a session open to every level accepts every level;
- when a format is given and they chose formats for that sport, one of them is the session's format; a player without formats stays compatible;
- they are available on the session's day of week and moment (Paris time);
- the field is inside their play area; a player without a play area stays compatible.

The current player, deleted or banned accounts, accounts blocked in either direction, and, when a published
session is given, its players and already invited players SHALL never be proposed.

#### Scenario: Field inside the play area
- **WHEN** a player's play area is centered on Créteil with a 20 km radius and the field is 14 km away
- **THEN** the player is proposed

#### Scenario: Field outside the play area
- **WHEN** the same player's radius is 10 km
- **THEN** the player is not proposed

#### Scenario: Player without a play area
- **WHEN** a compatible player has no play area
- **THEN** they are proposed after every player who has one, without a distance

#### Scenario: Already invited
- **WHEN** the session is published and a player was already invited to it
- **THEN** that player is not proposed again

### Requirement: Compatible players response protects locations

Each proposed player SHALL come with their id, first name, last name, picture, level for the sport, and distance
in km between their play area center and the field (none without a play area). Their coordinates SHALL never be
returned. Players with a play area SHALL come first, by increasing distance, then by closest level, paginated.

#### Scenario: No coordinates
- **WHEN** the compatible players are returned
- **THEN** no player latitude or longitude is part of the response
