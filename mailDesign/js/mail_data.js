const date = new Date()
const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const getToday = () => {
    return `${month_names[date.getMonth()]} ${date.getDate()}`
}

export const me = {
    name: "Peter0351",
    email: "peter0351@omail.com"
}

export const mail_data = [{
        subject: "Hey!",
        writer: "George0121",
        recipient: "Me",
        writer_email: "george0121@omail.com",
        recipient_email: me.email,
        date: getToday(),
        content: `Hey!
I'm George.
I'm gonna throw a <strong>game party</strong>.
It will start at next <strong>Saturday 9:00 AM, ends at 1:00 PM</strong>.
If you wanna join, send mail or message to me!`,
        "type": "inbox"
    },
    {
        subject: "Please verify your email.",
        writer: "Gathub",
        recipient: "Me",
        writer_email: "noreply@email.gathub.com",
        recipient_email: me.email,
        date: getToday(),
        content: `Hello,
You need to enter 8-digit code to verify your email.
The code is <strong>12345678</strong>.
Enter the code and enjoy coding!`,
        "type": "inbox"
    },
    {
        subject: "New message from u/Roddet",
        writer: "Roddet",
        recipient: "Me",
        writer_email: "noreply@email.roddet.com",
        recipient_email: me.email,
        date: getToday(),
        content: `The video file submitted for post <strong>Gaming</strong> has been processed successfully.
Your post is now visible to users.`,
        "type": "inbox"
    },
    {
        subject: "Hi!",
        writer: "Me",
        recipient: "George0121",
        writer_email: me.email,
        recipient_email: "george0121@omail.com",
        date: getToday(),
        content: `Hi George!
I decided to join your game party.
Let's have some fun!`,
        "type": "sent"
    },
    {
        subject: "New Code Editor - OCODE",
        writer: "OSoftware",
        recipient: "Me",
        writer_email: "noreply@email.osoft.com",
        recipient_email: me.email,
        date: getToday(),
        content: `Our new code editor <strong style="color: skyblue;">OCODE</strong> is officially released!
You can download in <a href="">http://www.osoft.com/ocode/download</a>.
Happy Coding!`,
        "type": "inbox"
    },
    {
        subject: "Here's the video",
        writer: "Me",
        recipient: ["George0121", "Rose"],
        writer_email: me.email,
        recipient_email: ["george0121@omail.com", "rose123@omail.com"],
        date: getToday(),
        content: `My favorite roblox parkour gap compliation.

<iframe width="560" height="315" src="https://www.youtube.com/embed/7DP8a4CyPwo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        "type": "sent"
    },
    {
        subject: "Your DB has been successfully created!",
        writer: "MYDB",
        recipient: "Me",
        writer_email: "noreply@email.mydb.com",
        recipient_email: me.email,
        date: getToday(),
        content: `Your DB <strong>'TEST_DB'</strong> has been successfully created!
Go to <a href="">http://www.mydb.com/db/TEST_DB</a> and use it!

If you don't use this DB for 1 year, It will be <strong>deleted automatically</strong>.
Also you can disable auto deleting in settings.`,
        "type": "inbox"
    },
    {
        subject: "HEEEALLLOO",
        writer: "Me",
        recipient: ["George0121", "Rose"],
        writer_email: me.email,
        recipient_email: ["george0121@omail.com", "rose123@omail.com"],
        date: getToday(),
        content: `Yea, nothing`,
        "type": "sent"
    }
]