SketchPhrase!

A collaborative party game that mixes elements of telephone and pictionary.

The game starts with Player 1 writing down a well-known phrase or person and passing it on. Player 2 sees Player 1's phrase, and must translate it into a drawing. From there, each additional player must translate the preceding phrase/drawing back into a drawing/phrase – all while only seeing the last drawing/phrase. The game ends when each player has gone once, at which time all players see the entire phrase/drawing chain.



Heroku link:



MVP:
- facebook connect/login
- canvas for both phrases and drawings
- canvas alternates between phrases and drawings
- 1 game logged under 1 user with multiple players
- interstititial between turns
- twilio for sharing
- responsively built for screen size
- canvas pixel size depends on screen size as well



Site Flow:
- (login) user logs in
- (welcome) user can read 'how to play', select number of players, and start a new game
- (game) player 1 writes a phrase
- (game) player 2 draws player 1's phrase
- (game) player 3 writes player 2's drawing
- (game) player 4 draws player 3's phrase
...
- (result) all players have played, entire chain is viewable, and shareable via fb or twilio 



API's used:
facebook
our own?



Wishlist:
- a user can play multiple games
- multiple users can sign in and play a game in NOT real-time
- shotgun start in each game (each player starts their own phrase/drawing chains)



Contributors:
https://github.com/msyinmei
https://github.com/rragno
https://github.com/catlag
https://github.com/tifs