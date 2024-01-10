export async function onRequestPost({ request, env }) {
    return await handleRequest(request, env);
}

async function handleRequest(request, env) {
    const ip = request.headers.get("CF-Connecting-IP");
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const receivedToken = formData.get("token");

    const turnstileToken = env.SECRET_KEY;
    const pipeDreamsUrl = env.PIPEDREAM_URL;

    console.log(`${name} - ${email} - ${phone} - ${message}`)

    const tokenValidated = await validateToken(receivedToken, turnstileToken, ip);

    if (!tokenValidated) {
        return new Response("Token validation failed", { status: 403 });
    }

    if (await forwardMessage(pipeDreamsUrl, name, email, phone, message, ip)) {
        return new Response("OK", { status: 200, });
    } else {
        return new Response("Message submission failed", { status: 400 });
    }
}

async function validateToken(token, secret, ip) {
    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);
    formData.append("remoteip", ip);
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
        body: formData,
        method: "POST",
    });
    const outcome = await result.json();
    return outcome.success;
}

async function forwardMessage(url, name, email, phone, message, ip) {
    try {
        const body = `
            <h3>Name: ${name}</h3>
            <h3>Email: ${email}</h3>
            <h3>Phone: ${phone}</h3>
            <h3>IP: ${ip}</h3>
            </br>
            <p>Message: ${message}</p>
            </br>`;
    
         const headers = new Headers()
         headers.append("Content-Type", "application/json")
         const options = {
           method: "POST",
           headers,
           mode: "cors",
           body: JSON.stringify({"html": body}),
         }
         console.log(body)
         const response = await fetch(url, options)
         console.log(response)

         return response.ok;
    } catch (error) {
        console.log(`${name} - ${email} - ${phone} - ${message} - ${url} - ${ip} - ${error}`)
        console.log(error?.message ?? "empty")
        console.error(`Error sending email: ${JSON.stringify(error)}` );
    }
    return false;
}