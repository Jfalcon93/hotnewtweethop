export async function getUser(event) {
  event.preventDefault();
  try {
    const usernameResponse = await fetch(
      `/api/users/${event.target.username.value}`
    );
    const user = await usernameResponse.json();
    return user.data.id;
  } catch (error) {
    console.log(error);
  }
}
