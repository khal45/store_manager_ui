import { getContent, getCookieValue } from "./getContent.js";
const apiUrl = "http://localhost:4000/api/v1/users";
getContent(apiUrl);

document.addEventListener("DOMContentLoaded", () => {
  const msg = document.querySelector(".msg");
  const createUserForm = document.getElementById("create-attendant");
  const accessToken = getCookieValue("accessToken");

  const addUser = async (event) => {
    event.preventDefault();
    const username = document.getElementById("user-name").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      };

      const response = await fetch(
        "http://localhost:4000/api/v1/users/register",
        options
      );
      const data = await response.json();

      if (!response.ok) {
        msg.textContent = data.message || "An error occured try again!";
        msg.classList.remove("msg-success");
        msg.classList.add("msg-failure");
        return;
      }

      if (data.success) {
        msg.textContent = data.message || "Operation successful!";
        msg.classList.remove("msg-failure");
        msg.classList.add("msg-success");
        return;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  if (createUserForm) createUserForm.addEventListener("submit", addUser);
});
