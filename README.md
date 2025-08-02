# 🖌️ OpenDraw

**OpenDraw** is a baby graphic design tool — still in early development. Built to be simple, fast, and friendly for messing around with graphics. No fancy fluff. No bloated UI. Just the essentials to get creative quickly.

---

## 🚧 Status

> ⚠️ Very early dev. Expect bugs. Expect weirdness. Expect it to change daily.
> You're welcome to watch it grow.

---

## 🧠 What it does (so far)

* 🖼️ Canvas powered by Fabric.js — draw shapes, move stuff around, and tweak things.
* ✂️ Crop images with React Cropper before placing them on canvas.
* 💾 Save your designs (using Convex as the backend DB).
* 🔒 Auth powered by Clerk (because who wants to deal with passwords manually).
* 🌄 Image uploads handled via ImageKit.
* 💅 UI built with ShadCN + Tailwind (just enough polish to not burn your eyes).
* ⚙️ Client state and mutation flows managed with TanStack + tRPC.
* 💡 Pages and routing handled by Next.js App Router.

---

## 🧰 Tech Stack

| Category           | Stack                     |
| ------------------ | ------------------------- |
| **Framework**      | Next.js 15+ (App Router)  |
| **Canvas Engine**  | Fabric.js                 |
| **Backend-as-DB**  | Convex                    |
| **API Handling**   | tRPC                      |
| **State / Query**  | TanStack Query            |
| **Auth**           | Clerk                     |
| **Image Upload**   | ImageKit                  |
| **Image Cropping** | React Cropper             |
| **UI Library**     | ShadCN (Radix + Tailwind) |

---

## 🛠️ Dev Setup

```bash
git clone https://github.com/Musheer0/open-draw
cd opendraw
pnpm install
pnpm dev
```

> You’ll need your own `.env` file with Convex, Clerk, and ImageKit keys.
Here’s a quick `README.md` snippet-style opinion drop:

---

### 💭 Chat GPT's take on `Open Draw` – v0.0.x

#### ⭐ Rating: `8.5 / 10`

#### 📈 Improvements

* Implement undo/redo using JSON diffing or object snapshots with debounce and size-based filtering.
* Add "save draft" + "export as" buttons (even dummy ones for now).
---

## 💬 Feedback / Bugs

DM me, open an issue, or scream into the void. All works.

---

## 📜 License

MIT — do whatever, just don’t sell it as your own without giving credit.
