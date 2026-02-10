export default function Footer() {
    return (
        <footer className="bg-white border-top p-3 text-center text-muted">
            © {new Date().getFullYear()} Library Admin Panel. All rights reserved.
        </footer>
    );
}