export async function sendMessage(message) {
    const res = await fetch("https://living-portfolio.onrender.com/chat/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message
        })
    });
    return res.json();
}
