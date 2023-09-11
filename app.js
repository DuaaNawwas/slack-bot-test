const port = process.env.PORT || 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("@fastify/formbody"));
// Parse JSON request bodies
fastify.addContentTypeParser(
  "application/json",
  { parseAs: "buffer" },
  (req, body, done) => {
    if (body && body.length) {
      try {
        const parsed = JSON.parse(body);
        done(null, parsed);
      } catch (error) {
        done(error);
      }
    } else {
      done(new Error("Invalid JSON body"));
    }
  }
);
fastify.get("/", function (request, reply) {
  reply.type("text/html").send(html);
});

/**
 * @description
 *  this will be called when a user mentions the bot in a channel
 * you will receive the message in the request body with the channel id
 * @steps
 * 1. get the channel id from the request body
 * 2. look for the record in the lookup database that has a channel === req.channel
 * make the conversation_id using the bot_id&channel_id&user_id
 * 3. send the message with the conversation_id and the bot_id to the mock-engines or handle it however you want
 * 4. send a message using this api https://api.slack.com/methods/chat.postMessage and user the token in the heade and in the body use {channel: the saved channel id, [smth]: https://app.slack.com/block-kit-builder  use this to build the message}
 */
fastify.post("/slack-message", function (request, reply) {
  console.log("request.body");
  console.log(request.body);
  console.log("request.body");
  reply.send(request.body);
});
// me A05RS5JS812
// d


/** 
 * @description
 * this will be called when a user uses the command /register in slack after installing the app and inviting the bot to the channel
 * ------
 * @steps
 * 1. the user will get the bot_id jwt token from the bot builder page 
 * 2. you will decode the jwt token to get the bot_id
 * 3. receive the channel id from the request body
 * 4. look for the record in the lookup database that has a channel === req.channel
 * 5. if found then update the record with the bot_id
 * 6. send a message using this api https://api.slack.com/methods/chat.postMessage and user the token in the heade and in the body use {channel: the saved channel id, [smth]: https://app.slack.com/block-kit-builder  use this to build the message}
 * 
 * @NOTE 
 * this api with receive application/x-www-form-urlencoded
*/
fastify.post("/register", (req, res) => {
  const dataFromRequestBody = req.body;
  console.log("request.register 🟢🔴🟢🔴");
  console.log(req.body);
  console.log("request.register 🟢🔴🟢🔴");
  res.send(dataFromRequestBody);
});

/**
 * @description
 * this will be called when a new user install the app
 * and this will be called only once on initial install first thing
 * ------
 * @steps
 * 1. get the code from the request query request.query.code
 * 2. call slack api to get the access token
 * 3. save the access token and the channel id in the lookup database
 * 4. user the url incoming_webhook.url to send the welcome message and the instreuctions
 */
fastify.get("/slack-opt", async function (request, reply) {
  console.log("slack-opt💜💜💜");
  console.log(request.query);
  const formData = new FormData();
  formData.append("code", request.query.code);
  formData.append("client_id", "5876182247284.5876188892036"); // from env & slack App Credentials
  formData.append("client_secret", "5cafe95a65c4ca523779eaf62ad1fefa");
  console.log("formData 🚀🚀🚀");
  console.log(formData);
  console.log("formData 🚀🚀🚀");
  const response = await fetch("https://slack.com/api/oauth.v2.access", {
    method: "POST",
    body: formData,
  });
  console.log("🚀🚀🚀");
  console.log(response);
  console.log("🚀---🚀--🚀");
  console.log(JSON.stringify(response));
  console.log("🚀🚀🚀");
  const data = await response.json();
  console.log("dd🚀🚀🚀dd");
  console.log(data);
  console.log("dd🚀🚀🚀dd");
  const resToSlack = await fetch(data.incoming_webhook.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: data.access_token,
    }),
  });
  console.log("resToSlack");
  console.log(resToSlack);
  console.log("resToSlack");

  reply.send(request.query);
});

fastify.listen({ host: host, port: port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
      section a {
        text-decoration:none;
        color: #1C151A;
      }
      section a:hover {
        text-decoration:none;
        color: #605A5C;
      }
    </style>
  </head>
  <body>
    <section>
      <a href="https://render.com/docs/deploy-node-fastify-app">Hello from Render using Fastify!</a>
    </section>
  </body>
</html>
`;

/**
 * DOCUMENTATION
 * in OAuth & Permissions > Redirect URLs > after install they send a code to the redirect url
 * use the code to call
 * curl -F code=5876182247284.5873760791957.41e093ae9f64bb8b6b7970ce9cbe9f2fe18d6f902ae196b4b2c386ec0646617a -F client_id=5876182247284.5876188892036 -F client_secret=5cafe95a65c4ca523779eaf62ad1fefa https://slack.com/api/oauth.v2.access
 *
 * @returns
 * {
  ok: true,
  app_id: "A05RS5JS812",
  authed_user: { id: "U05RH2V94J2" },
  scope: "app_mentions:read,commands,incoming-webhook",
  token_type: "bot",
  access_token: "xoxb-5876182247284-5876196949668-E77JXbTSWMALNWkCD2bscfzm",
  bot_user_id: "U05RS5STXKN",
  team: { id: "T05RS5C798C", name: "azzam-i2i" },
  enterprise: null,
  is_enterprise_install: false,
  incoming_webhook: {
    channel: "#general", << this is the channel name **Optional save**
    channel_id: "C05S2AXE733", save this to know where to send the message and register it with the bot_id
    configuration_url: "https://azzam-i2i.slack.com/services/B05RK6ASUJ2",
    url: "https://hooks.slack.com/services/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", << this is the webhook url use this 
  },
}
Q : save with the team id or the channel id ?
 */

const ss = {
  ok: true,
  app_id: "A05RS5JS812",
  authed_user: { id: "U05RH2V94J2" },
  scope: "app_mentions:read,commands,incoming-webhook,chat:write",
  token_type: "bot",
  access_token: "xoxb-5876182247284-5876196949668-T8LrIPA9HwyTt4bwaC0tgG8D",
  bot_user_id: "U05RS5STXKN",
  team: { id: "T05RS5C798C", name: "azzam-i2i" },
  enterprise: null,
  is_enterprise_install: false,
  incoming_webhook: {
    channel: "#general",
    channel_id: "C05S2AXE733",
    configuration_url: "https://azzam-i2i.slack.com/services/B05RSGVHYRZ",
    url: "https://hooks.slack.com/services/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",
  },
};
const aa = {
  ok: true,
  app_id: "A05RS5JS812",
  authed_user: { id: "U05RH2V94J2" },
  scope: "app_mentions:read,commands,incoming-webhook,chat:write",
  token_type: "bot",
  access_token: "xoxb-5876182247284-5876196949668-T8LrIPA9HwyTt4bwaC0tgG8D",
  bot_user_id: "U05RS5STXKN",
  team: { id: "T05RS5C798C", name: "azzam-i2i" },
  enterprise: null,
  is_enterprise_install: false,
  incoming_webhook: {
    channel: "#i2i-bot",
    channel_id: "C05RPJR95A7",
    configuration_url: "https://azzam-i2i.slack.com/services/B05RPNEGJPP",
    url: "https://hooks.slack.com/services/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",
  },
};
