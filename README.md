# twitter98

## Auth

`User` Schema

```
{
    id: number,
    username: string,
    password: string,
    name: string,
    email: string,
    bio?: string,
    avatar?: string,
    bg?: string,
}
```

---

`POST` /auth/register

**Request**

```
{
    username,
    password,
    name,
    email,
    bio,
    avatar,
    bg
}
```

**Response**

`200`

```
{
    token: string
    username: string
}
```

---

`POST` /auth/login

**Request**

```
{
    username: string,
    password: string
}
```

**Response**

`200`

```
{
    token: string,
    username: string
}
```

---

`GET` /auth/verify

**Request**

```
headers: {
    authorization: string
}
```

**Response**

`200`
