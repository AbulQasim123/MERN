import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';

import Layout from "./components/layout/Layout";

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Authors = lazy(() => import('./pages/Authors'));
const AddAuthor = lazy(() => import('./pages/AddAuthor'));
const EditAuthor = lazy(() => import('./pages/EditAuthor'));
const Categories = lazy(() => import('./pages/Categories'));
const AddCategory = lazy(() => import('./pages/AddCategory'));
const EditCategory = lazy(() => import('./pages/EditCategory'));
const Books = lazy(() => import('./pages/Books'));
const AddBook = lazy(() => import('./pages/AddBook'));
const EditBook = lazy(() => import('./pages/EditBook'));
const Members = lazy(() => import('./pages/Members'));
const AddMember = lazy(() => import('./pages/AddMember'));
const EditMember = lazy(() => import('./pages/EditMember'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const BookIssue = lazy(() => import('./pages/BookIssue'));
const AddBookIssue = lazy(() => import('./pages/AddBookIssue'));
const EditBookIssue = lazy(() => import('./pages/EditBookIssue'));

const Loader = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" />
    </div>
);

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Suspense fallback={<Loader />}>
                    <Routes>

                        {/* PUBLIC */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* PRIVATE */}
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Dashboard />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/authors"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Authors />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/authors/add"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <AddAuthor />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/authors/:id/edit"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <EditAuthor />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/categories"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Categories />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/categories/add"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <AddCategory />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/categories/:id/edit"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <EditCategory />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/books"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Books />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/books/add"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <AddBook />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/books/:id/edit"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <EditBook />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/book-issue"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <BookIssue />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/book-issue/add"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <AddBookIssue />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/book-issue/:id/edit"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <EditBookIssue />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/members"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Members />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/members/add"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <AddMember />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/members/:id/edit"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <EditMember />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Profile />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    );
}
