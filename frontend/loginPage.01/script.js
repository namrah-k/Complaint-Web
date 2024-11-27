const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const name = form.querySelector('input[name="name"]')
      ? form.querySelector('input[name="name"]').value
      : null;

    const isSignUp = form.querySelector('input[name="name"]') ? true : false;
    const route = isSignUp ? "register" : "login";
    const payload = isSignUp ? { name, email, password } : { email, password };

    const response = await fetch(`http://localhost:5000/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // Flash message for success
      localStorage.setItem("token", data.token);
      window.location.href = "../HomePage/home.html";
    } else {
      alert(data.message); // Flash message for error
    }
  });
});
