const date = new Date()
const month_names = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
const today = `${month_names[date.getMonth()]} ${date.getDate()}`

export default [
    {
        "subject": "Hey!",
        "writer": "MyFriend",
        "date": today,
        "type": "inbox"
    },
    {
        "subject": "Please verify your device.",
        "writer": "WebsiteName",
        "date": today,
        "type": "inbox"
    },
    {
        "subject": "New message from ChatApp",
        "writer": "ChatApp",
        "date": today,
        "type": "inbox"
    },
    {
        "subject": "Hi!",
        "writer": "Me",
        "date": today,
        "type": "sent"
    },
    {
        "subject": "Security alert",
        "writer": "OSoftware",
        "date": today,
        "type": "inbox"
    },
    {
        "subject": "Here's the video",
        "writer": "Me",
        "date": today,
        "type": "sent"
    },
    {
        "subject": "Your DB has been successfully created!",
        "writer": "MYDB",
        "date": today,
        "type": "inbox"
    },
    {
        "subject": "ahahahg",
        "writer": "Me",
        "date": today,
        "type": "sent"
    },
    
]
