export async function createChat(id: string) {
    const res = fetch(`/api/community/chats?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      return res;
}