# ripnotes.adamtayler.com

## Purpose:
Allow users to role-play remotely with minimum interruptions for terrain descriptions and character management.

## Minimum Viable Product:
### User Experience
Upon logging in, a user will be able to see a list of his or her invited and joined games. The user will be able to select a game and navigate between views to manage their character or view the current map. Admins will be additionally be able to add maps and to decide which map each character should currently be viewing.

#### *Login Page*
A user will be able to log in or register for an account. Passwords will of course be hashed and salted.

#### *Choose Campaign Page*
A user will first land on a page listing campaigns to which they have access, and which they may select. If the user is the admin for the campaign that he or she selects, the user is then taken to the Creator page. Otherwise, the user is taken to the Map/Navigation page.

#### *Creator Page*
An admin for a campaign manages that campaign from the Creator page. The admin may add maps and items to the campaign, and may invite users to participate in the campaign. The admin assigns maps to users from this page. The Character Sheet page, Choose Campaign page, and Map page can both be reached from the Creator page.

#### *Map Page*
Any user on the map page will be able to see the map shown to that user by the admin. The Character Sheet page and Choose Campaign page can be reached from the Map page, as can the Creator page for the game admin.

#### *Character Page*
A user on the Character page will see the stats, attributes, and equipment for the character they are role-playing. They may make changes to their stats, attributes, and equipment on this page. This will likely be the most difficult part of the project. The Map page and Choose Campaign page can be reached from the Map page, as can the Creator page for the game admin.

### Front-end Implementation
I will be using the Vue CLI with Vue Router for my front-end display and navigation.

### Back-end Implementation
I will be using MongoDB for my backend. There will be a schema each for Items, Maps, Users, and Games.

#### *Games Object*
- Name
- Creator
- Created
- Players
- Maps
- Items
- Default_Character

#### *Items Object*




## Advanced Features
If I have time, I would like to enhance the map/navigation page to allow users themselves to advance to new maps along routes designated by the admin. I would also like to add draggable pins to represent the locations of entities on the map. Finally, I would like include the option for admins to allow users to see each other's character sheets.
