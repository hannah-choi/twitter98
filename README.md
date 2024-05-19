# twitter98

## Auth

`User` Schema

```
{
    id: number,
    userid: string,
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
    userid,
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
    userid: string
}
```

---

`POST` /auth/login

**Request**

```
{
    userid: string,
    password: string
}
```

**Response**

`200`

```
{
    token: string,
    userid: string
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
