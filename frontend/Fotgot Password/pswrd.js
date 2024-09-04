document.getElementById("reset-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("reset-email").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    if (response.ok) {
      alert("Password reset successful!");
      // Redirect or show a success message
    } else {
      alert("Password reset failed!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
