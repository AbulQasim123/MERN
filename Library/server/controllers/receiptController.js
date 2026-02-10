import puppeteer from 'puppeteer';
import BookIssue from '../models/bookIssueModel.js'
import { bookReceiptTemplate } from '../templates/bookReceiptTemplate.js';

export const downloadReceipt = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'Receipt ID is required' });
        }

        const issue = await BookIssue.findById(id)
            .populate('book_id')
            .populate('member_id');

        if (!issue) {
            return res.status(404).json({ message: 'Receipt not found' });
        }

        const html = bookReceiptTemplate({
            member: issue.member_id,
            book: issue.book_id,
            issue_date: new Date(issue.issue_date).toDateString(),
            return_date: new Date(issue.return_date).toDateString(),
        });

        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                bottom: '20px',
                left: '20px',
                right: '20px',
            },
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=receipt-${issue._id}.pdf`
        );

        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'PDF generation failed' });
    }
};