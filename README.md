# c4-new
backend/ — lecture progression
lec1/main.js — just console.log("hello"). First "hello world" script, no Express yet.

lec3/main.js — an axios-based script (not a server) that paginates through dummyjson.com/products, converts each price to a different currency (price * 2.7), and logs a trimmed {id, price, tags, thumbnail} shape. There's also a stray utils/sum.js with a simple sum(a,b) — likely a leftover module-import exercise.

lec4/main.js — the first real Express server, and structurally the most advanced file in the repo:

Splits routes into separate router modules: users/users.route.js and blogs/blogs.router.js, mounted at /users and /blogs.
Has a logging middleware that prints method url once the response finishes (res.on('finish', ...)).
middlewares/check-user-agent.js — blocks any request to /blogs whose User-Agent contains "Mobile" (returns 403).
middlewares/check-blogs-post.js — requires a user-id header (used oddly — it's applied to the blogs GET / route, not the POST /, so the naming and usage don't line up).
utils/fs.util.js — generic readFile/writeFile promise wrappers, written but not actually used by the routers (they call fs.readFile/writeFile directly instead).
Data is "persisted" in flat JSON files (users.json, blogs.json) — no real database anywhere in this repo.
Blog creation cross-references users: POST /blogs reads user-id from headers, looks the user up in users.json, and embeds the full user object as author on the new blog.
davalebebi/ — the assignments
crud/main.js — single-file Express CRUD for /users, backed by users.json. Full create/read/update/delete, no routers/middleware — this predates the lec4 modular style.

dav3/main.js — simplest one: in-memory products array (no file persistence), just GET/POST /products. Data resets every server restart.

dav4/main.js — same idea as dav3 but leveled up to file-based persistence (products.json), with full CRUD and basic validation (title, price, isNew required).

dav44/ — an attempt to redo dav4 with lec4-style modular routers (user.router.js, blogs.router.js). Worth flagging: these two router files are broken — they call app.get(...)/app.put(...) instead of userRouter.get(...)/blogsRouter.get(...), but app is never defined or imported in those files. Requiring them will throw ReferenceError: app is not defined before main.js even finishes booting. The blogs router is also just a stub (GET / handler with an empty body).

Common patterns across the whole repo
Every project uses JSON files as a fake database, read/written via fs/promises on every request (no caching, no real DB).
Consistent status-code conventions: 400 for bad input, 404 for missing records, 201 for creation.
Progression is visible lecture-to-lecture: plain script → single-file Express CRUD → modular routers/middleware → cross-resource logic (blogs referencing users).
