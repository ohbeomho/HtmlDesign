const date = new Date()
const month_names = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]

export const getToday = () => {
    return `${month_names[date.getMonth()]} ${date.getDate()}`
}

export const mail_data = [
    {
        "subject": "Hey!",
        "writer": "MyFriend",
        "date": getToday(),
        "type": "inbox"
    },
    {
        "subject": "Please verify your device.",
        "writer": "WebsiteName",
        "date": getToday(),
        "type": "inbox"
    },
    {
        "subject": "New message from ChatApp",
        "writer": "ChatApp",
        "date": getToday(),
        "type": "inbox"
    },
    {
        "subject": "Hi!",
        "writer": "Me",
        "date": getToday(),
        "type": "sent"
    },
    {
        "subject": "Security alert",
        "writer": "OSoftware",
        "date": getToday(),
        "type": "inbox"
    },
    {
        "subject": "Here's the video",
        "writer": "Me",
        "date": getToday(),
        "type": "sent"
    },
    {
        "subject": "Your DB has been successfully created!",
        "writer": "MYDB",
        "date": getToday(),
        "type": "inbox"
    },
    {
        "subject": "ahahahg",
        "writer": "Me",
        "date": getToday(),
        "type": "sent"
    }
]
