export const bookReceiptTemplate = ({ member, book, issue_date, return_date }) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Book Issued</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 0;">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">

                    <tr>
                        <td style="background:#2c3e50; padding:20px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0; font-size:22px;">
                                📚 Library Notification
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:30px; color:#333333;">
                            <h2 style="margin-top:0; font-size:18px;">
                                Hello ${member.name},
                            </h2>

                            <p style="font-size:14px; line-height:1.6;">
                                Your book has been <strong>successfully issued</strong>.
                                Please find the details below:
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="margin:20px 0; border-collapse:collapse;">
                                <tr>
                                    <td style="padding:10px; background:#f9fafb; font-weight:bold; width:40%;">
                                        Title
                                    </td>
                                    <td style="padding:10px; background:#f9fafb;">
                                        ${book.title}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:10px; border-top:1px solid #e5e7eb; font-weight:bold;">
                                        ISBN
                                    </td>
                                    <td style="padding:10px; border-top:1px solid #e5e7eb;">
                                        ${book.isbn}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:10px; border-top:1px solid #e5e7eb; font-weight:bold;">
                                        Issue Date
                                    </td>
                                    <td style="padding:10px; border-top:1px solid #e5e7eb;">
                                        ${issue_date}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:10px; border-top:1px solid #e5e7eb; font-weight:bold;">
                                        Return Date
                                    </td>
                                    <td style="padding:10px; border-top:1px solid #e5e7eb;">
                                        ${return_date}
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size:14px; line-height:1.6; color:#555555;">
                                ⏰ Please return the book on or before the return date
                                to avoid late fees.
                            </p>

                            <p style="margin-top:30px; font-size:14px;">
                                Thanks & regards,<br />
                                <strong>Library Team</strong>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
                            © ${new Date().getFullYear()} Library Management System
                            <br />
                            This is an automated email. Please do not reply.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};
