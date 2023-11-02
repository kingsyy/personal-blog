export async function onRequestPost({ request, env }) {
    return await handleRequest(request, env);
}

async function handleRequest(request, env) {
    const ip = request.headers.get("CF-Connecting-IP");
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("message");
    const message = formData.get("message");
    const token = formData.get("token");

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

    const apiKey = env.API_KEY;
    const apiSecret = env.API_SECRET;
    const senderEmail = env.SENDER_EMAIL;
    const recipientEmail = env.RECIPIENT_EMAIL;

    const body = `
    <h3>Name: ${name}<h3/>
    <h3>Email: ${email}<h3/>
    <h3>Phone: ${phone}<h3/>
     </br>
     <p>Message: ${message}</p>`;


    const formData = new FormData();
    formData.append('FromEmail', senderEmail);
    formData.append('FromName', 'Me');
    formData.append('Subject', `New Contact from ${email}`);
    formData.append('Text-part', 'Test text');
    formData.append('Html-part', body);
    formData.append('Recipients', JSON.stringify([{ Email: recipientEmail, Name: 'You' }]));

    const basicAuth = 'Basic ' + btoa(`${apiKey}:${apiSecret}`);
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
            Authorization: basicAuth,
            content
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status} ${response.message}`);
    }
    // try {
    //     const response = await fetch('https://api.mailjet.com/v3.1/send', {
    //         method: 'POST',
    //         headers: {
    //             Authorization: basicAuth,
    //         },
    //         body: formData,
    //     });

    //     if (!response.ok) {
    //         throw new Error(`Request failed with status: ${response.status}`);
    //     }

    //     const data = await response.json();
    //     console.log(data);
    // } catch (error) {
    //     console.error('Error sending email:', error);
    // }


    // const body = `
    //   Name: ${name}
    //   Email: ${email}
    //   Phone: ${phone}

    //   ${message} 
    // `;

    // const data = {
    //     to: env.TO_EMAIL_ADDRESS,
    //     from: env.FROM_EMAIL_ADDRESS,
    //     subject: `New Contact from ${email}`,
    //     text: body,
    // };

    // const submitUrlString = encodeURI(
    //     Object.entries(data)
    //         .map((param) => param.join("="))
    //         .join("&")
    // );
    // const init = {
    //     method: "POST",
    //     headers: {},
    //     body: submitUrlString,
    // };

    // const result = await fetch(`${env.MAILGUN_API_BASE_URL}/messages`, init);
    // return result.status === 200;


}