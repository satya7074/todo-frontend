import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="homepage d-flex justify-content-center align-items-center">
            <div className="overlay"></div>
            <div className="content card shadow-lg text-center p-5">
                <h1 className="title mb-3">🚀 Welcome to <span className="brand">ToDo App</span></h1>
                <p className="subtitle mb-4">
                    Stay <strong>organized</strong>, stay <strong>productive</strong>.
                    Manage your tasks with ease and track your progress anytime, anywhere.
                </p>

                <div className="features text-start mx-auto mb-4">
                    <p>✨ Create tasks and set <strong>priorities</strong></p>
                    <p>📊 Track <strong>progress</strong> and <strong>deadlines</strong></p>
                    <p>✅ Update status: Pending, In Progress, Completed</p>
                    <p>🔒 Secure login and personalized task management</p>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4">
                        {/* Primary action */}
                        <Link to="/login" className="btn btn-primary btn-lg px-5">
                            🔑 Login
                        </Link>

                        {/* Secondary action */}
                        <Link to="/register" className="btn btn-outline-light btn-lg px-5">
                            📝 Register
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
