# Library Scavenger Hunt — maintainer's guide

Parham Road Campus Library, J. Sargeant Reynolds Community College.

This repository holds two files. `index.html` is the entire activity. `sw.js` is a small helper that lets the page reload without wifi; you should never need to touch it. There is no server, no database, no account system, and no subscription. If you can edit a Word document, you can maintain this.

---

## What it is

An orientation activity for ECA/dual enrollment, SDV and ENG111 sections. Teams of three or four students share an iPad, work through five tasks around the library, and photograph what they find. Afterward each team presents its work to the class on the projector.

Live at **https://reynoldsprc.github.io/scavengerhunt/**

Two properties matter more than anything else, and any change should preserve them:

**Nothing is uploaded.** Photos and typed answers are stored on the iPad itself and go nowhere. There is no account to create, no platform involved, and no student data leaves the device. This replaced an Instagram-based version, and it matters because some of these students are minors.

**It works without wifi.** Once the page has loaded on an iPad with the network up, a saved copy stays on the device, so the page keeps working and can even be reloaded with no network at all. Students still need the network for the tasks themselves — searching the catalog, opening databases — but the activity never stalls on an upload.

---

## Running a session

**Before class.** Each iPad opens its own address, so students never choose a team:

```
https://reynoldsprc.github.io/scavengerhunt/?team=1
https://reynoldsprc.github.io/scavengerhunt/?team=2
   ...through ?team=8
```

Use the QR codes taped to the cases, or bookmark the right address on each iPad. Load the page while you're still at the desk on decent wifi. iPad 4 should always be Team 4 — the assignment can be permanent.

To see all the addresses at any time: **Staff options → Copy all addresses**, on either the team-picker screen or the task list.

**Staff options ask for a code.** It is `1832` unless someone has changed it. This is not security — it exists so a student can't tap Clear this iPad by accident. The code lives near the top of `index.html`, just above the tasks, if you want to change it.

**During.** Students tap a task, read it, take a photo or grab a screenshot, type their answers, and tap **Stamp it**. Work saves continuously, so a refresh or an accidental tab close loses nothing.

**Presenting.** **Show our work** opens a full-screen view, one item at a time, built for a projector. Connect the iPad by USB-C to HDMI.

**After.** **Staff options → Clear this iPad** erases everything the activity stored on that device. Two confirmations, no undo. Do this before the iPads go to another class.

Clearing does not touch the iPad's Photos app. Photos taken through the activity's own camera button never reach Photos, but screenshots taken with the iPad's buttons do. If that matters for a given class, delete those from Photos as well (and from Recently Deleted).

---

## Editing the tasks

All task text lives in one block near the top of `index.html`, marked:

```
TASKS — edit here. Nothing below this block needs changing.
```

Everything below that block is machinery. You should never need to touch it.

### The shape of one task

```javascript
{title:"Printing",photo:true,fields:[{label:"What login do you use?"},{label:"Cost of a copy"}],
 body:"Ask someone at a first-floor service desk two things about <b>PaperCut</b>..."},
```

| Part | What it does |
|---|---|
| `title` | Short name on the card and in the presentation view. Same formatting rules as `body` |
| `photo` | `true` requires a photo, `false` makes it text-only |
| `fields` | The boxes students type into. `[]` for none |
| `body` | The instructions students read |

Add `long:true` to a field for a large text box instead of a single line — use it for citations:

```javascript
fields:[{label:"Article title"},{label:"MLA citation",long:true}]
```

### Formatting inside `body`

Plain text works. For anything else:

| Write this | To get |
|---|---|
| `<b>Databases</b>` | **bold** |
| `<br><br>` | a paragraph break |
| `&rarr;` | → |
| `&mdash;` | — |
| `&amp;` | & |

**You must write `&amp;` instead of a bare `&`**, and never use a straight double quote inside `body` or `label` — use `&ldquo;` and `&rdquo;` for quotation marks. A stray `"` ends the text early and breaks the page.

### The rules that will bite you

1. **Every task ends with `},` except the last one in a team, which ends with `}`.**
2. **Every team block ends with `],` except team 8, which ends with `]`.**
3. Straight quotes only around the text, curly quotes never.
4. An apostrophe inside text is fine (`librarian's`). A double quote is not.

If the page loads to a blank screen after an edit, it is almost always a missing comma or an unescaped quote. Undo your change in GitHub (see below) and try again more slowly.

