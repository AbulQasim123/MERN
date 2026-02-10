import express from "express";
const router = express.Router();
import { createAdmin, loginAdmin, getProfile, logoutAdmin, updateProfile } from '../controllers/adminController.js'
import { createAuthor, getAuthor, getAuthors, getActiveAuthors, updateAuthor, deleteAuthor } from '../controllers/authorController.js'
import { createCategory, getCategory, getCategories, getActiveCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js'
import { createBook, getBook, getBooks, getActiveBooks, updateBook, deleteBook } from '../controllers/bookController.js'
import { createMember, getMember, getMembers, getActiveMembers, updateMember, deleteMember } from '../controllers/memberController.js'
import { createBookIssue, getBookIssue, getBookIssues, updateBookIssue, deleteBookIssue, returnBookIssue } from '../controllers/BookIssueController.js'
import { getDashboardData } from '../controllers/dashboardController.js'
import { downloadReceipt } from '../controllers/receiptController.js';
import authenticate from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multer.js'


router.post('/register', createAdmin)
router.post('/login', loginAdmin)
router.get('/profile', authenticate, getProfile)
router.put('/update-profile', authenticate, updateProfile)
router.get('/logout', authenticate, logoutAdmin)

router.post('/create-author', authenticate, createAuthor)
router.get('/get-author', authenticate, getAuthor)
router.get('/get-authors', authenticate, getAuthors)
router.get('/get-active-authors', authenticate, getActiveAuthors)
router.put('/update-author', authenticate, updateAuthor)
router.delete('/delete-author', authenticate, deleteAuthor)

router.post('/create-category', authenticate, createCategory)
router.get('/get-category', authenticate, getCategory)
router.get('/get-categories', authenticate, getCategories)
router.get('/get-active-categories', authenticate, getActiveCategories)
router.put('/update-category', authenticate, updateCategory)
router.delete('/delete-category', authenticate, deleteCategory)

router.post('/create-book', authenticate, upload.single('cover'), createBook)
router.get('/get-book', authenticate, getBook)
router.get('/get-books', authenticate, getBooks)
router.get('/get-active-books', authenticate, getActiveBooks)
router.put('/update-book', authenticate, upload.single('cover'), updateBook)
router.delete('/delete-book', authenticate, deleteBook)

router.post('/create-member', authenticate, upload.single('profile'), createMember)
router.get('/get-member', authenticate, getMember)
router.get('/get-members', authenticate, getMembers)
router.get('/get-active-members', authenticate, getActiveMembers)
router.put('/update-member', authenticate, upload.single('profile'), updateMember)
router.delete('/delete-member', authenticate, deleteMember)

router.post('/create-book-issue', authenticate, createBookIssue)
router.get('/get-book-issue', authenticate, getBookIssue)
router.get('/get-book-issues', authenticate, getBookIssues)
router.put('/update-book-issue', authenticate, updateBookIssue)
router.delete('/delete-book-issue', authenticate, deleteBookIssue)
router.put('/return-book-issue', authenticate, returnBookIssue)

router.get('/get-dashboard-data', authenticate, getDashboardData)
router.get('/download-receipt', authenticate, downloadReceipt)


export default router;