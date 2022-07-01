$(document).ready(function() {
    $(".button.close").click(() => $(".write-mail").css("visibility", "hidden"))
    $(".button.send").click(function() {
        let recipients = $("#recipient_input").val().split(/\s+/)
        const email_reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

        if ($("#recipient_input").val() == "") {
            $(".error").text("Please enter recipient(s).")
            return
        } else if ($("#content_input").val() == "") {
            $(".error").text("Please enter the contents of the mail.")
            return
        }

        for (let i = 0; i < recipients.length; i++) {
            if (!email_reg.test(recipients[i])) {
                $(".error").text("Please enter recipient(s) in email format.")
                return
            }
        }

        $(".error").text("")
        $("#recipient_input").val("")
        $("#subject_input").val("")
        $("#content_input").val("")
        $(".write-mail").css("visibility", "hidden")
    })
})
