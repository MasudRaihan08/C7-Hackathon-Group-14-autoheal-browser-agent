import express from 'express';

const app = express();
const port = 5000;

let brokenMode = false;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  const loginButton = brokenMode
    ? '<button id="signin-button" type="button" onclick="location.href='/login'">Sign in</button>'
    : '<button id="login-button" type="button" onclick="location.href='/login'">Login</button>';

  res.send(`
    <!doctype html>
    <html>
      <head><title>Demo Shop</title></head>
      <body style="font-family: Arial; padding: 40px;">
        <h1>Demo Shop</h1>
        <p>Local website for AutoHeal Browser Agent.</p>
        ${loginButton}
        <form action="/search" method="get" style="margin-top: 24px;">
          <label>Search <input name="q" aria-label="Search" /></label>
          <button type="submit">Search</button>
        </form>
        <p><a href="/toggle-break">Toggle UI Break</a></p>
      </body>
    </html>
  `);
});

app.get('/login', (_req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <body style="font-family: Arial; padding: 40px;">
        <h1>Login</h1>
        <form method="post" action="/login">
          <label>Email <input aria-label="Email" name="email" /></label><br/><br/>
          <label>Password <input aria-label="Password" name="password" type="password" /></label><br/><br/>
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/login', (_req, res) => {
  res.send('<h1>Dashboard</h1><p>Welcome demo@example.com</p>');
});

app.get('/search', (req, res) => {
  res.send(`<h1>Search Results</h1><p>Results for ${req.query.q || 'empty search'}</p>`);
});

app.get('/toggle-break', (_req, res) => {
  brokenMode = !brokenMode;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Demo site running on http://localhost:${port}`);
});
