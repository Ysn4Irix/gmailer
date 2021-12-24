<p align="center">
 <img width="350px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1640357671/nomxnr1ubetauyre96j2.svg" align="center" alt="gmail" />
</p>

<h1 align="center">G.Mailer</h1>

G.mailer An API for sending emails to clients using Gmail API build using [NodeJS](https://nodejs.org) & [Express](https://expressjs.com) & [MongoDB](https://www.mongodb.com/) & [Gmail API](https://developers.google.com/gmail/api/)

## Installation

API requires [Node.js](https://nodejs.org/) v14+ to run.

Clone
Install the dependencies and start the production.

```sh
cd gmailer-server
npm install
npm start or npm run devStart
```

## Usage

GET your API KEY

```endpoint
GET /api/v1/generateKey
```

#### Example response

```json
{
  "status": 200,
  "success": true,
  "message": "API KEY successfully Generated 🎉",
  "response": "nvpY0X1rmRJnxQEh9JqAmpLQr9uE50b8eOf"
}
```

Send email to client

```endpoint
GET /api/v1/send/:email/:template/:apikey
```

Replacing Parameters

Email : receiver email
template : template to be sending with html format (Located in templates Folder)
apikey : APIKEY generated erlier

#### Example response

```json
{
  "status": 200,
  "success": true,
  "message": "Email sent successfully 🎉",
  "response": "250 2.0.0 OK  1640356687 y1sm7647830wrm.3 - gsmtp"
}
```

## Deploy Your Own Server

Rename .env.example to .env & Replace environment variables with your own

Creadentials can be get from [This Link](https://console.cloud.google.com/home)

## License

MIT
