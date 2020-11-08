class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getCardList(token) {
  
    return fetch(this.baseUrl + "/cards", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  getUserInfo(token) {
    return fetch(this.baseUrl + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  setAvatar(link, token) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  setUserInfo({ name, about }, token) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  addNewCard({ title, link }, token) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: title,
        link,
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  deleteCard(cardId, token) {
    return fetch(this.baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  }

  updateLikes(cardId, isLiked, token) {  
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(
      this.baseUrl + `/cards/likes/${cardId}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}

const api = new Api({
  // baseUrl: "https://around.nomoreparties.co/v1/group-2",
  baseUrl: "http://localhost:3001",
});

export default api;
