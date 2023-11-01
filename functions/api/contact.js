export async function onRequestPost({ request, env }) {
    try {
        return await handleRequest(request, env);
    } catch (e) {
        return new Response("Error sending message:" + e.message, { status: 500 });
    }
}

async function handleRequest(request, env) {
    const ip = request.headers.get("CF-Connecting-IP");
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("message");
    const message = formData.get("message");
    const token = formData.get("cf-turnstile-response");

    const tokenValidated = await validateToken(token, env.SECRET_KEY, ip);

    if (!tokenValidated) {
        return new Response("Token validation failed", { status: 403 });
    }

    if (await forwardMessage(env, name, email, phone, message)) {
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

async function forwardMessage(env, name, email, phone, message) {
    const body = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
    
      ${message} 
    `;

    const data = {
        to: env.TO_EMAIL_ADDRESS,
        from: env.FROM_EMAIL_ADDRESS,
        subject: `New Contact from ${json.email}`,
        text: body,
    };

    const submitUrlString = encodeURI(
        Object.entries(data)
            .map((param) => param.join("="))
            .join("&")
    );

    const init = {
        method: "POST",
        headers: {
            Authorization: "Basic " + btoa("api:" + env.MAILGUN_API_KEY),
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": submitUrlString.length.toString(),
        },
        body: submitUrlString,
    };

    const result = await fetch(`${env.MAILGUN_API_BASE_URL}/messages`, init);
    return result.status === 200;
}