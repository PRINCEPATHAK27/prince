# Forever With You

A cinematic interactive love site built for Palak, by Prince Pathak.

## How to view it
Unzip everything, then just double-click `index.html` — it opens in your browser. No install, no server needed.

## Pages (in order)
1. `index.html` — welcome
2. `story.html` — your love story timeline (**click the text and edit it** — it's just placeholder for now)
3. `chat.html` — a WhatsApp-style scripted conversation (edit the `script` array inside the page to write your real messages)
4. `gallery.html` — a 25-photo gallery
5. `game.html` — catch-the-hearts mini game
6. `puzzle.html` — sliding photo puzzle
7. `letter.html` — password-locked letter (password: **Tamatar**)
8. `night.html` — tap stars to reveal messages
9. `proposal.html` — the final moment, with confetti + fireworks

## Adding your real photos
Drop images into the `images/` folder named `photo1.jpg` through `photo25.jpg`. The gallery and the puzzle (which uses `photo1.jpg`) will pick them up automatically — no code changes needed. Until you add them, placeholder hearts show instead, so the site still works.

## Editing the words
- **story.html** — the three `<textarea>` boxes hold your memories, just click and retype.
- **chat.html** — near the bottom of the file, edit the `script` array (`{ sender:"me"/"them", text:"..." }`) to match your real conversation.
- **letter.html** — the big `<textarea>` under "to Palak" is yours to rewrite.
- **night.html** — the `messages` array at the top of the script holds the six things you want to say.
- **proposal.html** — change the headline text if you want different wording for the question.

## Folder structure
```
index.html, story.html, chat.html, gallery.html, game.html,
puzzle.html, letter.html, night.html, proposal.html
css/style.css
js/main.js, gallery.js, confetti.js, fireworks.js
images/  (put your photos here)
```

No music is included, per your request — the site is fully silent by design.
