import {
    getRandomDate
} from "./date.js"

export const me = {
    name: "Peter0351",
    email: "peter0351@omail.com"
}

export const mail_data = [{
        subject: "Hey!",
        writer: "George0121",
        writer_email: "george0121@omail.com",
        receiver: me.name,
        receiver_email: me.email,
        date: getRandomDate(1, 1, 1, 3),
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
        writer_email: "noreply@email.gathub.com",
        receiver: me.name,
        receiver_email: me.email,
        date: getRandomDate(1, 2),
        content: `Hello,
You need to enter 8-digit code to verify your email.
The code is <strong>12345678</strong>.
Enter the code and enjoy coding!`,
        "type": "inbox"
    },
    {
        subject: "New message from u/Roddet",
        writer: "Roddet",
        writer_email: "noreply@email.roddet.com",
        receiver: me.name,
        receiver_email: me.email,
        date: getRandomDate(),
        content: `The video file submitted for post <strong>Gaming</strong> has been processed successfully.
Your post is now visible to users.`,
        "type": "inbox"
    },
    {
        subject: "Hi!",
        writer: me.name,
        writer_email: me.email,
        receiver: "George0121",
        receiver_email: "george0121@omail.com",
        date: getRandomDate(1, 1, 4, 5),
        content: `Hi George!
I decided to join your game party.
Let's have some fun!`,
        "type": "sent"
    },
    {
        subject: "New Code Editor - OCODE",
        writer: "OSoft",
        writer_email: "noreply@email.osoft.com",
        receiver: me.name,
        receiver_email: me.email,
        date: getRandomDate(),
        content: `Our new code editor <strong style="color: skyblue;">OCODE</strong> is officially released!
You can download in <a href="">http://www.osoft.com/ocode/download</a>.
Happy Coding!`,
        "type": "inbox"
    },
    {
        subject: "Here's the video",
        writer: me.name,
        writer_email: me.email,
        receiver: ["George0121", "Rose123"],
        receiver_email: ["george0121@omail.com", "rose123@omail.com"],
        date: getRandomDate(2, 3),
        content: `My favorite roblox parkour gap compliation.

<iframe width="560" height="315" src="https://www.youtube.com/embed/7DP8a4CyPwo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        "type": "sent"
    },
    {
        subject: "Your DB has been successfully created!",
        writer: "MYDB",
        receiver: me.name,
        receiver_email: me.email,
        writer_email: "noreply@email.mydb.com",
        date: getRandomDate(),
        content: `Your DB <strong>'TEST_DB'</strong> has been successfully created!
Go to <a href="">http://www.mydb.com/db/TEST_DB</a> and use it!

If you don't use this DB for 1 year, It will be <strong>deleted automatically</strong>.
Also you can disable auto deleting in settings.`,
        "type": "inbox"
    },
    {
        subject: "HEEEALLLOO",
        writer: me.name,
        writer_email: me.email,
        receiver: ["George0121", "Rose123"],
        receiver_email: ["george0121@omail.com", "rose123@omail.com"],
        date: getRandomDate(2, 6),
        content: `Yea, nothing`,
        "type": "sent"
    }
]

function compareDate(a, b) {
    let compare_targets = ["year", "month", "date"]

    for (let i = 0; i < compare_targets.length; i++) {
        let p = compare_targets[i]
        
        if (a.date[p] > b.date[p]) {
            return -1
        } else if (a.date[p] < b.date[p]) {
            return 1
        }
    }

    return 0
}

mail_data.sort(compareDate).reverse()