Saved answers are matched to tasks by position, so don't add, remove, or reorder a team's tasks while that team's work is still on an iPad. Clear the iPads first, or wait until after the presentations.

---

## Adding or removing a team

The app counts teams automatically — there is no separate number to update. Copy an existing team block, change its number, and adjust the tasks.

```javascript
9:[
 {title:"Team photo",photo:true,fields:[],
  body:"..."},
 ...
]
```

Watch the commas: if team 8 was the last one and you add team 9, team 8's closing `]` now needs to become `],`.

**Remember to make a new QR code** for any team you add, pointing at `?team=9`. To remove a team, delete its whole block and stop using that team's QR code — nothing else needs changing.

---

## Publishing a change

GitHub keeps every previous version forever. You cannot permanently break anything.

**Editing directly in the browser** — best for small task-text changes:

1. Open `index.html` in this repository.
2. Click the pencil icon.
3. Make your change.
4. Scroll down, describe it in a sentence, click **Commit changes**.

**Uploading a replacement file:**

1. **Add file → Upload files**
2. Drag the file in. It must be named exactly `index.html` — watch for your computer hiding the extension and making it `index.html.html`.
3. Describe the change, click **Commit changes**.

Either way, wait about a minute. The **Actions** tab shows a spinner that turns into a green check when the change is live.

**Then expect to see the old version anyway.** GitHub caches pages for up to ten minutes. To check immediately, open the address in a private browsing window, or add `&v=2` to the end and change the number each time. On the iPads themselves, one reload with wifi on is enough to pick up the new version once GitHub has it.

**To undo a change:** the **Commits** list shows every version. Open the one you want, click the three dots, choose **Revert**.

---

## Where the data lives

Photos and answers are stored in the iPad's browser storage, under the address the page was opened from. Practical consequences worth knowing:

- Work survives refreshing, closing the tab, and restarting the iPad.
- It stays until someone taps **Clear this iPad**.
- Photos are shrunk to 1600 pixels and saved as JPEGs before storing, so a full session uses a few megabytes rather than a few hundred.
- **Don't use Safari private browsing.** On current iPadOS the page will appear to work, but everything disappears when the tab closes. On older versions it refuses to save at all and says so.
- **A page added to the Home Screen has separate storage from Safari.** A team that starts in Safari and later opens a Home Screen icon will not see their photos. Pick one method per iPad and stay consistent.
- Nothing is kept centrally. Once an iPad is cleared, that work is gone. **Print / save PDF** exists if you ever want to keep a record, but nothing is saved by default.

---

## Troubleshooting

| What happens | What to do |
|---|---|
| Blank white page after an edit | Syntax error — missing comma or stray `"`. Revert the commit and redo the edit. |
| Change doesn't appear | GitHub cache. Wait ten minutes, or check in a private window. |
| Keyboard won't open after taking a photo | Known iOS quirk. Refresh the page; work is already saved. |
| Page says it cannot save work | Safari private browsing is on. Turn it off and reload. |
| Staff options won't open | The code is `1832` (or whatever it was changed to in `index.html`). |
| Page won't reload with wifi off | The iPad never loaded it with wifi on, so there is no saved copy yet. Load it once on a good connection. |
| Opens straight to a team instead of the picker | That browser has a team stored from earlier. Tap the team chip at the top, or clear the iPad. |
| Page won't load at all | Check the iPad is on a network, and that a content filter isn't blocking `reynoldsprc.github.io`. |
| A team's work has vanished | Check whether someone cleared the iPad, or whether the team is on the wrong device. Work is tied to the iPad it was created on. |

---

## Known limits

These are design decisions, not defects:

- No central record of student work. Deliberate — it is why no accounts or uploads are involved.
- Progress can't be monitored from the desk. You have to walk over.
- Work is tied to one iPad and can't move to another mid-session.
- A cleared iPad cannot be recovered.
- Students still need working wifi for the catalog and database tasks. The app being offline-capable doesn't fix a slow building.

---

## If you need to move it

The whole activity is two text files totalling about 45KB. Keep copies in the library's shared drive alongside the task list documents.

If this GitHub account ever became unavailable, recovery is uploading those two files to any web hosting that uses `https://` and changing one link on the LibGuide. Roughly twenty minutes. The dependency is a web address, not anything irreplaceable.

The durable home for this is college web space, where IT already handles backups. GitHub is a good interim arrangement, not the permanent one.

---

*Built September 2026. Task content adapted from the Parham Road and Downtown Campus scavenger hunt sheets.*
