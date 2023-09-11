const port = process.env.PORT || 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("@fastify/formbody"));
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
  reply.type("text/html").send("hi");
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
  formData.append("client_id", "5876182247284.5876188892036"); // NOTE: from env & slack App Credentials
  formData.append("client_secret", "5cafe95a65c4ca523779eaf62ad1fefa"); // NOTE: from env & slack App Credentials
  console.log("formData 🚀🚀🚀");
  console.log(formData);
  console.log("formData 🚀🚀🚀");
  const response = await fetch("https://slack.com/api/oauth.v2.access", { // this api uses application/x-www-form-urlencoded
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


//  NOTE: the bot cant wont be able to send messages to the channel unless the user install the app and invite the bot to the channel

