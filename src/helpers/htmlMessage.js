export const htmlMessage = (code) => {
    const message =`
        <html>
            <body>
                <p>
                    Olá! tudo bem?
                    <br>
                    Esse é seu código para entrar no app:
                    <br>
                    <h3>${code}</h3>
                </p>
            </body>
        </html>
    `
    return message
} 