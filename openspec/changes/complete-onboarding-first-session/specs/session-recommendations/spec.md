## Purpose

Decide which existing sessions are proposed to a player after the on-boarding, so that joining one is the
first action offered before creating a session.

## ADDED Requirements

### Requirement: Recommended sessions match the player's profile

A session SHALL be recommended only when all of these hold:

- it is public, upcoming within 14 days, not full, not created nor joined by the player, and no block exists between the player and its creator;
- its sport is one of the player's sports, at the same level, one level above or below, or open to every level;
- its format is one of the player's formats for that sport, when the player chose formats;
- it starts in one of the player's availability slots (day and moment, Paris time), when the player gave availabilities;
- its field is inside the player's play area (distance to the center at most the radius), when the player has one; otherwise within 30 km of the position sent by the app, when it sends one.

A player with neither sport nor availability preferences SHALL get no recommendation.

#### Scenario: One level gap accepted
- **WHEN** the player plays football at level "Initié" and a football session is at level "Confirmé"
- **THEN** the session is recommended

#### Scenario: Two levels gap rejected
- **WHEN** the player plays football at level "Débutant" and a football session is at level "Confirmé"
- **THEN** the session is not recommended

#### Scenario: Play area radius
- **WHEN** the player's play area has a 10 km radius and a session's field is 14 km from its center
- **THEN** the session is not recommended, even if the app sends a GPS position closer to the field

#### Scenario: No play area
- **WHEN** the player has no play area and the app sends its position
- **THEN** sessions within 30 km of that position are recommended

#### Scenario: Ordering and limit
- **WHEN** more sessions match than requested
- **THEN** the earliest ones are returned first, paginated
