# Programmatic Navigation

## Learning Goals

- Understand the use cases for programmatic navigation
- Use the `useNavigate` hook to perform programmatic navigation
- Use the `redirect` method to perform programmatic navigation

## Introduction

So far, we've used a couple components from React Router to allow our users to
navigate our React site: the `NavLink` and `Link` components. However, it would
also be useful to direct our users to another page **without** them needing to
click a link. For example:

- After logging in to the website, direct our user to the dashboard page
- After logging out of the website, direct our user to the login page
- After creating a new item by filling out a form, direct our user to the detail
  page for that item

All of these actions require us to use **programmatic navigation** to change the
browser URL, and show the user a new page in our application, **without** making
the user click on a link.

**Note:** We have attached some files so you can see an example app in which
programmatic navigation has been implemented. While the basic functionality is
the same as what's described below, there are a number of differences for two
reasons: 1) the code in the lesson is substantially pared down to make it easier
to focus on the specific functionality being explained; and 2) the login/logout
functionality is mocked in the example app so you don't need to run a server. We
recommend that you read through the lesson first, focusing on understanding how
programmatic navigation works. Once you've done that, feel free to start up the
app and explore a (mostly) working example.

## The useNavigate Hook

To solve this problem, we can use another custom hook from React Router: the
`useNavigate` hook. Here's how it looks:

```jsx
import { useNavigate } from "react-router-dom";

function NavBar({ onLogout }: Props) {
  const navigate = useNavigate();

  function handleClick() {
    // logout the user
    onLogout();
    // then navigate them to the login page
    navigate("/login");
  }

  return (
    <nav>
      <button onClick={handleClick}>Logout</button>
    </nav>
  );
}
```

By calling `navigate()` and passing it a path, we can effectively navigate the
user to a new page in response to **any** event in our application, not just
when the user clicks a link!

For another example, here's how you could use `navigate()` to redirect the user
after logging in:

```jsx
function Login({ onLogin }: Props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((user) => {
        onLogin(user);
        // after logging the user in, redirect to the home page!
        navigate("/home");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Navigate with useEffect

In cases where we need to handle some conditional rendering, `useNavigate` is
also helpful when used in conjunction with the `useEffect` hook. For example:

```jsx
function Home({ isSignedIn }) {
  const navigate = useNavigate();

  // when this component loads, check if the user is signed in -
  // if not, navigate them to the login page
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  // otherwise, render the home page
  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
}
```

## Conclusion

React Router gives us full control over how to navigate users around our
website. In general, the preferred approach is to use the `<Link>` and
`<NavLink>` components to let users perform navigation by clicking links.
However, there are certain scenarios when we want to navigate a user to a new
page after they perform some other type of action, like submitting a form or
logging out. React Router provides a helpful tool to help us with these
scenarios: the `useNavigate` hook.

## Resources

- [React Router](https://reactrouter.com/en/main)
- [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate)
